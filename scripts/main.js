var hh=function(){var e={},t=Parse.View.extend({events:{"mouseover area":"setCanvasAreaStyle","mouseout area":"setCanvasAreaStyle","click area":"setCanvasAreaStyle"},initialize:function(){this.$map=$("#map"),this.$areas=$("#areas"),this.$canvas=$("#canvas"),this.canvas=this.$canvas.get(0),this.canvas.width=800,this.canvas.height=724,this.context=this.canvas.getContext("2d"),this.fillStyleOff="purple",this.fillStyleOver="red",this.fillStyleOn="blue",this.strokeStyleOff="grey",this.strokeStyleOver="blue",this.strokeStyleOn="red",this.context.lineWidth=2},render:function(){this.clearCanvas(),this.context.fillStyle=this.fillStyleOff,this.context.strokeStyle=this.strokeStyleOff;for(var e=this.$map.children(),t=e.length,i=0;t>i;i++)this.renderCanvasArea(e[i]);this.$el.hasClass("hide")&&this.$el.removeClass("hide")},clearCanvas:function(){this.context.fillStyle="transparent",this.context.fillRect(0,0,this.canvas.width,this.canvas.height)},renderCanvasArea:function(e){var t=$(e);t.attr("shape");var i,s,a=t.attr("coords").split(","),l=a.length;this.context.fillStyle=t.data("fillStyle")?t.data("fillStyle"):this.fillStyleOff,this.context.strokeStyle="black",this.context.lineWidth=2,this.context.beginPath(),i=parseInt(a[0],10),s=parseInt(a[1],10),this.context.moveTo(i,s),console.log("moveTo: "+i+", "+s);for(var n=2;l>n;n+=2)i=parseInt(a[n],10),s=parseInt(a[n+1],10),this.context.lineTo(i,s),console.log("j: "+n+", lineTo: "+i+", "+s);this.context.fill(),this.context.stroke(),this.context.closePath()},setCanvasAreaStyle:function(e){var t=e.originalEvent.type,i=e.target,s=$(i);if("mouseover"===t)s.data("fillStyle")&&s.data("fillStyle")!==this.fillStyleOff||s.data({fillStyle:this.fillStyleOver,strokeStyle:this.strokeStyleOver});else if("mouseout"===t){if(s.data("fillStyle")===this.fillStyleOn)return;s.data({fillStyle:this.fillStyleOff,strokeStyle:this.strokeStyleOff})}else"click"===t&&(e.preventDefault(),s.data("fillStyle")===this.fillStyleOn?s.data({fillStyle:this.fillStyleOver,strokeStyle:this.strokeStyleOver}):s.data({fillStyle:this.fillStyleOn,strokeStyle:this.strokeStyleOn}));this.renderCanvasArea(i)}}),i=Parse.View.extend({events:{"change select, change input":"changeForm","change input:radio":"changeForm"},initialize:function(){this.neighborhoodsOptions=$("#neighborhoods").find("option"),this.neighborhoodsOptionsLength=this.neighborhoodsOptions.length},render:function(){for(var e,t,i=this.model.get("neighborhoods"),s="option[value='"+this.model.get("bedrooms")+"']",a="option[value='"+this.model.get("bathrooms")+"']",l="input[type='radio'][name='yard'][value='"+this.model.get("yard")+"']",n="input[type='radio'][name='garage'][value='"+this.model.get("garage")+"']",o="option[value='"+this.model.get("squarefeet")+"']",r="option[value='"+this.model.get("price")+"']",h=0;this.neighborhoodsOptionsLength>h;h++)e=this.neighborhoodsOptions[h],t=$(e).attr("value"),i.indexOf(t)>-1&&$(e).attr("selected","selected");$("#bedrooms").find(s).attr("selected","selected"),$("#bathrooms").find(a).attr("selected","selected"),$(l).attr("checked",!0),$(n).attr("checked",!0),$("#squarefeet").find(o).attr("selected","selected"),$("#price").find(r).attr("selected","selected"),this.$el.hasClass("hide")&&this.$el.removeClass("hide")},changeForm:function(e){var t={},i=e.target,s=$(i),a="",l="";"SELECT"===i.nodeName?(a=s.attr("id"),l=s.val()):"INPUT"===i.nodeName&&(a=s.attr("name"),l=$("input:radio[name="+a+"]:checked").val()),t[a]=l,this.model.set(t),this.model.trigger("change:form")}}),s=Parse.View.extend({initialize:function(){var e=this;this.canvasSubView=new t({el:"figure",model:e.model}),this.formSubView=new i({el:"form",model:e.model}),this.render()},render:function(){this.canvasSubView.render(),this.formSubView.render()}}),a=Parse.Object.extend({className:"HousePreferences",initialize:function(){this.on("change:form",this.save)}});return e.init=function(){Parse.initialize("8De6SQMWtbOWrok19a0JA5I7SANT6FQP5a85WEy6","bWAJd39x8c63Lv8xuKcafgu4TrbAqRqIr3Z1XayZ");var t=new Parse.Query(a);t.get("xqDFn4ZkLt",{success:function(t){e.appView=new s({el:"#container",model:t})}})},e}();