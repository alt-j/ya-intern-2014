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
    can have filed 'notes'
 */
var Train = function (params) {
    try {
        Train.parent.constructor.call(this, params);
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
extend(Train, Transport);

/**
 * @method describe
    Prepare description about trips on this transport
 *
 * @returns {String} description
 */
Train.prototype.describe = function () {
    var desc = [
        'Из ' + this.from + ' в ' + this.to,
        'Поезд номер: ' + this.number,
        this.seat === 'any' ? 'Без присвоения мест' : 'Место номер: ' + this.seat
    ].join('. ');

    if (this.notes) {
        desc += '. ' + this.notes;
    }
    return desc;
};