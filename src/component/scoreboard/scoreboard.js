import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import ScoreCard from "./scoreCard";
import { calc } from "../calculation";
import Table from "../scoreTable/table";
import "./score.css";

const ScoreBoard = (props) => {
  const [index, setIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [score, setScore] = useState([]);
  const [totalScore, setTotalScore] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    let players = localStorage.getItem("players");
    let score = localStorage.getItem("totalScore");
    if (players) {
      setPlayers(JSON.parse(players) || []);
    }
    if (score) {
      setTotalScore(JSON.parse(score) || []);
    }
  }, []);

  const nextPlayer = () => {
    if (index < players.length - 1) {
      setIndex(index + 1);
    }
  };
  const prevPlayer = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const addToScore = (data) => {
    let a = score?.find((scr) => scr.name === data.name);
    if (a) {
      let updatedData = score.map((entry) => {
        if (entry.name === data.name) {
          return data;
        }
        return entry;
      });
      setScore(updatedData);
    } else {
      setScore([...score, data]);
    }
  };

  const addTototalScore = async (data) => {
    let updatedData = [...score];
    let a = score?.find((scr) => scr.name === data.name);
    if (a) {
      let updatedData = score.map((entry) => {
        if (entry.name === data.name) {
          return data;
        }
        return entry;
      });
      setScore(updatedData);
    } else {
      updatedData = [...score, data];
    }
    const calculated = await calc(updatedData);
    setTotalScore([...totalScore, calculated]);
    localStorage.setItem(
      "totalScore",
      JSON.stringify([...totalScore, calculated])
    );
    setScore([]);
    setIndex(0);
  };

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <>
      {!props.showPlayerSetting && (
        <>
          <label className="d-flex justify-content-end m-2">
            <Switch
              height={20}
              width={40}
              onChange={toggleTable}
              checked={showTable}
            />
            <span className="ml-2">show table</span>
          </label>
          {!showTable &&
            players.map((player, i) => {
              return (
                index === i && (
                  <ScoreCard
                    key={i}
                    player={player}
                    next={nextPlayer}
                    prev={prevPlayer}
                    score={score[index]}
                    round={score}
                    index={index}
                    isLastPlayer={index === players.length - 1}
                    addToScore={addToScore}
                    addTototalScore={addTototalScore}
                    setScore={setScore}
                  />
                )
              );
            })}
          {showTable && <Table players={players} pointsDetail={totalScore} />}
        </>
      )}
    </>
  );
};

export default ScoreBoard;
