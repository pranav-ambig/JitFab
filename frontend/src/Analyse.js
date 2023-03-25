import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
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

export const lstmOptions = {
	responsive:true,
	plugins: {
		title: {
			display:true,
			text: 'LSTM'
		}
	}
}

export const xgbOptions = {
	responsive:true,
	plugins: {
		title: {
			display:true,
			text: 'XG Boost'
		}
	}
}


export default function Analyse(){

	const [tensionval, setTensionVal] = useState(0)
	const [LstmMode, setLstmMode] = useState(false)
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
	updateSGV() //second graph values

	

	let data = {
		labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
		datasets: [{label:'Actual',
					data:tillDate,
					borderColor: "rgb(142, 126, 164)",
					backgroundColor: "rgb(142, 126, 164)",
					tension: tensionval,
					// fill:true
					},
					{label:'Predicted',
					data: secondGraphValues,
					borderColor: "rgb(255, 157, 0)",
					backgroundColor: "rgb(255, 157, 0)",
					tension: tensionval,
					// fill:true
					},
				]
		}

	const rangeHandler = ()=>{
		let ele = document.getElementById('tensionval')
		
		setTensionVal(ele.value/100)
		ele.value = ele.value
	}

	const reqFromBackend = (e)=>{
		if (e.which == 13){
			let ele = document.getElementById('product-input')
			if (LstmMode){
				axios.post('http://127.0.0.1:5000/lstm', {
					"PLID": ele.value
					})
					.then(function (response) {
					if (response["data"] != "Error"){
						setProdName(response["data"][0])
						setTillDate(response["data"][1])
						setPredicted(response["data"][2])
						updateSGV()
					}
					else {
						setProdName("Not present in DB")
					}
					})
			}
			else {
				axios.post('http://127.0.0.1:5000/xgb', {
					"PLID": ele.value
					})
					.then(function (response) {
						if (response["data"] != "Error"){
							setProdName(response["data"][0])
							setTillDate(response["data"][1])
							setPredicted(response["data"][2])
							updateSGV()
						}
						else {
							setProdName("Not present in DB")
						}
					})
			}
		}
	}
	const reqFromBackendForce = (lstmMode2)=>{
		let ele = document.getElementById('product-input')
		if (lstmMode2 === true){
			axios.post('http://127.0.0.1:5000/lstm', {
				"PLID": ele.value
				})
				.then(function (response) {
				if (response["data"] != "Error"){
					setProdName(response["data"][0])
					setTillDate(response["data"][1])
					setPredicted(response["data"][2])
					updateSGV()
				}
				else {
					setProdName("Not present in DB")
				}
				})
		}
		else {
			axios.post('http://127.0.0.1:5000/xgb', {
				"PLID": ele.value
				})
				.then(function (response) {
					if (response["data"] != "Error"){
						setProdName(response["data"][0])
						setTillDate(response["data"][1])
						setPredicted(response["data"][2])
						updateSGV()
					}
					else {
						setProdName("Not present in DB")
					}
				})
		}
	}

	return(
		<div id='maiin-ctn'>
			<NavBar></NavBar>
			<div id='main-ctn'>

				<div id='leftside'>
					<p id='left-title'>Product</p>
					<input id='product-input'  type='text' placeholder='Search for a Product' onKeyDown={reqFromBackend}/>
					
					<div id='controls'>
						<div className='control-pair'>
							<p className='param'>Product Name:</p>
							<p className='pvalue'>{prodname}</p>
						</div>
						<div className='control-pair'>
							<p className='param'>Smoothing:</p>
							<input className='pvalue' defaultValue={tensionval} id='tensionval' type={'range'} onChange={rangeHandler} />
						</div>

						<div className='control-pair'>
							<p id='mode-switch-btn'
							onClick={()=>{
								// console.log(LstmMode)
								setLstmMode((!LstmMode));
								if (LstmMode)
									reqFromBackendForce(false)
								else
									reqFromBackendForce(true)
								
								
							}}
							>Switch to {LstmMode?"XG Boost":"LSTM"} Mode</p>
						</div>
						{/* <div className='control-pair'>
							<p id='mode-switch-btn'
							onClick={()=>{
								setLstmMode(!LstmMode)
							}}
							>Switch to {LstmMode?"XG Boost":"LSTM"} Mode</p>
						</div> */}
					</div>
				</div>


				<div id='rightside'>
					<p id='right-title'>Analysis</p>
					{LstmMode?<Line data={data} options={lstmOptions} id='lstm-chart'></Line>:<Line data={data} options={xgbOptions} id='xgboost-chart'></Line>}
					
					
				</div>

			</div>
		</div>
	)
}