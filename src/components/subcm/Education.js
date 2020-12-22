import React,{useContext, useState, useEffect} from 'react';
import {AppContext} from '../../App';
import {getDateFormat} from '../../utils';
const Education =()=> {	
	const {data} = useContext(AppContext)
	const [educations, setEducation] = useState()
	
	useEffect(()=>{
		if(data.userdata) setEducation(data.userdata.educations)
	},[data])

	return(
		<section>
			<h2 className="gray"><i className="fa fa-certificate mr-4 clrcyan"></i>Education</h2>
			{
				educations &&
				educations.map((item, i)=>{
					return(
							<div className='details_item' key={item.name+i}>
								<h5 className='medium gray'>{item.institute}</h5>
								<h6 className="mt-3 mb-3 clrcyan">
									<i className="fa fa-calendar mr-3 clrcyan"></i>{getDateFormat(item.date, 'yyyy')}</h6>
								<p className="m-0">{item.education} {item.percent}%</p>
							</div>
						)
				})
			}
								
		</section>
	)
}

export default Education;