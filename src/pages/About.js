import React, {Component} from 'react';
import {BrowserRouter as Link} from 'react-router-dom';
import Header from '../components/Header';
// import axios from 'axios';

class Home extends Component{
	state={
		userPhoto: [],
	}

	componentDidMount() {
		var url = 'https://jsonplaceholder.typicode.com/photos';
	  fetch(url).then(data =>{
	  	return data.json();
	  }).then(data=>{
	  	this.setState({ photuserPhoto: data.slice(0, 20) })
	  });
	}
	render(){
		return(
			<div>
				<Header name="bg-primary navbar-dark" />
				<main className='mt-3'>
					<div className='container'>
						<div className="row">
							{this.state.photos.map((userPhoto) => {					
								return 	(
										<div key={userPhoto.id} className="col-3 mb-3">
											<div className="card">
											  <img className="card-img-top" src={`https://joeschmoe.io/api/v1/${userPhoto.title} `} alt="Cardimage" style={{height: '150px'}} />
											  <div className="card-body">
											    <h4 className="card-title">{userPhoto.title.slice(0, 10).toUpperCase()}</h4>
											    <p className="card-text">Some example text.</p>
											    <Link to="#" className="btn btn-primary">See Profile</Link>
											  </div>
											</div>
										</div>
									)
							})}
						</div>
					</div>					
				</main>
			</div>
			)
	}
}

export default Home;