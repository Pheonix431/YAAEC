module.exports = function(grunt){
  require("jit-grunt")(grunt);

  grunt.initConfig({
    less: {
      development:{
        options:{
          compress:true,
          yuicompress: true,
          optimization: 2
        },
        files:{
          "./public/stylesheets/shop-homepage.css":"./less/shop-homepage.less",
        }
      }
    },
    watch: {
      styles:{
        files:['less/**/*.less'],
        tasks: ['less'],
        options: {
        nospawn: true
        }
      }
    }
  });
  grunt.registerTask('default',['less','watch']);
};
