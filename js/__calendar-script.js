$(document).ready(function(){
	$(".calendar-slider").slick({
		infinite: false
	});
})

let curDate = new Date();

function createCalendar(elem, year, month) {
	let mon = month - 1;
	let d = new Date(year, mon);
	let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

	// пустые ячейки с понедельника до начала месяца
	for (let i = 0; i < getDay(d); i++) {
		table += '<td class="pDateCell"></td>';
	}

	// ячейки с датами
	while (d.getMonth() == mon) {
		table += '<td class="dateCell">' + d.getDate() + '</td>';
		if (getDay(d) % 7 == 6) { // 
			table += '</tr><tr>';
		}
		d.setDate(d.getDate() + 1);
	}

	if (getDay(d) != 0) {
		for (let i = getDay(d); i < 7; i++) {
			table += '<td class="fDateCell"></td>';
		}
	}

	// закрыть таблицу
	table += '</tr></table>';
	if (month == 1) monthName = "Январь";
	if (month == 2) monthName = "Февраль";
	if (month == 3) monthName = "Март";
	if (month == 4) monthName = "Апрель";
	if (month == 5) monthName = "Май";
	if (month == 6) monthName = "Июнь";
	if (month == 7) monthName = "Июль";
	if (month == 8) monthName = "Август";
	if (month == 9) monthName = "Сентябрь";
	if (month == 10) monthName = "Октябрь";
	if (month == 11) monthName = "Ноябрь";
	if (month == 12) monthName = "Декабрь";

	content = "<h1>" + monthName + "</h1>" + table;
	elem.innerHTML = content;

	$(".calendar-slider").slick('refresh');

};

$(document).mouseup(function (e){ 
	let calendar = $(".calendar-cont"); 
	let calendarOut = $(".calendar-out");
	if (!calendar.is(e.target) // если клик был не по нашему блоку
	    && calendar.has(e.target).length === 0) { // и не по его дочерним элементам
			calendarOut.removeClass("shown");
			calendarOut.removeAttr("style");
	}
});


$(".pickMonthButton").click(function(){
	$(".calendar-out").css("display", "flex");
	setTimeout(function(){
		$(".calendar-out").addClass("shown");
	},100);
	let year = curDate.getFullYear();
	let month = curDate.getMonth();
	createCalendar(calendar__current, year, month);
});

function getDay(date) { 
	let day = date.getDay();
	if (day == 0) day = 7; 
	return day - 1;
};