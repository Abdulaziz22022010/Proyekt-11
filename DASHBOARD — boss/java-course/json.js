const tbody = document.querySelector(".tbody")
const add = document.querySelector(".add")
const name = document.querySelector(".name")
const surname = document.querySelector(".surname")
const phone = document.querySelector(".phone")
const date = document.querySelector(".date")
const update = document.querySelector(".update")

let editData = null

add.addEventListener("click", () => {
    let newStudent = {
        "name": name.value,
        "surname": surname.value,
        "date": date.value,
        "phone": phone.value
    }

    if (newStudent.name && newStudent.date && newStudent.phone && newStudent.surname) {

        fetch("https://660fdbb60640280f219ba3f6.mockapi.io/student", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newStudent)
        })
            .then(res => res.json())
            .then(data => {
                getStudents();
                name.value = ""
                surname.value = ""
                phone.value = ""
                date.value = ""
            })
    }
    else {
        alert("Formani toldiring")
    }

})





window.addEventListener("load", () => {
    getStudents()
})

console.log(tbody)

function getStudents() {
    tbody.innerHTML = ""
    fetch("https://660fdbb60640280f219ba3f6.mockapi.io/student", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => innerStudent(data))
        .catch(error => console.log(error))
}

function innerStudent(data) {
    data.forEach(element => {
        tbody.innerHTML += `

        <div class="box-java">
        <div class="boxes-card">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="img/python.png" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.surname}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    </div>
        
        `
    });
}



function removeStudent(id) {
    fetch(`https://660fdbb60640280f219ba3f6.mockapi.io/student/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => getStudents())
        .catch(error => console.log(error))
}




function getId(id) {
    fetch(`https://660fdbb60640280f219ba3f6.mockapi.io/student/${id}`, {

        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            editData = data;
            name.value = data.name;
            surname.value = data.surname;
            phone.value = data.phone;
            date.value = data.date
        })
        .catch(error => console.log(error))
}

update.addEventListener("click", () => {
    let newStudent = {
        "name": name.value,
        "surname": surname.value,
        "date": date.value,
        "phone": phone.value,
        "id" :editData.id
    }

    if (newStudent.name && newStudent.date && newStudent.phone && newStudent.surname) {

        fetch(`https://660fdbb60640280f219ba3f6.mockapi.io/student/${editData.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newStudent)
        })
            .then(res => res.app())
            .then(data => {
                editData = null;
                getStudents();
                name.value = ""
                surname.value = ""
                phone.value = ""
                date.value = ""
            })
    }
    else {
        alert("Formani toldiring")
    }
})