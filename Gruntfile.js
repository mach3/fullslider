module.exports = function(grunt){

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");


	var banner = grunt.file.read("src/banner.js");


	grunt.initConfig({
		concat : {
			options : {
				stripBanners : true,
				banner : banner
			},
			dist : {
				src : [
					"src/fullslider.js"
				],
				dest : "assets/js/fullslider/fullslider.js"
			}
		},
		uglify : {
			options : {
				stripBanners : true,
				banner : banner
			},
			dist : {
				src : [
					"src/fullslider.js"
				],
				dest : "assets/js/fullslider/fullslider.min.js"
			}
		}
	});

	grunt.registerTask("default", ["concat:dist", "uglify:dist"]);

};