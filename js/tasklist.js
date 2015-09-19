// JavaScript Document
loadone()
function loadlist(){
    $.ajax({
		url:"http://m.antzb.com/web/tasktemplate/items.do",
			//dataType:"jsonp",
		success : function(data){
			var mainbox=document.getElementById("rightbody")
				
			var targetpagetitle=document.createElement("div")
			targetpagetitle.innerHTML="<ul><li class='name'>任务列表</li><li class='pushbtn'><a href='publish.html'>+发布新任务</a></li></ul>"
			targetpagetitle.className="listtitle"
			mainbox.appendChild(targetpagetitle)
				
			var targetbox=document.createElement("div")
			targetbox.innerHTML="<table width='100%' border='0' cellspacing='1' cellpadding='0' class='listtable' id='listtable'><tr><td class='t1'>任务名称</td><td class='t1'>任务状态</td><td class='t1'>剩余任务总数</td><td class='t1'>已完成</td><td class='t1'>已审核</td><td class='t1'>未审核</td></tr></table></ul>"
			targetbox.className="box"
			targetbox.id="list"
			mainbox.appendChild(targetbox)
				
			var data = eval('(' + data + ')');
			countnum=data.data.result.length
			var curlist=document.getElementById("listtable");
				
			for(i=0;i<countnum;i++){
				var objul=document.createElement("tr");
				objul.id=i;
				objul.innerHTML="<td class='t2'>"+data.data.result[i].taskTitle+"</td><td class='t2'>"+data.data.result[i].taskStatusDesc+"</td><td class='t2'>"+data.data.result[i].taskCount+"</td><td class='t2'>"+data.data.result[i].hasDoneCount+"</td><td class='t2'>"+data.data.result[i].hasPassCount+"</td><td class='t2'>"+data.data.result[i].unPassCount+"</td>"
				curlist.appendChild(objul);
			}
				//alert(data.data.result[0].taskInd)
	
			}
		}) 
}
function loadone(id){
	$.ajax({
		url:"http://m.antzb.com/web/tasktemplate/20",
		success:function(data){
			var mainbox=document.getElementById("rightbody")
			
			var targetpagetitle=document.createElement("div")
			targetpagetitle.innerHTML="<ul><li class='name'>任务详情</li><li class='pushbtn'><a href='publish.html'><img src='images/back.png' style='vertical-align:middle'>返回</a></li></ul>"
			targetpagetitle.className="listtitle"
			mainbox.appendChild(targetpagetitle)
			
			var data2 = eval('(' + data + ')');
			//countnum=data2.taskTemplate.length
		    alert(data2.data.taskTemplate.content.length)
			var targetbox=document.createElement("div")
			targetbox.id="taskinfo"
			targetbox.className="box"
			targetbox.innerHTML="<ul class='ztitle'>基本信息</ul><ul>任务名称："+data2.data.taskTitle+"</ul><ul>任务名称：""</ul>"
			mainbox.appendChild(targetbox)
			
			}
		})
	
	}