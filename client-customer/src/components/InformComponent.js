import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

import home from "../assets/Styles/home.module.css"
import base from "../assets/Styles/base.module.css"

import avatar from '../assets/imgs/avata.png'
import cart from "../assets/imgs/SVG/cart yc.svg"

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      profile: ''
    };
  }
  render() {
    return (
      <div>
        <div className="float-right">
        {this.context.token === '' ?
          <div class={home.text_nav}><Link to='/login'>Login</Link> / <Link to='/signup'>Sign-up</Link></div>
          :
            <div class = {home.user_interf}>
              <div class={home.cart_notification}><Link to='/mycart'><img class={base.icons} src={cart} alt=""/></Link>
                <div class={home.cart_notification_num}><b>{this.context.mycart.length}</b>
              </div>
            </div>
            <div class={home.home_profile_btn}><Link to='/myprofile'><a class={home.signt_text} href="/myprofile"><img class={home.avatarIcon} src={ "data:image/jpg;base64," + this.state.profile || avatar} alt="user avatar"/></a></Link>
              <div class={home.home_profile}>
                <b class={home.hello}>Hello {this.context.customer.name}</b>
                <ul>
                  <li className='inform'><Link to='/myprofile'>My profile</Link></li>
                  <li className='inform'><Link to='/myorders'>My orders</Link></li>
                  <li className='inform'><Link to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link></li>
                </ul>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        profile: this.context.customer.profile
      });
    }
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;