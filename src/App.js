import React,{useReducer, createContext, useEffect} from 'react';
import Home from './pages/Home';
import Admin from './pages/Admin/';
import Auth from './pages/Auth';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Axios} from './api/api';

import './assets/css/style.css'

import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = createContext();

let initialState={  
  loading:true,
  error:false,
}

const reducer=(state=initialState, action)=>{
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading:action.payload}
    case 'FETCH_ERROR':
      return {...state, loading:false, error:action.payload}
    case 'USER_DATA':
      return {...state, loading:false, userdata:action.payload}
    case 'FETCH_PRODUCTS':      
      return {...state, loading:false, products:action.payload}   
    case 'PROGRESS':
      return {...state, progress:action.payload}
    default:
      return initialState
  }
}

function App(props) {
	const [data, dispatch] = useReducer(reducer, initialState);
  
	useEffect(()=>{
    // console.log(localStorage.getItem('aboutus'))
    Axios.get(`/users${window.location.pathname}`).then((res)=>{      
        dispatch({type:"USER_DATA", payload:res.data})          
      }).catch((err)=>{
      console.log("err", err)
    });
  },[])

  return (
    <div className="App">
      <Router> 
	      <AppContext.Provider value={{data:data, dispatch:dispatch}}>
          <Switch>
  	        <Route exact path="/auth" component = {Auth} />
  	        <Route exact path="/admin" component = {Admin} />
  	        <Route exact path="/:id" component = {Home} />
          </Switch>
	      </AppContext.Provider>
      </Router> 
      <ToastContainer />
    </div>
  );
}

export default App;
