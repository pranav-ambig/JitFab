import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import NavBar from './NavBar';
import ReportsPage from './ReportsPage';
import './Analyse.css'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
  } from 'chart.js';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);

export const options = {
	responsive:true
}


export default function Analyse(){

	const [tensionval, setTensionVal] = useState(0.5)

	let data = {
		labels: [1, 2, 3, 4, 5, 6, 7, 8],
		datasets: [{label:'Actual',
					data:[1, 2, 3, 4, 2, 6, 7, 8],
					borderColor: "rgb(142, 126, 164)",
					tension: tensionval,
					// fill:true
					},
					{label:'Predicted',
					data:[1, 2, 3, 4, 2, 6, 5, 5],
					borderColor: "rgb(255, 157, 0)",
					tension: tensionval,
					// fill:true
					},
				]
		}

	const rangeHandler = ()=>{
		let ele = document.getElementById('tensionval')
		console.log(ele.value/100)
		setTensionVal(ele.value/100)
	}

	return(
		<div>
			<NavBar></NavBar>
			<div id='main-ctn'>

				<div id='leftside'>
					<p id='left-title'>Product</p>
					<input id='product-input' type='text' placeholder='Search for a Product'/>
					
					<div id='controls'>
						<div className='control-pair'>
							<p className='param'>Product Name:</p>
							<p className='pvalue'>Laptop</p>
						</div>
						<div className='control-pair'>
							<p className='param'>Smoothness:</p>
							<input className='pvalue' id='tensionval' type={'range'} onChange={rangeHandler} />
						</div>
						{/* <ReportsPage PLID={"abc"} Amount={3} InvLocation={"Sirsi"} ></ReportsPage> */}
					</div>
				</div>


				<div id='rightside'>
					<p id='right-title'>Analysis</p>
					<Line data={data} options={options} ></Line>
				</div>

			</div>
		</div>
	)
}