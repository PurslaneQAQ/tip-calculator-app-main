import React from 'react';
import { hot } from 'react-hot-loader';
import Container from './components/container';
import 'antd/dist/antd.css';
import './App.scss';

const Logo = require('./images/logo.svg') as string;

function App() {
  return (
    <div className="App">
      <img alt="logo" className="App-logo" src={Logo} />
      <Container />
    </div>
  );
}

export default hot(module)(App);
