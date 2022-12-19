const dayOfWeekDefenitions = {
  0: { logicalIndex: 7, name: "Sun", isWeekend: true },
  1: { logicalIndex: 1, name: "Mon", isWeekend: false },
  2: { logicalIndex: 2, name: "Tue", isWeekend: false },
  3: { logicalIndex: 3, name: "Wed", isWeekend: false },
  4: { logicalIndex: 4, name: "Thu", isWeekend: false },
  5: { logicalIndex: 5, name: "Fri", isWeekend: false },
  6: { logicalIndex: 6, name: "Sat", isWeekend: true },
};

const getDayNames = () => {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
};

const getMonthNames = () => {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
};

const getDaysInMounth = (year, month) => new Date(year, month + 1, 0).getDate();

const isToday = (date) => {
  var today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};
