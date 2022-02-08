import { Outlet } from 'react-router-dom'
import React from 'react'  
import { Route, Routes,Router, BrowserRouter, Link} from 'react-router-dom';
import Wordlist from "./Wordlist";
import Playgame from "./Playgame";
import Editwords from "./Editwords";

class Languagelearninggame extends React.Component {
		constructor(props) {
				super();
				this.state = {words:[],
											count:0,
											wordsquessedright:[],
											rightanswersenough:2,
											windex:0,
											wordsleft:0,
											listnames:[]};
				this.updateParentState = this.updateParentState.bind(this);
				this.updateWords = this.updateWords.bind(this);
		}

		componentDidMount() {
				if(window.location.href.match('playgame') && this.state.words.length < 1){
						fetch('http://localhost:3001/list?list=random1')
								.then(response => {
										return response.text();
								})
								.then(data => {
										let _obj = {words:JSON.parse(data)};
										this.setState(_obj);
										this.child.setState( _obj);
										this.child.setState({wordsleft: JSON.parse(data).length});
										let tmparr = [];
										this.state.words.forEach(() =>{
												tmparr.push(this.state.rightanswersenough);
										});
										this.setState({wordsquessedright: tmparr});
										this.setState({wordsleft: this.state.words.length});
										this.child.setState({wordsquessedright: tmparr});
										this.forceUpdate();
								}).catch((error) => {
										console.log(error);
										fetch('http://192.168.8.100:3001/list?list=random1')
												.then(response => {
														return response.text();
												})
												.then(data => {
														let _obj = {words:JSON.parse(data)};
														this.setState(_obj);
														this.child.setState( _obj);
														this.child.setState({wordsleft: JSON.parse(data).length});
														let tmparr = [];
														this.state.words.forEach(() => {
																tmparr.push(this.state.rightanswersenough);
														});
														this.setState({wordsquessedright: tmparr});
														this.setState({wordsleft: this.state.words.length});
														this.child.setState({wordsquessedright: tmparr});
														this.forceUpdate();
												})});}
				
				if(window.location.href.match('wordlist') && this.state.words.length < 1){
						fetch('http://localhost:3001/')
								.then(response => {
										return response.text();
								})
								.then(data => {
										let _obj = {words:JSON.parse(data)};
										this.setState(_obj);
										this.childwordlist.setState( _obj);
										this.childwordlist.setState({wordsleft: JSON.parse(data).length});
										let tmparr = [];
										this.state.words.forEach(() =>{
												tmparr.push(this.state.rightanswersenough);
										});
										this.setState({wordsquessedright: tmparr});
										this.setState({wordsleft: this.state.words.length});
										this.childwordlist.setState({wordsquessedright: tmparr});
										this.forceUpdate();
								}).catch((error) => {
										console.log(error);
										fetch('http://192.168.8.100:3001/')
												.then(response => {
														return response.text();
												})
												.then(data => {
														let _obj = {words:JSON.parse(data)};
														this.setState(_obj);
														this.childwordlist.setState( _obj);
														this.childwordlist.setState({wordsleft: JSON.parse(data).length});
														let tmparr = [];
														this.state.words.forEach(() => {
																tmparr.push(this.state.rightanswersenough);
														});
														this.setState({wordsquessedright: tmparr});
														this.setState({wordsleft: this.state.words.length});
														this.childwordlist.setState({wordsquessedright: tmparr});
														this.forceUpdate();
												})});}
		}
		updateParentState(_state){
				this.setState(_state);
		}
		updateWords(_words){
				this.setState(_words);
				let tmparr = [];
				_words.words.forEach(() =>{
						tmparr.push(this.state.rightanswersenough);
				});
				this.setState({wordsquessedright: tmparr});
				this.setState({windex:0});
				this.setState({wordsleft:_words.words.length});
		}

		render() {
				return (
						<div id="wordgame">
								<div id="wordgamemenu" style={{marginBottom: '40px'}}>
										<Link to="/languagelearninggame/playgame"><button style={{margin:'20px',width:'200px'}}>Play game</button></Link>
										<Link to="/languagelearninggame/wordlist"><button style={{margin:'20px',width:'200px'}}>Show words</button></Link>
								</div>
								<Routes>
										<Route exact path='playgame'
													 element={<Playgame ref={ref => (this.child = ref)}
																							updateWords={this.updateWords}
																							updateParentState={this.updateParentState}
																							id="playgame"
																							wordsquessedright={this.state.wordsquessedright}
																							words={this.state.words}
																							windex={this.state.windex}
																							wordsleft={this.state.wordsleft}
																		/>}>
										</Route>
										
										<Route exact path='wordlist'
													 element={<Wordlist ref={ref => (this.childwordlist = ref)}
																							addWords={(_words)=>{let words= _words.words + this.state.words;}}
																							id="wordlist" words={this.state.words}
																							listnames={this.state.listnames}
																							updateWords={this.updateWords}
																							useNewWords={(_words) => {this.setState(_words)}}
																							changeParentState={(_state) => {this.setState(_state)}}/>}>
										</Route>
								</Routes>
						</div>
				)  
		}  
}  
export default Languagelearninggame



// this.state = {words: [
// 	{ finnish: 'auto', english: 'car'},
// 	{ finnish: 'talo', english: 'house'},
// 	{ finnish: 'hevonen', english: 'horse'},
// 	{ finnish: 'kissa', english: 'cat'}]};


