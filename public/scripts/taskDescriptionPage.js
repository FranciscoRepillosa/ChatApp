
document.getElementById("inputButton").addEventListener("click", async (e) => {
    const taskId = document.getElementById("id").textContent;
    const status = document.getElementById("status").textContent;
    const path = `http://localhost:4000/task/${taskId}/status`;
    const role = document.getElementById("role").textContent;
    const newStatus = () => {
      
      if (role === "supervisor" && status === "pending") {
        return {newStatus: "reviewing"}
      }

      if(role === "admin" || role === "supervisor" && status === "reviewing" ) {
        return {newStatus: "done"}
      }

      else{
        return {newStatus: "reviewing"}
      }

    }
    const res = await fetch(path,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newStatus())
    });

    const data = await res.json();
    console.log(data);
    if(data.status === "success") {
      alert("task has been submitted for review");
      console.log(data);
      window.location.replace(`http://localhost:4000/task/userTasks/pending`)
    }
}) 
