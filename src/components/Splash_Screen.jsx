import React, { Component } from 'react';
import { HashSpiner } from './Spiners';
import HashLoader from 'react-spinners/HashLoader';

let quotes = [
  'Bạn có biết Lavenes Confession được thiết kế và lập trình bởi Nhats Devil ?',
  'Bạn có thể upload ảnh cho confess của mình đấy!',
  'Nên nhớ các ad sẽ không đăng các confess mang tính chất hù dọa, chửi lộn nhé!',
  'Theo các sự kiện trong năm Confession sẽ được update tính năng tương ứng để mọi người sử đụng!',
  'Bạn có thể like và comment vào bài confession trên Web đấy!',
  'Winner Winner Chicken Dinner 🎉',
];

class SplashScreen extends Component {
  render() {
    return (
      <div className="splash_screen">
        <HashLoader size={50} color={'#2484FF'} loading={true} />
        <h1>{quotes[Math.floor(Math.random() * quotes.length)]}</h1>
      </div>
    );
  }
}

export { SplashScreen };
