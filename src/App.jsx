import React, {Component} from 'react';
import Confetti from 'react-confetti';

class App extends Component {
  state = {
    gameBoard: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    player: 'X',
    someoneWon: '',
  };
  didSomeoneWin = (gameBoard, currentPlayer) => {
    for (let y = 0; y < gameBoard.length; y++) {
      if (gameBoard[y][0] === currentPlayer
        && gameBoard[y][1] === currentPlayer
        && gameBoard[y][2] === currentPlayer) {
        return currentPlayer;
      }
    }
    for (let x = 0; x < gameBoard.length; x++) {
      if (gameBoard[0][x] === currentPlayer
        && gameBoard[1][x] === currentPlayer
        && gameBoard[2][x] === currentPlayer) {
        return currentPlayer;
      }
    }
    if (gameBoard[0][0] === currentPlayer
      && gameBoard[1][1] === currentPlayer
      && gameBoard[2][2] === currentPlayer) {
      return currentPlayer;
    }
    if (gameBoard[0][2] === currentPlayer
      && gameBoard[1][1] === currentPlayer
      && gameBoard[2][0] === currentPlayer) {
      return currentPlayer;
    }
    return '';
  };
  handleClick = (y, x) => {
    const gameBoard = [...this.state.gameBoard];
    console.log(gameBoard[y][x]);
    if (gameBoard[y][x] === '' && !this.state.someoneWon) {
      gameBoard[y][x] = this.state.player;
      const someoneWon = this.didSomeoneWin(gameBoard, this.state.player);
      const player = this.state.player === 'X' ? 'O' : 'X';
      this.setState({
          gameBoard,
          player,
          someoneWon
      })
    }
  };
  resetGame = () => {
    this.setState({
      gameBoard: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        player: 'X',
        someoneWon: false,
    })
  };
  render() {
    let square = this.state.gameBoard.map((item, y) => {
      let eachString = item.map((string, x) => {
        return <Square onClick={() => this.handleClick(y, x)} value={string} key={y + x}/>
      })
      return eachString;
    });
    return (
      <main>
        <div id="header">
          {this.state.someoneWon
          && <Confetti
              width={window.innerWidth}
              height={window.innerHeight}/>}
          {this.state.someoneWon && <h1>Player {this.state.someoneWon} won!</h1>}
          {!this.state.someoneWon && <h1>Player: {this.state.player}</h1>}
          {this.state.someoneWon && <button id="reset" type="button" onClick={() => this.resetGame()}>Clear</button>}
        </div>
        <div className="grid">
          {square}
        </div>
      </main>
    );
  }
}

function Square(props) {
  return (
    <button type="button" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
export default App;