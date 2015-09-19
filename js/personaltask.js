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
                    showtask(this.id,pageNo,pageSize)
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