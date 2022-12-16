const dateTimeControls = document.querySelector('.datetime__controls');

const createMonthSelector = (date = new Date()) => {
  const monthControlWrapper = document.querySelector('.datetime__controls__months');
  getMonthNames().forEach((monthName, index) => {
    const monthSelectItem = document.createElement('div');
    const monthNum = index + 1;

    monthSelectItem.classList.add('datetime__controls__month');
    if(date.getMonth() === monthNum){
      monthSelectItem.classList.add('datetime__controls__month__active');
    }

    monthSelectItem.dataset.monthNum = index + 1;
    monthSelectItem.append(monthName);
    monthControlWrapper.appendChild(monthSelectItem);
  });
  dateTimeControls.appendChild(monthControlWrapper);
}

const createDaysTable = (date = new Date()) => {
  const table = document.createElement('table');
  table.classList.add('datetime__controls__days');

  const tableHeader = document.createElement('thead');
  const tableHeaderRow = document.createElement('tr');

  tableHeader.appendChild(tableHeaderRow);
  getDayNames().forEach(dayName => {
    const headerCell = document.createElement('th');
    headerCell.append(dayName);
    tableHeaderRow.appendChild(headerCell);
  });

  table.appendChild(tableHeader);
  dateTimeControls.appendChild(table);

  // table grid
  const maxCellsInRow = 7;
  const tableBody = document.createElement('tbody');

  const dayObjects = getDayObjects(date);
  for(let i = 0; i < dayObjects.length; i += maxCellsInRow){
    const chunk = dayObjects.slice(i, i + maxCellsInRow);
    const tableRow = document.createElement('tr');
    chunk.forEach(dayObj => {
      const tableCell = document.createElement('td');
      const cellItemWrapper = document.createElement('span');
      cellItemWrapper.classList.add('datetime__controls__day__item');
      cellItemWrapper.dataset.dayNum = dayObj.dayNum;
      cellItemWrapper.dataset.dayOfMonth = dayObj.dayOfMonth;
      cellItemWrapper.append(dayObj.dayOfMonth);
      tableCell.appendChild(cellItemWrapper);
      tableRow.appendChild(tableCell);
    })
    tableBody.appendChild(tableRow);
  }
  table.appendChild(tableBody);
}

const updateYear = (yearNum) => {
  const yearNumElement = document.querySelector('.datetime__controls__years__current');
  yearNumElement.innerHTML = yearNum;
}

const getDayNames = () => {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

const getMonthNames = () => {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}

const getDaysInMounth = (year, month) =>  new Date(year, month, 0).getDate();

const getDayObjects = (date = new Date()) => {
  const daysInMonth = getDaysInMounth(date.getFullYear(), date.getMonth());

  let dayObjects = [];
  for(let i = 0; i < daysInMonth; i++){
    const dateFromStart = new Date(date.getFullYear(), date.getMonth(), 1 + i);
    dayObjects.push({
      dayNum: dateFromStart.getDay(),
      dayOfMonth: dateFromStart.getDate(),
      fromCurrent: true
    });
  }

  return dayObjects;
}

createMonthSelector();
createDaysTable();