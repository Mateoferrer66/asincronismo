//Piensas, “si ya tengo la función sum, para que hacer un callback, puedo llamarla tal cual y omitir ese paso”.
//Pero piensa que tienes funciones para sumar, restar, multiplicar …como hacer una calculadora.
//Las declaras todas en lista, y abajo solo tienes que usar un callback que va tirando de todas a la vez.



function sum(num1, num2) {
    return num1 + num2;
}

function rest(num1, num2) {
    return num1 - num2;
}

function mult(num1, num2) {
    return num1 * num2;
}

function div(num1, num2) {
    return num1 / num2;
}

function calc(num1, num2, callback) {
    return callback(num1, num2);
};



function sum(num1, num2) {
    return num1 + num2;
  }
  
  function calc(num1, num2, sumNumbers) {
    return sumNumbers(num1, num2);
  };
  
  console.log(calc(2, 2, sum));
  
  setTimeout(function () {
    console.log('Hola JavaScript');
    }, 5000)
  
  function gretting(name) {
    console.log(`Hola ${name}`);
  }
  
  setTimeout(gretting, 2000, 'Mateo');