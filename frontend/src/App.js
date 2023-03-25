import logo from './logo.svg';
import './App.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';


function App() {

  const navigate = useNavigate();
  const gotoProducts = ()=>{navigate('/products')}

  return (
    <div className="App">
      <NavBar></NavBar>
      {/* <div className='NavBar'>
        <div id='left'>
          <p id='title' className='NavbarText'>JitFab</p>
          <p className='NavbarText'>Home</p>
          <p className='NavbarText'>Products</p>
          <p className='NavbarText'>About</p>
        </div>
        <div id='right'>
          <p className='NavbarText'>Log In</p>
        </div>
      </div> */}

      <div id='strong-title'>JitFab</div>
      <div id='tagline'>Reliable Just-In-Time Solutions</div>
      <img src={require('./animation.gif')}></img>
      <p id='get-started' onClick={gotoProducts} >Get Started</p>
    
    </div>
  );
}

export default App;
