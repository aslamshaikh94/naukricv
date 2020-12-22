import React from 'react';
import {Link} from 'react-router-dom';


const Packeges =()=>{
	return(
			<main className="details h-100">
				<div className="d-flex justify-content-start">
					<Link to="/" className="btn btn-sm btn-primary">Back</Link>
				</div>
				<h3>NPM Packeges</h3>
				<ul class="list-group">
				  <li class="list-group-item">				  					  		
			  		<h5>Date Utility</h5>
			  		<p>npm install dateutility-aslam</p>
			  		<a href="https://www.npmjs.com/package/dateutility-aslam">NPM Link</a>				  	
				  </li>
				  <li class="list-group-item">				  				  		
			  		<h5>React Custom Checkbox & Radio Button</h5>
			  		<p>npm install custom-input-aslam</p>
			  		<a href="https://www.npmjs.com/package/custom-input-aslam">NPM Link</a>				  	
				  </li>
				</ul>
			</main>
		)
}
export default Packeges