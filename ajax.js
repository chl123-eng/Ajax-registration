var $={
    ajax:function(options){
    var xhr=null,
        url=options.url,
        method=options.method||"get",
        async=typeof(options.async)==="undefined"?true:options.async,
        date=options.date||null,
        params="",
        callback=options.success,
        error=options.error;
    
    for(var i in date){
        params+=i+"="+date[i]+"&";
    }

    parms=parms.replace(/&$/,"");

    if(method=="post"){
        url+="?"+params;
    }
    

    
    //创建对象
    if(typeof XMLHttpRequest!="undefined"){
        xhr=new XMLHttpRequest();
    }else if(typeof ActiveXObject!="undefined"){
        var xhrArr=['Microsoft.XMLHTTP','MSXML2.XMLHTTP.6.0','MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP.2.0'];
        var len=xhrArr.length;
        for(var i=0;i<len;i++){
            try{
                xhr=new ActiveXObject(xhrArr[i]);
                break;
            }catch(ex){

            }
        }
    }else{
        throw new Error('No XHR object availabel.');
    }
    
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if((xhr.status>=200 && xhr.status<=300)||xhr.status==304){
                callback && callback(JSON.parse(xhr.responseText));
            }else{
                error && error();
            }
        }
    }
    //创建请求
    xhr.open(method,url,async);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencode");
    xhr.send(params);
 }
};



