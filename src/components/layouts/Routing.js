import React from 'react';
import {Route,Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';


const Routing = (props) => {
  return (
        <React.Fragment>
            <Routes>
                <Route path='/' element = {<Home />}/>
                <Route path='about' element = {<About />}/>
                <Route path='contact' element = {<Contact />}/>
            </Routes>
        </React.Fragment>
  )
}

export default Routing