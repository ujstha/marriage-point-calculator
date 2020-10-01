import React,{useEffect, useState} from 'react';
import ScoreCard from "./scoreCard";
import { calc } from "../calculation";


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
      setTotalScore(JSON.parse(score) || [])
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

  const addTototalScore = async (data) =>{
    const calculated=await calc([...score,data])
    setTotalScore([...totalScore,calculated])
    localStorage.setItem('totalScore',JSON.stringify([...totalScore,calculated]))
    setIndex(0)
  }
 
 
  return (
    <>
    {!props.showPlayerSetting &&
    <>
    <h4 onClick={()=>{console.log(score)}}>log</h4>
    <h4 onClick={()=>{console.log(totalScore)}}>total</h4>
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
           round={score}
           isLastPlayer={index===players.length-1}
           addTototalScore={addTototalScore}
           setScore={setScore}
           />)
      })}     
    </>} 
    </>
  );
}

export default ScoreBoard