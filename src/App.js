import React,{useState,useEffect} from 'react';
import SnackbarProvider from 'react-simple-snackbar'
import Players from './component/playerSet/playerSetting'
import Score from './component/scoreboard/scoreboard'
import Nav from "./component/Nav/nav";
import './App.css';

function App() {
  const [showPlayerSetting, setShowPlayerSetting]=useState(true)

  useEffect(()=>{
    let loc= new Promise((resolve, reject)=>{
      let show = localStorage.getItem('showForm')
      if(show){
        console.log(show);
        return resolve(JSON.parse(show))
       }
       else{
         reject(true)
       }
    })
    loc.then(data=>{
      console.log(data);
      setShowPlayerSetting(data)
    })
    .catch((err)=>{
      setShowPlayerSetting(err)
    })

  },[])

  const showForm = async()=>{
    
    const  showForm = await JSON.parse(localStorage.getItem('showForm'))
    if(!showForm){
      console.log('sssss');
      setShowPlayerSetting(true)
    }else{
      setShowPlayerSetting(showForm)
    }
  }

  return (
    <div className="App">
      <h1 onClick={()=>console.log(showPlayerSetting)}>test</h1>
       <SnackbarProvider>     
        <Nav/>
        <Players showPlayerSetting={showPlayerSetting} setShowPlayerSetting={setShowPlayerSetting}/>
        <Score showPlayerSetting={showPlayerSetting}/>
      </SnackbarProvider>
    </div>
  );
}

export default App;
