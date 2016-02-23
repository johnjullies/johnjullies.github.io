export default optional;

function optional(object, attributeName, descriptor) {
  var originalFunction = descriptor.value;

  descriptor.value = function () {
    var args = [].slice.call(arguments, 0);
    if (args.some(function (value) {
      return value != null;
    })) {
      return originalFunction.apply(undefined, arguments);
    }
  };

  return descriptor;
}