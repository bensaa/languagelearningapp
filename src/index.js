import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DefaultPath from "./DefaultPath";
import { Route, Router, BrowserRouter} from 'react-router-dom';

const routing =(
	<Router>
		<div>
			<Route path="/" component={DefaultPath}/>
		</div>
	</Router>
);

ReactDOM.render(
	<React.StrictMode>
		<App />
    </React.StrictMode>,
	document.getElementById('root')
);
reportWebVitals();






