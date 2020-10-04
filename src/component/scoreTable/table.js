import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const BasicTable = (props) => {
  const { players, pointsDetail } = props;
  let tot = players?.map((player) => {
    let point = 0;
    pointsDetail.forEach((round) => {
      round.forEach((game) => {
        if (game.name === player) {
          point = point + game.point;
        }
      });
    });
    return point;
  });
  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          {players.map((p, i) => (
            <th key={i}>{p}</th>
          ))}
          <th>Maal</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {pointsDetail.map((eachRound, index) => {
          let roundMaal = 0;
          return (
            <tr key={index}>
              {eachRound.map((eachPlayer, j) => {
                if (eachPlayer?.seen && !eachPlayer?.isFined) {
                  roundMaal = roundMaal + eachPlayer.mal;
                }
                return (
                  <td key={j}>
                    {eachPlayer?.point} <sub>{eachPlayer?.mal}</sub>
                  </td>
                );
              })}
              <td>{roundMaal}</td>
            </tr>
          );
        })}
        <tr>
          {tot?.map((total, i) => (
            <td key={i}>
              {" "}
              <b>{total}</b>
            </td>
          ))}
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
};

export default BasicTable;
