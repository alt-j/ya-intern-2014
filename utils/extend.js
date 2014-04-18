/**
 * utility for realization extend for objects
 */
API.utils.extend = function (Child, Parent) {
    var F = function () { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.parent = Parent.prototype;
};