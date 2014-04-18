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
        also card can contain other fields, depends on type of transport
     *
     * @returns {String} description
     */
    this.getTripDescription = function (list) {
        var description = [];
        list.map(function (card) {
            return new TransportCard(card);
        }).forEach(function (transportCard) {
            description.push(transportCard.describe());
        });
        return description.join('\n');
    };
})();