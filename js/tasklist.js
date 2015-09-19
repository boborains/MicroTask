// JavaScript Document
 window.onload=function(){
    var totalCount
    var pageNo=1
    var totalPage
    var pageSize=5
    loadtasklist(pageNo,pageSize)
 }
 function loadtasklist(pageNo,pageSize){


    showlist(pageNo,pageSize);
 }
 function showlist(pageNo,pageSize){
    var listbidbox=document.createElement("div")
    listbidbox.id="listbidbox"
    document.getElementById("taskitem").appendChild(listbidbox);

    var titlediv=document.createElement("div");
    titlediv.innerHTML="<ul><li class='name'>任务列表</li><li class='pushbtn'><a href='publish.html'>+发布新任务</a></li></ul>";
    titlediv.className="listtitle"
    listbidbox.appendChild(titlediv);

    var listsmallbox=document.createElement("div")
    listsmallbox.id="listsmallbox";
    listbidbox.appendChild(listsmallbox);

    var listtaskbox=document.createElement("div")
    listtaskbox.id="listbox"
    listtaskbox.className="box"
    listsmallbox.appendChild(listtaskbox);

    $.ajax({
       url:"http://m.antzb.com/web/tasktemplate/items.do?pageNo="+pageNo+"&pageSize="+pageSize,
       success : function(data){
          var data = eval('(' + data + ')');
          if (data.data.result.length>0){
             var totalCount=data.data.totalCount
             var totalPage=data.data.totalPage
             var tabletitle=document.createElement("div")
             tabletitle.innerHTML="<table width='100%' border='0' cellspacing='1' cellpadding='0' class='listtable' id='listtable'><tr><td class='t1' width='40%'>任务名称</td><td class='t1'>任务状态</td><td class='t1'>剩余任务总数</td><td class='t1'>已完成</td><td class='t1'>已审核</td><td class='t1'>未审核</td></tr></table>"
             tabletitle.id="list"
             document.getElementById("listbox").appendChild(tabletitle)
             for(i=0;i<data.data.result.length;i++){
                var objul=document.createElement("tr");
             	objul.id=data.data.result[i].taskInd;
             	objul.className="trhover"
             	objul.onmouseover=function(){
             	   this.className="tractive"
             	}
             	objul.onmouseout=function(){
                   this.className="trhover"
                }
                objul.onclick=function(){
                   showtask(this.id,pageNo,pageSize)
                }
             	objul.innerHTML="<td class='t2'>"+data.data.result[i].taskTitle+"</td><td class='t2'>"+data.data.result[i].taskStatusDesc+"</td><td class='t2'>"+data.data.result[i].taskCount+"</td><td class='t2'>"+data.data.result[i].hasDoneCount+"</td><td class='t2'>"+data.data.result[i].hasPassCount+"</td><td class='t2'>"+data.data.result[i].unPassCount+"</td>"
             	document.getElementById("listtable").appendChild(objul);
             }

            setpage(pageNo,pageSize,totalCount,totalPage)
          }else{
             var notips=document.createElement("div")
             notips.innerHTML="还没发布任务！";
             document.getElementById("listbox").appendChild(notips);
          }
       }
    })
 }
 function setpage(pageNo,pageSize,totalCount,totalPage){
    curnum=pageNo;
    var pageobj=document.createElement("div");
    pageobj.innerHTML="<li id='upbtn' class='pagemouseout'>上一页</li><li id='downbtn' class='pagemouseout'>下一页</li><li id='txt'>第"+pageNo+"页/共"+totalPage+"页，共计"+totalCount+"条</li>";
    pageobj.className="page";

    document.getElementById("listbox").appendChild(pageobj);

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
        document.getElementById("taskitem").removeChild(document.getElementById("listbidbox"));
        curnum=pageNo-1;
        showlist(curnum,pageSize);
    }
    document.getElementById("downbtn").onclick=function(){
           //alert("downbtn");
        document.getElementById("taskitem").removeChild(document.getElementById("listbidbox"));
        curnum=pageNo+1
        showlist(curnum,pageSize);
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
 function showtask(id,pageNo,pageSize){
    document.getElementById("listbidbox").style.display="none"
    $.ajax({
    	url:"http://m.antzb.com/web/tasktemplate/"+id,
    	success:function(data){
    	   var taskobj=document.createElement("div")
    	   document.getElementById("taskitem").appendChild(taskobj)

    		var targetpagetitle=document.createElement("div")
    		targetpagetitle.innerHTML="<ul><li class='name'>任务详情</li><li class='pushbtn' id='pushbtn1'><img src='images/back.png' style='vertical-align:middle'>返回</li></ul>"
    		targetpagetitle.className="listtitle"
    		taskobj.appendChild(targetpagetitle)

            var pushbtn1=document.getElementById("pushbtn1")
    		pushbtn1.onclick=function(){
    		document.getElementById("taskitem").removeChild(taskobj)
    		document.getElementById("listbidbox").style.display="block"
    		}

    		var data2 = eval('(' + data + ')');
    		var targetbox1=document.createElement("div")
    		targetbox1.id="taskinfo"
    		targetbox1.className="box"
    		targetbox1.innerHTML="<ul class='ztitle'>基本信息</ul><ul>任务名称："+data2.data.taskTitle+"</ul><ul>任务描述："+data2.data.taskDesc+"</ul><ul>任务类型："+data2.data.taskType+"</ul><ul>任务总量："+data2.data.taskCount+"</ul><ul>任务单价："+data2.data.taskFee+"</ul><ul>截⾄日期："+data2.data.deadLine+"</ul></ul>"
    		taskobj.appendChild(targetbox1)

    		var targetbox2=document.createElement("div")

    		targetbox2.innerHTML="<ul class='ztitle'>任务内容</ul>"
    		targetbox2.id="tasklist"
            targetbox2.className="box"
            taskobj.appendChild(targetbox2)
            taskTemplate=data2.data.taskTemplate.content.length

            if(taskTemplate>0){
               for(i=0;i<taskTemplate;i++){
                  var question=data2.data.taskTemplate.content[i].question
                  var type=data2.data.taskTemplate.content[i].type
                  var value=data2.data.taskTemplate.content[i].value
                  var questionul=document.createElement("ul")
                  questionul.style="color:#000"
                  questionul.innerHTML="Q"+(i+1)+"："+question
                  targetbox2.appendChild(questionul)
                  switch(type){
                     case "img":
                     break;
                     case "geometry":
                     break;
                     case "radio":
                     for(j=0;j<value.length;j++){
                        var questionvalue=document.createElement("ul")
                        questionvalue.innerHTML="<input type='radio'>&nbsp;"+value[j]
                        targetbox2.appendChild(questionvalue)
                     }
                     break;
                  }
               }
            }else{
               var questionul=document.createElement("ul")
               questionul.innerHTML="没有编完内容！"
               targetbox2.appendChild(questionul)
            }
        }
    })
 }