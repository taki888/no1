!function(){app.controller("actExpendDialog",["$scope",function(t){t.ngDialogData?t.expend=t.ngDialogData:t.expend={name:"",type:"text",val:""},t.sub=function(){t.expend.name?"select"!=t.expend.type||t.expend.val?t.closeThisDialog(t.expend):(t.error=!0,t.errorMsg="请添加选项"):(t.error=!0,t.errorMsg="请填写名称")},t.addVal={valList:[],val:""},t.expend.val&&(t.addVal.valList=t.expend.val.split(",")),t.addVal.add=function(){t.error=!1,this.val&&this.valList.push(this.val),t.expend.val=this.valList.join(","),this.val=""},t.addVal.del=function(e){t.addVal.valList.splice(t.addVal.valList.indexOf(e),1)}}]),app.controller("actEdit",["$scope","$rootScope","http","ngDialog","$state","$stateParams","$filter",function(t,e,a,d,i,l,o){e.patchName="act",t.act={hd_name:"",hd_time1:"",hd_time2:"",hd_index:1e3,hd_time_limit:720,hd_logo:"",hd_status:1,hd_expend:[]},t.actIntro=new Simditor({textarea:$("#actIntro"),toolbar:["title","bold","italic","underline","strikethrough","color","ol","ul","blockquote","code","table","link","hr","indent","outdent"]}),t.actRules=new Simditor({textarea:$("#actRules"),toolbar:["title","bold","italic","underline","strikethrough","color","ol","ul","blockquote","code","table","link","hr","indent","outdent"]}),l.id&&(t.act.hd_id=l.id,a.get("api/hd_detail.php",{id:t.act.hd_id},function(e){if(0==e.error){if(t.act.hd_name=e.data.hd_name,t.act.hd_time1=0==e.data.hd_time1?"":o("date")(1e3*e.data.hd_time1,"yyyy-MM-dd HH:mm:ss","UTC-4"),t.act.hd_time2=18e8==e.data.hd_time2?"":o("date")(1e3*e.data.hd_time2,"yyyy-MM-dd HH:mm:ss","UTC-4"),t.act.hd_logo=e.data.hd_logo,t.act.hd_status=e.data.hd_status,t.act.hd_index=e.data.hd_index,t.act.hd_time_limit=e.data.hd_time_limit,e.data.hd_zd_names)for(var a=e.data.hd_zd_names.split(","),d=e.data.hd_zd_types.split(","),i=e.data.hd_zd_vals,l=0;l<a.length;l++)t.act.hd_expend.push({name:a[l],type:d[l],val:i[l]});t.actIntro.setValue(e.data.hd_intro),t.actRules.setValue(e.data.hd_rules),t.act.hd_logo&&(t.uploadImgPreview["background-image"]="url("+t.act.hd_logo+")")}})),t.actExpend=function(e){t.dialog=d.open({template:"template/actExpendDialog.html",data:e,controller:"actExpendDialog",closeByDocument:!1,closeByEscape:!1,showClose:!1}).closePromise.then(function(a){a.value&&(e||t.act.hd_expend.push(a.value))})},t.actDelExp=function(e){t.act.hd_expend.splice(t.act.hd_expend.indexOf(e),1)},t.uploadImgPreview={"background-image":"url(images/upload-img.jpg)"},$("#file").on("change",function(){lrz(this.files[0],{quality:1}).then(function(e){t.act.img64=e.base64,t.uploadImgPreview["background-image"]="url("+e.base64+")",t.$apply()}).catch(function(t){alert("图片处理错误，请上传正确的图片")})}),t.subAct=function(){if(t.act.hd_name){if(!t.loading){t.loading=!0;var e=angular.copy(t.act);e.hd_zds=angular.toJson(t.act.hd_expend),e.hd_intro=t.actIntro.getValue(),e.hd_rules=t.actRules.getValue(),e.hd_time1=o("date")(new Date(+new Date(e.hd_time1)+432e5),"yyyy-MM-dd HH:mm:ss"),e.hd_time2=o("date")(new Date(+new Date(e.hd_time2)+432e5),"yyyy-MM-dd HH:mm:ss"),a.post("api/hd_add.php",e,function(e){t.loading=!1,0==e.error?i.go("act"):(t.error=!0,t.errorMsg=e.msg)})}}else t.error=!0,t.errorMsg="请填写活动名称"}}])}();