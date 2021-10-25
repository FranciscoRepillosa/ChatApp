
document.getElementById("inputButton").addEventListener("click", async (e) => {
    const taskId = document.getElementById("id").textContent;
    const path = `http://localhost:4000/task/${taskId}/status`;
    const role = document.getElementById("role").textContent;
    console.log(role);
    const reqBody = (role === "supervisor") ? {newStatus: "done"} : {newStatus: "reviewing"}
    const res = await fetch(path,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(reqBody)
    });

    const data = await res.json();
    console.log(data);

}) 
