const form = document.getElementById("resultForm");

const subjects = [
    "Web Technology",
    "Design & Analysis of Algorithms",
    "Computer Networks",
    "Ethical Hacking"
];

// API Base URL - change this if backend runs on different port
const API_BASE_URL = (window.location.origin && window.location.origin.includes(':8082')) ? window.location.origin : "http://localhost:8082";

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Validate and get student details
    const studentName = document.getElementById("studentName").value.trim();
    const prn = document.getElementById("prn").value.trim();
    const division = document.getElementById("division").value.trim();

    // Validate required fields
    if (!studentName || !prn || !division) {
        showError("Please fill in all student details.");
        return;
    }

    const mseMarks = document.querySelectorAll(".mse");
    const eseMarks = document.querySelectorAll(".ese");

    // Validate marks and calculate results
    const subjectResults = [];
    let totalMarks = 0;
    let resultStatus = "PASS";
    let resultHTML = "";

    for (let i = 0; i < subjects.length; i++) {

        const mse = Number(mseMarks[i].value);
        const ese = Number(eseMarks[i].value);

        // Validate marks
        if (isNaN(mse) || isNaN(ese) || mse < 0 || mse > 30 || ese < 0 || ese > 70) {
            showError(`Please enter valid marks for ${subjects[i]}. MSE: 0-30, ESE: 0-70`);
            return;
        }

        const total = mse + ese;
        totalMarks += total;

        const grade = calculateGrade(total);

        if (total < 40) {
            resultStatus = "FAIL";
        }

        subjectResults.push({
            subjectName: subjects[i],
            mse: mse,
            ese: ese,
            total: total,
            grade: grade
        });

        resultHTML += `
            <tr>
                <td>${subjects[i]}</td>
                <td>${mse}</td>
                <td>${ese}</td>
                <td>${total}</td>
                <td>${grade}</td>
            </tr>
        `;
    }

    const maximumMarks = 400;
    const percentage = (totalMarks / maximumMarks) * 100;

    // Prepare data to send to backend
    const resultData = {
        studentName: studentName,
        prn: prn,
        division: division,
        subjects: subjectResults,
        totalMarks: totalMarks,
        percentage: percentage.toFixed(2),
        resultStatus: resultStatus
    };

    // Send data to backend
    await saveResultToBackend(resultData);

    // Display result
    displayResult(studentName, prn, division, resultHTML, totalMarks, percentage, resultStatus);
});


async function saveResultToBackend(resultData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/results`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resultData)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Server error: ${response.status} - ${errorData}`);
        }

        const savedData = await response.json();
        showSuccess(`Result saved successfully! ID: ${savedData.id || 'unknown'}`);
        return savedData;

    } catch (error) {
        console.error("Error saving result:", error);
        showError(`Failed to save result: ${error.message}`);
        throw error;
    }
}


function displayResult(studentName, prn, division, resultHTML, totalMarks, percentage, resultStatus) {
    document.getElementById("displayName").textContent = studentName;
    document.getElementById("displayPrn").textContent = prn;
    document.getElementById("displayDivision").textContent = division;

    document.getElementById("resultTableBody").innerHTML = resultHTML;

    document.getElementById("totalMarks").textContent =
        `${totalMarks} / 400`;

    document.getElementById("percentage").textContent =
        `${percentage.toFixed(2)}%`;

    document.getElementById("resultStatus").textContent =
        resultStatus;

    document.getElementById("resultOutput").style.display = "block";

    document.getElementById("resultOutput").scrollIntoView({
        behavior: "smooth"
    });
}


function calculateGrade(total) {

    if (total >= 90) {
        return "A+";
    }

    if (total >= 80) {
        return "A";
    }

    if (total >= 70) {
        return "B+";
    }

    if (total >= 60) {
        return "B";
    }

    if (total >= 50) {
        return "C";
    }

    if (total >= 40) {
        return "D";
    }

    return "F";
}


function showError(message) {
    alert(`❌ ${message}`);
}


function showSuccess(message) {
    // Could enhance this with a toast notification, but alert works for now
    console.log(` ${message}`);
}
