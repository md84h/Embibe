import React, { Component } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import { getStudentList,doApplication } from '../../actions/student';
import Item from './listItem';
import SearchBar from './searchBar';
import SortBar from './sortBar';

class Student extends Component {
    constructor(){
        super();
        this.state = {
            activeSort : null
        };
        this.autoVal = '';
        this.sortType = {
            'name' : null,
            'totalMarks' : null
        };
    }
    componentDidMount(){
        this.props.getStudentList();
    }
    autoComplete = (autoVal) => {
        const {activeSort} = this.state;
        this.autoVal = autoVal;
        this.props.doApplication({type : activeSort,asc : this.sortType[activeSort],autoVal})
    }
    sortItem = (type,asc) =>{
        this.sortType[type] = asc;
        if(type == "name"){
            this.sortType["totalMarks"] = null;
        } else{
            this.sortType["name"] = null;
        }
        this.props.doApplication({type,asc,autoVal:this.autoVal});
        this.setState({activeSort:type});
    }
    render() {
        let {activeSort} = this.state;
        let {list, visibleList} = this.props;
        list = Object.values(list);
        visibleList = Object.values(visibleList);
        return (
            <div className="container">
                <div className="header">
                    <span>Student</span>
                    <SearchBar autoComplete={this.autoComplete} />
                    <SortBar
                        activeSort={activeSort}
                        sortType={this.sortType}
                        sortItem={this.sortItem} />
                </div>
                {
                    list.length ?
                        <div>

                            {
                                visibleList.length ?
                                    <div style={{padding:20}}>
                                        {
                                            visibleList.map(data => {
                                                return (
                                                    <Item
                                                        key={'student'+data.rollNo}
                                                        data={data} />
                                                )
                                            })
                                        }
                                    </div>
                                :
                                    <p className="no-result">No Student Found!</p>
                            }

                        </div>
                    :
                        <Dialog
                            modal={true}
                            open={true}
                            contentStyle={{width:100}}
                        >
                            <div>
                                <CircularProgress />
                            </div>
                        </Dialog>
                }
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        list : state.student.list,
        visibleList : state.student.visibleList
    };
}
export default connect(mapStateToProps, {getStudentList,doApplication})(Student);
