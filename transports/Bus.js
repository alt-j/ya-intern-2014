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
    can have filed 'notes', 'name'
 */
API.transports.Bus = function (params) {
    try {
        API.transports.Bus.parent.constructor.call(this, params);
    } catch (e) {
        throw new Error('Bus:' + e.message);
    }
    if (params.seat) {
        this.seat = params.seat;
    } else {
        throw new Error('Bus params isn\'t contains required paramter: seat');
    }
};

/**
 * Bus is extend of Transport
 */
API.utils.extend(API.transports.Bus, API.transports.Transport);

/**
 * @method describe
    Prepare description about trips on this transport
 *
 * @returns {String} description
 */
API.transports.Bus.prototype.describe = function () {
    var desc = [
        'Take the bus' + (this.name ? ' "' + this.name + '"' : '') + ' from ' + this.from + ' to ' + this.to,
        this.seat === 'any' ? 'No seat assignment' : 'Seat: ' + this.seat
    ].join('. ');

    if (this.notes) {
        desc += '. ' + this.notes;
    }
    return desc;
};