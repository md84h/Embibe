import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';

export default class SortBar extends Component {
    render(){
        const {activeSort,sortType} = this.props;
        return(
            <div className="sortBar">
                <p>Sort By</p>
                <div className="col">
                    <div className={activeSort == "name" ? "main active" : "main"} onClick={e=>{this.props.sortItem('name',!sortType["name"])}}>
                        Name <FontIcon className="material-icons" color={activeSort == "name" ? '#1975d2' : '#8d9aa4'} style={{fontSize:20,verticalAlign:'middle',marginleft:5}}>{sortType["name"] == false ? "arrow_drop_up" : "arrow_drop_down"}</FontIcon>
                    </div>
                </div>
                <div className="col" style={{marginLeft:10}}>
                    <div className={activeSort == "totalMarks" ? "main active" : "main"} onClick={e=>{this.props.sortItem('totalMarks',!sortType["totalMarks"])}}>
                        Total Marks <FontIcon className="material-icons" color={activeSort == "totalMarks" ? '#1975d2' : '#8d9aa4'} style={{fontSize:20,verticalAlign:'middle',marginleft:5}}>{sortType["totalMarks"] == false ? "arrow_drop_up" : "arrow_drop_down"}</FontIcon>
                    </div>
                </div>
            </div>
        )
    }
}
