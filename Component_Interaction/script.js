//Selecting the element from the DOM
const validDate = document.getElementById("validDate");
const debug = document.getElementById("debug");
const debugContainer = document.getElementById("debugContainer");
const test = document.getElementById("test");
const household = document.getElementById("Household");
const bicycle = document.getElementById("Bicycle");
const textArea = document.getElementById("textArea");

//Defining the data that has to be in stringify initially
const data = {
  contract: {
    administrativeData: {
      validFrom: "2021-01-01",
    },
    contractModules: {
      HOUSEHOLD: {
        key: "HOUSEHOLD",
        name: "Household Contents",
        comments: "The flat of the policy holder is 100 square meters",
      },
      BICYCLE: {
        key: "BICYCLE",
        name: "Bicycle",
        comments:
          "The policyholder is happy to insure his new E-Bike also within the contract",
      },
    },
  },
};

debug.innerText = JSON.stringify(data);

//Setting event listeners

validDate.addEventListener("change", (e) => {
  data.contract.administrativeData.validFrom = e.currentTarget.value;
  debug.innerText = JSON.stringify(data);
  validDate.value = "";
});

household.addEventListener("change", () => {
  textArea.value = "The flat of the policy holder is 100 square meters";
  delete data.contract.contractModules.BICYCLE;
  if (!data.contract.contractModules.HOUSEHOLD) {
    data.contract.contractModules.HOUSEHOLD = {
      key: "HOUSEHOLD",
      name: "Household Contents",
      comments: "The flat of the policy holder is 100 square meters",
    };
  }
  debug.innerText = JSON.stringify(data);
});

bicycle.addEventListener("change", () => {
  textArea.value =
    "The policyholder is happy to insure his new E-Bike also within the contract";
  delete data.contract.contractModules.HOUSEHOLD;
  if (!data.contract.contractModules.BICYCLE) {
    data.contract.contractModules.BICYCLE = {
      key: "BICYCLE",
      name: "Bicycle",
      comments:
        "The policyholder is happy to insure his new E-Bike also within the contract",
    };
  }
  debug.innerText = JSON.stringify(data);
});
