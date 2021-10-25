let SelectedInputs = {};

console.log("hello");

let selectInputsById = (inputsId, selector) => {
    inputsId.forEach(input => {
        console.log(input);
        SelectedInputs[`${input}`] = document.getElementById(input);
    });
}

selectInputsById(["email", "password"]);

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

let buildRequestBody = (password, email) => {
    return {
        email,
        password
    }
}


document.getElementById("inputButton").addEventListener("click", async (e) => {
    e.preventDefault();
    let {email, password} = SelectedInputs;

    const response = await httpRequest("http://localhost:4000/user/login", "POST", buildRequestBody(password.value, email.value));
    const data = await response.json();
    console.log(data);
    if(data.status === "success") {
        window.location.replace(`http://localhost:4000`); 
    }
})

