// JavaScript Document
window.onload=function(){
	var t_text=document.getElementById("t_text")
	var t_radio=document.getElementById("t_radio")
	var t_select=document.getElementById("t_select")
	var t_image=document.getElementById("t_image")
	var t_music=document.getElementById("t_music")
	var t_video=document.getElementById("t_video")
	
	var tasklist=document.getElementById("tasklist")
	var arr=new Array()
	var curtype
	arr[0]=document.getElementById("t_text")
	arr[1]=document.getElementById("t_radio")
	arr[2]=document.getElementById("t_select")
	arr[3]=document.getElementById("t_image")
	arr[4]=document.getElementById("t_music")
	arr[5]=document.getElementById("t_video")
	
	for(i=0;i<6;i++){
		arr[i].draggable=true;
		arr[i].ondragstart=function(e){
			e.dataTransfer.setData("_","");
			curtype=this.id;
			}
		
		}
	
	
	tasklist.ondragenter=function(e){
		e.preventDefault();
		}
	tasklist.ondragover=function(e){
		e.preventDefault();
		}
	tasklist.ondragleave=function(e){
		e.preventDefault();
		}
	tasklist.ondrop=function(e){
		
		switch(curtype){
			case "t_text":
			var s=document.getElementById('tasklist');
			var t=s.childNodes.length;
			addradio('tasklist','onetext')
			break;
			case "t_radio":
			addradio('tasklist','oneradio')
			break;
			case "t_select":
			addradio('tasklist','onecheckbox')
			break;
			case "t_image":
			addradio('tasklist','oneimage')
			break;
			case "t_music":
			addradio('tasklist','onemusic')
			break;
			case "t_video":
			addradio('tasklist','onevideo')
			break;
			}
			
		e.preventDefault();
		}
		
	}
function showqubtn(Targetbtn){
	var btnbox=document.getElementById(Targetbtn)
	for(i=0;i<btnbox.getElementsByClassName("right").length;i++){
		btnbox.getElementsByClassName("right").item(i).style.display="block"
		}
	}
function hiddenbtn(Targetbtn){
	var btnbox=document.getElementById(Targetbtn)
	for(i=0;i<btnbox.getElementsByClassName("right").length;i++){
		btnbox.getElementsByClassName("right").item(i).style.display="none"
		}
	}
function delli(Targetbox,Targetli){
	var li=document.getElementById(Targetli)
	var bo=document.getElementById(Targetbox)
	bo.removeChild(li);
	}
function addradio(Targetbox,targettxt){
	var box=document.getElementById(Targetbox)
	
	
    switch (targettxt){
		case "oneradio_q"://单选项
		var objli = document.createElement("li");
		var num=box.getElementsByClassName("atcss").length+1
		
	    var oneradio="<div><ul><li class='left'><input type='radio' name='q"+num+"_answer' value='' /><input type='text' value='单选"+num+"' class='input1' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn"+num+"'><img src='images/i5.png' onClick=addradio('"+Targetbox+"','oneradio_q')><img src='images/i4.png' onClick=delli('"+Targetbox+"','"+Targetbox+"_a"+num+"')></li></ul></div>"
		box.appendChild(objli)
		objli.id=Targetbox+"_a"+num
	    objli.className="atcss"
		objli.innerHTML=oneradio
		break;
		case "onecheckbox_q"://多选项
		var objli = document.createElement("li");
		var num=box.getElementsByClassName("atcss").length+1
		
	    var onecheckbox_q="<div><ul><li class='left'><input type='checkbox' name='q"+num+"_answer' value='' /><input type='text' value='选项"+num+"' class='input1' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn"+num+"'><img src='images/i5.png' onClick=addradio('"+Targetbox+"','oneradio_q')><img src='images/i4.png' onClick=delli('"+Targetbox+"','"+Targetbox+"_a"+num+"')></li></ul></div>"
		box.appendChild(objli)
		objli.id=Targetbox+"_a"+num
	    objli.className="atcss"
		objli.innerHTML=onecheckbox_q
		break;
		
		case "onetext"://文本题
		var objli = document.createElement("ul");
		var num=box.getElementsByClassName("qcss").length+1
		var onetext="<li id='t"+num+"' class='atline'><div><ul><li class='left'>Q"+num+"<input type='text' value='文本题' class='input1' name='Q"+num+"' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn0' style='display:none'><img src='images/i4.png' onClick=delli('tasklist','q"+num+"')></li></ul></div></li>"
		box.appendChild(objli)
		objli.id="q"+num
	    objli.className="qcss"
		objli.onmouseover=function() {showqubtn(objli.id)}
		objli.onmouseout=function() {hiddenbtn(objli.id)}
		objli.innerHTML=onetext
		break;
		
		case "oneradio"://单选题
		var objli = document.createElement("ul");
		var num=box.getElementsByClassName("qcss").length+1
		var oneradio="<li id='t"+num+"' class='atline'><div><ul><li class='left'>Q"+num+"<input type='text' value='单选题' class='input1' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn0' style='display:none'><img src='images/i4.png' onClick=delli('tasklist','q"+num+"')></li></ul></div></li><li id='q"+num+"_a1' class='atcss'><div><ul><li class='left'><input type='radio' name='q"+num+"_answer' value='' /><input type='text' value='选项1' class='input1' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn1' style='display:none'><img src='images/i5.png' onClick=addradio('q"+num+"','oneradio_q')><img src='images/i4.png' onClick=delli('q"+num+"','q"+num+"_a1')></li></ul></div></li><li id='q"+num+"_a2' class='atcss'><div><ul><li class='left'><input type='radio' name='q"+num+"_answer' value='' /><input type='text' value='选项2' class='input1' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn2' style='display:none'><img src='images/i5.png' onClick=addradio('q"+num+"','oneradio_q')><img src='images/i4.png' onClick=delli('q"+num+"','q"+num+"_a2')></li></ul></div></li>"
		box.appendChild(objli)
		objli.id="q"+num
	    objli.className="qcss"
		objli.onmouseover=function() {showqubtn(objli.id)}
		objli.onmouseout=function() {hiddenbtn(objli.id)}
		objli.innerHTML=oneradio
		break;
		
		case "onecheckbox"://多选题
		var objli = document.createElement("ul");
		var num=box.getElementsByClassName("qcss").length+1
		var onecheckbox="<li id='t"+num+"' class='atline'><div><ul><li class='left'>Q"+num+"<input type='text' value='多选题' class='input1' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn0' style='display:none'><img src='images/i4.png' onClick=delli('tasklist','q"+num+"')></li></ul></div></li><li id='q"+num+"_a1' class='atcss'><div><ul><li class='left'><input type='checkbox' name='q"+num+"_answer' value='' /><input type='text' value='选项1' class='input1' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn1' style='display:none'><img src='images/i5.png' onClick=addradio('q"+num+"','onecheckbox_q')><img src='images/i4.png' onClick=delli('q"+num+"','q"+num+"_a1')></li></ul></div></li><li id='q"+num+"_a2' class='atcss'><div><ul><li class='left'><input type='checkbox' name='q"+num+"_answer' value='' /><input type='text' value='选项2' class='input1' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn2' style='display:none'><img src='images/i5.png' onClick=addradio('q"+num+"','onecheckbox_q')><img src='images/i4.png' onClick=delli('q"+num+"','q"+num+"_a2')></li></ul></div></li>"
		box.appendChild(objli)
		objli.id="q"+num
	    objli.className="qcss"
		objli.onmouseover=function() {showqubtn(objli.id)}
		objli.onmouseout=function() {hiddenbtn(objli.id)}
		objli.innerHTML=onecheckbox
		break;
		
		case "oneimage"://图片题
		var objli = document.createElement("ul");
		var num=box.getElementsByClassName("qcss").length+1
		var oneimage="<li id='t"+num+"' class='atline'><div><ul><li class='left'>Q"+num+"<input type='text' value='图片' class='input1' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn0' style='display:none'><img src='images/i4.png' onClick=delli('tasklist','q"+num+"')></li></ul></div></li>"
		box.appendChild(objli)
		objli.id="q"+num
	    objli.className="qcss"
		objli.onmouseover=function() {showqubtn(objli.id)}
		objli.onmouseout=function() {hiddenbtn(objli.id)}
		objli.innerHTML=oneimage
		break;
		
		case "onemusic"://音频
		var objli = document.createElement("ul");
		var num=box.getElementsByClassName("qcss").length+1
		var onemusic="<li id='t"+num+"' class='atline'><div><ul><li class='left'>Q"+num+"<input type='text' value='音频' class='input1' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn0' style='display:none'><img src='images/i4.png' onClick=delli('tasklist','q"+num+"')></li></ul></div></li>"
		box.appendChild(objli)
		objli.id="q"+num
	    objli.className="qcss"
		objli.onmouseover=function() {showqubtn(objli.id)}
		objli.onmouseout=function() {hiddenbtn(objli.id)}
		objli.innerHTML=onemusic
		break;
		
		case "onevideo"://视频
		var objli = document.createElement("ul");
		var num=box.getElementsByClassName("qcss").length+1
		var onevideo="<li id='t"+num+"' class='atline'><div><ul><li class='left'>Q"+num+"<input type='text' value='视频' class='input1' onFocus=this.className='input2' onBlur=this.className='input1' onMouseOver=this.className='input3' onMouseOut=this.className='input1'></li><li class='right' id='btn0' style='display:none'><img src='images/i4.png' onClick=delli('tasklist','q"+num+"')></li></ul></div></li>"
		box.appendChild(objli)
		objli.id="q"+num
	    objli.className="qcss"
		objli.onmouseover=function() {showqubtn(objli.id)}
		objli.onmouseout=function() {hiddenbtn(objli.id)}
		objli.innerHTML=onevideo
		break;
		}
	}