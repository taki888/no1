!function(){app.controller("addUser",["$scope","http",function(e,t){e.user={u_name:"",u_true_name:"",u_type:"2"},e.ngDialogData&&(e.user.u_id=e.ngDialogData.u_id,e.user.u_true_name=e.ngDialogData.u_true_name,e.user.u_name=e.ngDialogData.u_name,e.user.u_type=e.ngDialogData.u_type),e.check=function(){return!!e.user.u_name||(e.error=!0,e.errorMsg="请填写用户名！",!1)},e.sub=function(){!e.loading&&e.check()&&(e.loading=!0,t.post("api/user_add.php",e.user,function(t){e.loading=!1,0==t.error?e.closeThisDialog(t):(e.error=!0,e.errorMsg=t.msg)}))}}]),app.controller("userList",["$scope","$rootScope","http","ngDialog",function(e,t,o,n){t.patchName="userList",e.checkValue=[],e.getList=function(){o.get("api/users.php",{},function(t){0==t.error&&(e.userList=t.data)})},e.delUser=function(t){if(t||e.checkValue){var a="",r={};t?(a="您确定要删除用户“"+t.u_name+"”吗？",r.u_id=t.u_id):(a="您确定要删除这些用户吗？",r.u_id=e.checkValue.join(",")),n.open({template:'<div class="confirm-dialog">                 <h2>'+a+'</h2>                <div align="center">                    <button type="button" class="btn-red" ng-click="closeThisDialog(\'CONFIRM\')">确定</button>                    <button type="button" class="btn" ng-click="closeThisDialog()">取消</button>                </div></div>',plain:!0}).closePromise.then(function(t){t.value&&"CONFIRM"==t.value&&o.post("api/user_status.php",r,function(t){0==t.error&&e.getList()})})}},e.editUser=function(t){n.open({template:"template/userDialog.html",controller:"addUser",data:t}).closePromise.then(function(t){t.value&&0==t.value.error&&e.getList()})},e.addUser=function(){n.open({template:"template/userDialog.html",controller:"addUser"}).closePromise.then(function(t){t.value&&0==t.value.error&&e.getList()})},e.getList()}])}();