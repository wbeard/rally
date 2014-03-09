module.exports = function(/* string */ template, /* object */ obj) {

  if(typeof template === "undefined")
    throw new Error("Please provide a template.");

  if(typeof obj === "undefined")
    throw new Error("Please provide an object to map.");

  return template.replace(/\$\{([^\s\:\}]+)\}/g,
    function(match, key) {
      console.log(arguments);
      var val = obj[key];
      if(val) {
        return val;
      } else {
        throw new Error("${" + key + "}, which is an expected key in the template, is not a member of the object passed. Please ensure all expected keys are included in the passed object.");
      }
    });
};