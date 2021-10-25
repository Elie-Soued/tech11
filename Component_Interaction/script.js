const validDate = document.getElementById("validDate");
const debug = document.getElementById("debug");
const debugContainer = document.getElementById("debugContainer");
const test = document.getElementById("test");

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

validDate.addEventListener("change", (e) => {
  data.contract.administrativeData.validFrom = e.currentTarget.value;
  debug.innerText = JSON.stringify(data);
  validDate.value = "";
});

debug.innerText = JSON.stringify(data);
