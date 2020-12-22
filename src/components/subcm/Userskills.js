import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../../App';

const Userskills =()=>{
	const {data} = useContext(AppContext)
	const [skills, setSkills] = useState()

	useEffect(()=>{
		if(data.userdata){			
			setSkills(data.userdata.skills)
		} 
	},[data])
	
	return(
		<section>
			<h5 className='font-weight-bold gray'><i className='fa fa-asterisk mr-3 clrcyan'></i> Skills</h5>
			<div className="d-flex flex-wrap justify-content-between">
				{
					skills&& 
					skills.map((item, i)=>{
						return(
								<div className='progress_group' key={item.skill+i}>
									<span>{item.skill}</span>
									<div className="progress">
									  <div className="progress-bar" 
									  		 style={{width: `${item.percent}%`}}>{item.percent}%
									  </div>
									</div>
								</div>
							)
					})
				}				
			</div>
		</section>
	)	
}

export default Userskills;