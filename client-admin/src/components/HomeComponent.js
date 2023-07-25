import React, { Component  } from 'react';
import MyContext from '../contexts/MyContext';
import '../assets/Styles/Home.css'
import axios from 'axios';

class Home extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="inline" class='hover'>
            <figure>
              <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
              <div class='text_price'>
                <p class='p_name'>{item.name}</p>
                <p class='p_price'>{item.price}$</p>
              </div>
            </figure>
          </div>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<span key={index}>| <b>{index + 1}</b> |</span>);
      } else {
        return (<span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>);
      }
    });
    return (
      <div>
          <div className="text-center" class='productL_container'>
            <h2 className="text-center">LIST PRODUCTS</h2>
              <div class='producL_Product'>
                {prods}
              </div>
              <td colSpan="6" class='numPage'>{pagination}</td>
          </div>
          
      </div>
      
    );
  }
  updateProducts = (products, noPages) => { // arrow-function
    this.setState({ products: products, noPages: noPages });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Home;