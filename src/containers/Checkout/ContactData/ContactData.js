import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.props.price,
            customer: {
                name: 'mark ammari',
                address: {
                    street: '123 main st',
                    zipCode: '90210',
                    country: 'USA'
                },
                email: 'testing@test.com'
            },
            deliveryMethod: 'Fast'
        }
        axios.post('/orders.json', order)
        .then(res => {
            console.log(res)
            this.setState({ loading: false})
            this.props.history.push('/')
        })

        .catch(err => {
            console.log(err)
            this.setState({ loading: false})
        })
        event.preventDefault()
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="your name"/>
                <input type="text" name="email" placeholder="your email"/>
                <input type="text" name="street" placeholder="your street"/>
                <input type="text" name="postal" placeholder="your zipcode"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>)
        if (this.state.loading) {
            form = (<Spinner />)
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Information:</h4>
                {form}
            </div>
        )

    }
}

export default ContactData;