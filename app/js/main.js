let form = document.querySelector('.form-signup') //находим форму
let btn = document.querySelector('.btn-submit'); //находим кнопку
let email = document.querySelector('#email').value; // Получаем email из формы
let password = document.querySelector('#password').value; // Получаем пароль из формы
let confirm_password = document.querySelector('#confirm_password').value;// Получаем подтверждение пароля из формы

function getPasswordValue() {
  return document.querySelector('#password').value; // Получаем пароль из формы
}

function getConfirmPasswordValue() {
  return document.querySelector('#confirm_password').value; // Получаем пароль из формы
}

function checkEmailValid() {
   var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   var address = email;
   if(reg.test(address) == false) {
      return false;
   } else {
     return true;
   }
};

function checkPasswordHasSmLetters () {
  let password = getPasswordValue();
  let s_letters = "qwertyuiopasdfghjklzxcvbnm"; // Буквы в нижнем регистре
  let is_s = false; // Есть ли в пароле буквы в нижнем регистре
  for (let i = 0; i < password.length; i++) {
    if (s_letters.indexOf(password[i]) != -1) is_s = true;
  }
  return is_s;
}

function checkPasswordHasBigLetters () {
  let password = getPasswordValue();
  let b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Буквы в верхнем регистре
  let is_b = false; // Есть ли в пароле буквы в верхнем регистре
  for (let i = 0; i < password.length; i++) {
    if (b_letters.indexOf(password[i]) != -1) is_b = true;
  }
  return is_b;
}

function checkPasswordHasDigits () {
  let password = getPasswordValue();
  let digits = "0123456789"; // Цифры
  let is_d = false; // Есть ли в пароле цифры
  for (let i = 0; i < password.length; i++) {
    if ( digits.indexOf(password[i]) != -1) is_d = true;
  }
  return is_d;
}

function checkPasswordLongEnough () {
  let password = getPasswordValue();
  if (password.length > 6) {
    return true;
  } else {
    return false;
  }
}

function checkPasswordConfirm() {
  let password = getPasswordValue();
  let confirm_password = getConfirmPasswordValue();
  if (password == confirm_password) {
    return true;
  } else {
    return false;
  }
}

function CustomValidation() { }

CustomValidation.prototype = {
  // Установим пустой массив сообщений об ошибках
  invalidities: [],

  // Метод, проверяющий валидность
  checkValidity: function(input) {

    var validity = input.validity;

    if (validity.patternMismatch) {
      this.addInvalidity('This is the wrong pattern for this field');
    }

    if (validity.rangeOverflow) {
      var max = getAttributeValue(input, 'max');
      this.addInvalidity('The maximum value should be ' + max);
    }

    if (validity.rangeUnderflow) {
      var min = getAttributeValue(input, 'min');
      this.addInvalidity('The minimum value should be ' + min);
    }

    if (validity.stepMismatch) {
      var step = getAttributeValue(input, 'step');
      this.addInvalidity('This number needs to be a multiple of ' + step);
    }

    // И остальные проверки валидности...
  },

  // Добавляем сообщение об ошибке в массив ошибок
  addInvalidity: function(message) {
    this.invalidities.push(message);
  },

  // Получаем общий текст сообщений об ошибках
  getInvalidities: function() {
    return this.invalidities.join('. \n');
  }
};

// Добавляем обработчик клика на кнопку отправки формы
submit.addEventListener('click', function(e) {
  // Пройдёмся по всем полям
  for (var i = 0; i < inputs.length; i++) {

    var input = inputs[i];

    // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
    if (input.checkValidity() == false) {

      var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
      inputCustomValidation.checkValidity(input); // Выявим ошибки
      var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
      input.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке

    } // закончился if
  } // закончился цикл
});
