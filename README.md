Squarespace-Ajaxifier
=====================

Ajax for Squarespace.

  <squarespace:script src="ajaxifier.js" />
  <script>
    YUI().use('squarespace-ajaxifier', function(Y) {
      new Y.Squarespace.Ajaxifier({
        wrapper: 'body',
        anchors: 'a',
        delay: '300'
      });
    });
  </script> 