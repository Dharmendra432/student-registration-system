let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// Render students on page load
renderTable();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  // Validation
  if (!name.match(/^[A-Za-z ]+$/)) {
    alert("Name must contain only characters");
    return;
  }

  if (!id.match(/^[0-9]+$/)) {
    alert("Student ID must be numeric");
    return;
  }

  if (!email.match(/^\S+@\S+\.\S+$/)) {
    alert("Invalid email format");
    return;
  }

  if (!contact.match(/^[0-9]{10,}$/)) {
    alert("Contact number must be at least 10 digits");
    return;
  }

  const student = { name, id, email, contact };

  if (editIndex === null) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = null;
  }

  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  renderTable();
});

function renderTable() {
  table.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

function editStudent(index) {
  const student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.id;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  editIndex = index;
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
  }
}