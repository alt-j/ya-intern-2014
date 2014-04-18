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
    can have filed 'notes', 'name'
 */
API.transports.Train = function (params) {
    try {
        API.transports.Train.parent.constructor.call(this, params);
    } catch (e) {
        throw new Error('Train:' + e.message);
    }
    if (params.number && params.seat) {
        this.number = params.number;
        this.seat = params.seat;
    } else {
        throw new Error('Train params isn\'t contains one of required paramters: number, seat');
    }
};

/**
 * Train is extend of Transport
 */
API.utils.extend(API.transports.Train, API.transports.Transport);

/**
 * @method describe
    Prepare description about trips on this transport
 *
 * @returns {String} description
 */
API.transports.Train.prototype.describe = function () {
    var desc = [
        'Take train ' + this.number + ' from' + this.from + ' to ' + this.to,
        this.seat === 'any' ? 'Без присвоения мест' : 'Место номер: ' + this.seat
    ].join('. ');

    if (this.notes) {
        desc += '. ' + this.notes;
    }
    return desc;
};