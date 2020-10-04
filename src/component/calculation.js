
export let calc= async (point)=>{
  let seenPlayer= point.filter((player)=>player.seen && !(player.fine))
  const unseenPlayer= point.filter((player)=>!player.seen || player.fine )

  let winner= seenPlayer.find((player)=>player.winner)
  let totalMaal=0
  seenPlayer.forEach((pl) => {
    totalMaal= pl.mal + totalMaal
  });

  let seenPlayerExcWinner= seenPlayer?.filter((pl)=>pl?.name !== winner?.name)
  let updatedSeenPlayerExcWinner;

  if(winner.winType==='normal'){
    updatedSeenPlayerExcWinner = seenPlayerExcWinner.map((player) => {
      if(player.gameType==='normal'){
        let eachPlayerpoint = (player.mal*point.length)-totalMaal-3
        return {...player, point: eachPlayerpoint}
      }else if(player.gameType ==='dublee'){
        let eachPlayerpoint = (player.mal*point.length)-totalMaal
        return {...player, point: eachPlayerpoint}
      }
    })
  }
  else if (winner.winType==='dublee'){
    updatedSeenPlayerExcWinner = seenPlayerExcWinner.map((player) => {
      if(player.gameType==='normal'){
        let eachPlayerpoint = (player.mal*point.length)-totalMaal-5
        return {...player, point: eachPlayerpoint}
      }else if(player.gameType ==='dublee'){
        let eachPlayerpoint = (player.mal*point.length)-totalMaal
        return {...player, point: eachPlayerpoint}
      }
    })
  }

  let updatedUnseenPlayer = unseenPlayer.map((player)=>{
    if(player.isFined && !player.seen ){
    let  eachPlayerpoint = 0-totalMaal-player.fine-10
      return {...player,point: eachPlayerpoint }
    } else if(player.isFined && player.seen ){
      let  eachPlayerpoint = 0-totalMaal-player.fine
        return {...player,point: eachPlayerpoint }
      }else {
      let  eachPlayerpoint = 0-totalMaal-10
      return {...player,point: eachPlayerpoint }
    }
  })

  let winnerPoint =  0

  updatedSeenPlayerExcWinner.forEach((p)=>{
    winnerPoint = winnerPoint + p.point
  })
  
  updatedUnseenPlayer.forEach((p)=>{
    winnerPoint = winnerPoint + p.point
  })

  winner={...winner, point: 0-winnerPoint}

  let pointsWithoutWinner= updatedSeenPlayerExcWinner.concat(updatedUnseenPlayer)
  let pointWithWinner= [...pointsWithoutWinner, winner]

  let players= await localStorage.getItem('players')
  pointWithWinner.sort(function(a, b){  
    return players.indexOf(a.name) - players.indexOf(b.name);
  });
  return pointWithWinner
}
