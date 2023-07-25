import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';

import '../assets/Styles/Book.css'
class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
      txtKeyword:''
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div>
          <Menu/>
          <div class="app">
          <div class="Novel">{ this.setState({ txtKeyword: prod.category.name}) }
            <form>
              <a type='submit' onClick={(e) => this.btnSearchClick(e)}><h1>{prod.category.name}</h1></a>
            </form>
          </div>
          <div class="back">
            <i>&#187;<Link to='/home'>home</Link><a type='submit' onClick={(e) => this.btnSearchClick(e)}>&#187; {prod.category.name}</a></i>
          </div>
  
          <div class="information-book">
            <div class="img">
             <img src={"data:image/jpg;base64," + prod.image} alt="book" />
            </div>
              <div class="items">
                <div class="tieude">
                  <h2>{prod.name}</h2>
                </div>
                <table> 
                  <tr>
                      <th>Published:</th>
                      <th class="note">{prod.date}</th>
                      <th>Pubillsher:</th>
                      <th class="note">{prod.publisher}</th>
                  </tr>
                  <tr>
                      <th>by:</th>
                      <th class="note">{prod.author}</th>
                      <th>price</th>
                      <th class="note">{prod.price}$</th>
                  </tr>
                </table>
              </div>
              <div class="add"> 
                <div class="them">
                  <tr>
                    <td>Quantity:</td>
                    <td><input type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
                  </tr>
                </div>
                  <i><input class="btn" value="ADD TO CART" onClick={(e) => this.btnAdd2CartClick(e)} /></i>
                  <i><Link class="btn1" to='/mycart'>MY CART</Link></i>
              </div>   
            </div>
            <div class="product">
              <div class="product-items">
                <h2>Plot</h2>      
              </div>
              <p>{prod.describe}</p>
            </div>
          </div>
        </div>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Added to cart!');
    } else {
      alert('Please input quantity');
    }
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}
export default withRouter(ProductDetail);