//get now time string
function GetTimeStr(){
	function p(s) {
		return s < 10 ? '0' + s: s;
	}
	var myDate = new Date();
	var year=myDate.getFullYear();
	var month=myDate.getMonth()+1;
	var date=myDate.getDate(); 
	var h=myDate.getHours();  
	var m=myDate.getMinutes();
	var s=myDate.getSeconds();  
	var timeStr=year+p(month)+p(date)+p(h)+p(m)+p(s);
	return timeStr;
}