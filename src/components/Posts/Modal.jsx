import React, {Component} from 'react';

class PictureModal extends Component {
    render() {
        return(
            <div className="modal picture" style={this.props.is_open ? {display: "flex"} : {display: "none"}}>
                <img src={this.props.img} alt="confession image"/>
                <button className="close_btn" onClick={this.props.onClosePictureModal}>Thoát</button>
            </div>
        )
    }
}

export {
    PictureModal
}