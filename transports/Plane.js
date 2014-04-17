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
    can have filed 'notes'
 */
var Plane = function (params) {
    try {
        Plane.parent.constructor.call(this, params);
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
extend(Plane, Transport);

/**
 * @method describe
    Prepare description about trips on this transport
 *
 * @returns {String} description
 */
Plane.prototype.describe = function () {
    var desc = [
        'Из ' + this.from + ' в ' + this.to,
        'Рейс номер: ' + this.flight + ', выход: ' + this.gate,
        this.seat === 'any' ? 'Без присвоения мест' : 'Место номер: ' + this.seat
    ].join('. ');

    if (this.notes) {
        desc += '. ' + this.notes;
    }
    return desc;
};