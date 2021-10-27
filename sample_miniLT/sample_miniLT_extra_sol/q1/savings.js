/* -----------------------------------  

    Name:

    Email:

--------------------------------------*/



function calculate (){
    var amt = Number(document.getElementById("myAmt").value);
    var interest = parseFloat(document.getElementById("myInterest").value);
    var goal = Number(document.getElementById("myGoal").value);
    var amount_received = 0 // init

    if (isNaN(interest))
         interest = 0;

    var calculated_amount = amt;
    var year_counter = 0;

     // handle invalid cases
    if ((amt==0) || (amt<0)) { // initial amt <= 0
         year_counter = '-';
         amount_received = 0; 

    } else if ((interest==0) || (interest< 0)) { // interest <= 0
         year_counter = '-';
         amount_received = parseFloat(amt).toFixed(2); 

    } else if ((goal==0) || (goal<0)) { // my goal <= 0
         year_counter = '-';
         amount_received = parseFloat(amt).toFixed(2); 

    } else {  // valid case
         while (calculated_amount < goal){
              calculated_amount += calculated_amount * (interest/100);
              year_counter ++;
              console.log(calculated_amount);
              console.log(year_counter);
         }

         amount_received = parseFloat(calculated_amount).toFixed(2);
    
    }
    
    
    // backtick ` is useful for writing multi-line string
    // $ { xxx } can be used for print a variable in a string
    var display_str = `<h4 class='text-success' style="margin-bottom:20px; margin-top:30px"> Result </h4> 
           <table class='table table-bordered' style="width:500px"> 
              <tr> 
                   <th> You will achieve your goal in (years): </th> 
                   <td> ${ year_counter } </td>
              </tr>
              <tr>
                   <th> You will get ($):  </th>
                   <td> ${ amount_received } </td>
              </tr>
         </table>`;
    
         document.getElementById("result").innerHTML = display_str;
        
        
}
