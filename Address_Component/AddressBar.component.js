const template = document.createElement("template");
template.innerHTML = `

<style>
.smallSize {
  width: 20%;
}
.mediumSize {
  width: 40%;
}
#country {
  width: 60%;
}
</style>

<form id="form">
<div>
  <label>ZIP</label>
  <input type="number" id="zip" name="zip" />
  <label>City</label>
  <input type="text" class="smallSize" id="city" name="city" />
  <label>District</label>
  <select class="mediumSize" id="district" name="district"></select>
</div>

<div>
  <label>Street</label>
  <select class="mediumSize" id="street" name="street"></select>
  <label>House Number</label>
  <input type="text" id="houseNumber" name="houseNumber" />
</div>

<div>
  <label>Country</label>
  <input id="country" name="country" />
</div>
</form>
<button id="submit" disabled>Info</button>
<button id="reset">Reset</button>
`;

class Address extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  sendHttpRequest(method, url) {
    const promise = new Promise((resolve, reject) => {
      const xmlReq = new XMLHttpRequest();
      xmlReq.open(method, url);
      xmlReq.responseType = "json";
      if (url) {
        xmlReq.onload = () => {
          resolve(xmlReq.response);
        };
        xmlReq.send();
      } else {
        reject();
      }
    });
    return promise;
  }

  connectedCallback() {
    //First 2 API Calls
    const onTypingZipCode = (e) => {
      if (e.target.value < 1067 || e.target.value > 99998) {
        alert("Zip code should be between 01067 and 99998");
        clearForm();
      } else {
        this.sendHttpRequest(
          "GET",
          `http://api.zippopotam.us/DE/${e.target.value}`
        )
          .then((response) => {
            city.value = response.places[0]["place name"];
            country.value = response.country;
            const URL = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?plz_city=${city.value}&plz_city_clear=${city.value}&finda=districts&lang=de_DE`;
            this.sendHttpRequest("GET", URL)
              .then((response) => {
                creatingDropDown(district, response, "district");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
            alert("invalid Zip Code");
            clearForm();
          });
      }
    };

    //Third API Call
    const onSelect_District = (domEvent) => {
      let selectedDistrict =
        domEvent.target[domEvent.target.selectedIndex].value;
      let URL = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?plz_city=${city.value}&plz_city_clear=${city.value}&plz_district=${selectedDistrict}&finda=streets&lang=de_DE`;
      this.sendHttpRequest("GET", URL).then((response) => {
        creatingDropDown(street, response, "street");
      });
    };

    //Helper Functions
    const displayInfo = () => {
      let values = [zip, city, district, street, houseNumber, country];
      let keys = [
        "zipCode",
        "city",
        "district",
        "street",
        "houseNumber",
        "country",
      ];
      const info = {};
      for (let i = 0; i < keys.length; i++) {
        info[keys[i]] = values[i].value;
      }
      const e = document.createElement("div");
      e.innerHTML = JSON.stringify(info);
      this.shadowRoot.appendChild(e);
      clearForm();
    };

    const clearForm = () => {
      form.reset();
      street.options.length = 0;
      district.options.length = 0;
      submit.disabled = true;
    };

    const creatingDropDown = (element, obj, param) => {
      element.options.length = 0;
      if (obj.rows) {
        element.add(new Option("--Choose from list--"));
        for (let i = 0; i < obj.rows.length; i++) {
          element.add(new Option(obj.rows[i][param]));
        }
      } else {
        element.add(new Option("No data Available"));
      }
      return element;
    };

    const handleSumbitButton = () => {
      const values = [
        "zip",
        "city",
        "district",
        "street",
        "houseNumber",
        "country",
      ];
      const newValues = values.map(
        (element) => this.shadowRoot.getElementById(element).value
      );
      const emptyInput = (value) => value === "";
      if (newValues.some(emptyInput)) {
        submit.disabled = true;
      } else {
        submit.disabled = false;
      }
    };

    //Getting Elements by ID
    const zip = this.shadowRoot.getElementById("zip");
    const city = this.shadowRoot.getElementById("city");
    const district = this.shadowRoot.getElementById("district");
    const street = this.shadowRoot.getElementById("street");
    const houseNumber = this.shadowRoot.getElementById("houseNumber");
    const country = this.shadowRoot.getElementById("country");
    const form = this.shadowRoot.getElementById("form");
    const submit = this.shadowRoot.getElementById("submit");
    const reset = this.shadowRoot.getElementById("reset");

    //Settings Event Listeners
    zip.addEventListener("change", onTypingZipCode, handleSumbitButton);
    district.addEventListener("change", onSelect_District, handleSumbitButton);
    submit.addEventListener("click", displayInfo);
    country.addEventListener("change", handleSumbitButton);
    houseNumber.addEventListener("change", handleSumbitButton);
    reset.addEventListener("click", clearForm);
  }
}

window.customElements.define("app-address", Address);
