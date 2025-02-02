'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'Premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'basic',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'standard',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'Premium',
};

const accounts = [account1, account2, account3, account4];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

const user = 'Steven Thomas Williams';

// Function for get userName
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });

  // const username = user.toLowerCase()
  //   .split(' ')
  //   .map(name => name[0])
  //   .join('');
  //   return username
};
createUsername(accounts);

const displayMovements = function (movements, sort = false) {
  // Always make innerHTML empty it will fix the problem.
  containerMovements.innerHTML = ''; //To make the old html in index.html exact container empty.

  // Slice here for to copy the array
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}
      </div>
     <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // acc.balance = balance;
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = interest;
};

const displayUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clear input
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    displayUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // clear the input field
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    console.log('Transfer done already');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    displayUI(currentAccount);
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//SOME method
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    // Add movement
    currentAccount.movements.push(amount);
    displayUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// //EVERY method
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);

    // Hide Ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();

  console.log(accounts);
});

const euroToUsd = 1.1;

//Pipeline
const totalDeposit = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov, i) => acc + mov, 0);
// console.log(totalDeposit);

/*
//reduce method
//Accumulator is like -> snowball - It can define initial value of the first accumulator
const balance = movements.reduce(function (acc, cur) {
  return acc + cur;
}, 0);
console.log(balance);

const balance2 = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance2);

// Maximum value
// const max = movements.reduce(
//   (acc, mov) => `${acc > mov ? acc : mov}`,
//   movements[0]
// );
// console.log(typeof max)

const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
*/

/////////////////////////////////////////////////
// LECTURES
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

*/
/*
//exploring at method 
const arr = [23, 54, 31, 67];
console.log(arr[0]);
console.log(arr.at(0));

// Getting last array of element
console.log(arr.length - 1);
console.log(arr.slice(-1));
console.log(arr.slice(-1)[0])
console.log(arr.at(-1)) // can be use (-2), (-3) as well. 



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

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SETs -Doesn't have key or index either. This underscore means the throwaway variable. Means a variable that's completely unnecessary.
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

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
GOOD LUCK �

const checkDogs = function (JuliaData, KateData) {
  const dogsJuliaCorrected = JuliaData.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  console.log(dogsJuliaCorrected);

  // Can be use with concat method. 
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
checkDogs([9, 16, 6, 8, 3], [[10, 5, 6, 1, 4]]);

const euroToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * euroToUsd;
// });
// console.log(movementsUSD);

// Using arrow function
const movementUSD = movements.map(mov => mov * euroToUsd);

console.log(movements);
console.log(movementUSD);

// Using for method
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
console.log(movementsUSDfor);

// With normal function
const movementsDescription = movements.map(function (mov, i) {
  if (mov > 0) {
    return `Movement ${i + 1}: You deposit ${Math.abs(mov)}`;
  } else {
    return `Movement ${i + 1}: You withdraw ${Math.abs(mov)}`;
  }
});
console.log(movementsDescription);

// with arrow function
const movementsDescription2 = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposit' : 'withdraw'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescription2);


// Filter method
const deposit = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposit);

const withdrawal = movements.filter( (mov) =>
   mov < 0
);

console.log(withdrawal);
*/

/*
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's 
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is 
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, 
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages �)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 
*/
const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avr2 = calcAverageHumanAge2([5, 2, 4, 4, 1, 15, 8, 3]);
const avr = calcAverageHumanAge2([16, 6, 55, 10, 5, 6, 1, 4]);
// console.log(avr, avr2);
/*
// Solved the challenge 2 problem
const calcAverageHumanAge = ages => {
  const humanAge = ages.map(age => {
    if (age <= 2) {
      return 2 * age;
    } else age > 2;
    return 16 + age * 4;
  });
  const adult = humanAge.filter(age => age >= 18);
  console.log(adult);
  console.log(humanAge); 
  const humanAverageAge =
    adult.reduce((acc, cur) => acc + cur, 0) / adult.length;
    return humanAverageAge; 
  console.log(humanAverageAge);
  
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2)*/

// With the arrow function and less code.
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(avg1, avg2);

//calculate the total deposit ---- Practice
const eurToUSD = 1.1;
const totalDeposit2 = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDeposit);

//flat method - It's used for to flat the array. Es6 feature
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat()); //[1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2)); // in the [parameter it can declare that how much level deep you wanna go. like 1 level 2 level 3 level - And it will show output like this .

const accountMovementsBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
// console.log(accountMovementsBalance);

//flatMap
const accountMovementsBalance2 = accounts
  .flatMap(acc => acc.movements) // it's only goes 1 level deep, if need go more deep, use flat method.
  .reduce((acc, mov) => acc + mov, 0);
// console.log(accountMovementsBalance2);

//This sorting is always based on string - built-in
//Sorting with the built-in function of JS muted the original array.
const owners = ['Jonas', 'Hridoy,', 'Foysal', 'Martha', 'Arafat'];
// console.log(owners.sort());

// return < 0, A, B
// return > 0, B, A
//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
// console.log(movements);

//Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15);
/*
Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are 
eating too much or too little.
Eating too much means the dog's current food portion is larger than the 
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% 
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate 
the recommended food portion and add it to the object as a new property. Do 
not create a new array, simply loop over the array. Formula: 
recommendedFood = weight ** 0.75 * 28. (The result is in grams of 
food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too 
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in 
the owners array, and so this one is a bit tricky (on purpose) �

3. Create an array containing all owners of dogs who eat too much 
('ownersEatTooMuch') and an array with all owners of dogs who eat too little 
('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and 
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat 
too little!"

5. Log to the console whether there is any dog eating exactly the amount of food 
that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food 
(just true or false)

7. Create an array containing the dogs that are eating an okay amount of food (try 
to reuse the condition used in 6.)

8. Create a shallow copy of the 'dogs' array and sort it by recommended food 
portion in an ascending order (keep in mind that the portions are inside the 
array's objects �)

The Complete JavaScript Course 26
Hints:
§ Use many different tools to solve these challenges, you can use the summary 
lecture to choose between them �
§ Being within a range 10% above and below the recommended portion means: 
current > (recommended * 0.90) && current < (recommended * 
1.10). Basically, the current portion should be between 90% and 110% of the 
recommended portion.
Test data:
 const dogs = [
 { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
 { weight: 8, curFood: 200, owners: ['Matilda'] },
 { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
 { weight: 32, curFood: 340, owners: ['Michael'] },
 ];
GOOD LUCK */

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => (dog.recFood = dog.weight ** 0.75 * 28));
console.log(dogs);

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah dog eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

console.log(dogs.some(dog => dog.curFood === dog.recFood));

const checkEatingOkay = dog =>
  dog.curFood > dog.recFood ** 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));
console.log(dogs.filter(checkEatingOkay));

const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);

movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`You deposited ${i + 1}: ${movement}`);
  } else {
    console.log(`You withdraw ${i + 1}: ${Math.abs(movement)}`);
  }
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const checkDogs = function (JuliaData, KateData) {
  const dogsJuliaCorrected = JuliaData.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // console.log(dogsJuliaCorrected);

  // Can be use with concat method.
  const totalDogs = [...dogsJuliaCorrected, ...KateData];
  // const totalDogs  = dogsJuliaCorrected.concat(KateData)
  // console.log(totalDogs);

  totalDogs.forEach(function (dog, i) {
    const adultCheck = dog >= 3 ? 'adult' : 'puppy';
    console.log(
      `Dog number ${i + 1} is an ${adultCheck}, and it's ${dog} years old.`
    );
    // if (dog >= 3) {
    //   console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    // } else console.log(`Dog number ${i + 1} is still a puppy.`);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('Separators------');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposit' : 'withdraw'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescription);

const createUsername2 = user => {
  const username = user
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  return username;
};
console.log(createUsername2('Arafat Howlader Bis Nabij'));

const deposit = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposit);

const withdrawal = movements.filter(mov => mov < 0);

console.log(withdrawal);

/////////////

/* class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return ${integerDisplay}.${decimalDigits}
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        ${this.getDisplayNumber(this.previousOperand)} ${this.operation}
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})  */

// Accumulator -> SNOWBALL
// Reduce method has two parameters/arguments. First: This will be the function Second: It will be the initial value for the loop iteration.
const balance = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur;
}, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Get maximum balance using reduce method
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements.at(0));
console.log(max);
///////
const calcAverageHumanAged = ages => {
  const humanAge = ages.map(age => {
    if (age <= 2) {
      return 2 * age;
    } else age > 2;
    return 16 + age * 4;
  });
  const adult = humanAge.filter(age => age >= 18);

  console.log(adult);
  console.log(humanAge);

  const humanAverageAge =
    adult.reduce((acc, cur) => acc + cur, 0) / adult.length;
  console.log(humanAverageAge);
  return humanAverageAge;
};

const avg12 = calcAverageHumanAged([5, 2, 4, 1, 15, 8, 3]);
const avg22 = calcAverageHumanAged([16, 6, 10, 5, 6, 1, 4]);

console.log(avg12, avg22);

console.log(movements);
const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 2000
);
console.log(
  `Your latest large movement was ${
    movements.length - latestLargeMovementIndex
  } movements ago.`
);

const arr2 = [[1, 2, 3], [4, 5, 6], 7, 7, 8];
console.log(arr2.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep2 = [[[1, 2], 3], [4, [5, 6]], 7, 8];

console.log(arrDeep2.flat(2));

const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'Deposit' : 'Withdraw'
);

console.log(groupedMovements);
console.log(accounts);

const groupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;

  if (movementCount >= 8) return 'Very active';
  if (movementCount >= 4) return 'Active';
  if (movementCount >= 1) return 'Moderate';
  return 'inactive';
});

console.log(groupedByActivity);

const groupAccounts = Object.groupBy(accounts, account => account.type);
console.log(groupAccounts);

const randomDiceRolls = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);
console.log(randomDiceRolls);

const bankDepositTotal = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositTotal);

const numDepositThousand = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0);

console.log(numDepositThousand);

// This plus plus(++) increase the value but didn't show result.
// To fix this: Use prefix operator(++a)
let a = 10;
console.log(a++);
console.log(a);

// This can be destructure also immediately.
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposit += cur) : (sums.withdrawal += cur);
      return sums;
    },
    { deposit: 0, withdrawal: 0 }
  );

console.log(sums);

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('hello my name is arafat'));

/////////////////////////////

