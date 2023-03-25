import './output.css'
import './outputclassic.css'
const loc = require("./location.png")

function Products({PLID, Amount,InvLocation}){

	return(
		<div className='Report bg-[url("/assets/factory.png")] h-52 bg-contain bg-no-repeat'>
       <div className='text-center'>

          PLID :   <p id='myflex' className='px-10'>{PLID}</p>
           Estimated Sales : <p>{Amount}</p>
           {/* <p>wugiwuigueigbueibgierui</p> */}
          Location : <p className='text-lg'>{InvLocation}</p>
       </div>

        
        </div>
	)
}

export default Products;
