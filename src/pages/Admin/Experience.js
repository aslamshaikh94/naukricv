import React, {useEffect, useState, useContext} from 'react';
import {Axios} from '../../api/api';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {AppContext} from '../../App';
import {getDateFormat} from '../../utils';

const Experience =()=> {
	const {data, dispatch} = useContext(AppContext);
	const [userAuth, setUserAuth]=useState({})
	const [exp, setExp]=useState({from:'', to:''})

	const {experience} = userAuth
	
  useEffect(()=>{
  	if(data.userdata){
  		setUserAuth(data.userdata)
  	}
  },[data.userdata])

	const inputHandaler=(e)=>{
		const {name, value} =e.target
		setExp({...exp, [name]:value })
	}
			
	const saveHandaler =()=>{
		Axios.put(`/users`, {...userAuth, experience:[...experience, exp]}).then((res)=>{		
        dispatch({type:"USER_DATA", payload:res.data}) 
      }).catch((err)=>{
      console.log("err", err)
    });
	}
	const removeHandaler =(item)=>{
		let rmData = experience.filter((e, i)=> i!==item)
		Axios.put(`/users`, {...userAuth, experience:rmData}).then((res)=>{			
        dispatch({type:"USER_DATA", payload:res.data}) 
      }).catch((err)=>{
      console.log("err", err)
    });	
	}
  return (		     	
     	<div className="box">
	     	<h4 className='heading'>Work Experience</h4>		
	     	<div>
	     		{
	     			experience&&
	     			experience.map((exp,i)=>(
	     				<div key={exp.employer+i}>
	     					<div className="d-flex justify-content-between">
	     						<div>
		     						<h5 className="clrcyan">{exp.employer}</h5>
		     						<h6 className="gray">{exp.designation}</h6>
		     						<h6 className="clrcyan">
		     							From {getDateFormat(exp.from, 'ddmmyyyy')} 
		     							To {getDateFormat(exp.to, 'ddmmyyyy')}
		     						</h6>
		     						<p>{exp.describe}</p>
	     						</div>
	     						<div>
	     							<button className="btn btn-sm btn-danger" 
	     											onClick={e=>removeHandaler(i)}
	     											><i className="fa fa-times"></i></button>
	     						</div>
	     					</div>
	     					<hr/>
	     					</div>
	     				))
	     		}
	     	</div>      	
	     	<div className="form-row">	      	
		     	<div className="form-group col-md-3">
			      <label>Employer</label>
			      <input type="text" 
			      			 name="employer"			      			 
			      			 className="form-control"
							     onChange={inputHandaler}
							     />
			    </div>
			    <div className="form-group col-md-3">
			      <label>Designation</label>
			      <input type="email" 
			      			 name="designation"			      			 
			      			 className="form-control"
							     onChange={inputHandaler}
							     />
			    </div>
			    <div className="form-group col-md-3">
			      <label>From</label>
			      <DatePicker selected={exp.from} 
			      						dateFormat="dd/MM/yyyy" 
			      						className="form-control" 
			      						onChange={date => setExp({...exp, from:date})} 
			      						/>
			    </div>
			    <div className="form-group col-md-3">
			      <label>To</label>
			      <DatePicker selected={exp.to} 
			      						className="form-control" 
			      						onChange={date => setExp({...exp, to:date})} 
			      						/>
			    </div>
			    <div className="form-group col-md-12">	
	     		<label>Describe your Job Profile</label>			  
				  <textarea className="form-control" 
				  					name="describe"
				  					rows={4} 				  					
				  					onChange={inputHandaler}
				  					/>
				</div>
		    </div>
				<div className="d-flex justify-content-end">
	     		<button className="btn btn-dark" onClick={saveHandaler}>SAVE</button>		     		
	     	</div>
     	</div>
  );
}


export default Experience;