class DateRangePicker {
  #dateRangePickerMainElement;
  #dateRangePickerOptions;
  #dateRangeInputElements;
  #dateRangeControlsElement;

  constructor(
    className = "date-range-picker",
    options = {
      startDateOptions: {
        id: "date-range-picker_start",
        name: "dateRangeStart",
      },
      endDateOptions: { id: "date-range-picker_end", name: "dateRangeEnd" },
      dateControlsOptions: { className: "date-range-picker_controls" },
    }
  ) {
    this.#setDateRangePickerMainElement(className);
    this.#setDateRangePickerOptions(options);

    if (this.getDateRangePickerMainElement() != null) {
      this.#setDateRangeInputElements(this.#initDateInputs());
      this.#setDateRangeControlsElement(this.#initDateRangeControlsElement());
    } else {
      console.error(
        `Element for date range picker was not found. Used class name '${className}'`
      );
    }
  }

  getDateRangePickerMainElement = () => this.#dateRangePickerMainElement;
  #setDateRangePickerMainElement = (className) =>
    (this.#dateRangePickerMainElement = document.querySelector(
      `.${className}`
    ));

  getDateRangePickerOptions = () => this.#dateRangePickerOptions;
  #setDateRangePickerOptions = (options) =>
    (this.#dateRangePickerOptions = options);

  getDateRangeInputElements = () => this.#dateRangeInputElements;
  #setDateRangeInputElements = (
    dateRangePickerInputElements = { startDateInput, endDateInput }
  ) => {
    this.#dateRangeInputElements = dateRangePickerInputElements;
  };

  getDateRangeControlsElement = () => this.#dateRangeControlsElement;
  #setDateRangeControlsElement = (dateRangeControlsElement) =>
    (this.#dateRangeControlsElement = dateRangeControlsElement);

  #initDateInputs = () => {
    const options = this.getDateRangePickerOptions();
    const mainElement = this.getDateRangePickerMainElement();
    const startDateInput = document.createElement("input");
    const endDateInput = document.createElement("input");

    startDateInput.setAttribute("type", "date");
    startDateInput.setAttribute("id", options.startDateOptions.id);
    startDateInput.setAttribute("name", options.startDateOptions.name);

    endDateInput.setAttribute("type", "date");
    endDateInput.setAttribute("id", options.endDateOptions.id);
    endDateInput.setAttribute("name", options.endDateOptions.name);

    mainElement.appendChild(startDateInput);
    mainElement.appendChild(endDateInput);

    return { startDateInput, endDateInput };
  };

  #initDateRangeControlsElement = () => {
    const options = this.getDateRangePickerOptions();
    const mainBlock = this.getDateRangePickerMainElement();
    const dateRangeControlsElement = document.createElement("div");

    dateRangeControlsElement.setAttribute(
      "class",
      options.dateControlsOptions.className
    );

    mainBlock.appendChild(dateRangeControlsElement);

    return dateRangeControlsElement;
  };

  #intitDateRangeControlYearsControl = () => {

  }

  #intitDateRangeControlMonthsControl = () => {

  }

  #intitDateRangeControlDaysTableControl = () => {
    
  }
}
