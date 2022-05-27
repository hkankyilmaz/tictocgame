import { useState, useEffect } from "react";
import "./App.css";
import Square from "./component/Square";
import { Patterns } from "./component/Patterns";
import WinnerScreen from "./component/WinnerScreen";

//game sounds initialize
const click = new Audio("./click.mp3");
const gameWinnerSound = new Audio("./win.wav");
const restartSound = new Audio("./restart.wav");

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  const [player, setPlayer] = useState("🟡");

  const [result, setResult] = useState({ winner: "none", state: "none" });

  const [wined, setWin] = useState(false);

  useEffect(() => {
    checkWin();
    checkIfTie();

    if (player == "❌") {
      setPlayer("🟡");
    } else {
      setPlayer("❌");
    }
  }, [board]);

  useEffect(() => {
    if (result.state != "none") {
      setWin(true);
    }
  }, [result]);

  const handleClick = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx == square && val == "") {
          return player;
        }
        return val;
      })
    );
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      console.log(firstPlayer);
      if (firstPlayer == "") return;
      console.log(firstPlayer);
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        console.log(board[idx]);
        console.log(firstPlayer);
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("🟡");
    setWin(false);
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };

  return (
    <div className="App">
      <div className="board">
        <h1 className="title">
          Let's Play <br /> Tic Tac T🟡e
        </h1>
        <div className="row">
          <Square
            chooseSquare={() => {
              handleClick(0);
            }}
            val={board[0]}
          />
          <Square
            chooseSquare={() => {
              handleClick(1);
            }}
            val={board[1]}
          />
          <Square
            chooseSquare={() => {
              handleClick(2);
            }}
            val={board[2]}
          />
        </div>
        <div className="row">
          <Square
            chooseSquare={() => {
              handleClick(3);
            }}
            val={board[3]}
          />
          <Square
            chooseSquare={() => {
              handleClick(4);
            }}
            val={board[4]}
          />
          <Square
            chooseSquare={() => {
              handleClick(5);
            }}
            val={board[5]}
          />
        </div>
        <div className="row">
          <Square
            chooseSquare={() => {
              handleClick(6);
            }}
            val={board[6]}
          />
          <Square
            chooseSquare={() => {
              handleClick(7);
            }}
            val={board[7]}
          />
          <Square
            chooseSquare={() => {
              handleClick(8);
            }}
            val={board[8]}
          />
        </div>
      </div>
      {wined ? (
        <WinnerScreen restartGame={restartGame} playerWon={result.winner} />
      ) : null}
    </div>
  );
}

export default App;
