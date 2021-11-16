const tasks = document.getElementsByClassName("li-task");

const mainTitle = document.getElementsByTagName("h2");

for (let i = 0; i < tasks.length; i++) {
    tasks[i].addEventListener("click", async (e) => {
       
    window.location.replace(`http://localhost:4000/task/${tasks[i].children[2].textContent}`);   
    }) 
}

const taskButtons = document.getElementsByClassName("form-button");



for (let i = 0; i < taskButtons.length; i++) {
    taskButtons[i].addEventListener("click", async (e) => {
        console.log(mainTitle[0].textContent);
        console.log(mainTitle[0].textContent.startsWith("M"));
        if (mainTitle[0].textContent.startsWith("M")) {
            console.log("user tasks");
           window.location.replace(`http://localhost:4000/task/userTasks/${taskButtons[i].value}`)
       }
        else {
               window.location.replace(`http://localhost:4000/task/assignedTasks/${taskButtons[i].value}`)
           }
           
    })
}

