import React, {useState} from "react";
import {Axios} from '../api/api';

const Auth = (props)=> {
	const [userAuth, setUserAuth]=useState({})
	
	const inputHandaler=(e)=>{
		const {name, value} =e.target
		setUserAuth({...userAuth, [name]:value})
	}

	const signupHandaler = ()=>{
		let getdata =  JSON.parse(localStorage.getItem('aboutus'))				
		Axios.post(`/users/register`, userAuth).then((res)=>{			
				let {token, status, message} = res.data
				let userToken =	JSON.stringify({data:getdata.data, token:token})				
        if(status){
        	localStorage.setItem("aboutus", userToken)        	
        	props.history.push('/admin')
        }
        else{
        	console.log('message', message)
        }
      }).catch((err)=>{
      console.log("err", err)
    });
	}
	
	return(
			<main className='auth'> 
				<div className="container">
				  <div className="row">
				    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
				      <div className="card card-signin my-5">
				        <div className="card-body">
				          <h5 className="card-title text-center">Sign Up</h5>			          
			            <div className="form-label-group">
			            <label>Email address</label>
			              <input type="email" 
			              			 className="form-control" 
			              			 placeholder="Email address"
			              			 name="email"
			              			 onChange={inputHandaler}
			              			 />			              
			            </div>
			            <div className="form-label-group">
			            <label>Password</label>
			              <input type="password" 
			              			 className="form-control" 
			              			 placeholder="Password" 
			              			 name="password"
			              			 onChange={inputHandaler}
			              			 />			              
			            </div>
			            <button className="btn btn-lg btn-primary btn-block"
			            				onClick={signupHandaler}
			            >Login</button>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>
			</main>
		)
}

export default Auth;