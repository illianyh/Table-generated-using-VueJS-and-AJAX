<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Welcome</title>

    <!-- Bootstrap -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <!-- Css -->
    <link href="assets/css/style.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
    <div class="container" id="myApp">
        <div class="col-sm-12 text-center border-bottom">
            <h2>Welcome</h2>
        </div> <!-- /.col-sm-12 -->
        <table class="table table-bordered table-hover table-condensed">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <!-- vrepeat used to repeat variable which contains more that one items -->
                <tr v-repeat="plan: tableTd"> 
                    <td>{{ plan.date }}</td>
                    <td>{{ plan.title }}</td>
                    <td>{{ plan.price }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2" class="text-right">Total</td>
                    <td>{{ totalPrice }}</td>
                </tr>
            </tfoot>
        </table>
    </div><!-- /.container -->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="assets/js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="assets/js/bootstrap.min.js"></script>
    <!-- Include vue js -->
    <script src="assets/js/vue.min.js"></script>
    <!-- Include vue js resource for ajax -->
    <script src="assets/js/vue-resource.min.js"></script>
    <!-- Include app.js for original vue code -->
    <script src="assets/js/app.js"></script>
</body>

</html>