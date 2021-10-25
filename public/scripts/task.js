const tasks = document.getElementsByClassName("li-task");

console.log(tasks.length);



for (let i = 0; i < tasks.length; i++) {
    tasks[i].addEventListener("click", async (e) => {
       
    window.location.replace(`http://localhost:4000/task/${tasks[i].children[2].textContent}`);   
    }) 
}