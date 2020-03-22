document.querySelector('.form-signup').addEventListener('submit', validateForm);

function validateForm(event) {
  event.preventDefault();
  console.log('проверка формы');
  let form = document.querySelector('.form-signup') //находим форму
  let btn = document.querySelector('.btn-submit'); //находим кнопку
  let email = document.querySelector('#email').value; // Получаем email из формы
  let password = form.password.value; // Получаем пароль из формы

  console.log('email:' + ' ' + email);
  console.log('pass:' + ' ' + password);



  function checkPassword() {
     let s_letters = "qwertyuiopasdfghjklzxcvbnm"; // Буквы в нижнем регистре
     let b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Буквы в верхнем регистре
     let digits = "0123456789"; // Цифры
     let specials = "!@#$%^&*()_-+=\|/.,:;[]{}"; // Спецсимволы
     let is_s = false; // Есть ли в пароле буквы в нижнем регистре
     let is_b = false; // Есть ли в пароле буквы в верхнем регистре
     let is_d = false; // Есть ли в пароле цифры
     let is_sp = false; // Есть ли в пароле спецсимволы
     for (let i = 0; i < password.length; i++) {
       /* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
       if (!is_s && s_letters.indexOf(password[i]) != -1) is_s = true;
       else if (!is_b && b_letters.indexOf(password[i]) != -1) is_b = true;
       else if (!is_d && digits.indexOf(password[i]) != -1) is_d = true;
       else if (!is_sp && specials.indexOf(password[i]) != -1) is_sp = true;
     }
     let rating = 0;
     let text = "";
     if (is_s) rating++; // Если в пароле есть символы в нижнем регистре, то увеличиваем рейтинг сложности
     if (is_b) rating++; // Если в пароле есть символы в верхнем регистре, то увеличиваем рейтинг сложности
     if (is_d) rating++; // Если в пароле есть цифры, то увеличиваем рейтинг сложности
     if (is_sp) rating++; // Если в пароле есть спецсимволы, то увеличиваем рейтинг сложности
     /* Далее идёт анализ длины пароля и полученного рейтинга, и на основании этого готовится текстовое описание сложности пароля */
     if (password.length < 6 && rating < 3) text = "Простой";
     else if (password.length < 6 && rating >= 3) text = "Средний";
     else if (password.length >= 8 && rating < 3) text = "Средний";
     else if (password.length >= 8 && rating >= 3) text = "Сложный";
     else if (password.length >= 6 && rating == 1) text = "Простой";
     else if (password.length >= 6 && rating > 1 && rating < 4) text = "Средний";
     else if (password.length >= 6 && rating == 4) text = "Сложный";
     alert(text); // Выводим итоговую сложность пароля
     return false; // Форму не отправляем
   };

};
