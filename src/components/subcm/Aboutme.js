import React, {useState,useEffect, useContext} from 'react';

import {AppContext} from '../../App';

const Aboutme =()=>{
	const {data} = useContext(AppContext)
	const [about, setAbout] = useState()

	useEffect(()=>{
		if(data.userdata) setAbout(data.userdata.about)
	},[data])
	
	return(
		<section>
			<h2 className="gray"><i className="fa fa-user mr-4 clrcyan"></i>About Me</h2>
			<p className="m-0">{about}</p>			
		</section>
	)
}

export default Aboutme;