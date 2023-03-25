import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='NavBar'>
        <div id='left'>
          <p id='title' className='NavbarText'>JitFab</p>
          <p className='NavbarText'>Home</p>
          <p className='NavbarText'>Products</p>
          <p className='NavbarText'>About</p>
        </div>
        <div id='right'>
          <p className='NavbarText'>Log In</p>
        </div>
      </div>

      <div id='strong-title'>JitFab</div>
      <div id='tagline'>Reliable Just-In-Time Solutions</div>
      <img src={require('./animation.gif')}></img>
      <p id='get-started'>Get Started</p>

    </div>
  );
}

export default App;
