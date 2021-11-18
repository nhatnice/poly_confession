import React, {Component} from 'react';
import {Meta} from '../components/Meta/Meta';
import {API} from '../functions/API';
import AdsImage from '../styles/resources/2011.png';
import LixiForm from '../components/Forms/Lixi_Form';
import {SchoolCard} from '../components/Cards/Cards';
import gdtxq6Banner from '../styles/resources/schoolBanner/gdtxq6.png'
import tcnhvBanner from '../styles/resources/schoolBanner/tcnhv.png'
import Footer from '../components/Footer'
import {numberWithCommas} from '../functions/Global';
import {SplashScreen} from '../components/Splash_Screen';

class AdsHeader extends Component {
  render() {
    return(
      <div className="ads_container_parent">
            <a href="https://lavenes.com/" target="_blank">
              <div className="ads_image" style={{background: `url(${AdsImage}) no-repeat center center / cover`}}>

              </div>
              <div className="ads_image_shadow">
                  <div className="ads_image_shadow_image" style={{background: `url(${AdsImage}) no-repeat center center / cover`}}>

                  </div>
              </div>
            </a>
      </div>
    )
  }
}

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        gdtxQ6Posts: null,
        tcnhvPosts: null
      }

      API.get("get_all_confess", (res) => {
        let gdtxQ6Posts = res.filter((item) => {
          return item.school_id == "gdtx"
        });
        
        let tcnhvPosts = res.filter((item) => {
          return item.school_id == "tcnhv"
        });

        this.setState({
          gdtxQ6Posts: gdtxQ6Posts,
          tcnhvPosts: tcnhvPosts
        })
      })
    }

    render() {
      if(!this.state.gdtxQ6Posts || !this.state.tcnhvPosts) return <SplashScreen/>;
      return (
          <div className="section_scrollable" style={{display: "block"}}>
            <Meta/>
            <h1 class="view_header">Lavenes Confession</h1>

            <AdsHeader/>
            <LixiForm/>
            <h4 className="section-header">Confessions</h4>
            <SchoolCard title={"TT GDNN - GDTX Q6"} subTitle={`${numberWithCommas(this.state.gdtxQ6Posts.length)} bài viết`} image={gdtxq6Banner} link="/confession/gdtx"/>
            <SchoolCard title={"Hùng Vương Technology Vocational"} subTitle={`${numberWithCommas(this.state.tcnhvPosts.length)} bài viết`} image={tcnhvBanner} link="/confession/tcnhv"/>
          
            <Footer/>
          </div>
      )
    }
}

export default Home;