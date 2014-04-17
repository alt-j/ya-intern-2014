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
 */
var Bus = function (params) {
	try {
		Bus.parent.constructor.call(this, params);
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
extend(Bus, Transport);

/**
 * @method describe
	Prepare description about trips on this transport
 *
 * @returns {String} description
 */
Bus.prototype.describe = function () {
	var desc = 'С ' + this.from + ' до ' + this.to;
	if (this.seat === 'any') {
		desc += '. Без присвоения мест';
	} else {
		desc += '. Место номер: ' + this.seat;
	}
	return desc;
};