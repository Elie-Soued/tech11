import { html, render } from "../../node_modules/lit-html/lit-html.js";

//Selecting the elements from the dom
const dateComponent = document.getElementById("myValidDate");
const contractComponent = document.getElementById("myContract");
const textArea = document.getElementById("textArea");
const initialData = document.getElementById("initialData");
const contractTitle = document.getElementById("contractTitle");
const dateContainer = document.getElementById("dateContainer");
const renderedDate = document.getElementById("renderedDate");
const renderedContract = document.getElementById("renderedContract");


//Defining functions that will be used to dynamically the dom
let date = (element) => html`<p>${element}</p>`;
let myModule = (object) => html`
  <h4>Type</h4>
  <p>${object.key}</p>
  <h4>Name</h4>
  <p>${object.name}</p>
  <h4>Comments</h4>
  <p>${object.comments}</p>
`;

//Setting Event Listeners
contractComponent.addEventListener("household", () => {
  textArea.innerHTML = "The flat of the policy holder is 100 square meters";
  displayData();
  render(myModule(data.contract.contractModules.HOUSEHOLD), renderedContract);
});

contractComponent.addEventListener("bicycle", () => {
  textArea.innerHTML =
    "The policyholder is happy to insure his new E-Bike also within the contract";
  displayData();
  render(myModule(data.contract.contractModules.BICYCLE), renderedContract);

});

dateComponent.addEventListener("send", (e) => {
  data.contract.administrativeData.validFrom = e.detail.message;
  render(date(e.detail.message), renderedDate);
});


const displayData = () => {
  contractTitle.style.display = "block";
  dateContainer.style.display = "block";
  initialData.style.display = "none";
};

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
