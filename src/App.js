// js import ~
import Home from './pages/Home';
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
    <div>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
