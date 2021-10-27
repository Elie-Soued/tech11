const template = document.createElement("template");

template.innerHTML = `<div>
<label for="validDate"> Valid Date</label>
<input name="validDate" type="text" id="validDate" />
</div>`;

class ValidDate extends HTMLElement {
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
      validDate.value = "";
    };
  }
}

customElements.define("app-date", ValidDate);
