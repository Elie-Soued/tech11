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
            <select class="mediumSize" id="street"></select>
            <label>House Number</label>
            <input></input>
        </div>

        <div>
            <label>Country</label>
            <input id="country"></input>
        </div>

    
       
    </form>

    <button type="submit" id="submit">Info</button>

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
   

  

      const onTypingZipCode = (e) => {   
        //First api call to get the city, country and zip code
        this.sendHttpRequest("GET",`http://api.zippopotam.us/DE/${e.target.value}`)
        .then((response) => {
          this.shadowRoot.getElementById("city").value = response.places[0]["place name"];
          this.shadowRoot.getElementById("country").value = response.country;
          this.shadowRoot.getElementById("zip").value = response["post code"];
        
          const newURL = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?plz_city=${this.shadowRoot.getElementById("city").value }&plz_plz=${this.shadowRoot.getElementById("zip").value}&plz_city_clear=${this.shadowRoot.getElementById("city").value }&plz_district=&finda=plz&plz_street=&lang=de_DE`;

          //Second api call to get the district
          this.sendHttpRequest("POST", newURL).then((response) => {
             for(let i = 0; i<response.rows.length;i++){
              this.shadowRoot.getElementById("district").add(new Option(response.rows[i].district))
             }
          }
         
          );
        });
      }
    

    const onSelect_District = (domEvent)=> {
      let selectedDistrict = domEvent.target[domEvent.target.selectedIndex].value; 
      let pilouURL = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?plz_city=${this.shadowRoot.getElementById("city").value }&plz_plz=${this.shadowRoot.getElementById("zip").value}&plz_city_clear=${this.shadowRoot.getElementById("city").value }&plz_district=${selectedDistrict}&finda=plz&plz_street=&lang=de_DE`;
      
      //Third api call to get the Streets
      this.sendHttpRequest("POST", pilouURL).then((response)=>{
        this.shadowRoot.getElementById("street").options.length = 0;
          
        if(response.rows){
          for(let i =0; i<response.rows.length;i++){
            this.shadowRoot.getElementById("street").add(new Option(response.rows[i].street))
            }
        }else{
          this.shadowRoot.getElementById("street").add(new Option("No data Available"))
        }
      })
    }


    this.shadowRoot.getElementById("zip").addEventListener("change", onTypingZipCode)
    this.shadowRoot.getElementById("district").addEventListener("change",onSelect_District)
    this.shadowRoot.getElementById("submit").addEventListener("click",()=>{console.log("salut")})

  }
}

window.customElements.define("app-address", Address);


