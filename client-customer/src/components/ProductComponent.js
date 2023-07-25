import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import '../assets/Styles/Home.css'
import Menu from './MenuComponent';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
          <div key={item._id} className="inline" class='hover'>
            <figure>
              <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
              <div class='text_price'>
                <p class='p_name'>{item.name}</p>
                <p class='p_price'>{item.price}$</p>
              </div>
            </figure>
          </div>
      );
    });
    return (
      <div>
         <Menu/>
          <div className="text-center" class='productL_container'>
            <h2 className="text-center">LIST PRODUCTS</h2>
              <div class='producL_Product'>
                {prods}
              </div>
          </div>
      </div>
    );
  }
  componentDidMount() { // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    }else if (params.keyword) {
        this.apiGetProductsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) { // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    }else if (params.keyword && params.keyword !== prevProps.params.keyword) {
        this.apiGetProductsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}
export default withRouter(Product);