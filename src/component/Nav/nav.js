import React from 'react';
import './nav.css'

function Nav() {

  return (
    <div className="title">
       <button onClick={()=>{
        alert('cal')
      }}>calc</button>
      <button onClick={()=>{
        localStorage.setItem('players',[])
        localStorage.setItem('showForm',true)
        localStorage.setItem('totalScore',[])
        window.location="/"
      }}>Reset</button>
    </div>
  );
}

export default Nav;
