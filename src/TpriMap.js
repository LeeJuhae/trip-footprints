import React, { Component } from 'react';
import Canvas from './Canvas';
import SlideDrawer from './SlideDrawer';
import BackDrop from './BackDrop';

class TpriMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      lat: -1,
      lng: -1,
      address: ''
    }
		// this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
  }

  openDrawer = (latlng, address) => {
    if (this._ismount) {
      this.setState({
        ...this.state,
        isOpen: true,
        lat: latlng.Ma,
        lng: latlng.La,
        address: address
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

  componentDidMount() {
    this._ismount = true;
  }
  render(){
    return (
      <div>
        {localStorage.getItem('id') === "" ? window.location.href='/'
        :
        <div style={{position: "relative"}}>
          <SlideDrawer isOpen={this.state.isOpen} lat={this.state.lat} lng={this.state.lng} address={this.state.address}/>
          {this.state.isOpen && <BackDrop close={this.closeDrawer}/>}
          <Canvas open={this.openDrawer}/>
        </div>}
      </div>
    );
  }
}

export default TpriMap;
