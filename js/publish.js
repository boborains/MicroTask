    var taskTitle;//任务标题
    var taskType=1;//任务类型
    var taskDesc="";//任务详情
    var taskCount=0;//任务总数
    var taskFee=1;//任务奖金
    var priceType=2;//价格类型。{1：人民币,2:金币}
    var processLimit;//执行类型
    var now = new Date();
    var availableTime=CurentTime()//上线时间
    var deadLine=CurentTime()//下线时间

    var sampleUrl//查看样例
    var taskInd//任务id
    var userId//任务创建者id
    var pagetype//0:为修改；1:为创建

 window.onload=function(){
    var url = window.location.search;
    var loc = url.substring(url.lastIndexOf('=')+1, url.length);
    if (loc==""){
        pagetype=0
        var obj=document.getElementById("rightbody")
        var step1=document.createElement("div")
        step1.id="step1"
        step1.innerHTML="<div class='boxs'><ul class='ulline' onclick='creatTaskStep2()'><a href='#'> 免费发布任务</a></ul><ul class='ulimg'><li><img src='images/tree.jpg'></li></ul></div>"
        obj.appendChild(step1)

    }else{
        pagetype=1;
        $.ajax({
           	url:"http://back.antzb.com/web/tasktemplate/"+loc+".do",
        	success:function(data){
        	var data = eval('(' + data + ')');
        	switch (data.code){
        	case 200:
        	    taskInd=loc
                taskTitle=data.data.taskTitle
                taskType=data.data.taskType
                taskDesc=data.data.taskDesc
                taskCount=data.data.taskCount
                taskFee=data.data.taskFee
                priceType=data.data.priceType
                processLimit=data.data.processLimit
                availableTime=data.data.availableTime
                deadLine=data.data.deadLine
                //alert(limit)

                creatTaskStep2()
        	break;
        	case 404:
                showtips(data.message)
                pagetype=0
        	break;
        	}

        	}
        })

    }
}
function CurentTime()
    {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();          //秒

        var clock = year + "-";

        if(month < 10)
            clock += "0";

        clock += month + "-";

        if(day < 10)
            clock += "0";

        clock += day + " ";

        if(hh < 10)
            clock += "0";

        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm+":";
        if (ss<10) clock+='0';
        clock+=ss
        return(clock);
    }
/*新建任务*/
function creatTaskStep2(){
    //alert("creatTaskStep2");
    var obj=document.getElementById("rightbody")

    var step2=document.createElement("div")
    step2.id="step2"
    if (pagetype==0){
    obj.removeChild(document.getElementById("step1"))
        step2.innerHTML="<div class='titlename'><ul><li class='li1'>新建任务</li></ul></div><div class='boxs'><ul>任务标题</ul><ul><input type='text' name='taskTitle' value=''  class='inputw500'></ul><ul class='tips'>限10个字</ul><ul><li class='leftli'>任务详情</li><li class='rightli'><textarea name='taskDesc' id='taskDesc' cols='72' rows='5'></textarea></li></ul><ul><li class='leftli'>任务总数</li><li class='rightli'><input onkeyup=intset(this) onafterpaste=intset(this) name='taskCount' value="+taskCount+" class='input200'> </li></ul><ul><li class='leftli'>任务奖金</li><li class='rightli1'><input type='text' name='taskFee' value="+taskFee+" class='inputw100'></li><li class='rightli2'><input type='radio' name='priceTyep' checked value='2' onclick=changePrice()>金币 </li><li class='rightli2'><input type='radio' name='priceTyep' value='1' onclick=changePrice()>现金 </li></ul><ul><li class='leftli'>执行类型</li><li class='rightli3'><input type='radio' name='limit' value='1' checked onclick=changelimit()>每人完成一个 </li><li class='rightli3'><input type='radio' name='limit' value='20' onclick=changelimit()>每人完成多个 </li></ul><ul><li class='leftli'>上线时间</li><li class='rightli'><input type='text' name='availableTime'  class='inputw200 hasDatepicker' value='"+availableTime+"'></li></ul><ul><li class='leftli'>下线时间</li><li class='rightli'><input type='text' class='inputw200 hasDatepicker'  name='deadLine' value='"+deadLine+"'></li></ul><ul><li class='leftli'>查看样例</li>'<li class='rightli'><input type='text' name='sampleUrl' class='inputw500'></li></ul><ul>选择类型</ul><ul><table width='100%'><tr><td><img src='images/img.jpg'> </td><td><img src='images/img.jpg'></td><td><img src='images/img.jpg'></td></tr><tr><td><input type='radio' name='tasktype' value='1' checked onclick=typecheck()>调研</td><td><input type='radio' name='tasktype' value='2' onclick=typecheck()>搜罗</td><td><input type='radio' name='tasktype' value='2' onclick=typecheck()>监察</td></tr></table></ul><ul><li class='libtn' id='creatbtn1' onclick='creatTask(1)'>新创建</li><li class='libtn' id='tempCreat' style='display:none' id='creatbtn2' onclick=creatTask(2)>模板创建</li></ul></div>";
obj.appendChild(step2)
    }else{
        step2.innerHTML="<div class='titlename'><ul><li class='li1'>新建任务</li></ul></div><div class='boxs'><ul>任务标题</ul><ul><input type='text' name='taskTitle' value="+taskTitle+"  class='inputw500'></ul><ul class='tips'>限10个字</ul><ul><li class='leftli'>任务详情</li><li class='rightli'><textarea name='taskDesc' id='taskDesc' cols='72' rows='5'>"+taskDesc+"</textarea></li></ul><ul><li class='leftli'>任务总数</li><li class='rightli'><input onkeyup=intset(this) onafterpaste=intset(this) name='taskCount' value="+taskCount+" class='input200'> </li></ul><ul><li class='leftli'>任务奖金</li><li class='rightli1'><input type='text' name='taskFee' value="+taskFee+" class='inputw100'></li><li class='rightli2'><input type='radio' name='priceTyep' checked value='2' onclick=changePrice()>金币 </li><li class='rightli2'><input type='radio' name='priceTyep' value='1' onclick=changePrice()>现金 </li></ul><ul><li class='leftli'>执行类型</li><li class='rightli3'><input type='radio' name='limit' value='1' checked onclick=changelimit()>每人完成一个 </li><li class='rightli3'><input type='radio' name='limit' value='20' onclick=changelimit()>每人完成多个 </li></ul><ul><li class='leftli'>上线时间</li><li class='rightli'><input type='text' name='availableTime'  class='inputw200 hasDatepicker' value='"+availableTime+"'></li></ul><ul><li class='leftli'>下线时间</li><li class='rightli'><input type='text' class='inputw200 hasDatepicker'  name='deadLine' value='"+deadLine+"'></li></ul><ul><li class='leftli'>查看样例</li>'<li class='rightli'><input type='text' name='sampleUrl' class='inputw500'value=''></li></ul><ul>选择类型</ul><ul><table width='100%'><tr><td><img src='images/img.jpg'> </td><td><img src='images/img.jpg'></td><td><img src='images/img.jpg'></td></tr><tr><td><input type='radio' name='tasktype' value='1' checked onclick=typecheck()>调研</td><td><input type='radio' name='tasktype' value='2' onclick=typecheck()>搜罗</td><td><input type='radio' name='tasktype' value='2' onclick=typecheck()>监察</td></tr></table></ul><ul><li class='libtn' id='editsave' onclick='creatTask(3)'>保存修改</li></ul></div>";
        obj.appendChild(step2)
        var objs=document.getElementsByName("priceTyep")
        for(var i=0;i<objs.length;i++){
            if(objs[i].value==priceType){
               objs[i].checked= true;
            break;
            }
        }
        var obj1=document.getElementsByName("limit")
        for(var i=0;i<obj1.length;i++){
           if(obj1[i].value==processLimit){
              obj1[i].checked= true;
               break;
            }
        }
        var obj2=document.getElementsByName("tasktype")
        for(var i=0;i<obj2.length;i++){
               if(obj2[i].value==taskType){
                   obj2[i].checked= true;
                   break;
               }
        }
    }



}
//创建任务按钮事件
function creatTask(step){
    taskTitle=document.getElementsByName("taskTitle")[0].value;
    taskTitle=document.getElementsByName("taskTitle")[0].value;
    taskDesc=document.getElementsByName("taskDesc")[0].value;
    taskCount=document.getElementsByName("taskCount")[0].value;
    taskFee=document.getElementsByName("taskFee")[0].value;
    limit=document.getElementsByName("limit")[0].value;
    availableTime=document.getElementsByName("availableTime")[0].value;
    deadLine=document.getElementsByName("deadLine")[0].value;
    sampleUrl=document.getElementsByName("sampleUrl")[0].value;
    switch(step){
    case 1:
        newTask()
    break;
    case 2:
        tempTask()
    break;
    case 3:
        saveEdittask()
    break;
    }

}
//
function saveEdittask(){
    var dataJson={taskTemplateId:taskInd,taskTitle:taskTitle,taskDesc:taskDesc,taskCount:taskCount,price:taskFee,priceType:priceType,processLimit:processLimit, avaliableTime:availableTime,deadLine:deadLine}
    $.ajax({
        type: "POST",
        url: "http://back.antzb.com/web/tasktemplate/edit.do",
        dataType:"json",
        contentType: "application/json",
        data:JSON.stringify(dataJson),
        success: function(message) {
        alert(message.code)
        alert(JSON.stringify(dataJson))
        }
    })
}
//新任务创建
function newTask(){
    var obj=document.getElementById("rightbody")
    obj.removeChild(document.getElementById("step2"))
    var step3=document.createElement("div")
    step3.id="step3"
    step3.innerHTML="<div id='step3'><div class='titlename' ><ul><li class='li1'>设计任务</li><li class='li2' onclick=savetaskdesgin()> 保存任务 </li></ul></div><div class='boxs'><ul class='txt'>任务标题:"+taskTitle+"</ul><ul><li class='leftli1'><div class='typetitle'>题目类型</div><div class='typebox' onmouseover=changestyle(this,'typeboxover') onmouseout=changestyle(this,'typebox') ondblclick=appquestion(1)>单选题</div><div class='typebox' onmouseover=changestyle(this,'typeboxover') onmouseout=changestyle(this,'typebox') ondblclick=appquestion(2)>多选题</div><div class='typebox' onmouseover=changestyle(this,'typeboxover') onmouseout=changestyle(this,'typebox') ondblclick=appquestion(3)>填空题</div><div class='typebox' onmouseover=changestyle(this,'typeboxover') onmouseout=changestyle(this,'typebox') ondblclick=appquestion(4)>拍照题</div><div class='typebox' onmouseover=changestyle(this,'typeboxover') onmouseout=changestyle(this,'typebox') ondblclick=appquestion(5)>地图定位</div></li><li class='rightli0'><div id='listQA' class='listQA'></div></li></ul></div></div>"
    obj.appendChild(step3)

}

//模版任务创建
function tempTask(){

    //alert("tempTask")
    var obj=document.getElementById("rightbody")
    obj.removeChild(document.getElementById("step2"))
    var step3=document.createElement("div")
    step3.id="step3"
    step3.innerHTML="<div id='step3'><div class='titlename' ><ul><li class='li1'>设计任务</li><li class='li2' onclick=savetaskdesgin()> 保存任务 </li></ul></div><div class='boxs'><ul class='txt'>任务标题:"+taskTitle+"</ul><ul><li class='leftli1'><div class='typetitle'>模板类型</div><div class='typeboxtemp_active' id='tempbtn1' onclick=showTemp(1)>超市检查</br><p style='font-size:12px;line-height:16px;color:#ccc;'>规定超市检查可以拍下1-5张照片包括超市名称、端架、货架、堆头包柱，固定暂时不允许增删。</p></div><div class='typeboxtemp' id='tempbtn2' onclick=showTemp(2)>户外广告监察</br><p style='font-size:12px;line-height:16px;color:#ccc;'>规定户外广告监察只拍一张照片和记录当前拍照的时间，固定暂时不允许增删。</p></div><div class='typeboxtemp' id='tempbtn3' onclick=showTemp(3)>收罗</br><p style='font-size:12px;line-height:16px;color:#ccc;'>规定收罗包括名称图文地址图文，记录当前时间固定暂时不允许增删。</p></div></li><li class='rightli0' id ='rightli0'></li></ul></div></div>"
    obj.appendChild(step3)
    createTemp(1)
}
//模版创建按钮事件
function showTemp(num){
    for(i=1;i<4;i++){
        document.getElementById("tempbtn"+i).className="typeboxtemp"
    }
    document.getElementById("tempbtn"+num).className="typeboxtemp_active"
    //var obj=
    var objf=document.getElementById("rightli0")
    objf.removeChild(document.getElementById("listQA"))
    createTemp(num)

}
//创建模版题列表
function createTemp(num){
    var obj=document.getElementById("rightli0")
    var listQA=document.createElement("div")
    listQA.id="listQA"
    listQA.className="listQA"
    obj.appendChild(listQA)
    switch (num){
    case 1:
    appquestion(4)
    appquestion(3)
    appquestion(4)
    appquestion(4)
    appquestion(4)
    appquestion(4)
    var titleArray=new Array("请拍下超市名称照片","请输入超市名称","请拍下端架照片","请拍下货架照片","请拍下堆头照片","请拍下包柱照片")
    for(i=0;i< document.getElementsByClassName("control").length;i++){
    document.getElementsByClassName("control")[i].getElementsByTagName("img")[0].style.display="none"
    document.getElementsByClassName("control")[i].getElementsByTagName("img")[1].style.display="none"
    document.getElementsByClassName("QTitle")[i].getElementsByTagName("input")[0].value=titleArray[i]
    }
    break;
    case 2:
    appquestion(4)
    appquestion(3)
    var titleArray=new Array("请拍下户外广告的全身照片","请输入广告所在地址信息")
    for(i=0;i< document.getElementsByClassName("control").length;i++){
    document.getElementsByClassName("control")[i].getElementsByTagName("img")[0].style.display="none"
    document.getElementsByClassName("control")[i].getElementsByTagName("img")[1].style.display="none"
    document.getElementsByClassName("QTitle")[i].getElementsByTagName("input")[0].value=titleArray[i]
    }
    break;
    case 3:
    appquestion(3)
    appquestion(4)
    appquestion(3)
    appquestion(4)
    appquestion(5)
    var titleArray=new Array("请输入名称","请拍下名称","请输入地址","请拍下地址信息","获取GPS定位信息")
    for(i=0;i< document.getElementsByClassName("control").length;i++){
    document.getElementsByClassName("control")[i].getElementsByTagName("img")[0].style.display="none"
    document.getElementsByClassName("control")[i].getElementsByTagName("img")[1].style.display="none"
    document.getElementsByClassName("QTitle")[i].getElementsByTagName("input")[0].value=titleArray[i]
    }
    break;
    }
}
//保存设计
function savetaskdesgin(){

    var obj=document.getElementsByClassName("qagroup");

    var qacount=obj.length;
     //alert(qacount);
    var qaarea=new Array();
    var qaareas=new Array();
    var types;
    var value="";
    for(i=0;i<qacount;i++){
        var label=obj[i].getElementsByClassName("QTitle")[0].getElementsByTagName("input")[0].value;
        var index=i+1;
        if (obj[i].type==1){
            types="radio"
            var valuemc=obj[i].getElementsByClassName("leftul")
            value=""
            for(j=0;j<valuemc.length;j++){
               value=value+valuemc[j].getElementsByTagName("input")[1].value+","
            }
        }else if(obj[i].type==2){
            types="checkbox"
            value=""
            var valuemc=obj[i].getElementsByClassName("leftul")
            for(k=0;k<valuemc.length;k++){
               value=value+valuemc[k].getElementsByTagName("input")[1].value+","
            }
        }else if(obj[i].type==3){
            types="text"
            value=label
        }else if(obj[i].type==4){
            types="img"
            value=label
        }else if(obj[i].type==5){
            types="geometry"
            value=label
        }
        qaareas[i]={'type':types,'value': [value]}
        qaarea[i]={content:[qaareas[i]],'name':label}
    }

    var dataJson={taskTitle:taskTitle,taskTemplate:{'questionList':qaarea},taskCount:taskCount,taskFee:taskFee,deadLine:deadLine,priceType:priceType,availableTime:availableTime,taskType:taskType,taskDesc:taskDesc,processLimit:processLimit,sampleUrl:sampleUrl}

        //alert(dataJson)
    $.ajax({
        type: "POST",
        url: "http://back.antzb.com/web/tasktemplate/add.do",
        dataType:"json",
        contentType: "application/json",
        data:JSON.stringify(dataJson),
        success: function(message) {
        alert(JSON.stringify(dataJson))
            switch (message.code){
            case 200:
                showtips("任务保存成功！")
                window.location.href='list.html';
                //creatTaskStep1()

            break;
            case 400:
                showtips("参数不正确")
            break;
            case 404:
                showtips("无查询结果")
            break;
            case 401:
                showtips("无权限及没有登录")
            break;
            case 500:
                showtips("服务器错误")
            break;
            }
        },
        error: function (message) {
         //alert(message)
             showtips("提交数据失败！"+message)

             //alert(dataJson);
         }

    });


}
//成功后返回添加步骤
function creatTaskStep1(){

    var obj=document.getElementById("rightbody")
    obj.removeChild(document.getElementById("step3"))
    var step1=document.createElement("div")
    step1.id="step1"
    step1.innerHTML="<div class='boxs'><ul class='ulline' onclick=creatTaskStep2()><a href='#'> 免费发布任务</a></ul><ul class='ulimg'><li><img src='images/tree.jpg'></li></ul></div>";
    obj.appendChild(step1)
}
//添加题目内容
function appquestion(type){
    //alert(type)
    var obj=document.getElementById("listQA")
    var qagroup=document.createElement("ul")
    var num=obj.getElementsByClassName("qagroup").length+1
    qagroup.id=num
    qagroup.type=type;
    qagroup.className="qagroup"
    switch (type){
    case 1:
        qagroup.innerHTML="<li id='Q' class='qa'><div id='num' class='num'>Q"+num+"</div><div class='QTitle' class='QTitle'><input type='text' value='单选题'></div></li><li id='A' class='aa'><div id='1'><ul class='leftul'><input type='radio' name="+qagroup.id+"><input type='text' value='选项1'></ul><ul class='rightul'><img src='images/i5.png' onclick=addaa(this,'1',"+qagroup.id+")><img src='images/i4.png' onclick=delaa(this)></ul></div></li>"
        obj.appendChild(qagroup)
        myOrder("listQA",1,"images/ico3.jpg","images/ico2.jpg","images/ico4.jpg","",qagroup.id);
        break;
    case 2:
        qagroup.innerHTML="<li id='Q' class='qa'><div id='num' class='num'>Q"+num+"</div><div class='QTitle' class='QTitle'><input type='text' value='多选题'></div></li><li id='A' class='aa'><div id='1'><ul class='leftul'><input type='checkbox' name="+qagroup.id+"><input type='text' value='选项1'></ul><ul class='rightul'><img src='images/i5.png' onclick=addaa(this,'1',"+qagroup.id+")><img src='images/i4.png' onclick=delaa(this)></ul></div></li>"
        obj.appendChild(qagroup)
        myOrder("listQA",1,"images/ico3.jpg","images/ico2.jpg","images/ico4.jpg","",qagroup.id);
    break;
    case 3:
        qagroup.innerHTML="<li id='Q' class='qa'><div id='num' class='num'>Q"+num+"</div><div class='QTitle' class='QTitle'><input type='text' value='填空题'></div></li><li id='A' class='aa'><div id='1'><ul class='qbox'></ul></div></li>"
        obj.appendChild(qagroup)
        myOrder("listQA",1,"images/ico3.jpg","images/ico2.jpg","images/ico4.jpg","",qagroup.id);
    break;
    case 4:
        qagroup.innerHTML="<li id='Q' class='qa'><div id='num' class='num'>Q"+num+"</div><div class='QTitle' class='QTitle'><input type='text' value='拍照题'></div></li><li id='A' class='aa'><div id='1'><ul class='photobox'>+</ul></div></li>"
        obj.appendChild(qagroup)
        myOrder("listQA",1,"images/ico3.jpg","images/ico2.jpg","images/ico4.jpg","",qagroup.id);
    break;
    case 5:
        qagroup.innerHTML="<li id='Q' class='qa'><div id='num' class='num'>Q"+num+"</div><div class='QTitle' class='QTitle'><input type='text' value='地图定位'></div></li><li id='A' class='aa'><div id='1'><ul class='qbox'></ul></div></li>"
        obj.appendChild(qagroup)
        myOrder("listQA",1,"images/ico3.jpg","images/ico2.jpg","images/ico4.jpg","",qagroup.id);
        //myOrder("listQA",1,"images/ico3.jpg","images/ico2.jpg","images/ico4.jpg","images/ico5.jpg",qagroup.id);
    break;
    }


}
//添加答案选项
function addaa(obj,type){
    //alert(obj.parentNode.parentNode.parentNode.parentNode.id)
    name=obj.parentNode.parentNode.parentNode.parentNode.id
    var num=obj.parentNode.parentNode.parentNode.getElementsByTagName("div").length+1
    var divl=document.createElement("div")
    divl.id=num
    divl.innerHTML="<ul class='leftul'><input type='radio' name="+name+"><input type='text' value='选项"+num+"'></ul><ul class='rightul'><img src='images/i5.png' onclick=addaa(this,'1',"+name+")><img src='images/i4.png' onclick=delaa(this)></ul>"
    obj.parentNode.parentNode.parentNode.appendChild(divl)
}
//删除答案选项
function delaa(obj){
   obj.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode)
   // alert(obj.parentNode.parentNode.id)
}
//改变题目类型样式
 function changestyle(obj,classname){
     obj.className=classname;
 }

//只允许输入数字
function intset(obj){
    if(obj.value.length==1){
        obj.value=obj.value.replace(/[^1-9]/g,'')
    }else{
        obj.value=obj.value.replace(/\D/g,'')
    }
}
//保存任务设置
function saveSetTask(){
    taskTitle=document.getElementsByName("taskTitle")[0].value;
    taskDesc=document.getElementsByName("taskDesc")[0].value;
    taskCount=document.getElementsByName("taskCount")[0].value;
    taskFee=document.getElementsByName("taskFee")[0].value;
    limit=document.getElementsByName("limit")[0].value;
    availableTime=document.getElementsByName("availableTime")[0].value;
    deadLine=document.getElementsByName("deadLine")[0].value;
    sampleUrl=document.getElementsByName("sampleUrl")[0].value;

    //document.getElementById("rightbody").removeChild(document.getElementById("step4"))
    //document.getElementById("step3").style.display="block"
    //document.getElementsByClassName("boxs")[0].getElementsByClassName("txt")[0].innerHTML="任务标题:"+taskTitle

}
function changelimit(){
var obj=document.getElementsByName("limit")
    for(var i=0;i<obj.length;i++){
        if(obj[i].checked==true){
            processLimit=obj[i].value;
            break;
        }
    }
}
function changePrice(){
    var obj=document.getElementsByName("priceTyep")
    for(var i=0;i<obj.length;i++){
        if(obj[i].checked==true){
            priceType=obj[i].value;
            break;
        }
    }

}
/*新建任务--是否能用模版*/
function typecheck(){
//alert("typecheck")
    var obj=document.getElementsByName("tasktype")
    for(var i=0;i<obj.length;i++){
        if(obj[i].checked==true){
            taskType=obj[i].value;
            break;
        }
    }
    if (pagetype==0){
        if (taskType==1){
            document.getElementById("tempCreat").style.display="none"
        }else{
            document.getElementById("tempCreat").style.display="block"
        }
    }
}
//
function moveSonU(tag,pc){

    var tagPre=get_previoussibling(tag);
        var t=document.getElementById(pc);
    if(tagPre!=undefined){

        var id1=tag.id
        var id2=tagPre.id
        var t1=tag.getElementsByTagName("div")[0].innerHTML
        var t2=tagPre.getElementsByTagName("div")[0].innerHTML
        tag.id=id2
        tagPre.id=id1;

        tag.getElementsByTagName("div")[0].innerHTML=t2
        tagPre.getElementsByTagName("div")[0].innerHTML=t1
        t.insertBefore(tag,tagPre);
    }
}
function moveSonD(tag){
    var tagNext=get_nextsibling(tag);
    if(tagNext!=undefined){
        var id1=tag.id
        var id2=tagNext.id
        var t1=tag.getElementsByTagName("div")[0].innerHTML
        var t2=tagNext.getElementsByTagName("div")[0].innerHTML
        tag.id=id2
        tagNext.id=id1;
        tag.getElementsByTagName("div")[0].innerHTML=t2
        tagNext.getElementsByTagName("div")[0].innerHTML=t1
        insertAfter(tag,tagNext);
    }
}
function get_previoussibling(n){
    if(n.previousSibling!=null){
        var x=n.previousSibling;
        while (x.nodeType!=1)
        {
            x.id=x.previousSibling.id
            x=x.previousSibling;

        }  // alert(x.id)
        return x;

    }
}
function get_nextsibling(n){
    if(n.nextSibling!=null){
        var x=n.nextSibling;
        while (x.nodeType!=1)
        {
            x=x.nextSibling;
        }//alert(x.id)
        return x;

    }
}
function delSon(tag,pc){
   //var tagPre=get_previoussibling(tag);
   var t=document.getElementById(pc);
   t.removeChild(tag)
   var licount=t.getElementsByClassName("qagroup").length
   for(i=0;i<licount;i++){
      t.getElementsByClassName("qagroup")[i].id="Q"+(i+1)
      t.getElementsByClassName("qagroup")[i].getElementsByClassName("num")[0].innerHTML="Q"+(i+1)
   }

}
//DOM没有提供insertAfter()方法
function insertAfter(newElement, targetElement){

    var parent = targetElement.parentNode;

    if (parent.lastChild == targetElement) {

        // 如果最后的节点是目标元素，则直接添加。因为默认是最后
        parent.appendChild(newElement);

    }

    else {

        parent.insertBefore(newElement, targetElement.nextSibling);

        //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
    }

}

function myOrder(myList,m,mO,mT,mD,mE,myid){
//myList为ul的id值，m为0显示文字，m为1显示图片，mO、mT为文字或图片内容
    var pCon=document.getElementById(myList);
    var pSon=document.getElementById(myid).getElementsByClassName("qa")
    //var pSon=pCon.getElementsByTagName("ul").getElementsByTagName("li");
    for(i=0;i<pSon.length;i++){
        var conTemp=document.createElement("div");
        conTemp.setAttribute("class","control");
        var clickUp=document.createElement("a");
        var clickDown=document.createElement("a");
        var clickDel=document.createElement("a");
        var clickSet=document.createElement("a");
        if(m==0){
        var upCon=document.createTextNode(mO);
        var downCon=document.createTextNode(mT);
        var delCon=document.createTextNode(mD);
        var setCon=document.createTextNode(mE);
        }else{
        var upCon=document.createElement("img");
        var downCon=document.createElement("img");
        var delCon=document.createElement("img");
        var setCon=document.createElement("img");
        setCon.setAttribute("src",mE)
        upCon.setAttribute("src",mO);
        downCon.setAttribute("src",mT);
        delCon.setAttribute("src",mD);
        }
        clickSet.appendChild(setCon)
        clickSet.setAttribute("href","#")
        clickUp.appendChild(upCon);
        clickUp.setAttribute("href","#");
        clickDown.appendChild(downCon);
        clickDown.setAttribute("href","#");
        clickDel.appendChild(delCon);
        clickDel.setAttribute("href","#");
        pSon[i].appendChild(conTemp);
        if(mE!=""){
        conTemp.appendChild(clickSet);
        }
        conTemp.appendChild(clickUp);
        conTemp.appendChild(clickDown);
        conTemp.appendChild(clickDel);
        clickUp.onclick=function(){
           // alert(this.parentNode.parentNode.parentNode.id)
            moveSonU(this.parentNode.parentNode.parentNode,myList);
        }
        clickDown.onclick=function(){
            moveSonD(this.parentNode.parentNode.parentNode);
        }
        clickDel.onclick=function(){
          //alert(this.parentNode.parentNode.parentNode.id+"==="+myList)
          delSon(this.parentNode.parentNode.parentNode,myList);
        }
    }
}
