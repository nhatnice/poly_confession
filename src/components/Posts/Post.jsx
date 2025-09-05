import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {SERVER_LINK} from '../../functions/Global';
import DocumentMeta from 'react-document-meta';

//FUNCTIONS
import {getAllConfess, getSingleConfess} from '../../functions/Post_Func';
import {timeSince} from '../../functions/Lavenst_Func';
import Axios from 'axios';

//COMPONENTS
import ConfessForm from '../Forms/Confess_Form';
import LixiForm from '../Forms/Lixi_Form';
import { getConfessFrom } from '../../functions/API';
import {SplashScreen} from '../Splash_Screen';
import {ReactionBox} from './Reaction';
import {PictureModal} from './Modal';
import {GoogleAd} from '../Google';

import AdsImage from '../../styles/resources/2011.png';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    }
  }

  handlePlay = () => {
    if(!this.state.isPlaying) {
      this.refs.audioRef.play();
      this.setState({
        isPlaying: true
      });
    }else{
      this.refs.audioRef.pause();
      this.setState({
        isPlaying: false
      });
    }
  };

  handlePrev = () => {
    this.refs.audioRef.currentTime = 0;
  }

	render() {
    return(
          <div className="player">
          	<div id="info" className="info">
          		<span className="artist">Flume</span>
          		<span className="name">Say it</span>
          		<div className="progress-bar">
          			<div className="bar"></div>
          		</div>
          	</div>
          	<div ref="controlPanel" className={this.state.isPlaying ? "control-panel active" : "control-panel"}>
          		<div className="album-art"></div>
          		<div className="controls">
          			<div className="prev" onClick={this.handlePrev}></div>
          			<div id="play" className="play" onClick={this.handlePlay}></div>
          			<div className="next"></div>
          		</div>
          	</div>
            <audio src={this.props.source} ref="audioRef"/>
          </div>
    )
  }
}

class ConfessSinglePost extends Component {
  render() {
    var daysInWeek = ["Chủ Nhật","Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    let data = this.props.confess

        //DEFAULT POST
        if(data.image[0] == "" && data.background == 'none') {
          var ngayTao = new Date(data.ngayTao);

          return(
              <div className="confess_container_parent">
                <div to={`/post/${data._id}`} key={`${data._id}`} className={`confess_container`} style={{}}>
                      <p className="hastag">
                        {data.hashtag != '' ? '# ' + data.hashtag : "CFS" + data.confess_id }
                      </p>
                      <p className="confess">{data.noidung}</p> 
                    <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">{timeSince(new Date(data.ngayTao))}</p>
                    <ReactionBox id={data._id} client_ip={this.props.client_ip} emotions={data.emotions}/>
                </div>
              </div>
          )
          //HAS IMAGE
        }else if(data.image[0] != "") {
          var ngayTao = new Date(data.ngayTao);

          return(
          <div className="confess_container_parent">
            <div to={`/post/${data._id}`} key={`${data._id}`} className="confess_container hasImage">
                <div className="confess_image_filter">
                  <p className="hastag">
                    {data.hashtag != '' ? '# ' + data.hashtag : "CFS" + data.confess_id}
                  </p>
                  <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">{timeSince(new Date(data.ngayTao))}</p>
                    <p className="confess">{data.noidung}</p>
                </div>
                <div className="confess_image" style={{background: `url(${SERVER_LINK}/media/${data.image}) no-repeat center center / cover`}}>

                </div>
                <div className="confess_image_shadow">
                    <div className="confess_image_shadow_image" style={{background: `url(${SERVER_LINK}k/media/${data.image}) no-repeat center center / cover`}}>

                    </div>
                </div>
            </div>
          </div>
          )
          //HAS BACKGROUND
        }else if(data.background >= 0) {
          var ngayTao = new Date(data.ngayTao);
  
          return(
          <div className="confess_container_parent">
            <div to={`/post/${data._id}`} key={`${data._id}`} className="confess_container hasBackground">
                <div className="confess_image" style={{background: `url(/resources/images/post/${data.background}.jpg) no-repeat center center / cover`}}>    
                  <p className="hastag">
                    {data.hashtag != '' ? '# ' + data.hashtag : "CFS" + data.confess_id}
                  </p>
                  <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">{timeSince(new Date(data.ngayTao))}</p>
                    <p className="confess">{data.noidung}</p>
                </div>
                <div className="confess_image_shadow">
                    <div className="confess_image_shadow_image" style={{background: `url(/resources/images/post/${data.background}.jpg) no-repeat center center / cover`}}>

                    </div>
                </div>
            </div>
          </div>
          )
        //HAS AUDIO
        }else if(data.audio[0] !== "") {
          var ngayTao = new Date(data.ngayTao);
          
          return(
          <div className="confess_container_parent">
            <div to={`/post/${data._id}`} key={`${data._id}`} className="confess_container hasAudio">
                <div className="confess_image" style={{background: `url(/resources/images/post/${data.background}.jpg) no-repeat center center / cover`}}>    
                  <p className="hastag">
                    {data.hashtag != '' ? '# ' + data.hashtag : "CFS" + data.confess_id}
                  </p>
                  <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">{timeSince(new Date(data.ngayTao))}</p>
                  <MusicPlayer source={`${SERVER_LINK}/resources/media/${data.audio[0]}`}/>
                </div>
            </div>
          </div>
          )
        }
  }
}

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

class ConfessPost extends Component {
    constructor(props) {
      super(props);
      this.state = {
        confess: undefined,
        range: 0,
        school_id: null,
        client_ip: '0.0.0.0',
        is_getting_confess: false,
        modal_is_open: false,
        modal_img: ""
      }

      this.handleLoadConfess();

      //GET CLIENT IP
      // Axios.get("https://www.cloudflare.com/cdn-cgi/trace").then((result) => {
      //     let client_ip = result.data.split('\n')[2].split("=")[1];
      //     this.setState({
      //       client_ip: client_ip
      //     })
      // })
    }

    //LOAD ALL CONFESS FROM SERVER
    handleLoadConfess = () => {
      getConfessFrom(0, this.props.school_id, (data) => {
        this.setState({
          range: 0,
          confess: data,
          school_id: this.props.school_id
        })
      });
    }
  
    //LOAD MORE WHEN USER SCROLL TO BOTTOM
    trackScrolling = (event) => {
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
    handleOpenPictureModal = (img) => {
      this.setState({
        modal_is_open: true,
        modal_img: img
      })
    }

    //CLOSE MODAL
    handleCloseModal = () => {
      this.setState({
        modal_is_open: false
      })
    }
  
    render() {
      var daysInWeek = ["Chủ Nhật","Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  
      if(!this.state.confess || !this.state.client_ip) {
        return(<SplashScreen/>);
      }

      //RELOAD WHEN USER NAVIGATE TO ANOTHER SCHOOL
      if(this.state.school_id !== this.props.school_id) {
        //SCROLL TO TOP
        window.scrollTo(0, 0);
        
        //RELOAD DATA
        this.handleLoadConfess();
        
        return(<SplashScreen/>);
      }

      return(
        
      <div className="section_scrollable" onScroll={this.trackScrolling}>
        <PictureModal is_open={this.state.modal_is_open} img={this.state.modal_img} onClosePictureModal={this.handleCloseModal}/>
      <h1 className="view_header">{this.state.school_id.toUpperCase()} Confession</h1>
        <AdsHeader/>
        <LixiForm/>
        <ConfessForm/>
        <div className = "section confess aos-animate">
            {
            this.state.confess.map(function(data, i){
          //DEFAULT POST
          if(data.image[0] == "" && data.background == 'none') {
            var ngayTao = new Date(data.ngayTao);
            return(
              <div className="confess_container_parent">
                {i % 2 === 0 ? null : null }
                <div to={`/post/${data._id}`} key={`${data._id}`} className={`confess_container`} style={{}}>
                    <p className="hastag">
                      {data.hashtag != '' ? '# ' + data.hashtag : "CFS" + data.confess_id}
                    </p>
                    <p className="confess">{data.noidung}</p> 
                    <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">{timeSince(new Date(data.ngayTao))}</p>
                    <Link to={`/post/${data._id}`} key={`${data._id}`} className="comments_count">{data.comments.length} bình luận</Link>                
                    <ReactionBox id={data._id} client_ip={this.state.client_ip} emotions={data.emotions}/>
                </div>
              </div>
            )
            //HAS IMAGE
          }else if(data.image[0] != "") {
            var ngayTao = new Date(data.ngayTao);
  
            return(
              <div className="confess_container_parent">
                <div to={`/post/${data._id}`} key={`${data._id}`} className="confess_container hasImage">
                    <div className="confess_image_filter">
                        <p className="hastag">
                          {data.hashtag != '' ? '# ' + data.hashtag : "CFS" + data.confess_id}
                        </p>
                        <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">{timeSince(new Date(data.ngayTao))}</p>
                        <p className="confess">{data.noidung}</p>
                        <Link to={`/post/${data._id}`} key={`${data._id}`} className="comments_count">{data.comments.length} bình luận</Link>
                        <ReactionBox id={data._id} client_ip={this.state.client_ip} emotions={data.emotions}/>
                    </div>
                    <div className="confess_image" onClick={() => this.handleOpenPictureModal(`${SERVER_LINK}/media/${data.image}`)} style={{background: `url(${SERVER_LINK}/media/${data.image}) no-repeat center center / cover`}}>
              
                    </div>
                    <div className="confess_image_shadow">
                        <div className="confess_image_shadow_image" style={{background: `url(${SERVER_LINK}/media/${data.image}) no-repeat center center / cover`}}>
              
                        </div>
                    </div>
                </div>
              </div>
            )
            //HAS BACKGROUND
          }else if(data.background >= 0) {
            var ngayTao = new Date(data.ngayTao);
    
            return(
              <div className="confess_container_parent">
                <div to={`/post/${data._id}`} key={`${data._id}`} className="confess_container hasBackground">
                    <div className="confess_image" style={{background: `url(/resources/images/post/${data.background}.jpg) no-repeat center center / cover`}}>
                        <p className="hastag">
                          {data.hashtag != '' ? '# ' + data.hashtag : "CFS" + data.confess_id}
                        </p>
                        <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">{timeSince(new Date(data.ngayTao))}</p>
                        <p className="confess">{data.noidung}</p>
                        <Link to={`/post/${data._id}`} key={`${data._id}`} className="comments_count">{data.comments.length} bình luận</Link>
                        <ReactionBox id={data._id} client_ip={this.state.client_ip} emotions={data.emotions}/>
                    </div>
                    <div className="confess_image_shadow">
                        <div className="confess_image_shadow_image" style={{background: `url(/resources/images/post/${data.background}.jpg) no-repeat center center / cover`}}>
              
                        </div>
                    </div>
                </div>
              </div>
            )//HAS AUDIO
          }else if(data.audio[0] !== "") {
            var ngayTao = new Date(data.ngayTao);
    
            return(
              <div className="confess_container_parent">
                {i % 5 === 0 ? null : null}
                <div to={`/post/${data._id}`} key={`${data._id}`} className={`confess_container hasAudio`} style={{}}>
                    <p className="hastag">
                      {data.hashtag != '' ? '# ' + data.hashtag : "CFS" + data.confess_id}
                    </p>
                    <MusicPlayer source={`${SERVER_LINK}/resources/media/${data.audio[0]}`}/>
                    <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">{timeSince(new Date(data.ngayTao))}</p>
                    <Link to={`/post/${data._id}`} key={`${data._id}`} className="comments_count">{data.comments.length} bình luận</Link>                
                    <ReactionBox id={data._id} client_ip={this.state.client_ip} emotions={data.emotions}/>
                </div>
              </div>
            )
          }
            }, this)}
        </div>
      </div>
      )
    }
  }

export {
  ConfessPost,
  ConfessSinglePost
}