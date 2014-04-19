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