
$(".sub").click(function (e){
    $(".spin").addClass("visible");
    e.preventDefault();
    $("td").remove();
    fetchAPI($("#amount").val(),($("#symbol").val()).toUpperCase(),$("#year").val(),$("input[name*='rein']:checked").val(),$("#tax_p").val(),$("#emp_con").val());
})

$(".clear").click(function(){
    clearInput();
})


function fetchAPI(amt,sym,year,rein,tax,emp_c)  {
    if (!(tax == "")) {
        tax = "&tax_percent=" + tax;
    } 

    if (!(emp_c == "")) {
        emp_c = "&emp_contrib=" + emp_c;
    } 

let url =`https://9ldears527.execute-api.us-west-1.amazonaws.com/dev?start_balance=${amt}&symbol=${sym}&n_years=${year}&reinvested=${rein}${tax}${emp_c}`;
console.log(url)
console.log(rein)
console.log(tax)
console.log(emp_c)
fetch(url)
   .then((res) =>  res.json())
   .then((data) => { 
       for (let index = 0; index < data.length; index++) {
        printFunc(data[index]);
           
       }
    //   
       

    })
   .catch(error => console.log(error));
}

function printFunc({dividend,end_balance,growth,number_of_shares,reinvested,share_price,start_balance,year}){
     var data = [year,start_balance,share_price,number_of_shares,growth,dividend,reinvested,end_balance];
     $(".spin").removeClass("visible");
     $("table").addClass("visible");
     var tb = document.createElement("tbody");
     var row = document.createElement("tr");
     for(let i=0;i<8;i++){
     
     var cell = document.createElement("td");
     var cellText= document.createTextNode (data[i]);
     cell.appendChild(cellText);
     row.appendChild(cell);
     tb.appendChild(row);
     }

     document.getElementsByTagName("table")[0].appendChild(tb);
     $(".clear").addClass("visible");
 }

 function clearInput(){
     $(".clear").removeClass("visible");
     $("table").removeClass("visible");
     $("input").val("");

 }