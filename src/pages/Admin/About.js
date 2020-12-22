import React, {useEffect, useState, useContext} from 'react';
import {Axios} from '../../api/api';
import {AppContext} from '../../App';

const About =()=> {
	const {data, dispatch} = useContext(AppContext);
	const [userAuth, setUserAuth]=useState({})
	const {about} = {...userAuth}
	
  useEffect(()=>{
  	if(data.userdata){  		
  		setUserAuth(data.userdata)
  	}
  },[data.userdata])

	const inputHandaler=(e)=>{
		const {name, value} =e.target
		setUserAuth({...userAuth, [name]:value})
	}

	const saveHandaler =()=>{
		Axios.put(`/users`, userAuth).then((res)=>{			
       dispatch({type:"USER_DATA", payload:res.data})
      }).catch((err)=>{
      console.log("err", err)
    });
	}

  return (
			<div className="box">
	     	<h4 className='heading'>About</h4>		      	
	     	<div className="form-group">	
	     		<label>About Me</label>			  
				  <textarea className="form-control" 
				  					name="about"
				  					rows={4} 
				  					defaultValue={about} 
				  					onChange={inputHandaler}
				  					/>
				</div>
				<div className="d-flex justify-content-end">
	     		<button className="btn btn-dark" onClick={saveHandaler}>SAVE</button>		     		
	     	</div>
     	</div>
  );
}


export default About;