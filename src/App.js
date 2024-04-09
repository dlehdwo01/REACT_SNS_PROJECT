// js import ~
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import User from './pages/User';
import Profile from './pages/Profile';
import BoardView from './pages/BoardView';
import Nav from './components/Nav';
import Menu from './components/Menu';

// ~ js import
import './App.css';
import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  BrowserRouter as Router
} from "react-router-dom";
import { createStore } from 'redux';
import { Provider, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'

const reducer = (state, action) => {
  if (state == null) {
    return { id: 'good' };
  }
  return state;
};
const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <div id="Container">
        <Router>
          {/* <Nav></Nav> */}
          <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/join" element={<Join></Join>}></Route>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/home/:userId" element={<User></User>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/board/:boardNo" element={<BoardView></BoardView>}></Route>

          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
