import React,{useEffect, useState} from 'react';
import { Button, Input, Table } from 'reactstrap';
import './playerSetting.css'




const PlayerSetting = (props) => {  
  const [players,setPlayers]=useState([])
  const [addPlayer,setAddPlayer]= useState("")
  

  function onChange(e) {
    e.target.checked ?setPlayers([...players,e.target.value]):setPlayers(players.filter(a=>a!==e.target.value))
  }

  const savePlayers = ()=>{
    props.setShowPlayerSetting(false)
    localStorage.setItem('showForm',false)
    localStorage.setItem('players',JSON.stringify(players))
  }

  return (<>
  {props.showPlayerSetting &&
    <>   
    <div className="d-flex flex-column col-11 mt-3">
      <div className="d-flex justify-content-start align-items-center">
        <input className="mx-3" checked={players.includes('ujjwal')} onChange={onChange} type="checkbox"  value="ujjwal"/>{' '} Ujjwal
      </div>
      <div className="d-flex justify-content-start align-items-center">
        <input className="mx-3" checked={players.includes('dhiraj')} onChange={onChange} type="checkbox" value="dhiraj" />{' '} Dhiraj
      </div>
      <div className="d-flex justify-content-start align-items-center">
        <input className="mx-3" checked={players.includes('saugat')} onChange={onChange} type="checkbox" value="saugat" />{' '} Saugat
      </div>
      <div className="d-flex justify-content-start align-items-center">
        <input className="mx-3" checked={players.includes('sachin')} onChange={onChange} type="checkbox" value="sachin" />{' '} Sachin
      </div>
      <div className="d-flex justify-content-start align-items-center">
        <input className="mx-3" checked={players.includes('naren')} onChange={onChange} type="checkbox" value="naren" />{' '} Naren
      </div>        
    </div>    
    <div className="d-flex mx-2">
    <Input className="col-8" type="text" value={addPlayer} onChange={e=>setAddPlayer(e.target.value)}  placeholder="Additional player" />
    <Button className="col-3" onClick={()=>{setPlayers([...players,addPlayer]);setAddPlayer('')}}>+</Button>
    </div>
    {players.length>0 && 
    <div className="players-table">
      <Table >
      <thead>
        <tr>
          <th>#</th>
          <th>Players Name</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player,i)=>(
        <tr key={i}>
          <th scope="row">{i+1}</th>
          <td>{player}</td>
          <td onClick={()=>setPlayers(players.filter((a)=>a!==player))}>x</td>
        </tr>
        ))}
        
      </tbody>
    </Table>
    </div>
    }
    <button className="submit-button" onClick={()=>{
      props.setShowPlayerSetting(false)
      localStorage.setItem('showForm',true)
      savePlayers()
      window.location="/"
    }}>Start</button>
    </>}
    </>
  );
}

const style={
  'marginLeft': "20px"
}
export default PlayerSetting