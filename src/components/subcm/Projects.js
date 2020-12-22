import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../../App';

const Projects =()=> {
	const {data} = useContext(AppContext)
	const [projects, setProjects] = useState()
			
	useEffect(()=>{
		if(data.userdata) setProjects(data.userdata.projects)
	},[data])

	return(
		<section>
			<h2 className="gray"><i className="fa fa-suitcase mr-4 clrcyan"></i>Projects</h2>
			{
				projects &&
				projects.map((item, i)=>{
					return(
							<div className="details_item" key={item.name+i}>
								<h4 className="mb-0 clrcyan">{item.name}</h4>
								<h5 className='medium gray'>{item.role}</h5>
								<p className="m-0">{item.technologies}</p>
								<a href={item.url} target="_blanck" className="m-0">{item.url}</a>
							</div>
						)
				})
			}			
		</section>
	)
}

export default Projects;