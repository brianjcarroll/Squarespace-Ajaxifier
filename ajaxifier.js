YUI.add('squarespace-ajaxifier', function(Y) {
  Y.namespace('Squarespace').Ajaxifier = Y.Base.create('Ajaxifier', Y.Base, [], {


    initializer: function() {
      var wrapper = this.get('wrapper');
      var inner = this.get('inner');
      var anchors = this.get('anchors');

      this.pjax = new Y.Pjax({
        container: this.get('wrapper'),
        linkSelector: anchors
      });

      this.$wrapper = Y.one(wrapper);

      this.pjax.on('navigate', this._loading,     this);
      this.pjax.on('load',     this._initContent, this);
    },


    _loading: function () {
      this.$wrapper.addClass('loading');
    },


    _initContent: function (response) {
      var delay = this.get('delay') < 50 ? 50 : this.get('delay');
      var classes = response.responseText.match(new RegExp('<body.*class="([^"]*)"'));

      Y.one('body').setAttribute('class', classes + ' loading');

      Squarespace.AFTER_BODY_LOADED = false;

      Y.later(delay, this, function () {
        Squarespace.afterBodyLoad();

        this.$wrapper.all('img[data-src]').each(function (el) {
          if (!el.ancestor('.sqs-layout')) {
            ImageLoader.load(el);
          }
        });

        Y.all('.squarespace-social-buttons').empty(true);
        new Y.Squarespace.SocialButtons();

        this.$wrapper.all('.sqs-simple-like').each(function (n) {
          Y.Squarespace.SimpleLike.renderLikeCount(n);
        });

        Y.fire('ajaxifier:ready');
        this.$wrapper.removeClass('loading');
      });
    }


  }, {
    ATTRS: {
      wrapper: {
        value: 'body'
      },
      anchors: {
        value: 'a'
      },
      delay: {
        value: 0 // Time in ms.
      }
    }
  });

},'1.0', {
  requires: [
    'base',
    'node',
    'pjax',
    'squarespace-social-buttons',
    'squarespace-simple-liking'
  ]
});
