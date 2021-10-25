

console.log("hello");

let selectInputsById = (inputsId, selector) => {
    let SelectedInputs = {};
    inputsId.forEach(input => {
        console.log(input);
        SelectedInputs[`${input}`] = document.getElementById(input);
    });
    return SelectedInputs;
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


const buttons = document.getElementsByClassName("inputButton");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", async (e) => {
       
    const invitationId = buttons[i].parentElement.previousElementSibling.textContent.replace("Id: ", "");  

    const response = await httpRequest(`http://localhost:4000/invitation/${invitationId}`, "PUT");
    const data = await response.json();
    console.log(data);
    }) 
}

document.getElementById("inputButton").addEventListener("click", async (e) => {
    e.preventDefault();

    const inputs = selectInputsById(["invitationId"]);

    console.log(inputs);

    const invitationId = inputs.invitationId.textContent.replace("Id: ", "");
    
    const response = await httpRequest(`http://localhost:4000/invitation/${invitationId}`, "PUT");
    const data = await response.json();
    console.log(data);
    
 
})

