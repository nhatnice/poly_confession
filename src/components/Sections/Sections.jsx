import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import "./styles.scss";
import BannerIcon from '../../styles/resources/icons/marketplace-icon.png';

class SectionBanner extends Component {
    render() {
        return(
            <article className="section_c banner" style={{background: `url(${this.props.image})`}}>
                <img className="image" src={BannerIcon}/>
                <span className="title">{this.props.title}</span>
                <span className="text">{this.props.text}</span>
            </article>
        )
    }
}

class SectionHeader extends Component {
    render() {
        return(
            <article className="section_c headers" style={this.props.style}>
                <span>{this.props.text}</span>
                <h1>{this.props.title}</h1>
            </article>
        )
    }
}

class SectionCategories extends Component {
    render() {
        if(!this.props.categories) {
            return(<div></div>)
        }

        return(
            <div className="section_c categories_container" style={this.props.style}>
                {this.props.categories.map((data, i) => {
                    return( 
                        <Link to={data.link} className="categories" style={{backgroundImage: `url(${data.image})`}}>
                            <h1>{data.title}</h1>
                            <span>{data.text}</span>
                        </Link>
                    )
                })}
            </div>
        )
    }
}

export {
    SectionBanner,
    SectionHeader,
    SectionCategories
}