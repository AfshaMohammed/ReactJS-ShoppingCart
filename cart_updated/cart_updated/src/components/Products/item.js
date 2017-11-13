// styles
import React from 'react';
import './item.scss';
import AddToBasket from '../Basket/addToBasket';

export default function Item(props) {
    console.log("props.item", props.item.qty);
    return (
        <div className="brdr">
            <img className="img" src={props.item.imgSrc} alt="product" />
            <div className="caption">
                <h3>{props.item.itemName}</h3>
                <div className="product__price" id="Dol">${props.item.price}</div>
                <div className="product__price">&nbsp;{props.item.quantityRemaining} In Stock</div>
                <div className="product__button-wrap">
                <AddToBasket text="Add to Cart" onAddCart={() => props.onAddCart(props.item)}/>
            </div>
        </div>
            <br />
        </div>
  );
}
