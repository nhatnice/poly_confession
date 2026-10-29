import React, { Component } from 'react';

export class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  handlePlay = () => {
    if (!this.state.isPlaying) {
      this.refs.audioRef.play();
      this.setState({
        isPlaying: true,
      });
    } else {
      this.refs.audioRef.pause();
      this.setState({
        isPlaying: false,
      });
    }
  };

  handlePrev = () => {
    this.refs.audioRef.currentTime = 0;
  };

  render() {
    return (
      <div className="player">
        <div id="info" className="info">
          <span className="artist">Flume</span>
          <span className="name">Say it</span>
          <div className="progress-bar">
            <div className="bar"></div>
          </div>
        </div>
        <div
          ref="controlPanel"
          className={this.state.isPlaying ? 'control-panel active' : 'control-panel'}
        >
          <div className="album-art"></div>
          <div className="controls">
            <div className="prev" onClick={this.handlePrev}></div>
            <div id="play" className="play" onClick={this.handlePlay}></div>
            <div className="next"></div>
          </div>
        </div>
        <audio src={this.props.source} ref="audioRef" />
      </div>
    );
  }
}
