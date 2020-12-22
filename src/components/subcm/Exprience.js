import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../App';
import {getDateFormat} from '../../utils';

const Experience =()=>{
	const {data} = useContext(AppContext)
	const [experience, setExperience] = useState()
	
	useEffect(()=>{
		if(data.userdata) setExperience(data.userdata.experience)
	},[data])

	return(
		<section>
			<h2 className="gray"><i className="fa fa-suitcase mr-4 clrcyan"></i>Work Experience</h2>
			{
				experience &&
				experience.map((item, i)=>{
					return(
							<div className='details_item' key={item.employer+i}>
								<h4 className="mb-0 clrcyan">{item.employer}</h4>
								<h5 className='medium gray'>{item.designation}</h5>
								<h6 className="mt-3 mb-3 clrcyan">
									<i className="fa fa-calendar mr-3 clrcyan"></i>
										{getDateFormat(item.from, 'ddmmyyyy')} To {getDateFormat(item.to, 'ddmmyyyy')}
								</h6>
								<p className="m-0">{item.describe}</p>
							</div>
						)
				})
			}
			
		</section>
	)
}

export default Experience;