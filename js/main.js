
"use strict"

var navElSabah = document.getElementById('navElSabah');
var navElMasaa = document.getElementById('navElMasaa');
var navElNoom = document.getElementById('navElNoom');
var navElEstekaz = document.getElementById('navElEstekaz');
var navElTasabeeh = document.getElementById('navElTasabeeh');
var countZekr = Number(document.getElementById('countTimes').innerHTML);
var _status = document.getElementById('status');
var showSab7 = document.getElementById('showSab7');
var countTimes = document.getElementById('countTimes');
var textZekr = document.getElementById('textZekr');
var next = document.getElementById('next');
var showNumber = document.getElementById('showNumber');
var previous = document.getElementById('previous');
var sab7 = document.getElementById('sab7');

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
            if(numberZekr < length-1){
                numberZekr++;
                showZekr();
                previous.disabled = false;
                getCountZekr();
            }
        });
        previous.addEventListener("click", function(){ 
            if(numberZekr){
                numberZekr--;
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

// fetchZekr("أذكار الصباح",25);

navElSabah.addEventListener("click", function(){
    navElMasaa.classList.remove('active');
    navElNoom.classList.remove('active');
    navElEstekaz.classList.remove('active');
    navElTasabeeh.classList.remove('active');
    this.classList.add('active');
    fetchZekr("أذكار الصباح",25);
});
navElMasaa.addEventListener("click", function(){
    navElSabah.classList.remove('active');
    navElNoom.classList.remove('active');
    navElEstekaz.classList.remove('active');
    navElTasabeeh.classList.remove('active');
    this.classList.add('active');
    fetchZekr("أذكار المساء",25);
});
navElNoom.addEventListener("click", function(){
    navElMasaa.classList.remove('active');
    navElSabah.classList.remove('active');
    navElEstekaz.classList.remove('active');
    navElTasabeeh.classList.remove('active');
    this.classList.add('active');
    fetchZekr("أذكار النوم",10);
});
navElEstekaz.addEventListener("click", function(){
    navElMasaa.classList.remove('active');
    navElSabah.classList.remove('active');
    navElNoom.classList.remove('active');
    navElTasabeeh.classList.remove('active');
    this.classList.add('active');
    fetchZekr("أذكار الاستيقاظ",3);
});
navElTasabeeh.addEventListener("click", function(){
    navElMasaa.classList.remove('active');
    navElSabah.classList.remove('active');
    navElNoom.classList.remove('active');
    navElEstekaz.classList.remove('active');
    this.classList.add('active');
    fetchZekr("تسابيح",16);
});