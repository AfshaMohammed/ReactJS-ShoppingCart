import CartItem from './cartItem';

// styles
import React from 'react';
import './index.scss';

export default function Cart(props) {
    let Total = props.totalCart && Number(props.totalCart) > 0 ? props.totalCart :  0;
    
    if (props.items && props.items.length > 0) {
        for (let i = 0; i < props.items.length; i++) {
            Total = Total + (props.items[i].qty * props.items[i].price);
        }
    }
    return (
        <div>
            <aside>
                <h3>Shopping Cart</h3>
                <h6> {props.items ?  props.items.length :  0} items </h6>
                <div className="cart">
                  
                        <div className="">
                            {props.items && props.items.length > 0 && (
                                <div className="cart__body">
                                    {props.items.map(item => (
                                        <CartItem key={item.id} {...item} onRemoveCart={props.onRemoveCart} onAddCart={props.onAddCart} deleteProduct={props.deleteProduct}/>
                                    ))}
                                </div>
                            )}
                            {props.items && props.items.length === 0 && (
                                <div className="alert alert-info">Cart is empty</div>
                            )}
                            {props.items && props.items.length > 0 && (
                                <div><p className="total">Total: $ {Total} </p>
                                <button className="btn btn-primary confirm" onClick={props.onConfirmClick}>Confirm Purchase</button></div>
                            )}
                            {
                                props.totalCart && Number(props.totalCart) > 0 ? <div><p className="total">Total: $ {Total} </p></div> : <div></div>
                            }
                        
                    </div>
                </div>
        </aside>
        </div>
    );
}