export function processData(data){
	for(let i in data){
		data[i].totalMarks = Object.values(data[i].marks).reduce((a,b)=>a+b,0);
	}
}
export function getStudent(rollNo,data){
	if(data[rollNo]){
		data[rollNo].totalMarks = Object.values(data[rollNo].marks).reduce((a,b)=>a+b,0);
		return data[rollNo];
	} else{
		return undefined;
	}
}

export function searchData(list,val){
	list = Object.values(list);
	return list.filter(data => {return data.name.toLowerCase().indexOf(val.toLowerCase()) == 0;});
}

export function sortData(data,type,asc){
	data = Object.values(data);
	return data.sort((a, b) =>(sortPairData(asc,a[type],b[type])));
}

function sortPairData(asc,c,d){
	return asc ? ((c > d) ? 1 : ((c < d) ? -1 : 0)) : ((d > c) ? 1 : ((d < c) ? -1 : 0));
}
