/**
 * @global API
 */
var API = new (function () {
    this.utils = { };
    this.transports = { };

    var self = this;

    var TransportCard = function (params) {
        var type,
            transportClass;

        if (params.transport) {
            type = params.transport;
            transportClass = type.charAt(0).toUpperCase() + type.slice(1);

            delete params.transport;
        } else {
            throw new Error('Card haven\'t type of transport');
        }

        if (self.transports.hasOwnProperty(transportClass) &&
            typeof self.transports[transportClass] == 'function') {  
            return new self.transports[transportClass](params);
        } else {
            params.name = params.name || type;
            return new self.transports.Transport(params);
        }
    };


    /**
     * @method getTripDescription
        Prepare description about trip using list of cards
     *
     * @params {Array} list
        List of cards, each card must contain three main fileds: transport, from, to
        also card can contain other fields, depends on type of transport (look to folder transports/)
     *
     * @returns {String} description
     */
    this.getTripDescription = function (list) {
        var description = [];

        // index list
        var indexes = { from: [] },
            keys = { from: [], to: [] };
        for (var i = list.length - 1; i >= 0; i--) {
            list[i] = new TransportCard(list[i]);

            indexes.from[list[i].from] = list[i];
            if (keys.from.indexOf(list[i].from) === -1) {
                keys.from.push(list[i].from);
            }

            if (keys.to.indexOf(list[i].to) === -1) {
                keys.to.push(list[i].to);
            }
        }
        if (keys.to.length !== list.length || keys.from.length !== list.length) {
            throw new Error('Error: impossible to make a trip from this list');
        }

        // choose first point
        var from = keys.from.filter(function (i) {
            return keys.to.indexOf(i) < 0;
        });
        if (from.length > 1 || from.length == 0) {
            throw new Error('Error: impossible to make a trip from this list');
        } else {
            from = from[0];
        }
        
        // describe trip
        (function describe (from) {
            if (indexes.from[from]) {
                description.push(description.length + '. ' + indexes.from[from].describe());
                describe(indexes.from[from].to);
            }
        })(from);

        return description.join('\n');
    };
})();
/**
 * utility for realization extend for objects
 */
API.utils.extend = function (Child, Parent) {
    var F = function () { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.parent = Parent.prototype;
};
/**
 * @constructor
    This is parent class of all types transport objects,
    also this class using, when type isn't declared.

    If you want to add new type of transport,
    you must create new extend of Transport in API.transports namespace.
    Notice: name of all constructors must begin with a capital letter
 *
 * @params {Object} params
    must looks like:
    {
        from: 'A',
        to: 'B',
        ...
    }
    can contain fileds 'notes', 'name'
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
    Prepare description about trip on this transport
 * @returns {String} description
 */
API.transports.Transport.prototype.describe = function () {
    return [
        'From ' + this.from + ' to ' + this.to,
        (this.name ? ' by ' + this.name : ''),
        (this.notes ? '. ' + this.notes : '')
    ].join('');
};
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
    Prepare description about trip on this transport
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
    can contain fileds 'notes', 'name'
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
    Prepare description about trip on this transport
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