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





#firstCol{
  border:2px solid gray;
  padding:2rem;
  border-radius : 10px;

}

#lastrow{
  padding:1rem;
}


button{
  margin:1rem;
}

hidden{
  display:none;
}

show{
  display: block;
}

</style>







<div class="container" >
  <div class="row justify-content-center">
    <div class="col-3" id="firstCol" >

     <form id="form">


      
      <div class="row">
       <div class="col-12">
        <label>ZIP</label>
        <input 
          type="number"
          id="zip"
          name="zip"
          required />

          <div class="invalid-feedback" id="invalidPin2" >
          
          </div>

          <div class="invalid-feedback" id="pinOffRange2">
        
        </div>

        <div class="invalid-feedback" id="noData2">
    
      </div>
        </div>
      </div>
      
      <div class="row">
       <div class="col-12">
        <label>City</label>
         <input 
           type="text"
           id="city"
           name="city"
           class="form-control"
           required />
        </div>  
       </div>

      <div class="row">
       <div class="col-12">
        <label>District</label>
        <select class="form-select" 
          id="district"
          name="district"
          required>
        </select>
       </div>  
      </div>

     
      <div class="row">
      <div class="col-12">
       <label>Street</label>
       <select class="form-select" 
          id="street"
          name="street"
          required>
        </select>
       </div>  
      </div>

      <div class="row">
      <div class="col-12">
       <label>House Number</label>
        <input 
         type="number"
         id="houseNumber"
         name="houseNumber"
         class="form-control"
         required />
       </div>  
      </div>

      <div class="row">
      <div class="col-12">
       <label>Country</label>
        <input 
         type="text"
         id="country"
         name="country"
         class="form-control"
         required />
       </div>  
      </div>
     </form>

     <div class="row" id="lastrow">
     <div class="col-12 d-flex justify-content-center" id="col1">
       <button type ="button" class="btn btn-success" id="submit" disabled>Print</button>
       <button type ="button" class="btn btn-danger" id="reset" >Reset</button>
     </div>
   </div>
   </div>
 </div>
</div>




`;

export { template };
