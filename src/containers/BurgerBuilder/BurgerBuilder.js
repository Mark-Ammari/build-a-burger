import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = []
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    componentDidMount() {
        // axios.get('https://react-my-burger-d9463.firebaseio.com/ingredients.json')
        // .then(res => {
        //     this.setState({ ingredients: res.data })
        // })
        // .catch(err => {
        //     this.setState({ error: true })
        // })
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null

        let burger = this.state.error ? <p>Ingredients can't be loaded...</p> : <Spinner />
        
        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                    ingredientAdded={() => this.props.onAddIngredient()}
                    ingredientRemoved={() => this.props.onRemoveIngredient()}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
                </Fragment>
            )
            
            orderSummary = ( <OrderSummary 
            ingredients={this.props.ings}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} /> )
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        // {salad: true, meat: false, ...}
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tp: state.totalPrice,
        ings: state.ingredients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onRemoveIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));