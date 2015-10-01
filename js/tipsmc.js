function showtips(tt){
    var layer=document.createElement("div");
    var txt=document.createElement("div");
    layer.id="layer";
        var style={
        background:"#000",
        position:"absolute",
        zIndex:10,
        width:"500px",
        //border:"4px solid red",
        radius:"4px",
        color:"#fff",
        algin:"center",
        padding:"20px 10px"
        
    }
        leftn=(window.screen.width)/2-250
        topn=(window.screen.height)/2-150
    txt.className="tipsbox"
    txt.innerHTML=tt
    layer.appendChild(txt)
    layer.style.left=leftn+"px";
    layer.style.top=topn+"px";
    for(var i in style)
        layer.style[i]=style[i];   
    if(document.getElementById("layer")==null){
        document.body.appendChild(layer);
        setTimeout("document.body.removeChild(layer)",2000)
    }
    
    
}