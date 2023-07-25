import axios from 'axios';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import style from '../assets/Styles/userAccount.module.css'
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
      profile: '0',
    };
  }
  render() {
    return (

      <div class={style.bg}> 
        <div class={style.blur}>
            <div class={style.sign}>
                <h2>Sign up</h2> 
                <form>
                    <div>
                        <div class={style.input_form}>
                            <span>Your Name</span>
                            <input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} />
                        </div>

                        <div class={style.input_form}>
                            <span>Email</span>
                            <input type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} />
                        </div>
                        <div class={style.input_form}>
                            <p> </p>
                            <span>User Name</span>
                            <input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
                        </div>

                        <div class={style.input_form}>
                            <span>Password</span>
                            <input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
                        </div>
                        <div class={style.input_form}>
                            <span>Phone Number</span>
                            <input type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} />
                        </div>

                        <div class={style.input_form}>
                          <input type="submit" value="SIGN-UP" onClick={(e) => this.btnSignupClick(e)} />
                        </div>
                        <div class={style.input_form}>
                          <div class={style.input_form_inline}>
                            <p>Already have an account? <Link to='/login'>Login</Link> Here</p>
                            <p><Link to='/active'>Active account </Link></p>
                          </div>
                        </div> 
                                           
                    </div>
                </form>
              </div>
          </div>
    </div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    const profile = this.state.profile;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email, profile:profile };
      this.apiSignup(account);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;