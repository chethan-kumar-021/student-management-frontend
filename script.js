const API_URL = "http://127.0.0.1:5000/students";

const studentForm = document.getElementById("studentForm");

const studentTableBody = document.getElementById(
    "studentTableBody"
);

// LOAD STUDENTS WHEN PAGE LOADS

window.onload = () => {

    fetchStudents();
};

// FETCH ALL STUDENTS

async function fetchStudents() {

    try {

        const response = await fetch(API_URL);

        const students = await response.json();

        studentTableBody.innerHTML = "";

        students.forEach((student) => {

            const row = `

                <tr>

                    <td>${student.id}</td>

                    <td>${student.student_name}</td>

                    <td>${student.city_name}</td>

                    <td>${student.dob}</td>

                    <td>${student.age}</td>

                    <td>${student.gmail}</td>

                    <td>${student.branch}</td>

                    <td>

                        <button
                            class="delete-btn"
                            onclick="deleteStudent(${student.id})"
                        >
                            Delete
                        </button>

                    </td>

                </tr>
            `;

            studentTableBody.innerHTML += row;
        });

    } catch (error) {

        console.log(error);
    }
}

// ADD STUDENT

studentForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const studentData = {

        student_name: document.getElementById(
            "student_name"
        ).value,

        city_name: document.getElementById(
            "city_name"
        ).value,

        dob: document.getElementById(
            "dob"
        ).value,

        age: parseInt(
            document.getElementById("age").value
        ),

        gmail: document.getElementById(
            "gmail"
        ).value,

        branch: document.getElementById(
            "branch"
        ).value
    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(studentData)
        });

        const result = await response.json();

        if (response.ok) {

            alert(result.message);

            studentForm.reset();

            fetchStudents();

        } else {

            alert(result.error);
        }

    } catch (error) {

        console.log(error);
    }
});

// DELETE STUDENT

async function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete?"
    );

    if (!confirmDelete) {

        return;
    }

    try {

        const response = await fetch(

            `${API_URL}/${id}`,

            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        alert(result.message);

        fetchStudents();

    } catch (error) {

        console.log(error);
    }
}