const template = document.createElement("template");
template.innerHTML = ` 
<main>
  <form>
    <input
      type="radio"
      id="Household"
      name="contractType"
      value="Household"
      />
    <label for="Household">Household</label>
    <br />
    <input type="radio" id="Bicycle" name="contractType" value="Bicycle" />
      <label for="Bicycle">Bicycle</label><br /> 
  </form>
</main>`;

class Contract extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const Household = this.shadowRoot.getElementById("Household");
    const Bicycle = this.shadowRoot.getElementById("Bicycle");

    Household.onchange = () => {
      this.dispatchEvent(
        new CustomEvent("household", { detail: { message: Household.value } })
      );
    };

    Bicycle.onchange = () => {
      this.dispatchEvent(
        new CustomEvent("bicycle", { detail: { message: Bicycle.value } })
      );
    };
  }
}
customElements.define("app-contract", Contract);
