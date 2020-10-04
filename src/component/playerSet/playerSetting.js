import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "reactstrap";
import "./playerSetting.css";

const PlayerSetting = (props) => {
  const [players, setPlayers] = useState([]);
  const [addPlayer, setAddPlayer] = useState("");

  function onChange(e) {
    e.target.checked
      ? setPlayers([...players, e.target.value])
      : setPlayers(players.filter((a) => a !== e.target.value));
  }

  function onCheck(data) {
    players.includes(data)
      ? setPlayers(players.filter((a) => a !== data))
      : setPlayers([...players, data]);
  }

  const savePlayers = () => {
    props.setShowPlayerSetting(false);
    localStorage.setItem("showForm", false);
    localStorage.setItem("players", JSON.stringify(players));
  };

  return (
    <>
      {props.showPlayerSetting && (
        <>
          <div className="playcard-container mx-2">
            <div
              style={{
                backgroundColor: !players.includes("ujjwal")
                  ? "#2a436b"
                  : "#2f6324",
              }}
              className="playerCard"
              onClick={() => onCheck("ujjwal")}
            >
              Ujjwal
            </div>
            <div
              className="playerCard"
              style={{
                backgroundColor: !players.includes("dhiraj")
                  ? "#2a436b"
                  : "#2f6324",
              }}
              onClick={() => onCheck("dhiraj")}
            >
              Dhiraj
            </div>
            <div
              className="playerCard"
              style={{
                backgroundColor: !players.includes("saugat")
                  ? "#2a436b"
                  : "#2f6324",
              }}
              onClick={() => onCheck("saugat")}
            >
              Saugat
            </div>
            <div
              className="playerCard"
              style={{
                backgroundColor: !players.includes("sachin")
                  ? "#2a436b"
                  : "#2f6324",
              }}
              onClick={() => onCheck("sachin")}
            >
              Sachin
            </div>
            <div
              className="playerCard"
              style={{
                backgroundColor: !players.includes("naren")
                  ? "#2a436b"
                  : "#2f6324",
              }}
              onClick={() => onCheck("naren")}
            >
              Naren
            </div>
          </div>
          <div className="mx-2">
            <Input
              className="col-12"
              type="text"
              value={addPlayer}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setPlayers([...players, addPlayer]);
                  setAddPlayer("");
                }
              }}
              onChange={(e) => {
                if (e.target.value) {
                  setAddPlayer(e.target.value);
                }
              }}
              placeholder="Additional player"
            />
          </div>
          {players.length > 0 && (
            <div className="players-table">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Players Name</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{player}</td>
                      <td
                        onClick={() =>
                          setPlayers(players.filter((a) => a !== player))
                        }
                      >
                        x
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          <div className="button-container">
            <button
              disabled={!players.length}
              className="btn btn-danger"
              onClick={() => {
                props.setShowPlayerSetting(false);
                localStorage.setItem("showForm", true);
                savePlayers();
                window.location = "/";
              }}
            >
              Start
            </button>
          </div>
        </>
      )}
    </>
  );
};

const style = {
  marginLeft: "20px",
};
export default PlayerSetting;
