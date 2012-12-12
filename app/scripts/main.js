$(document).ready(function() {

    var getElValueAsNumber = function(selector) {
        var value = $(selector).val();
        return value || 0;
    };

    Parse.initialize("8De6SQMWtbOWrok19a0JA5I7SANT6FQP5a85WEy6", "bWAJd39x8c63Lv8xuKcafgu4TrbAqRqIr3Z1XayZ");

    var HousePreferences = Parse.Object.extend({
        className: "HousePreferences"
    });
    var housePreferencesQuery = new Parse.Query(HousePreferences);
    housePreferencesQuery.get("nz8Iez26QO", {
        success: function(results) {
            console.log(results);
            
            var bedroomsSelector = "option[value='" + results.get("bedrooms") + "']";
            $("#bedrooms").find(bedroomsSelector).attr("selected", "selected");

            var bathroomsSelector = "option[value='" + results.get("bathrooms") + "']";
            $("#bathrooms").find(bathroomsSelector).attr("selected", "selected");

            var yardSelector = "input[type='radio'][name='yard'][value='" + results.get("yard") + "']";
            $(yardSelector).attr("checked", true);

            var garageSelector = "input[type='radio'][name='garage'][value='" + results.get("garage") + "']";
            $(garageSelector).attr("checked", true);

            var squarefeetSelector = "option[value='" + results.get("squarefeet") + "']";
            $("#squarefeet").find(squarefeetSelector).attr("selected", "selected");

            var priceSelector = "option[value='" + results.get("price") + "']";
            $("#price").find(priceSelector).attr("selected", "selected");

            // TO DO: neighborhoods
         }
    });
/*
    var housePreferences = new HousePreferences();

    var bedrooms = getElValueAsNumber("#bedrooms");
    var bathrooms = getElValueAsNumber("#bathrooms");
    var yard = getElValueAsNumber("input[name=\"yard\"]:checked");
    var garage = getElValueAsNumber("input[name=\"garage\"]:checked");
    var squarefeet = getElValueAsNumber("#squarefeet");
    var price = getElValueAsNumber("#price");
    var neighborhoods = getElValueAsNumber("#neighborhoods");

    housePreferences.set("bedrooms", bedrooms);
    housePreferences.set("bathrooms", bathrooms);
    housePreferences.set("yard", yard);
    housePreferences.set("garage", garage);
    housePreferences.set("squarefeet", squarefeet);
    housePreferences.set("price", price);
    housePreferences.set("neighborhoods", neighborhoods);
    housePreferences.save();

    console.log(housePreferences);
   */
});

