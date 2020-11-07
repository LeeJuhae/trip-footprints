import React, { Component } from 'react';
import Canvas from './components/Canvas.js';
import SlideDrawer from './SlideDrawer/SlideDrawer.js';
import BackDrop from './SlideDrawer/BackDrop.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  closeDrawer= () => {
    this.setState({
      isOpen: false
    })
  }
  toggleDrawer = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render(){
    return (
      <div>
        <SlideDrawer isOpen={this.state.isOpen}/>
        {this.state.isOpen && <BackDrop close={this.closeDrawer}/>}
        <Canvas toggle={this.toggleDrawer}/>
      </div>
    );
  }
}

export default App;
