import React from'react';

const order = (props) => {
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div>
            <p>Ingredients: {props.ingredients} {props.price}</p>
        </div>
    );
}

export default order;