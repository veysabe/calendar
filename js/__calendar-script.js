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

let gap;

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
	deactivatedDates();
};

function getDay(date) { 
	let day = date.getDay();
	if (day == 0) day = 7; 
	return day - 1;
};

// функция присваивания имени месяца по его номеру
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
	}; 
};

$('body').on('click', '.choose-time__time-element', function() {

})

$('body').on('click', '.pickWorktimeButton', function(){ // открыть окно с интервалом
	$(".worktime-choise-out").css("display", "flex");
	setTimeout(function(){
		$(".worktime-choise-out").addClass("shown");
	},100);
	for (let i = 0; i < 24; i++) {
		if (i<10) {
			i = '0' + i;
		}
		$('.worktime-choise-cont__time-h').append(`<option>${i}</option>`);
	}
	let k;
	for (let i = 0; i < 6; i++) {
		if (i<1) {
			k = '0' + i;
		} else {
			k = i + "0";
		}
		$('.worktime-choise-cont__time-m').append(`<option>${k}</option>`);
	}
});

$(document).mouseup(function (e){ // скрыть модальное окно интервала
	let worktimeChoise = $(".worktime-choise-cont"); 
	let worktimeChoiseOut = $(".worktime-choise-out");
	if (!worktimeChoise.is(e.target) // если клик был не по нашему блоку
	    && worktimeChoise.has(e.target).length === 0) { // и не по его дочерним элементам
			worktimeChoiseOut.removeClass("shown");
			worktimeChoiseOut.removeAttr("style");
	}
});

let openTime = 9;
let closeTime = 22;

function showTime(date) {
	if ( gap == undefined ) { 
		alert('Не задан интервал') 
	} else {
		$('.choose-time-out').css('display', 'flex');
		setTimeout(function(){
			$('.choose-time-out').addClass('show-time');
		},100);
		let i = openTime;
		let dataDay = $(date).text();
		let dataMonth = $(date).parents('.slick-slide').attr('data-month');
		getMonthName(+dataMonth);
		console.log(monthName);
		$('.choose-time-slider').attr('data-month', dataMonth).attr('data-day', dataDay);
		console.log(dataDay);
		while ( i <= closeTime ) {
			let modifiedIOP = '' + i;
			let modifiedI;
			if ( modifiedIOP.indexOf('.') == -1 ) {
				modifiedI = modifiedIOP + ":00";
			} else {
				if ( modifiedIOP.lastIndexOf('5') != -1 ) modifiedI = modifiedIOP.slice(0,-2) + ":30";
			}
			console.log(modifiedI);
			let divInner = `
				<div class="choose-time__element-date">
					<span class="choose-time__element-date-day">${dataDay}</span>
					<span class="choose-time__element-date-month">${monthName}</span>
				</div>
				<span class="choose-time__element-time">${modifiedI}</span>
			`;
			let html = `<div class="choose-time__time-element" data-time="${i}">${divInner}</div>`;
			$('.choose-time-container').append(html);
			i += gap;
		}
	}	
}

function deactivatedDates() { // выделить неактивные даты
	$(".slick-slide").each(function(index) {
		let weekendMonthNum = $(this).attr('data-month');
		for (let key in weekendObj) {
			if ( weekendMonthNum == key ) {
				for ( let inactiveDate of weekendObj[key] ) {
					$(this).find(".dateCell").each(function(){
						if ( $(this).text() == inactiveDate ) {
							$(this).addClass('inactive');
						} 
					})
				}
			}
		}
	});
}

$(".pickMonthButton").click(function() { // создание календаря при нажатии на кнопку (user)
	$(".calendar-out").css("display", "flex");
	$(".calendar-cont").addClass("user");
	setTimeout(function(){
		$(".calendar-out").addClass("shown");
	},100);
	let curYear = curDate.getFullYear();
	let curMonth = curDate.getMonth() + 1;
	if (curMonth = 12) {
		nextMonth = 1;
		nextYear = curYear + 1;
	} else {
		nextMonth = curMonth + 1;
		nextYear = curYear;
	}
	createCalendar(calendar__current, curYear, curMonth, "user");
	createCalendar(calendar__next, nextYear, nextMonth, "user");
});

$('body').on('click', '.calendar-cont-close', function(){
	let calendar = $(".calendar-cont"); 
	let calendarOut = $(".calendar-out");
	calendarOut.removeClass("shown");
	calendarOut.removeAttr("style");
	calendar.removeClass("admin user");
	$(".pickWeekendButton-accept").remove();
})

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

$("body").on('click', '.dateCell.admin', function() { // добавить клеткам с датами классы
	if ( $(this).hasClass('toggled') ) {
		$(this).removeClass('toggled');
	} else if ( $(this).hasClass('inactive') ) {
		$(this).removeClass('inactive');
	} else {
		$(this).addClass('toggled');
	}
});

$("body").on('click', '.pickWeekendButton-accept', function(){ // Создание объекта с выходными при нажатии на кнопку
	let weekendDays = [];
	$(".slick-slide").each(function(index) {
		let weekendMonthNum = ($(this).attr('data-month'));
		$(this).find(".dateCell.toggled").each(function(){
			weekendDays.push( $(this).text() );
		});
		$(this).find(".dateCell.inactive").each(function(){
			weekendDays.push( $(this).text() );
		});
		weekendObj[weekendMonthNum] = weekendDays;
		weekendDays = [];
	});
	$('.dateCell.toggled').removeClass('toggled').addClass('inactive');
	console.log(weekendObj);
});

$('body').on('click', '.dateCell.user', function(){ // открыть окно с выбором времени по нажатии на кнопку
	if ( $(this).hasClass('inactive') ) {
		alert('нет');
	} else {
		showTime(this);
	}
});

$('body').on('click', '.pickGapButton', function(){ // открыть окно с интервалом
	$(".gap-choise-out").css("display", "flex");
	setTimeout(function(){
		$(".gap-choise-out").addClass("shown");
	},100);
});

$(document).mouseup(function (e){ // скрыть модальное окно интервала
	let gapChoise = $(".gap-choise-cont"); 
	let gapChoiseOut = $(".gap-choise-out");
	if (!gapChoise.is(e.target) // если клик был не по нашему блоку
	    && gapChoise.has(e.target).length === 0) { // и не по его дочерним элементам
			gapChoiseOut.removeClass("shown");
			gapChoiseOut.removeAttr("style");
	}
});

$(document).mouseup(function (e){ // скрыть модальное окно выбора времени
	let chooseTime = $(".choose-time-cont"); 
	let chooseTimeOut = $(".choose-time-out");
	if (!chooseTime.is(e.target) // если клик был не по нашему блоку
	    && chooseTime.has(e.target).length === 0) { // и не по его дочерним элементам
			chooseTimeOut.removeClass("show-time");
			chooseTimeOut.removeAttr("style");
			$('div.choose-time__time-element').remove();
	}
});

$('body').on('click', '.gapChoiseButton', function() { // задать интервал
	if ( $(this).attr('data') == '1hour' ) {
		gap = 1;
	} else if ( $(this).attr('data') == 'halfhour' ) {
		gap = 0.5;
	}
});
