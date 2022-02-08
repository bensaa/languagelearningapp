import React from 'react'  
class Wordlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {words: props.words,infieldvalue: ''};
		this.useNewWordsFromTextArea = this.useNewWordsFromTextArea.bind(this);
		this.addNewWordsToList = this.addNewWordsToList.bind(this);
	}
	wordlistsubmit(event){
		event.preventDefault();
		console.log('wordlistsubmit');
	}
	useNewWordsFromTextArea(){
		let _words = document.getElementById("newwordsarea").value.trim().split(/\s+/);
		let newwords = [];
		console.log(_words.length);
		for(let i = 0;i < _words.length;i=i+2){
			newwords.push({english: _words[i], finnish: _words[i+1]});
		}
		this.props.useNewWords({words: newwords});
	}
	addNewWordsToList(){
		let _words = document.getElementById("newwordsarea").value.trim().split(/\s+/);
		let newwords = [];
		for(let i = 0;i < this.state.words.length;i++){
			newwords.push({english: this.state.words[i].english, finnish: this.state.words[i].finnish});
		}
		for(let i = 0;i < _words.length;i=i+2){
			newwords.push({english: _words[i], finnish: _words[i+1]});
		}
		this.props.changeRootState({words: newwords});
		this.props.changeParentState({words: newwords});
	}
    render() {
        return (
			<div style={this.props.style}>
				<p>Add your own words here.</p>
				<textarea id="newwordsarea" rows="5" cols="60" 
						  style={{width:'300px'}}
						  placeholder="englishword finnishword&#10;englishword finnishword&#10;...">
				</textarea>
				<br/>
				<div style={{width:'47%',float:'left'}}>
					<button style={{float:'right'}} onClick={this.useNewWordsFromTextArea}>Use these words</button>
				</div>
				<div style={{justifyContent:'center',width:'6%',float:'left'}}>
					<p style={{margin:'6px'}}>OR</p>
				</div>
				<div style={{width:'47%',float:'left'}}>
					<button style={{float:'left'}} onClick={this.addNewWordsToList}>Add these words</button>
				</div>
			</div>
        )
    }  
}  
export default Wordlist

