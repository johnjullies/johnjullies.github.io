export default function(object, regex) {
  return (typeof object) === 'string' && object.match(regex);
}
