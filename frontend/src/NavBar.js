import { useNavigate } from 'react-router-dom'
import './NavBar.css'

export default function(){

	const navigate = useNavigate();
	const gotoHome = ()=>{navigate('/home')}
	const gotoProducts = ()=>{navigate('/products')}
	const gotoAbout = ()=>{navigate('/about')}

	return(
		<div className='NavBar'>
			<div id='left'>
				<p id='title' className='NavbarText' onClick={gotoHome}>JitFab</p>
				<p className='NavbarText' onClick={gotoHome}>Home</p>
				<p className='NavbarText' onClick={gotoProducts}>Products</p>
				<p className='NavbarText' onClick={gotoAbout}>About</p>
			</div>
			<div id='right'>
				<p className='NavbarText'>Log In</p>
			</div>
		</div>
	)
}