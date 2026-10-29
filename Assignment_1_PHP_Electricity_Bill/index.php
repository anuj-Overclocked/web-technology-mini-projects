<!DOCTYPE html>
<html>
<head>

<title>Electricity Bill Calculator</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

</head>

<body class="bg-light">

<div class="container mt-5">

<div class="card shadow">

<div class="card-header bg-primary text-white">

<h3 class="text-center">Electricity Bill Calculator</h3>

</div>

<div class="card-body">

<form method="POST">

<div class="mb-3">

<label class="form-label">Enter Electricity Units</label>

<input
type="number"
name="units"
class="form-control"
placeholder="Enter Units"
required>

</div>

<div class="d-grid">

<button class="btn btn-success" type="submit">

Calculate Bill

</button>

</div>

</form>

<?php

if(isset($_POST['units']))
{

$units=$_POST['units'];

$bill=0;

if($units<=50)
{
$bill=$units*3.5;
}

elseif($units<=150)
{
$bill=(50*3.5)+(($units-50)*4);
}

elseif($units<=250)
{
$bill=(50*3.5)+(100*4)+(($units-150)*5.2);
}

else
{
$bill=(50*3.5)+(100*4)+(100*5.2)+(($units-250)*6.5);
}

echo "<div class='alert alert-info mt-4'>";

echo "<h4>Total Bill = Rs. ".number_format($bill,2)."</h4>";

echo "</div>";

}

?>

</div>

</div>

</div>

</body>

</html>