import { template } from "./template.js";

class Address extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.createAllProperties();
    this.addAllEventListeners();
  }


  createAllProperties(){
    this.keys = ["zip","city","district","street","houseNumber","country","form","submit","reset","noData2", "pinOffRange2","invalidPin2"];
    this.keys.forEach((key) => this[key] = this.shadowRoot.getElementById(key));
    this.addEventListenerToFormProperties();
  }


  selectFormProperties(){
    this.formValueNames  = [...this.keys]
    this.formValueProperties = [];
    this.formValueNames .splice(this.formValueNames.length-4);
  }


  addEventListenerToFormProperties(){
    this.selectFormProperties();
    this.formValueNames.forEach((element)=>{
      this[element].addEventListener("change", ()=>{this.handleSumbitButton(this.submit)});
      this.formValueProperties .push(this[element])});
  }

 
  addAllEventListeners(){
    this.zip.addEventListener("change", (e)=>{this.onTypingZipCode(e, this.city, this.country, this.district)}, );
    this.district.addEventListener("change",(domEvent)=>{ this.onSelect_District(domEvent, this.city, this.street);});
    this.submit.addEventListener("click", ()=>{ this.displayInfo( this.shadowRoot);});
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
      this.clearForm(this.form, this.street, this.district, this.submit);
      this.zip.className ="form-control is-invalid"
      this.noData2.innerHTML = "No Data available";
      this.zip.focus();
    }
    return element;
  }


  clearForm(form, street, district, submit) {
    form.reset();
    street.options.length = 0;
    district.options.length = 0;
    submit.disabled = true;
  }


  displayInfo = (shadowRoot) => {
    const info = {};

    const properties = ["zip","city","district","street","houseNumber","country"];
    const values = properties.map((key)=> this[key] = this.shadowRoot.getElementById(key))

    for (let i = 0; i < properties.length; i++) {
      info[properties[i]] = values[i].value;
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
    const formPropertyName = ["zip","city","district","street","houseNumber","country"];
    const formPropertiesValues = formPropertyName .map((property) => this.shadowRoot.getElementById(property).value);
    const emptyInput = (value) => value === "";
    formPropertiesValues.some(emptyInput)?submit.disabled = true : submit.disabled = false;  
  }


  handleOffRangePin(){
    this.zip.className ="form-control is-invalid"
    this.pinOffRange2.innerHTML = "Zip code should be between 01067 and 99998";
    this.noData2.innerHTML = "";
    this.invalidPin2.innerHTML = "";
    this.clearForm(this.form, this.street, this.district, this.submit);
    this.zip.focus()
  }


  removeErrorAlerts(){
    this.zip.className ="form-control"
    this.pinOffRange2.innerHTML = "";
    this.invalidPin2.innerHTML = "";
    this.noData2.innerHTML = "";
  }

  
  onTypingZipCode = (e, city, country, district) => {
    if (e.target.value < 1067 || e.target.value > 99998) {
        this.handleOffRangePin()
    } else {
      this.removeErrorAlerts()
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
          this.zip.className ="form-control is-invalid"
          this.invalidPin2.innerHTML = "Zip code is invalid";
          this.clearForm(this.form, this.street, this.district, this.submit);
          this.zip.focus()
        });
    }
// zip Input Error Handling:
// The zip input handles 3 kinds of errors :
// 1- zip out of Range : zip should be  99998 >  zip > 1067
// 2- zip doesn´t exist : 016289 (example)
// 3- City exists but there are not district available : 01689 (example)
  };
}

window.customElements.define("app-address", Address);