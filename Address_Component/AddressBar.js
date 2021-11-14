import { template } from "./template.js";

class Address extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const keys = ["zip","city","district","street","houseNumber","country","form","submit","reset"];
    keys.forEach((key) => this[key] = this.shadowRoot.getElementById(key));
    this.toCheck = [...keys]
    this.toCheckProperties = [];
    this.toCheck.splice(this.toCheck.length-3)
    this.toCheck.forEach((element)=>{this[element].addEventListener("change", ()=>{this.handleSumbitButton(this.submit)});
    this.toCheckProperties.push(this[element])})
    this.zip.addEventListener("change", (e)=>{this.onTypingZipCode(e, this.city, this.country, this.district)}, );
    this.district.addEventListener("change",(domEvent)=>{ this.onSelect_District(domEvent, this.city, this.street);});
    this.submit.addEventListener("click", ()=>{ this.displayInfo(this.toCheckProperties, this.toCheck, this.shadowRoot);});
    this.reset.addEventListener("click", ()=>{ this.clearForm(this.form, this.street, this.district, this.submit);});

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

  creatingDropDown(element, obj, param) {
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
  }

  clearForm(form, street, district, submit) {
    form.reset();
    street.options.length = 0;
    district.options.length = 0;
    submit.disabled = true;
  }

  displayInfo = (valuesArr, keysArr, shadowRoot, clearFunction) => {
    const info = {};
    for (let i = 0; i < keysArr.length; i++) {
      info[keysArr[i]] = valuesArr[i].value;
    }
    const e = document.createElement("div");
    e.innerHTML = JSON.stringify(info);
    shadowRoot.appendChild(e);
    this.clearForm(this.form, this.street, this.district, this.submit);
  };

  onSelect_District = (domEvent, city, street) => {
    let selectedDistrict = domEvent.target[domEvent.target.selectedIndex].value;
    let URL = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?plz_city=${city.value}&plz_city_clear=${city.value}&plz_district=${selectedDistrict}&finda=streets&lang=de_DE`;
    this.sendHttpRequest("GET", URL).then((response) => {
      this.creatingDropDown(street, response, "street");
    });
  };

  handleSumbitButton(submit) {
    const values = ["zip","city","district","street","houseNumber","country"];
    const newValues = values.map((element) => this.shadowRoot.getElementById(element).value);
    const emptyInput = (value) => value === "";
    if (newValues.some(emptyInput)) {
      submit.disabled = true;
    } else {
      submit.disabled = false;
    }
  }

  onTypingZipCode = (e, city, country, district) => {
    if (e.target.value < 1067 || e.target.value > 99998) {
      alert("Zip code should be between 01067 and 99998");
      this.clearForm(this.form, this.street, this.district, this.submit);
    } else {
  
      this.sendHttpRequest("GET",`http://api.zippopotam.us/DE/${e.target.value}`)
        .then((response) => {
          city.value = response.places[0]["place name"];
          country.value = response.country;
          const URL = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?plz_city=${city.value}&plz_city_clear=${city.value}&finda=districts&lang=de_DE`;
          this.sendHttpRequest("GET", URL)
            .then((response) => {
              this.creatingDropDown(district, response, "district");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          alert("invalid Zip Code");
          this.clearForm(this.form, this.street, this.district, this.submit);
        });
    }
  };

}
window.customElements.define("app-address", Address);