define("johnjullies/routes/index", ["exports", "ember"], function (exports, _ember) {

	var contactLinks = [{
		name: "email",
		icon: "envelope",
		url: "mailto:johnjullies@gmail.com"
	}, {
		name: "facebook",
		icon: "facebook-square",
		url: "https://www.facebook.com/johnjullies"
	}, {
		name: "linkedin",
		icon: "linkedin-square",
		url: "https://ph.linkedin.com/in/johnjullies"
	}, {
		name: "github",
		icon: "github-square",
		url: "https://github.com/johnjullies"
	}];

	exports["default"] = _ember["default"].Route.extend({
		model: function model() {
			return contactLinks;
		}
	});
});