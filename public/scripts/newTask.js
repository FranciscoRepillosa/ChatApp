let SelectedInputs = {};

console.log("hello");

let selectInputsById = (inputsId, selector) => {
    inputsId.forEach(input => {
        console.log(input);
        SelectedInputs[`${input}`] = document.getElementById(input);
    });
}

selectInputsById(["taskName", "assignedName", "dueDate", "taskDescription"]);

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

let buildRequestBody = (taskName, assignedName, dueDate, taskDescription) => {
    return {
        taskName,
        assignedName,
        dueDate,
        taskDescription
    }
}


document.getElementById("inputButton").addEventListener("click", async (e) => {
    e.preventDefault();
    let {taskName, assignedName, dueDate, taskDescription } = SelectedInputs;

    console.log(assignedName.value);

    const response = await httpRequest("http://localhost:4000/task", "POST", buildRequestBody(taskName.value, assignedName.value, dueDate.value, taskDescription.value));
    const data = await response.json();
    console.log(data)

    if (data.status === "success") {
        alert("Task successfully created");
    } else {
        alert("there was a problem creating the task");
    }
})

