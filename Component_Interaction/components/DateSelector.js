const template = document.createElement("template");
template.innerHTML = `
<div>
<input name="validDate" type="date" id="validDate" placeholder="Enter a valid date" />
</div>`;

class DateSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const validDate = this.shadowRoot.getElementById("validDate");
    validDate.onchange = () => {
      this.dispatchEvent(
        new CustomEvent("send", { detail: { message: validDate.value } })
      );
    };
  }
}

customElements.define("app-date-selector", DateSelector);
