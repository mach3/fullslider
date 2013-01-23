/*!
 * FullSlider
 * ----------
 * Full width image slider with jQuery
 *
 * @version 1.0
 * @author mach3
 * @require jQuery
 */

(function($){

	/**
	 * FullSLider
	 */
	var FullSlider = function(element, option){
		this.init(element, option);
	};

	(function(){
		var my = FullSlider.prototype;

		// nodes
		my.container = null;
		my.list = null;
		my.slides = null;
		my.nextButton = null;
		my.prevButton = null;
		my.controll = null;

		// properties
		my.length = null;
		my.option = {};
		my.index = null;

		// default option
		my.optionDefault = {
			slideDuration : 500,
			slideEasing : "swing",
			imageDuration : 300,
			imageEasing : "linear",
			dialogDuration : 300,
			dialogEasing : "swing",
			inactiveImageAlpha : 0.3
		};


		/**
		 * Constructor function.
		 * 
		 * @param HTMLElement element
		 * @param Object option (optional)
		 */
		my.init = function(element, option){
			var i, addDummys;

			// define nodes
			my.container = $(element);
			my.list = my.container.find(".full-slider-content").find("ul");
			my.slides = my.list.find("li");
			my.nextButton = my.container.find(".button-next a");
			my.prevButton = my.container.find(".button-prev a");
			my.controll = my.container.find(".full-slider-controll");

			// define vars
			my.length = my.slides.length;
			my.option = $.extend(true, {}, my.optionDefault, option);

			// add dummy nodes
			i = 2;
			addDummys = function(){
				var n;
				for(n=0; n<my.length; n+=1){
					my.list.append(my.slides.eq(n).clone());
				}
			};
			while(i--){
				addDummys();
			}
			my.slides = my.list.find("li");

			// events for next/prev buttons
			my.nextButton.on("click", function(e){ 
				e.preventDefault();
				my.next(); 
			});
			my.prevButton.on("click", function(e){ 
				e.preventDefault();
				my.prev(); 
			});

			// events for index buttons
			if(my.controll.length){
				my.controll.find("li a").on("click", function(e){
					e.preventDefault();
					my.slide($(this).data("index") + my.length);
				});
			}

			// initialize active 
			// not my.index but my.length, not to deactivate in my.activate()

			my.ready(function(){
				my.slide(my.length, true);
			});
		};

		/**
		 * Ready for image load
		 * When loaded, show slide contents
		 *
		 * @param Function callback
		 */
		my.ready = function(callback){
			var imgs, count, onLoaded;

			imgs = my.slides.find("img");
			count = imgs.length;
			onLoaded = function(){
				count --;
				if(! count){
					my.container.find(".full-slider-content").fadeIn();
					callback();
				}
			};
			imgs.onImageLoaded(onLoaded);
		};

		/**
		 * Slide images to the target.
		 * If noAnimation is false, update the align immidiately without animation.
		 * 
		 * @param Integer index
		 * @param Boolean noAnimation
		 */
		my.slide = function(index, noAnimation){
			var target, fadeIn, listLeft;

			if(null !== my.index){
				my.deactivate(my.index);
			}

			target = my.slides.eq(index);
			listLeft = target.position().left * -1;

			if(noAnimation){
				my.list.css("left", listLeft);
				my.activate(index);
			} else {
				my.list.stop().animate({
					left : listLeft
				}, my.option.slideDuration, my.option.slideEasing, function(){
					my.activate(index);
				});
			}

			my.index = index;
			my.toggleControll();
		};

		/**
		 * Toggle activation of index buttons
		 * by my.index
		 */
		my.toggleControll = function(){
			if(my.controll.length){
				my.controll.find("li a").each(function(){
					var a, i, active;
					a = $(this);
					i = a.data("index");
					active = i === my.index 
						|| i + my.length === my.index 
						|| i+ my.length * 2 === my.index;
					a.toggleClass("active", active);
				});
			}
		};

		/**
		 * Activate the image by index
		 *
		 * @param Integer index
		 */
		my.activate = function(index){
			var target;

			if(index < my.length){
				my.slide(my.length + index, true);
				return;
			} else if(index >= my.length * 2){
				my.slide(index - my.length, true);
				return;
			}

			target = my.slides.eq(index);
			target.find(".image").animate({
				opacity : 1
			}, my.option.imageDuration, my.option.imageEasing);
			target.find(".dialog").animate({
				bottom : 0
			}, my.option.dialogDuration, my.option.dialogEasing);



			my.index = index;
		};

		/**
		 * Deactivate the image by index
		 *
		 * @param Integer index
		 */
		my.deactivate = function(index){
			var target, dialog;
			target = my.slides.eq(index);
			target.find(".image").animate({
				opacity : my.option.inactiveImageAlpha
			});
			dialog = target.find(".dialog");
			dialog.animate({
				bottom : dialog.height() * -1
			});
		};

		/**
		 * Go to next slide
		 */
		my.next = function(e){
			my.slide(my.index + 1);
		};

		/**
		 * Go to previous slide
		 */
		my.prev = function(e){
			my.slide(my.index - 1);
		};
	}());


	$.extend($, {
		getImageLoaded : function(ele){
			if(! ele.complete){
				return false;
			}
			if(typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0){
				return false;
			}
			return true;
		}
	});

	$.fn.extend({
		onImageLoaded : function(callback){
			this.each(function(){
				if($.getImageLoaded(this)){
					callback.call(this);
					return;
				}
				$(this).on("load", callback);
			});
			return this;
		},
		fullSlider : function(option){
			this.each(function(){
				var ins = new FullSlider(this, option);
				$(this).data("fullSlider", ins);
			});
			return this;
		}
	});

}(jQuery));
