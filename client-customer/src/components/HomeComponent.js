import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from './MenuComponent';
import MyContext from '../contexts/MyContext';
import { slideIndex, showSlides, plusSlides, currentSlide } from '../js.js'; // Import các hàm từ file slideFunctions.js

import '../assets/Styles/Home.css'
import home from "../assets/Styles/home.module.css"
import logo from "../assets/imgs/SVG/c4.svg"
import '../assets/Styles/slider.css'
import temppic from "../assets/imgs/shin1.jpg"
import bigLogo from "../assets/imgs/SVG/ckoutline.svg"


class Home extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      txtQuantity: 1,
    };
  }
  
  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="inline" >
          <figure>
          <li  class={home.borther_box}>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="160px" height="300px" alt="" /></Link>
            <div class='text_price'>
              <p class='p_name'>{item.name}</p>
              <p class='p_price'>{item.price}$</p>
            </div>
            <div class={home.btn123}>
              <Link class={home.buy} to={'/mycart'}>Buy</Link>
              <input class={home.add_to_basket} value="TO CART" onClick={(e) => this.btnAdd2CartClick(e, item._id)} />
            </div>
            </li>
          </figure>
        </div>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
              <div div key={item._id} class="hotP_containt">
                <div class="mySlides fade">
                    <div class="hotP_data">
                      <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image}alt="" /></Link>
                      <div class="text_data">
                        <p class="hotP_name">{item.name}</p>
                        <p class="hotP_detail">{item.describe}</p>
                      </div>
                    </div>
                </div>
              </div>
      );
    });
    return (
      <div class = {home.fullsize}>
        <div class="page">
          <div class={home.header_contain}>
              <header>
                  <div class={home.head_group}>
                      <a href="/home"><img class={home.icon_logo} src={logo} alt=""/></a>
                      <a href="/home" class={home.text_logo}>chika store</a>
                  </div>  
              </header>
          </div>
          <Menu />
          <div class={home.page}>
               <div class={home.product_page}>
                  <div class={home.product_containt}>      
                    <p class={home.title}>New Books</p>
                      <div class="group_content group_novel">
                          <ul>
                              <li>
                                {newprods}
                              </li>
                          </ul>
                      </div>
                    </div>
                  </div>
              </div>
            <figure>
              <div class="slideshow-container">
                {hotprods}
                <div class="hotP_containt">
                  <div class="mySlides fade">
                      <div class="hotP_data">
                        <a><img src={temppic}/></a>
                        <div class="text_data">
                          <p class="hotP_name">Shin cậu bé bút chì</p>
                          <p class="hotP_detail">Crayon Shin-chan is a Japanese manga series written and illustrated by Yoshito Usui. Crayon Shin-chan made its first appearance in 1990 in a Japanese weekly magazine called Weekly Manga Action, which was published by Futabasha. Due to the death of author Yoshito Usui, the manga in its original form ended on September 11, 2009. A new manga began in the summer of 2010 by members of Usui's team,titled New Crayon Shin-chan 新クレヨンしんちゃん, Shin Kureyon Shin-chan.</p>
                        </div>
                      </div>
                  </div>
                </div>
                
                <a class="prev" onclick={() => plusSlides(-1)}>&#10094;</a>
                <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
            </div>
            <br/>
            {/* <div>
                <span class="dot" onclick={() => this.currentSlide(1)}></span>
                <span class="dot" onclick={() => this.currentSlide(2)}></span>
                <span class="dot" onclick={() => this.currentSlide(3)}></span>
                <span class="dot" onclick={() => this.currentSlide(4)}></span>
            </div> */}
            </figure>
              <footer>
                <div class="row">
                    <div class="col">
                        <img src={bigLogo} alt="logo here" class="logo"/>
                        <p> A simple shop book make for learning pupose only</p>
                    </div>
                    <div class="col">
                        <h3>office <div class="underline"><span></span></div></h3>
                        <p>road ABC</p>
                        <p>District 9 city of star</p>
                        <p>stresss ABC, pin 12345678, vietnam</p>
                        <p class="email-id">chika@gmail.com</p>
                        <h4>+78- 012345678</h4>
                    </div>
                    <div class="col">
                        <h3>links <div class="underline"><span></span></div></h3>
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">Services</a></li>
                            <li><a href="">About us</a></li>
                            <li><a href="">Featur</a></li>
                            <li><a href="">Contact</a></li>
                        </ul>
                    </div>
                    <div class="col">
                        <h3>Join us <div class="underline"><span></span></div></h3>
                        
                        <div class="social-icons">
                            <ion-icon class="icon" name="logo-facebook"></ion-icon>
                            <ion-icon class="icon" name="logo-twitter"></ion-icon>
                            <ion-icon class="icon" name="logo-twitch"></ion-icon>
                            <ion-icon class="icon" name="logo-whatsapp"></ion-icon>
                        </div>
                    </div>
                </div>
                <p class="copyright">copyright from Me</p>
            </footer>
        </div>
    </div>
    )

  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
    const params = this.props.params;
    if (params && params.id) {
      this.apiGetProduct(params.id);
    }

    // Gọi các hàm từ js.js và gán vào component
    this.plusSlides = plusSlides;
    this.currentSlide = currentSlide;

    // Bắt đầu auto slide
    showSlides();
}

  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
 // event-handlers
 btnAdd2CartClick(e, productId) {
  e.preventDefault();
  const product = this.state.newprods.find(item => item._id === productId);
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
    alert('Add product success');
  } else {
    alert('Please input quantity');
  }
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
export default Home;