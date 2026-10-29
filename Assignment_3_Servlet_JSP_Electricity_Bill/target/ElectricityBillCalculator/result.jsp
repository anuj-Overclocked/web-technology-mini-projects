<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electricity Bill Result</title>
    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container min-vh-100 d-flex justify-content-center align-items-center">
        <div class="card shadow p-4 text-center" style="max-width: 500px; width: 100%;">
            <h2 class="text-success fw-bold mb-4">Electricity Bill Result</h2>
            <div class="alert alert-info py-3 mb-3">
                <span class="text-muted d-block small">Units Consumed</span>
                <span class="fs-3 fw-bold">${units}</span>
            </div>
            <div class="alert alert-success py-3 mb-4">
                <span class="text-muted d-block small">Total Bill Amount</span>
                <span class="fs-2 fw-bold text-success">&#8377; ${bill}</span>
            </div>
            <a href="index.jsp" class="btn btn-primary w-100 py-2 fw-semibold">Calculate Another Bill</a>
        </div>
    </div>
</body>
</html>
