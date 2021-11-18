import React, {Component} from 'react'
import {BsChatDots, BsArrowUpShort} from 'react-icons/bs';

//FUNCTIONS
import {getSingleConfess} from '../../functions/Post_Func';
import {timeSince} from '../../functions/Lavenst_Func';

class CommentBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: undefined
        }

        //LOAD COMMENTS FROM DATABASE
        getSingleConfess(this.props.post_id, (data) => {
            this.setState({
                comments: data.comments.reverse()
            })
        });
    }

    updateComment = (comment) => {
        this.setState({
            comments: this.state.comments.concat([{comment: comment, date: new Date()}])
        })
    }

    render() {
        if(!this.state.comments) {
            return(<div>LOADING...</div>);
        }

        return(
            this.state.comments.map((data,i) => {
                return(
                    <div className="commentBox"><span className="date">{timeSince(new Date(data.date))}</span><p>{data.comment}</p></div>
                )
            })
        )
    }
}

class CommentsContainer extends Component {
    constructor(props) {
      super(props);
      this.childRef = React.createRef();
    }
    
    sendComment = () => {
        if(this.refs.comment.value !== "") {
            this.childRef.current.updateComment(this.refs.comment.value);
            this.props.socket.emit("client-send-comment", {
                post_id: this.props.post_id,
                comment: this.refs.comment.value, 
                user: "", 
                date: new Date(), 
                likes: [], 
                images: [], 
                videos: [], 
                type: 0
            })
            this.refs.comment.value = "";
        }
    }

    render() {
        return(
            <div className="commentsContainer">
                <CommentBox  post_id={this.props.post_id} ref={this.childRef}/>
                
                <div className="sendCommentContainer" ref={this.parentRef}>
                    <BsChatDots className="icon"/>
                    <input ref="comment" type="text" placeholder="Gửi bình luận..."/>
                    <button type="button" onClick={this.sendComment} className="circle"><BsArrowUpShort className="icon"/></button>
                </div>
            </div>
        )
    }
}

export {
    CommentsContainer
}