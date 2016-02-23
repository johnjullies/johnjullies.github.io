define('ember-paper/components/paper-autocomplete-highlight', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'span',
    flags: '',

    highlight: _ember['default'].computed('searchText', 'label', 'flags', function () {
      var unsafeText = _ember['default'].Handlebars.Utils.escapeExpression(this.get('label'));
      var text = unsafeText;
      var flags = this.get('flags');
      var regex = this.getRegExp(this.get('searchText'), flags);
      var html = text.replace(regex, '<span class="highlight">$&</span>');
      return new _ember['default'].Handlebars.SafeString(html);
    }),

    sanitize: function sanitize(term) {
      if (!term) {
        return term;
      }
      return term.replace(/[\\\^\$\*\+\?\.\(\)\|\{}\[\]]/g, '\\$&');
    },

    getRegExp: function getRegExp(text, flags) {
      var str = '';
      if (flags.indexOf('^') >= 1) {
        str += '^';
      }
      str += text;
      if (flags.indexOf('$') >= 1) {
        str += '$';
      }
      return new RegExp(this.sanitize(str), flags.replace(/[\$\^]/g, ''));
    }

  });
});