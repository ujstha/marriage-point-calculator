import React,{useState,useEffect} from 'react';
import Players from './component/playerSet/playerSetting'
import Score from './component/scoreboard/scoreboard'
import Nav from "./component/Nav/nav";
import './App.css';

function App() {
  const [showPlayerSetting, setShowPlayerSetting]=useState()

  useEffect(()=>{
    const  showForm= JSON.parse(localStorage.getItem('showForm'))
    setShowPlayerSetting(showForm || false)
  },[])

  return (
    <div className="App">
      <Nav/>
      <Players showPlayerSetting={showPlayerSetting} setShowPlayerSetting={setShowPlayerSetting}/>
      <Score showPlayerSetting={showPlayerSetting}/>
    </div>
  );
}

export default App;
