<!DOCTYPE html>
<html>

<head>
    <title>Pure-CI</title>
    <link href="//cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="//cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet"/>
    <link href="//mirror.tarax.cn/coloradmin/assets/css/animate.min.css" rel="stylesheet"/>
    <link href="//mirror.tarax.cn/coloradmin/assets/css/style.min.css" rel="stylesheet"/>
    <link href="//mirror.tarax.cn/coloradmin/assets/css/style-responsive.css" rel="stylesheet"/>
    <link href="//mirror.tarax.cn/coloradmin/assets/css/theme/default.css" rel="stylesheet" id="theme"/>
    {% if process.env.NODE_ENV !== "development" %}
    <link rel="stylesheet" href="/static/static/css/index.css">
    <script src="//cdn.bootcss.com/react/15.4.0/react.min.js"></script>
    <script src="//cdn.bootcss.com/react/15.4.0/react-dom.min.js"></script>
    <script src="//cdn.bootcss.com/redux/3.6.0/redux.min.js"></script>
    {% else %}
    {% endif %}
</head>

<body class="pace-top bg-white">
<div id="root"></div>

<div id="page-container" class="fade in">

</div>

<script src="http://mirror.tarax.cn/coloradmin/assets/plugins/jquery/jquery-1.9.1.min.js"></script>
<script src="http://mirror.tarax.cn/coloradmin/assets/plugins/jquery/jquery-migrate-1.1.0.min.js"></script>

<script src="http://mirror.tarax.cn/coloradmin/assets/plugins/flot/jquery.flot.min.js"></script>

{% if process.env.NODE_ENV !== "development" %}
<script src="static/static/scripts/index.js"></script>
{% else %}
<script src="http://localhost:{{port}}/index.js"></script>
{% endif %}
</body>

</html>
