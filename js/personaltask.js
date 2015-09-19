// JavaScript Document
$.ajax({
			url:"http://m.antzb.com/web/personaltask/items.do",
			//dataType:"jsonp",
			success : function(data){
				var data = eval('(' + data + ')');
				//console.log(data.data.result);
				//alert(data.data.result.length);
				countnum=data.data.result.length
				var pindarr=new Array()
				var curlist=document.getElementById("datalist");
				for(i=0;i<countnum;i++){
					var objul=document.createElement("tr");
					objul.id=i;
					objul.className='datatr1'
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
				//alert(data.data.result[0].taskInd)
	
			}
		}) 