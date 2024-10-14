'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



/////////////////////////////////////////////////
/*
// Splice method muted the orginal arraysplice and slice are worked same way, the fundamental deffernce is splice muted the original array but slice don't. 
consol.log(arr.splice(2)); 
['c', 'd', 'e']
// Reversed method muted the orginal arrayIt's reversed the array
arr = ['a', 'b', 'c', 'd']
consol.log(arr.reverse());
['d', 'c', 'b', 'a']
// slice didn't muted original array

// concat metho doen'st muted the orginal arrayIt's worked like sparead operators. Ex: 
const letters = arr.concat(arr2)
consol.log(letters)
//spread operator
consol.log([...arr, ...arr2]);

// Join method use for, join all the array's element by using anything, like symbol ( - )EX: 
consol.log(letters.join('  -  '));a - b - c - d - e - f - g


//exploring at method 
const arr = [23, 54, 31, 67];
console.log(arr[0]);
console.log(arr.at(0));

// Getting last array of element
console.log(arr.length - 1);
console.log(arr.slice(-1));
console.log(arr.slice(-1)[0])
console.log(arr.at(-1)) // can be use (-2), (-3) as well. 
*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) {
    console.log(`You were deposit ${movement}`);
  } else if (movement < 0) {
    console.log(`You were withdraw ${Math.abs(movement)}`);
  }
}

console.log('---for loop with entries example----')
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You were deposit ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You were Withdraw ${Math.abs(movement)}`);
  }
}

console.log('---------forEach---------');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You were deposit ${movement}`);
  } else if (movement < 0) {
    console.log(`You were withdraw ${Math.abs(movement)}`);
  }
});

console.log('-----forEach another version------');
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You were deposit ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You were Withdraw ${Math.abs(movement)}`);
  }
});


const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);