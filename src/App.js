import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import TpriMap from './TpriMap';
import LandingPage from './LandingPage';
import './styles/App.css';

class App extends Component {
  render(){
    return (
      <div>
        <header>
          <div className="wrap-head">
            <h1>
              <Link to="/" className="link-tpri">
                <span>TPRI</span>
              </Link>
            </h1>
            <h2>
              <Link to="/" className="link-signout">
                  <span>sIgn ouT</span>
              </Link>
            </h2>
            <h2>
              <Link to="/tprimap" className="link-signin">
                  <span>sIgn In</span>
              </Link>
            </h2>
          </div>
        </header>
        <div>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/tprimap' component={TpriMap}/>
        </div>
      </div>
    );
  }
}

export default App;
