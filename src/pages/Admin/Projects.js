import React, {useEffect, useState, useContext} from 'react';
import {Axios} from '../../api/api';

import "react-datepicker/dist/react-datepicker.css";

import {AppContext} from '../../App';

const Projects =()=> {
	const {data, dispatch} = useContext(AppContext);
	const [userAuth, setUserAuth]=useState({})
	const [project, setProject]=useState({})

	const {projects} = userAuth	
	
  useEffect(()=>{
  	if(data.userdata){
  		setUserAuth(data.userdata)
  	}
  },[data.userdata])

	const inputHandaler=(e)=>{
		const {name, value} =e.target
		setProject({...project, [name]:value })
	}
			
	const saveHandaler =()=>{
		Axios.put(`/users`, {...userAuth, projects:[...projects, project]}).then((res)=>{			
        dispatch({type:"USER_DATA", payload:res.data})
      }).catch((err)=>{
      console.log("err", err)
    });
	}

	const removeHandaler =(item)=>{
		let rmData = projects.filter((e, i)=> i!==item)
		Axios.put(`/users`, {...userAuth, projects:rmData}).then((res)=>{			
        dispatch({type:"USER_DATA", payload:res.data}) 
      }).catch((err)=>{
      console.log("err", err)
    });	
	}

  return (		     	
     	<div className="box">
	     	<h4 className='heading'>Projects</h4>
	     	<div>
	     		{
	     			projects&&
	     			projects.map((prjt,i)=>(
		     				<div key={prjt.name+i}>
		     					<div className="d-flex justify-content-between">
		     						<div>
			     						<h5 className="clrcyan">{prjt.name}</h5>
			     						<h6 className="gray">{prjt.role}</h6>	     						
			     						<p>{prjt.technologies}</p>
			     						<a href={prjt.url} target="_blank" rel="noopener noreferrer">{prjt.url}</a>
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
			      <label>Project Name</label>
			      <input type="text" 
			      			 placeholder="XYZ"
			      			 name="name"			      			 
			      			 className="form-control"
							     onChange={inputHandaler}
							     />
			    </div>
			    <div className="form-group col-md-3">
			      <label>Role</label>
			      <input type="email" 
			      			 placeholder="Web Developer"
			      			 name="role"			      			 
			      			 className="form-control"
							     onChange={inputHandaler}
							     />
			    </div>			    
			   	<div className="form-group col-md-3">
			      <label>Technologies</label>
			      <input type="email" 
			      			 placeholder="HTML, CSS, JavaScript"
			      			 name="technologies"			      			 
			      			 className="form-control"
							     onChange={inputHandaler}
							     />
			    </div>
			    <div className="form-group col-md-3">
			      <label>Project URL</label>
			      <input type="email" 
			      			 placeholder="www.xyz.com"
			      			 name="url"			      			 
			      			 className="form-control"
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


export default Projects;