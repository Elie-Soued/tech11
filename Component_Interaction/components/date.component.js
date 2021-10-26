customElements.define(
  "app-date",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<div>
      <label for="validDate"> Valid Date</label>
      <input name="validDate" type="text" id="validDate" />
    </div>`;

      validDate.onchange = () => {
        // can: this.onsend() or not recommended: eval(this.getAttribute('onsend'))
        this.dispatchEvent(
          new CustomEvent("send", { detail: { message: validDate.value } })
        );
        validDate.value = "";
      };
    }
  }
);
