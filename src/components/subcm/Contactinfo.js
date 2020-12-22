import React, {useState, useEffect, useContext, memo} from 'react';
import {AppContext} from '../../App';

const Contactinfo =()=>{
	const {data} = useContext(AppContext)	
	const [userInfo, setUserInfo] = useState({
        fullName:'Loding...',
        name: 'Loding...',
        designation:'Loding...',
        address:'Loding...',
        email:'Loding...',
        mobile:'Loding...',
      })
	
	useEffect(()=>{
		if(data.userdata){
			setUserInfo({...data.userdata.user_info, email:data.userdata.email, ...data.userdata})
		} 
	},[data.userdata])

	return(
			<section>				
				<div className='about_me'>
					<img src='https://mohammadaslam.co/static/media/aslam.3fcc0eb9.jpg' alt="profile" className="img-fluid" />
					<h2>{userInfo.first_name} {userInfo.last_name}</h2>
				</div>				
					<ul className="user_info">										
						<li><i className="mr-3 fa fa-briefcase"></i> {userInfo.designation}</li>
						<li><i className="mr-3 fa fa-home"></i> {userInfo.address}</li>
						<li><i className="mr-3 fa fa-envelope"></i> {userInfo.email}</li>
						<li><i className="mr-3 fa fa-phone"></i> {userInfo.mobile}</li>
					</ul>
			</section>				
		)
}



export default memo(Contactinfo);