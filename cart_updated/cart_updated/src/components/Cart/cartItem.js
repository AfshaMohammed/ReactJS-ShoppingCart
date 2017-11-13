// styles
import React from 'react';
import './index.scss';

export default function CartItem(props) {
    return (
    
        	<div className="cart-item">
            	<div>
                	<img className="CartImg" src={props.imgSrc} alt="product" /><button className="CartBtn" onClick={() => props.onRemoveCart(props)}>-</button>&nbsp;&nbsp;<label className="addCart">{props.qty}</label>&nbsp;&nbsp;<button className="CartBtn" onClick={() => props.onAddCart(props)}>+</button>
            	</div>
            	<div className="cart-item__price">@${props.price}each = {props.price * props.qty}</div>
            	<a href="javascript:void(0);" style={{textDecoration:'none'}}><p onClick={() => props.deleteProduct(props)}>Delete</p></a>
        	</div>
        

  );
}