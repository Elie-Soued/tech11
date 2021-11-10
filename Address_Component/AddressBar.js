import { Parent } from "./Parent.js";
import { template } from "./template.js";

class Address extends Parent {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
       
    this.zip = this.shadowRoot.getElementById("zip");
    this.city = this.shadowRoot.getElementById("city");
    this.district = this.shadowRoot.getElementById("district");
    this.street = this.shadowRoot.getElementById("street");
    this.houseNumber = this.shadowRoot.getElementById("houseNumber");
    this.country = this.shadowRoot.getElementById("country");
    this.form = this.shadowRoot.getElementById("form");
    this.submit = this.shadowRoot.getElementById("submit");
    this.reset = this.shadowRoot.getElementById("reset");
  }

  connectedCallback() {

    const onTypingZipCode = (e) => {
      this.onTypingZipCode(e,this.city,this.country,this.district)
    };

    const onSelect_District = (domEvent) => {
      this.onSelect_District(domEvent,this.city,this.street)
    };

    const displayInfo = () => {
      let values = [this.zip,this.city,this.district,this.street,this.houseNumber,this.country];
      let keys = ["zipCode","city","district","street","houseNumber","country"];
      this.displayInfo(values, keys, this.shadowRoot, clearForm);
    };

    const clearForm = () => {
      this.clearForm(this.form, this.street, this.district, this.submit);
    };

    const handleSumbitButton = () => {
      this.handleSumbitButton(this.submit)
    };

    //Settings Event Listeners
    this.zip.addEventListener("change", onTypingZipCode, handleSumbitButton);
    this.district.addEventListener("change",onSelect_District,handleSumbitButton);
    this.submit.addEventListener("click", displayInfo);
    this.country.addEventListener("change", handleSumbitButton);
    this.houseNumber.addEventListener("change", handleSumbitButton);
    this.reset.addEventListener("click", clearForm);
  }
}

window.customElements.define("app-address", Address);