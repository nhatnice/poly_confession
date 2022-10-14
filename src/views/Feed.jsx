import React, {Component, useEffect, useState} from 'react';
import API from '@api';

//COMPONENTS
import ConfessForm from '@components/Forms/Confess_Form';
import LixiForm from '@components/Forms/Lixi_Form';
import { getConfessFrom } from '../functions/API';
import {SplashScreen} from '@components/Splash_Screen';
import {ReactionBox} from '@components/Posts/Reaction';
import {PictureModal} from '@components/Posts/Modal';
import {GoogleAd} from '@components/Google';
import { MusicPlayer } from '@components/MusicPlayer';
import { PostCard } from '@components/Posts';
import { View } from '@components';

import AdsImage from '../styles/resources/2011.png';

class AdsPost extends Component {
  render() {
    return(
      <div style={{display: 'block', marginTop: "512px",position: "relative"}} className={`advertisement`}>
      </div>
    )
  }
}

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

const Feed = () => {//LOAD ALL CONFESS FROM SERVER
  const [confessions, setConfessions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImg, setModalImg] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let confessions = await API.Confessions.getAll();

    setConfessions(confessions);
  }

  //LOAD MORE WHEN USER SCROLL TO BOTTOM
  const trackScrolling = (event) => {
    const target = event.target;

    if(!this.state.is_getting_confess) {
      if((target.scrollHeight - target.scrollTop) / 2 <= target.clientHeight) {
        this.setState({
          range: this.state.range + 1,
          is_getting_confess: true
        })


        getConfessFrom(this.state.range, this.props.school_id, (data) => {
          
          this.setState({
            is_getting_confess: false
          })
          
          let new_confess_data = this.state.confess.concat(data);
          
          this.setState({
            confess: new_confess_data,
            school_id: this.props.school_id,
            is_getting_confess: false
          })
        });
      }
    }
  };

  //OPEN PICTURE MODAL
  const handleOpenPictureModal = (img) => {
    setModalVisible(true);
    setModalImg(img);
  }

  //CLOSE MODAL
  const handleCloseModal = () => {
    setModalVisible(false);
  }

  return(
    <View onScroll={trackScrolling}>
      <PictureModal is_open={modalVisible} img={modalImg} onClosePictureModal={handleCloseModal}/>
      <h1 className="view_header">Poly Confession</h1>
      <AdsHeader/>
      <LixiForm/>
      <ConfessForm/>
      <div className = "section confess aos-animate">
          {
          confessions.map(function(data, i){
              return <PostCard data={data} onOpenPicture={handleOpenPictureModal}/>
          }, this)}
      </div>
    </View>
  )
}

export default Feed;