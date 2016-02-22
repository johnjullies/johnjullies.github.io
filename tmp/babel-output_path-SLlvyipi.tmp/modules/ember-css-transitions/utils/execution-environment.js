/* global window */

export default {
  canUseDom: function canUseDom() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  }
};