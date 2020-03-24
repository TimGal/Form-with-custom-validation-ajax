let form = document.querySelector('.form-signup') //находим форму
let btn = document.querySelector('.btn-submit'); //находим кнопку
let email = document.querySelector('#email').value; // Получаем email из формы
let password = document.querySelector('#password').value; // Получаем пароль из формы
let confirm_password = document.querySelector('#confirm_password').value;// Получаем подтверждение пароля из формы

function getEmail() {
  return document.querySelector('#email').value;
}

function getPasswordValue() {
  return document.querySelector('#password').value; // Получаем пароль из формы
};

function getConfirmPasswordValue() {
  return document.querySelector('#confirm_password').value; // Получаем пароль из формы
};

function checkEmailValid() {
   var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   var address = getEmail();
   return reg.test(address);
};

function checkPasswordHasSmLetters () {
  let password = getPasswordValue();
  let s_letters = "qwertyuiopasdfghjklzxcvbnm"; // Буквы в нижнем регистре
  let is_s = false; // Есть ли в пароле буквы в нижнем регистре
  for (let i = 0; i < password.length; i++) {
    if (s_letters.indexOf(password[i]) != -1) is_s = true;
  };
  return is_s;
};

function checkPasswordHasBigLetters () {
  let password = getPasswordValue();
  let b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Буквы в верхнем регистре
  let is_b = false; // Есть ли в пароле буквы в верхнем регистре
  for (let i = 0; i < password.length; i++) {
    if (b_letters.indexOf(password[i]) != -1) is_b = true;
  };
  return is_b;
};

function checkPasswordHasDigits () {
  let password = getPasswordValue();
  let digits = "0123456789"; // Цифры
  let is_d = false; // Есть ли в пароле цифры
  for (let i = 0; i < password.length; i++) {
    if ( digits.indexOf(password[i]) != -1) is_d = true;
  };
  return is_d;
};

function checkPasswordLongEnough () {
  let password = getPasswordValue();
  if (password.length > 7) {
    return true;
  } else {
    return false;
  };
};

function checkPasswordConfirm() {
  let pass = getPasswordValue();
  let confirm_pass = getConfirmPasswordValue();
  if (pass == confirm_pass) {
    return true;
  } else {
    return false;
  };
};

function CheckedInput(input) {
  this.invalidities = [];
  this.inputTag = input;
  this.valid = false;
  // Добавляем сообщение об ошибке в массив ошибок
  this.addInvalidity = function(message) {

    if (!this.invalidities.includes(message)) {
      // console.log('Добавлено сообщение ' + message + ' В ' + input);
      this.invalidities.push(message);
    }
  },

  // Получаем общий текст сообщений об ошибках
  this.getInvalidities = function() {
    // console.log('Получены сообщения из ' + input);
    return this.invalidities.join('\n');
  }
};

let emailInput = new CheckedInput(document.querySelector('#email'));
let passwordInput = new CheckedInput(document.querySelector('#password'));
let confirmPasswordInput = new CheckedInput(document.querySelector('#confirm_password'));

function checkEmailValidity(emailvalid) {
  // console.log('Проверяем подходит ли майл');
  if (!checkEmailValid()) {
    // console.log(' Не подходит, добавим ошибку');
    emailvalid.addInvalidity('Enter the correct email address.');
  } else {
    emailvalid.valid = true;
    emailvalid.invalidities = [];
    // console.log('Подходит');
  };
};

function checkPasswordValidity(passvalid) {
  // console.log('Проверяем подходит ли пароль');
  if (!checkPasswordHasSmLetters()) {
    // console.log(' Не подходит, добавим ошибку');
    passvalid.addInvalidity('Password must contain at least one lowercase letter.');
  } else {
    // console.log('Подходит');
    delete passvalid.invalidities[0];
  };

  if (!checkPasswordHasBigLetters()) {
    // console.log(' Не подходит, добавим ошибку');
    passvalid.addInvalidity('Password must contain at least one uppercase letter.');
  } else {
    // console.log('Подходит');
    delete passvalid.invalidities[1];
  };

  if (!checkPasswordHasDigits()) {
    // console.log(' Не подходит, добавим ошибку');
    passvalid.addInvalidity('Password must contain at least one digit.');
  } else {
    // console.log('Подходит');
    delete passvalid.invalidities[2];
  };

  if (!checkPasswordLongEnough()) {
    // console.log(' Не подходит, добавим ошибку');
    passvalid.addInvalidity('Password must contain 8 or more symbols.');
  } else {
    // console.log('Подходит');
    delete passvalid.invalidities[3];
  };

  if (checkPasswordHasSmLetters() && checkPasswordHasBigLetters() && checkPasswordHasDigits() && checkPasswordLongEnough() ) {
    // console.log('Подходит');
    passvalid.valid = true;
    passvalid.invalidities = [];
  }
};

function checkConfirmPasswordValidity(confpassvalid) {
  // console.log('Проверяем подходит ли подтверждение пароля');
  if (!checkPasswordConfirm()) {
    // console.log(' Не подходит, добавим ошибку');
    confpassvalid.addInvalidity("Passwords don't match.");
  } else {
    // console.log('Подходит');
    confpassvalid.valid = true;
    confpassvalid.invalidities = [];
  };
};

function releaseCustomValidity() {
    checkEmailValidity(emailInput);
    checkPasswordValidity(passwordInput);
    checkConfirmPasswordValidity(confirmPasswordInput);

    let customEmailValidityMessage = emailInput.getInvalidities();
    let customPasswordValidityMessage = passwordInput.getInvalidities();
    let customConfirmPasswordValidityMessage = confirmPasswordInput.getInvalidities();
    document.getElementById('email').setCustomValidity(customEmailValidityMessage);
    document.getElementById('password').setCustomValidity(customPasswordValidityMessage);
    document.getElementById('confirm_password').setCustomValidity(customConfirmPasswordValidityMessage);

};


$('#btn-complete').click(function() {
  if (emailInput.valid == false || passwordInput.valid == false || confirmPasswordInput.valid == false ) {
    releaseCustomValidity();
  } else {
    checkConfirmPasswordValidity(confirmPasswordInput);
    $.ajax({
        url:      '/action.php', //url страницы
        type:     "POST", //метод отправки
        dataType: 'html',
        data: $("#ajax_form").serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
        	result = $.parseJSON(response);
        	$('#result_form').html('first_name: '+result.first_name+'<br>last_name: '+result.last_name+'<br>nationality: '+result.nationality+'<br>email: '+result.phonenumber+'<br>date_of_birth: '+result.date_of_birth+'<br>month_of_birth: '+result.month_of_birth+'<br>year_of_birth: '+result.year_of_birth+'<br>gender: '+result.gender+'<br>password: '+result.password);
          $("#ajax_form").hide();
          $(".form-header").text('Thank You!');
          $(".form-header").addClass("form-header-sended");
          $(".form-description").text('you registered!');
          $(".form-description").addClass("form-description-sended");

      	},
      	error: function(response) { // Данные не отправлены
              let btnComplete =  document.querySelector('#btn-complete');
              btnComplete.classList.add('animated', 'shake');
              $('#result_form').html('Ошибка. Данные не отправлены.');
              btnComplete.addEventListener('animationend', function() {
                btnComplete.classList.remove('animated', 'shake');
              });
      	}
 	});
  };
});

// Добавляем обработчик клика на кнопку отправки формы
// btn.addEventListener("click", function() {
//   if (emailInput.valid == false || passwordInput.valid == false || confirmPasswordInput.valid == false ) {
//     releaseCustomValidity();
//   } else {
//     $.ajax({
//         url:      '/action.php', //url страницы
//         type:     "POST", //метод отправки
//         dataType: 'html',
//         data: $("#ajax_form").serialize(),  // Сеарилизуем объект
//         success: function(response) { //Данные отправлены успешно
//         	result = $.parseJSON(response);
//         	$('#result_form').html('first_name: '+result.first_name+'<br>last_name: '+result.last_name+'<br>nationality: '+result.nationality+'<br>email: '+result.phonenumber+'<br>date_of_birth: '+result.date_of_birth+'<br>month_of_birth: '+result.month_of_birth+'<br>year_of_birth: '+result.year_of_birth+'<br>gender: '+result.gender+'<br>password: '+result.password);
//           $("#ajax_form").hide();
//           $(".form-header").text('Thank You!');
//           $(".form-header").addClass("form-header-sended");
//           $(".form-description").text('you registered!');
//           $(".form-description").addClass("form-description-sended");
//
//       	},
//       	error: function(response) { // Данные не отправлены
//               let btnComplete =  document.querySelector('#btn-complete');
//               btnComplete.classList.add('animated', 'shake');
//               $('#result_form').html('Ошибка. Данные не отправлены.');
//               btnComplete.addEventListener('animationend', function() {
//                 btnComplete.classList.remove('animated', 'shake');
//               });
//       	}
//  	});
//   };
//
// });

//Отрисовка SVG графики
new Vivus('draw-svg', {
   duration: 100,
   type: "sync",
   file: "../img/svg/person.svg"
});
