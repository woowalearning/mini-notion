import React, { Component } from 'react';
import './App.css';
import SlatePageContainer from './components/SlatePageContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>우아한 테크코스</h1>
        <h2>slate-js 프로토타입</h2>
        <span>
          ctrl + ` : 코드 블럭 생성 및 제거
          <br />
          ctrl + b : 굵게
          <br />
          ctrl + * : 불릿 생성 및 제거
        </span>
        <SlatePageContainer />
      </div>
    );
  }
}

export default App;
