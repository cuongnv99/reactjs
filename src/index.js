import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date : new Date()
    }
  }
  componentDidMount(){
    this.timeId = setInterval(
      () => this.tick(),
     1000);
  }

  componentWillUnmount(){
    clearInterval(this.timeId);
  }

  tick(){
    this.setState(
      {
        date : new Date()
      }
    );
  }
  render(){
    return(
        <div>
            <h2>now is : {this.state.date.toLocaleTimeString()}</h2>
        </div>
    );  
  }
}


class Board extends React.Component {
  renderSquare(lol) {
    return (
        <Square
            value={this.props.squares[lol]}
            onClick={() => this.props.onClick(lol)}
        />
    );
  }

  render() {
    return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNum: 0,
      nextClick: true
    };
  }

  jumpTo(step) {
    this.setState
    ({
      stepNum: step,
      nextClick: (step % 2) === 0,
    });
  }



  handleClick(lol) {
    const history = this.state.history.slice(0, this.state.stepNum + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (win(squares) || squares[lol]) {
      return;
    }
    squares[lol] = this.state.nextClick ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNum: history.length,
      nextClick: !this.state.nextClick,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNum];
    const winner = win(current.squares);

    const moves = history.map((step, move) => {

      const desc = move ? 'go to move # ' + move : 'goto move start ';
      return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}> {desc}</button>
          </li>
      )
    });



    let status;
    if (winner) {
      status = 'người thắng là : ' + winner;
    } else {
      status = 'Next turn  : ' + (this.state.nextClick ? 'X' : 'O');
    }
    return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(lol) => this.handleClick(lol)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
    );
  }
}


function Square(props) {
  return (
      <div>
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
      </div>
  );
}

function win(squares) {
const lines = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
];
for (let i = 0; i < lines.length; i++) {
  const [a, b, c] = lines[i];
  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    return squares[a];
  }
}
return null;
}
//========================================================================================================================================
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'BẬT' : 'TẮT'}
      </button>
    );
  }
}
//========================================================================================================================================
function CoTien(props){return(<h1>tao có nhiều tiền</h1>);}
function KhongCoTien(props){return(<h1>Tao không có tiền </h1>);}
function Vaochua(props){
    const isLogIn = props.isLogIn;
    if(isLogIn){
      return <CoTien/> 
    }
    return(<KhongCoTien/>);
}

function Login(props){
    return(
      <button onClick = {props.onClick}>Login</button>
    );
}
function Logout(props){
  return(
    <button onClick ={props.onClick}>Logout</button>
  );
}
class LoginController extends React.Component{
  constructor(props){
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLogIn : false
    };
  }

  handleLoginClick(){
    this.setState({isLogIn:true})
  }

  handleLogoutClick(){
    this.setState({isLogIn:false})
  }
  render(){
    const isLogIn = this.state.isLogIn;
    let button;
    if(isLogIn){
      button = <Logout onClick = {this.handleLogoutClick}/>
    }else{
      button = <Login onClick = {this.handleLoginClick}/>
    }
    return(
      <div><Vaochua isLogIn = {isLogIn}/>
        {button}
      </div>
    );
  }
}
//========================================================================================================================================
  function Message(props){
      const soTinNhan = props.soTinNhan;
      return(<div>
        <h1>Hello!</h1>
        {soTinNhan.length > 0 &&
          <h2>
            You have {soTinNhan.length} unread messages.
          </h2>
        }
      </div>
      );
  }

  const Messages=['tin1','tin2','tin3'];

//========================================================================================================================================
const imgstyle = {
  height : 80,
  width : 80
}
function Avatar(props) {
  return (
    <img style={imgstyle}
      className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function Comment(props){
 return(
  <div className = "Comment">
      <UserInfo user={props.author}/>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date"><Clock/></div>
      <div className="Comment-date"><Clock/></div>
      <div className="Comment-date"><Clock/></div>
      <div className="Comment-date"><Clock/></div>
      <div className="Comment-date"><Clock/></div>
      <div className="Comment-date"><Clock/></div>
      <div className="Comment-date"><Clock/></div>
      <div className="Comment-date"><Clock/></div>
      <div className="Comment-date"><Clock/></div>
      <div><Game/></div>
      <div><Toggle/></div>
      <div><Vaochua isLogIn={false}/></div>
      <div><LoginController/></div>
      <div><Message soTinNhan = {Messages} /></div>
  
  </div>
 );
}

const comment = {
  date : new Date(),
  text:<h2 style={{color:'red'}}>hello Player</h2>,
  author : {
    name : 'Author : cường',
    avatarUrl  : 'https://atpmedia.vn/wp-content/uploads/2019/12/C%C3%A1ch-s%E1%BB%AD-d%E1%BB%A5ng-th%E1%BA%BB-IMG.jpg'
  },
};

ReactDOM.render(
  <Comment 
  date = {comment.date}
  text = {comment.text}
  author = {comment.author}
/>,
    document.getElementById('root')
);


