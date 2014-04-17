/**
 * utility for realization extend for objects
 */
var extend = function (Child, Parent) {
	var F = function () { };
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.parent = Parent.prototype;
};