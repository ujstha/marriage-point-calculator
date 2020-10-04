import React, { useState, useEffect } from "react";
import SnackbarProvider from "react-simple-snackbar";
import Players from "./component/playerSet/playerSetting";
import Score from "./component/scoreboard/scoreboard";
import Nav from "./component/Nav/nav";
import "./App.css";

function App() {
  const [showPlayerSetting, setShowPlayerSetting] = useState(true);

  useEffect(() => {
    let loc = new Promise((resolve, reject) => {
      let show = localStorage.getItem("showForm");
      if (show) {
        return resolve(JSON.parse(show));
      } else {
        reject(true);
      }
    });
    loc
      .then((data) => {
        setShowPlayerSetting(data);
      })
      .catch((err) => {
        setShowPlayerSetting(err);
      });
  }, []);

  const showForm = async () => {
    const showForm = await JSON.parse(localStorage.getItem("showForm"));
    if (!showForm) {
      setShowPlayerSetting(true);
    } else {
      setShowPlayerSetting(showForm);
    }
  };

  return (
    <div className="App">
      <SnackbarProvider>
        <Nav />
        <Players
          showPlayerSetting={showPlayerSetting}
          setShowPlayerSetting={setShowPlayerSetting}
        />
        <Score showPlayerSetting={showPlayerSetting} />
      </SnackbarProvider>
    </div>
  );
}

export default App;
