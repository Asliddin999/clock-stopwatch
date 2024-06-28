//1 дз на гласные буквы
// function vowels(str = 'привет'){
//     let alphabet = 'аиуоыэеёюя';
//     let word = str.toLowerCase();
//     let count = 0;
//     for (let i = 0; i < word.length; i++) {
//         for (let k = 0; k < alphabet.length; k++) {
//           if(word[i] == alphabet[k]) count++;
//         }
//     }
//     return `В слове ${str} найдено ${count} гласных букв`;
// };
// console.log(vowels('ыдвлоаыдвлаодывлоадывлоа'));
//2 дз на комманды
// let names = [];
// while (true) {
//     let word = prompt('введите команды add, del, stop и какое-то слово');
//     if(!word) continue;
//     word = word.toLowerCase();
//     let wordArr = word.split(', ');
//     if(wordArr[0] == 'add') names.push(wordArr[1]);
//     else if(wordArr[0] == 'del'){
//         let index = names.indexOf(wordArr[1]);
//         if(index == -1) continue;
//         names.splice(index, 1);
//     }
//     else if(wordArr[0] == 'stop') break;
//     else continue;
// };
// console.log(names);


//табы
const links = document.querySelectorAll('.tabsItem'),
content = document.querySelectorAll('.tabsContentItem');

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e){
    //    console.log(this);
       e.preventDefault(); //отменяет действие элемента по умолчанию
       for (let k = 0; k < links.length; k++) {
          links[k].classList.remove('active');
          content[k].classList.remove('active');
        //   classList.add('class') //добавляет класс
        //   classList.remove('class') //удаляет класс
        //   classList.toggle('class') //если класс нет добавит, иначе удалит
        //   classList.contains('class') //проверяет на наличие класса
       };
       this.classList.add('active');
       content[i].classList.add('active');
   });
};


const secondArrow = document.querySelector('.s'),
    minuteArrow = document.querySelector('.m'),
    hourArrow = document.querySelector('.h'),
    minutesBlock = document.querySelector('.minutes'),
    hoursBlock = document.querySelector('.hours');


//рекурсия - это когда функция вызывает сама себя
// let i = 0;
// let id;
// function some(){
//     if(i < 15) {
//         i++;
//         console.log(i);
//         setTimeout(some, 1000);
//     }
    // if(i == 5) clearInterval(id);
// }
// some()
// id = setInterval(some, 1000);
// setTimeout(() => {
//     console.log('settimeout');
// }, 1000);
// setInterval(() => {
//     console.log('setinterval');
// }, 1000);
// for (let i = 1; i <= 15; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 1000);
// }

function clock(){
    let date = new Date();
    let s = date.getSeconds();
    let m = date.getMinutes();
    let h = date.getHours();
    minutesBlock.textContent = m < 10 ? `0${m}` : m;
    hoursBlock.textContent = h < 10 ? `0${h}` : h;
    // secondArrow.style.transform = `rotate(${s * 6}deg)`;
    // secondArrow.style.transition = '1000ms linear';
    secondArrow.animate([
        {transform: `rotate(${s * 6}deg)`},
        {transform: `rotate(${s * 6+6}deg)`},
    ], {
        easing: 'linear', 
        duration: 1000,
        fill: 'forwards'
    });
    minuteArrow.style.transform = `rotate(${m * 6}deg)`;
    hourArrow.style.transform = `rotate(${h * 30}deg)`;
    setTimeout(clock, 1000);
};
clock();


//секундомер

const indicator = document.querySelector('.tabsLink__span'),
     stopwatchHours = document.querySelector('.stopwatch__hours'),   
     stopwatchMinutes = document.querySelector('.stopwatch__minutes'),   
     stopwatchSeconds = document.querySelector('.stopwatch__seconds'),   
     stopwatchMlseconds = document.querySelector('.stopwatch__mlseconds'),   
     stopwatchBtn = document.querySelector('.stopwatch__btn');

let id;
const stopwatchRound = document.querySelector('.stopwatch__round'),
    stopwatchResult = document.querySelector('.stopwatch__result');
const audio = document.querySelector('.audio'),
    check = document.querySelector('#check');
stopwatchBtn.addEventListener('click', function(){
    if(this.textContent == 'start'){
        this.textContent = 'stop';
        indicator.classList.add('active');
        stopwatch();
    }
    else if(this.textContent == 'stop'){
        clearTimeout(id);
        indicator.classList.remove('active');
        indicator.classList.add('active_clear');
        this.textContent = 'clear';
        audio.pause();
    }
    else if(this.textContent == 'clear'){
        indicator.classList.remove('active_clear');
        this.textContent = 'start';
        stopwatchMlseconds.textContent = 0;
        stopwatchSeconds.textContent = 0;
        stopwatchMinutes.textContent = 0;
        stopwatchHours.textContent = 0;
        stopwatchResult.innerHTML = '';
    }
});

function stopwatch(){
    if(stopwatchMlseconds.textContent < 10) {
        stopwatchMlseconds.textContent++;
    }
    if(stopwatchMlseconds.textContent == 10){
        stopwatchMlseconds.textContent = 0;
        stopwatchSeconds.textContent++;
    }
    if(stopwatchSeconds.textContent == 60){
        stopwatchSeconds.textContent = 0;
        stopwatchMinutes.textContent++;
    }
    if(stopwatchMinutes.textContent == 60){
        stopwatchMinutes.textContent = 0;
        stopwatchHours.textContent++;
    }
    id = setTimeout(stopwatch, 100);
    if(check.checked) audio.play();
    else audio.pause();
};

stopwatchRound.addEventListener('click', function(){
    if(stopwatchBtn.textContent == 'stop'){
        let res = `${stopwatchHours.textContent} ${stopwatchMinutes.textContent} ${stopwatchSeconds.textContent} ${stopwatchMlseconds.textContent}`;
        stopwatchResult.innerHTML += `<p>${res}</p>`;
    }
});