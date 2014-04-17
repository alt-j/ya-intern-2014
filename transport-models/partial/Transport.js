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
    can have filed 'notes'
 */
var Transport = function (params) {
    if (params.from && params.to) {
        this.from = params.from;
        this.to = params.to;

        if (params.notes) {
            this.notes = notes;
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
Transport.prototype.describe = function () {
    return [
        'Из ' + this.from + ' в ' + this.to,
        (this.notes ? '. ' + this.notes : '')
    ].join('');
};