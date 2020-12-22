import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../../App';

const Languages =()=>{
	const {data} = useContext(AppContext)
	const [languages, setLanguages] = useState()

	useEffect(()=>{
		if(data.userdata){			
			setLanguages(data.userdata.languages)
		} 
	},[data])
		
	return(
		<section>
			<h5 className='font-weight-bold gray'><i className='fa fa-language mr-3 clrcyan'></i> Languages</h5>
			{
				languages &&
				languages.map((item)=>{
					return(
							<div className='progress_group w-100' key={item.language}>
								<span>{item.language}</span>
								<div className="progress">
								  <div className="progress-bar" 
								  		 style={{width: `${item.percent}%`}}>{item.percent}%
								  </div>
								</div>
							</div>
						)
				})
			}
			
		</section>
	)
	
}

export default Languages;