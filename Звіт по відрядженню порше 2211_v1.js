function onBeforeCardSave() {
  copyTableValueFoodTable();
  copyTableValueTravelExpense();
  checkForCyrillic();
}

function copyTableValueFoodTable() {
  debugger;
  var table = EdocsApi.getAttributeValue("FoodTable").value;
  var dataFood_copy = "";
  var period_to_copy = "";

  if (table) {
    for (var i = 0; i < table.length; i++) {
      dataFood_copy += moment(new Date(EdocsApi.findElementByProperty("code", "dataFood", table[i]).value)).format("DD.MM.YYYY") + "\n\n";
      period_to_copy += EdocsApi.findElementByProperty("code", "FoodChoice", table[i]).value + "\n\n";
    }
  }

  dataFood_copy = dataFood_copy.substring(dataFood_copy.length - 2, 0);
  if (dataFood_copy != EdocsApi.getAttributeValue("dataFood_copy").value)
    EdocsApi.setAttributeValue({
      code: "dataFood_copy",
      value: dataFood_copy,
      text: null,
    });

  period_to_copy = period_to_copy.substring(period_to_copy.length - 2, 0);
  if (period_to_copy != EdocsApi.getAttributeValue("FoodChoice_copy").value)
    EdocsApi.setAttributeValue({
      code: "FoodChoice_copy",
      value: period_to_copy,
      text: null,
    });
}

function onChangeExpenses() {
  if (EdocsApi.getAttributeValue("travelDirection").value == "Україна") {
    EdocsApi.setAttributeValue({
      code: "currencyEUR",
      value: "UAH",
      text: "Гривня",
      itemCode: "UAH",
      itemDictionary: "EdocsGetCurrencies",
    });
  }
}

function copyTableValueTravelExpense() {
  var table = EdocsApi.getAttributeValue("TravelExpense").value;
  var expenses_copy = "";
  var DestinationPlaceCopy = "";

  var currencyEUR_copy = "";
  var dateRate_copy = "";
  var forInformation_copy = "";
  var rate_copy = "";
  var vutratuCurrency_copy = "";

  if (table) {
    for (var i = 0; i < table.length; i++) {
      expenses_copy += EdocsApi.findElementByProperty("code", "Expenses", table[i]).value + "\n\n";
      DestinationPlaceCopy += EdocsApi.findElementByProperty("code", "vutratu", table[i]).value + "\n\n";
      currencyEUR_copy += EdocsApi.findElementByProperty("code", "currencyEUR", table[i]).value + "\n\n";
      dateRate_copy += moment(EdocsApi.findElementByProperty("code", "dateRate", table[i]).value).format("DD.MM.YYYY") + "\n\n";
      forInformation_copy += EdocsApi.findElementByProperty("code", "forInformation", table[i]).value || "" + "\n\n";
      rate_copy += EdocsApi.findElementByProperty("code", "rate", table[i]).value + "\n\n";
      vutratuCurrency_copy += EdocsApi.findElementByProperty("code", "vutratuCurrency", table[i]).value + "\n\n";
    }
  }

  expenses_copy = expenses_copy.substring(expenses_copy.length - 2, 0);
  if (expenses_copy != EdocsApi.getAttributeValue("expenses_copy").value) EdocsApi.setAttributeValue({ code: "expenses_copy", value: expenses_copy, text: null });

  DestinationPlaceCopy = DestinationPlaceCopy.substring(DestinationPlaceCopy.length - 2, 0);
  if (DestinationPlaceCopy != EdocsApi.getAttributeValue("vutratu_copy").value) EdocsApi.setAttributeValue({ code: "vutratu_copy", value: DestinationPlaceCopy, text: null });

  currencyEUR_copy = currencyEUR_copy.substring(currencyEUR_copy.length - 2, 0);
  if (currencyEUR_copy != EdocsApi.getAttributeValue("currencyEUR_copy").value) EdocsApi.setAttributeValue({ code: "currencyEUR_copy", value: currencyEUR_copy, text: null });

  dateRate_copy = dateRate_copy.substring(dateRate_copy.length - 2, 0);
  if (dateRate_copy != EdocsApi.getAttributeValue("dateRate_copy").value) EdocsApi.setAttributeValue({ code: "dateRate_copy", value: dateRate_copy, text: null });

  forInformation_copy = forInformation_copy.substring(forInformation_copy.length - 2, 0);
  if (forInformation_copy != EdocsApi.getAttributeValue("forInformation_copy").value) debugger;
  EdocsApi.setAttributeValue({ code: "forInformation_copy", value: forInformation_copy, text: null });

  rate_copy = rate_copy.substring(rate_copy.length - 2, 0);
  if (rate_copy != EdocsApi.getAttributeValue("rate_copy").value) EdocsApi.setAttributeValue({ code: "rate_copy", value: rate_copy, text: null });

  vutratuCurrency_copy = vutratuCurrency_copy.substring(vutratuCurrency_copy.length - 2, 0);
  if (vutratuCurrency_copy != EdocsApi.getAttributeValue("vutratuCurrency_copy").value) EdocsApi.setAttributeValue({ code: "vutratuCurrency_copy", value: vutratuCurrency_copy, text: null });
}

function controlHide(CODE) {
  var control = EdocsApi.getControlProperties(CODE);
  if (control) {
    control.hidden = true;
    EdocsApi.setControlProperties(control);
  }
}
function controlShow(CODE) {
  var control = EdocsApi.getControlProperties(CODE);
  if (control) {
    control.hidden = false;
    EdocsApi.setControlProperties(control);
  }
}
function onCardInitialize() {
  debugger;
  if (EdocsApi.getAttributeValue("FoodTable").value.length == 0) {
    onChangetravelDirection();
    onChangedataTripStart();
    onChangedataTripEnd();
    onChangetravelDirection();
    onChangevutratuCurrency(true);
  }
}
function onChangecurrencyEUR() {
  setRate();
}
function onChangedateRate() {
  setRate();
}

function clearTable() {
  EdocsApi.setAttributeValue({ code: "FoodTable", type: "table", value: null });
}

function createTable() {
  debugger;
  const table = [];
  for (let index = moment(EdocsApi.getAttributeValue("dataTripStart").value); index <= moment(EdocsApi.getAttributeValue("dataTripEnd").value); index.add("days", 1)) {
    table.push([
      {
        code: "dataFood",
        value: moment(index).format("YYYY-MM-DD"),
        text: null,
      },
      { code: "FoodChoice", value: null, text: null },
    ]);
  }
  EdocsApi.setAttributeValue({
    code: "FoodTable",
    type: "table",
    value: table,
  });
}

function onBeforeRowAddTravelExpense() {
  if (EdocsApi.getAttributeValue("travelDirection").value == "Україна") {
    EdocsApi.setAttributeValue({
      code: "currencyEUR",
      value: "UAH",
      text: "Гривня",
      itemCode: "UAH",
      itemDictionary: "EdocsGetCurrencies",
    });
    EdocsApi.setAttributeValue({ code: "dateRate", value: CurrentDocument.created, text: null });
    setRate();
  }
}

function onChangetravelDirection() {
  debugger;
  if (EdocsApi.getAttributeValue("travelDirection").value != "За кордон") {
    clearTable();
    controlHide("FoodTable");
    EdocsApi.setControlProperties({ code: "carBrand", hidden: true, required: false });
  } else {
    controlShow("FoodTable");
    EdocsApi.setControlProperties({ code: "carBrand", hidden: false, required: false });
    if (EdocsApi.getAttributeValue("dataTripStart").value && EdocsApi.getAttributeValue("dataTripEnd").value) createTable();
  }
}
function onChangedataTripStart() {
  if (!EdocsApi.getAttributeValue("dataTripStart").value) {
    clearTable();
  } else {
    if (EdocsApi.getAttributeValue("travelDirection").value == "За кордон" && EdocsApi.getAttributeValue("dataTripEnd").value) createTable();
  }
}
function onChangedataTripEnd() {
  if (!EdocsApi.getAttributeValue("dataTripEnd").value) {
    clearTable();
  } else {
    if (EdocsApi.getAttributeValue("travelDirection").value == "За кордон" && EdocsApi.getAttributeValue("dataTripEnd").value) createTable();
  }
}

//1.Заповнити поле Rate методом зовнішньої системи EdocsGetExchangeRate
function setRate() {
  debugger;

  const currencyEUR = EdocsApi.getAttributeValue("currencyEUR");
  const dateRate = EdocsApi.getAttributeValue("dateRate").value;

  if (currencyEUR.value && dateRate) {
    const methodData = {
      currencyEUR: currencyEUR.value,
      dateRate: dateRate,
    };

    const response = EdocsApi.runExternalFunction("Navision", "EdocsGetExchangeRate", methodData);

    if (!response.data) {
      throw "Не отримано відповіді від зовіншньої системи";
    } else {
      if (response.data.error) {
        EdocsApi.message(response.data.error.message);
      } else {
        EdocsApi.setAttributeValue({
          code: response.data.code,
          value: Number(response.data.value).toFixed(2),
          text: null,
        });
      }
    }
  } else {
    if (!currencyEUR.text) {
      EdocsApi.setAttributeValue({ code: "rate", value: null, text: null });
    }
  }
}

function setControlRequired(code, required = true) {
  const attr = EdocsApi.getControlProperties(code);
  attr.required = required;
  EdocsApi.setControlProperties(attr);
}

function onChangevutratuCurrency(clearOnInit = false) {
  debugger;
  if (clearOnInit) {
    setControlRequired("Expenses");
    setControlRequired("currencyEUR");
    setControlRequired("dateRate");
    setControlRequired("vutratuCurrency");
  } else {
    const vutratuCurrency = EdocsApi.getAttributeValue("vutratuCurrency");
    if (vutratuCurrency.value) {
      const vutratu = EdocsApi.getAttributeValue("vutratu");
      vutratu.value = (Number(EdocsApi.getAttributeValue("rate").value) * Number(vutratuCurrency.value)).toFixed(2);
      EdocsApi.setAttributeValue(vutratu);
    }
  }
}

function onChangeFoodChoice() {
  debugger;
  var FoodChoice = EdocsApi.getAttributeValue("FoodChoice");
  if (FoodChoice.value) {
    var value = FoodChoice.value.split(", ");
    if (value && value.length > 1 && value.includes("0")) {
      FoodChoice.value = null;
      EdocsApi.message("0 не можна проставляти, якщо також  вказані інші значення");
      EdocsApi.setAttributeValue(FoodChoice);
    }
  }
}

//Перевірка кирилиці 2610
function checkForCyrillic() {
  if (EdocsApi.getAttributeValue("Annotations").value.search(/[а-яА-Я]/) != "-1") throw `Мова введення в поле "Примітки" -  латиниця`;
}
