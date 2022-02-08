import React from 'react'  
class Playgame extends React.Component {
	constructor(props) {
		super();
		this.state = { currentword:'test',
					   lastword:'',
					   answersucceed: true,
					   infieldvalue: '',
					   windex: props.windex,
					   stateofgame: 'answering',
					   rightanswer: '',
					   rightanswersenough: 2,
					   words: props.words,
					   modeansweringfor: 'finnish',
					   count:0,
					   wordsleft: props.wordsleft,
					   wordsquessedright: props.wordsquessedright};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.reduceRightAnswerCount = this.reduceRightAnswerCount.bind(this);
		this.increaseRightAnswerCount = this.increaseRightAnswerCount.bind(this);
		this.resetWords = this.resetWords.bind(this);
		this.toggleLanguage = this.toggleLanguage.bind(this);
	}
	setName (_value) {
		this.setState({infieldvalue: _value});
	}
	countwordsleft(){
		let _wordsleft = 0;
		for(let i = 0;i < this.state.wordsquessedright.length;i++){
			if(this.state.wordsquessedright[i] > 0){_wordsleft++;}
		}
		this.setState({wordsleft: _wordsleft});
		this.props.updateParentState({wordsleft: _wordsleft});
	}
	reduceOneValueFromWordsQuessedRight(index){
		let myArray = this.state.wordsquessedright;
		myArray[index] = myArray[index] -1;
		if(myArray[index] < 0)
			myArray[index] = 0;
		this.setState({wordsquessedright:myArray});
		this.props.updateParentState({wordsquessedright:myArray});
		this.countwordsleft();
	}
	rollWindexToNextWord(){
		this.state.windex = Math.floor(Math.random()*this.state.wordsquessedright.length);
		for(let i = 0; i < this.state.wordsquessedright.length;i++){
			this.state.windex++;
			if(this.state.windex == this.state.words.length){
				this.state.windex = 0;
			};
			if(this.state.wordsquessedright[this.state.windex] != 0
			   && this.state.wordsquessedright[this.state.windex] != null){
				break;
			}
		}
		this.props.updateParentState({windex:this.state.windex});
		if(this.state.wordsquessedright[this.state.windex] == 0 ||
		   this.state.wordsquessedright[this.state.windex] == null){
			this.reset();
			return false;
		}
		return true;
	}
	handleSubmit (event){
		event.preventDefault();
		if(this.state.stateofgame == 'gameover'){
			this.resetWords();
			this.setState({stateofgame: 'answering'});
			this.setState({rightanswer: ""});
			this.setState({windex: 0});
			this.props.updateParentState({windex:this.state.windex});
			return;
		}
		if(this.state.stateofgame == 'answering'){
			this.setState({lastword: this.state.infieldvalue});
			if(this.state.modeansweringfor == 'finnish'){
				this.setState({rightanswer: this.state.words[this.state.windex].finnish});
				if(this.state.infieldvalue == this.state.words[this.state.windex].finnish){
					this.reduceOneValueFromWordsQuessedRight(this.state.windex);
					this.setState({answersucceed: true});
					this.setState({infieldvalue: ''});
					
					if(!this.rollWindexToNextWord()){return;};
					
					this.setState({stateofgame: 'answering'});
					this.setState({rightanswer: ''});
				}
				else{
					this.setState({answersucceed: false});
					this.setState({stateofgame: 'nextword'});
				}
			}
			if(this.state.modeansweringfor == 'english'){
				this.setState({rightanswer: this.state.words[this.state.windex].english});
				if(this.state.infieldvalue == this.state.words[this.state.windex].english){
					this.reduceOneValueFromWordsQuessedRight(this.state.windex);
					this.setState({answersucceed: true});
					this.setState({infieldvalue: ''});

					if(!this.rollWindexToNextWord()){return;};
					
					this.setState({stateofgame: 'answering'});
					this.setState({rightanswer: ''});
				}
				else{
					this.setState({answersucceed: false});
					this.setState({stateofgame: 'nextword'});
				}
			}
		}
		else{
			this.setState({infieldvalue: ''});
			// console.log('wordsquessedright.length ' + this.state.wordsquessedright.length);

			for(let i = 0; i < this.state.wordsquessedright.length;i++){
				if(!this.rollWindexToNextWord()){return;};

				if(this.state.wordsquessedright[this.state.windex] != 0){
					break;
				}
			}
			if(this.state.wordsquessedright[this.state.windex] == 0){
				this.reset();
				return;
			}
			this.setState({stateofgame: 'answering'});
			this.setState({rightanswer: ''});
			this.setState({answersucceed: true});
		}
	}
	reset(){
		this.setState({rightanswer:'You have successfully completed all words!'});
		this.setState({stateofgame:'gameover'});
		this.resetWords();
	}
	resetWords(){
		let _tmparr = []
		for(let i = 0;i < this.state.words.length;i++){
			_tmparr.push(this.state.rightanswersenough);
		}
		this.setState({wordsquessedright: _tmparr});
		this.props.updateParentState({wordsquessedright:_tmparr});
		this.countwordsleft();
	}
	reduceRightAnswerCount(event){
		let inputvalue = document.getElementById("rightanswercount").value;
		if(!isNaN(inputvalue)){
			inputvalue--;
			if(inputvalue < 0){
				inputvalue = 0;}
			this.state.rightanswersenough = inputvalue;
			this.props.updateParentState({rightanswersenough:inputvalue});
			document.getElementById("rightanswercount").value = inputvalue;
			this.updatewordsquessedright();
		}
	}
	increaseRightAnswerCount(event){
		let inputvalue = document.getElementById("rightanswercount").value;
		if(!isNaN(inputvalue)){
			inputvalue++;
			if(inputvalue < 0){
				inputvalue = 0;}
			this.state.rightanswersenough = inputvalue;
			this.props.updateParentState({rightanswersenough:inputvalue});
			document.getElementById("rightanswercount").value = inputvalue;
			this.updatewordsquessedright();
		}
	}
	updatewordsquessedright(){
		for(let i = 0;i < this.state.wordsquessedright.length;i++){
			if(this.state.wordsquessedright[i] != 0){
				this.state.wordsquessedright[i] = this.state.rightanswersenough;
			}
		}
		this.props.updateParentState({wordsquessedright:this.state.wordsquessedright});
	}
	toggleLanguage(event){
		this.setState({modeansweringfor: this.state.modeansweringfor == 'finnish'? 'english' : 'finnish'});
	}
    render() {
		var questionarea = <p>There is no words to ask.</p>
		if(this.state.words.length > 0){
			questionarea = 												<div>
																			<button onClick={this.toggleLanguage}>english&lt;&gt;finnish</button>
																			<p id="wordgamewordone">{this.state.modeansweringfor == 'finnish'?
																									 this.state.words[this.state.windex].english:
																									 this.state.words[this.state.windex].finnish}</p>
																			<form onSubmit={this.handleSubmit}>
																				<input style={{color: this.state.answersucceed? 'black':'red'}}
																					   type="text" 
																					   value={this.state.infieldvalue}
																					   onChange={(e) => this.setName(e.target.value)}/>
																				<button type="submit">Answer</button>
																			</form>
																			<div>
																				<p style={{color: 'green', fontSize: '32px'}}>{this.state.rightanswer}</p>
																			</div>
																			<button onClick={this.resetWords}>Reset words</button>
																		</div>
		}
		return (
			<div>
				<div style={{float:'left',width: '400px', paddingBottom: '50px'}}>
					{questionarea}
				</div>
				
				<div style={{marginTop:'15px',paddingBottom:'15px',height:'80px',maxHeight:'40px',maxWidth:'400px',float:'left'}}>
					<div style={{width:"200px",height:'40px',float:'left'}}>
						<p style={{marginTop: '0px'}}>remove word after<br/> right answers</p>
					</div>
					<div style={{width:"200px",float:'left',
								 height:'100%',
								 align:'center'}}>
						<button onClick={this.reduceRightAnswerCount} >-</button>
						<input id="rightanswercount"
							   style={{width:'50px',textAlign:'center'}}
							   defaultValue={this.state.rightanswersenough}
							   placeholder={this.state.rightanswersenough > 0?
											this.state.rightanswersenough:'not used'}></input>
						<button onClick={this.increaseRightAnswerCount}>+</button>
					</div>
					
					<div style={{float: 'left', width:'100%', marginTop: '15px', align:'center'}}>Words left: {this.state.wordsleft}</div>
				</div>
				
			</div>
		)  
    }  
}  
export default Playgame
