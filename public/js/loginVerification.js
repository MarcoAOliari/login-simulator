document.querySelector("button").addEventListener("click", function(){
    if(document.getElementById("username").value === "") {
        alert("Forneça um usuário!")
        return;
    }
    if(document.getElementById("password").value === "") {
        alert("Digite sua Senha!")
    }
})
