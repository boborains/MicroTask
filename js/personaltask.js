// JavaScript Document
 window.onload=function(){
    var totalCount
    var pageNo=1
    var totalPage
    var pageSize=20
    loadlist(pageNo,pageSize)
 }
 function loadlist(pageNo,pageSize){
    $.ajax({
	   url:"http://m.antzb.com/web/personaltask/items.do?pageNo="+pageNo+"&pageSize="+pageSize,
	   success:function(data){
	      var data = eval('(' + data + ')');

	      var pindarr=new Array()

	      var mainbox=document.getElementById("rightbody")
	      var listbox=document.createElement("div")
	      listbox.className="box"
	      listbox.id="list"
	      mainbox.appendChild(listbox)
	      if(data.data.result.length>0){
	      var totalCount=data.data.totalCount
          var totalPage=data.data.totalPage
	      var listbigbox=document.createElement("div")
	      document.getElementById("list").appendChild(listbigbox)

	      var listtitle=document.createElement("div")
	      listtitle.innerHTML="<table width='100%' border='0' cellspacing='1' cellpadding='0' class='listtable' id='listtable'><tr><td class='t1' width='40%'>用户名</td><td class='t1'>提交时间</td><td class='t1'>审核状态</td><td class='t1'>审核意见</td><td class='t1'>操作</td></tr></table>"
          listbigbox.appendChild(listtitle)
          var curlist=document.getElementById("listtable");
		     for(i=0;i<data.data.result.length;i++){
			    var objul=document.createElement("tr");
				objul.id=i;
				objul.className='datatr1'
				pindarr[i]=data.data.result[i].pind
				objul.onmouseover=function(){
                    this.className="tractive"
                }
                objul.onmouseover=function(){
                    this.className="tractive"
                }
                objul.onmouseout=function(){
                    this.className="trhover"
                }
                objul.onclick=function(){
                   persononetask(pindarr[this.id],pageNo,pageSize)
                }
				pindarr[i]=data.data.result[i].pind
				var checkStatus
				var btn
				switch(data.data.result[i].checkStatus){
					case 0://0：待完成，
						checkStatus="待完成"
						btn="<input type=button value=查看 class=examinebtn id="+i+" onclick=alert("+pindarr[i]+")>"
						break;
					case 1://1：待审核
						checkStatus="待审核"
						btn="<input type=button value=审核 class=examinebtn>"
						break;
					case 2://2：审核通过
						checkStatus="审核通过"
						btn="<input type=button value=查看 class=examinebtn id="+i+" onclick=alert("+pindarr[i]+")>"
						break;
					case 3://3：未通过
						checkStatus="未通过"
						btn="<input type=button value=审核 class=examinebtn>"
						break;
				}

				objul.innerHTML="<td class='datatd'>"+data.data.result[i].userName+"</td><td class='datatd'>"+data.data.result[i].submit+"</td><td class='datatd'>"+checkStatus+"</td><td class='datatd'>"+data.data.result[i].statusDesc+"</td><td class='datatd'>"+btn+"</td>"
				curlist.appendChild(objul);
			 }
			 setpage(pageNo,pageSize,totalCount,totalPage)
	      }else{
             var notips=document.createElement("div")
             notips.innerHTML="还没有任务被完成！";
             listbox.appendChild(notips);
	      }
	   }
	})
 }
function setpage(pageNo,pageSize,totalCount,totalPage){
    curnum=pageNo;
    var pageobj=document.createElement("div");
    pageobj.innerHTML="<li id='upbtn' class='pagemouseout'>上一页</li><li id='downbtn' class='pagemouseout'>下一页</li><li id='txt'>第"+pageNo+"页/共"+totalPage+"页，共计"+totalCount+"条</li>";
    pageobj.className="page";

    document.getElementById("list").appendChild(pageobj);

    if (curnum==1){
       document.getElementById("upbtn").style.display="none"
       document.getElementById("downbtn").style.display="block"
    }else if(curnum==parseInt(totalPage)){
       document.getElementById("upbtn").style.display="block"
       document.getElementById("downbtn").style.display="none"
    }else{
       document.getElementById("upbtn").style.display="block"
       document.getElementById("downbtn").style.display="block"
    }
    document.getElementById("upbtn").onclick=function(){
          // alert("upbtn");
        document.getElementById("rightbody").removeChild(document.getElementById("list"));
        curnum=pageNo-1;
        loadlist(curnum,pageSize);
    }
    document.getElementById("downbtn").onclick=function(){
           //alert("downbtn");
        document.getElementById("rightbody").removeChild(document.getElementById("list"));
        curnum=pageNo+1
        loadlist(curnum,pageSize);
    }
    document.getElementById("upbtn").onmouseover=function(){
        this.className="pagemouseover"
    }
    document.getElementById("upbtn").onmouseout=function(){
        this.className="pagemouseout"
    }
    document.getElementById("downbtn").onmouseover=function(){
        this.className="pagemouseover"
    }
    document.getElementById("downbtn").onmouseout=function(){
        this.className="pagemouseout"
    }
 }
 function persononetask(id,pageNo,pageSize){
    document.getElementById("list").style.display="none"
    $.ajax({
       url:"http://m.antzb.com/web/personaltask/detail.do?id="+id,
       success:function(data){
           var data2 = eval('(' + data + ')');
          // alert(data2.code)
           var taskobj=document.createElement("div")
           taskobj.className="box"
           document.getElementById("rightbody").appendChild(taskobj)
           var taskdesc=document.createElement("div")
           taskdesc.id="taskdesc"
           taskobj.appendChild(taskdesc)
           var targetpagetitle=document.createElement("div")
    	   targetpagetitle.innerHTML="<ul class='ztitle'>任务详情</ul><ul>任务名称："+data2.data.taskTemplateDetail.taskTitle+data2.data.personalTaskDetail.pind+"</ul><ul>任务描述："+data2.data.taskTemplateDetail.taskDesc+"</ul><ul><span>已做任务："+data2.data.taskTemplateDetail.hasDoneCount+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>任务总数："+data2.data.taskTemplateDetail.taskCount+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>任务价格："+data2.data.taskTemplateDetail.taskFee+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>价格类型："+data2.data.taskTemplateDetail.priceType+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>任务状态描述："+data2.data.taskTemplateDetail.taskStatusDesc+"</span></ul><ul>任务内容：</ul>"
    	   taskdesc.appendChild(targetpagetitle)
    	   var personalanswer=new Array();
    	   //alert("共"+data2.data.taskTemplateDetail.taskTemplate.content.length+"题")
    	   for(j=0;j<data2.data.taskTemplateDetail.taskTemplate.content.length;j++){
              var tasknr=document.createElement("ul")
              tasknr.innerHTML="Q"+data2.data.taskTemplateDetail.taskTemplate.content[j].index+"："+data2.data.taskTemplateDetail.taskTemplate.content[j].question
              personalanswer[j]=data2.data.personalTaskDetail.taskContent[j+1]

              taskdesc.appendChild(tasknr)
              switch(data2.data.taskTemplateDetail.taskTemplate.content[j].type){

                 case "img":
                 	var tasknr=document.createElement("ul")
					tasknr.innerHTML="<img src='"+personalanswer[j]+"' width='200'>"
					taskdesc.appendChild(tasknr)

                 break;

                 case "radio":
                 //txt1:获取问题详情
                 var txt1=data2.data.taskTemplateDetail.taskTemplate.content
                 for (k=0;k<txt1[j].value.length;k++){
                    var tasknr=document.createElement("ul")
                   //alert("用户选择了"+personalanswer[j])
                    //alert("选项"+txt1[j].value[k])
                    //alert(txt1[j].value[k]==personalanswer[j])
                    if(txt1[j].value[k]==personalanswer[j]){
                    tasknr.innerHTML="<input type='radio' name=Q"+txt1[j]+"value='' checked='checked'>&nbsp;"+txt1[j].value[k]
                    }else{
                    tasknr.innerHTML="<input type='radio' name=Q"+txt1[j]+"value=''>&nbsp;"+txt1[j].value[k]
                    }
                    taskdesc.appendChild(tasknr)
                 }
                 break;
                 case "geometry":

                 break;

              }
    	   }
    	   var targetpagetitle=document.createElement("div");
           targetpagetitle.innerHTML="<ul class='ztitle'>审核意见：</ul><ul><textarea name='statusDesc' id='statusDesc' cols='85' rows='5'></textarea></u><ul><input type='submit' value='保存' id='savebtn'></ul>";
           taskdesc.appendChild(targetpagetitle);


       }
    })
 }