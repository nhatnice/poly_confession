import React, {Component} from "react";
import "../styles/components/Spiners.scss";

class HashSpiner extends Component {
    render() {
        return(     
		<div className="spiners hash">
            <div className="rot"></div>
            <div className="tor"></div>
        </div>
        )
    }
}

export {
    HashSpiner
}