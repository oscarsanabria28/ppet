
function temple(){
	document.getElementById('content_response').innerHTML='Work in progress';
}

function getPbp(){
	//alert("getPbp");

	$.ajax({
        type: "POST",
        url: "/getBpb",
        data: {},
        success: function(data) 
        {
        		document.getElementById('content_response').innerHTML=data;
        		makeTablePBP();
        },
        error: function() 
        {
            alert("Error");
        }
    });

}
function getDepreciation(){
	$.ajax({
        type: "POST",
        url: "/getDepre",
        data: {},
        success: function(data) 
        {
        		document.getElementById('content_response').innerHTML=data;
        },
        error: function() 
        {
            alert("Error");
        }
    });
}

/***Depreciation***/

    function ver(x){
        if(x==1){
            document.getElementById("show").style.display = "block";
        }else{
            document.getElementById("show").style.display = "none";
        }
    }
    

    function calcular(){
        
        var bolo = true;
        
        var periodos = document.getElementById("periodos").value;
        
        var principal = document.getElementById("principal").value;
        
        var fecha = document.getElementById("fecha").value;
        
        var impuesto = document.getElementById("impuesto").value;
        
        var tipo = document.getElementById("tipo").value;
        
        var salvage = document.getElementById("salvage").value;
       
        if(tipo=="1" && salvage==""){
            alert("Porfavor ingrese un valor al valor de recuperación, aunque sea 0.");
            bolo=false;
        }
         if(impuesto==""||fecha==""||principal==""||periodos==""){
             alert("dejo un campo vacio.");
            bolo=false;
        }
        tipo=tipo/1;
       // alert("periodos="+periodos+"pricipal="+principal+"fecha="+fecha+"impuesto="+impuesto+"tipo="+tipo);
        if(bolo){
        switch(tipo){
            case 0: { alert("Porfavor ingrese un tipo de depresiación.");break;}
            case 1: { lineal(); break;}
            case 2: { marcs(3,0); break;}  
            case 3: { marcs(5,1); break;}
            case 4: { marcs(7,2); break;}
            case 5: { marcs(10,3); break;} 
            case 6: { marcs(15,4); break;}
            case 7: { marcs(20,5); break;}    
            default :{break;}   
      
        }
    }
                
}
    
function lineal(){
    
      var periodos = document.getElementById("periodos").value/1;
        
        var principal = document.getElementById("principal").value/1;
        
        var fecha = document.getElementById("fecha").value/1;
        
        var impuesto = document.getElementById("impuesto").value/100;
        
        var salvage = document.getElementById("salvage").value/1;
    
    var valorAdepreciar=principal-salvage;
    //alert(valorAdepreciar);
    var porcentaje = valorAdepreciar/principal;
    //alert(porcentaje);
    porcentaje = porcentaje/periodos;
    //alert(porcentaje);
    var str="<table class='table table-striped my-table-pbp'>";
     str+="<tr><th>Periodo</th><th>Porcentaje</th><th>Depreciación</th><th>Depreciación Acumulada</th><th>Valor actual del activo</th><th>Pago de impuesto.</th></tr>";
     var aux = principal;
     var aux2 = 0;
    
       str+="<tr>";
       str+="<td>"+fecha+"</td>";
       str+="<td>"+0+"</td>";
       str+="<td>"+0+"</td>";
       str+="<td>"+0+"</td>";  
       str+="<td>"+principal+"</td>";   
       str+="<td>"+principal*impuesto+"</td>";  
        
       str+="</tr>"; 
    
    for(var i= fecha+1; i<=fecha+periodos; i++){
       str+="<tr>";
       str+="<td>"+i+"</td>";
       str+="<td>"+porcentaje+"</td>";
       str+="<td>"+porcentaje*principal+"</td>";
        aux2 += porcentaje*principal;
       str+="<td>"+aux2+"</td>";  
       aux -= porcentaje*principal;
       str+="<td>"+aux+"</td>";   
        
        str+="<td>"+aux*impuesto+"</td>";  
        
       str+="</tr>"; 
    }
    str+="</table>";
    document.getElementById("respuesta").innerHTML = str;
}    
function marcs(x,y){
    
    var mar = [[0.3333,0.4445,0.1481,0.0741],
               [0.2,0.32,0.192,0.1152,0.1152,0.0576],
               [0.1429,0.2449,0.1749,0.1249,0.0893,0.0892,0.0893,0.0446],
               [0.1,0.18,0.144,0.1152,0.0922,0.0737,0.0655,0.0655,0.0656,0.0655,0.0328],
               [0.05,0.095,0.0855,0.077,0.0693,0.0623,0.059,0.059,0.0591,0.059,0.0591,0.059,0.0591,0.059,0.0591,0.0295],
               [0.0375,0.07219,0.06677,0.06177,0.05713,0.05285,0.04888,0.04522,0.04462,0.04461,0.04462,0.04461,0.04462,0.04461,0.04462,0.04461,0.04462,0.04461,0.04462,0.04461,0.02231]];
    
      var periodos = document.getElementById("periodos").value/1;
        
        var principal = document.getElementById("principal").value/1;
        
        var fecha = document.getElementById("fecha").value/1;
        
        var impuesto = document.getElementById("impuesto").value/100;
        
        var salvage = document.getElementById("salvage").value/1;
    
    

    var str="<table class='table table-striped my-table-pbp'>";
     str+="<tr><th>Periodo</th><th>Porcentaje</th><th>Depreciación</th><th>Depreciación Acumulada</th><th>Valor actual del activo</th><th>Pago de impuesto.</th></tr>";
     var aux = principal;
     var aux2 = 0;
    
       str+="<tr>";
       str+="<td>"+fecha+"</td>";
       str+="<td>"+0+"</td>";
       str+="<td>"+0+"</td>";
       str+="<td>"+0+"</td>";  
       str+="<td>"+principal+"</td>";   
       str+="<td>"+principal*impuesto+"</td>";  
        
       str+="</tr>"; 
    
    for(var i= fecha+1; i<=fecha+periodos; i++){
    	if(i-fecha-1==x+1){break;}
       str+="<tr>";
       str+="<td>"+i+"</td>";
        porcentaje = mar[y][i-fecha-1];
       str+="<td>"+porcentaje+"</td>";
       str+="<td>"+porcentaje*aux+"</td>";
       aux2 += porcentaje*aux;
       str+="<td>"+aux2+"</td>";  
       aux -= porcentaje*aux;
       str+="<td>"+aux+"</td>";   
        str+="<td>"+aux*impuesto+"</td>";  
        
       str+="</tr>"; 
    }
    str+="</table>";
    document.getElementById("respuesta").innerHTML = str;
}  

/********functions pbp*********/      

function makeTablePBP_n(row_num){
  //Create table for n # periods + 1
  var streamout = "<table class='table table-striped my-table-pbp'>";
  streamout += "<tr><th></th><th>Inflows</th><th>Outflows</th><th>Cummulative Cash Flow</th></tr>";
  for(var i = 0; i <= row_num; i++){
    streamout += "<tr><td>"+i+"</td><td><input type=\"number\" id='inflow"+i+"' value='0'></td><td><input type=\"number\" id='outflow"+i+"' value='0'></td><td><label  id='cummulative"+i+"' >0</label></td></tr>";
  }
  streamout += "</table>";
  //alert(streamout);
  document.getElementById('pbp_table').innerHTML = streamout;
}

//Get row number from drop down list
function getRowNum(){
  var row_num = document.getElementById('p_no').value;
  return row_num;
}

//Aux function to create table
function makeTablePBP(){
  var row_num = getRowNum();
  //alert(row_num);
  makeTablePBP_n(row_num);
}

//Does the PDP calculations based on inputs from user inside the form
function calculatePBP(){
       //Get input values from # periods, interest, principal
  var row_num = getRowNum();
  var interest = document.getElementById('interest').value;
  var principal = document.getElementById('principal').value;
  for(var i = 0; i <= row_num; i++){
    //Get typed values from table (inflow and outflow)
    var outflow = document.getElementById('outflow'+i).value;
    var inflow = document.getElementById('inflow'+i).value;
    //Validate if text fields where left empty (HTML5 automatically validates non-number formats)
    if(inflow == ""){
      inflow = 0;
    }
    if (inflow < 0) {
           outflow = outflow * -1;
    }
    if (outflow == ""){
      outflow = 0;
    }
    //Make negative value positive for formula calculation
    if (outflow < 0) {
           outflow = outflow * -1;
    }
    //Calculate net cash flow for period 0
    if (i == 0){
      document.getElementById('cummulative'+i).innerHTML = inflow/1 - principal/1 - outflow/1;
      //Calculate cash flows for subsequent periods using cummulatives from previous periods.
    } else {
      document.getElementById('cummulative'+i).innerHTML = inflow/1 - outflow/1 + document.getElementById('cummulative'+(i-1)).innerHTML*(1+interest/100);
    }
  }
}

//Resets all fields (except for # of periods to default state)
function clearDataPBP(){
       makeTablePBP_n(getRowNum());
       document.getElementById('interest').value = '0';
       document.getElementById('principal').value = '0';
}

//Helps validate if interest rate input is within a valid range
function taxClamp(){
       var val_tax = document.getElementById('interest').value / 1;
       if(val_tax < 0 || val_tax > 100){
              alert("Interest % must be a value between 0 and 100!");
              document.getElementById('interest').value = 0;
       }
}
/*
function valPrincipal(){
       var val_prin = document.getElementById('principal').value / 1;
       if(val_prin < 0){
              val_prin = val_prin * -1;
              document.getElementById('principal').value = val_prin;
       }
}
*/

    