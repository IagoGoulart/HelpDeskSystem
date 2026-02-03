const ticket_form = document.getElementById("ticket-form")
const ticket_title = document.getElementById("ticket-title")
const ticket_category = document.getElementById("ticket-category")
const ticket_description = document.getElementById("ticket-description")
const ticket_list = document.querySelector(".ticket-list")
const filter_select = document.getElementById("filter")




function renderTickets(filter) {
 
    ticket_list.innerHTML = ""

    let tickets = JSON.parse(localStorage.getItem("tickets") || "[]");

    tickets.forEach(ticket => {
   
        if(filter !== "all" && ticket.status !== filter) return

      
        const li = document.createElement("li")
        const span_info = document.createElement("span")
        const span_status = document.createElement("span")

        // preenche os spans
        span_info.textContent = `#${ticket.id} - ${ticket.category} - ${ticket.title}`;
        span_status.textContent = ticket.status === "open" ? "Aberto" :
                                  ticket.status === "closed" ? "Resolvido" :
                                  "Cancelado"
        // adiciona classes
        span_status.classList.add("status" , ticket.status)


        // monta li
        li.appendChild(span_info)
        li.appendChild(span_status)

        // adiciona li na lista
        ticket_list.appendChild(li)
    })
}

ticket_form.addEventListener("submit", function(event){

    event.preventDefault()

    const title = ticket_title.value 
    const category = ticket_category.value 
    const description = ticket_description.value 

    if(title === "" || category === "" || description === "") {
        alert("Preencha todos os campos antes de abrir o chamado");
        return

     };

    let tickets = JSON.parse(localStorage.getItem("tickets") || "[]");

    let ticket = {
       id: tickets.length + 1,
       title: title,
       category: category,
       description: description,
       status: "open"
    }


    tickets.push(ticket)

    localStorage.setItem("tickets", JSON.stringify(tickets))

    alert("Ticket enviado com sucesso!")
    renderTickets(filter_select.value)



    ticket_form.reset()
});

filter_select.addEventListener("change", function(){
    renderTickets(filter_select.value)
})

renderTickets("all");







