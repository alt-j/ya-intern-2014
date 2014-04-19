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
        seat: 'any',
        ...
    }
    can contain fileds 'notes', 'name'
 */
API.transports.Bus = function (params) {

    this.required = ['seat'];
    this.included = [];

    try {
        API.transports.Bus.parent.constructor.call(this, params);
    } catch (e) {
        throw new Error('Bus: ' + e.message);
    }

};

/**
 * Bus is extend of Transport
 */
API.utils.extend(API.transports.Bus, API.transports.Transport);

/**
 * @method describe
    Prepare description about trip on this transport
 *
 * @returns {String} description
 */
API.transports.Bus.prototype.describe = function () {

    return 'Take the bus' + (this.name ? ' "' + this.name + '"' : '') +
        ' from ' + this.from + ' to ' + this.to + '. ' +
        (this.seat === 'any' ? 'No seat assignment' : 'Seat: ' + this.seat) +
        (this.notes ? '. ' + this.notes : '');

};