import React, {Component} from "react";

//IMPORT ICON
import Sad from './Resources/sad.png';
import Funny from './Resources/funny.png';
import Angry from './Resources/angry.png';
import Love from './Resources/love.png';
import Like from './Resources/like.png';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';

//API
import {sendEmotionToConfess} from '../../functions/API';

class ReactionBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: this.props.emotions.map(function(e) { return e.client_ip; }).indexOf(this.props.client_ip) > -1 ? true : false,
            like_count: this.props.emotions.length
        }
    }

    handleLike = () => {
        sendEmotionToConfess("like", this.props.id, (res) => {});
        
        if(!this.state.liked) {
            this.setState({
                liked: true,
                like_count: parseInt(this.state.like_count) + 1
            })
        }else{
            this.setState({
                liked: false,
                like_count: parseInt(this.state.like_count) - 1
            })
        }
    }

    render() {
        return(
            <div className="reaction_box_container">
                <button className={this.state.liked ? "react_btn liked" : "react_btn"} onClick={this.handleLike}>{this.state.liked ? <AiFillHeart className="icon"/> : <AiOutlineHeart className="icon"/>}</button><p className={this.state.liked ? "react_count liked" : "react_count"}>{this.state.like_count} Likes</p>
            </div>
        )
    }
}

export {
    ReactionBox
}