import React,{useEffect, useState} from 'react';
import ScoreCard from "./scoreCard";


const ScoreBoard = (props) => {
  const [index,setIndex]=useState(0)
  const [players,setPlayers]=useState([])
  const [score,setScore]=useState([])
  const [totalScore,setTotalScore]=useState([])

  useEffect(()=>{
    let players= localStorage.getItem('players')
    let score = localStorage.getItem('totalScore')
    if(players){
      setPlayers(JSON.parse(players) || [])
    }
    if(score){
      setPlayers(JSON.parse() || [])
    }
  },[])

  const nextPlayer=()=>{
    if(index<players.length-1){
      setIndex(index+1)
    }
  }
  const prevPlayer=()=>{
    if(index>0){
      setIndex(index-1)
    }
  }
  const addToScore=(data)=>{    
    let a= score.find((scr)=>scr.name === data.name)
    if(a){
      let updatedData= score.map((entry)=>{
        if(entry.name===data.name){
          return data
        }
        return entry
      })
      setScore(updatedData)
    }else{
      setScore([...score,data])
    }
    
  }

  const addTototalScore = (data) =>{
    setTotalScore([...totalScore,data])
    localStorage.setItem('totalScore',JSON.stringify([...totalScore,data]))
  }
 
 
  return (
    <>
    {!props.showPlayerSetting &&
    <>
    <h4 onClick={()=>{console.log(players)}}>log</h4>
      {/* <button onClick={()=>setScore([...score,score.length+1])}>add</button>
      <button onClick={()=>localStorage.setItem('a',JSON.stringify(score))}>save</button>
      <button onClick={()=>localStorage.removeItem('a')}>Reset</button> */}
      {players.map((player,i)=>{
        return (index===i &&
           <ScoreCard 
           key={i}
           addToScore={addToScore} 
           next={nextPlayer} player={players[index]} 
           prev={prevPlayer} score={score.find((s)=>s.name===players[index])} 
           index={index}
           isLastPlayer={index===players.length-1}
           />)
      })}     
    </>} 
    </>
  );
}

export default ScoreBoard