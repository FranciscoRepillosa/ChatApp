let SelectedInputs = {};

const a = document.getElementsByTagName("a");
console.log(a);

let selectInputsById = (inputsId, selector) => {
    inputsId.forEach(input => {
        console.log(input);
        SelectedInputs[`${input}`] = document.getElementById(input);
    });
}

selectInputsById(["guestEmail", "role", "departament"]);

let httpRequest = async (path, method, body) => {
    const response = await window.fetch(path, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    return response
}

let buildRequestBody = (guestEmail, role, departament) => {
    return {
        guestEmail,
        role,
        departament
    }
}


document.getElementById("inputButton").addEventListener("click", async (e) => {
    e.preventDefault();
    let {guestEmail, departament} = SelectedInputs;

    const role = document.getElementById("role");

    const response = await httpRequest("http://localhost:4000/invitation", "POST", buildRequestBody(guestEmail.value, role.value, departament.value));
    const data = await response.json();
    console.log(data)
    
    if (data.status === "success") {
        alert("Invitation successfully created");
    } else {
        alert("there was a problem creating the task");
    }
})

