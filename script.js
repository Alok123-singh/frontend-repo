function createUser(username,password,transaction,curr){
    this.username = username;
    this.password = password;
    this.transaction = transaction;
    this.currentBalance = curr;
    console.log(`User ${username} created!!`);
    return this;
}

const user1 = new createUser('Ss',1111,[1427,400,230,-30,-22,-87,500,242,-10,-5000,200,52],67421);
const user2 = new createUser('Im',2222,[10,40,280,-300,-2,-14,543,-64,25,46,67,-54],9625925);
const user3 = new createUser('Ca',3333,[1000,450,9475,1427,-50,-650,145,670,-650,650,49,60],32462);
const user4 = new createUser('Vm',4444,[3000,130,-450,30,-224,-8,960,-540,280,-478,40,100],89242);

const username = document.querySelector('#userSubmit');
const password = document.querySelector('#passwordSubmit')
const submit = document.querySelector('.submitOne');
// console.log(submit);
const body = document.querySelector('body');
const createForm = document.querySelector('#createUserId');

const users = [user1,user2,user3,user4];

createForm.addEventListener('click',function(e){
    e.preventDefault();
    const input1 = document.querySelector('#userSubmitId');
    const input2 = document.querySelector('#passwordSubmitId');

    const username = input1.value;
    const password = input2.value;

    if(username != "" && password != ""){
        console.log(`${username} ${password}`);
        let isPresent = false;
        users.forEach(function(user){
            if(user.username.toUpperCase() === username.toUpperCase())
                isPresent = true;
        })

        if(isPresent){
            alert('User already exist with entered username');
        }
        else{
            const user = new createUser(username,password,[2000],2000);
            users.push(user);
            input1.value = '';
            input2.value = '';
            alert('User created!');
        }
    }
    else{
        alert('Empty fields recieved!');
    }
    input1.value = '';
    input2.value = '';
})

submit.addEventListener('click',function(e){
    e.preventDefault();
    console.log(username.value,password.value);
    // console.log(typeof username.value,typeof password.value);
    const balanceSection = document.querySelector('.balanceClass');
    if(!body.contains(balanceSection)){
        if(username.value === "" || password.value === ""){
            
            alert('Empty fields recieved!');
        }
        else{
            showDetails(username.value,password.value);
            
        }
    }
    else {
        if(username.value === "" || password.value === ""){
            
            alert('Empty fields recieved!');
        }
        else{
            let alreadySignedIn = false;

            const Welcome = document.querySelector('#welcomeId');
            const val = Welcome.innerHTML;
            const str = val.substring(14);
            console.log(str);

            if(username.value.toUpperCase() === str.toUpperCase()){
                users.forEach(function(user){
                    const stringValue = user.password.toString();
                    if(user.username.toUpperCase() == str.toUpperCase()){
                        if(stringValue === password.value){
                            alreadySignedIn = true;
                        }
                        console.log(typeof password.value,password.value);
                        console.log(typeof user.password,user.password);
                    }
                });
            }

            if(alreadySignedIn) alert('You are already signed In');
            else{
                if(username.value === "" || password.value === ""){
            
                    alert('Empty fields recieved!');
                }
                else{
                    showDetails(username.value,password.value);
                    
                }
                // alert('Enter valid details!');
            }
        }
    }
    username.value = '';
    password.value = '';
});

// const sortButton = document.querySelector("#sortId");
let isSorted = false;



function modifySection1(username){
    const section = document.querySelector('.inner_navbar');
    section.innerHTML = `Welcome back, ${username}`;
     
}

function showDetails(name,pass){
    // console.log(`username : ${name}, password : ${pass}`);

    const section1 = document.querySelector('.balanceClass');
    const section2 = document.querySelector('#transactionId');
    const section3 = document.querySelector('#metaId');

    if(name !== ""){
        let valid = false;
        users.forEach( function(user){
            if(user.username.toUpperCase() === name.toUpperCase() && user.password == pass){
                if(body.contains(section1) == true)
                    body.removeChild(section1);
                if(body.contains(section2) == true)
                    body.removeChild(section2);
                if(body.contains(section3) == true)
                    body.removeChild(section3);
    
                console.log(user.username);
                modifySection1(user.username);
                createSection2(user.currentBalance);
                createSection3(user);
                createSection4(user);
                valid = true;
            }
        })
        if(!valid) alert('Enter valid details!!');
    }
    username.value = '';
    password.value = '';
}

function createSection2(balance){
    const section = document.createElement('div');
    const innerDiv1 = document.createElement('div');
    const innerDiv2 = document.createElement('div');
    section.appendChild(innerDiv1);
    section.appendChild(innerDiv2);

    const innerInnerDiv1 = document.createElement('div');
    const innerInnerDiv2 = document.createElement('div');
    innerDiv1.appendChild(innerInnerDiv1);
    innerDiv1.appendChild(innerInnerDiv2);

    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    innerInnerDiv1.appendChild(p1);
    innerInnerDiv2.appendChild(p2);

    section.classList.add('balanceClass');
    innerDiv1.classList.add('currencyClass');
    innerDiv2.classList.add('currencyClass');
    innerDiv2.setAttribute('id','currencyId');
    innerInnerDiv1.classList.add('currentClass');
    innerInnerDiv2.classList.add('dateClass');

    const date = new Date().toLocaleDateString('en-GB');

    p1.innerHTML = 'Current balance';
    // p2.innerHTML = 'As of 19/09/2023';
    p2.innerHTML = `As of ${date}`;
    
    innerDiv2.innerHTML = `${balance} ¥`;

    body.appendChild(section);
}

function createSection3(user){
    const section = document.createElement('section');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    section.appendChild(div1);
    section.appendChild(div2);

    section.setAttribute('id','transactionId');
    div1.classList.add('scrollClass');
    div2.classList.add('apClass');
    createInnerSection1(user,div1);
    createInnerSection2(user,div2);

    body.appendChild(section);
}

function createNewDepositSection(category,amount){
    const innerDiv = document.createElement('div');
    const innerInnerDiv1 = document.createElement('div');
    const innerInnerDiv2 = document.createElement('div');

    innerDiv.appendChild(innerInnerDiv1);
    innerDiv.appendChild(innerInnerDiv2);

    innerDiv.classList.add('trClass');
    if(amount > 0)
        innerInnerDiv1.classList.add('dwClass');
    else
        innerInnerDiv1.classList.add('wwClass');
    innerInnerDiv2.classList.add('amountClass');

    innerInnerDiv1.innerHTML = category;
    innerInnerDiv2.innerHTML = amount;

    return innerDiv;
}
// this.username = username;
// this.password = password;
// this.transaction = transaction; //array
// this.currentBalance = curr;

function createInnerSection1(user,div){
    user.transaction.forEach(function(element){
        if(element > 0){
            div.appendChild(createNewDepositSection('Deposit',element));
        }
        else{
            div.appendChild(createNewDepositSection('Withdrawal',element));
        }
    })
}

function clearCurrentHTML(){
    const section1 = document.querySelector('.balanceClass');
    const section2 = document.querySelector('#transactionId');
    const section3 = document.querySelector('#metaId');
    body.removeChild(section1);
    body.removeChild(section2);
    body.removeChild(section3);
}

function createNewHTML(user){
    modifySection1(user.username);
    createSection2(user.currentBalance);
    createSection3(user);
    createSection4(user);
}

function createMoneySection(user,div){
    const innerDiv1 = document.createElement('div');
    const innerDiv2 = document.createElement('div');

    div.appendChild(innerDiv1);
    div.appendChild(innerDiv2);

    innerDiv1.innerHTML = 'Transfer Money';

    innerDiv1.classList.add('serviceClass','colorClass');
    innerDiv2.classList.add('serviceClass');

    const form = document.createElement('form');
    innerDiv2.appendChild(form);

    const labelOne = document.createElement('label');
    labelOne.setAttribute('title','TransferName');
    const inputOne = document.createElement('input');
    inputOne.setAttribute('type','text');
    inputOne.setAttribute('placeholder','Transfer to');

    const labelTwo = document.createElement('label');
    labelTwo.setAttribute('title','Amount');
    const inputTwo = document.createElement('input');
    inputTwo.setAttribute('type','text');
    inputTwo.setAttribute('placeholder','Amount');

    const inputThree = document.createElement('input');
    inputThree.setAttribute('type','submit');
    inputThree.setAttribute('value','→');
    inputThree.classList.add('submitOne');

    form.appendChild(labelOne);
    form.appendChild(inputOne);
    form.appendChild(labelTwo);
    form.appendChild(inputTwo);
    form.appendChild(inputThree);
    
    inputThree.addEventListener('click',function(e){
        e.preventDefault();
        const transferTo = inputOne.value;
        const amount = parseInt(inputTwo.value);
        
        if(transferTo !== "" && inputTwo.value !== ""){
            console.log(`TransferTo : ${transferTo} and Amount : ${amount}`);
            console.log(`Types : ${typeof transferTo} ${typeof amount}`);

            let valid = false;
            users.forEach(function(userElement){
                if(userElement.username.toUpperCase() === transferTo.toUpperCase()){
                    valid = true;
                    if(!isAmountValid(inputTwo.value)){
                        alert('Invalid amount recieved!');
                    }
                    else 
                    {
                        if(user.currentBalance-100 > amount){
                            user.currentBalance -= amount;
                            userElement.currentBalance += amount;
                            user.transaction.unshift(-amount);
                            userElement.transaction.unshift(amount);
                            clearCurrentHTML();
                            createNewHTML(user);
                            
                        }
                        else{
                            alert('Balance too low.')
                        }
                    }
                }
            })
            if(!valid) alert('Wrong details recieved!! Enter valid user.')
        }
        else{
            alert('Empty fields recieved!');
        }
        inputOne.value = '';
        inputTwo.value = '';
    });
    
}

function createLoanSection(user,div){
    const innerDiv1 = document.createElement('div');
    const innerDiv2 = document.createElement('div');

    div.appendChild(innerDiv1);
    div.appendChild(innerDiv2);

    innerDiv1.classList.add('serviceClass','colorClass');
    innerDiv1.innerHTML = 'Request loan';

    innerDiv2.classList.add('serviceClass');

    const form = document.createElement('form');
    innerDiv2.appendChild(form);

    const labelOne = document.createElement('label');
    labelOne.setAttribute('title','Amount');
    const inputOne = document.createElement('input');
    inputOne.setAttribute('type','text');
    inputOne.setAttribute('placeholder','Amount');
    const inputTwo = document.createElement('input');
    inputTwo.setAttribute('type','submit');
    inputTwo.setAttribute('value','→');
    inputTwo.classList.add('submitOne');

    form.appendChild(labelOne);
    form.appendChild(inputOne);
    form.appendChild(inputTwo);

    inputTwo.addEventListener('click',function(e){
        e.preventDefault();

        const amount = parseInt(inputOne.value);
        if(inputOne.value === ""){
            alert('Empty fields recieved!');
        }
        else{
            if(amount > 0 && isAmountValid(inputOne.value)){
                if(amount > 100000){
                    alert('Amount too high');
                }
                else{
                    user.transaction.unshift(amount);
                    user.currentBalance += amount;
                    clearCurrentHTML();
                    createNewHTML(user);
                }
            }
            else{
                alert('Invalid amount entered!');
            }
        }
        inputOne.value = '';
    });
}

function createCloseAccountSection(user,div){
    const innerDiv1 = document.createElement('div');
    const innerDiv2 = document.createElement('div');

    div.appendChild(innerDiv1);
    div.appendChild(innerDiv2);

    innerDiv1.innerHTML = 'Close Account';
    innerDiv1.classList.add('serviceClass','colorClass');

    innerDiv2.classList.add('serviceClass');

    const form = document.createElement('form');
    innerDiv2.appendChild(form);

    const labelOne = document.createElement('label');
    labelOne.setAttribute('title','ConfirmUser');
    const inputOne = document.createElement('input');
    inputOne.setAttribute('type','text');
    inputOne.setAttribute('placeholder','Confirm user');

    const labelTwo = document.createElement('label');
    labelTwo.setAttribute('title','ConfirmPin');
    const inputTwo = document.createElement('input');
    inputTwo.setAttribute('type','text');
    inputTwo.setAttribute('placeholder','Confirm PIN');

    const inputThree = document.createElement('input');
    inputThree.setAttribute('type','submit');
    inputThree.setAttribute('value','→');
    inputThree.classList.add('submitOne');

    form.appendChild(labelOne);
    form.appendChild(inputOne);
    form.appendChild(labelTwo);
    form.appendChild(inputTwo);
    form.appendChild(inputThree);

    inputThree.addEventListener('click',function(e){
        e.preventDefault();

        const confirmUser = inputOne.value;
        const confirmPIN = inputTwo.value;
        console.log(confirmUser);
        
        if(confirmUser === "" || confirmPIN === ""){
            alert('Empty fields recieved!');
        }
        else{
            let isClosed = false;
            users.forEach(function(){
                if(user.username.toUpperCase() === confirmUser.toUpperCase()){
                    const index = users.indexOf(user);
                    users.splice(index,1);
                    clearCurrentHTML();
                    isClosed = true;
                    const welcome = document.querySelector('#welcomeId');
                    welcome.innerHTML = 'Welcome back, Guest';
                }
            })
            if(!isClosed){
                alert('Invalid details recieved!');
            }

        }

        inputOne.value = '';
        inputTwo.value = '';
    });

}

// this.username = username;
// this.password = password;
// this.transaction = transaction; //array
// this.currentBalance = curr;
function createInnerSection2(user,div){
    const innerDiv1 = document.createElement('div');
    const innerDiv2 = document.createElement('div');
    const innerDiv3 = document.createElement('div');

    div.appendChild(innerDiv1);
    div.appendChild(innerDiv2);
    div.appendChild(innerDiv3);

    innerDiv1.classList.add('moneyClass');
    innerDiv2.classList.add('loanClass');
    innerDiv3.classList.add('closeAccountClass');

    createMoneySection(user,innerDiv1);
    createLoanSection(user,innerDiv2);
    createCloseAccountSection(user,innerDiv3);

}

function createInnerMeta(user,div){
    const innerDiv1 = document.createElement('div');
    const innerDiv2 = document.createElement('div');
    const innerDiv3 = document.createElement('div');

    div.appendChild(innerDiv1);
    div.appendChild(innerDiv2);
    div.appendChild(innerDiv3);

    innerDiv1.classList.add('interestClass');
    innerDiv2.classList.add('interestClass');
    innerDiv3.classList.add('interestClass');

    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    const p5 = document.createElement('p');
    const p6 = document.createElement('p');

    innerDiv1.appendChild(p1);
    innerDiv1.appendChild(p2);

    innerDiv2.appendChild(p3);
    innerDiv2.appendChild(p4);

    innerDiv3.appendChild(p5);
    innerDiv3.appendChild(p6);

    p1.setAttribute('id','inParaId');
    p2.setAttribute('id','inId');
    p3.setAttribute('id','outParaId');
    p4.setAttribute('id','outId');
    p5.setAttribute('id','interestParaId');
    p6.setAttribute('id','interestId');
    
    let inVar = user.currentBalance * (35 / 760);
    let outVar = user.currentBalance * (22 / 654);
    let interestVar = user.currentBalance * (14 / 876);

    p1.innerHTML = 'IN';
    p2.innerHTML = `${inVar.toFixed(2)} ¥`;
    p3.innerHTML = 'OUT';
    p4.innerHTML = `${outVar.toFixed(2)} ¥`;
    p5.innerHTML = 'INTEREST';
    p6.innerHTML = `${interestVar.toFixed(2)} ¥`;
}

function createSection4(user){
    const section = document.createElement('section');
    section.setAttribute('id','metaId');

    const innerDiv1 = document.createElement('div');
    createInnerMeta(user,innerDiv1);

    const innerDiv2 = document.createElement('div');
    const innerDiv3 = document.createElement('div');

    section.appendChild(innerDiv1);
    section.appendChild(innerDiv2);
    section.appendChild(innerDiv3);

    innerDiv1.classList.add('metaClass');
    innerDiv2.classList.add('metaClass');
    innerDiv3.classList.add('metaClass');

    innerDiv2.setAttribute('id','sortId');
    innerDiv3.setAttribute('id','timerId');

    innerDiv2.innerHTML = '↓Sort';
    innerDiv3.innerHTML = 'You will be logged out in 30:00';

    innerDiv2.addEventListener('click',function(e){
        e.preventDefault();
        const name = username.value;
        console.log('sort clicked!');
    
        if(!isSorted){
            user.transaction.sort((a,b) => a-b);
            isSorted = true;
        }
        else{
            user.transaction.sort((a,b) => b-a);
            isSorted = false;
        }
        clearCurrentHTML();
        createNewHTML(user);
    });

    body.appendChild(section);
}

let countdownTime = 30 * 60;

function updateTimer() {
    let minutes = Math.floor(countdownTime / 60);
    let seconds = countdownTime % 60;

    const timerVar = document.querySelector('#timerId');
    // Display the time in the "timer" div
    timerVar.innerHTML = 'You will be logged out in ' + minutes + ":" + seconds;
    
    if (countdownTime > 0) {
    countdownTime--;
    } else {
    // Timer has reached zero
    document.querySelector('#timerId').innerHTML = "Time's up!";
    }
}

// setInterval(startTimer, 1000);
// function startTimer(){
//     const timerVar = document.querySelector('#timerId');
//     if(timerVar != undefined)
//         setInterval(updateTimer, 1000+1000+500);
// }

setInterval(updateTimer, 1000);
// Start the countdown timer
// updateTimer();

function isValid(str,pat){
    const array = str.split(' ');
    let tempString = "";
    array.forEach(function(part){
        tempString += part[0];
    });
    // console.log(tempString);
    return tempString.toUpperCase() == pat.toUpperCase();
}

function isAmountValid(amount){
    if(amount[0] == '0') return (false);
    let isValid = true;
    let str = String('Alok');
    console.log(typeof amount);
    Array.from(amount).forEach(function(character){
        if(!(character >= '0' && character <= '9'))
            isValid = false;
    })
    return (isValid);
}
