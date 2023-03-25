import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import NavBar from './NavBar';
import './Analyse.css'
import axios from 'axios';

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
	const [prodname, setProdName] = useState("")
	const [tillDate, setTillDate] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
	const [predicted, setPredicted] = useState([13, 14, 15, 16])

	let secondGraphValues = []
	const updateSGV = ()=>{
		for (let i=0; i<tillDate.length-1; i++){
			secondGraphValues.push(null)
		}
		secondGraphValues.push(tillDate[tillDate.length-1])
		for (let i=0; i<predicted.length; i++){
			secondGraphValues.push(predicted[i])
		}
		// console.log(secondGraphValues)
	}
	updateSGV()

	

	let data = {
		labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
		datasets: [{label:'Actual',
					data:tillDate,
					borderColor: "rgb(142, 126, 164)",
					tension: tensionval,
					// fill:true
					},
					{label:'Predicted',
					data: secondGraphValues,
					borderColor: "rgb(255, 157, 0)",
					tension: tensionval,
					// fill:true
					},
				]
		}

	const rangeHandler = ()=>{
		let ele = document.getElementById('tensionval')
		// console.log(ele.value/100)
		setTensionVal(ele.value/100)
	}

	const reqFromBackend = (e)=>{
		if (e.which == 13){
			let ele = document.getElementById('product-input')
			axios.post('http://127.0.0.1:5000/prod', {
				"PLID": ele.value
			  })
			  .then(function (response) {
				if (response["data"] != "Error"){
					setProdName(response["data"][0])
					setTillDate(response["data"][1])
					setPredicted(response["data"][2])
					updateSGV()
				}
			  })
		}
	}

	return(
		<div>
			<NavBar></NavBar>
			<div id='main-ctn'>

				<div id='leftside'>
					<p id='left-title'>Product</p>
					<input id='product-input' type='text' placeholder='Search for a Product' onKeyDown={reqFromBackend}/>
					
					<div id='controls'>
						<div className='control-pair'>
							<p className='param'>Product Name:</p>
							<p className='pvalue'>{prodname}</p>
						</div>
						<div className='control-pair'>
							<p className='param'>Smoothing:</p>
							<input className='pvalue' id='tensionval' type={'range'} onChange={rangeHandler} />
						</div>
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