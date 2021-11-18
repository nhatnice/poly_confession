import React, {Component} from 'react';
import Typing from 'react-typing-animation';

import "./styles.scss";

class BaoLixi extends Component {
    constructor(props) {
        super(props);
        this.state ={
            openning: false
        }
    }

    handleOpen = () => {
        this.setState({
            openning: true
        })

        this.props.onOpen();
    }

    render() {
        return(
            <div className={this.state.openning ? "lixi openning" : "lixi"}>
                <div onClick={this.handleOpen} className="open_btn"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}  style={{display: this.state.openning ? 'none' : 'flex'}}>
                    MỞ
                </div>
                
                <div className="image" style={{backgroundImage: `url(${this.props.bao_lixi[this.props.data.bao_lixi]})`}}></div>
                <div className="image-shadow">
                    <div className="image-shadow-image" style={{backgroundImage: `url(${this.props.bao_lixi[this.props.data.bao_lixi]})`}}></div>
                </div>
            </div>
        )
    }
}

class Mail extends Component {
    constructor(props) {
        super(props);
        this.msg = React.createRef();
    }

    handleScrollBottom = () => {
        this.msg.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return ( 
        <div className={this.props.visible ? "thu_lixi openning" : "thu_lixi"}>    
            {this.props.visible ? 
            <Typing onBeforeType={() => this.handleScrollBottom()}>
                <p>{this.props.data.content}</p>
                <span>- {this.props.data.user} -</span>
            </Typing> :null}
            <div style={{ float:"left", clear: "both" }} ref={(el) => { this.msg = el; }}>
            </div>
        </div>
        )
    }
}

export {
    BaoLixi,
    Mail
}