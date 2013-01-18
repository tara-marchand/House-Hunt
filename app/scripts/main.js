// http://zreference.com/image-map-canvas/

$(document).ready(function() {
    "use strict";
    hh.init();
});

var hh = (function() {
    "use strict";
    var hh = {};
    hh.housePrefsView = null;

    var HousePreferences = Parse.Object.extend({
        className: "HousePreferences",
        initialize: function() {
            this.on("change:form", this.save);
        }
    });

    var HousePreferencesView = Parse.View.extend({
        model: null,

        events: {
            "change select, change input": "changeForm",
            "change input:radio": "changeForm",
            "mouseover area": "setCanvasAreaStyle",
            "mouseout area": "setCanvasAreaStyle",
            "click area": "setCanvasAreaStyle"
        },

        initialize: function() {
            this.$map = $("#map");
            this.$areas = $("#areas");

            this.$canvas = $("#canvas")[0];
            this.$canvas.width = 800;
            this.$canvas.height = 724;

            this.context = this.$canvas.getContext("2d");
            this.fillStyleOff = "white";
            this.fillStyleOver = "red";
            this.fillStyleOn = "blue";
            this.strokeStyleOff = "grey";
            this.strokeStyleOver = "blue";
            this.strokeStyleOn = "red";

           this.context.lineWidth = 2;

            this.render();
        },

        render: function() {
            this.renderForm();
            this.clearCanvas();
            this.context.fillStyle = this.fillStyleOff;
            this.context.strokeStyle = this.strokeStyleOff;
            this.renderCanvas();
        },

        renderForm: function() {
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
        },

       fillAndStrokeCanvas: function(){
            if (this.context.fillStyle) {
                this.context.fill();
            }
            if (this.context.strokeStyle) {
                this.context.stroke();
            }
        },

        clearCanvas: function() {
            this.context.fillStyle = "transparent";
            this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        },

        renderCanvasArea: function(area) {
            var $area = $(area);
            var shape = $area.attr("shape");
            var coords = $area.attr("coords").split(",");

            this.context.fillStyle = ($area.data("fillStyle")) ? $area.data("fillStyle") : this.fillStyleOff;
            this.context.strokeStyle = ($area.data("strokeStyle")) ? $area.data("strokeStyle") : this.strokeStyleOff;
            this.context.lineWidth = ($area.data("lineWidth")) ? $area.data("lineWidth") : this.lineWidth;

            this.context.beginPath();
            var leng = coords.length;
            this.context.moveTo(coords[0], coords[1]);
            for (var j = 2; j < leng; j += 2){
                this.context.lineTo(coords[j], coords[j+1]);
            }
            this.context.closePath();
            this.fillAndStrokeCanvas();
        },

        setCanvasAreaStyle: function(e) {
            var eventType = e.originalEvent.type,
                el = e.target,
                $el = $(el);
            console.log(eventType);
            if (eventType === "mouseover") {
                $el.data({
                    fillStyle: this.fillStyleOver,
                    strokeStyle: this.strokeStyleOver
                });
            } else if (eventType === "mouseout") {
                $el.data({
                    fillStyle: this.fillStyleOff,
                    strokeStyle: this.strokeStyleOff
                });
            }
            this.renderCanvasArea(el);
        },

        renderCanvas: function() {
            var areasChildren = this.$areas.children(),
            areasChildrenLength = areasChildren.length;

            for (var i = 0; i < areasChildrenLength; i++) {
                this.renderCanvasArea(areasChildren[i]);
            }

        }

    });

   hh.init = function() {
        Parse.initialize("8De6SQMWtbOWrok19a0JA5I7SANT6FQP5a85WEy6", "bWAJd39x8c63Lv8xuKcafgu4TrbAqRqIr3Z1XayZ");
        var housePrefsQuery = new Parse.Query(HousePreferences);
        housePrefsQuery.get("xqDFn4ZkLt", {
            success: function(results) {
                hh.housePrefsView = new HousePreferencesView({
                    el: "#container",
                    model: results
                });
            }
        });

    };

    return hh;
})();

