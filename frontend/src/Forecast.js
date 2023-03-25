import React from 'react';
import { Pie } from 'react-chartjs-2';
import "./forecast.css"
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { useState } from 'react';
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
    // let influxvaluemax = Math.floor(Math.random()*10) -5
    let influxvaluemax = 10
export default function(){

    const storehouses=["Sirsi","Bengaluru","Mumbai","San Francisco"]
    const prodnames=["CP-8811-K9","ISR4321-K9","A9K-920-4SZ-D","A9K-8X100GE-TR"]
    const [statecolor,setstatecolor] = useState("#FEFD98")
    let [influxvalue,setInflux] = useState(0)
    let influxvaluehandler = ()=>{

      influxvalue+=1
        setInflux(influxvalue)
       return(influxvalue==influxvaluemax) 
    }
    useEffect(()=>{
        if(influxvaluemax<0){
            setstatecolor("#f70d1a")
            
        }else{
            // setstatecolor("#FEFD98")
            let timerstop = false
            function uff (){
              
              setTimeout(()=>{
                if( !timerstop && !influxvaluehandler())
                uff()
                else {
                  timerstop=true;
                  console.log("true set");
                }
                
            },100)
            }
            uff()
        }

    },[])
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
      };
      
    


    const [mode,setmode] = useState("Storehouse")
    const navigate = useNavigate();
    // const gotoAnalyse = ()=>{navigate('/analyse')}

	return(
		<div style={{ padding : "10px"}} >
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
        <select style={{  margin : "50px" , scale : "2"}}>
        {mode=="Product"?prodnames.map((e,i)=>{
                return<option style={{scale : "2"}}  value={e} >{e}</option>
            }) : storehouses.map((e,i)=>{
                return<option  style={{scale : "2"}} value={e} >{e}</option>
            }) }
        {}
        </select>
       <div style={{ padding : "5px", borderRadius : "8px" ,backgroundColor : statecolor , height: "150px", top :"180px"  , left :"420px", width  : "250px" , position : "absolute" }}>
        <p style={{fontSize : 40 , textAlign : "center"}}> {influxvaluemax<0?"-":""} {influxvalue}</p>
       </div>
        <div style={{ padding : "5px", borderRadius : "8px" ,backgroundColor : "#FEFD98" , top :"80px"  , right :"20px", width  : "200px" , position : "absolute" }}>
        {mode=="Product"?<></>:<>
      
      <div style={{   }} > <Pie  data={data} /></div>
       </>}
        </div>
        {mode=="Product"?<>
           <div style={{ padding : "5px", borderRadius : "8px" ,backgroundColor : "#FEFD98" , left :"80px"  , bottom :"20px", height : "250px" , width  : "1200px" , position : "absolute" }}>

           </div>
        </>:<></>}
		</div>
	)
}