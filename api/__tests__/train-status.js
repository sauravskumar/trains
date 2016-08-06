//
// function googleAnalytics(){
//   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//       (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
//     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
//   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
//   ga('create','UA-41960498-1','indianrail.gov.in');
//   ga('send','pageview');
// }
// $(function(){googleAnalytics();});
//
// function _id(s){return document.getElementById(s);}
// function _name(s){return document.getElementsByName(s);}
//
// $(function(){
//   $("#railRdrBtn").on("mouseover",function(){
//     $(this).css("background-color","#FFFF22");
//   });
//   $("#railRdrBtn").on("mouseout",function(){
//     $(this).css("background-color","");
//   });
//   try{$("#homePageBtn").button();}catch(ex){}
//   $(".leftMenusOuterTbl").each(function(_i){
//     if(_i==0&&$.browser){
//       $(this).css("margin-top",$.browser.mozilla?"93px":$.browser.msie?"83px":"80px");
//     }
//     if(_i==0){
//       $(this).css("margin-bottom","5px");
//     }
//   });
//   $.ui.dialog.prototype._focusTabbable=function(){};
// });
//
// function getHHmm(n){
//   n=n%1440;
//   return (n/60).twoDig()+(n%60).twoDig();
// }
// function removeNewLineChars(text){
//   var ret='';
//   var c='';
//   for(var i=0;i<text.length;i++){
//     c=text.substring(i,i+1);
//     if(c=='\n' || c=='\r'){
//       continue;
//     }
//     ret+=c;
//   }
//   return ret;
// }
// String.prototype.trim=function(){
//   if(this==" "){
//     return "";
//   }
//   var v=" ";
//   var startInd=0;
//   var endInd=this.length;
//   for(var i=0;i<this.length;i++){
//     if(this.charAt(i)==v)startInd++;else break;
//   }
//   for(var i=this.length - 1;i >= 0;i++){
//     if(this.charAt(i)==v)endInd--;else break;
//   }
//   if(startInd==0 && endInd==this.length){
//     return this;
//   }
//   return this.substring(startInd,endInd);
// };
//
// String.prototype.twoDig=function(){return this.length==1?( "0"+this):this;};
//
// Number.prototype.twoDig=function(){var t=""+this;return t.length==1?("0"+t):t;};
//
// Error.prototype.toString=function(){
//   var str="";
//   for(p in this){str+="\n"+p+": "+this[p];}
//   return str;
// };
//
// function addArrayToDropDown(obj,txtArr,vArr,selInd){
//   var opts=obj.options;
//   for(var i=0;i<vArr.length;i++){
//     opts.add(new Option(txtArr[i],vArr[i]));
//   }
//   obj.selectedIndex=selInd;
// }
// function randomString(length){
//   var chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
//   var str="";
//   for(var x=0;x<length;x++){
//     var i=Math.floor(Math.random() * 62);
//     str+=chars.charAt(i);
//   }
//   return str;
// }
// function getDaysOfRunString(s){
//   if(s=="1111111"){
//     return " "+_LOCALE["page.week_days.daily"]+" ";
//   }
//   var ret="";
//   var d=s.substring(0,1);
//   if(d=="1"){
//     ret+=_LOCALE["page.week_days.sun"]+",";
//   }
//   d=s.substring(1,2);
//   if(d=="1"){
//     ret+=_LOCALE["page.week_days.mon"]+",";
//   }
//   d=s.substring(2,3);
//   if(d=="1"){
//     ret+=_LOCALE["page.week_days.tue"]+",";
//   }
//   d=s.substring(3,4);
//   if(d=="1"){
//     ret+=_LOCALE["page.week_days.wed"]+",";
//   }
//   d=s.substring(4,5);
//   if(d=="1"){
//     ret+=_LOCALE["page.week_days.thu"]+",";
//   }
//   d=s.substring(5,6);
//   if(d=="1"){
//     ret+=_LOCALE["page.week_days.fri"]+",";
//   }
//   d=s.substring(6,7);
//   if(d=="1"){
//     ret+=_LOCALE["page.week_days.sat"]+",";
//   }
//   if(ret.length>1){
//     ret=ret.substring(0,ret.length - 1);
//   }
//   return ret;
// }
// function getStringOfLength(str,len){
//   var ret="";
//   for(var i=0;i<len;i++){
//     if(i<str.length){
//       ret+=str.substring(i,i+1);
//     }
//     else{
//       ret+=" ";
//     }
//   }
//   return ret;
// }
// function parseDateOnly(dd_MM_yyyy){
//   var dd=parseInt(dd_MM_yyyy.substring(0,2),10);
//   var mM=parseInt(dd_MM_yyyy.substring(3,5),10);
//   var y=parseInt(dd_MM_yyyy.substring(6,10),10);
//   var date=new Date();
//   date.setFullYear(y);
//   date.setDate(dd);//http://stackoverflow.com/questions/14680396/the-date-getmonth-method-has-bug
//   date.setMonth(mM - 1);//do not change the order of above two lines of code
//   date.setMonth(mM,dd); // do not comment this line also.
//   date.setHours(0);
//   date.setMinutes(0);
//   date.setSeconds(0);
//   date.setMilliseconds(0);
//   return date;
// }
// var _MON_3_CHARS=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
// var _months3Char = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// function parseDateOnlyMon(dd_Mon_yyyy){
//   var dd=parseInt(dd_Mon_yyyy.substring(0,2),10);
//   var mon=dd_Mon_yyyy.substring(3,6).toUpperCase();
//   var mM=0;
//   for(var i=0;i<_MON_3_CHARS.length;i++){
//     if(_MON_3_CHARS[i]==mon){
//       mM=i+1;
//       break;
//     }
//   }
//   var y=parseInt(dd_Mon_yyyy.substring(7,11),10);
//   var date=new Date();
//   date.setFullYear(y);
//   date.setDate(dd);//http://stackoverflow.com/questions/14680396/the-date-getmonth-method-has-bug
//   date.setMonth(mM - 1);//do not change the order of above two lines of code
//   date.setMonth(mM,dd); // do not comment this line also.
//   date.setHours(0);
//   date.setMinutes(0);
//   date.setSeconds(0);
//   date.setMilliseconds(0);
//   return date;
// }
// function parseDateMon(dd_Mon_yyyy,hH,mm){
//   var dd=parseInt(dd_Mon_yyyy.substring(0,2),10);
//   var mon=dd_Mon_yyyy.substring(3,6).toUpperCase();
//   var mM=0;
//   for(var i=0;i<_MON_3_CHARS.length;i++){
//     if(_MON_3_CHARS[i]==mon){
//       mM=i+1;
//       break;
//     }
//   }
//   var y=parseInt(dd_Mon_yyyy.substring(7,11),10);
//   var h=parseInt(hH,10);
//   var m=parseInt(mm,10);
//   var date=new Date();
//   date.setFullYear(y);
//   date.setDate(dd);//http://stackoverflow.com/questions/14680396/the-date-getmonth-method-has-bug
//   date.setMonth(mM - 1);//do not change the order of above two lines of code
//   date.setHours(h);
//   date.setMinutes(m);
//   date.setSeconds(0);
//   date.setMilliseconds(0);
//   return date;
// }
// function getMonToMMDate(dd_Mon_yyyy,separator1,separator2){
//   var arr=dd_Mon_yyyy.split(separator1);
//   var mm="",mon=arr[1].toUpperCase();
//   for(var i=0;i<_MON_3_CHARS.length;i++){
//     if(_MON_3_CHARS[i]==mon){
//       mm=(i+1).twoDig();
//       break;
//     }
//   }
//   return parseInt(arr[0],10).twoDig()+separator2+mm+separator2+arr[2];
// }
// function parseDate(dd_MM_yyyy,hH,mm){
//   var dd=parseInt(dd_MM_yyyy.substring(0,2),10);
//   var mM=parseInt(dd_MM_yyyy.substring(3,5),10)-1;
//   var y=parseInt(dd_MM_yyyy.substring(6,10),10);
//
//   var h=parseInt(hH,10);
//   var m=parseInt(mm,10);
//   var date=new Date();
//   date.setFullYear(y);
//
//   date.setDate(dd);//http://stackoverflow.com/questions/14680396/the-date-getmonth-method-has-bug
//   date.setMonth(mM);//do not change the order of above two lines of code.
//   date.setMonth(mM,dd); // do not comment this line also.
//
//   date.setHours(h);
//   date.setMinutes(m);
//   date.setSeconds(0);
//   date.setMilliseconds(0);
//   return date;
// }
//
// function startBlink(objId,seconds){
//   var o=_id(objId);
//   var blinkFun=function(){
//     o.style.visibility=o.isHidden?"hidden":"visible";
//     o.isHidden=o.isHidden?false:true;
//   };
//   if(o.blinkIntervalId){
//     clearInterval(o.blinkIntervalId);
//   }
//   o.blinkIntervalId=setInterval(blinkFun,seconds);
// }
// function stopBlink(objId){
//   var o=_id(objId);
//   if(o.blinkIntervalId){
//     clearInterval(o.blinkIntervalId);
//   }
// }
// function removeCloseToolTipFromDialog(){
//   var tooltipObjArr=[];
//   for(var i=0;i<10;i++){
//     try{
//       var tooltipId="ui-tooltip-"+i;
//       var tooltipObjI=_id(tooltipId);
//       if(tooltipObjI){
//         if($("#"+tooltipId+" .ui-tooltip-content").html().toLowerCase()=="close"){
//           tooltipObjArr[tooltipObjArr.length]=tooltipObjI;
//           tooltipObjI.style.display="none";
//         }
//       }
//     }
//     catch(ex){
//     }
//   }
// }
// function showPlzWait(){
//   var dialog=null;
//   var show=true;
//   var statusMsgId="plzWaitSttsMsg"+new Date().getTime();
//   var html="<table width=90% height=90% cellspacing=0 cellpadding=0 border=0><tbody><TR><TD align=center valign=middle style=\"vertical-align:middle;text-align:center;\"><img width=25px height=25px src='imgs/plzWait.gif' align=middle><BR><div id="+statusMsgId+">"+_LOCALE["page.show_plz_wait.msg"]+"</div></TD></TR></tbody></table>";
//   hidePageScroll();
//   var showOnTop=-1;
//   dialog=$("<DIV title='"+_LOCALE["page.show_plz_wait"]+"' style='text-align:center;'>"+html+"</DIV>").dialog({
//     modal: true,
//     width: 200,
//     height: 150,
//     close: function(){
//       if(show){
//         dialog.dialog("open");
//       }
//       else{
//         showPageScroll();
//         clearInterval(showOnTop);
//       }
//     }
//   });
//   var obj ={
//     hide: function(){
//       show=false;
//       try{dialog.dialog("close");} catch(ex){}
//       try{dialog.dialog("destroy");} catch(ex){}
//       showPageScroll();
//     },
//     dialog: dialog,
//     setStatus: function(msg){
//       if(msg==null || msg.trim()==""){
//         msg="&nbsp;";
//       }
//       $("#"+statusMsgId).html(msg);
//     }
//   };
//   showOnTop=setInterval(function(){
//     dialog.dialog("open");
//   },2000);
//   setTimeout("try{removeCloseToolTipFromDialog();}catch(ex){}",1);
//   return obj;
// }
// function showAlert(title,msgHTML,timeout,onDestroy){
//   var dialog=null;
//   var destroyDialog=null;
//   destroyDialog=function(){
//     try{
//       dialog.dialog("destroy");
//       if(onDestroy)onDestroy();
//     } catch(ex){}
//     onDestroy=function(){};// Make it a blank function to prevent calling more than once.
//     showPageScroll();
//   };
//   hidePageScroll();
//   var htmlObj=$("<div title='"+(title && title.length && title.length>0?title:_LOCALE["page.show_alert.alert"])+"' style='text-align:center;'><font size=+2><B>"+msgHTML+"</B></font><BR><BR></div>");
//   dialog=$(htmlObj).dialog({
//     modal: true,
//     width: 500,
//     height: 300,
//     close: function(){
//       setTimeout(function(){
//           destroyDialog();
//         },
//         1);
//     }
//   });
//   var btn=document.createElement("Button");
//   btn.innerHTML="OK";
//   btn.onclick=function(){setTimeout(function(){
//     destroyDialog();
//   },1);
//   };
//   $(btn).appendTo(htmlObj);
//   $(btn).button();
//   btn.style.fontSize="18px";
//   setTimeout(destroyDialog,timeout);
// }
// function showError(xhr,type){
//   if(type=="timeout"){
//     showAlert("Error","<font size=-1 color=red>"+_LOCALE["page.show_error.req_time_out"]+"</font><BR>"+_LOCALE["page.show_error.contact_139"],60000,null);
//   }
//   else{
//     showAlert("Error","<font size=-1 color=red>"+_LOCALE["page.show_error.http_error"]+": "+xhr.status+"<BR>"+xhr.statusText+"</font><BR><BR>"+_LOCALE["page.show_error.contact_139"],600000,null);
//   }
// }
// function disableBackBtn(){
//   $(document.getElementsByTagName("BODY")[0]).on("keydown",function(event){
//     var e=event || window.event;
//     var keyASCII=parseInt(e.keyCode,10);
//     var src=e.target || e.srcElement;
//     var tag=src.tagName.toUpperCase();
//     if(keyASCII==8){
//       if(src.readOnly || src.disabled || (tag != "INPUT" && tag != "TEXTAREA")){
//         return false;
//       }
//       if(src.type){
//         var type=(""+src.type).toUpperCase();
//         return type != "CHECKBOX" && type != "RADIO" && type != "BUTTON";
//       }
//     }
//     return true;
//   });
// }
// function hidePageScroll(){
//   //$(document.getElementsByTagName("body")[0]).css("overflow-y","hidden");
// }
// function showPageScroll(){
//   //$(document.getElementsByTagName("body")[0]).css("overflow-y","auto");
// }
// function getDelayMinuteStr(mins){
//   var bt=false;
//   if(mins<0){
//     //bt=true;
//     //mins=-mins;
//     mins=0;// Make right time
//   }
//   if(mins==0){
//     return "(<font color=green>"+_LOCALE["page.delay_min_str.right_time"]+"</font>)";
//   }
//   if(mins<60){
//     if(bt){
//       return "(<font color=green><B><span class=delayHHmm>"+mins+"</span> "+_LOCALE["page.delay_min_str.min"]+" "+_LOCALE["page.delay_min_str.before_time"]+"</B></font>)";
//     }
//     else{
//       return "(<font color=red><B><span class=delayHHmm>"+mins+"</span> "+_LOCALE["page.delay_min_str.min"]+" "+_LOCALE["page.delay_min_str.late"]+"</B></font>)";
//     }
//   }
//   else if(mins<1440){
//     if(bt){
//       return "(<font color=green><B><span class=delayHHmm>"+parseInt(mins / 60)+"</span> "+_LOCALE["page.delay_min_str.hr"]+" <span class=delayHHmm>"+(mins % 60).twoDig()+"</span> "+_LOCALE["page.delay_min_str.min"]+" "+_LOCALE["page.delay_min_str.before_time"]+"</B></font>)";
//     }
//     else{
//       return "(<font color=red><B><span class=delayHHmm>"+parseInt(mins / 60)+"</span> "+_LOCALE["page.delay_min_str.hr"]+" <span class=delayHHmm>"+(mins % 60).twoDig()+"</span> "+_LOCALE["page.delay_min_str.min"]+" "+_LOCALE["page.delay_min_str.late"]+"</B></font>)";
//     }
//   }
//   else{
//     var day=parseInt(mins / 1440,10);
//     mins=mins % 1440;
//     if(bt){
//       return "(<font color=green><B><span class=delayHHmm>"+day+"</span> "+_LOCALE["page.delay_min_str.days"]+" <span class=delayHHmm>"+parseInt(mins / 60)+"</span> "+_LOCALE["page.delay_min_str.hr"]+" <span class=delayHHmm>"+(mins % 60).twoDig()+"</span> "+_LOCALE["page.delay_min_str.min"]+" "+_LOCALE["page.delay_min_str.before_time"]+"</B></font>)";
//     }
//     else{
//       return "(<font color=red><B><span class=delayHHmm>"+day+"</span> "+_LOCALE["page.delay_min_str.days"]+" <span class=delayHHmm>"+parseInt(mins / 60)+"</span> "+_LOCALE["page.delay_min_str.hr"]+" <span class=delayHHmm>"+(mins % 60).twoDig()+"</span> "+_LOCALE["page.delay_min_str.min"]+" "+_LOCALE["page.delay_min_str.late"]+"</B></font>)";
//     }
//   }
// }
// function getTrainTypeDisp(trnType){
//   var ret=_LOCALE["train_type."+trnType];
//   if(ret){
//     return ret;
//   }
//   return trnType;
// }
// function setArrDepTimeLocale(){
//   $(".arrDepTime").each(function(_i){
//     if(!this.changedLocale){
//       if(_LANG != "en-us"){
//         this.style.fontWeight="normal";
//         var val=this.innerHTML;
//         var changedVal=getNumberLocale(val);
//         this.innerHTML=changedVal;
//       }
//       this.changedLocale=true;
//     }
//   });
// }
// function setDelayTimeLocale(){
//   $(".delayHHmm").each(function(_i){
//     if(!this.changedLocale){
//       if(_LANG != "en-us"){
//         var val=this.innerHTML;
//         var changedVal=getNumberLocale(val);
//         this.innerHTML=changedVal;
//       }
//       this.changedLocale=true;
//     }
//   });
// }
// function setDistanceKmsLocale(){
//   $(".kilometers").each(function(_i){
//     if(!this.changedLocale){
//       if(_LANG != "en-us"){
//         var val=this.innerHTML;
//         var changedVal=getNumberLocale(val);
//         this.innerHTML=changedVal;
//       }
//       this.changedLocale=true;
//     }
//   });
// }
// function setDayCntLocale(){
//   $(".dayCnt").each(function(_i){
//     if(!this.changedLocale){
//       if(_LANG != "en-us"){
//         var val=this.innerHTML;
//         var changedVal=getNumberLocale(val);
//         this.innerHTML=changedVal;
//       }
//       this.changedLocale=true;
//     }
//   });
// }
// function setSrlNoLocale(){
//   $(".srlNo").each(function(_i){
//     if(!this.changedLocale){
//       if(_LANG != "en-us"){
//         var val=this.innerHTML;
//         var changedVal=getNumberLocale(val);
//         this.innerHTML=changedVal;
//       }
//       this.changedLocale=true;
//     }
//   });
// }
// function setTrainNoLocale(){
//   $(".trainNo").each(function(_i){
//     if(!this.changedLocale){
//       if(_LANG != "en-us"){
//         var val=this.innerHTML;
//         var changedVal=getNumberLocale(val);
//         this.innerHTML=changedVal;
//       }
//       this.changedLocale=true;
//     }
//   });
// }
// var _USE_HINDI_NUMS=false;
// function getNumberLocale(val){
//   if(_LANG=="en-us"){
//     return val;
//   }
//   if(!_USE_HINDI_NUMS){
//     return val;
//   }
//   var ret="";
//   for(var i=0;i<val.length;i++){
//     c=val.substring(i,i+1);
//     if(c=="0"){
//       ret+="\u0966";
//     }
//     else if(c=="1"){
//       ret+="\u0967";
//     }
//     else if(c=="2"){
//       ret+="\u0968";
//     }
//     else if(c=="3"){
//       ret+="\u0969";
//     }
//     else if(c=="4"){
//       ret+="\u096A";
//     }
//     else if(c=="5"){
//       ret+="\u096B";
//     }
//     else if(c=="6"){
//       ret+="\u096C";
//     }
//     else if(c=="7"){
//       ret+="\u096D";
//     }
//     else if(c=="8"){
//       ret+="\u096E";
//     }
//     else if(c=="9"){
//       ret+="\u096F";
//     }
//     else ret+=c;
//   }
//   return ret;
// }
// var _mons=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
// var _hinMons=["à¤œà¤¨.","à¤«à¤°.","à¤®à¤¾à¤°à¥à¤š","à¤…à¤ªà¥à¤°à¥ˆà¤²","à¤®à¤ˆ","à¤œà¥‚à¤¨","à¤œà¥à¤²à¤¾à¤ˆ","à¤…à¤—.","à¤¸à¤¿à¤¤.","à¤…à¤•à¥à¤Ÿà¥‚.","à¤¨à¤µ.","à¤¦à¤¿à¤¸."];
// var _nums=["0","1","2","3","4","5","6","7","8","9"];
// var _hinNums=["à¥¦", "à¥§","à¥¨","à¥©","à¥ª","à¥«","à¥¬","à¥­","à¥®","à¥¯"];
// function getDDMonLocale(val){
//   if(_LANG=="en-us"){
//     return val;
//   }
//   val=val.toUpperCase();
//   if(_USE_HINDI_NUMS){
//     var ret="";
//     for(var i=0;i<val.length;i++){
//       c=val.substring(i,i+1);
//       var found=false;
//       for(var j=0;j<_nums.length;j++){
//         if(c==_nums[j]){
//           ret+=_hinNums[j];
//           found=true;
//         }
//       }
//       if(!found){
//         ret+=c;
//       }
//     }
//     val=ret;
//   }
//   for(var i=0;i<_mons.length;i++){
//     val=val.replace(_mons[i],_hinMons[i]);
//   }
//   return val;
// }
// function changeddMonDateLocale(){
//   $(".ddMonDate").each(function(indx){
//     if(!this.localeChanged && _LANG != "en-us"){
//       var val=this.innerHTML.toUpperCase();
//       this.innerHTML=getDDMonLocale(val);
//       this.localeChanged=true;
//     }
//   });
// }
// function lastUpdatedStr(updTime){
//   updTime=""+updTime;
//   if(updTime.trim().toUpperCase()=="NOT GIVEN"){
//     return _LOCALE["fulltrninst.update_not_given"];
//   }
//   return "<span class=ddMonDate>"+updTime+"</span>";
// }
// function clearInput(obj){
//   if(obj && obj.value){
//     obj.value="";
//   }
// }
// var _wkdaysIncrDecr=["SU","MO","TU","WE","TH","FR","SA"];
// function incrWeekDay(day,cnt){
//   day=day.trim();
//   if(day.length>2){
//     day=day.substring(0,2);
//   }
//   day=day.toUpperCase();
//   if(cnt<0){
//     cnt=7 - ((-cnt)%7);
//   }
//   else{
//     cnt=cnt % 7;
//   }
//   var weekDayIndx=-1;
//   for(var i=0;i<_wkdaysIncrDecr.length;i++){
//     if(_wkdaysIncrDecr[i]==day){
//       weekDayIndx=i;
//       break;
//     }
//   }
//   return _wkdaysIncrDecr[(weekDayIndx+cnt)%7];
// }
// function setLanguage(lang){
//   var fun=function(txt){location.reload();};
//   $.ajax({url:"ajaxJSPs/_changeLang.jsp?langFile="+lang+"&t="+new Date().getTime(),success:fun,error:fun});
// }
// function getWeekDay3Char(wkDayStr){
//   wkDayStr=wkDayStr.trim();
//   if(wkDayStr.length>3){
//     wkDayStr=wkDayStr.substring(0,3);
//   }
//   wkDayStr=wkDayStr.toUpperCase();
//   if(wkDayStr=="MON"){
//     return _LOCALE["page.week_days.mon"];
//   }
//   else if(wkDayStr=="TUE"){
//     return _LOCALE["page.week_days.tue"];
//   }
//   else if(wkDayStr=="WED"){
//     return _LOCALE["page.week_days.wed"];
//   }
//   else if(wkDayStr=="THU"){
//     return _LOCALE["page.week_days.thu"];
//   }
//   else if(wkDayStr=="FRI"){
//     return _LOCALE["page.week_days.fri"];
//   }
//   else if(wkDayStr=="SAT"){
//     return _LOCALE["page.week_days.sat"];
//   }
//   else if(wkDayStr=="SUN"){
//     return _LOCALE["page.week_days.sun"];
//   }
//   return "";
// }
// var startIamAlive = function(){
//   var timeout=5*60000;
//   var fun=function(str){setTimeout(startIamAlive,timeout);};
//   $.ajax({url:"IamAlive?t="+new Date().getTime(),success:fun,error:function(s){timeout=60000;fun(s);}});
// };
// startIamAlive();
// $(function() {
//   try {
//     //if(detectIE() && _LANG == 'hi-in') {
//     //alert("IE hindi");
//     //}
//   }catch(ex){}
// });
// function detectIE() {
//   var ua = window.navigator.userAgent;
//
//   var msie = ua.indexOf('MSIE ');
//   if (msie > 0) {
//     // IE 10 or older => return version number
//     return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
//   }
//
//   var trident = ua.indexOf('Trident/');
//   if (trident > 0) {
//     // IE 11 => return version number
//     var rv = ua.indexOf('rv:');
//     return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
//   }
//
//   var edge = ua.indexOf('Edge/');
//   if (edge > 0) {
//     // Edge (IE 12+) => return version number
//     return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
//   }
//
//   // other browser
//   return false;
// }
//
// _LANG="en-us";
// _LOCALE={
//   "trnrun.legend.trn_at_this_stn":"Train is at this station",
//   "tab.trains_bw_stns.clear_via_stn_btn.txt":"Remove Via Station",
//   "dvrtd_trns.trn_type":"Train type",
//   "trninst.cur_stn_stts.txt":"Current position",
//   "page.hdng.title":"National Train Enquiry System",
//   "tab.trains_bw_stns.from_via.hdng.lbl.3":"via station",
//   "cncld_trns.fully.tab":"Fully Cancelled Trains",
//   "tab.trains_bw_stns.from_via.hdng.lbl.4":"",
//   "tab.trains_bw_stns.from_via.hdng.lbl.1":"Train Between stations",
//   "tab.trains_bw_stns.from_via.hdng.lbl.2":"and",
//   "bing_map.trn_info.dep_at_txt.2":"",
//   "trains_sch_future.tbl.hdng.dist.tooltip.1":"Distance from source",
//   "page.show_plz_wait":"Please wait..",
//   "trains_sch_future.tbl.hdng.dist.tooltip.2":"in Kilometers",
//   "nasik_kumbh.mstr.tbl.hdng.halt":"Halt (Minutes)",
//   "page.left_menu.down.seat_berth_avail":"Seat/berth availability",
//   "bing_map.trn_info.dep_at_txt.1":"Departure at",
//   "tab.trains_bw_stns.clear_btn.txt":"Clear",
//   "nasik_kumbh.mstr.stn_list.hdng":"Nasik Kumbh serving stations",
//   "fog.tbls.data.event.departure":"Departed at",
//   "hrtg.dyn.num_trains_showing":"trains showing",
//   "viastn.tbl.txt.right_time.tooltip":"RIGHT TIME",
//   "trnrun.legend.exp_time_arr":"Expected time of arrival",
//   "tab.trains_bw_stns.hdng":"Click at train number to view schedule and running",
//   "bing_map.trn_info.dstn_txt":"Destination",
//   "trninst.train.started":"started",
//   "cncld_trns.partial.tbl.hdng.src.tooltip":"Train source",
//   "tab.trains_bw_stns.tbl.hdng.to":"To",
//   "train_type.PRUM":"PREMIUM",
//   "sbrml.dyn.stn_list.hdng":"Sabarimala stations",
//   "fulltrninst.tbl.hdng.sch_dep":"Sch Dep",
//   "viastn.tbl.hdng.train_name":"Train name",
//   "alltrninst.last_updtd":"Last updated station",
//   "tab.train.sch_arr":"Sch Arr",
//   "cncld_trns.fully.tbl.hdng.train_no":"Train No",
//   "rschld_trns.refresh_train_list":"Refresh Train List",
//   "fog.cur_stts.tbl.hdng.dstn":"Destination",
//   "fulltrninst.tbl.hdng.dist":"Distance",
//   "fog.cur_stts.tbl.hdng.basic_det_of_trn":"Detail of train",
//   "trninst.train.querd_stn_msg.exp_arr":"Expected Arrival",
//   "rschld_trns.tbl.hdng.rschld_by":"Rescheduled by",
//   "dvrtd_trns.tbl.hdng.src.tooltip":"Train source",
//   "hrtg.mstr.tbl.hdng.train_name":"Train name",
//   "tab.trains_diverted":"Diverted",
//   "fog.page.no_rcrd_in_filter_found":"No Record for This Filter",
//   "trninst.querd_stn_stts.txt":"Status",
//   "hrtg.dyn.no_trn_for_filter":"No train found for the given filter",
//   "sbrml.dyn.clear_btn.txt":"Clear",
//   "tab.station.tooltip":"Trains coming to/leaving a station",
//   "trn_sch.tbl.hdng.dist.tooltip.2":"in Kilometers",
//   "tab.spl_trains.tbl.hdng.dep.tooltip":"Departure",
//   "trnrun.legend.ua":"U.A.",
//   "trn_sch.tbl.hdng.dist.tooltip.1":"Distance from source",
//   "tab.trains_bw_stns.dir_trns.lbl.4":"",
//   "tab.trains_bw_stns.dir_trns.lbl.3":"going via",
//   "tab.trains_bw_stns.dir_trns.lbl.2":"and",
//   "trninst.train.cur_stn_msg.act_dep":"Actual Departure",
//   "tab.trains_bw_stns.dir_trns.lbl.1":"Direct trains between",
//   "train_type.SHATABDI":"SHATABDI",
//   "trninst.train.reaches":"Reaches",
//   "trains_sch_future.vld_from.txt.vldt":"Validity of Train Schedule:",
//   "viastn.tbl.txt.no_record_found":"No record found",
//   "tab.train.journey_date.lbl":"Journey/Boarding/Arrival date",
//   "nasik_kumbh.dyn.clear_btn.txt":"Clear",
//   "fulltrninst.diverted_msg.2":"and",
//   "trninst.train.cur_stn_msg.ahead":"ahead of",
//   "fulltrninst.diverted_msg.3":"stations.",
//   "fog.tbls.data.event.passed":"Departed at",
//   "fulltrninst.diverted_msg.1":"This train is diverted between",
//   "dvrtd_trns.tbl.hdng.train_no":"Train No",
//   "train_type.SUBURBAN":"SUBURBAN",
//   "tab.station":"Live Station",
//   "viastn.tbl.txt.source":"Source",
//   "trninst.train.train_cancelled_msg":"The train is cancelled.",
//   "trnrun.legend.right_time":"Right time",
//   "viastn.tbl.txt.dstn":"Destination",
//   "page.week_days.sun":"Sun",
//   "alltrninst.passed_at.2":"",
//   "alltrninst.passed_at.1":"Passed at",
//   "sbrml.mstr.tbl.hdng.dep_time":"Dep. Time",
//   "fog.tabs.dvrtd_trns.txt":"Diverted Trains",
//   "sbrml.dyn.refresh_btn.txt":"Refresh Train Lists",
//   "nasik_kumbh.mstr.tbl.hdng.srl_no":"Srl",
//   "dvrtd_trns.tbl.hdng.start_date":"Start date",
//   "hrtg.mstr.clear_btn.txt":"Clear",
//   "trnrun.legend.rt":"RT",
//   "fulltrninst.diverted.show_dvrtd_route_btn.txt":"Show unTravelled route",
//   "viastn.hdng.going_to.2":"",
//   "rschld_trns.tbl.hdng.train_name":"Train name",
//   "viastn.hdng.going_to.1":"Going to",
//   "fulltrninst.tbl.hdng.eta":"ETA",
//   "hrtg.dyn.stn_list.hdng":"Heritage stations",
//   "fulltrninst.tbl.hdng.etd":"ETD",
//   "cncld_trns.partial.tbl.hdng.cncld_from":"Cancelled from",
//   "train_type.LUXURY":"LUXURY",
//   "trnrun.legend_desc.txt":"Description",
//   "dvrtd_trns.tbl.hdng.train_type":"Train type",
//   "hrtg.mstr.tbl.hdng.arr_time":"Arr. Time",
//   "page.hdng.railway_logo.tooltip":"Indian Railway",
//   "fulltrninst.refreshing_btn.txt":"Refreshing..",
//   "page.hdng.ashok_emblem.tooltip":"National Portal of India",
//   "tab.train.trn_sch.lbl":"Train Schedule",
//   "trninst.querd_stn_stts.yet_to_come":"Yet to arrive",
//   "cncld_trns.partial.tbl.hdng.dstn":"Destination",
//   "fog.page.no_rcrd_found":"No Record Found",
//   "fulltrninst.tbl.hdng.dist.tooltip.1":"Distance from source",
//   "fulltrninst.tbl.hdng.dist.tooltip.2":"in Kilometers",
//   "page.last_srch.trns_on_a_stn_srch.hdr":"Last searched station",
//   "page.delay_min_str.right_time":"Right time",
//   "page.week_days.tue":"Tue",
//   "tab.train.validity_msg.txt.1":"This train will be valid from",
//   "train_type.MMTS":"MMTS",
//   "tab.trains_bw_stns.enter_stn_codes":"Enter station names/codes to get direct trains between stations",
//   "tab.train.validity_msg.txt.2":"",
//   "tab.spl_trains.tbl.title":"Click on train number to view running",
//   "viastn.hdng.2":"within",
//   "page.week_days.tu1":"Tu",
//   "viastn.hdng.3":"Hrs",
//   "tab.trains_bw_stns.print.trn_type":"Type of trains",
//   "train_type.DURONTO":"DURONTO",
//   "viastn.hdng.1":"Trains departing/arriving from/at station",
//   "hrtg.dyn.sel_hrtg_stn_title":"Select station to search train",
//   "hrtg.mstr.num_trains_showing":"trains showing",
//   "alltrninst.tabs.all_inst":"All Running Instances",
//   "page.last_srch.trn_srch.hdr":"Last searched trains",
//   "page.show_error.contact_139":"Please dial 139 for this train related enquiry",
//   "sbrml.mstr.tbl.hdng.train_src":"Source",
//   "hrtg.mstr.tbl.hdng.train_dstn":"Dest",
//   "fog.cur_stts.tbl.hdng.next_stn":"Next public station",
//   "trnrun.legend.cnc":"CNC",
//   "tab.train.trn_name.tooltip":"Train name",
//   "fog.cur_stts.tbl.hdng.next_pos_of_trn":"Next station",
//   "nasik_kumbh.mstr.sel_nasik_kumbh_stn_title":"Select station to search train",
//   "page.left_menu.up.spl_trains":"Special trains",
//   "fulltrninst.diverted_stn.tooltip.txt":"Diverted station",
//   "trninst.train.view_on_map.tooltip":"View train on map",
//   "trninst.querd_stn_stts.trn_not_strtd":"Train not started",
//   "trnrun.legend.querd_stn":"The queried station",
//   "sbrml.dyn.sel_sbrml_stn_title":"Select station to search train",
//   "bing_map.trn_info.last_event_txt":"Last Event",
//   "tab.train.sch_arr.tooltip":"Scheduled arrival",
//   "tab.train.trn_srch.to":"to",
//   "cncld_trns.partial.tbl.hdng.cncld_to":"Cancelled to",
//   "trnrun.legend.trn_dep_from_this_stn":"Train departed from this station",
//   "page.left_menu.up.sabrimala_trns":"Special events",
//   "page.week_days.daily":"Daily",
//   "train_type.MAIL_EXP":"MAIL EXP",
//   "fulltrninst.cur_stn.tooltip.txt.2":"",
//   "viastn.tbl.hdng.train_type":"Train type",
//   "fulltrninst.tbl.hdng.eta.tooltip":"Expected time of arrival",
//   "trninst.train.on":"on",
//   "train_type.SUVD":"SUVIDHA",
//   "fulltrninst.cur_stn.tooltip.txt.1":"Train is at",
//   "cncld_trns.partial.tbl.hdng.start_date":"Start date",
//   "tab.spl_trains.srchResultLen.txt":"trains",
//   "train_type.EMU":"EMU",
//   "sbrml.mstr.tbl.hdng.runs_on":"Runs on (Sabarimala station)",
//   "viastn.refresh_trn_list.1":"Refresh train list every",
//   "viastn.refresh_trn_list.2":"minutes",
//   "page.week_days.we1":"W",
//   "nasik_kumbh.dyn.hdng":"Trains Available in Next 4 Hours at Stations",
//   "viastn.click_at_trn_no_to_view_run":"Click at train number to view running",
//   "fulltrninst.tbl.hdng.day.tooltip":"Day, on which train reaches. Day 1 means same day; Day 2 means next day; and so on..",
//   "sbrml.mstr.sel_stn_title":"Enter your boarding / deboarding station",
//   "trninst.late_min_str.hrs":"hrs",
//   "tab.spl_trains.tbl.hdng.train_name":"Train name",
//   "page.hdng.trains_on_map.txt":"Trains on Map",
//   "sbrml.mstr.tbl.hdng.train_dstn":"Dest",
//   "tab.trains_bw_stns.print.hdr.3":"",
//   "tab.trains_bw_stns.print.hdr.2":"and",
//   "dvrtd_trns.tbl.hdng.dvrtd_from":"Diverted from",
//   "nasik_kumbh.mstr.clear_btn.txt":"Clear",
//   "sbrml.mstr.sel_sbrml_stn_sel_all":"Select All",
//   "sbrml.mstr.sel_sbrml_stn_title":"Select station to search train",
//   "trninst.cur_stn_stts.rchd_dstn":"Reached destination",
//   "page.week_days.su1":"Su",
//   "fog.refresh_btn.txt":"Refresh Train List",
//   "trn_sch.print.btn.txt":"Print train schedule",
//   "trnrun.legend.before_time":"Before time",
//   "rschld_trns.tbl.hdng.src":"Source",
//   "trninst.train.view_full_run.txt":"View full running",
//   "tab.trains_bw_stns.show_go_btn_title_succ.from_stn":"Enter 'from station name/code'",
//   "trnrun.legend.act_time_dep":"Actual time of departure",
//   "page.title":"National Train Enquiry System -Indian Railways",
//   "trninst.querd_stn_stts.rchd_dstn":"Reached destination",
//   "tab.trains_bw_stns.go_btn.txt":"Go",
//   "trains_sch_future.vld_from.txt.to":"",
//   "sbrml.dyn.hdng":"Trains Available in Next 4 Hours at Stations",
//   "bing_map.trn_info.cur_stn_txt":"Current station",
//   "alltrninst.dep_at.1":"Departure at",
//   "tab.trains_bw_stns.swap_btn.txt":"Swap",
//   "dvrtd_trns.tbl.hdng.dstn.tooltip":"Train destination",
//   "fog.srch_trn.trn_no":"Train no.",
//   "train_type.JANSHATABD":"JANSHATABDI",
//   "viastn.refresh_trn_list.not_connected_to_server":"Not connected to server",
//   "fulltrninst.tbl.hdng.day":"Sch<BR>Day",
//   "tab.trains_bw_stns.tbl.hdng.from":"From",
//   "nasik_kumbh.mstr.tbl.hdng.nasik_kumbh_stn":"Nasik Kumbh station",
//   "fog.tabs.part_cncld_trns.txt":"Partially Cancelled Trains",
//   "tab.train.new_srch":"New Search",
//   "fulltrninst.delay.bt":"BT",
//   "cncld_trns.fully.tbl.hdng.train_name":"Train name",
//   "fulltrninst.querd_stn.tooltip.has_departed.1":"Train has departed from",
//   "fulltrninst.querd_stn.tooltip.has_departed.2":"",
//   "tab.train.thr_stn.reaches.1":"Reaches",
//   "tab.train.thr_stn.reaches.2":"",
//   "tab.spl_trains.tbl.hdng.runs_on":"Runs on (From station)",
//   "hrtg.dyn.stn_wise.hdng.station":"Station",
//   "cncld_trns.partial.tbl.hdng.src":"Source",
//   "tab.train.trn_sch.lbl.tooltip.0":"Show schedule of",
//   "train_type.RAJDHANI":"RAJDHANI",
//   "page.week_days.sunday":"Sunday",
//   "tab.train.trn_sch.lbl.tooltip.1":"",
//   "rschld_trns.tbl.hdng.rschld_time":"Rescheduled time",
//   "viastn.refresh_trn_list.connected_to_server":"Connected to server",
//   "fog.cur_stts.tbl.hdng.srl_no":"Srl no.",
//   "page.left_menu.up.nasik_kumbh_trns":"Nasik kumbh Mela",
//   "viastn.tbl.hdng.dstn":"Destin<BR>ation",
//   "hrtg.mstr.stn_list_tbl.th1":"Heritage",
//   "trn_sch.tbl.hdng.sch_dep":"Sch Dep",
//   "tab.spl_trains.tbl.hdng.dstn":"Dstn",
//   "fog.cur_stts.tbl.hdng.cur_stn":"Last station",
//   "fog.cur_stts.tbl.hdng.train_name":"Train name",
//   "fulltrninst.cur_stn.nonstpng.tooltip.2":"",
//   "fulltrninst.cur_stn.nonstpng.tooltip.1":"Non stopping station",
//   "trains_sch_future.vld_for_long_dur":"onwards",
//   "trninst.cur_stn_stts.on_run":"On Run",
//   "cncld_trns.refresh_trn_list":"Refresh Train List",
//   "hrtg.mstr.stn_list_tbl.th2":"Stations",
//   "tab.trains_bw_stns.input1.lbl":"From",
//   "cncld_trns.partial.tbl.hdng.train_type":"Train type",
//   "nasik_kumbh.mstr.tbl.hdng.train_name":"Train name",
//   "nasik_kumbh.mstr.tbl.hdng.train_src":"Source",
//   "tab.train.thr_stn.sch_dep.tooltip":"Scheduled Departure",
//   "trains_sch_future.future_start_date":"Starts on",
//   "page.left_menu.up.fog":"Fog affected trains",
//   "train_type.PASS":"PASSENGER",
//   "viastn.enter_stn.lbl.hrs":"Hrs.",
//   "trn_sch.tbl.hdng.station":"Station",
//   "tab.trains_bw_stns.print.hdr.1":"Trains between stations",
//   "viastn.tbl.hdng.eta.tooltip":"Expected time of arrival",
//   "cncld_trns.fully.tbl.hdng.dstn":"Train destination",
//   "fulltrninst.tbl.hdng.atd.tooltip":"Actual time of departure",
//   "fog.cur_stts.tbl.hdng.start_date":"Start date",
//   "tab.spl_trains.tbl.hdng.train_no":"Train No",
//   "train_type.YUVA":"YUVA",
//   "cncld_trns.fully.tbl.hdng.start_date":"Start date",
//   "hrtg.mstr.hdng":"Trains for Heritage Stations",
//   "fog.srch_trn.trn_name":"Train name",
//   "page.delay_min_str.late":"Late",
//   "train_type.SUPERFAST":"SUPERFAST",
//   "nasik_kumbh.mstr.tbl.hdng.arr_time":"Arr. Time",
//   "trn_sch.tbl.hdng.sch_arr.tooltip":"Scheduled Arrival time",
//   "nasik_kumbh.dyn.num_trains_showing":"trains showing",
//   "tab.trains_bw_stns.trn_count.trains":"Trains",
//   "fulltrninst.refresh_btn.tooltip.txt":"Refresh train running",
//   "train_type.RAJ":"RAJDHANI",
//   "train_type.ALL_PAS":"ALL PASSENGER",
//   "rschld_trns.tbl.hdng.start_date":"Start date",
//   "trains_sch_future.no_sch_found.title":"No schedule for given date",
//   "trninst.train.querd_stn_msg.txt":"Queried Station",
//   "train_type.MEX":"MAIL EXP",
//   "tab.trains_bw_stns.tbl.hdng.arr":"Arr.",
//   "rschld_trns.train_type":"Train type",
//   "page.week_days.fr":"Fr",
//   "alltrninst.starts.2":"",
//   "tab.trains_rescheduled":"Rescheduled",
//   "alltrninst.starts.1":"Start date",
//   "trnrun.legend.cancelled":"Cancelled at this station",
//   "page.week_days.monday":"Monday",
//   "nasik_kumbh.dyn.no_trn_for_filter":"No train found for the given filter",
//   "tab.spl_trains.tbl.hdng.valid_from":"Valid from",
//   "tab.spl_trains.refresh_btn.txt":"Refresh List",
//   "tab.spl_trains.tbl.hdng.dep":"Dep.",
//   "train_type.ORDINARY":"ORDINARY",
//   "dvrtd_trns.refresh_trn_list":"Refresh Train List",
//   "trninst.train.short_orig_msg.4":"this day.",
//   "fog.tabs.cur_stts.txt":"Running Train Status",
//   "viastn.enter_stn.to_stn.lbl":"Going to (Optional)",
//   "trninst.train.short_orig_msg.5":"Total journey",
//   "trninst.train.short_orig_msg.2":"this day.",
//   "trninst.train.short_orig_msg.3":"Will not go via selected station",
//   "train_type.HSP":"HOLIDAY SPL",
//   "page.excp_trns.srch_trns.txt":"Search train",
//   "alltrninst.yet_to_start.2":"",
//   "alltrninst.yet_to_start.1":"Yet to start from source at",
//   "trninst.train.short_orig_msg.1":"This Train is scheduled to start from station",
//   "trninst.train.view_on_map.txt":"View on map",
//   "page.delay_min_str.before_time":"Before time",
//   "hrtg.mstr.tbl.hdng.hrtg_stn":"Heritage stations",
//   "tab.train.trn_name.train_no":"Train No.",
//   "page.show_error.req_time_out":"Request Time Out",
//   "viastn.tbl.hdng.exp_pf_no":"Exp.<BR>PF",
//   "viastn.tbl.hdng.sch_arr":"Scheduled arrival",
//   "viastn.tbl.hdng.delay_dep":"Delay in departure",
//   "tab.trains_bw_stns.show_go_btn_title_succ.to_stn":"Enter 'to station name/code'",
//   "nasik_kumbh.mstr.sel_stn_title":"Enter your boarding / deboarding station",
//   "viastn.tbl.hdng.exp_pf_no.title":"Expected platform No.",
//   "fog.num_trains_showing":"train showing",
//   "cncld_trns.train_type":"Train type",
//   "tab.train.trn_no.tooltip":"Train number",
//   "tab.train":"Spot Your Train",
//   "page.excp_trns.srch_trns.train_no":"Train No.",
//   "train_type.SUF":"SUPERFAST",
//   "hrtg.dyn.hdng":"Trains Available in Next 4 Hours at Stations",
//   "train_type.PAS":"PASSENGER",
//   "train_type.SUB":"SUBURBAN",
//   "hrtg.dyn.sel_hrtg_stn_sel_all":"Select All",
//   "tab.trains_bw_stns.click_to_view_running.2":"<BR>at source on",
//   "sbrml.dyn.sel_sbrml_stn_sel_all":"Select All",
//   "tab.trains_bw_stns.click_to_view_running.1":"Click to view <BR> Running of",
//   "page.week_days.friday":"Friday",
//   "trninst.train.cur_stn_msg.behind":"before",
//   "viastn.tbl.txt.no_run_data":"No running data",
//   "trninst.train.indfnt_delay_msg.1":"Train is in indefinite delay between stations",
//   "trninst.train.indfnt_delay_msg.2":"and",
//   "trninst.train.indfnt_delay_msg.3":"",
//   "tab.trains_bw_stns":"Train Between Stations",
//   "trn_sch.tbl.hdng.day.tooltip":"Day, on which train reaches. Day 1 means same day; Day 2 means next day; and so on..",
//   "fog.srch_trn.strt_dt":"Start date",
//   "trnrun.legend.update_awaited":"Update awaited",
//   "tab.spl_trains.stn_search_txt":"Search train for your station code/name",
//   "trninst.train.cur_stn_msg.last_upd":"Last updated",
//   "page.delay_min_str.days":"days",
//   "cncld_trns.fully.tbl.hdng.src":"Train source",
//   "fog.tbls.data.rt":"RT",
//   "trninst.train.starting":"starting",
//   "fulltrninst.update_not_given":"Not given",
//   "tab.kms":"Kms.",
//   "nasik_kumbh.mstr.tbl.hdng.runs_on":"Runs on (Nasik Kumbh station)",
//   "page.excp_trns.srch_trns.start_date":"Start date",
//   "fulltrninst.tbl.hdng.ata.tooltip":"Actual time of arrival",
//   "trninst.train.info_not_found.at_sel_stn.1":"",
//   "tab.train.reaches.tooltip":"Destination",
//   "hrtg.mstr.refresh_btn.txt":"Refresh Train List",
//   "hrtg.mstr.sel_stn_title":"Enter your boarding / deboarding station",
//   "sbrml.dyn.no_trn_for_filter":"No train found for the given filter",
//   "train_type.DMU":"DMU",
//   "fulltrninst.querd_stn.tooltip.txt":"Queried station",
//   "page.week_days.sa":"Sa",
//   "fog.tabs.cncld_trns.txt":"Fully Cancelled Trains",
//   "nasik_kumbh.dyn.refresh_btn.txt":"Refresh Train Lists",
//   "tab.train.thr_stn.sch_arr.tooltip":"Scheduled Arrival",
//   "trninst.train.info_not_found.not_runs_on_day.1":"This train does not run from source on",
//   "fulltrninst.refresh_btn.txt":"Refresh",
//   "page.left_menu.down.seat_berth_book":"Seat/berth booking",
//   "trninst.train.info_not_found.not_runs_on_day.2":"",
//   "trn_sch.title.sch_of_trn.1":"Schedule of train",
//   "rschld_trns.tbl.hdng.dstn.tooltip":"Train destination",
//   "trn_sch.title.sch_of_trn.2":"",
//   "train_type.COMPOSITE":"COMPOSITE",
//   "alltrninst.no_instance_running.1":"No running instance of train",
//   "trninst.train.info_not_found.at_sel_stn":"at selected station",
//   "alltrninst.no_instance_running.2":"",
//   "train_type.MAILEXP":"MAIL EXP",
//   "rschld_trns.title":"Click on train number to view running",
//   "train_type.GAREEBRATH":"GARIB RATH",
//   "tab.trains_bw_stns.tbl.hdng.train_name":"Train name",
//   "fog.cur_stts.tbl.hdng.event":"Status",
//   "tab.spl_trains.tbl.hdng.valid_to":"Valid to",
//   "tab.trains_rescheduled.tooltip":"All Rescheduled trains",
//   "tab.trains_sch_future":"Train schedule",
//   "tab.trains_bw_stns.tbl.hdng.train_no":"Train No",
//   "trnrun.legend.ata":"ATA",
//   "trnrun.legend.atd":"ATD",
//   "page.week_days.saturday":"Saturday",
//   "page.delay_min_str.hr":"Hr.",
//   "sbrml.mstr.clear_btn.txt":"Clear",
//   "train_type.DARJEELING":"DARJEELING",
//   "tab.trains_bw_stns.tbl.hdng.travel_time":"Travel time",
//   "nasik_kumbh.mstr.hdng":"Trains for Nasik Kumbh Mela Serving Stations",
//   "trnrun.legend.bt":"BT",
//   "trninst.train.info_not_found.for_jdate":"for journey date",
//   "tab.spl_trains.tbl.hdng.travel_time":"Travel<BR>time",
//   "page.week_days.wed":"Wed",
//   "tab.trains_bw_stns.train_dstn":"Destination",
//   "trninst.train.cur_stn_msg.last_upd_stn":"Last updated station",
//   "hrtg.mstr.tbl.hdng.train_src":"Source",
//   "trninst.train.not_started_frm_src":"Yet to start from source",
//   "tab.train.journey_stn.lbl":"Journey/Boarding/Arrival station",
//   "alltrninst.dep_at.2":"",
//   "trn_sch.tbl.hdng.day":"Day",
//   "nasik_kumbh.dyn.stn_list.hdng":"Nasik Kumbh stations",
//   "page.left_menu.down.ios_app_dwnload":"iOS App",
//   "nasik_kumbh.dyn.stn_wise.hdng.station":"Station",
//   "page.week_days.th1":"Th",
//   "sbrml.dyn.num_trains_showing":"trains showing",
//   "trnrun.legend.txt":"Legend",
//   "tab.train.sch_arr_dep.to":"to",
//   "sbrml.mstr.tbl.hdng.train_name":"Train name",
//   "cncld_trns.partial.tbl.hdng.train_no":"Train No",
//   "viastn.tbl.txt.right_time":"RT",
//   "tab.train.thr_stn.sch_arr":"Sch Arr",
//   "dvrtd_trns.tbl.hdng.dstn":"Destination",
//   "rschld_trns.tbl.hdng.src.tooltip":"Train source",
//   "tab.trains_bw_stns.tbl.hdng.dep.tooltip":"Departure",
//   "rschld_trns.tbl.hdng.train_type":"Train type",
//   "cncld_trns.partial.title":"Cancelled Trains <BR>(Not running in a part of route)",
//   "page.last_srch.trns_bw_stns_srch.hdr":"Last searched stations",
//   "hrtg.mstr.sel_hrtg_stn_sel_all":"Select All",
//   "fulltrninst.tbl.hdng.ata":"ATA",
//   "train_type.RAIL_MOTOR":"RAIL MOTOR",
//   "bing_map.trn_info.strt_dt":"Start date",
//   "fulltrninst.tbl.hdng.atd":"ATD",
//   "bing_map.trn_info.last_upd_txt":"Last Updated",
//   "page.week_days.wednesday":"Wednesday",
//   "dvrtd_trns.hdng":"Click on train number to view running",
//   "trnrun.legend.eta":"ETA",
//   "hrtg.mstr.tbl.hdng.dep_time":"Dep. Time",
//   "nasik_kumbh.mstr.tbl.runs_on.daily":"DAILY",
//   "nasik_kumbh.mstr.tbl.hdng.train_no":"Train No",
//   "trnrun.legend.etd":"ETD",
//   "tab.train.run_day.lbl":"Runs from source",
//   "page.week_days.thursday":"Thursday",
//   "tab.trains_bw_stns.input2.lbl":"To",
//   "viastn.tbl.train_no.txt.tooltip":"Click to view running",
//   "cncld_trns.partial.tbl.hdng.train_name":"Train name",
//   "page.left_menu.down.win_app_dwnload":"Windows 8 App Available",
//   "trninst.querd_stn_stts.about_to_depart":"About to depart",
//   "sbrml.mstr.tbl.hdng.srl_no":"Srl",
//   "page.week_days.mo":"Mo",
//   "rschld_trns.tbl.hdng.dstn":"Destination",
//   "sbrml.mstr.num_trains_showing":"trains showing",
//   "trninst.querd_stn_stts.waitng_for_upd":"Waiting for update",
//   "tab.trains_bw_stns.no_dir_trains":"No direct train between selected stations",
//   "hrtg.dyn.refresh_btn.txt":"Refresh Train Lists",
//   "tab.train.thr_stn.sch_dep":"Sch Dep",
//   "hrtg.dyn.sel_stn_title":"Enter your boarding / deboarding station",
//   "trninst.train.cur_stn_msg.act_arr":"Actual Arrival",
//   "hrtg.stns.via.txt.1":"via",
//   "fog.cur_stts.tbl.hdng.train_no":"Train no.",
//   "hrtg.stns.via.txt.2":"",
//   "fulltrninst.tbl.hdng.sch_arr.tooltip":"Scheduled arrival time",
//   "tab.train.trn_type.lbl":"Train type",
//   "sbrml.mstr.tbl.hdng.train_no":"Train No",
//   "trninst.late_min_str.hr":"hr",
//   "dvrtd_trns.tbl.hdng.src":"Source",
//   "page.excp_trns.srch_trns.num_trains_showing":"trains showing",
//   "tab.train.day_no":"day",
//   "trninst.train.info_not_found":"Information not found for train no",
//   "train_type.ALL_EXP":"ALL EXPRESS",
//   "page.left_menu.up.heritage_trns":"Heritage trains",
//   "tab.train.tooltip":"Train schedule/running",
//   "trn_sch.tbl.hdng.sch_arr":"Sch Arr",
//   "tab":"-",
//   "trnrun.legend.trmntd_at_cur_stn":"Terminated at current station",
//   "fog.cur_stts.tbl.hdng.cur_pos_of_trn":"Current postion",
//   "tab.trains_bw_stns.no_record_found":"No record found",
//   "trninst.train.info_not_found.no_run_instance.1":"No running instance of train",
//   "viastn.tbl.hdng.etd.tooltip":"Expected time of departure",
//   "fog.srch_trn.srch_trn":"Search train",
//   "nasik_kumbh.mstr.tbl.hdng.train_dstn":"Dest",
//   "trninst.train.rschdld-by.msg.1":"This train is rescheduled by",
//   "trninst.train.rschdld-by.msg.2":"",
//   "trn_sch.tbl.hdng.dist":"Distance (Km.)",
//   "nasik_kumbh.dyn.sel_stn_title":"Enter your boarding / deboarding station",
//   "trninst.train":"Train",
//   "tab.trains_diverted.tooltip":"All Diverted trains",
//   "tab.trains_cancelled":"Trains Cancelled",
//   "viastn.enter_stn.lbl.within":"Within",
//   "tab.trains_bw_stns.tooltip":"Trains between any two stations",
//   "viastn.tbl.hdng.train_no":"Train No",
//   "trninst.late_min_str.days":"day",
//   "page.week_days.sat":"Sat",
//   "viastn.same_stn_err_disp":"Stations can not be same",
//   "train_type.MEMU":"MEMU",
//   "trninst.train.platform.full":"Expected platform",
//   "page.show_error.http_error":"HTTP Error",
//   "fulltrninst.tbl.hdng.stn":"Station",
//   "nasik_kumbh.mstr.tbl.hdng.dep_time":"Dep. Time",
//   "hrtg.mstr.tbl.hdng.train_no":"Train No",
//   "page.week_days.mon":"Mon",
//   "tab.trains_bw_stns.tbl.hdng.dep":"Dep",
//   "train_type.ALL":"ALL TRAIN TYPES",
//   "hrtg.mstr.tbl.hdng.runs_on":"Runs on (Heritage station)",
//   "trninst.train.platform.short":"PF",
//   "trnrun.legend.exp_time_dep":"Expected time of departure",
//   "sbrml.mstr.hdng":"Trains for Sabarimala Serving Stations",
//   "tab.trains_bw_stns.print.print_trns":"Print train list",
//   "alltrninst.train_is_running.2":"",
//   "nasik_kumbh.mstr.num_trains_showing":"trains showing",
//   "hrtg.mstr.sel_hrtg_stn_title":"Select station to search train",
//   "alltrninst.train_is_running.1":"Train is running",
//   "fog.page.title":"Status of Trains Affected Due to Fog",
//   "page.left_menu.down.android_app_dwnload":"Android App",
//   "cncld_trns.partial.tab":"Partially Cancelled Trains",
//   "trnrun.legend.exp_time_changes":"Expected Time (May likely change)",
//   "tab.train.sch_dep":"Sch Dep",
//   "page.hdng.cris_logo.tooltip_txt":"Center for railway information systems",
//   "tab.trains_cancelled.tooltip":"All Cancelled trains",
//   "dvrtd_trns.tbl.hdng.dvrtd_to":"Diverted to",
//   "tab.trains_bw_stns.from_via.lbl.1":"Trains between",
//   "tab.train.trn_input.lbl":"Enter train name/No.",
//   "tab.trains_bw_stns.from_via.lbl.3":"",
//   "trninst.train.querd_stn_msg.exp_dep":"Expected Departure",
//   "tab.trains_bw_stns.from_via.lbl.2":"and",
//   "fulltrninst.tbl.hdng.sch_arr":"Sch Arr",
//   "fulltrninst.tbl.hdng.sch_dep.tooltip":"Scheduled departure time",
//   "trnrun.legend.act_time_arr":"Actual time of arrival",
//   "page.week_days.thu":"Thu",
//   "sbrml.mstr.tbl.hdng.sbrml_stn":"Sabarimala station",
//   "train_type.LUX":"LUXURY",
//   "train_type.SPECIAL":"SPECIAL",
//   "trninst.train.short_trmn_msg.8":"Total journey",
//   "dvrtd_trns.tbl.hdng.train_name":"Train name",
//   "hrtg.mstr.tbl.hdng.halt":"Halt (Minutes)",
//   "trninst.train.short_trmn_msg.5":"Reached",
//   "viastn.tbl.hdng.sch_dep":"Scheduled departure",
//   "tab.train.sch_dep.tooltip":"Scheduled departure",
//   "trninst.train.info_not_found.no_run_instance.2":"",
//   "trninst.train.short_trmn_msg.4":"",
//   "trninst.train.short_trmn_msg.7":"",
//   "trninst.train.short_trmn_msg.6":"at",
//   "trninst.train.short_trmn_msg.1":"Train is short terminated at station",
//   "page.week_days.mo1":"M",
//   "trninst.train.short_trmn_msg.3":"Will not reach at selected station",
//   "trninst.train.short_trmn_msg.2":"",
//   "train_type.GBR":"GARIB RATH",
//   "viastn.go_btn.tooltip.1":"Show trains departing/arriving from/at station",
//   "tab.spl_trains.tbl.hdng.src.tooltip":"Train Source",
//   "viastn.go_btn.tooltip.2":"",
//   "page.hdng.title.tooltip":"Home",
//   "viastn.refresh_btn.txt":"Refresh",
//   "fulltrninst.tbl.hdng.delay":"Delay",
//   "tab.trains_bw_stns.tbl.hdng.runs_on":"Runs on (From station)",
//   "viastn.tbl.hdng.eta":"Expected arrival",
//   "fog.tbls.data.event.arrival":"Arrived&nbsp;&nbsp; at",
//   "viastn.tbl.hdng.etd":"Expected departure",
//   "tab.spl_trains.tbl.hdng.arr":"Arr.",
//   "bing_map.trn_info.arr_at_txt.1":"Arrival at",
//   "page.left_menu.down.pnr_enquiry":"PNR enquiry",
//   "sbrml.mstr.refresh_btn.txt":"Refresh Train List",
//   "bing_map.trn_info.arr_at_txt.2":"",
//   "train_type.SHT":"SHATABDI",
//   "page.week_days.fr1":"F",
//   "fulltrninst.delay.rt":"RT",
//   "sbrml.mstr.stn_list.hdng":"Sabarimala serving stations",
//   "trains_sch_future.vld_from.txt.from":"to",
//   "trains_sch_future.no_sch_found.1":"No schedule found for train",
//   "tab.spl_trains.print_btn.txt":"Print",
//   "trains_sch_future.no_sch_found.2":"which starts/started on",
//   "fog.srch_trn.trn_type":"",
//   "trains_sch_future.no_sch_found.3":"",
//   "sbrml.dyn.sel_stn_title":"Enter your boarding / deboarding station",
//   "sbrml.mstr.tbl.hdng.arr_time":"Arr. Time",
//   "page.show_alert.alert":"Alert",
//   "fulltrninst.tbl.hdng.etd.tooltip":"Expected time of departure",
//   "cncld_trns.partial.tbl.hdng.dstn.tooltip":"Train destination",
//   "page.week_days.tu":"Tu",
//   "nasik_kumbh.mstr.refresh_btn.txt":"Refresh Train List",
//   "fog.cur_stts.tbl.hdng.next_stn_arr":"Expected Arrival",
//   "trninst.train.diverted_msg.1":"Train is diverted between stations",
//   "cncld_trns.fully.title":"Fully Cancelled Trains <BR>(Not running from source to destination)",
//   "trninst.train.diverted_msg.2":"and",
//   "alltrninst.refresh_btn":"Refresh",
//   "tab.trains_bw_stns.tbl.hdng.arr.tooltip":"Arrival",
//   "trninst.train.diverted_msg.3":"",
//   "fog.cur_stts.tbl.hdng.src":"Source",
//   "trninst.train.diverted_msg.4":"Will not go via selected station",
//   "trninst.train.diverted_msg.5":"",
//   "page.week_days.tuesday":"Tuesday",
//   "train_type.PASSENGER":"PASSENGER",
//   "alltrninst.rchd_dstn":"Reached destination",
//   "sbrml.mstr.tbl.runs_on.daily":"DAILY",
//   "alltrninst.arr_at.2":"",
//   "tab.trains_bw_stns.train_src":"Train Source",
//   "page.week_days.th":"Th",
//   "alltrninst.arr_at.1":"Arrival at",
//   "tab.trains_bw_stns.via_stn.lbl":"Via Station",
//   "train_type.JSH":"JANSHATABDI",
//   "tab.spl_trains.hdng":"Special trains",
//   "tab.spl_trains.valid_for_long_period":"Valid for a long period",
//   "hrtg.mstr.tbl.hdng.srl_no":"Srl",
//   "page.week_days.su":"Su",
//   "page.left_menu.down.win_phone_app_dwnload":"Windows Phone 8 App",
//   "nasik_kumbh.dyn.sel_nasik_kumbh_stn_title":"Select station to search train",
//   "trninst.late_min_str.min":"min",
//   "trn_sch.print.close_btn.txt":"Back to main page",
//   "tab.spl_trains.tbl.hdng.dstn.tooltip":"Destination",
//   "tab.spl_trains.tbl.hdng.src":"Src",
//   "train_type.EXPRESS":"EXPRESS",
//   "nasik_kumbh.dyn.sel_nasik_kumbh_stn_sel_all":"Select All",
//   "viastn.go_btn.txt":"Go",
//   "hrtg.dyn.clear_btn.txt":"Clear",
//   "tab.spl_trains.tbl.hdng.arr.tooltip":"Arrival",
//   "tab.trains_bw_stns.tbl.hdng.train_type":"Train type",
//   "trninst.train.cur_stn_msg.rchd_dstn.txt":"Last updated station(Destination)",
//   "page.week_days.we":"We",
//   "viastn.tbl.hdng.source":"Source",
//   "viastn.enter_stn.lbl":"Enter station to get trains",
//   "fulltrninst.untravlled_stns.tooltip.1":"UnTravelled stations of train",
//   "fulltrninst.untravlled_stns.tooltip.2":"starting",
//   "fulltrninst.untravlled_stns.tooltip.3":"on",
//   "trn_sch.tbl.hdng.sch_dep.tooltip":"Scheduled Departure time",
//   "fulltrninst.untravlled_stns.tooltip.4":"",
//   "page.week_days.fri":"Fri",
//   "rschld_trns.tbl.hdng.train_no":"Train No",
//   "train_type.DRN":"DURONTO",
//   "sbrml.mstr.tbl.hdng.halt":"Halt (Minutes)",
//   "page.week_days.sa1":"Sa",
//   "page.show_plz_wait.msg":"Connecting..",
//   "trninst.train.data_not_found":"Data not found for train no",
//   "viastn.tbl.hdng.delay_arr":"Delay in arrival",
//   "trninst.querd_stn_stts.has_passed":"has departed",
//   "fog.tabs.rschld_trns.txt":"Rescheduled Trains",
//   "tab.trains_bw_stns.print.close_btn":"Back to main page",
//   "bing_map.trn_info.src_txt":"Source",
//   "hrtg.mstr.tbl.runs_on.daily":"DAILY",
//   "sbrml.dyn.stn_wise.hdng.station":"Station",
//   "viastn.tbl.txt.no_run_data.desc.1":"No running data of train",
//   "viastn.tbl.txt.no_run_data.desc.3":"",
//   "viastn.tbl.txt.no_run_data.desc.2":"started/starting",
//   "nasik_kumbh.mstr.sel_nasik_kumbh_stn_sel_all":"Select All",
//   "page.delay_min_str.min":"min",
//   "train_type.DRNT":"DURONTO"};
//
// $(function () { /* a701c26c7b3510631 476224375412357434101nfa8jr5k6k30814jlcdg055e2fj nlncjlq7neldo 1110211212100120220222021122220000200210 1134224142104244043212422 23ad55dgibj8ii2 */
// });
// $(function () { /* 1gf2df2a37d9114c3eojahajmhio2n */
// });
// $(function () {/* 12311030121332000301000223123221 40832075183a326337 39df25kgifkchi 86iiicdn4bn18g227hamodo456g5 */
// });
// $(function () { /* 1985a1pjg1le4o */
// });
// $(function () {/* 5352334366605446452450 331f055f65dc3492 74b1154433306acc7 63262236080251014750 5af92a7e4dc4e673 160633201646045132146 4457b0a6g8e8e1c*/
// });
// $(function () {
//   var o = {}
//   var document = {
//     ajaxSend: function () {
//     }
//   }
//   $(document).ajaxSend(function (event, xhr, settings) {
//     o["wv90f1i54lru"] = function (name) {
//       var ret = null
//       if (document.cookie && document.cookie != '') {
//         var cookies = document.cookie.split(';')
//         for (var i = 0; i < cookies.length; i++) {
//           var cookie = jQuery.trim(cookies[i])
//           if (cookie.substring(0, name.length + 1) == (name + '=')) {
//             ret = decodeURIComponent(cookie.substring(name.length + 1))
//             break
//           }
//         }
//       }
//       return ret
//     }
//     o["1xd7a7vkucm66"] = function (url) {
//       var host = document.location.host
//       var protocol = document.location.protocol
//       var sr_origin = '//' + host
//       var origin = protocol + sr_origin
//       return (url == origin || url.slice(0, origin.length + 1) == origin + '/') || (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') || !(/^(\/\/|http:|https:).*/.test(url))
//     }
//     o["8bex8ofjftrw"] = function (method) {
//       return (/^(HEAD|OPTIONS|TRACE)$/.test(method))
//     }
//     try {
//       if (!o["8bex8ofjftrw"](settings.type) && o["1xd7a7vkucm66"](settings.url)) {
//         if (settings.url.indexOf("?") == -1) {
//           settings.url += "?"
//         } else {
//           settings.url += "&"
//         }
//         var reqVal = _name(F5UyIIUO) [0].value
//         settings.url += encodeURIComponent(F5UyIIUO) + "=" + encodeURIComponent(reqVal)
//       }
//     } catch (e) {
//     }
//     return true
//   })
// })
// $(function () {
//   var o = {}
//   var document = {
//     ajaxSend: function () {
//     }
//   }
//   $(document).ajaxSend(function (event, xhr, settings) {
//     o["1b71fuh0p1hp9"] = function (name) {
//       var ret = null
//       if (document.cookie && document.cookie != '') {
//         var cookies = document.cookie.split(';')
//         for (var i = 0; i < cookies.length; i++) {
//           var cookie = jQuery.trim(cookies[i])
//           if (cookie.substring(0, name.length + 1) == (name + '=')) {
//             ret = decodeURIComponent(cookie.substring(name.length + 1))
//             break
//           }
//         }
//       }
//       return ret
//     }
//     o["1lc3a0s9xbxgw"] = function (url) {
//       var host = document.location.host
//       var protocol = document.location.protocol
//       var sr_origin = '//' + host
//       var origin = protocol + sr_origin
//       return (url == origin || url.slice(0, origin.length + 1) == origin + '/') || (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') || !(/^(\/\/|http:|https:).*/.test(url))
//     }
//     o["16d3f5diet6em"] = function (method) {
//       return (/^(HEAD|OPTIONS|TRACE)$/.test(method))
//     }
//     try {
//       if (!o["16d3f5diet6em"](settings.type) && o["1lc3a0s9xbxgw"](settings.url)) {
//         if (settings.url.indexOf("?") == -1) {
//           settings.url += "?"
//         } else {
//           settings.url += "&"
//         }
//         var reqVal = _name(na5UiR) [0].value
//         settings.url += encodeURIComponent(na5UiR) + "=" + encodeURIComponent(reqVal)
//       }
//     } catch (e) {
//     }
//     return true
//   })
// })
// $(function () {
//   var o = {}
//   var document = {
//     ajaxSend: function () {
//     }
//   }
//   $(document).ajaxSend(function (event, xhr, settings) {
//     o["1qfupguabgshl"] = function (name) {
//       var ret = null
//       if (document.cookie && document.cookie != '') {
//         var cookies = document.cookie.split(';')
//         for (var i = 0; i < cookies.length; i++) {
//           var cookie = jQuery.trim(cookies[i])
//           if (cookie.substring(0, name.length + 1) == (name + '=')) {
//             ret = decodeURIComponent(cookie.substring(name.length + 1))
//             break
//           }
//         }
//       }
//       return ret
//     }
//     o["1ivks45jksgou"] = function (url) {
//       var host = document.location.host
//       var protocol = document.location.protocol
//       var sr_origin = '//' + host
//       var origin = protocol + sr_origin
//       return (url == origin || url.slice(0, origin.length + 1) == origin + '/') || (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') || !(/^(\/\/|http:|https:).*/.test(url))
//     }
//     o["pauoqh9etzz3"] = function (method) {
//       return (/^(HEAD|OPTIONS|TRACE)$/.test(method))
//     }
//     try {
//       if (!o["pauoqh9etzz3"](settings.type) && o["1ivks45jksgou"](settings.url)) {
//         if (settings.url.indexOf("?") == -1) {
//           settings.url += "?"
//         } else {
//           settings.url += "&"
//         }
//         var reqVal = _name(FyICv)[0].value
//         settings.url += encodeURIComponent(FyICv) + "=" + encodeURIComponent(reqVal)
//       }
//     } catch (e) {
//     }
//     return true
//   })
// })
// $(function () {
//   var o = {}
//   $(document).ajaxSend(function (event, xhr, settings) {
//     o["prybziaouae3"] = function (name) {
//       var ret = null
//       if (document.cookie && document.cookie != '') {
//         var cookies = document.cookie.split(';')
//         for (var i = 0; i < cookies.length; i++) {
//           var cookie = jQuery.trim(cookies[i])
//           if (cookie.substring(0, name.length + 1) == (name + '=')) {
//             ret = decodeURIComponent(cookie.substring(name.length + 1))
//             break
//           }
//         }
//       }
//       return ret
//     }
//     o["1scahc9n18qs1"] = function (url) {
//       var host = document.location.host
//       var protocol = document.location.protocol
//       var sr_origin = '//' + host
//       var origin = protocol + sr_origin
//       return (url == origin || url.slice(0, origin.length + 1) == origin + '/') || (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') || !(/^(\/\/|http:|https:).*/.test(url))
//     }
//     o["rorz892n969k"] = function (method) {
//       return (/^(HEAD|OPTIONS|TRACE)$/.test(method))
//     }
//     try {
//       if (!o["rorz892n969k"](settings.type) && o["1scahc9n18qs1"](settings.url)) {
//         if (settings.url.indexOf("?") == -1) {
//           settings.url += "?"
//         } else {
//           settings.url += "&"
//         }
//         var reqVal = _name(Ia5UyIIquIrg1c6GQ4MZnrj)[0].value
//         settings.url += encodeURIComponent(Ia5UyIIquIrg1c6GQ4MZnrj) + "=" + encodeURIComponent(reqVal)
//       }
//     } catch (e) {
//     }
//     return true
//   })
// })
// $(function () {
//   var o = {}
//   var document = {
//     ajaxSend: function () {
//     }
//   }
//   $(document).ajaxSend(function (event, xhr, settings) {
//     o["n9r65qws28k3"] = function (name) {
//       var ret = null
//       if (document.cookie && document.cookie != '') {
//         var cookies = document.cookie.split(';')
//         for (var i = 0; i < cookies.length; i++) {
//           var cookie = jQuery.trim(cookies[i])
//           if (cookie.substring(0, name.length + 1) == (name + '=')) {
//             ret = decodeURIComponent(cookie.substring(name.length + 1))
//             break
//           }
//         }
//       }
//       return ret
//     }
//     o["10waiixjiczkk"] = function (url) {
//       var host = document.location.host
//       var protocol = document.location.protocol
//       var sr_origin = '//' + host
//       var origin = protocol + sr_origin
//       return (url == origin || url.slice(0, origin.length + 1) == origin + '/') || (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') || !(/^(\/\/|http:|https:).*/.test(url))
//     }
//     o["1le8hi826nlm5"] = function (method) {
//       return (/^(HEAD|OPTIONS|TRACE)$/.test(method))
//     }
//     try {
//       if (!o["1le8hi826nlm5"](settings.type) && o["10waiixjiczkk"](settings.url)) {
//         if (settings.url.indexOf("?") == -1) {
//           settings.url += "?"
//         } else {
//           settings.url += "&"
//         }
//         var reqVal = _name(Ba5U3j) [0].value
//         settings.url += encodeURIComponent(Ba5U3j) + "=" + encodeURIComponent(reqVal)
//       }
//     } catch (e) {
//     }
//     return true
//   })
// })
// $(function () {
//   var o = {}
//   var document = {
//     ajaxSend: function () {
//     }
//   }
//   $(document).ajaxSend(function (event, xhr, settings) {
//     o["w2aqizftnj0d"] = function (name) {
//       var ret = null
//       if (document.cookie && document.cookie != '') {
//         var cookies = document.cookie.split(';')
//         for (var i = 0; i