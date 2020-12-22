import React, {useEffect, useState, useContext} from 'react';
import {Axios} from '../../api/api';
import {AppContext} from '../../App';

const Skills =()=> {
	const {data} = useContext(AppContext);
	const [userAuth, setUserAuth]=useState({})	

	const {skills} = {...userAuth}
	
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

	const addSkillsHandaler =()=>{
		const {skill, percent, skills} = userAuth
		setUserAuth({...userAuth, skills:[...skills, {skill, percent}]})
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
     		<h4 className='heading'>Skills</h4>
     		<div className="skillBadgeGroup">
     			{
     				skills &&
     				skills.map((item,i)=>(
     						<span className="skillBadge" key={item.skill+i}>{item.skill}: {item.percent}</span>
     					))
     			}
     		</div>
     		<div className="form-group input-group">					  
				  <input type="text" 
				  			 placeholder="HTML"
				  			 name="skill"
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
				    				onClick={addSkillsHandaler}>Add</button>
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


export default Skills;