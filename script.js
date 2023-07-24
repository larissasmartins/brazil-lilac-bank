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

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-07-21T17:01:17.194Z',
    '2023-07-22T23:36:17.929Z',
    '2023-07-23T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Maíra Martins',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Yan Sousa',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2021-06-25T18:49:59.371Z',
    '2022-11-20T12:01:20.894Z',
  ],
  currency: 'BRL',
  locale: 'pt-BR',
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

/* Format dates in general */
const formatMovementDate = function (date) {

  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}


/* Show movements on dashboard function ------------------------ */
//Good practice to pass the data directly into the function
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const moves = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  moves.forEach(function (mov, i) {
    const typeMov = mov > 0 ? `deposit` : `withdrawal`;

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${typeMov}">${i + 1} ${typeMov}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;
    // return console.log(typeMov);

    // This method accepts two strings - the position where to attach the HTML (CHECK MDN DOC) and the string contains HTML we want to insert 
    containerMovements.insertAdjacentHTML('afterbegin', html); //after begin to appear any new child element after the old ones

  });

};
// displayMovements(account1.movements);


/* Sum of the movements ---------------------------------------------- */
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`
};
// calcDisplaySummary(account1.movements);


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

const updateInterface = function (account) {
  // display movements, balance and summary (call the functions)
  displayMovements(currentAccount);
  displayCalcBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};

/* Display balance ---------------------------------------- */
const displayCalcBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance.toFixed(2)}€`;
};
// displayCalcBalance(account1.movements);

/* Deposits and withdrawals array ------------------------ */
const deposits = movements.filter(mov => mov > 0); //filter the movements under 0;
const withdrawals = movements.filter(mov => mov < 0); ////filter the movements above 0;


/* LOGIN event handles ------------------------------------ */
let currentAccount;

//FAKED LOGGED IN
currentAccount = account1;
updateInterface(currentAccount);
containerApp.style.opacity = 100;


const currentDate = new Date();
const day = `${currentDate.getDate()}`.padStart(2, 0);
const month = `${currentDate.getMonth() + 1}`.padStart(2, 0);
const year = currentDate.getFullYear();
const hour = `${currentDate.getHours()}`.padStart(2, 0);
const minutes = `${currentDate.getMinutes()}`.padStart(2, 0);
labelDate.textContent = `${day}/${month}/${year} ${hour}:${minutes} `;


btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); // prevent the form from submitting and prevent to reload the page

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === +(inputLoginPin.value)) {
    // display UI and welcome message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]} !`;

    // Clear input fields 
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    updateInterface(currentAccount);
  }
});


/* Transfer money from one user to another --------------- */
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault(); // prevent the form from submitting and prevent to reload the page

  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  const amount = +(inputTransferAmount.value);
  // Clear input fields 
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
  inputLoginPin.blur();

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateInterface(currentAccount);
  };
});

/* Request loan ----------------------------------------------------- */
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());

    //Update Interface
    updateInterface(currentAccount);
  }
  inputLoanAmount.value = '';
});


/* Close account function --------------------------------- */
btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if (currentAccount.value === inputCloseUsername.username && +(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    accounts.splice(index, 1); // Delete account
    containerApp.style.opacity = 0; // Hide UI
  };

  // Clear input fields 
  inputCloseUsername.value = "";
  inputClosePin.value = "";
});

let sorted = false;

btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});