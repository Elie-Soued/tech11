import { LitElement, html } from "@polymer/lit-element";

class Address extends LitElement {
  static get properties() {
    return {
      zip: { type: String },
      city: { type: String },
      selectedDistrict: { type: String },
      selectedStreet: { type: String },
      houseNumber: { type: Number },
      country: { type: String },
      districts: { type: Array },
      streets: { type: Array },
      showResult: { type: Boolean },
      errorMessage: { type: String },
      disabled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.zip;
    this.city = "";
    this.selectedDistrict = "";
    this.selectedStreet = "";
    this.country = "";
    this.houseNumber;
    this.districts = [];
    this.streets = [];
    this.showResult = "hidden";
    this.errorMessage = "";
    this.disabled = true;
  }

  async handleZipChange(e) {
    const zipRef = this.shadowRoot.getElementById("zip");
    if (e.target.value < 1067 || e.target.value > 99998) {
      this.showErrorMessage("Zip should be between 1067 and 9998", zipRef);
    } else {
      this.removeError(e, zipRef);
      this.shadowRoot.getElementById("zip").value = e.target.value;
      const URL = `http://api.zippopotam.us/DE/${e.target.value}`;
      try {
        const response = await fetch(URL).then((response) => response.json());
        this.shadowRoot.getElementById("city").value =
          response.places[0]["place name"];
        this.shadowRoot.getElementById("country").value = response.country;
        this.city = response.places[0]["place name"];
        this.country = response.country;
      } catch (error) {
        console.log(error);
        this.showErrorMessage("Invalid Pin");
      }
      this.handleCityChange();
    }
  }

  async handleCityChange() {
    const URL = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?plz_city=${this.city}&plz_city_clear=${this.city}&finda=districts&lang=de_DE`;
    try {
      const response = await fetch(URL).then((response) => response.json());
      if (!response.rows) {
        this.showErrorMessage("No Data Available");
      } else {
        this.districts = response.rows;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleDistrictChange(e) {
    this.selectedDistrict = e.target.value;
    const URL = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?plz_city=${this.city}&plz_city_clear=${this.city}&plz_district=${this.selectedDistrict}&finda=streets&lang=de_DE`;
    try {
      const response = await fetch(URL).then((response) => response.json());
      if (!response.rows) {
        this.showErrorMessage("No Data Available");
      } else {
        this.streets = response.rows;
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit() {
    const formPropertyName = ["zip","city","district","street","houseNumber","country",];
    const formPropertiesValues = formPropertyName.map(
      (property) => this.shadowRoot.getElementById(property).value
    );
    const emptyInput = (value) => value === "";
    formPropertiesValues.some(emptyInput)
      ? (this.disabled = true)
      : (this.disabled = false);
  }

  clearForm() {
    //removing the value attribute of the elements
    const formPropertyName = ["zip","city","district","street","houseNumber","country",];
    formPropertyName.forEach(
      (property) => (this.shadowRoot.getElementById(property).value = "")
    );
    //clearing the form object
    for (let property in this.form) {
      this.form[property] = "";
    }
    this.disabled = true;
    this.showResult = "hidden";
  }

  showErrorMessage(errorText, element) {
    element.className = "form-control is-invalid";
    this.errorMessage = errorText;
    element.value = "";
    element.focus();
  }

  removeError(e, element) {
    element.className = "form-control";
    element.value = e.target.value;
    this.zip = e.target.value;
    this.errorMessage = "";
  }

  render() {
    return html`
      <div class="container">
        <div id="main">
          <div class="col-3" id="firstCol">
            <form id="form" @change="${this.handleSubmit}">
              <!-- Zip -->
              <div class="row">
                <div class="col-12">
                  <label>ZIP</label>
                  <input
                    value="${this.zip}"
                    type="number"
                    id="zip"
                    name="zip"
                    class="form-control"
                    required
                    @change="${this.handleZipChange}"
                  />
                </div>
                <!-- Error Message -->
                <p id="errorMessage">${this.errorMessage}</p>
              </div>
              <!-- City -->
              <div class="row">
                <div class="col-12">
                  <label>City</label>
                  <input
                    value="${this.city}"
                    type="text"
                    id="city"
                    name="city"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <!-- District -->
              <div class="row">
                <div class="col-12">
                  <label>District</label>
                  <select
                    class="form-select"
                    id="district"
                    name="district"
                    value="${this.selectedDistrict}"
                    ;
                    required
                    @change="${this.handleDistrictChange}"
                  >
                    ${this.districts && this.districts.length
                      ? html`<option>-- Choose from list --</option>`
                      : ""}
                    ${this.districts &&
                    this.districts.map(
                      (district) =>
                        html` <option>${district.district}</option> `
                    )}
                  </select>
                </div>
              </div>
              <!-- Street -->
              <div class="row">
                <div class="col-12">
                  <label>Street</label>
                  <select
                    class="form-select"
                    id="street"
                    name="street"
                    value="${this.selectedStreet};"
                    @change="${(e) => {
                      this.selectedStreet = e.target.value;
                    }}"
                    required
                  >
                    ${this.streets.length
                      ? html`<option>-- Choose from list --</option>`
                      : ""}
                    ${this.streets.map(
                      (street) => html` <option>${street.street}</option> `
                    )}
                  </select>
                </div>
              </div>
              <!-- House Number-->
              <div class="row">
                <div class="col-12">
                  <label>House Number</label>
                  <input
                    value=${this.houseNumber}
                    type="number"
                    id="houseNumber"
                    name="houseNumber"
                    class="form-control"
                    required
                    @change="${(e) => {
                      this.houseNumber = e.target.value;
                    }}"
                  />
                </div>
              </div>
              <!-- Country -->
              <div class="row">
                <div class="col-12">
                  <label>Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    class="form-control"
                    value="${this.country}"
                    required
                  />
                </div>
              </div>
            </form>
            <!-- Buttons -->
            <div class="row" id="lastrow">
              <div class="col-12 d-flex justify-content-center" id="col1">
                <button
                  type="button"
                  class="btn btn-success"
                  id="submit"
                  ?disabled="${this.disabled}"
                  @click="${() => {
                    this.showResult = "show";
                  }}"
                >
                  Print
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  id="reset"
                  @click="${this.clearForm}"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <!-- Results -->
          <div id="results" class=${this.showResult}>
            <p>Zip : ${this.zip}</p>
            <p>City: ${this.city}</p>
            <p>District : ${this.selectedDistrict}</p>
            <p>Street : ${this.selectedStreet}</p>
            <p>House Number : ${this.houseNumber}</p>
            <p>Country : ${this.country}</p>
          </div>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="/node_modules/bootstrap/dist/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="/node_modules/bootstrap/dist/js/bootstrap.min.js"
      />
      <!-- Style -->
      <style>
        #errorMessage {
          color: red;
        }

        #firstCol {
          border: 2px solid gray;
          padding: 2rem;
          border-radius: 10px;
          width: 40%;
          min-width: 250px;
        }
        #lastrow {
          padding: 1rem;
        }
        button {
          margin: 1rem;
        }
        .hidden {
          display: none;
        }
        .show {
          display: block;
        }
        #main {
          display: flex;
          flex-direction: row;
          justify-content: center;
          width: 100%;
        }
        #results {
          width: 20%;
          text-align: center;
        }

        .container {
          width: 100%;
        }
      </style>
    `;
  }
}
customElements.define("app-newaddress", Address);
