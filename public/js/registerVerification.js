function registerValidation() {
    let firstName = document.getElementById("firstName");
    let surname = document.getElementById("surname");
    let email = document.getElementById("email");
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let repeatedPassword = document.getElementById("repeatedPassword");

    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    function nowIsOk(objClassList) {
        objClassList.remove("error")
        objClassList.add("verify")
    }

    if (firstName.value === "") {
        event.preventDefault();
        document.getElementById("firstNameError").classList.add("error")
    } else {
        nowIsOk(document.getElementById("firstNameError").classList)
    }

    if (surname.value === "") {
        event.preventDefault();
        document.getElementById("surnameError").classList.add("error")
    } else {
        nowIsOk(document.getElementById("surnameError").classList)
    }

    if (email.value === "" || !email.value.match(mailFormat)) {
        event.preventDefault();
        document.getElementById("emailError").classList.add("error")
    } else {
        nowIsOk(document.getElementById("emailError").classList)
    }

    if (username.value === "") {
        event.preventDefault();
        document.getElementById("userError").classList.add("error")
    } else {
        nowIsOk(document.getElementById("userError").classList)
    }

    if (password.value !== repeatedPassword.value) {
        event.preventDefault();
        document.getElementById("passwordError").innerHTML = "<p>Senhas distintas</p>"
        document.getElementById("passwordError").classList.add("error")
        return;
    } else {
        nowIsOk(document.getElementById("passwordError").classList)
    }
    
    if (password.value === "" || repeatedPassword.value === "") {
        event.preventDefault();
        document.getElementById("passwordError").innerHTML = "<p>Escolha uma senha</p>"
        document.getElementById("passwordError").classList.add("error")
    } else {
        nowIsOk(document.getElementById("passwordError").classList)
    }

}