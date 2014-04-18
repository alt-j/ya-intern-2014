/**
 * @constructor
 *
 * @params {Object} params
    must looks like:
    {
        from: 'A',
        to: 'B',
        ...
    }
    can have filed 'notes', 'name'
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
    Prepare description about trips on this transport
 * @returns {String} description
 */
API.transports.Transport.prototype.describe = function () {
    return [
        'From ' + this.from + ' to ' + this.to,
        (this.name ? ' by ' + this.name : ''),
        (this.notes ? '. ' + this.notes : '')
    ].join('');
};