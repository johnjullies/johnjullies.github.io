export default extractValue;

function extractValue(desc) {
  return desc.value || typeof desc.initializer === 'function' && desc.initializer();
}