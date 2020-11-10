import React, { Component } from 'react';
import Canvas from './components/Canvas.js';
import SlideDrawer from './SlideDrawer/SlideDrawer.js';
import BackDrop from './SlideDrawer/BackDrop.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageWidth: document.body.clientWidth,
      stageHeight: document.body.clientHeight,
			// stageWidth: window.innerWidth,
			// stageHeight: window.innerHeight,
      isOpen: false,
      tacks: [],
    }
		this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

		window.addEventListener('resize', this.resize.bind(this), false);
  }
  openDrawer = () => {
    this.setState({
      isOpen: true
    })
  }
  closeDrawer = () => {
    this.setState({
      isOpen: false
    })
  }
	resize = () => {
		if (this._ismount) {
      this.setState({stageWidth: window.innerWidth, stageHeight: window.innerHeight});
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
          width={this.state.stageWidth*this.pixelRatio}
          height={this.state.stageHeight*this.pixelRatio}
          open={this.openDrawer}
          tacks={this.state.tacks}
          />
      </div>
    );
  }
}

export default App;
