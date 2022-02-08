import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import DefaultPath from "./DefaultPath";
import Languagelearninggame from "./Languagelearninggame";
import Playgame from "./Playgame";
import { Route, Routes,Router, BrowserRouter} from 'react-router-dom';

function App() {

	const headers=[
		{header: 'main',link: '/', items: []},
		{header: 'wordgame',link: '/languagelearninggame/playgame', items: []}];

	const topbarbuttons = () => {
		var buttonlist = [];

		for(let head of headers){
			buttonlist.push(
					<div className='topbarbutton'>
					<a href={head.link}><button className="dropbutton">{head.header}</button></a>
					</div>);
		}
		return buttonlist;
	}

	return (
			<BrowserRouter>
			<div className="App">

			<div className='topbar'>{topbarbuttons()}</div>
			<div className='contentcenteringdiv'>
			<div className='contentdiv'>
			<Routes>
			<Route exact path="/" element={<DefaultPath />}></Route>
 			<Route exact path="/languagelearninggame/*" element={<Languagelearninggame />}></Route>
			<Route path="*" element={<DefaultPath />}></Route>
			</Routes>
			</div>
			</div>
			</div>
			</BrowserRouter>
	);
}

export default App;


