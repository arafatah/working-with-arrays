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

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; //Make the old html in index.html exact container empty.

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__value">${mov}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
/*
// Splice method muted the original array splice and slice are worked same way, the fundamental difference is splice muted the original array but slice don't. 
consol.log(arr.splice(2)); 
['c', 'd', 'e']
// Reversed method muted the original arrayIt's reversed the array
arr = ['a', 'b', 'c', 'd']
consol.log(arr.reverse());
['d', 'c', 'b', 'a']
// slice didn't muted original array

// concat method doesn't muted the original arrayIt's worked like spared operators. Ex: 
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
/*
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
*/
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SETs -Doesn't have key or index either. This underscore means the throwaway variable. Means a variable that's completely unnecessary.
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/
/*
Working With Arrays
Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
about their dog's age, and stored the data into an array (one array for each). For 
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years 
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have 
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat 
ages from that copied array (because it's a bad practice to mutate function 
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 
�
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far �
GOOD LUCK �*/

const checkDogs = function (JuliaData, KateData) {
  const dogsJuliaCorrected = JuliaData.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  console.log(dogsJuliaCorrected);

  const totalDogs = [...dogsJuliaCorrected, ...KateData];
  console.log(totalDogs);

  totalDogs.forEach(function (dog, i) {
    // const adultCheck = dog >= 3 ? 'adult' : 'puppy'
    // console.log(`Dog number ${i + 1} is an ${adultCheck}, and it's ${dog} years old.`)
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else console.log(`Dog number ${i + 1} is still a puppy.`);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
