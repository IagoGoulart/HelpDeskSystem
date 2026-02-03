const ticket_list = document.querySelector(".ticket-list")
const filter_select = document.getElementById("filter")

function renderTickets(filter) {
    ticket_list.innerHTML = ""

    let tickets = JSON.parse(localStorage.getItem("tickets") || "[]")

    tickets.forEach((ticket, index) => {
        if(filter !== "all" && ticket.status !== filter) return;

        const li = document.createElement("li")
        const span_info = document.createElement("span")
        const span_status = document.createElement("span")

        const actionDiv = document.createElement("div")
        actionDiv.classList.add("actions")

        const btnResolve = document.createElement("button")
        btnResolve.classList.add("resolve")
        btnResolve.textContent = "Resolver"

        const btnCancel = document.createElement("button")
        btnCancel.classList.add("cancel")
        btnCancel.textContent = "Cancelar"

        actionDiv.appendChild(btnResolve)
        actionDiv.appendChild(btnCancel)

      
        span_info.textContent = `#${ticket.id} - ${ticket.category} - ${ticket.title}`;
        span_status.textContent = ticket.status === "open" ? "Aberto" :
                      ticket.status === "closed" ? "Resolvido" : "Cancelado";
        
        span_status.classList.add("status", ticket.status)  
          
       
        li.appendChild(span_info);
        li.appendChild(span_status);
        li.appendChild(actionDiv)

        ticket_list.appendChild(li)

        btnResolve.addEventListener("click", function(){
            tickets[index].status = "closed";
            localStorage.setItem("tickets", JSON.stringify(tickets))
            renderTickets(filter_select.value)
        })

        btnCancel.addEventListener("click", function(){
            tickets[index].status = "canceled"
            localStorage.setItem("tickets", JSON.stringify(tickets))
            renderTickets(filter_select.value)
        })

        if (ticket.status === "closed" || ticket.status === "canceled"){
            btnCancel.remove()
            btnResolve.remove()
        } 
    });

  
}

filter_select.addEventListener("change", function(){
    renderTickets(filter_select.value)
})

renderTickets("all")