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

export{template}