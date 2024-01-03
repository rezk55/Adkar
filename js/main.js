
"use strict";

let navElSabah = document.getElementById('navElSabah');
let navElMasaa = document.getElementById('navElMasaa');
let navElNoom = document.getElementById('navElNoom');
let navElEstekaz = document.getElementById('navElEstekaz');
let navElTasabeeh = document.getElementById('navElTasabeeh');
let countZekr = Number(document.getElementById('countTimes').innerHTML);
let _status = document.getElementById('status');
let showSab7 = document.getElementById('showSab7');
let countTimes = document.getElementById('countTimes');
let textZekr = document.getElementById('textZekr');
let next = document.getElementById('next');
let showNumber = document.getElementById('showNumber');
let previous = document.getElementById('previous');
let sab7 = document.getElementById('sab7');

function fillArray(arr,val,length){
    for(let i=0;i<length;i++){
        arr.push(val);
    }
}

function fetchZekr(nameZekr,length){
    let flagStatus = [];
    let myCountZekr = [];
    fillArray(flagStatus,0,length)
    fillArray(myCountZekr,0,length)
    showSab7.innerHTML = 0;
    countTimes.innerHTML = 0;
    showNumber.innerHTML = 0;
    let numberZekr = 0;
    let currentCount = 0;
    fetch('api.json')
    .then((response) => response.json())
    .then((json) => {

        let contentElZekr = json[nameZekr];

        function showZekr(){
            countTimes.innerHTML =  contentElZekr[numberZekr].count
            textZekr.innerHTML = contentElZekr[numberZekr].content;
            showNumber.innerHTML = numberZekr + 1;
        }

        function getCountZekr(){
            countZekr = Number(countTimes.innerHTML);
            _status.style.opacity = flagStatus[numberZekr];
            currentCount = myCountZekr[numberZekr];
            showSab7.innerHTML = currentCount;
        }
        showZekr();
        getCountZekr();
        next.addEventListener("click", function(){
            numberZekr++;
            numberZekr %= length;
            
            showZekr();
            getCountZekr();
            console.log(flagStatus);
            
        });
        previous.addEventListener("click", function(){ 
            if(numberZekr){
                numberZekr--;
                showZekr();
                getCountZekr();
            } else {
                numberZekr = length-1;
                showZekr();
                getCountZekr();
            }
        });
        //counter for zekr
        sab7.addEventListener('click',function(){
            currentCount += 1;
            showSab7.innerHTML = currentCount;
            if(currentCount === countZekr){
                _status.style.opacity = 1;
                flagStatus[numberZekr] = 1;
            }
            myCountZekr[numberZekr] = currentCount;
        })
      
    });
}

function removeActive(){
    navElSabah.classList.remove('active');
    navElMasaa.classList.remove('active');
    navElNoom.classList.remove('active');
    navElEstekaz.classList.remove('active');
    navElTasabeeh.classList.remove('active');
}

navElSabah.addEventListener("click", function(){
    removeActive();
    this.classList.add('active');
    fetchZekr("أذكار الصباح",25);
});
navElMasaa.addEventListener("click", function(){
    removeActive();
    this.classList.add('active');
    fetchZekr("أذكار المساء",25);
});
navElNoom.addEventListener("click", function(){
    removeActive();
    this.classList.add('active');
    fetchZekr("أذكار النوم",10);
});
navElEstekaz.addEventListener("click", function(){
    removeActive();
    this.classList.add('active');
    fetchZekr("أذكار الاستيقاظ",3);
});
navElTasabeeh.addEventListener("click", function(){
    removeActive();
    this.classList.add('active');
    fetchZekr("تسابيح",16);
});