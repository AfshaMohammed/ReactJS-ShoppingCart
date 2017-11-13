import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllItems } from '../../actions/items';

import Loader from '../Loader';
import Header from '../Header';
import Items from '../Products/items';
import Cart from '../Cart/cart';
import './mainPage.scss';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItem: [],
      fetchDetails: '',
      totalCart: 0,
    }
    this.cartArr = this.props.addData == 0 ? [] : this.props.addData;
    this.onAddCart = this.onAddCart.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.onRemoveCart = this.onRemoveCart.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);
  }


  componentWillMount() {
    this.props.dispatch(fetchAllItems()).then(response => {
      this.setFetchDetails(response);
    });
  }

  setFetchDetails(response) {
    this.setState({
      fetchDetails: response,
    });
  }

  onAddCart(data) {
    this.addCartItem(data);
  }

  onRemoveCart(data) {
    this.removeCartItem(data);
  }

  onConfirmClick() {
    const { cartItem } = this.state;
    let totalCart = 0;
    
    if (cartItem && cartItem.length > 0) {
        for (let i = 0; i < cartItem.length; i++) {
            totalCart = totalCart + (cartItem[i].qty * cartItem[i].price);
        }
    }
    this.setState({
      cartItem: [],
      totalCart,
    });
  }

  removeCartItem(data) {
    const { cartItem } = this.state;
    const { fetchDetails } = this.state;
    const ldata = data;
    const addedData = ldata;
    let exceedMax = false;
    if (cartItem && cartItem.length > 0) {
      for (let i = 0; i < cartItem.length; i++) {
        if (cartItem[i].itemName === data.itemName) {
          if (cartItem[i].qty > 0) {
            cartItem[i].qty = cartItem[i].qty - 1;
          } else {
            exceedMax = true;
          }
        }
      }
    }

    if (fetchDetails && fetchDetails.items.length > 0) {
      for (let i = 0; i < fetchDetails.items.length; i++) {
        if (fetchDetails.items[i].itemName === data.itemName) {
          if (!exceedMax) {
            fetchDetails.items[i].quantityRemaining = fetchDetails.items[i].quantityRemaining + 1;
          }
        }
      }
    }

    const foundExist = cartItem && cartItem.length > 0 && cartItem.find(obj => obj.itemName === data.itemName);
    if (!foundExist) {
      cartItem.push(addedData);
    }
    this.setState({
      cartItem: cartItem,
      fetchDetails: Object.assign({}, fetchDetails),
    });
  }

  addCartItem(data) {
    const { cartItem } = this.state;
    const { fetchDetails } = this.state;
    const ldata = data;
    const addedData = ldata;
    let exceedMax = false;

    if (fetchDetails && fetchDetails.items.length > 0) {
      for (let i = 0; i < fetchDetails.items.length; i++) {
        if (fetchDetails.items[i].itemName === data.itemName) {
          if (fetchDetails.items[i].quantityRemaining > 0) {
            fetchDetails.items[i].quantityRemaining = fetchDetails.items[i].quantityRemaining - 1;
          } else {
            exceedMax = true;
          }
        }
      }
    }

    if (cartItem && cartItem.length > 0) {
      for (let i = 0; i < cartItem.length; i++) {
        if (cartItem[i].itemName === data.itemName) {
          if (!exceedMax) {
            cartItem[i].qty = cartItem[i].qty + 1;
          }
        }
      }
    }

    const foundExist = cartItem && cartItem.length > 0 && cartItem.find(obj => obj.itemName === data.itemName);
    if (!foundExist) {
      cartItem.push(addedData);
    }
    this.setState({
      cartItem: cartItem,
      fetchDetails: Object.assign({}, fetchDetails),
    });
  }
  
  deleteProduct(data) {
    const { cartItem } = this.state;
    const { fetchDetails } = this.state;
    const ldata = data;
    const addedData = ldata;

    if (fetchDetails && fetchDetails.items.length > 0) {
      for (let i = 0; i < fetchDetails.items.length; i++) {
        if (fetchDetails.items[i].itemName === data.itemName) {
          if (fetchDetails.items[i].quantityRemaining > 0) {
            fetchDetails.items[i].quantityRemaining = fetchDetails.items[i].quantityRemaining + fetchDetails.items[i].qty;
          }
        }
      }
    }
    cartItem.pop(addedData);
    this.setState({
      cartItem: cartItem,
      fetchDetails: Object.assign({}, fetchDetails),
    });
  }

  render() {
    const { fetchDetails } = this.state;
    return (
      <div className="container-fluid">
        <div className="col-md-12"><br /></div>
        <div className="row">
          <div className="col-md-12">
            <Header />
          </div>
          <div className="col-md-8">
            {fetchDetails ? <Items onAddCart={this.onAddCart} items={fetchDetails.items} /> : <Loader />}
          </div>
          <div className="col-md-4">
            <Cart items={this.state.cartItem} totalCart={this.state.totalCart} onConfirmClick={this.onConfirmClick} onRemoveCart={this.onRemoveCart} onAddCart={this.onAddCart} deleteProduct={this.deleteProduct}/>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    fetchDetails: state.fetchDetailsState,
    addData: state.addItemState,
  };
}

export default connect(mapStateToProps)(MainPage);
