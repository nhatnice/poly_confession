import React, {Component} from 'react';
import {SERVER_LINK} from '../functions/Global';
import {getAllConfess, getSingleConfess} from '../functions/Post_Func';
import io from 'socket.io-client';
import Axios from 'axios';

//COMPONENTS
import {ConfessSinglePost} from '../components/Posts/Post';
import {CommentsContainer} from '../components/Posts/CommentsBox';
import {Header} from '../components/Header/Header';
import {SplashScreen} from '../components/Splash_Screen';
import {Meta} from '../components/Meta/Meta';

const socket = io(SERVER_LINK);

class PostPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post_id: this.props.match.params.post_id,
            confess: null,
            client_ip: null
        }

        //GET ALL CONFESS FROM SERVER
        getSingleConfess(this.state.post_id, (data) => {
          this.setState({
            confess: data
          })
        });

        //GET CLIENT IP
        Axios.get("https://www.cloudflare.com/cdn-cgi/trace").then((result) => {
            let client_ip = result.data.split('\n')[2].split("=")[1];
            this.setState({
              client_ip: client_ip
            })
        })
    }

    render() {
        if(!this.state.confess || !this.state.client_ip) {
          return(<SplashScreen/>);
        } 

        return(
                <div className="postPreviewView">
                    <Meta title={this.state.confess.noi_dung}/>
                    <Header title="POST" HistoryParent={this}/>
                    <ConfessSinglePost confess={this.state.confess} post_id={this.state.post_id} client_ip={this.state.client_ip}/>
                    <CommentsContainer socket={socket} post_id={this.state.post_id}/>
                </div>
        )
    }
}

export default PostPreview;