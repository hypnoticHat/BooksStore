import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from '../assets/Styles/userAccount.module.css'
class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div class={style.bg}> 
        <div class={style.blur}>
            <div class={style.sign}>
        <h2 className="display-flex-center">ACTIVE ACCOUNT</h2>
        <form>
          <table className="align-center">
            <tbody>
              <div class={style.input_form}>
                <span>Your ID</span>
                <input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} />
              </div>
              <div class={style.input_form}>
                <span>Token</span>
                <input type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} />
              </div>
              <div class={style.input_form}>
                <input type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)} />
              </div>
              <div class={style.input_form}>
                <p>Don't have account? <Link to='/signup'>Sign-up</Link> Here</p>
              </div>    
            </tbody>
          </table>
        </form>
      </div>
      </div>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Active;