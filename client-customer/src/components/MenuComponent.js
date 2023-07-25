import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import Inform from './InformComponent';

import yc from "../assets/imgs/SVG/categrories_yc.svg"
import search from "../assets/imgs/SVG/search yc.svg"

import home from "../assets/Styles/home.module.css"
import base from "../assets/Styles/base.module.css"
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div>
      <div class={home.navigations}>
              <div class={home.group_navigations}>
                  <ul>
                      <li class={home.nav_btn}><img class={ base.icons}src={yc} alt=""/>
                          <div class={home.navigations_items}>
                            <div class={home.bridge}></div>
                              <ul>
                                <li className="menu"><Link to='/home'>Home</Link></li>
                                {cates}

                              </ul>
                          </div>
                      </li>
                      <form className="search" class={home.search}>
                        <input type="search" placeholder=" Enter Book ABC" className="keyword"  class={home.search_box} value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
                        <button type="submit" class={home.search_btn} onClick={(e) => this.btnSearchClick(e)}><img class={base.icons}src={search} alt=""/></button>
                      </form>

                  </ul>
            </div>
    

          <div class={home.group_signup}>
              <ul>
                  <Inform />
              </ul>
          </div>
        </div>
      </div>
    );
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);