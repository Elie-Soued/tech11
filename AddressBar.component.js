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
            <input></input>
            <label>City</label>
            <input class="mediumSize"></input>
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

        <button>info</button>

    </form>

`;

class Address extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("app-address", Address);
