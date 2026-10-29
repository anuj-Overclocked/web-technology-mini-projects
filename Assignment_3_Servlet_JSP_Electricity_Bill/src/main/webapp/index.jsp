<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electricity Bill Calculator</title>
    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container min-vh-100 d-flex justify-content-center align-items-center">
        <div class="card shadow p-4" style="max-width: 500px; width: 100%;">
            <div class="text-center mb-4">
                <h2 class="text-primary fw-bold">Electricity Bill Calculator</h2>
                <p class="text-muted">Calculate your electricity bill based on units consumed</p>
            </div>
            <form action="calculate" method="post">
                <div class="mb-3">
                    <label for="units" class="form-label fw-semibold">Enter Electricity Units</label>
                    <input
                        type="number"
                        class="form-control"
                        id="units"
                        name="units"
                        min="0"
                        step="0.01"
                        placeholder="Enter units consumed"
                        required>
                </div>
                <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold">Calculate Bill</button>
            </form>
            <hr class="my-4">
            <div class="small text-muted">
                <p class="mb-1"><strong>Tariff Slab Rates:</strong></p>
                <p class="mb-1">First 50 units &rarr; &#8377;3.50 / unit</p>
                <p class="mb-1">Next 100 units (51-150) &rarr; &#8377;4.00 / unit</p>
                <p class="mb-1">Next 100 units (151-250) &rarr; &#8377;5.20 / unit</p>
                <p class="mb-0">Above 250 units &rarr; &#8377;6.50 / unit</p>
            </div>
        </div>
    </div>
</body>
</html>
