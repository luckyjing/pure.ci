<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Pure</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <link rel="stylesheet" href="/static/css/common.css">
  <script type="text/javascript" src="//g.alicdn.com/??aliyun/dblx/0.0.14/react.min.js,aliyun/dblx/0.0.14/react-dom.min.js,aliyun/dblx/0.0.14/redux.min.js,aliyun/dblx/0.0.14/react-redux.min.js"></script>
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
  <script src="/static/scripts/common.js"></script>
  <script src="/static/scripts/index.js"></script>

</body>

</html>
