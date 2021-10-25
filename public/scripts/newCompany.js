let SelectedInputs = {};

console.log("hello");

let selectInputsById = (inputsId, selector) => {
    inputsId.forEach(input => {
        console.log(input);
        SelectedInputs[`${input}`] = document.getElementById(input);
    });
}

selectInputsById(["companyName"]);

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

let buildRequestBody = (companyName) => {
    return {
        companyName
    }
}


document.getElementById("inputButton").addEventListener("click", async (e) => {
    e.preventDefault();
    let {companyName} = SelectedInputs;

    console.log(companyName.value);

    const response = await httpRequest("http://localhost:4000/company", "POST", buildRequestBody(companyName.value));
    const data = await response.json();
    console.log(data)
 
})

