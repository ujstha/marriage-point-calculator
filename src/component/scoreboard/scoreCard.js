import React,{useState, useEffect} from 'react';
import { Radio } from 'antd';



const ScoreCard = (props) => {
  const [mal,setMal]=useState(props?.score?.mal||0)
  const [seen,setSeen]=useState(props?.score?.seen||true)
  const [isFined,setIsFined]=useState(props?.isFined?.mal||false)
  const [fine,setFine]=useState(props?.score?.fine||0)
  const [winner,setWinner]=useState(props?.score?.winner||false)
  const [gameType,setgameType] =useState(props?.score?.gameType||'normal')
  const [winType,setwinType] =useState(props?.score?.winType||'normal')
    
  return (
    <>
    <h3 onClick={()=>console.log({
      seen: seen,
      mal: mal,
      isFined: isFined,
      fine: fine,
      winner: winner,
      gameType: gameType,
      winType: winType
    })}>{props?.player}</h3>
      <span className=" row align-items-baseline">
        <div className="col-4">Game type:</div>
      <Radio.Group className="m-3" defaultValue={gameType} onChange={(e)=>setgameType(e.target.value)}>
        <Radio className="mx-3"value={'normal'}>Normal</Radio>
        <Radio className="mx-3"value={'dublee'}>Dublee</Radio>
      </Radio.Group>
      </span>
      <span className="row align-items-baseline">
      <div className="col-4">Seen:</div>
      <Radio.Group className="m-3" defaultValue={seen} onChange={(e)=>{
        console.log(e.target.value);
        setSeen(e.target.value)}}>
        <Radio className="mx-3"value={true}>seen</Radio>
        <Radio className="mx-3"value={false}>not seen</Radio>
      </Radio.Group>
      </span>
      <span className="row align-items-baseline">
      <div className="col-4">Fine:</div>
      <Radio.Group className="m-3" defaultValue={isFined} onChange={(e)=>{
        setFine(15)
        setIsFined(e.target.value)
      }}>
        <Radio className="mx-3"value={true}>fine</Radio>
        <Radio className="mx-3"value={false}>not fine</Radio>
      </Radio.Group>
      </span>
      <span className="row align-items-baseline">
      <div className="col-4">Winner:</div>
      <Radio.Group className="m-3" defaultValue={winner} onChange={(e)=>setWinner(e.target.value)}>
        <Radio className="mx-3"value={true}>winner</Radio>
        <Radio className="mx-3"value={false}>not winner</Radio>
      </Radio.Group>
      </span>
      {winner && <span className=" row align-items-baseline">
        <div className="col-4">Win type:</div>
        <Radio.Group className="m-3" defaultValue={winType} onChange={(e)=>setwinType(e.target.value)}>
          <Radio className="mx-3"value={'normal'}>Normal</Radio>
          <Radio className="mx-3"value={'dublee'}>Dublee</Radio>
        </Radio.Group>
      </span>}
      
      {isFined &&'Added 15 as fine'}<br></br>
    <div>      
      <input type="number" min={0} name="mal" className="form-control"  value={mal} onChange={e=>setMal(e.target.value)} />
      <div className="d-flex justify-content-center ml-3 mt-3">        
        <button onClick={()=>setMal(5)} className="btn btn-primary ml-2">5</button>
        <button onClick={()=>setMal(10)} className="btn btn-primary ml-2">10</button>
        <button onClick={()=>setMal(15)} className="btn btn-primary ml-2">15</button>
        <button onClick={()=>setMal(20)} className="btn btn-primary ml-2">20</button>
        <button onClick={()=>setMal(25)} className="btn btn-primary ml-2">25</button>
        <button onClick={()=>setMal(30)} className="btn btn-primary ml-2">30</button>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button onClick={()=>setMal(mal-1)} className="btn btn-primary ml-2 w-25">-</button>
        <button onClick={()=>setMal(mal+1)} className="btn btn-primary ml-2 w-25">+</button>
      </div>
      <div className="row mt-3">
        <span onClick={()=>{
          props.addToScore({
            name: props.player,
            seen: seen,
            mal: mal,
            isFined: isFined,
            fine: fine,
            winner: winner,
            gameType: gameType,
            winType: winType})
          props.prev()
        }} className="btn btn-primary col-6">Prev</span>
        {!props.isLastPlayer && <span onClick={()=>{
          props.addToScore({
            name: props.player,
            seen: seen,
            mal: mal,
            isFined: isFined,
            fine: fine,
            winner: winner,
            gameType: gameType,
            winType: winType})
          props.next()
        }} className="btn btn-primary col-6">Next</span>}
        {props.isLastPlayer && <span onClick={()=>{
          props.addToScore({
            name: props.player,
            seen: seen,
            mal: mal,
            isFined: isFined,
            fine: fine,
            winner: winner,
            gameType: gameType,
            winType: winType})
        }} className="btn btn-danger col-6">Submit</span>}
      </div>      
    </div>
    </>
  );
}

export default ScoreCard