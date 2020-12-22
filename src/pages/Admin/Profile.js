import React, {useEffect, useState, useContext} from 'react';
import {Axios} from '../../api/api';

import {AppContext} from '../../App';

const Profile =()=> {
	const {data} = useContext(AppContext);
	const [userAuth, setUserAuth]=useState({})
	const {
					profile_name, 
					first_name, 
					last_name,	
					address, 
					designation, 
					mobile,
				} = {...userAuth}
	
  useEffect(()=>{
  	if(data.userdata){
  		let {user_info, ...all} = data.userdata
  		setUserAuth({...user_info, ...all})
  	}
  },[data.userdata])

	const inputHandaler=(e)=>{
		const {name, value} =e.target
		setUserAuth({...userAuth, [name]:value})
	}

	const saveHandaler =()=>{		
		Axios.put(`/users`, userAuth).then((res)=>{			
        console.log(res.data)
      }).catch((err)=>{
      console.log("err", err)
    });
	}

  return (			     
    	<div className="box">
    		<h4 className='heading'>Profile 
    			<a href={`/${profile_name}`} 
    				 target="_blanck" 
    				 className="btn btn-sm btn-success">
    				 View Profile
    			</a>
    		</h4>
	     	<div className="form-row">
	     		<div className="form-group col-md-6">
			      <label>Profile Name</label>
			      <input type="text"
			      			 name="profile_name" 
			      			 defaultValue={profile_name}
			      			 className="form-control" 
			      			 onChange={inputHandaler}
			      			 />
			    </div>
			    <div className="form-group col-md-6">
			      <label>Designation</label>
			      <input type="email" 
			      			 name="designation"
			      			 defaultValue={designation}
			      			 className="form-control" 
			      			 onChange={inputHandaler}
			      			 />
			    </div>
	     	</div>
	     	<div className="form-row">	      	
		     	<div className="form-group col-md-3">
			      <label>First Name</label>
			      <input type="email" 
			      			 name="first_name"
			      			 defaultValue={first_name}
			      			 className="form-control"
							     onChange={inputHandaler}
							     />
			    </div>
			    <div className="form-group col-md-3">
			      <label>Last Name</label>
			      <input type="email" 
			      			 name="last_name"
			      			 defaultValue={last_name}
			      			 className="form-control"
							     onChange={inputHandaler}
							     />
			    </div>
			    <div className="form-group col-md-3">
			      <label>Mobile Number</label>
			      <input type="number"
			      			 name="mobile"
			      			 defaultValue={mobile}
			      			 className="form-control"
							     onChange={inputHandaler}
							     />
			    </div>
			    <div className="form-group col-md-3">
			      <label>Location</label>
			      <input type="text" 
			      			 name="address"
			      			 defaultValue={address}
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


export default Profile;