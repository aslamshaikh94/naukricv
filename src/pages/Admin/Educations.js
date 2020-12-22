import React, {useEffect, useState, useContext} from 'react';
import {Axios} from '../../api/api';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {AppContext} from '../../App';
import {getDateFormat} from '../../utils';

const Educations =()=> {
	const {data, dispatch} = useContext(AppContext);
	const [userAuth, setUserAuth]=useState({})
	const [education, setEducation]=useState({date:new Date()})
	

	const {educations} = userAuth
		
  useEffect(()=>{
  	if(data.userdata){
  		setUserAuth(data.userdata)
  	}
  },[data.userdata])

	const inputHandaler=(e)=>{
		const {name, value} =e.target
		setEducation({...education, [name]:value })
	}
			
	const saveHandaler =()=>{
		Axios.put(`/users`, {...userAuth, educations:[...educations, education]}).then((res)=>{			
        dispatch({type:"USER_DATA", payload:res.data})
      }).catch((err)=>{
      console.log("err", err)
    });
	}

	const removeHandaler =(item)=>{
		let rmData = educations.filter((e, i)=> i!==item)
		Axios.put(`/users`, {...userAuth, educations:rmData}).then((res)=>{			
        dispatch({type:"USER_DATA", payload:res.data}) 
      }).catch((err)=>{
      console.log("err", err)
    });	
	}


  return (		     	
     	<div className="box">
	     	<h4 className='heading'>Educations</h4>
	     	<div>
	     		{
	     			educations&&
	     			educations.map((edu,i)=>(
		     				<div key={edu.name+i}>
		     					<div className="d-flex justify-content-between">
		     						<div>
			     						<h5 className="clrcyan">{edu.institute}</h5>			     							     						
			     						<h6 className="gray">{edu.education} {edu.percent}%</h6>	     						
			     						<p>{edu.date && getDateFormat(edu.date, 'yyyy')}</p>
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
			      <label>School / College Name</label>
			      <input type="text" 
			      			 placeholder="XYZ"
			      			 name="institute"			      			 
			      			 className="form-control"
							     onChange={inputHandaler}
							     />
			    </div>
			    <div className="form-group col-md-3">
			      <label>Education</label>
			      <input type="text" 
			      			 placeholder="HSC / BSc IT"
			      			 name="education"
			      			 className="form-control"
							     onChange={inputHandaler}
							     />
			    </div>
			    <div className="form-group col-md-3">
			      <label>Percent</label>
			      <input type="text" 
			      			 placeholder="100%"
			      			 name="percent"
			      			 className="form-control"
							     onChange={inputHandaler}
							     />
			    </div>
			    <div className="form-group col-md-3">
			      <label>Completed </label>
			      <DatePicker selected={education.date} 
			      						showYearPicker 
			      						dateFormat="yyyy"
			      						className="form-control" 
			      						onChange={date => setEducation({...education, date})} 
			      						/>
			    </div>
		    </div>
				<div className="d-flex justify-content-end">
	     		<button className="btn btn-dark" onClick={saveHandaler}>SAVE</button>		     		
	     	</div>
     	</div>
  );
}


export default Educations;