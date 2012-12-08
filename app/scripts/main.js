$(document).ready(function() {

    var getElValueAsNumber = function(selector) {
        var value = $(selector).val();
        return value || 0;
    };

    Parse.initialize("8De6SQMWtbOWrok19a0JA5I7SANT6FQP5a85WEy6", "bWAJd39x8c63Lv8xuKcafgu4TrbAqRqIr3Z1XayZ");
    var HousePreferences = Parse.Object.extend({
        className: "HousePreferences"
    });
    var housePreferences = new HousePreferences();

    var bedrooms = getElValueAsNumber("#bedrooms");
    var bathooms = getElValueAsNumber("#bathrooms");
    var yard = getElValueAsNumber("input[name=\"yard\"]:checked");
    var garage = getElValueAsNumber("input[name=\"garage\"]:checked");
    var squarefeet = getElValueAsNumber("#squarefeet");
    var price = getElValueAsNumber("#price");
    var neighborhoods = getElValueAsNumber("#neighborhoods");

    housePreferences.set("bedrooms", bedrooms);
        /*bathrooms: bathrooms,
        yard: yard,
        garage: garage,
        squarefeet: squarefeet,
        price: price,
        neighborhoods: neighborhoods
    });*/
    housePreferences.save();

    console.log(housePreferences);
});

