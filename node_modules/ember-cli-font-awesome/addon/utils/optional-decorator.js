export default function optional(object, attributeName, descriptor) {
  const originalFunction = descriptor.value;

  descriptor.value = function() {
    let args = [].slice.call(arguments, 0);
    if (args.some((value) => value != null)) {
      return originalFunction(...arguments);
    }
  };

  return descriptor;
}
