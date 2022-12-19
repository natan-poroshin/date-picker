const dateTimeControls = document.querySelector(".datetime__controls");

const updateMonthSelector = (date = new Date()) => {
  const monthControlWrapper = document.querySelector(
    ".datetime__controls__months"
  );
  if(monthControlWrapper.childNodes.length !== 0){
    [...monthControlWrapper.childNodes].forEach(element =>
       element.remove());
  }

  getMonthNames().forEach((monthName, index) => {
    const monthSelectItem = document.createElement("div");
    const monthNum = index + 1;

    monthSelectItem.classList.add("datetime__controls__month");
    if (date.getMonth() === monthNum - 1) {
      monthSelectItem.classList.add("datetime__controls__month__active");
    }

    monthSelectItem.dataset.monthNum = index + 1;
    monthSelectItem.onclick = onMonthSwitchHandler;
    monthSelectItem.append(monthName);
    monthControlWrapper.appendChild(monthSelectItem);
  });
};

const updateDayTable = (date = new Date()) => {
  const daysControlWrapper = document.querySelector('.datetime__controls__days');
  let table = document.querySelector(".datetime__controls__days__table");

  if (table != null) {
    table.remove();
  }

  table = document.createElement("table");
  table.classList.add("datetime__controls__days__table");

  const tableHeader = document.createElement("thead");
  const tableHeaderRow = document.createElement("tr");

  tableHeader.appendChild(tableHeaderRow);
  getDayNames().forEach((dayName) => {
    const headerCell = document.createElement("th");
    headerCell.append(dayName);
    tableHeaderRow.appendChild(headerCell);
  });

  table.appendChild(tableHeader);
  daysControlWrapper.appendChild(table);

  // table grid
  const maxCellsInRow = 7;
  const tableBody = document.createElement("tbody");

  const dayObjects = getDayObjects(date);
  for (let i = 0; i < dayObjects.length; i += maxCellsInRow) {
    const chunk = dayObjects.slice(i, i + maxCellsInRow);
    const tableRow = document.createElement("tr");
    chunk.forEach((dayObj) => {
      const tableCell = document.createElement("td");
      const cellItemWrapper = document.createElement("div");
      cellItemWrapper.classList.add("datetime__controls__day__item");
      if (!dayObj.fromCurrent) {
        cellItemWrapper.classList.add(
          "datetime__controls__day__item__prev__next"
        );
      }

      if (dayObj.fromCurrent && dayObj.isWeekend) {
        cellItemWrapper.classList.add("datetime__controls__day__item__weekend");
      }

      if (isToday(dayObj.date)) {
        cellItemWrapper.classList.add("datetime__controls__day__item__today");
      }

      cellItemWrapper.dataset.date = dayObj.date;
      cellItemWrapper.dataset.dayNum = dayObj.dayNum;
      cellItemWrapper.dataset.dayOfMonth = dayObj.dayOfMonth;
      cellItemWrapper.dataset.weekend = dayObj.isWeekend;
      cellItemWrapper.dataset.dateStr = dayObj.dateStr;

      cellItemWrapper.onclick = onDaySelectedHandler;
      cellItemWrapper.append(dayObj.dayOfMonth);
      tableCell.appendChild(cellItemWrapper);
      tableRow.appendChild(tableCell);
    });
    tableBody.appendChild(tableRow);
  }
  table.append(tableBody);
};

const updateYear = (yearNum) => {
  const yearNumElement = document.querySelector(
    ".datetime__controls__years__current"
  );
  yearNumElement.dataset.year = yearNum;
  yearNumElement.innerHTML = yearNum;
};

const getDayObjects = (date = new Date()) => {
  const maxDayOfWeekIndex = 7;
  const currentMonth = date;
  const prevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  let dayObjects = [];

  // Previous month
  currentMonth.setDate(1);
  const prevMonthLastDay = prevMonth.getDate();
  const daysFromWeekStart =
    dayOfWeekDefenitions[currentMonth.getDay()].logicalIndex - 1;
  for (let i = 0; i < daysFromWeekStart; i++) {
    prevMonth.setDate(prevMonthLastDay - daysFromWeekStart + i + 1);
    dayObjects.push({
      dateStr: prevMonth.toISOString().split("T")[0],
      date: prevMonth,
      dayNum: prevMonth.getDay(),
      dayOfMonth: prevMonth.getDate(),
      fromCurrent: false,
      isWeekend: dayOfWeekDefenitions[prevMonth.getDay()].isWeekend,
    });
  }

  // Current month
  const currentMonthTotalDays = getDaysInMounth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );
  for (let i = 0; i < currentMonthTotalDays; i++) {
    const dateFromStart = new Date(date.getFullYear(), date.getMonth(), 1 + i);
    dayObjects.push({
      dateStr: dateFromStart.toISOString().split("T")[0],
      date: dateFromStart,
      dayNum: dateFromStart.getDay(),
      dayOfMonth: dateFromStart.getDate(),
      fromCurrent: true,
      isWeekend: dayOfWeekDefenitions[dateFromStart.getDay()].isWeekend,
    });
  }

  // Next month
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  currentMonth.setDate(0);
  const daysToEnd =
    maxDayOfWeekIndex -
    dayOfWeekDefenitions[currentMonth.getDay()].logicalIndex;
  for (let i = 0; i < daysToEnd; i++) {
    nextMonth.setDate(i + 1);
    dayObjects.push({
      dateStr: nextMonth.toISOString().split("T")[0],
      date: nextMonth,
      dayNum: nextMonth.getDay(),
      dayOfMonth: nextMonth.getDate(),
      fromCurrent: false,
      isWeekend: dayOfWeekDefenitions[nextMonth.getDay()].isWeekend,
    });
  }

  return dayObjects;
};

const getSelectedDate = () => {
  const yearElement = document.querySelector(
    ".datetime__controls__years__current"
  );
  const monthElement = document.querySelector(
    ".datetime__controls__months>.datetime__controls__month__active"
  );

  const resultDate = new Date(
    parseInt(yearElement.dataset.year),
    parseInt(monthElement.dataset.monthNum) - 1,
    1
  );
  return resultDate;
};

const getFullDate = () => {
  const dayElement = document.querySelector('.datetime__controls__day__item.datetime__controls__day__item__selected');
  return dayElement?.dataset?.dateStr;
}

const onYearSwitchHandler = (ev) => {
  const callElement = ev.currentTarget;
  const currentDate = getSelectedDate();
  if (callElement.classList.contains("datetime__controls__years__prev")) {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    updateYear(currentDate.getFullYear());
  }

  if (callElement.classList.contains("datetime__controls__years__next")) {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    updateYear(currentDate.getFullYear());
  }

  updateDayTable(currentDate);
};

const onMonthSwitchHandler = (ev) => {
  const callElement = ev.target;
  if (!callElement.classList.contains("datetime__controls__month__active")) {
    const monthControlWrapper = document.querySelector(
      ".datetime__controls__months"
    );

    monthControlWrapper
      .querySelector(".datetime__controls__month__active")
      ?.classList.toggle("datetime__controls__month__active");

    callElement.classList.toggle("datetime__controls__month__active");

    const selectedMonthYear = getSelectedDate();
    updateDayTable(selectedMonthYear);
  }
};

const onDaySelectedHandler = (ev) => {
  const callElement = ev.target;
  if (!callElement.classList.contains("datetime__controls__day__item__selected")) {
    const tBody = document.querySelector(".datetime__controls__days");
    tBody
      .querySelector(".datetime__controls__day__item__selected")
      ?.classList.toggle("datetime__controls__day__item__selected");

    callElement.classList.toggle("datetime__controls__day__item__selected");
  }
};

const toggleDatePicker = () => {
  const controlsElement = document.querySelector('.datetime__controls');
  controlsElement.classList.toggle('datetime__controls__hidden');
}

const createDatePicker = (date = new Date()) => {
  document.querySelector(".datetime__controls__years__next").onclick =
    onYearSwitchHandler;
  document.querySelector(".datetime__controls__years__prev").onclick =
    onYearSwitchHandler;

  updateYear(date.getFullYear());
  updateMonthSelector(date);
  updateDayTable(date);

  document.querySelector('.datetime__input').onclick = (ev) => {
    const callElement = ev.target;
    if(callElement.value != ""){
      updateYear(date.getFullYear());
      updateMonthSelector(date);
      updateDayTable(date);
    }

    toggleDatePicker();
  };

  document.querySelector('.datetime__controls__select__btn').onclick = (ev) => {
    const fullDate = getFullDate();
    if(fullDate != null) {
      const dateInputElement =  document.querySelector('.datetime__input');
      dateInputElement.value = fullDate;
    }
    toggleDatePicker();
  };

  document.querySelector('.datetime__controls__today__btn').onclick = (ev) => {
    const today = new Date();
    const dateInputElement =  document.querySelector('.datetime__input');
    dateInputElement.value = today.toISOString().split('T')[0];
    toggleDatePicker();
  }
}

createDatePicker()