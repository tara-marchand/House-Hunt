/**
 *
 * Model: HousePreferences
 * View: HousePreferencesView
 *
 * Model: Neighborhood
 * View: NeighborhoodView
 *
 * Collection: AllNeighborhoods
 * View: AllNeighborhoodsView
 *
 */

$(document).ready(function() {
    "use strict";
    hh.init();
});

var hh = (function() {
    "use strict";
    var hh = {},
    housePrefsView = null;

    hh.HousePreferences = Parse.Object.extend({
        className: "HousePreferences",
        initialize: function() {
            this.on("change:form", this.save);
        }
    });

    hh.HousePreferencesView = Parse.View.extend({
        model: null,

        events: {
            "change select, change input": "changeForm",
            "change input:radio": "changeForm"
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            var selectedNeighborhoods = this.model.get("neighborhoods"),
            neighborhoodsOptions = $("#neighborhoods").find("option"),
            neighborhoodsOptionsLength = neighborhoodsOptions.length,
            option,
            optionValue,
            bedroomsSelector = "option[value='" + this.model.get("bedrooms") + "']",
            bathroomsSelector = "option[value='" + this.model.get("bathrooms") + "']",
            yardSelector = "input[type='radio'][name='yard'][value='" + this.model.get("yard") + "']",
            garageSelector = "input[type='radio'][name='garage'][value='" + this.model.get("garage") + "']",
            squarefeetSelector = "option[value='" + this.model.get("squarefeet") + "']",
            priceSelector = "option[value='" + this.model.get("price") + "']";

            for (var i = 0; i < neighborhoodsOptionsLength; i++) {
                option = neighborhoodsOptions[i];
                optionValue = $(option).attr("value");
                if (selectedNeighborhoods.indexOf(optionValue) > -1) {
                    $(option).attr("selected", "selected");
                }
            }
            $("#bedrooms").find(bedroomsSelector).attr("selected", "selected");
            $("#bathrooms").find(bathroomsSelector).attr("selected", "selected");
            $(yardSelector).attr("checked", true);
            $(garageSelector).attr("checked", true);
            $("#squarefeet").find(squarefeetSelector).attr("selected", "selected");
            $("#price").find(priceSelector).attr("selected", "selected");

        },

        changeForm: function(e) {
            var modelUpdates = {},
            el = e.target,
            $el = $(el),
            elNodeName = el.nodeName,
            attrib = "",
            val = "";

            if (el.nodeName === "SELECT") {
                attrib = $el.attr("id");
                val = $el.val();
            } else if (el.nodeName === "INPUT") {
                attrib = $el.attr("name");
                val = $("input:radio[name=" + attrib + "]:checked").val();
            }

            modelUpdates[attrib] = val;
            this.model.set(modelUpdates);
            this.model.trigger("change:form");
        }
    });

    var addEventHandlers = function() {
        // areas
        $("area").on("mouseenter", function() {
            alert($(this).data("value"));
        });
    };

    hh.init = function() {
        Parse.initialize("8De6SQMWtbOWrok19a0JA5I7SANT6FQP5a85WEy6", "bWAJd39x8c63Lv8xuKcafgu4TrbAqRqIr3Z1XayZ");
        var housePrefsQuery = new Parse.Query(hh.HousePreferences);
        housePrefsQuery.get("xqDFn4ZkLt", {
            success: function(results) {
                housePrefsView = new hh.HousePreferencesView({
                    el: "form",
                    model: results
                });
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

