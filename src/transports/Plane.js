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
        baggage: 'Baggage drop at ticket counter 344'
        ...
    }
    can contain fileds 'notes', 'company'
 */
API.transports.Plane = function (params) {

    this.required = ['flight', 'gate', 'seat', 'baggage'];
    this.included = ['company'];

    try {
        API.transports.Plane.parent.constructor.call(this, params);
    } catch (e) {
        throw new Error('Plane: ' + e.message);
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

    return 'From ' + this.from + ' take ﬂight ' + this.flight +
        (this.company ? ' by company "' + this.company + '"' : '') + ' to ' + this.to + '. ' +
        'Gate: ' + this.gate + '. ' +
        (this.seat === 'any' ? 'No seat assignment' : 'Seat: ' + this.seat) + '. ' +
        this.baggage + (this.notes ? '. ' + this.notes : '');

};