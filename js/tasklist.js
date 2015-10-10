// JavaScript Document
 window.onload=function(){
    var totalCount
    var pageNo=1
    var totalPage
    var pageSize=8
    loadtasklist(pageNo,pageSize)
 }
 function loadtasklist(pageNo,pageSize){
    showlist(pageNo,pageSize);
 }
 //显示列表
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

       url:"http://back.antzb.com/web/tasktemplate/items.do?pageNo="+pageNo+"&pageSize="+pageSize,
       success : function(data){
          var data = eval('(' + data + ')');
          if (data.data.result.length>0){
             var totalCount=data.data.totalCount
             var totalPage=data.data.totalPage
             var tabletitle=document.createElement("div")
             tabletitle.innerHTML="<table width='100%' border='0' cellspacing='1' cellpadding='0' class='listtable' id='listtable'><tr><td class='t1' width='30%'>任务名称</td><td class='t1'>任务状态</td><td class='t1'>剩余任务总数</td><td class='t1'>已完成</td><td class='t1'>已审核</td><td class='t1'>未审核</td><td class='t1' width='17%'>操作</td></tr></table>"
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
                if (data.data.result[i].taskStatus==0){
             	    objul.innerHTML="<td class='t2'>"+data.data.result[i].taskTitle+"</td><td class='t2'>"+data.data.result[i].taskStatusDesc+"</td><td class='t2'>"+data.data.result[i].taskCount+"</td><td class='t2'>"+data.data.result[i].hasDoneCount+"</td><td class='t2'>"+data.data.result[i].hasPassCount+"</td><td class='t2'>"+data.data.result[i].unPassCount+"</td><td class='t2'><div id="+data.data.result[i].taskInd+" onclick=deltask(this,event,"+pageNo+","+pageSize+") onmouseover=changclass(this,'over') onmouseout=changclass(this,'out') >删除任务</div><div id="+data.data.result[i].taskInd+" onclick=appon(this,event,"+pageNo+","+pageSize+") onmouseover=changclass(this,'over') onmouseout=changclass(this,'out') >申请上线</div><div id="+data.data.result[i].taskInd+" onclick=edittask(this,event) onmouseover=changclass(this,'over') onmouseout=changclass(this,'out') >编辑任务</div></td>"

                }else if (data.data.result[i].taskStatus==1){
             	    objul.innerHTML="<td class='t2'>"+data.data.result[i].taskTitle+"</td><td class='t2'>"+data.data.result[i].taskStatusDesc+"</td><td class='t2'>"+data.data.result[i].taskCount+"</td><td class='t2'>"+data.data.result[i].hasDoneCount+"</td><td class='t2'>"+data.data.result[i].hasPassCount+"</td><td class='t2'>"+data.data.result[i].unPassCount+"</td><td class='t2'><div id="+data.data.result[i].taskInd+" onclick=hrefPage(this,event) onmouseover=changclass(this,'over') onmouseout=changclass(this,'out') >任务审核</div></td>"
             	}else{
             	    objul.innerHTML="<td class='t2'>"+data.data.result[i].taskTitle+"</td><td class='t2'>"+data.data.result[i].taskStatusDesc+"</td><td class='t2'>"+data.data.result[i].taskCount+"</td><td class='t2'>"+data.data.result[i].hasDoneCount+"</td><td class='t2'>"+data.data.result[i].hasPassCount+"</td><td class='t2'>"+data.data.result[i].unPassCount+"</td><td class='t2'></td>"

             	}
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
 function changclass(obj,event){
    if (event=="over"){
       obj.style.color='#FDAC23'
    }else{
       obj.style.color='#666'
    }
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
 function deltask(obj,evt,pageNo,pageSize){

  var e=(evt)?evt:window.event;
     if (window.event) {
         e.cancelBubble=true;
     } else {
         //e.preventDefault();
         e.stopPropagation();
     }
    //alert(id+pageNo+pageSize)
    $.ajax({
        url:"http://back.antzb.com/web/tasktemplate/delete.do?taskTemplateId="+obj.id,
        success: function(data) {
        var data = eval('(' + data + ')');
        //alert(data.message)
             switch (data.code){
             case 200:
             //alert(删除成功！")
                document.getElementById("taskitem").removeChild(document.getElementById("listbidbox"));
                showlist(pageNo,pageSize);
                showtips("删除成功！")
             break;
             case 400:
                showtips("不能删除的任务!")
             break;
             }
        }

    })
 }
 //编辑任务
 function edittask(obj,evt){
    //alert("edittask")
    var e=(evt)?evt:window.event;
        if (window.event) {
            e.cancelBubble=true;
        } else {
            //e.preventDefault();
            e.stopPropagation();
        }
    location='publish.html?id='+obj.id

 }
 function appon(obj,evt,pageNo,pageSize){
    var e=(evt)?evt:window.event;
    if (window.event) {
        e.cancelBubble=true;
    } else {
        //e.preventDefault();
        e.stopPropagation();
    }
   //alert(obj.id+pageNo+pageSize)

    $.ajax({
        url:"http://back.antzb.com/web/translating/doing.do?taskTemplateId="+obj.id,
        success: function(data) {
        var data = eval('(' + data + ')');
        //alert(data.message)
             switch (data.code){
             case 200:
             //alert(成功！")
                document.getElementById("taskitem").removeChild(document.getElementById("listbidbox"));
                showlist(pageNo,pageSize);
                showtips("申请成功！")
             break;
             case 400:
                showtips("申请失败!")
             break;
             }
        }
    })
 }
 function hrefPage(obj,evt){
     var e=(evt)?evt:window.event;
     if (window.event) {
         e.cancelBubble=true;
     } else {
         //e.preventDefault();
         e.stopPropagation();
     }
     location='examine.html?id='+obj.id
 }

 //显示任务详情
 function showtask(id,pageNo,pageSize){
    document.getElementById("listbidbox").style.display="none"
    $.ajax({
    	url:"http://back.antzb.com/web/tasktemplate/"+id+".do",
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
    		if (data2.data.priceType==1){
    		    targetbox1.innerHTML="<ul class='ztitle'>基本信息</ul><ul>任务名称："+data2.data.taskTitle+"</ul><ul>任务描述："+data2.data.taskDesc+"</ul><ul>任务类型："+data2.data.taskType+"</ul><ul>任务总量："+data2.data.taskCount+"</ul><ul>任务单价："+data2.data.taskFee+"元</ul><ul>截⾄日期："+data2.data.deadLine+"</ul></ul>"
            }else{
    		    targetbox1.innerHTML="<ul class='ztitle'>基本信息</ul><ul>任务名称："+data2.data.taskTitle+"</ul><ul>任务描述："+data2.data.taskDesc+"</ul><ul>任务类型："+data2.data.taskType+"</ul><ul>任务总量："+data2.data.taskCount+"</ul><ul>任务单价："+data2.data.taskFee+"金币</ul><ul>截⾄日期："+data2.data.deadLine+"</ul></ul>"
    		}
    		taskobj.appendChild(targetbox1)

    		var targetbox2=document.createElement("div")

    		targetbox2.innerHTML="<ul class='ztitle'>任务内容</ul>"
    		targetbox2.id="tasklist"
            targetbox2.className="box"
            taskobj.appendChild(targetbox2)
            taskTemplate=data2.data.taskTemplate.questionList.length

            if(taskTemplate>0){
               for(i=0;i<taskTemplate;i++){
                  var question=data2.data.taskTemplate.questionList[i].name
                  var type=data2.data.taskTemplate.questionList[i].content[0].type
                  var value=data2.data.taskTemplate.questionList[i].content[0].value
                  var questionul=document.createElement("ul")
                  questionul.style="color:#000"
                  questionul.innerHTML="Q"+(i+1)+"："+question
                  targetbox2.appendChild(questionul)
                  switch(type){
                     case "radio":
                     var values=String(value).split(",")
                     for(j=0;j<values.length-1;j++){
                        var questionvalue=document.createElement("ul")
                        questionvalue.innerHTML="<input type='radio'>&nbsp;"+values[j]
                        targetbox2.appendChild(questionvalue)
                     }
                     break;
                     case "checkbox":
                     var values=String(value).split(",")
                     for(j=0;j<values.length-1;j++){
                        var questionvalue=document.createElement("ul")
                        questionvalue.innerHTML="<input type='checkbox'>&nbsp;"+values[j]
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