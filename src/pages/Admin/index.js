import React, {useEffect, useContext} from 'react';
import {Axios} from '../../api/api';

import Profile from './Profile'
import About from './About'
import Skills from './Skills'
import Languages from './Languages'
import Experience from './Experience'
import Projects from './Projects'
import Educations from './Educations'

import {AppContext} from '../../App';

const Admin =()=> {
	const {dispatch} = useContext(AppContext);

	useEffect(()=>{
    Axios.get(`/users`).then((res)=>{    	
      if(res.data)  dispatch({type:"USER_DATA", payload:res.data})          
      }).catch((err)=>{
      console.log("err", err)
    });
  },[dispatch])
	
  return (				
    <div className="container mt-4">
    	<Profile/>
     	<About/>
     	<div className="row">
     		<Skills/>
     		<Languages/>
     	</div>	     	
     	<Experience/>
      <Projects/>
      <Educations />
    </div>
  );
}


export default Admin;