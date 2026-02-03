const form = document.getElementById("form")
const input_email = document.getElementById("email")
const input_password = document.getElementById("password")

form.addEventListener("submit" , function(event){
    event.preventDefault()
    const password = "1234"
    const email = "entrar@gmail.com"

    const enterdEmail = input_email.value.trim()
    const enteredPassword = input_password.value.trim()


    

    if(!enterdEmail || !enteredPassword){
        alert("Preencha todos os campos")
    } else if (enterdEmail === email && enteredPassword === password) {
        window.location.href="client.html" 
        } else {
            alert("Email ou senha incorretos")
        }
})