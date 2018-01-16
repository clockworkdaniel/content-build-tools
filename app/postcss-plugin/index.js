//"use strict";

var url = require('url');
var http = require('http');

var postcss = require('postcss');
var sizeOf = require('image-size');

module.exports = postcss.plugin('padding', function padding(options) {

  var calculate = function(thisInclude, rule, dimensions) {

    let paddingBottom;
    let vwHeight;
    let maxHeight;
    let finalParams;

    if (thisInclude === "mobile") {
      paddingBottom = dimensions.height/620 * 100;
      finalParams = ", " + paddingBottom.toFixed(3) + "% )";
    } else if (thisInclude === "image" || thisInclude === "extend-fw") {
      paddingBottom = dimensions.height / 4000 * 100;
      finalParams = ", " + paddingBottom.toFixed(3) + "% )";
    } else if (thisInclude === "true-fw") {
      vwHeight = dimensions.height / 4000 * 100;
      vwHeight = ", " + vwHeight.toFixed(3) + "%";
      maxHeight = ", " + dimensions.height/2+"px )";
      finalParams = vwHeight + maxHeight;
    }

    newRule = "@include " + rule.params.substring(0, rule.params.length - 1) + finalParams;

    return newRule;

  }

	var transform = function(css) {

    var includes = [];

    //walk through every css rule
    css.walkAtRules("include", rule => {
      let thisInclude = rule.params.split("(")[0];
      //...and that the include in question requires padding bottom
      if (thisInclude === "extend-fw" || thisInclude === "image" || thisInclude === "true-fw" || thisInclude === "mobile") {
        let params = rule.params;
        //get the image URL from the include parameters
        let imageUrl = params.split("'")[1];
        //add preset to the image URL so that its height is correct for the calculation
        let urlWithPreset = imageUrl + "?$retina$";
        //parse the url ready for http.get
        let options = url.parse(urlWithPreset);

        var includePromise = transformInclude(thisInclude, rule, options);

        includes.push(includePromise);
      }
    });

    var includesPromise = Promise.all(includes);

		return includesPromise;
		
  };

	var transformInclude = function(thisInclude, rule, options) {

		var httpPromise = new Promise(function(resolve){

			http.get(options, function (response) {
				let chunks = [];
					response.on('data', function (chunk) {
					chunks.push(chunk);
				}).on('end', function() {
					let buffer = Buffer.concat(chunks);
          let dimensions = sizeOf(buffer);

          let newRule = calculate(thisInclude, rule, dimensions);			

					resolve(newRule);

				});
			});
		});

		var transformPromise = httpPromise.then(function(newRule) {
        rule.replaceWith(newRule);
    });

		return transformPromise;
  }
  
	return transform;

});