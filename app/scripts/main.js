$(document).ready(function() {
    "use strict";
    hh.init();
});

var hh = (function() {
    "use strict";
    var hh = {},
        HousePreferences = null,
        HousePreferencesView = null,
        housePreferencesQuery = null,
        housePreferences = null,
        housePreferencesView = null;

    var addEventHandlers = function() {
        // selects
        $("select").on("change", function() {
            var $select = $(this),
            id = $select.attr("id"),
            value = $select.val();

            housePreferences.save(id, value);
        });
        // radios
        // areas
        $("area").on("mouseenter", function() {
            alert($(this).data("value"));
        });
    };

    hh.init = function() {
        Parse.initialize("8De6SQMWtbOWrok19a0JA5I7SANT6FQP5a85WEy6", "bWAJd39x8c63Lv8xuKcafgu4TrbAqRqIr3Z1XayZ");

        // Parse (Backbone) classes
        HousePreferences = Parse.Object.extend({
            className: "HousePreferences"
        });
        HousePreferencesView = Parse.View.extend({
            model: null,
            initialize: function() {
                this.model.on("change", this.render);
            },
            render: function() {
                var bedroomsSelector = "option[value='" + housePreferences.get("bedrooms") + "']",
                    bathroomsSelector = "option[value='" + housePreferences.get("bathrooms") + "']",
                    yardSelector = "input[type='radio'][name='yard'][value='" + housePreferences.get("yard") + "']",
                    garageSelector = "input[type='radio'][name='garage'][value='" + housePreferences.get("garage") + "']",
                    squarefeetSelector = "option[value='" + housePreferences.get("squarefeet") + "']",
                    priceSelector = "option[value='" + housePreferences.get("price") + "']",

                    neighborhoodsOptions = $("#neighborhoods").find("option"),
                    neighborhoodsOptionsLength = neighborhoodsOptions.length,
                    neighborhoods = housePreferences.get("neighborhoods"),
                    option,
                    optionValue;

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
            }
        });

        housePreferencesQuery = new Parse.Query(HousePreferences);
        housePreferencesQuery.get("xqDFn4ZkLt", {
            success: function(results) {
                housePreferences = results;
                housePreferencesView = new HousePreferencesView({
                    model: housePreferences
                });
                housePreferences.trigger("change");
                addEventHandlers();
            }
        });

        var TWO_PI = Math.PI * 2;

        var map = $("#map");
        var areas = $("#areas");
        var canvas = $("#canvas")[0];
        canvas.width = 800;
        canvas.height = 724;
        var c = canvas.getContext("2d");

        var fillStyle = "#bf9c82";
        var strokeStyle = "#ebce59";
        var lineWidth = 2;

        $.fn.render = function(){ 
            this.data.apply(this, arguments);
            render();
        };

        function clear(){    
            c.fillStyle = "transparent";
            c.fillRect(0, 0, canvas.width, canvas.height);
        }

        $('area').mouseenter(function(){
            $(this).render();
            render();
        }).mouseleave(function(){
            $(this).render();

        });


        render();


        function setStyle(){
            if (fillStyle){
                c.fillStyle = fillStyle; 
            }
            if (strokeStyle){
                if (lineWidth){
                    c.lineWidth = lineWidth; 
                }
                c.strokeStyle = strokeStyle;   
            }
        }

        function fillStroke(){
            if (fillStyle) c.fill();
            if (strokeStyle) c.stroke();
        }

        function render(noClear){
            if (!noClear){
                clear();
            }

            areas.children().each(function(i){
                var area = $(this);
                var shape = area.attr("shape");
                var coords = area.attr("coords").split(",");

                if (fillStyle){
                    c.fillStyle = fillStyle; 

                }
                if (strokeStyle){
                    if (lineWidth){
                        c.lineWidth = lineWidth; 
                    }
                    c.strokeStyle = strokeStyle;   
                }

                c.beginPath();
                var leng = coords.length;
                c.moveTo(coords[0], coords[1]);
                for (var i = 2; i < leng; i+=2){
                    c.lineTo(coords[i], coords[i+1]); 
                }
                c.closePath();

                fillStroke(fillStyle, strokeStyle);

                c.lineWidth = 1;
            });
        }

        };

        return hh;
})();

