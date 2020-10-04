import React,{useState} from 'react';
import { useSnackbar } from 'react-simple-snackbar'
import 'react-toastify/dist/ReactToastify.css';
import './score.css'

let snackbarOption={
  position: 'top-center',
  style: {
    backgroundColor: 'green',
    border: '2px solid lightgreen',
    color: 'lightblue',
    fontFamily: 'Menlo, monospace',
    fontSize: '10px',
    textAlign: 'center',
  },
  closeStyle: {
    color: 'lightcoral',
    fontSize: '16px',
  },
}


const ScoreCard = (props) => {
  const [mal,setMal]=useState(props?.score?.mal||0)
  const [seen,setSeen]=useState(props?.score?.seen||true)
  const [isFined,setIsFined]=useState(props?.score?.isFined ||false)
  const [fine,setFine]=useState(props?.score?.fine||0)
  const [winner,setWinner]=useState(props?.score?.winner||false)
  const [gameType,setgameType] =useState(props?.score?.gameType||'normal')
  const [winType,setwinType] =useState(props?.score?.winType||'normal')
  const [openSnackbar, closeSnackbar] = useSnackbar(snackbarOption)
 
  

  let haveWinner= props?.round?.some((p)=>p.winner)
  let currentPlayer = (props?.round[props?.index])
   

  return (
    <div className="score-container">
      <div className="notification">
      {(!haveWinner && !winner) && <span className="text-danger mx-1">winner not selected yet. </span>}  
      {isFined &&  <span className="text-danger">Added 15 as fine</span>} </div>   
    <div className="player" onClick={()=>console.log({
      seen: seen,
      mal: mal,
      isFined: isFined,
      fine: fine,
      winner: winner,
      gameType: gameType,
      winType: winType
    })}>{(props?.player).toUpperCase()}</div>
    <div className="game-type">
    <div className=" row align-items-baseline align-items-stretch group-content" >
      <div className="col-4 d-flex justify-content-end">Game type :</div>
      <div className="col-8 d-flex justify-content-around">
        <div className="col-5" style={{backgroundColor: gameType==='normal'?'#a5d4b9':""}} onClick={()=>setgameType('normal')}>Normal</div>
        <div className="col-5" style={{backgroundColor: gameType==='dublee'?'#a5d4b9':""}} onClick={()=>setgameType('dublee')}>Dublee</div>
      </div>
    </div>
    <div className=" row align-items-baseline align-items-stretch group-content" >
      <div className="col-4 d-flex justify-content-end">Seen :</div>
      <div className="col-8 d-flex justify-content-around">
        <div className="col-5" style={{backgroundColor: seen?'#a5d4b9':""}} onClick={()=>setSeen(true)}>Seen</div>
        <div className="col-5" style={{backgroundColor: !seen?'#a5d4b9':""}} onClick={()=>setSeen(false)}>Not seen</div>
      </div>
    </div>
    <div className=" row align-items-baseline align-items-stretch group-content" >
      <div className="col-4 d-flex justify-content-end">Fine :</div>
      <div className="col-8 d-flex justify-content-around">
        <div className="col-5" style={{backgroundColor: isFined?'#a5d4b9':""}} onClick={()=>{setIsFined(true);setFine(15);setWinner(false)}}>Fined</div>
        <div className="col-5" style={{backgroundColor: !isFined?'#a5d4b9':""}} onClick={()=>{setIsFined(false);setFine(0)}}>Not Fined</div>
      </div>
    </div>
    {((!isFined && (!haveWinner) && seen) || currentPlayer?.winner) &&<div className=" row align-items-baseline align-items-stretch group-content" >
      <div className="col-4 d-flex justify-content-end">Winner :</div>
      <div className="col-8 d-flex justify-content-around">
        <div className="col-5" style={{backgroundColor: winner ?'#a5d4b9':""}} onClick={()=>{setWinner(true)}}>winner</div>
        <div className="col-5" style={{backgroundColor: !winner?'#a5d4b9':""}} onClick={()=>{setWinner(false)}}>Not Winner</div>
      </div>
    </div>}
    {(!isFined && winner && !currentPlayer?.isFined)&&
      <div className=" row align-items-baseline align-items-stretch group-content" >
        <div className="col-4 d-flex justify-content-end">Winner Type :</div>
        <div className="col-8 d-flex justify-content-around">
          <div className="col-5" style={{backgroundColor: winType==='normal'?'#a5d4b9':""}} onClick={()=>{setwinType('normal')}}>normal</div>
          <div className="col-5" style={{backgroundColor: winType==='dublee'?'#a5d4b9':""}} onClick={()=>{setwinType('dublee')}}>Dublee</div>
        </div>
      </div>
    }      
    </div>
    <div>Select Maal    
      <div className="d-flex justify-content-center mt-3">
        <button onClick={()=>setMal(2)} className="btn btn-primary ml-1">2</button>
        <button onClick={()=>setMal(3)} className="btn btn-primary ml-1">3</button>
        <button onClick={()=>setMal(5)} className="btn btn-primary ml-1">5</button>
        <button onClick={()=>setMal(10)} className="btn btn-primary ml-1">10</button>
        <button onClick={()=>setMal(15)} className="btn btn-primary ml-1">15</button>
        <button onClick={()=>setMal(20)} className="btn btn-primary ml-1">20</button>
        <button onClick={()=>setMal(25)} className="btn btn-primary ml-1">25</button>
        <button onClick={()=>setMal(30)} className="btn btn-primary ml-1">30</button>
      </div>
      <div className="mal">{mal}</div>
      <div className="point-operation">        
        <div className="operator mx-1" onClick={()=>{if(mal>0){setMal(mal-1)}}}>-</div>
        <div className="operator mx-1" onClick={()=>setMal(mal+1)}>+</div>
       
      </div> 
      <div className="next-button">
        <button disabled={props.index===0} onClick={()=>{
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
        }} className="btn btn-primary col-6 col-md-3 m-3">Prev</button>
        {!props.isLastPlayer && <button  onClick={()=>{
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
        }} className="btn btn-primary col-6 col-md-3 m-3">Next</button>}
        {props.isLastPlayer && <button disabled={!((props.isLastPlayer && haveWinner) || winner  )} onClick={()=>{    
          openSnackbar('Your score is submitted.')  
            props.addTototalScore({
              name: props.player,
              seen: seen,
              mal: mal,
              isFined: isFined,
              fine: fine,
              winner: winner,
              gameType: gameType,
              winType: winType})
        }} className="btn btn-danger col-6 col-md-3 m-3">Submit</button>}        
      </div>     
    </div>
    </div>
  );
}

export default ScoreCard