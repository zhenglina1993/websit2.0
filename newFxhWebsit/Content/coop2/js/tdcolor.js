/*隔行换色*/
$(function(){
	$("tr:even").css("background","#fff");
	$("tr:odd").css("background","#FCFCFC");
	$("tr").hover(function(){
	$(this).css("background","#f7fcff");
	},function(){
	$("tr:even").css("background","#fff");
	$("tr:odd").css("background","#FCFCFC");
	});
});

/*复选框全选*/
	/*window.onload = function(){
		var all_checked = document.getElementById("all_checked");
		var list = document.getElementById("container_list").getElementsByTagName("input");
		var i = 0;
		all_checked.onclick = function(){
			if(all_checked.checked){
				for(i=0;i<list.length;i++){
					list[i].checked=true;
				}
			}else{
				for(i=0;i<list.length;i++){
					list[i].checked=false;	
					}
				}
			}
	}*/