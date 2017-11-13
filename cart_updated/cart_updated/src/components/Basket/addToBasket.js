// styles
import React from 'react';
import './index.scss';

export default function AddToBasket(props) {
    return (
        <button className="addBasket pure-button" onClick={props.onAddCart} >
            {props.text}
        </button>
  );
}
