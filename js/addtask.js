function addtask(){

    var taskTitle=document.getElementsByName("taskTitle")[0].value;
    var taskDesc=document.getElementsByName("taskDesc")[0].value;
    for(i=0;i<document.getElementsByName("taskType").length;i++){
        if (document.getElementsByName("taskType")[i].checked==true){
        var tasktype=document.getElementsByName("taskType")[i].value    
        }   
    }
    for(i=0;i<document.getElementsByName("isLocation").length;i++){
        if (document.getElementsByName("isLocation")[i].checked==true){
        var isLocation=document.getElementsByName("isLocation")[i].value    
        }   
    }
    var taskCount=document.getElementsByName("taskCount")[0].value;
    var taskFee=document.getElementsByName("taskFee")[0].value;
    var deadLine=document.getElementsByName("deadLine")[0].value;
    var availableTime=document.getElementsByName("availableTime")[0].value;
    var shenIndex=parseInt(document.getElementById("shen").selectedIndex)
    if(shenIndex==0){
        var shen=""  
    }else{
        var shen=document.getElementById("shen").options[shenIndex].value 
    }
    var cityIndex=parseInt(document.getElementById("city").selectedIndex)
    if(cityIndex==0){
        var city=""  
    }else{
        var city=document.getElementById("city").options[cityIndex].value 
    }
    var xianIndex=parseInt(document.getElementById("xian").selectedIndex)
    if(xianIndex==0){
        var xian=""  
    }else{
        var xian=document.getElementById("xian").options[xianIndex].value 
    }
    //var shen=document.getElementsByName("shen")[0].value;
    //var city=document.getElementsByName("city")[0].value;
    //var xian=document.getElementsByName("xian")[0].value;
    //var q1t=document.getElementsByName("Q1")[0].value;
   alert(document.getElementsByName("Q1")[0].value); 
    
}

