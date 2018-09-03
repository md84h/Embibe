import Api from '../api';
import { GET_STUDENT_DATA, GET_STUDENT, GET_STUDENT_DATA_URL, DO_APPLICATION} from '../lib/constant';

export function getStudentList(){
    const request = Api.get(GET_STUDENT_DATA_URL);
    return (dispatch) => {
        request.then(({data}) => {
            dispatch({type:GET_STUDENT_DATA,payload:data})
        })
    };
}
export function doApplication(params){
    return (dispatch) => {
        dispatch({type:DO_APPLICATION,payload:params})
    };
}
export function getStudent(rollNo){
    const request = Api.get(GET_STUDENT_DATA_URL);
    return (dispatch) => {
        request.then(({data}) => {
            dispatch({type:GET_STUDENT,payload:data,rollNo})
        })
    };
}
