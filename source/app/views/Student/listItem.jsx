import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';

export default class Item extends Component{
    render(){
        const {data} = this.props;
        return(
            <div className="studentRow">
                <Link to={'/'+data.rollNo}>
                    <div className="rowCommon" style={{fontSize:20,fontWeight: 500}}>
                        <FontIcon className="material-icons icons" color='#8d9aa4'>person</FontIcon>
                        {data.name}
                    </div>
                    <div className="rowCommon">
                        <span className="light">Roll No - </span>{data.rollNo}
                    </div>
                    <div className="rowCommon">
                        <span className="light">Total Marks - </span>{data.totalMarks}
                    </div>
                </Link>
            </div>
        )
    }
}
