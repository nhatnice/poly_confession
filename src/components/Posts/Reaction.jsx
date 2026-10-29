import React, { Component } from 'react';

//IMPORT ICON
import Sad from './Resources/sad.png';
import Funny from './Resources/funny.png';
import Angry from './Resources/angry.png';
import Love from './Resources/love.png';
import Like from './Resources/like.png';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

//API
import Orios from '@orios';

class ReactionBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked:
        this.props.emotions
          ?.map(function (e) {
            return e.client_ip;
          })
          .indexOf(this.props.client_ip) > -1
          ? true
          : false,
      likes: this.props.emotions || [],
    };
  }

  handleLike = async () => {
    let likesTemp = this.state.likes;

    if (!this.state.liked) {
      //LIKE
      likesTemp.push(localStorage.getItem('@auid'));
    } else {
      //UNLIKE
      likesTemp.splice(likesTemp.indexOf(localStorage.getItem('@auid')), 1);

      this.setState({
        likes: likesTemp,
      });
    }

    this.setState({
      liked: !this.state.liked,
      likes: likesTemp,
    });

    //Update data
    await Orios.Articles.update(this.props.confessId, {
      moreData: {
        emotions: likesTemp,
      },
    });
  };

  render() {
    return (
      <div className="reaction_box_container">
        <button
          className={this.state.liked ? 'react_btn liked' : 'react_btn'}
          onClick={this.handleLike}
        >
          {this.state.liked ? (
            <AiFillHeart className="icon" />
          ) : (
            <AiOutlineHeart className="icon" />
          )}
        </button>
        <p className={this.state.liked ? 'react_count liked' : 'react_count'}>
          {this.state.likes.length} Likes
        </p>
      </div>
    );
  }
}

export { ReactionBox };
