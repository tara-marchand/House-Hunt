$(document).ready(function() {
    var getElValueAsNumber = function(selector) {
        var value = $(selector).val();
        return value || 0;
    };

    var showValues = function(results) {
        var bedroomsSelector = "option[value='" + results.get("bedrooms") + "']",
            bathroomsSelector = "option[value='" + results.get("bathrooms") + "']",
            yardSelector = "input[type='radio'][name='yard'][value='" + results.get("yard") + "']",
            garageSelector = "input[type='radio'][name='garage'][value='" + results.get("garage") + "']",
            squarefeetSelector = "option[value='" + results.get("squarefeet") + "']",
            priceSelector = "option[value='" + results.get("price") + "']",

            neighborhoodsOptions = $("#neighborhoods").find("option"),
            neighborhoodsOptionsLength = neighborhoodsOptions.length,
            neighborhoods = results.get("neighborhoods"),
            option,
            optionValue;

        housePreferences = results;
        $("#bedrooms").find(bedroomsSelector).attr("selected", "selected");
        $("#bathrooms").find(bathroomsSelector).attr("selected", "selected");
        $(yardSelector).attr("checked", true);
        $(garageSelector).attr("checked", true);
        $("#squarefeet").find(squarefeetSelector).attr("selected", "selected");
        $("#price").find(priceSelector).attr("selected", "selected");

        for (var i = 0; i < neighborhoodsOptionsLength; i++) {
            option = neighborhoodsOptions[i];
            optionValue = $(option).attr("value");
            if (neighborhoods.indexOf(optionValue) > -1) {
                $(option).attr("selected", "selected");
            }
        }
        loadQueryDeferred.resolve();
     };

    var addEventHandlers = function() {
        // selects
        $("select").on("change", function() {
            var $select = $(this),
                id = $select.attr("id"),
                value = $select.val();

            housePreferences.save(id, value);
        });
        // radios
    };

     Parse.initialize("8De6SQMWtbOWrok19a0JA5I7SANT6FQP5a85WEy6", "bWAJd39x8c63Lv8xuKcafgu4TrbAqRqIr3Z1XayZ");

    // init class
    var HousePreferences = Parse.Object.extend({
            className: "HousePreferences"
        }),
        housePreferencesQuery = new Parse.Query(HousePreferences),
        housePreferences,
        loadQueryDeferred = $.Deferred();

    housePreferencesQuery.get("xqDFn4ZkLt", {
        success: showValues
    });

    loadQueryDeferred.done(addEventHandlers);
});

