import React, {Component} from 'react';

//COMPONENTS
import {ConfessPost} from '../components/Posts/Post';
import {Meta} from '../components/Meta/Meta';


class Confession extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    let confession = localStorage.getItem("@confession");

    //Check confession
    if(!confession || confession != this.props.match.params.id) {
      console.log("TRUE");
      window.location.reload();
    }
    
    //Save confession
    localStorage.setItem("@confession", this.props.match.params.id);
  }

  render() {
    const meta = {
        title: "Laven Confession",
        description: "Laven Confession. Là nơi cho bạn có thể tâm sự, gửi những ý kiến của bạn và hoàn toàn được ẩn danh. Vậy tại sao chúng ta không đăng một cofess để miêu tả tâm trạng hiện giờ của mình? Tại sao không?",
        canonical: window.location.href,
        image: "%PUBLIC_URL%/resources/images/thumbnail/thumbnail.jpg",
        meta: {
          charset: 'utf-8',
          name: {
            image: '%PUBLIC_URL%/resources/images/thumbnail/thumbnail.jpg'
          }
        }
      };

    return ( 
          <div>
            <Meta/>
            <ConfessPost school_id={window.location.hash.replace("#","").replace("/","").split("/")[1]}/>
          </div>
    )
  }
}

export default Confession;