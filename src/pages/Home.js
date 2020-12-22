import React, {Component} from 'react';
import Aboutme from '../components/subcm/Aboutme';
import Contactinfo from '../components/subcm/Contactinfo';
import Userskills from '../components/subcm/Userskills';
import Languages from '../components/subcm/Languages';
import Exprience from '../components/subcm/Exprience';
import Education from '../components/subcm/Education';
import Projects from '../components/subcm/Projects';


class Home extends Component{	
	render(){
		return(
			<main className="pt-3 pb-3">
				<div className='container-fluid'>
					<div className="row">
						<div className="col-lg-4">
							<div className="about_user">
								<div className='user_details'>
									<Contactinfo />
									<Userskills />
									<Languages />
								</div>
							</div>
						</div>
						<div className="col-lg-8">
							<div className='details aboutme'>
								<Aboutme />
							</div>
							<div className='details user_exprience'>
								<Exprience />
							</div>
							<div className="details projects">
								<Projects />
							</div>
							<div className='details'>
								<Education />								
							</div>							
						</div>
					</div>
				</div>
			</main>
			)
	}
}

export default Home;