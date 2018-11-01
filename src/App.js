import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginContainer from './components/containers/LoginContainer';
import HomeContainer from './components/containers/HomeContainer'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGhost } from '@fortawesome/free-solid-svg-icons'

library.add(faGhost)


class App extends Component {
	render() {
		return (
			<Router>
				<div className="container-fluid">
					<Switch>
						<Route exact path ="/" component={LoginContainer}/>
						<Route path ="/login" component={LoginContainer}/>
						<Route path ="/home" component={HomeContainer}/>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
