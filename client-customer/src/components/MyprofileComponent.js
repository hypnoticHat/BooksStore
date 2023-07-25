import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import Menu from './MenuComponent';

import avatar from '../assets/imgs/avata.png'
import styles from '../assets/Styles/UserProfile.module.css'

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
      profile: ''
    };
  }
  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div>
        <Menu />
          <div class={styles.upload}>
            <img src={  this.state.prePic || "data:image/jpg;base64," + this.state.profile || avatar } alt='avatar'/>
            <div class={styles.round}>
              <input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)} />
              <i class = "fa fa-camera" id="white"></i>
            </div>
          </div>
        <form class={styles.form} id = "form" action="">
          <div class={styles.user_info_containt}>
            <h2 className="text-center">{this.state.txtName}</h2>

            <table>
              <tr class={styles.inline}>
                <td>Username</td>
                <td><input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
              </tr>
              <tr class={styles.inline}>
                <td>Password</td>
                <td><input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
              </tr>
              <tr class={styles.inline}>
                <td>Name</td>
                <td><input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr class={styles.inline}>
                <td>Phone</td>
                <td><input type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></td>
              </tr>
              <tr class={styles.inline}>
                <td>Email</td>
                <td><input type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></td>
              </tr>
            </table>
            <div class={styles.button}>
                <td><input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)}/></td>
                <td><Link to='/home' onClick={() => this.lnkLogoutClick()}>LOGOUT</Link></td>
            </div>
          </div>
        </form>
      </div>
    );
  }

  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ profile: evt.target.result });
        this.setState({ prePic: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email,
        profile: this.context.customer.profile
      });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;

    const profile = this.state.profile.replace(/^data:image\/[a-z]+;base64,/, '');// remove "data:image/...;base64,"
    if (username && password && name && phone && email && profile) {
      const customer = { username: username, password: password, name: name, phone: phone, email: email, profile:profile };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Update Success!');
        this.context.setCustomer(result);
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  // event-handlers logout
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Myprofile;