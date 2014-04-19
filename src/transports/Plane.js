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
        flight: 'A123',
        gate: 'A1',
        seat: 'any',
        ...
    }
    can contain fileds 'notes', 'name'
 */
API.transports.Plane = function (params) {
    try {
        API.transports.Plane.parent.constructor.call(this, params);
    } catch (e) {
        throw new Error('Plane:' + e.message);
    }
    if (params.flight && params.gate && params.seat) {
        this.flight = params.flight;
        this.gate = params.gate;
        this.seat = params.seat;
    } else {
        throw new Error('Plane params isn\'t contains one of required paramters: flight, gate, seat');
    }
};

/**
 * Plane is extend of Transport
 */
API.utils.extend(API.transports.Plane, API.transports.Transport);

/**
 * @method describe
    Prepare description about trip on this transport
 *
 * @returns {String} description
 */
API.transports.Plane.prototype.describe = function () {
    var desc = [
        'From ' + this.from + ' take ﬂight ' + this.flight + ' to ' + this.to,
        'Gate: ' + this.gate,
        this.seat === 'any' ? 'No seat assignment' : 'Seat: ' + this.seat
    ].join('. ');

    if (this.notes) {
        desc += '. ' + this.notes;
    }
    return desc;
};