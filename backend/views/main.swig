<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Pure</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <link rel="stylesheet" href="/static/index.css">
  <script src="https://cdn.bootcss.com/react/15.4.2/react.min.js"></script>
  <script src="https://cdn.bootcss.com/react/15.4.2/react-dom.min.js"></script>
  <script src="https://cdn.bootcss.com/redux/3.6.0/redux.min.js"></script>
  <script src="https://cdn.bootcss.com/react-redux/5.0.3/react-redux.min.js"></script>
  <script src="https://cdn.bootcss.com/babel-polyfill/7.0.0-alpha.3/polyfill.min.js"></script>
</head>

<body>
  <div id="stage"></div>
  {% if env == 'development' %}
   
  {% else %}

  {% endif %}

  <script>
    var PURE_CI_CONFIG={
      API_PREFIX:''
    }
  </script>
  <script src="/static/vendor.js"></script>
  <script src="/static/index.js"></script>
</body>

</html>
