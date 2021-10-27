customElements.define(
  "app-date",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<div>
      <label for="validDate"> Valid Date</label>
      <input name="validDate" type="date" id="validDate" />
    </div>`;

      validDate.onchange = () => {
        this.dispatchEvent(
          new CustomEvent("send", { detail: { message: validDate.value } })
        );
        validDate.value = "";
      };
    }
  }
);
