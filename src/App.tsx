import * as moment from 'moment'
import * as React from 'react';

import Timer from './components/timer'

import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
    <Timer targetTime={moment('2018-09-11')} updateFreq={100}>
      {({timeLeft})=> <div>{timeLeft && timeLeft.asSeconds()}</div>}
    </Timer>
      </div>
    );
  }
}

export default App;
