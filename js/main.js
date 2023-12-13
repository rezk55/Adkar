
"use strict"

var countZekr = Number(document.getElementById('countTimes').innerHTML);
var _status = document.getElementById('status');
var showSab7 = document.getElementById('showSab7');
var numberZekr = 0;
var flagStatus = new Array(25).fill(0);
var myCountZekr = new Array(25).fill(0);
var currentCount = 0;
function counter(){
    currentCount += 1;
    showSab7.innerHTML = currentCount;
    if(currentCount === countZekr){
        _status.style.opacity = 1;
        flagStatus[numberZekr] = 1;
    }
    myCountZekr[numberZekr] = currentCount;
}

fetch('api.json')
    .then((response) => response.json())
    .then((json) => {
        let azkarElsabah = json["أذكار الصباح"];
        var countTimes = document.getElementById('countTimes');
        var textZekr = document.getElementById('textZekr');
        var next = document.getElementById('next');
        var showNumber = document.getElementById('showNumber');
        var previous = document.getElementById('previous');
        countTimes.innerHTML =  azkarElsabah[numberZekr].count
        textZekr.innerHTML = azkarElsabah[numberZekr].content;
        showNumber.innerHTML = numberZekr + 1;

        next.addEventListener("click", function(){
            if(numberZekr !== 25){
                numberZekr++;
                countTimes.innerHTML =  azkarElsabah[numberZekr].count
                textZekr.innerHTML = azkarElsabah[numberZekr].content;
                showNumber.innerHTML = numberZekr + 1;
                previous.disabled = false;
            }
            countZekr = Number(document.getElementById('countTimes').innerHTML);
            _status.style.opacity = flagStatus[numberZekr];
            currentCount = myCountZekr[numberZekr];
            showSab7.innerHTML = currentCount;
        });
        previous.addEventListener("click", function(){ 
            if(numberZekr){
                numberZekr--;
                countTimes.innerHTML =  azkarElsabah[numberZekr].count
                textZekr.innerHTML = azkarElsabah[numberZekr].content;
                showNumber.innerHTML = numberZekr + 1;
            }
            countZekr = Number(document.getElementById('countTimes').innerHTML);
            _status.style.opacity = flagStatus[numberZekr];
            currentCount = myCountZekr[numberZekr];
            showSab7.innerHTML = currentCount;
        });
       
    });
