"use strict";

// // Data
// const account1 = {
//     owner: 'Jonas Schmedtmann',
//     movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//     interestRate: 1.2, // %
//     pin: 1111,
// };

// const account2 = {
//     owner: 'Jessica Davis',
//     movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//     interestRate: 1.5,
//     pin: 2222,
// };

// const account3 = {
//     owner: 'Steven Thomas Williams',
//     movements: [200, -200, 340, -300, -20, 50, 400, -460],
//     interestRate: 0.7,
//     pin: 3333,
// };

// const account4 = {
//     owner: 'Sarah Smith',
//     movements: [430, 1000, 700, 50, 90],
//     interestRate: 1,
//     pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// Data 2 - Numbers Dates Intl and Timers

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2022-04-04T23:36:17.929Z',
        '2022-04-07T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
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

const accounts = [account1, account2];

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

// date
const currentDate = new Date()
const day = `${currentDate.getDate()}`.padStart(2, 0)
const month = `${currentDate.getMonth() + 1}`.padStart(2, 0)
const year = `${currentDate.getFullYear()}`
const hour = `${currentDate.getHours()}`.padStart(2, 0)
const min = `${currentDate.getMinutes()}`.padStart(2, 0)
console.log(currentDate);
labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`

const formatMovementDates = function (movementDate, locale) {
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))
    const daysPassed = calcDaysPassed(currentDate, movementDate);
    console.log(daysPassed);

    if (daysPassed === 0) {
        return "Today"
    } else if (daysPassed === 1) {
        return "Yesterday"
    } else if (daysPassed < 7) {
        return `${daysPassed} days ago`
    } else {
        labelDate.textContent = new Intl.DateTimeFormat(locale).format(currentDate)
        return new Intl.DateTimeFormat(locale).format(movementDate)
    };
};

const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(value)
}

const displayMovements = function (account, sort = false) {
    containerMovements.innerHTML = "";

    const movements = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;


    movements.forEach(function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal"

        const movementDate = new Date(account.movementsDates[i])
        const displayDate = formatMovementDates(movementDate, currentAccount.locale);

        const formattedMovement = formatCur(mov, account.locale, account.currency)
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${formattedMovement}</div>
        </div>`;
        containerMovements.insertAdjacentHTML("afterbegin", html)
    });
};

const username = function (user) {
    const userSplit = user.toLowerCase().split(" ");
    const test = []
    userSplit.forEach((name, i, arr) => {
        test.push(userSplit[i].charAt(0));
    })
    return test.join("")
}

const makeUsername = function (user) {
    const username = user.toLowerCase().split(" ").map((name) =>
        name.charAt(0)).join("")
    return username
}

const makeUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(" ")
            .map(name => name[0])
            .join("");
        // return username
    });
};

makeUsernames(accounts)

const calcDisplayBalance = function (account) {
    account.balance = account.movements.reduce((acc, mov) => acc + mov, 0)
    labelBalance.textContent = formatCur(account.balance, account.locale, account.currency)
}

// Deposits/Withdrawal
const displaySummary = function (account) {
    // Deposits
    const displayDepositsUSD = function (account) {
        account.deposits = account.movements.filter((mov) => mov > 0).reduce((acc, cur) => acc + cur, 0);
        labelSumIn.textContent = formatCur(account.deposits, account.locale, account.currency)
    }
    // Withdrawals
    const displayWithdrawalsUSD = function (account) {
        account.withdrawals = account.movements.filter((mov) => mov < 0).reduce((acc, cur) => acc + cur, 0);
        labelSumOut.textContent = formatCur(Math.abs(account.withdrawals), account.locale, account.currency)
    }
    // Interest 
    const displayInterest = function (account) {
        account.interest = account.movements.filter((mov) => mov > 0).filter(function (mov) {
            return mov = 1 <= (mov * account.interestRate) / 100
        }).reduce((acc, cur) => acc + cur) * (account.interestRate) / 100;
        labelSumInterest.textContent = formatCur(account.interest, account.locale, account.currency)
    }
    displayDepositsUSD(account);
    displayWithdrawalsUSD(account)
    displayInterest(account)

}

const updateUI = function (account) {
    displaySummary(account)
    calcDisplayBalance(account)
    displayMovements(account)
}

//Timer
const startLogoutTimer = function () {
    const tick = function () {
        const minutes = String(Math.trunc(time / 60)).padStart(2, "0");
        const seconds = String(time % 60).padStart(2, "0");
        labelTimer.textContent = `${minutes}:${seconds}`;
        if (time === 0) {
            clearInterval(timer);
            containerApp.style.opacity = 0
            labelWelcome.textContent = "Log in to get started"
        }
        time--
    };

    let time = 300;
    tick();
    const timer = setInterval(tick, 1000)
    return timer;
}
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1


//Login
btnLogin.addEventListener("click", function (e) {
    e.preventDefault()
    // by default a submit button will reload the page
    currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value)
    const options = {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        // weekday: "long"
    }
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(currentDate)
    if (currentAccount?.pin === +inputLoginPin.value) {
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(" ")[0]}`
        updateUI(currentAccount)
        containerApp.style.opacity = 1
        inputLoginUsername.value = inputLoginPin.value = ""
        inputLoginPin.blur()
        if (timer) clearInterval(timer)
        timer = startLogoutTimer()
        console.log("logged in");
    } else if (currentAccount.pin !== +inputLoginPin.value) {
        labelWelcome.textContent = "Incorrect pin"
        containerApp.style.opacity = 0
    }
    console.log(currentAccount);
})

// Transfers
btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = +inputTransferAmount.value;
    const recipient = accounts.find(acc => acc.username === inputTransferTo.value);
    console.log(amount, recipient);
    if (amount > 0 && currentAccount.balance >= amount && recipient?.username !== currentAccount.username) {
        currentAccount.movements.push(-amount)
        recipient.movements.push(amount)
        inputTransferAmount.value = inputTransferTo.value = ""
        // add tranfer date
        currentAccount.movementsDates.push(new Date().toISOString())
        recipient.movementsDates.push(new Date().toISOString())

        updateUI(currentAccount)

        clearInterval(timer)
        timer = startLogoutTimer()
    }
    // console.log(recipient.movements);
})

// Close Account (delete accounts[i] from accounts array)
btnClose.addEventListener("click", function (e) {
    e.preventDefault();
    if (inputCloseUsername.value === currentAccount.username || inputCloseUsername.value === currentAccount.owner && +inputClosePin.value === currentAccount.pin) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username)
        accounts.splice(index, 1)
        console.log(accounts);
        containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = ""
})


let sorted = false;
btnSort.addEventListener("click", function (e) {
    e.preventDefault()
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
})

// Loans
btnLoan.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        setTimeout(function () {
            currentAccount.movements.push(amount)
            currentAccount.movementsDates.push(new Date().toISOString())
            updateUI(currentAccount)
            console.log("Works");
        }, 2500);
    }
    inputLoanAmount.value = ""
    clearInterval(timer)
    timer = startLogoutTimer()
})


// const accountMovements = accounts.map((account) => account.movements)
// console.log(accountMovements);
// const allMovements = accountMovements.flat()
// console.log(allMovements);
// const overallBalance = allMovements.reduce((accu, cur) => accu + cur, 0)
// console.log(overallBalance);

//chained
// const overallBalance = accounts.map((account) => account.movements).flat().reduce((accu, cur) => accu + cur, 0)
// console.log(overallBalance);
const overallBalance = accounts.flatMap((account) => account.movements).reduce((accu, cur) => accu + cur, 0)
console.log(overallBalance);

console.log(new Date(account1.movementsDates));

// setInterval(function () {
//     const now = new Date()
//     console.log(now.getHours(), now.getMinutes(), now.getSeconds());
// }, 1000)