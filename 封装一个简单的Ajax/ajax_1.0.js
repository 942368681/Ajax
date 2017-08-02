function ajax(json){
	let settings={
		url:'',
		data:{},
		dataType:'string',
		method:'get',
		success:function(){}
	}
	Object.assign(settings,json);
	var ajax=new XMLHttpRequest();
	var arr=[];
	for (var attr in settings.data) {
		arr.push(attr+'='+settings.data[attr]);
	}
	settings.data=arr.join('&');
	if (settings.method.toLowerCase()=='get') {
		ajax.open('get',settings.url+'?'+settings.data);
		ajax.send()
	} else if (settings.method.toLowerCase()=='post') {
		ajax.open('post',settings.url);
		ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		ajax.send(settings.data);
	} else{
		alert('88');
	}
	ajax.onreadystatechange=function (){
		if (ajax.readyState==4) {
			if (ajax.status>=200 && ajax.status<=207 || ajax.status==304) {
				if (settings.dataType=='string') {
					settings.success(ajax.responseText);
				} else if (settings.dataType=='xml') {
					settings.success(ajax.responseXML);
				} else if (settings.dataType=='json') {
					settings.success(JSON.parse(ajax.responseText));
				} else{
					alert('请核对数据格式');
				}
			} else{
				settings.success({state:ajax.readyState,status:ajax.status});
			}
		} 
	};
};
