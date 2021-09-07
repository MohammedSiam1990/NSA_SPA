$(window).on('load', function () { 
	$('#loading').fadeOut(400, "linear");

});
$(document).ready(function () {
	new WOW().init(); 
	//$(".lang").click(function () {
	//	if ($(this).text().toLowerCase() == "en") {
	//		$('body').removeClass('ar');
	//		$(this).text("ع");
	//	}
	//	else {

	//		$('body').addClass('ar');
	//		$(this).text("EN");
	//	}
	//});
	var fullName = null;
	var authorizationUserAdminObj = localStorage.getItem('AuthorizationUserTempClient');
	if (authorizationUserAdminObj != null && authorizationUserAdminObj != undefined) {
		var parsedObj = JSON.parse(authorizationUserAdminObj);
		fullName = parsedObj.firstName + " " + parsedObj.lastName;
	}
	
	if (fullName != null && fullName.length > 0)
	{
		var hiddenClass = "d-none";
		$("#member").removeClass(hiddenClass)
		$("#memberLogin").addClass(hiddenClass);
		$("#memberWelcome").removeClass(hiddenClass);
		$("#userFullName").html(fullName);                 
	}
}); 