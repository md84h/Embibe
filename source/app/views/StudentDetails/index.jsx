import React, { Component } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import { getStudent } from '../../actions/student';
import Chart from './chart';

class StudentDetails extends Component {
    constructor(){
        super();
        this.state = {
            details : null
        }
    }
    componentDidMount(){
        let rollNo = this.props.match.params.rollNo;
        let {list, getStudent} = this.props;
        if(Object.keys(list).length){
            this.setState({details : list[rollNo]})
        } else{
            getStudent(rollNo);
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({details : nextProps.details});
    }
    render() {
        const {details} = this.state;
        return (
            <div className="container">
                {
                    details != null ?
                        <div>
                            {
                                details ?
                                    <div className="studentDetails">
                                        <p>Name : {details.name}</p>
                                        <p>Roll No : {details.rollNo}</p>
                                        <p>Total Marks : {details.totalMarks}</p>
                                        <p>Marks Graph</p>
                                        <Chart marks={details.marks} />
                                    </div>
                                :
                                    <p className="no-result">Studnet Not found with given roll number!</p>
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
        details : state.student.studentDetails
    };
}
export default connect(mapStateToProps, {getStudent})(StudentDetails);
