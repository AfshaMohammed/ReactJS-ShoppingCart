import React from 'react';
import Item from './item';
import './item.scss';

export default function Items(props) {
  const items = props.items && props.items.length > 0 && props.items.map((item,i) => {
    return <li className="product-list__item"><Item key={i} item={item} index={i} onAddCart={props.onAddCart}/></li>;
  });
  return (
    <ul className="product-list">{items}</ul>
  );
}