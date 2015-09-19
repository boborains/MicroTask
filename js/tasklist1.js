// JavaScript Document

loadlist(2,3)

function loadlist(pageNo,pageSize){

    $.ajax({
		url:"http://m.antzb.com/web/tasktemplate/items.do?pageNo="+pageNo+"&pageSize="+pageSize,
			//dataType:"jsonp",
		success : function(data){
		    var data = eval('(' + data + ')');
        	countnum=data.data.result.length
        	if(countnum!=0){
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
				

			var curlist=document.getElementById("listtable");

			for(i=0;i<countnum;i++){

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

                   mainbox.removeChild(targetpagetitle)
                   mainbox.removeChild(targetbox)
                   loadone(this.id,pageNo,pageSize)
                }
				objul.innerHTML="<td class='t2'>"+data.data.result[i].taskTitle+"</td><td class='t2'>"+data.data.result[i].taskStatusDesc+"</td><td class='t2'>"+data.data.result[i].taskCount+"</td><td class='t2'>"+data.data.result[i].hasDoneCount+"</td><td class='t2'>"+data.data.result[i].hasPassCount+"</td><td class='t2'>"+data.data.result[i].unPassCount+"</td>"
				curlist.appendChild(objul);
			}
                setpage(targetbox)
			}
			}
		})
}
function setpage(obj){
    var pagetr=document.createElement("tr")
    pagetr.innerHTML="<div class='page'> <span id='uppage' onMouseOver=this.className='pagemouseover' onMouseOut=this.className='pagemouseout'>上一页</span> <span id='downpage'>下一页</span>共多少条记录</div> "

    obj.appendChild(pagetr)
}
function over(obj){
    alert("1")
    }
function loadone(id,pageNo,pageSize){

	$.ajax({
		url:"http://m.antzb.com/web/tasktemplate/"+id,
		success:function(data){
			var mainbox=document.getElementById("rightbody")
			
			var targetpagetitle=document.createElement("div")
			targetpagetitle.innerHTML="<ul><li class='name'>任务详情</li><li class='pushbtn' id='pushbtn1'><img src='images/back.png' style='vertical-align:middle'>返回</li></ul>"
			targetpagetitle.className="listtitle"
			mainbox.appendChild(targetpagetitle)

            var pushbtn1=document.getElementById("pushbtn1")
			pushbtn1.onclick=function(){
			loadlist(2,3)
			mainbox.removeChild(targetpagetitle)
			mainbox.removeChild(targetbox1)
			mainbox.removeChild(targetbox2)
			}


			var data2 = eval('(' + data + ')');
			//countnum=data2.taskTemplate.length
		    //alert(data2.data.taskTemplate.content.length)
			var targetbox1=document.createElement("div")
			targetbox1.id="taskinfo"
			targetbox1.className="box"
			targetbox1.innerHTML="<ul class='ztitle'>基本信息</ul><ul>任务名称："+data2.data.taskTitle+"</ul><ul>任务描述："+data2.data.taskDesc+"</ul><ul>任务类型："+data2.data.taskType+"</ul><ul>任务总量："+data2.data.taskCount+"</ul><ul>任务单价："+data2.data.taskFee+"</ul><ul>截⾄日期："+data2.data.deadLine+"</ul></ul>"
			mainbox.appendChild(targetbox1)



			var targetbox2=document.createElement("div")

			targetbox2.innerHTML="<ul class='ztitle'>任务内容</ul>"
			targetbox2.id="tasklist"
            targetbox2.className="box"
            mainbox.appendChild(targetbox2)
            taskTemplate=data2.data.taskTemplate.content.length

            if(taskTemplate!=0){
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
                       //alert(value[j])
                       questionvalue.innerHTML="<input type='radio'>&nbsp;"+value[j]
                       targetbox2.appendChild(questionvalue)
                  }
                  break;
                }

              }

            }else{


            }
            }
		})
	
	}