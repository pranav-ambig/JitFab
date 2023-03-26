import React from 'react';
import { Pie } from 'react-chartjs-2';
import "./forecast.css"
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import { useState } from 'react';
import axios from 'axios';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
    ArcElement,
	Tooltip,
	Legend,
  } from 'chart.js';
import { useEffect } from 'react';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend
    );
    let influxvaluemax = Math.floor(Math.random()*10000)
    let positive = Math.random()>0.5
    // let influxvaluemax = 1000
export default function(){

    const storehouses=["Sirsi","Bengaluru","Mumbai","San Francisco"]
    const prodnames=["CP-8811-K9","ISR4321-K9","A9K-920-4SZ-D","A9K-8X100GE-TR"]
    const [statecolor,setstatecolor] = useState("#FEFD98")
    const [refreshprop, refresher] = useState("second")
    // const [quan, setQuan] = useState([0, 0, 0, 0]);
    // let quan = [];
    let loc = useLocation();

    // if (quan === [0, 0, 0, 0]){
    //   console.log('test', quan)
    //   axios.post('http://127.0.0.1:5000/invent', {
    //           "num":4,
    //           "PLID":loc.state["PLID"]
    //           })
    //           .then(function (response) {
    //             response = response["data"][0]["quan"]
    //             console.log("test", response)
    //             setQuan(response)
    //             // console.log("test1", response["quan"])
    //             // quan = response
    //             // setQuan(response["quan"])
    //             // console.log("test", quan)
    //           })
    // }
      

    // console.log("test", loc.state)
    function cb (){

      // influxvaluemax = Math.floor(Math.random()*10000)
      influxvaluemax = loc.state["qty"]
    positive = true
    document.getElementById("uniid").innerText=0

      if(!positive){
        setstatecolor("#f70d1a")
      }
      const counters = document.querySelectorAll('.value');
let speed = 200;
speed*=Math.ceil(Math.log10(influxvaluemax))
console.log(counters);
counters.forEach( counter => {
   const animate = () => {
      const value = +counter.getAttribute('akhi');
      const data = +counter.innerText;
     
      const time = value / speed;
     if(data < value) {
      // if(positive)
          counter.innerText =  Math.ceil(data + time);
          // else
          // counter.innerText = "-" + Math.ceil(data + time);
          setTimeout(animate, 1);
        }else{
          console.log(value);
          counter.innerText = value;
        }
     
   }
   
   animate();
});

  

    }
    setTimeout(cb, 400);
    useEffect(cb,[refreshprop])
    const [data, setdata] = useState({
  labels: ['A9K-RSP5-SE', 'C927-4P', 'A99-32X100GE-X-SE', 'C9300X-24Y', 'C9500-40X', 'NCS-57C3-MODS-SYS'],
  datasets: [
    {
      label: '# of Votes',
      data: [Math.ceil(Math.random()*30) + 5 , Math.ceil(Math.random()*20) +5, Math.ceil(Math.random()*40) +5, Math.ceil(Math.random()*50) +3, Math.ceil(Math.random()*10) +5, Math.ceil(Math.random()*60) +2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
})


    function piedata(){
        console.log("piedata tirg");
        setdata( {
          labels: ['A9K-RSP5-SE', 'C927-4P', 'A99-32X100GE-X-SE', 'C9300X-24Y', 'C9500-40X', 'NCS-57C3-MODS-SYS'],
          datasets: [
            {
              label: '# of Votes',
              data: [Math.ceil(Math.random()*10) +5 , Math.ceil(Math.random()*10) +5, Math.ceil(Math.random()*10) +5, Math.ceil(Math.random()*10) +3, Math.ceil(Math.random()*10) +5, Math.ceil(Math.random()*10) +2],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        })
    }

  useEffect(piedata,[refreshprop])
      
    


    const [mode,setmode] = useState("Product")
    const navigate = useNavigate();
    
    // const gotoAnalyse = ()=>{navigate('/analyse')}

	return(
		<div refresh = {refreshprop} style={{ padding : "10px"}} >
   <p> {refreshprop==""?"":""}</p>
   {console.log("refreshed now")}
        <NavBar></NavBar>
        <img style={{width: "150px" , height : "150px"}} src={require("./clock.gif")} ></img>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div style=  {{fontSize : "20px" , color : "white"}}>
        <span style={{left : "10px"}} ><p  onClick={()=>setmode(mode=="Product"?"Storehouses" :"Product")}>Switch to {mode=="Product"?"Storehouses" :"Product" } </p> </span>
        <p  style=  {{fontSize : "40px" , color : "black"}} >{mode} Forecast</p>
        </div>
        <select  onChange={()=>{
          refresher(Math.random())
          console.log("refreshed by optin")
          
        }}  style={{  margin : "50px" , scale : "2"}}>
        {mode=="Product"?prodnames.map((e,i)=>{
                return<option style={{scale : "2"}}   value={e} >{e}</option>
            }) : storehouses.map((e,i)=>{
                return<option  style={{scale : "2"}}   value={e} >{e}</option>
            }) }
        {}
        </select>
        <h2 style={{top :"80px"  , left :"420px", width  : "250px" , position : "absolute"}}>Expected Influx :</h2>
       <div style={{ padding : "5px", textAlign : "center", borderRadius : "8px" ,backgroundColor : statecolor , height: "150px", top :"180px"  , left :"420px", width  : "250px" , position : "absolute" }}>
      <p style={{fontSize : 40}}>{positive?"":"-"}   <div id="uniid" className='value' akhi={influxvaluemax.toString()} style={{fontSize : 40 , textAlign : "center", display : 'inline-block'}}>  0 </div> </p>  
       </div>
      { mode=="Product"?<></> :   <div style={{ padding : "5px", borderRadius : "8px" ,backgroundColor : "#FEFD98" , top :"80px"  , right :"20px", width  : "400px" , position : "absolute" }}>
        
      
      <div style={{   }} > <Pie data={data} /></div>
      
        </div>}
        {mode=="Product"?<>
        <h2>Expected influx on a per storehouse basis :</h2>
           <div style={{ display : "flex" , justifyItems : "center", alignItems : "center", padding : "5px", borderRadius : "8px" ,backgroundColor : "#FEFD98" , left :"80px"  , bottom :"20px", height : "250px" , width  : "1200px" , position : "absolute" }}>
           { storehouses.map((e,i)=>{
            return <Warehouse Location={e} TotCapacity={Math.random()*1000 + 100} Allocunits={Math.ceil(influxvaluemax*(i+1)/6)} refresh={refreshprop} ></Warehouse>
           })}
           </div>
        </>:<>
          <BinSize>

          </BinSize>
        </>}
		</div>
	)
}

function Warehouse({Location , TotCapacity , Allocunits,refresh}){

  return<p style={{padding : "40px" , borderRight : "solid black 2px"}} >
  {refresh==""?"":""}
    <p>Location : {Location}</p>
    <p> Total Capacity : {TotCapacity}</p>
    <p> Need to allocate / Free : {Allocunits}</p>
  </p>
}
function BinSize({Tofit}){

  let tempval =18318

  let XSsize=10
  let Ssize=50
  let Msize=100
  let Lsize=500
  let XLsize=2000

  let sizearray=[]
  while


  return<p style={{padding : "40px" , borderRight : "solid black 2px"}} >
  {refresh==""?"":""}
    <p>Location : {Location}</p>
    <p> Total Capacity : {TotCapacity}</p>
    <p> Need to allocate / Free : {Allocunits}</p>
  </p>
}
