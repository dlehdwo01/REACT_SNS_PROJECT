// js import ~
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import User from './pages/User';
import Profile from './pages/Profile';
import Nav from './components/Nav';
import Menu from './components/Menu'
// ~ js import
import './App.css';
import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  BrowserRouter as Router
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => {

  return (
    <div id="Container">
      <Router>
        {/* <Nav></Nav> */}
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/join" element={<Join></Join>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/home/:userId" element={<User></User>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
