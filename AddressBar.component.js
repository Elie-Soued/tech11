const template = document.createElement("template");
template.innerHTML = `

<style>

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
            <input class="mediumSize" id="city"></input>
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

  connectedCallback() {
    this.shadowRoot.getElementById("zip").addEventListener(
      "change",

      //First Api call to set The city and the country
      (e) => {
        let xmlReq = new XMLHttpRequest();
        xmlReq.open("GET", `http://api.zippopotam.us/DE/${e.target.value}`);

        xmlReq.onload = () => {
          const data = JSON.parse(xmlReq.response);
          this.shadowRoot.getElementById("city").value =
            data.places[0]["place name"];

          this.shadowRoot.getElementById("country").value = data.country;

          //Second Api call to set The street per city
          let http = new XMLHttpRequest();
          let url = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?autocomplete=plz&plz_city=${
            this.shadowRoot.getElementById("city").value
          }`;

          http.open("POST", url, true);

          http.setRequestHeader(
            // "Access-Control-Allow-Origin",
            "Content-type",
            "application/x-www-form-urlencoded"
          );

          http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
              console.log(JSON.parse(http.response));
            }
          };
          http.send();
        };

        xmlReq.send();
      }
    );
  }
}

window.customElements.define("app-address", Address);
