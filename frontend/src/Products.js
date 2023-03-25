import './Products.css'
import NavBar from './NavBar';

function Products(){
	return(
		<div id='ctn'>
			<NavBar></NavBar>
			<div id='strong-title-products'>Products</div>
			<input id='product-input' type='text' placeholder='Search for a Product'/>
		</div>
	)
}

export default Products;
