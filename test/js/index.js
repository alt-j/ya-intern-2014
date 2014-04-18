if (list) {
    try {
        var description = API.getTripDescription(list);
        console.log(description);
    } catch (e) {
        console.log(e);
    }
}