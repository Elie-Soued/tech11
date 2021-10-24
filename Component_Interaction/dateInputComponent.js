const template = document.createElement("template");
template.innerHTML = `

<div>
<p>Administrative Data</p>
<label for="validFrom"> Valid From</label>
<input type="text" name="validFrom" />
</div>
`;

class administrativeData extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("app-dateinput", administrativeData);
