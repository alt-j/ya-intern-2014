/**
 * @constructor
    This is parent class of all types transport objects,
    also this class using, when type isn't declared.

    If you want to add new type of transport,
    you must create new extend of Transport in API.transports namespace.
    Notice: name of all constructors must begin with a capital letter
 *
 * @params {Object} params
    must looks like:
    {
        from: 'A',
        to: 'B',
        ...
    }
    can contain fileds 'notes', 'name'
 */
API.transports.Transport = function (params) {

    var required = ['from', 'to'],
        included = ['notes', 'name'],

        i = 0;

    this.required = this.required ? required.concat(this.required) : required;
    this.included = this.included ? included.concat(this.included) : included;

    for (i = this.required.length - 1; i >=0; i--) {
        if (params[this.required[i]]) {
            this[this.required[i]] = params[this.required[i]];
        } else {
            throw new Error('Transport params isn\'t contain required paramter: ' + this.required[i]);
        }
    }
    for (i = this.included.length - 1; i >=0; i--) {
        if (params[this.included[i]]) {
            this[this.included[i]] = params[this.included[i]];
        }
    }

};

/**
 * @method describe
    Prepare description about trip on this transport
 * @returns {String} description
 */
API.transports.Transport.prototype.describe = function () {

    return 'From ' + this.from + ' to ' + this.to +
        (this.name ? ' by ' + this.name : '') +
        (this.notes ? '. ' + this.notes : '');

};