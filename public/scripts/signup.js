let SelectedInputs = {};

console.log("hello");

let selectInputsById = (inputsId, selector) => {
    inputsId.forEach(input => {
        console.log(input);
        SelectedInputs[`${input}`] = document.getElementById(input);
    });
}

selectInputsById(["email", "password", "repeatPassword", "name"]);

let isAvalidPassword = (password, repeatPassword) => {
    
    if (password === "" || password !== repeatPassword)  {
        return false
    }

    return true

}

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

let buildRequestBody = (password, email, name) => {
    return {
        email,
        password,
        name
    }
}


document.getElementById("inputButton").addEventListener("click", async (e) => {
    e.preventDefault();
    let {email, password, name} = SelectedInputs;

    console.log(email.value, SelectedInputs.name.value);

 
 if ( isAvalidPassword(password.value, repeatPassword.value) ) {

    const response = await httpRequest("http://localhost:4000/user/signup", "POST", buildRequestBody(password.value, email.value, name.value));
    const data = await response.json();
    console.log(data)
    localStorage.setItem('authorization', `Bearer ${data.token}`);
    if(data.status === "success") {
        window.location.replace(`http://localhost:4000`); 
    }
 } else {
     alert("passwords don´t match or are empty")
 }
 
})

