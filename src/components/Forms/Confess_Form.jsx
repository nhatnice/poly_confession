import React, { Component } from 'react';
import { BsChatSquareQuoteFill, BsCardImage, BsArrowRightShort } from 'react-icons/bs';
import Axios from 'axios';
import autosize from 'autosize';
import { SERVER_LINK, API_LINK } from '../../functions/Global';
import API from '@api';
import Orios from '@orios';
import CONFIG from '@config';

import '../../styles/components/_confess_forms.scss';

class HeaderBreakLine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="section-line">
        <div className="line"></div>
        <div className="circle">
          <div className="icon-contain">
            <BsChatSquareQuoteFill className="icon" />
          </div>
        </div>
      </div>
    );
  }
}

class ConfessForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasImage: 'none',
      image: '',
      imageName: '',
      postBackgroundActive: 'none',
      ConfessUploadSuccessful: 'flex',
      ConfessUploadMsg: '',
      msg: '* Bắt buộc',
      background_select_is_hidden: 'flex',
    };
  }

  componentDidMount() {
    autosize(this.refs.confessInput);
  }

  handleImageUpload = async (file) => {
    let bannerRes = await Orios.Files.uploadMedia(file);

    this.setState({
      image: `url(${bannerRes.url}) no-repeat center center / cover`,
      imageName: bannerRes.url,
      hasImage: 'flex',
      background_select_is_hidden: 'none',
    });
  };

  handleSelectPostBackground = (background_id) => {
    this.setState({
      postBackgroundActive: background_id,
    });
  };

  handleConfessUpload = async () => {
    let confess = this.refs.confessInput.value;
    let image = this.state.imageName;
    let background =
      this.state.postBackgroundActive != 'none'
        ? `${window.location.origin}${CONFIG.postBackgroundPath}${this.state.postBackgroundActive}.jpg`
        : null;

    let now = new Date();
    let month = now.getMonth() + 1;
    month = month <= 9 ? '0' + month : month;
    let date = now.getDate();
    date = date <= 9 ? '0' + date : date;

    if (confess === '') {
      this.setState({
        msg: 'Hãy nhập confess đi :3',
      });
    } else {
      await API.Confessions.add(confess, image || background, {
        hasImage: !!image,
        hashtag: `CFS${now.getYear() - 100}${month}${date}${now.getHours()}${now.getMinutes()}`,
      });

      this.setState({
        ConfessUploadMsg: 'Confess của bạn đã đăng thành công!',
        ConfessUploadSuccessful: 'none',
        background_select_is_hidden: 'none',
        hasImage: 'none',
      });
    }
  };

  render() {
    return (
      <form id="confess-form" name="confess-form" className="confess-form-mini">
        <h4 className="messages">{this.state.ConfessUploadMsg}</h4>
        <div
          style={{ width: '100%', textAlign: 'left', display: this.state.ConfessUploadSuccessful }}
        >
          <a id="error-confess" style={{ display: this.state.ConfessUploadSuccessful }}>
            {this.state.msg}
          </a>
        </div>
        <br />
        <textarea
          type="text"
          ref="confessInput"
          style={{ display: this.state.ConfessUploadSuccessful }}
          rows={1}
          placeholder="Hãy chia sẻ mọi cảm xúc của bạn!"
        ></textarea>
        <div className="confess_image_container" style={{ display: this.state.hasImage }}>
          <div className="image" style={{ background: this.state.image }}></div>
          <div className="image_shadow">
            <div className="shadow_image" style={{ background: this.state.image }}></div>
          </div>
        </div>
        <div
          className="confess_background_choosen_container"
          style={{ display: `${this.state.background_select_is_hidden}` }}
        >
          <div className="confess_background_select_container">
            <div
              className={`confess_background_item ${this.state.postBackgroundActive === 'none' ? 'active' : ''}`}
              onClick={() => {
                this.handleSelectPostBackground('none');
              }}
              data-background="none"
              style={{ background: '#fff' }}
            ></div>
            <div
              className={`confess_background_item ${this.state.postBackgroundActive === '4' ? 'active' : ''}`}
              onClick={() => {
                this.handleSelectPostBackground('4');
              }}
              data-background="0"
            ></div>
            <div
              className={`confess_background_item ${this.state.postBackgroundActive === '5' ? 'active' : ''}`}
              onClick={() => {
                this.handleSelectPostBackground('5');
              }}
              data-background="1"
            ></div>
            <div
              className={`confess_background_item ${this.state.postBackgroundActive === '6' ? 'active' : ''}`}
              onClick={() => {
                this.handleSelectPostBackground('6');
              }}
              data-background="2"
            ></div>
            <div
              className={`confess_background_item ${this.state.postBackgroundActive === '7' ? 'active' : ''}`}
              onClick={() => {
                this.handleSelectPostBackground('7');
              }}
              data-background="3"
            ></div>
          </div>
        </div>
        <div
          className="confess_submit_container"
          style={{ display: this.state.ConfessUploadSuccessful }}
        >
          <div className="confess_upload_image_btn" style={{ background: '#ffffff' }}>
            <input
              onChange={(e) => {
                this.handleImageUpload(e.target.files[0]);
              }}
              ref="image"
              name="image"
              type="file"
              id="file"
              accept="image/*"
              className="inputfile"
            />
            <label htmlFor="file">
              <BsCardImage className="icon" />
              <a>Thêm hình ảnh</a>
            </label>
          </div>
          <button
            className="btn"
            id="confess-submit"
            type="button"
            onClick={() => {
              this.handleConfessUpload();
            }}
          >
            Đăng
            <BsArrowRightShort className="btn-icon" />
          </button>
        </div>
      </form>
    );
  }
}

export default ConfessForm;
