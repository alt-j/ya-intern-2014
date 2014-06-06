/**
 * @requires ./transports/*
 *
 * @global API
 */
var API = (function () {

    var TransportCard = function (params) {

        var transportClass;

        if (params.transport) {
            transportClass = [
                params.transport.charAt(0).toUpperCase(),
                params.transport.slice(1)
            ].join('');
        } else {
            throw new Error('Card haven\'t type of transport');
        }

        if (API.transports.hasOwnProperty(transportClass) &&
            API.transports[transportClass].toString().indexOf('function') === 0) {  
            return new API.transports[transportClass](params);
        } else {
            params.name = params.name || params.transport;
            return new API.transports.Transport(params);
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
    var getTripDescription = function (list) {

        var description = [];

        // index list
        var indexes = { from: [] },
            keys = { from: [], to: [] };

        var i, from;

        for (i = list.length - 1; i >= 0; i--) {
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
        from = keys.from.filter(function (i) {
            return keys.to.indexOf(i) < 0;
        });
        if (from.length > 1 || from.length === 0) {
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

    return {
        utils: { },
        transports: { },
        getTripDescription: getTripDescription
    };

} ());