import React, {useEffect, useState, useContext} from 'react';
import {Axios} from '../../api/api';
import {AppContext} from '../../App';

const Languages =()=> {
	const {data} = useContext(AppContext);
	const [userAuth, setUserAuth]=useState({})	

	const {languages} = {...userAuth}
	
  useEffect(()=>{
  	if(data.userdata){
  		let {user_info, experience, projects, ...all} = data.userdata
  		setUserAuth({...user_info, ...experience, ...projects, ...all})
  	}
  },[data.userdata])

	const inputHandaler=(e)=>{
		const {name, value} =e.target
		setUserAuth({...userAuth, [name]:value})
	}

	const addLanguagesHandaler =()=>{
		const {language, percent, languages} = userAuth
		setUserAuth({...userAuth, languages:[...languages, {language, percent}]})
	}
		
	const saveHandaler =()=>{
		Axios.put(`/users`, userAuth).then((res)=>{			
        console.log(res.data)
      }).catch((err)=>{
      console.log("err", err)
    });
	}


  return (
     	<div className="col-6">
     		<div className="box">
	     		<h4 className='heading'>Languages</h4>
	     		<div className="skillBadgeGroup">
	     			{
	     				languages &&
	     				languages.map((item,i)=>(
	     						<span className="skillBadge" 
	     									key={item.language+i}>
	     									{item.language}: {item.percent}
	     						</span>
	     					))
	     			}
	     		</div>
	     		<div className="form-group input-group">					  
					  <input type="text" 
					  			 placeholder="Language"
					  			 name="language"
					  			 className="form-control"
					  			 onChange={inputHandaler}
					  			 />
					  <input type="text" 
					  			 placeholder="Percent"
					  			 name="percent"
					  			 className="form-control" 
					  			 onChange={inputHandaler}
					  			 />
					  <div className="input-group-prepend">
					    <button className="btn btn-dark" 
					    				onClick={addLanguagesHandaler}>Add</button>
					  </div>
					</div>
					<div className="d-flex justify-content-end">
		     		<button className="btn btn-dark"
		     						onClick={saveHandaler}
		     						>SAVE</button>		     		
		     	</div>
	     	</div>
     	</div>
  );
}


export default Languages;