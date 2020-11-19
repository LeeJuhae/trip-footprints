import React, { Component } from 'react';
import Canvas from './Canvas';
import SlideDrawer from './SlideDrawer';
import BackDrop from './BackDrop';

class TpriMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageWidth: document.body.clientWidth,
      stageHeight: document.body.clientHeight,
      isOpen: false,
      tacks: [],
    }
		this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

		window.addEventListener('resize', this.resize.bind(this), false);
  }
  openDrawer = (e) => {
    if (this._ismount) {
      this.setState({
        ...this.state,
        isOpen: true,
      })
    }
  }
  closeDrawer = () => {
    if (this._ismount) {
      this.setState({
        ...this.state,
        isOpen: false
      })
    }
  }
	resize = () => {
		if (this._ismount) {
      this.setState({
        ...this.state,
        stageWidth: window.innerWidth,
        stageHeight: window.innerHeight});
    }
  }
  componentDidMount() {
    this._ismount = true;
  }
  render(){
    return (
      <div>
        <SlideDrawer isOpen={this.state.isOpen}/>
        {this.state.isOpen && <BackDrop close={this.closeDrawer}/>}
        <Canvas
          width={this.state.stageWidth}
          height={this.state.stageHeight}
          // width={this.state.stageWidth*this.pixelRatio}
          // height={this.state.stageHeight*this.pixelRatio}
          open={this.openDrawer}
          tacks={this.state.tacks}
        />
      </div>
    );
  }
}

export default TpriMap;
