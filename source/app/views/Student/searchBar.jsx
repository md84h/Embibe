import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

export default class SearchBar extends Component {
    constructor(){
        super();
        this.state = {
            autoCompleteValue : ''
        }
        this.throttleInput = throttle(this.throttleInput.bind(this),300);
    }
    removeAutoCompleteValue = () =>{
        this.props.autoComplete('');
        this.setState({autoCompleteValue:''});
    }
    autoComplete = (e) => {
        this.setState({autoCompleteValue:e.target.value});
        this.throttleInput(e.target.value);
    }
    throttleInput = (val) => this.props.autoComplete(val);
    render(){
        const {autoCompleteValue} = this.state;
        return(
            <div className="searchBar">
                <input type="text" value={autoCompleteValue} onChange={this.autoComplete.bind(this)} placeholder="Search Student" />
                {
                    autoCompleteValue ?
                        <IconButton tooltip="Clear Search" tooltipPosition="top-center" style={{padding:0,display:'inline-block',verticalAlign:'bottom',marginBottom:10,width:30,height:20}} onTouchTap={e=>{e.preventDefault();this.removeAutoCompleteValue()}}>
                            <FontIcon className="material-icons">highlight_off</FontIcon>
                        </IconButton>
                    : null
                }
            </div>
        )
    }
}
