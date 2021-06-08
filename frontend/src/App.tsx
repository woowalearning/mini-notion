import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Editor from './components/Editor/Editor';
import Auth from './hoc/auth';
import NaverLoginGetProfile from './components/LoginPage/NaverLoginGetProfile';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>우아한 테크러닝</h1>
      <Router>
        <Route exact path="/" component={Auth(LoginPage, false)} />
        <Route exact path="/editor" component={Auth(Editor, true)} />
        <Route path="/naver-login">
          <NaverLoginGetProfile />
        </Route>
      </Router>
    </div>
  )
}

export default App;
