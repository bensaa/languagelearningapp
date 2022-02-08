import React from 'react'
import Editwords from "./Editwords";

class Wordlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {words: props.words,
					  selectedword:'0',
					  selectedlist:'random1',
					  width:this.props.parentwidth,
					  listnames:this.props.listnames,
					  otherwordlist:[]
					 };
		this.selectWord = this.selectWord.bind(this);
		this.selectList= this.selectList.bind(this);
		this.deleteWord = this.deleteWord.bind(this);
	}
	selectWord(event){
		if(this.state.selectedword){
			document.getElementById(this.state.selectedword).style.backgroundColor = 'white';
		}
		this.setState({selectedword: event.target.id});
		document.getElementById(event.target.id).style.backgroundColor = 'red';
	}
	deleteWord(){
		this.state.words.splice(this.state.selectedword, 1);
		this.props.updateWords({words: this.state.words});
	}
	componentDidMount(){
		fetch('http://localhost:3001/listnames')
			.then(response => {
				return response.text();
			})
			.then(data => {
				let _obj = {listnames:JSON.parse(data)};

				this.setState(_obj);
			}).catch((error) => {
				fetch('http://192.168.8.100:3001/listnames')
					.then(response => {
						return response.text();
					})
					.then(data => {
						let _obj = {listnames:JSON.parse(data)};
						this.setState(_obj);
					})});
		if(this.state.words.lenght > 0){
			document.getElementById(this.state.selectedword).style.backgroundColor = 'red';}
		fetch('http://localhost:3001/list?list='+this.state.selectedlist)
			.then(response => {return response.text();})
			.then(data => {let _obj = {otherwordlist:JSON.parse(data)};this.setState(_obj);})
			.catch((error) => {
				fetch('http://192.168.8.100:3001/list?list='+this.state.selectedlist)
					.then(response => {return response.text();})
					.then(data => {let _obj = {otherwordlist:JSON.parse(data)};this.setState(_obj);
								  })}
				  );
	}
	selectList(event){
		if(this.state.selectedlist){
			document.getElementById(this.state.selectedlist).style.backgroundColor = 'white';
		}
		this.setState({selectedlist: event.target.id});
		document.getElementById(event.target.id).style.backgroundColor = 'red';
		fetch('http://localhost:3001/list?list='+event.target.id)
			.then(response => {return response.text();})
			.then(data => {this.setState({otherwordlist:JSON.parse(data)});})
			.catch((error) => {
				fetch('http://192.168.8.100:3001/list?list='+this.state.selectedlist)
					.then(response => {return response.text();})
					.then(data => {let _obj = {otherwordlist:JSON.parse(data)};this.setState(_obj);})}
				  );
	}
	
	render() {
		var _wordlist = [];
		let i = 0;
		for(let word of this.state.words){
			_wordlist.push(<p id={i} key={i}
							  style={{float:"left",width:'24%',minWidth:'200px',
									  borderStyle:"solid",borderWidth:"2px",
									  whiteSpace:'pre',color:'black',
									  backgroundColor:i==0?'red':'white',
									  margin:'0px',height:'25px'}}
							  onClick={this.selectWord} >{word.english + " "+ ' '+word.finnish}</p>)
			i++;
		}
		var celltableheight = Math.floor(this.state.words.length / 4) * 25;
		var _listnames = [];
		let i2 = 0;
		for(let listname of this.state.listnames){
			_listnames.push(<p id={listname.list} key={'list'+i2}
							   style={{float:"left",width:'100%',
									   borderStyle:"solid",borderWidth:"2px",
									   whiteSpace:'pre',color:'black',
									   backgroundColor:i2==0?'red':'white',
									   margin:'0px',height:'25px'}}
							   onClick={this.selectList}>{listname.list}</p>)
			i2++;
		}
		var wordspreview = [];
		let i3 = 0;
		for(let _word of this.state.otherwordlist){
			wordspreview.push(<p id={i3} key={i3}
								 style={{float:"left",paddingLeft:'6px',paddingRight:'6px',
										 borderStyle:"solid",borderWidth:"2px",
										 whiteSpace:'pre',color:'black',
										 backgroundColor:'white',
										 margin:'0px',height:'25px'}}>{_word.english} {_word.finnish}</p>)
			i3++;
		}

		
		return (
			<div>
				<div style={{color: "red",width:'50%',float:'left'}}>
					<div style={{paddingBottom:'50px',width:'100%',height:celltableheight+'px'}}>
						<p style={{fontSize:'20px',marginTop:'0px',color:'black'}}>Current Words</p>
						{_wordlist}
					</div>
					<div style={{width:'100%',justifyContent: 'center',float:'left'}}>
						<button style={{margin:'20px'}} onClick={this.deleteWord} >Remove Word</button>
					</div>
				</div>
				<div style={{width:'50%',float:'left'}}>
					<div style={{marginTop:'0px',justifyContent:'center',
								 float:'left',width:'100%',minWidth:'350px'}}>
						<Editwords id="editwords" words={this.state.words}
								   changeRootState={(_state) => {this.props.changeParentState(_state);}}
								   changeParentState={(_state) => {this.setState(_state);}}
								   updateWords={(_words) => {this.setState(_words)}}
								   useNewWords={(_words)=>{this.setState(_words);
														   this.props.useNewWords(_words);
														   this.props.changeParentState({windex: 0});}}
								   addWords={(_words)=>{let words= _words.words + this.state.words;
													   }}/>
					</div>
					<div style={{justifyContent:'center',paddingTop:'50px',float:'left',
								 width:'100%'}}>
						<p style={{padding:'0px',margin:'0px'}}>Another form for adding words.</p>
						<div style={{float:'left',width:'50%'}}>
							<div style={{float:'right'}}>
								<p style={{marginBottom:'6px'}}>english</p>
								<input id="word1" type="text" ></input>
							</div>
						</div>
						<div style={{float:'left',width:'50%'}}>
							<div style={{float:'left'}}>
								<p style={{marginBottom:'6px'}}>finnish</p>
								<input id="word2" type="text" ></input>
							</div>
						</div>
						<div>
							<button style={{position:'relative',top:'10px'}}>add word</button>
						</div>
					</div>
				</div>
				<div style={{width:'50%',float:'left',border:'solid',padding:'20px',marginTop:'30px'}}>
					<p style={{marginTop:'0px',fontSize:'20px'}}>Choose Another Wordlist</p>
					<div style={{float:'left', width:'25%'}}>
						{_listnames}
					</div>
					<div style={{float:'left',width:'75%'}}>
						<div style={{float:'left',paddingLeft:'20px'}}>
							{wordspreview}
						</div>
					</div>
					<div style={{float:'left',justifyContent:'center',margin:'30px',width:'100%'}}>
						<div style={{float:'left',width:'50%'}}>
							<button onClick={() => {
										this.setState({words:this.state.otherwordlist});
										this.props.updateWords({words: this.state.otherwordlist});}}
									style={{margin:'30px',float:'left'}}>Use this list</button>
						</div>
						<div style={{float:'left',width:'50%'}}>
							<button onClick={() => {
										let newwords = this.state.words;
										for(let _word of this.state.otherwordlist){
											newwords.push(_word);
										}
										this.setState({words:newwords});
										this.props.updateWords({words: newwords});}}
									style={{margin:'30px',float:'left'}}>Add this list to current words</button>
						</div>
					</div>
				</div>
			</div>
		)
	}  
}  
export default Wordlist
