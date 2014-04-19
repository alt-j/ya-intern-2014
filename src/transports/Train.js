/**
 * @requires ../utils/extend.js
 * @requires partial/Transport.js
 *
 * @constructor
    Extends of Transport
 *
 * @params {Object} params
    must looks like:
    {
        from: 'A',
        to: 'B',
        number: '123A',
        seat: 'any',
        ...
    }
    can contain fileds 'notes', 'names'
 */
API.transports.Train = function (params) {

    this.required = ['seat', 'number'];
    this.included = [];

    try {
        API.transports.Train.parent.constructor.call(this, params);
    } catch (e) {
        throw new Error('Train: ' + e.message);
    }

};

/**
 * Train is extend of Transport
 */
API.utils.extend(API.transports.Train, API.transports.Transport);

/**
 * @method describe
    Prepare description about trip on this transport
 *
 * @returns {String} description
 */
API.transports.Train.prototype.describe = function () {

    return 'Take train ' + this.number + (this.name ? ' (' + this.name + ')' : '') +
        ' from ' + this.from + ' to ' + this.to + '. ' +
        (this.seat === 'any' ? 'No seat assignment' : 'Seat: ' + this.seat) +
        (this.notes ? '. ' + this.notes : '');

};