import React, { Component } from 'react';
import { BsArrowReturnRight } from 'react-icons/bs';
import './styles.scss';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

class LixiModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bao_lixi: this.props.bao_lixi,
      bao_2011: this.props.bao_2011,
      bao_hien_tai: 0,
    };
  }

  handleSelect = () => {
    this.props.onSelect(this.state.bao_hien_tai);
  };

  render() {
    const properties = {
      duration: 5000,
      autoplay: false,
      transitionDuration: 250,
      arrows: true,
      infinite: true,
      easing: 'linear',
      indicators: (i) => <div className="indicator">{i + 1}</div>,
    };

    return (
      <div
        className="modal lixi"
        style={this.props.is_open ? { display: 'flex' } : { display: 'none' }}
      >
        <div className="bao_lixis">
          <Slide
            {...properties}
            onChange={(oldIndex, newIndex) => this.setState({ bao_hien_tai: newIndex })}
          >
            {this.state.bao_2011.map((data, i) => {
              return (
                <div className="each-slide">
                  <div className="bao_lixi">
                    <img className="image" src={data} />
                  </div>
                </div>
              );
            })}
          </Slide>
        </div>
        <button className="btn" onClick={this.handleSelect}>
          Chọn
        </button>
      </div>
    );
  }
}

export { LixiModal };
