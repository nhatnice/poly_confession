import React, {Component} from 'react';

import AdsImage from '../../styles/maxresdefault.jpg';

class AdsTopHeader extends Component {
    render() {
        return(
            <div className="ads_top_header_container">
                <img src={AdsImage}/>
                <div className="image_shadow" style={{backgroundImage: `url(${AdsImage})`}}></div>
            </div>
        )
    }
}

export {
    AdsTopHeader
}