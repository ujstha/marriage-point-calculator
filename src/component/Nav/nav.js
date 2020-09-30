import React from 'react';
import './nav.css'

function Nav() {

  return (
    <div className="title">
       <button onClick={()=>{
        localStorage.setItem('showForm',true)
        window.location="/"
      }}>Reset</button>
      <button onClick={()=>{
        localStorage.setItem('showForm',true)
        window.location="/"
      }}>calculate</button>
    </div>
  );
}

export default Nav;
