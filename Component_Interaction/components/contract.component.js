customElements.define(
  "app-contract",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `   
        <div>
        <form>
          <p>Please select the type of contract:</p>
           
          <input
            type="radio"
            id="Household"
            name="contractType"
            value="Household"
          />
            <label for="Household">Household</label><br />
  
           
          <input type="radio" id="Bicycle" name="contractType" value="Bicycle" />
            <label for="Bicycle">Bicycle</label><br /> 
        </form>
      </div>`;

      Household.onchange = () => {
        this.dispatchEvent(
          new CustomEvent("household", { detail: { message: Household.value } })
        );
      };

      Bicycle.onchange = () => {
        // can: this.onsend() or not recommended: eval(this.getAttribute('onsend'))
        this.dispatchEvent(
          new CustomEvent("bicycle", { detail: { message: Bicycle.value } })
        );
      };
    }
  }
);
