$(document).ready(function(){
	$(".calendar-slider").slick({
		infinite: false
	});
})

let curDate = new Date();

let monthName;

let weekendObj = {};

let curMonth;

let month;

function getMonthName(month) {
	switch (month) {
	case 1:
		monthName = 'Январь';
		break;
	case 2:
		monthName = 'Февраль';
		break;
	case 3:
		monthName = 'Март';
		break;
	case 4:
		monthName = 'Апрель';
		break;
	case 5:
		monthName = 'Май';
		break;
	case 6:
		monthName = 'Июнь';
		break;
	case 7:
		monthName = 'Июль';
		break;
	case 8:
		monthName = 'Август';
		break;
	case 9:
		monthName = 'Сентябрь';
		break;
	case 10:
		monthName = 'Октябрь';
		break;
	case 11:
		monthName = 'Ноябрь';
		break;
	case 12:
		monthName = 'Декабрь';
		break;
	}; // функция присваивания имени месяца по его номеру
};

$("body").on('click', '.pickWeekendButton-accept', function(){ // Создание объекта с выходными при нажатии на кнопку
	let weekendDays = [];
	$(".slick-slide").each(function(index) {
		let weekendMonthNum = ($(this).attr('data-month'));
		$(this).find(".dateCell.toggled").each(function(){
			weekendDays.push( $(this).text() );
		})
		getMonthName(+weekendMonthNum);
		weekendObj[monthName] = weekendDays;
		weekendDays = [];
	});
	console.log(weekendObj);
});

function createCalendar(elem, year, month, user) { // функция создания календаря
	let mon = month - 1;
	let d = new Date(year, mon);
	let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

	// пустые ячейки с понедельника до начала месяца
	for (let i = 0; i < getDay(d); i++) {
		table += '<td class="pDateCell"></td>';
	}

	// ячейки с датами
	while (d.getMonth() == mon) {
		table += '<td class="dateCell ' + user + '">' + d.getDate() + '</td>';
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

	// if (month == 1) monthName = "Январь";
	// if (month == 2) monthName = "Февраль";
	// if (month == 3) monthName = "Март";
	// if (month == 4) monthName = "Апрель";
	// if (month == 5) monthName = "Май";
	// if (month == 6) monthName = "Июнь";
	// if (month == 7) monthName = "Июль";
	// if (month == 8) monthName = "Август";
	// if (month == 9) monthName = "Сентябрь";
	// if (month == 10) monthName = "Октябрь";
	// if (month == 11) monthName = "Ноябрь";
	// if (month == 12) monthName = "Декабрь";

	getMonthName(month);

	content = "<h1>" + monthName + "</h1>" + table;
	elem.innerHTML = content;

	$(".calendar-slider").slick('refresh');
	$(elem).parent().attr('data-month', month);
};

$(document).mouseup(function (e){ // скрыть модальное окно календаря
	let calendar = $(".calendar-cont"); 
	let calendarOut = $(".calendar-out");
	if (!calendar.is(e.target) // если клик был не по нашему блоку
	    && calendar.has(e.target).length === 0) { // и не по его дочерним элементам
			calendarOut.removeClass("shown");
			calendarOut.removeAttr("style");
			$(".calendar-cont").removeClass("admin user");
			$(".pickWeekendButton-accept").remove();
	}
});


function getDay(date) { 
	let day = date.getDay();
	if (day == 0) day = 7; 
	return day - 1;
};

$(".pickMonthButton").click(function() { // создание календаря при нажатии на кнопку (user)
	$(".calendar-out").css("display", "flex");
	$(".calendar-cont").addClass("user");
	setTimeout(function(){
		$(".calendar-out").addClass("shown");
	},100);
	let curYear = curDate.getFullYear();
	let curMonth = curDate.getMonth() + 1;
	createCalendar(calendar__current, curYear, curMonth, "user");
	if (curMonth = 12) {
		nextMonth = 1;
		nextYear = curYear + 1;
	} else {
		nextMonth = curMonth + 1;
		nextYear = curYear;
	}
	createCalendar(calendar__next, nextYear, nextMonth, "user");
});

let adminWeekendButton = '<input type="button" class="pickWeekendButton-accept" value="Выбрать выходные">';

$(".pickWeekendButton").click(function(){ // создание календаря при нажатии на кнопку (user)
	$(".calendar-out").css("display", "flex");
	$(".calendar-cont").addClass("admin");
	setTimeout(function(){
		$(".calendar-out").addClass("shown");
	},100);
	curYear = curDate.getFullYear();
	curMonth = curDate.getMonth() + 1;
	if (curMonth = 12) {
		nextMonth = 1;
		nextYear = curYear + 1;
	} else {
		nextMonth = curMonth + 1;
		nextYear = curYear;
	}
	createCalendar(calendar__current, curYear, curMonth, "admin");
	createCalendar(calendar__next, nextYear, nextMonth, "admin");
	$(".calendar-cont").append(adminWeekendButton);
});

$("body").on('click', '.dateCell.admin', function(){
	if ( $(this).hasClass('toggled') ) {
		$(this).removeClass('toggled');
	} else {
		$(this).addClass('toggled');
	}
});