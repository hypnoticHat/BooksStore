import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import { Link } from 'react-router-dom';

import style from '../assets/Styles/userAccount.module.css'
class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: 'nam2',
      txtPassword: '123'
    };
  }
  render() {
    return (
      <div class={style.bg}> 
        <div class={style.blur}>
            <div class={style.sign}>
                <h2>Sign In</h2> 
                <form>
                    <div>
                        <div class={style.input_form}>
                            <span>User Name</span>
                            <input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
                        </div>

                        <div class={style.input_form}>
                            <span> Password </span>
                            <input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
                        </div>
                        <p class={style.Wrong_alert}>Tên đăng nhập hoặc mật khẩu không đúng!</p>

                        <div class={style.input_form}>
                          <input type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} />
                        </div>
                        
                        <div class={style.input_form}>
                            <p>Don't have account? <Link to='/signup'>Sign-up</Link> Here</p>
                        </div>                     
                    </div>
                </form>
                <h3>User Other way</h3>
                <ul class={style.icon_dang_nhap}>
                    <li><i class="fa fa-facebook" aria-hidden="true"></i></li>
                    <li><i class="fa fa-google" aria-hidden="true"></i></li>
                    <li><i class="fa fa-twitter" aria-hidden="true"></i></li>
                </ul>
            </div>
        </div>
      </div>

    );
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(Login);