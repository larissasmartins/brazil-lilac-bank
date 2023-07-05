'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BRAZIL LILAC BANK APP

// Data
const account1 = {
  owner: 'Larissa Martins',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Maíra Martins',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Yan Sousa',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Wanderson Mendes',
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

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/* Show movements on dashboard function ------------------------ */
//Good practice to pass the data directly into the function
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const typeMov = mov > 0 ? `deposit` : `withdrawal`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${typeMov}">${i + 1} ${typeMov}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;
    // return console.log(typeMov);

    // This method accepts two strings - the position where to attach the HTML (CHECK MDN DOC) and the string contains HTML we want to insert 
    containerMovements.insertAdjacentHTML('afterbegin', html); //after begin to appear any new child element after the old ones

  });

};
displayMovements(account1.movements);

/* Display balance ---------------------------------------- */
const displayCalcBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} €`;
};
displayCalcBalance(account1.movements);

/* Compute user's username creating a new property on the objects --------------------------------- */
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ') // separate each name as an array's element 
      .map(letter => letter[0]) // iterate over the names to get the first letter
      .join(''); // put the letters together as string

  });
};
createUsernames(accounts);

/* Deposits and withdrawals array ------------------------ */
const deposits = movements.filter(mov => mov > 0); //filter the movements under 0;
const withdrawals = movements.filter(mov => mov < 0); ////filter the movements above 0;








/* Convert currency function ----------------------------- */
// const eurToUSD = 1.1;

// const movementsUSD = movements.map(mov => (mov * eurToUSD).toFixed());
// console.log(movementsUSD);






















// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJ = dogsJulia.slice(1, 3);
//   const allDogs = dogsJ.concat(dogsKate);

//   allDogs.forEach(function (age, i) {
//     const dogAge = age >= 3 ? `Dog number ${i + 1} is an adult, and is ${age} years old` : `Dog number ${i + 1} is still a puppy`;

//     return console.log(dogAge);
//   });

// }
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);



// // TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// // TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]