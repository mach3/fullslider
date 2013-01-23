module.exports = function(grunt){

	grunt.initConfig({
		meta : {
			"banner" : "/* FullSlider version 1.0 */"
		},
		min : {
			dist : {
				src : [
					"<banner>",
					"assets/js/fullslider/fullslider.js"
				],
				dest : "assets/js/fullslider/fullslider.min.js"
			}
		}
	});

};