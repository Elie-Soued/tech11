//Selecting the elements from the dom
const myValidDate = document.getElementById("myValidDate");
const myContract = document.getElementById("myContract");
const textArea = document.getElementById("textArea");

//Setting Event Listeners
myContract.addEventListener("household", () => {
  textArea.innerHTML = "The flat of the policy holder is 100 square meters";
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

myContract.addEventListener("bicycle", () => {
  textArea.innerHTML =
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

myValidDate.addEventListener("send", (e) => {
  data.contract.administrativeData.validFrom = e.detail.message;
  debug.innerText = JSON.stringify(data);
});

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
