const dateTimeControls = document.querySelector(".datetime__controls");

const createMonthSelector = (date = new Date()) => {
  const monthControlWrapper = document.querySelector(
    ".datetime__controls__months"
  );
  getMonthNames().forEach((monthName, index) => {
    const monthSelectItem = document.createElement("div");
    const monthNum = index + 1;

    monthSelectItem.classList.add("datetime__controls__month");
    if (date.getMonth() === monthNum) {
      monthSelectItem.classList.add("datetime__controls__month__active");
    }

    monthSelectItem.dataset.monthNum = index + 1;
    monthSelectItem.append(monthName);
    monthControlWrapper.appendChild(monthSelectItem);
  });
  dateTimeControls.appendChild(monthControlWrapper);
};

const updateDayTable = (date = new Date()) => {
  const table = document.createElement("table");
  table.classList.add("datetime__controls__days");

  const tableHeader = document.createElement("thead");
  const tableHeaderRow = document.createElement("tr");

  tableHeader.appendChild(tableHeaderRow);
  getDayNames().forEach((dayName) => {
    const headerCell = document.createElement("th");
    headerCell.append(dayName);
    tableHeaderRow.appendChild(headerCell);
  });

  table.appendChild(tableHeader);
  dateTimeControls.appendChild(table);

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

      cellItemWrapper.dataset.date = dayObj.date;
      cellItemWrapper.dataset.dayNum = dayObj.dayNum;
      cellItemWrapper.dataset.dayOfMonth = dayObj.dayOfMonth;
      cellItemWrapper.dataset.weekend = dayObj.isWeekend;
      cellItemWrapper.append(dayObj.dayOfMonth);
      tableCell.appendChild(cellItemWrapper);
      tableRow.appendChild(tableCell);
    });
    tableBody.appendChild(tableRow);
  }
  table.appendChild(tableBody);
};

const updateYear = (yearNum) => {
  const yearNumElement = document.querySelector(
    ".datetime__controls__years__current"
  );
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
  const daysFromWeekStart = currentMonth.getDay() - 1;
  for (let i = 0; i < daysFromWeekStart; i++) {
    prevMonth.setDate(prevMonthLastDay - daysFromWeekStart + i + 1);
    dayObjects.push({
      date: prevMonth.toISOString().split('T')[0],
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
      date: dateFromStart.toISOString().split('T')[0],
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
      date: nextMonth.toISOString().split('T')[0],
      dayNum: nextMonth.getDay(),
      dayOfMonth: nextMonth.getDate(),
      fromCurrent: false,
      isWeekend: dayOfWeekDefenitions[nextMonth.getDay()].isWeekend,
    });
  }

  return dayObjects;
};

createMonthSelector();
updateDayTable();

