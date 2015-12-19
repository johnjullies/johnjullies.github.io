var menu = document.querySelector("#menu-mobile");
menu.addEventListener("click", function(e) {
	if (menu.className == "fa fa-bars") {
		document.querySelector(".menu-hidden").style.display = "block";
		menu.className = "fa fa-times";
	}
	else {
		document.querySelector(".menu-hidden").style.display = "none";
		menu.className = "fa fa-bars";
	}
});