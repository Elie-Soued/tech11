const template = document.createElement("template");
template.innerHTML = `

<link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css"/>
<link rel="stylesheet"href= "/node_modules/bootstrap/dist/js/bootstrap.min.js"/>

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


#pinOffRange{
  color:red;
  opacity:0%;
}

#invalidPin{
  color:red;
  opacity:0%;
}

#noData{
  color:red;
  opacity:0%;
}



</style>


    <form id="form">
      <p id="noData">Data not available</p>
      <p id="pinOffRange">Zip code should be between 01067 and 99998</p>
      <p id="invalidPin">Zip code is invalid</p>
      <div>
        <label>ZIP</label>
        <input 
          type="number"
          id="zip"
          name="zip"
          required />
        
        <label>City</label>
  
        <input type="text"
        class="smallSize"
        id="city"
        name="city"
        required />
  
        <label>District</label>
  
        <select 
          class="mediumSize"
          id="district"
          name="district"
          required>
        </select>
      </div>

      <div>
        <label>Street</label>
        <select
          class="mediumSize"
          id="street"
          name="street"
          required>
        </select>
      
        <label>House Number</label>
  
        <input 
          type="number"
          id="houseNumber"
          name="houseNumber"
          required />
      </div>

      <div>
        <label>Country</label>
        <input
        id="country"
        name="country"
        required />
      </div>
  </form>  

<button type ="button" id="submit" disabled>Print</button>
<button type="button"  id="reset">Reset</button>



`;

export { template };
