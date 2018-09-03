import { GET_STUDENT_DATA, GET_STUDENT, DO_APPLICATION } from '../lib/constant';
import { processData, searchData, sortData, getStudent } from '../lib/utils';

const initialState = {list:{},visibleList:{},studentDetails:{}};

export default function(state = initialState , action ) {
	let list  = JSON.parse(JSON.stringify(state.list));
	switch(action.type){
		case GET_STUDENT_DATA :
			let data = action.payload;
			processData(data);
			return {...state, list : data, visibleList : data};
		case GET_STUDENT :
			return {...state, studentDetails:getStudent(action.rollNo,action.payload)};
		case DO_APPLICATION :
			let sortStudent = action.payload.type ? sortData(list,action.payload.type,action.payload.asc) : list;
			let searchStudent = action.payload.autoVal ? searchData(sortStudent,action.payload.autoVal) : sortStudent;
			return {...state, visibleList : searchStudent};
        default :
		     return state;
    }
}
