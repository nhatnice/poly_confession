import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

const tags = "lavenes, lavenesconfession, nhats, devil, laven, confess, confession, confessions, laven studio, studio, design, school, truong, hvtcn, hung vuong, hùng, vương, trung, cấp, nghề, itc, giáo, dục, thường , xuyên, gdtx, cap, nghe, confession, ẩn danh, tâm sự, an danh, tam su, gop y";
const description = "Lavenes Confession. Là nơi cho bạn có thể tâm sự, gửi những ý kiến của bạn và hoàn toàn được ẩn danh. Vậy tại sao chúng ta không đăng một cofess để miêu tả tâm trạng hiện giờ của mình? Tại sao không?";
const title = "Lavenes Confession"

class Meta extends Component {
    render() {
        return(
            <div>
              <Helmet>
                    <meta name="description"
                      content={this.props.description != undefined ? this.props.description : description} />
                    <link rel="canonical" href="https://confession.lavenes.com/"/>
                    <meta name="keywords"
                      content={this.props.tags != undefined ? this.props.tags : tags} />
                    <meta property="og:type" content="website"/>
                    <meta property="og:title" content={this.props.title != undefined ? this.props.title : title}/>
                    <meta property="og:description"
                      content={this.props.description != undefined ? this.props.description : description}/>
                    <meta property="og:url" content="https://confession.lavenes.com/"/>
                    <meta property="og:site_name" content={this.props.title != undefined ? this.props.title : title}/>
                    <meta name="twitter:description"
                      content={this.props.description != undefined ? this.props.description : description}/>
                    <meta name="twitter:title" content={this.props.title != undefined ? this.props.title : title}/>
                    <meta name="author" content={title}/>
                    <title>{this.props.title != undefined ? this.props.title : title}</title>
            </Helmet>
          </div>
        )
    }
}

export {
    Meta
}