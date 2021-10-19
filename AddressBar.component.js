const template = document.createElement("template");
template.innerHTML = `

<style>


.smallSize{
  width:20%;
}

.mediumSize{
    width:40%;
}

#country{
    width:60%;
}

</style>

    <form>
        <h3> Address </h3>

        <div>
            <label>ZIP</label>
            <input id="zip"></input>
            <label>City</label>
            <input class="smallSize" id="city"></input>
            <label>District</label>
            <select class="mediumSize"  id="district"></select>
        </div>

        <div>
            <label>Street</label>
            <select class="mediumSize"></select>
            <label>House Number</label>
            <input></input>
        </div>

        <div>
            <label>Country</label>
            <input id="country"></input>
        </div>

    

    </form>

    <button type="submit">Info</button>

`;

class Address extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  sendHttpRequest(method, url) {
    const promise = new Promise((resolve) => {
      const xmlReq = new XMLHttpRequest();
      xmlReq.open(method, url);
      xmlReq.responseType = "json";

      xmlReq.onload = () => {
        resolve(xmlReq.response);
      };
      xmlReq.send();
    });
    return promise;
  }

  connectedCallback() {
    this.shadowRoot.getElementById("zip").addEventListener(
      "change",

      (e) => {
        this.sendHttpRequest("GET",`http://api.zippopotam.us/DE/${e.target.value}`)
        .then((response) => {
          console.log(response)
          let city = this.shadowRoot.getElementById("city").value;
          let country = this.shadowRoot.getElementById("country").value;
          let zip = this.shadowRoot.getElementById("zip").value;
          
          city = response.places[0]["place name"];
          country = response.country;
          zip = response["post code"]
         
          const newURL = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?plz_city=${city}&plz_plz=${zip}&plz_city_clear=${city}&plz_district=&finda=plz&plz_street=&lang=de_DE`;

          this.sendHttpRequest("POST", newURL).then((response) => {

            for(let i = 0; i<response.rows.length;i++){
              console.log(response.rows[i].district);
            }

            
          });
        });
      }
    );
  }
}

window.customElements.define("app-address", Address);


