/*
ERRORS IN ORIGINAL CODE:

1. grade.html Line 9:
   onsubmit="checkMark()" should use return checkMark()
   to prevent page reload.

2. grade.html Line 17:
   showtable() should be showTable()
   because JavaScript function name is case-sensitive.

3. grade.html Line 19:
   grades.js should be grade.js (wrong filename).

4. grade.js Line 5:
   name = "" should be name == ""
   because = is assignment, == is comparison.

5. grade.js Line 9:
   isNan() should be isNaN()
   correct spelling and capital letters.

6. grade.js Line 14:
   mark < 0 && mark > 100 should be mark < 0 || mark > 100
   because mark cannot be below 0 OR above 100.

7. grade.js Line 28:
   getElementByID() should be getElementById()
   correct capitalization.

8. grade.js Line 30:
   style.colour should be style.color

9. grade.js Line 38:
   loop starts at i = 1; should start at i = 0
   so grade A is included.

10. grade.js Line 42:
    innerHtml should be innerHTML.

11. grade.js:
    showTable() and showtable() must use the same function name.

12. grade.js:
    Valid submission should return false to prevent page reload.
*/

/* Check student name and mark */
function checkMark() {

    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Check empty name
    if (name == "") {
        alert("Name must be filled out.");
        return false;
    }

    // Check empty mark
    if (mark == "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check mark is numeric
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);

    // Check mark range
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade
    let grade;

    if (mark >= 80) {
        grade = "A";
    }
    else if (mark >= 65) {
        grade = "B";
    }
    else if (mark >= 50) {
        grade = "C";
    }
    else {
        grade = "F";
    }

    // Display result
    document.getElementById("result").innerHTML =
        name + " got grade " + grade;

    // Change result colour according to grade
    if (grade == "A" || grade == "B") {
        document.getElementById("result").style.color = "green";
    }
    else if (grade == "C") {
        document.getElementById("result").style.color = "orange";
    }
    else {
        document.getElementById("result").style.color = "red";
    }

    // Display date and time
    document.getElementById("checkTime").innerHTML =
        "Checked on: " + new Date();

    // Prevent page reload
    return false;
}
/* part 2 */
/* Generate a random mark from 0 to 100 */
function randomMark() {

    let mark = Math.floor(Math.random() * 101);

    document.getElementById("mark").value = mark;
}

/* Display grade table */
function showTable() {

    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table>";
    tableHTML += "<tr><th>Grade</th><th>Mark Range</th></tr>";

    // Loop through all grades
    for (let i = 0; i < grades.length; i++) {

        tableHTML += "<tr><td>" + grades[i] +
                     "</td><td>" + ranges[i] +
                     "</td></tr>";
    }

    tableHTML += "</table>";

    // Display table
    document.getElementById("tableContainer").innerHTML = tableHTML;
}