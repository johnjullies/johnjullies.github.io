import Ember from 'ember';

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

export default Ember.Route.extend({
  model() {
    return contactLinks;
  }
});