const months=[ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
const daysWeek=[ "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс" ]

var table = document.getElementById("Calendar");
var currMonth=new Date().getMonth();
var currYear=new Date().getFullYear();

var today=new Date().getDate();
var nowMonth=new Date().getMonth();
var nowYear=new Date().getFullYear();

calculationMonth(currMonth, currYear, table);

//заполнение дней месяца
function fillDaysOfMonth(counter, weeks, amountDays){
  var isCurrent=true;
    for (var i = 0; i < weeks; i++) {
      var row = document.createElement("tr");
      for (var j = 0; j < 7; j++) {
          var cell = document.createElement("td");
          if(counter != amountDays){
              counter++;
              console.log(nowMonth)
              if(currMonth==nowMonth && isCurrent && currYear==nowYear){
                if(counter==today){
                  cell.classList.add("today");
                }
              }
          }
          else{
              counter=1;
              isCurrent=false;
          }
          if(!isCurrent)
          {
            cell.classList.add("not-current");
          }
          cell.innerHTML = counter;
          row.appendChild(cell);
      }
      table.appendChild(row);
    }
}

//заполнение дней недели
function weekDays(){
  var row = document.createElement("tr");
  for (var i = 0; i < daysWeek.length; i++) {
    var cell = document.createElement("td");
    cell.innerHTML = daysWeek[i];
    row.appendChild(cell);
  }
  table.appendChild(row);
}

//расчет дня недели первого дня текущего месяца
function numberOfFirstDayWeek(firstDay){
  if(firstDay.getDay()!=0){
    var numberFirstDayWeek = firstDay.getDay()-1;
  }else{
    var numberFirstDayWeek = 6;
  }
  return numberFirstDayWeek;
}

//заполенение месяца и года
function fillMonthYear(currMonth, currYear){
  var monthYear=document.getElementById("monthYear");
  monthYear.innerHTML="";
  monthYear.append(months[currMonth-1] + ' ' + currYear);
}

//заполнение первой недели месяца начинающегося НЕ с понедельника
function fillFirstWeekMonth(lastDayPrevMonth){
  var row = document.createElement("tr");
    counterDay=0;
    for(var k = 0; k < 7; k++ ){
        var cell = document.createElement("td");
        if(lastDayPrevMonth < new Date(currYear, currMonth, 0).getDate()){
          cell.classList.add("not-current");
            lastDayPrevMonth++;
            cell.innerHTML = lastDayPrevMonth;
        }
        else{
            counterDay++;
            if(currMonth==nowMonth && currYear==nowYear){
              if(counterDay==today){
                cell.classList.add("today");
              }
            }
            cell.innerHTML = counterDay;
        }
        row.appendChild(cell);
    }
    table.appendChild(row);
    return counterDay;
}

//заполнение календаря месяца
function calculationMonth(month, year, table){
  table.innerHTML = "";//отчищаем таблицу

  var d = new Date(year, month, 1);
  var currMonth = d.getMonth()+1;//номер текущего месяца (1-12)
  var currYear = d.getFullYear();

  var numberFirstDayWeek = numberOfFirstDayWeek(new Date(currYear,currMonth-1,1));//день недели первого дня текущего месяца

  fillMonthYear(currMonth, currYear);//записываем месяц и год

  weekDays();//заполняем дни недели

  if(numberFirstDayWeek == 0 ){
    fillDaysOfMonth(0, 6, new Date(currYear, currMonth, 0).getDate());//заполнение дней месяца
  }
  else{
    counterDay=fillFirstWeekMonth(new Date(currYear, currMonth-1, 0).getDate() - numberFirstDayWeek);//расчет дня на котором остановился расчет первой недели
    fillDaysOfMonth(counterDay, 5, new Date(currYear, currMonth, 0).getDate());//заполнение дней месяца
  }
}

//расчет предыдущего месяца
function prev(){
  currMonth=currMonth-1;
  if(currMonth<0){
    currYear=currYear-1;
    currMonth=11;
  }
  calculationMonth(currMonth,currYear, table);
}

//расчет следующего месяца
function next(){
  currMonth=currMonth+1;
  if(currMonth>11){
    currYear=currYear+1;
    currMonth=0;
  }
  calculationMonth(currMonth,currYear, table);
}