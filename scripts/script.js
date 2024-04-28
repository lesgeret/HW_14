window.onload = function () {

    //fullname
    let inputFullName = document.getElementById('fullname');
    let labelFullName = document.getElementById('label-fullname');
    let fullnameAlert = document.createElement('span');
    fullnameAlert.style.cssText = "color: red; font-size: 12px; display: none";
    fullnameAlert.innerHTML = '&emsp;Используйте только буквы и пробелы';
    labelFullName.append(fullnameAlert);

    //username
    let inputUserName = document.getElementById('username');
    let labelUserName = document.getElementById('label-username');
    let usernameAlert = document.createElement('span');
    usernameAlert.style.cssText = "color: red; font-size: 12px; display: none";
    usernameAlert.innerHTML = '&emsp;Используйте буквы, цифры, "_" и "-"';
    labelUserName.append(usernameAlert);

    //email
    let inputEmail = document.getElementById('email');
    let labelEmail = document.getElementById('label-email');
    let emailAlert = document.createElement('span');
    emailAlert.style.cssText = "color: red; font-size: 12px; display: none";
    emailAlert.innerHTML = '&emsp;Введите корректный email';
    labelEmail.append(emailAlert);

    //password
    let inputPwd = document.getElementById('pwd');
    let labelPwd = document.getElementById('label-password');
    let passwordAlert = document.createElement('span');
    passwordAlert.style.cssText = "color: red; font-size: 12px; display: none";
    passwordAlert.innerHTML = '&emsp;Введите сложный пароль от 8 до 15 символов';
    labelPwd.append(passwordAlert);

    //repeat password
    let inputRepPwd = document.getElementById('repeat-pwd');
    let labelRepPwd = document.getElementById('label-repeat-pwd');
    let reppwdAlert = document.createElement('span');
    reppwdAlert.style.cssText = "color: red; font-size: 12px; display: none";
    reppwdAlert.innerHTML = '&emsp;Пароли не совпадают'
    labelRepPwd.append(reppwdAlert);

    let checkboxAgree = document.getElementById('check');

    // описание функции при нажатии на кнопку Sign Up
    let signUpFunction = function () {

        if ((/[\d]+[\S]+/gi).test(inputFullName.value) || !inputFullName.value) { //только буквы и пробелы в Full Name
            inputFullName.style.borderBottom = "2px solid red";
            fullnameAlert.style.display = "inline";
            return;
        } else {
            fullnameAlert.style.display = "none";
            inputFullName.style.borderBottom = "1px solid rgb(198, 198, 196)";
        }

        if ((/[^а-яa-z\d_-]+/ig).test(inputUserName.value) || !inputUserName.value) { // буквы, цифры, "_" и "-"
            inputUserName.style.borderBottom = "2px solid red";
            usernameAlert.style.display = "inline";
            return;
        } else {
            usernameAlert.style.display = "none";
            inputUserName.style.borderBottom = "1px solid rgb(198, 198, 196)";
        }

        if (!(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(inputEmail.value))) { // проверка email
            inputEmail.style.borderBottom = "2px solid red";
            emailAlert.style.display = "inline";
            return;
        } else {
            emailAlert.style.display = "none";
            inputEmail.style.borderBottom = "1px solid rgb(198, 198, 196)";
        }

        if (!(/(?=.*\d)(?=.*[А-ЯA-Z])(?=.*[\[\]\\\^\$\.\|\?\*\+\(\)]).{8,15}/.test(inputPwd.value))) {
            inputPwd.style.borderBottom = "2px solid red";
            passwordAlert.style.display = "inline";
            return;
        } else {
            passwordAlert.style.display = "none";
            inputPwd.style.borderBottom = "1px solid rgb(198, 198, 196)";  // проверка паролей
        }

        if (!(inputPwd.value === inputRepPwd.value)) {
            inputRepPwd.style.borderBottom = "2px solid red";
            reppwdAlert.style.display = "inline";
            return;
        } else {
            reppwdAlert.style.display = "none";
            inputRepPwd.style.borderBottom = "1px solid rgb(198, 198, 196)";
        }

        if (!checkboxAgree.checked) {
            alert("Are you Agree to our Terms of Service and Privacy Statement ?");
            checkboxAgree.checked = true;
            return;
        }

        let person = {};
        // добавляем данные в объект
        person.fullname = inputFullName.value;
        person.username = inputUserName.value;
        person.email = inputEmail.value;
        person.password = inputPwd.value;
        console.log(person);

        let clientsArray = []; // создали массив
        console.log(clientsArray);

        let clients = localStorage.getItem('clients');
        if (clients) {
            clientsArray = JSON.parse(clients);
        }

        clientsArray.push(person);
        localStorage.setItem('clients', JSON.stringify(clientsArray));

        document.getElementById('popup').style.display = 'block'; // показать ПОПАП

        document.getElementById('popup-btn').onclick = function () { //вешается слушатель на кнопку ПОПАПА
            document.getElementById('popup').style.display = 'none';
            // func to Login
            toLoginPage();  // запуск функции логина
        }

        inputFullName.value = "";
        inputUserName.value = "";
        inputEmail.value = "";
        inputPwd.value = "";
        inputRepPwd.value = "";
        checkboxAgree.checked = false;
    } // окончание функции signUpFunction

    // вызываем эту функцию
    let signUpButton = document.getElementById('signup_btn');
    signUpButton.addEventListener('click', signUpFunction);  /* назначаем первый слушатель */

    // 6). функция логина в систему
    let h1 = document.getElementById('hw-h1');
    let toLoginPage = function () {

        // переименовывание заголовка
        h1.textContent = "Log In to the system";
        h1.style.marginBottom = "50px";

        // удаляем текст
        document.getElementsByClassName('hw-left_content-info')[0].remove();

        // удаляем лейблы
        // document.getElementById('label-fullname').remove();
        labelFullName.remove();
        // document.getElementById('label-email').remove();
        labelEmail.remove();
        // document.getElementById('label-repeat-pwd').remove();
        labelRepPwd.remove();

        // удаляем инпуты
        // document.getElementById('fullname').remove();
        inputFullName.remove();
        // document.getElementById('email').remove();
        inputEmail.remove();
        // document.getElementById('repeat-pwd').remove();
        inputRepPwd.remove();

        // удаляем чекбокс
        checkboxAgree.remove();
        document.getElementById('checkbox-label').remove();

        // замена текста в кнопке
        signUpButton.textContent = "Sign In";

        // замена текста на Registration
        accountLink.textContent = "Registration";
        accountLink.removeEventListener('click', toLoginPage);  // удаляем 1й слушатель с неё
        accountLink.onclick = function () {   // вешаем функцию перезагрузки на Registration
            location.reload();
        }

        // функция второго слушателя Sign Up - заход в ЛК
        let loginFunction = function () {

            //проверяем наличие Username в Login
            if (!inputUserName.value) {
                inputUserName.style.borderBottom = "2px solid red";
                usernameAlert.innerHTML = '&emsp;Введите логин';
                usernameAlert.style.display = "inline";
                return;
            } else {
                usernameAlert.style.display = "none";
                inputUserName.style.borderBottom = "1px solid rgb(198, 198, 196)";
            }
            //проверяем наличие Password в Login
            if (!inputPwd.value) {
                inputPwd.style.borderBottom = "2px solid red";
                passwordAlert.innerHTML = '&emsp;Введите пароль';
                passwordAlert.style.display = "inline";
                return;
            } else {
                passwordAlert.style.display = "none";
                inputPwd.style.borderBottom = "1px solid rgb(198, 198, 196)";  // проверка паролей
            }
            // проверка данных с локал сторажем
            let clients = localStorage.getItem('clients');
            let clientsArray = JSON.parse(clients);

            let username = inputUserName.value;
            let password = inputPwd.value;

            let foundObject = clientsArray.find(function (item) {
                return item.username === username;
            })

            if (!foundObject) {
                // console.log("юзер НЕ найден");
                inputUserName.style.borderBottom = "2px solid red";
                usernameAlert.innerHTML = '&emsp;Пользователь не найден';
                usernameAlert.style.display = "inline";
            } else {
                if (foundObject.password !== password) {
                    inputPwd.style.borderBottom = "2px solid red";
                    passwordAlert.innerHTML = '&emsp;Неверный пароль';
                    passwordAlert.style.display = "inline";
                } else {
                    // alert("ПЕРЕХОД В ЛИЧНЫЙ КАБИНЕТ")
                    h1.textContent = "Welcome, " + foundObject.fullname + "!";
                    signUpButton.textContent = "Exit";
                    signUpButton.onclick = function () {   // вешаем функцию перезагрузки
                        location.reload();
                    }
                    labelUserName.remove();
                    inputUserName.remove();
                    labelPwd.remove();
                    inputPwd.remove();
                    accountLink.remove();
                }
            }

                inputUserName.value = "";
                inputPwd.value = "";

        } // завершение функции loginFunction

        signUpButton.removeEventListener('click', signUpFunction); /* удаляем первый слушатель */
        signUpButton.addEventListener('click', loginFunction); /* назначаем второй слушатель */
    } // завершение функции toLoginFunction

    // вызов функции перехода на Логин страницу
    let accountLink = document.getElementById('account_link');
    accountLink.addEventListener('click', toLoginPage); // назначение первого слушателя на ссылку

    // window.onload
}