import React, { Component } from 'react';
import Canvas from './components/Canvas.js';
import SlideDrawer from './SlideDrawer/SlideDrawer.js';
import BackDrop from './SlideDrawer/BackDrop.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
			stageWidth: window.innerWidth,
			stageHeight: window.innerHeight,
      isOpen: false,
    }
		window.addEventListener('resize', this.handleResize.bind(this), false);
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
	handleResize = () => {
		if (this._ismount)
      this.setState({stageWidth: window.innerWidth, stageHeight: window.innerHeight});
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
          stageWidth={this.state.stageWidth}
          stageHeight={this.state.stageHeight}
          open={this.openDrawer}
          />
      </div>
    );
  }
}

export default App;
