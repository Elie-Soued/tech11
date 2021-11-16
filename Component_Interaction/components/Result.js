import { html, render } from "../../node_modules/lit-html/lit-html.js";
const template = document.createElement("template");
template.innerHTML = `

<style>
img{
  width:100px;
}

#imageHolder{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}


#introTitle{
  text-align: center;
}

#initialData{
  padding:1rem;
}

#contractTitle {
  display: none;
}

#contractTitle{
  width:100%;
  text-align: center;
}

#renderedContract {
  width: 50%;
  text-align: center;
}

#renderedDate {
  text-align: center;
}

#dateContainer {
  display: none;
  width: 100%;
  text-align: center;
  display: none;
}

#contract {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding-top: 0;
  margin-top: -3rem;
}

#selectContract{
 display: none;
}

</style>

<div id= "initialData">
  <h3 id="introTitle">Bicycle or Household?</h3>
  <p>
  If you are looking to make a Bicycle or Household contract, do not look any further.
  Use the form on the left to build the contract you need.<br>
  You could choose the date and the type of contract (Bicycle or Household contract)<br>
  Enjoy! 
  </p>

  <div id="imageHolder">
    <img src="https://cdn.shopify.com/s/files/1/0773/9113/products/RoeblingProfile_1600x.jpg?v=1629750752" alt="bicycle">
    <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="house">
  </div>

</div> 

  <h3 id="contractTitle">Contract Information</h3>
  
  <div id="dateContainer">
    <h4>Date</h4>
    <p id="renderedDate"></p>
    <br>
  </div>
  <div id="contract">
    <p id="renderedContract"></p>
  </div>

  `;

class Result extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    //Selecting the elements from the dom
    const dateComponent = document.getElementById("myValidDate");
    const contractComponent = document.getElementById("myContract");
    const textArea = document.getElementById("textArea");
    //Selecting the elements from template
    const initialData = this.shadowRoot.getElementById("initialData");
    const contractTitle = this.shadowRoot.getElementById("contractTitle");
    const dateContainer = this.shadowRoot.getElementById("dateContainer");
    const renderedDate = this.shadowRoot.getElementById("renderedDate");
    const renderedContract = this.shadowRoot.getElementById("renderedContract");

    //Defining functions that will be used to dynamically update the contract

    //Date update
    let date = (element) => html`<p>${element}</p>`;
    //Contract Type update
    let myModule = (object) => html`
      <h4>Type</h4>
      <p>${object.key}</p>
      <h4>Name</h4>
      <p>${object.name}</p>
      <h4>Comments</h4>
      <p>${object.comments}</p>
    `;

    //Setting Event Listeners to events emitted by the Contract Component
    contractComponent.addEventListener("household", () => {
      textArea.innerHTML = "The flat of the policy holder is 100 square meters";
      displayData();
      render(
        myModule(data.contract.contractModules.HOUSEHOLD),
        renderedContract
      );
    });

    //Setting Event Listeners to events emitted by the Contract Component
    contractComponent.addEventListener("bicycle", () => {
      textArea.innerHTML =
        "The policyholder is happy to insure his new E-Bike also within the contract";
      displayData();
      render(myModule(data.contract.contractModules.BICYCLE), renderedContract);
    });

    //Setting Event Listeners to events emitted by the DateSelector Component
    dateComponent.addEventListener("send", (e) => {
      data.contract.administrativeData.validFrom = e.detail.message;
      render(date(e.detail.message), renderedDate);
    });

    //Helper function
    const displayData = () => {
      contractTitle.style.display = "block";
      dateContainer.style.display = "block";
      initialData.style.display = "none";
    };

    //Data used to display the contracts
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
  }
}

customElements.define("app-result", Result);
