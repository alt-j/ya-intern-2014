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
    if (params.from && params.to) {
        this.from = params.from;
        this.to = params.to;

        if (params.notes) {
            this.notes = params.notes;
        }
        if (params.name) {
            this.name = params.name;
        }
    } else {
        throw new Error('Transport params isn\'t contains one of the required paramters: from, to');
    }
};

/**
 * @method describe
    Prepare description about trip on this transport
 * @returns {String} description
 */
API.transports.Transport.prototype.describe = function () {
    return [
        'From ' + this.from + ' to ' + this.to,
        (this.name ? ' by ' + this.name : ''),
        (this.notes ? '. ' + this.notes : '')
    ].join('');
};