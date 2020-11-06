var idCount = []; //gloable vairables
var addStatus = true;
var addChargerStatus = true;
var total = 0;

addSerivceFee = true;
serivceFee = 85;

function openWindow() {
    window.open("invoice.html");
}

function onloadFunction() {
    document.getElementById('serviceFee').value = 85; //set the value to 85 when window is loaded as the service fee is needed when the user loads the web page
}

function checkFirstName(inputtxt, inputtxt2) {
    var letters = /^[a-zA-Z\s\-]+[a-zA-Z\s\-]+[a-zA-Z\s\-]$/; //from https://regexr.com regex for the checking if the first name and last valid
    if (inputtxt.value.match(letters) && inputtxt2.value.match(letters)) { //If the both of the inputs match the regex console log true name, if not trigger the alert
        console.log("true name");
        return true;
    }
    else {
        alert('Alphabet characters in first name');
        console.log("false name");
        return false;
    }
}

function checkPostCode() { //The check post code method to make sure that the post code it equil to or more than 4 characters long or print an alert

    if (document.getElementById('postCode').value.toString().length <= 4) {
        console.log("true post code");
        return true;
    } else {
        console.log("false post code");
        alert('Enter a valid post code');
        return false;
    }
}

function checkIMEINumber() {
    if (document.getElementById('imeiNumber').value.toString().length <= 15) { //make sure that the IMEI number is less than 15 characters long or print an alert 
        console.log("Valid IMEINumber");
        return true;
    } else {
        console.log("Invalid IMEINumber");
        alert("Enter a valid IMEI number");
        return false;
    }
}

function checkEmail(inputX) { //check if the email is valid using regex
    var letters = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g; //from https://regexr.com
    if (inputX.value.match(letters)) { //does the input match the regex
        console.log("Email is valid");
        return true;
    } else { //if the email is not vlaid alert the user
        alert('Email is not valid');
        console.log('Email is not valid');
        return false;
    }
}

function isFuture(inputX) { //overly complicated dumb method, but it works so i call it a win. There is another easy way to do it, but i found out after 
    var date = document.getElementById(inputX).value.toString();
    var today = new Date().getDate().toString();
    var month = new Date().getMonth().toString();
    var year = new Date().getFullYear().toString();
    var yearStatus = "";
    var monthStatus = "";
    noHeiphinStr = date.split('-').join(' ');
    console.log(noHeiphinStr, year, month, today);

    var splitDate = noHeiphinStr.split(' '); //0=year 1=month 2=day

    var currentDay = []; //0=entered-year 1=entered-month 2=entered-day 3=current-year 4=current-month 5=current day
    currentDay.push(
        splitDate[0], splitDate[1], splitDate[2], year, month, today
    );
    console.log(currentDay);

    if (currentDay[0] <= currentDay[3]) { //if enterd year is less and current year
        console.log("year is valid");
        yearStatus = true;
    } else { //if entered year is greater than current year set year status to false so the next part will not execute
        yearStatus = false;
        console.log("year has not passed");
        alert("Date is not valid");
    }
    if (yearStatus == true) { //if the year has passed check if the months are valid
        if (currentDay[1] <= currentDay[4]) {
            console.log("month is valid");
            monthStatus = true;
        } else {
            monthStatus = false;
            console.log("month is not valid");
            alert("Date is not valid");
        }
    } if (monthStatus == true) { //if the month has passed then the date can can be checked
        if (currentDay[2] <= currentDay[5]) {
            console.log("this is not the futrue");
        } else {
            console.log("day is not valid");
            alert("Date is not valid");
        }
    }
}

function checkWarentyDate() { //if purchase date is more than 24 months ago 
    var purchaseDate = new Date(document.getElementById("inputDate").value);
    console.log(purchaseDate);

    var today = new Date();

    today.setMonth(today.getMonth() - 24); //reduce todays date by 24 month
    if (purchaseDate <= today) {//if purchase date is less than the today
        console.log("out of date");
        document.getElementById('warrantyCheck').hidden = true;
        document.getElementById('serviceFee').value = 85;
        serivceFee = 85;


        return false;
    } else {
        console.log("Still in date");
        document.getElementById('warrantyCheck').hidden = false;
        if (document.getElementById('warrantyCheck').checked == true) { //if the check box is still checked dont set it to 0 
            document.getElementById('serviceFee').value = 0;
            serivceFee = 0;

        }
        return true;
    }

}

function warrentlyChecked() {
    if (document.getElementById('warrantyCheck').checked == false) { //if the box is not checked set the price to $85 else 0
        document.getElementById('serviceFee').value = 85;
        serivceFee = 85; //assign the variable to the value of the service fee 
        // document.getElementById('totalNoGst').value = total + 85; 
        console.log("T" + total);
    } else {
        document.getElementById('serviceFee').value = 0;
        serivceFee = 0;
        console.log(serivceFee);
        //document.getElementById('totalNoGst').value = total  -85; 
    }
    console.log(total)
    document.getElementById("totalNoGst").value = total;
    detectCostChange();
}

function phoneumberCheck(inputX) { //check if the phone number is valid by checking the input against the regex code
    var letters = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g; //from https://regexr.com
    if (inputX.value.match(letters)) {
        console.log("phone number is valid");
        return true;
    } else {
        alert('Phone number is not vaild');
        return false;
    }
}



function addToTable() { //add to table function for adding the correct values to the table where you select your item



    if (addStatus === true && document.getElementById('phoneSelect').value == "Iphone") { //if ihpone is selected 
        var table = document.getElementById('table1');
        var row = table.insertRow(1);//make sure that the row is inserted below the title row
        var cell1 = row.insertCell(0); //inser a new cell at 0 to the left
        var cell2 = row.insertCell(1); //insert a cell to the right 
        cell2.innerHTML = "275";
        total += 275;
        cell1.innerHTML = document.getElementById('phoneSelect').value;
        addStatus = false;
    } else if (document.getElementById("phoneSelect").value == "Other" && addStatus === true) { //if other is selceted 
        var table = document.getElementById('table1');
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell2.innerHTML = "100";
        total += 100;
        cell1.innerHTML = document.getElementById('phoneSelect').value;
        addStatus = false;
    } else if (addChargerStatus === true && document.getElementById('phoneSelect').value === "Charger") { //default to charger 
        var table = document.getElementById('table1');
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell2.innerHTML = "30";
        total += 30;
        cell1.innerHTML = document.getElementById('phoneSelect').value;
        addChargerStatus = false;
    }

    detectCostChange(); //call the detect cost change method so when a new element is added to the table it updates the output values

}

var gst = 0; //gloabal variable 
function removeToTable() {
    var x = document.getElementById("table1").rows[1].cells[1].innerHTML; //get the dollars column value so we can check what it is in the conditions below

    if (x == "275") { //if the value in the money column is == 275 this means that is is an Iphone and you can now add an Iphone
        addStatus = true;


    } else if (x == "100") { //if it is equil to 100 this means that it is an "other" phone being removed
        addStatus = true; //can add a phone now as a phone has just been removed 

    } else if (x == "30") { //if the couumn == 30, this means that it is a charger
        addChargerStatus = true; //can now add a charger as a charger has just been removed 
    }
    total = total - x; //set the total to toal- the money column that has just been removed
    if (document.getElementById('exampleRadios2').checked && !document.getElementById('warrantyCheck').checked) { //complecated conditions if 
        calcOnRemove(); //call the calcOnRemove method to calculate the outputs on the form
    } else if (!document.getElementById('exampleRadios2').checked) {
        calcOnRemove();
    } else if (document.getElementById("table1").rows.length == 0) {
        document.getElementById('totalNoGst').value = 0;
        total = 0;
    }

    //console.log("ahh  " + total)
    //console.log("ahh  2 " + x)
    document.getElementById('table1').deleteRow(1);
    detectCostChange() //call the dtect cost change method to recalculate the outputs
}

function calcOnRemove() {
    var x = document.getElementById("table1").rows[1].cells[1].innerHTML;

    document.getElementById("gst").value -= x * 0.15; //remove the GST from the GST output 
    document.getElementById('totalNoGst').value = x - x; //remvoe the x value - x so it goes to 0 when nothing is in the table 
    document.getElementById('totalGst').value -= (x * 1.15);
    if (document.getElementById('totalGst').value == 1.4210854715202004e-14) { //A weird math thing that means 115 - 115 = 1.4, this is corrected using an if statement 
        document.getElementById('totalGst').value = 0;
        if (document.getElementById('warrantyCheck').checked == true || document.getElementById('warrantyCheck').hidden == false) {
            total = 0;
        }
    }
    document.getElementById('bond').value = total; //set the bond to the total at the end 
}

function detectCostChange() {
    var t = total + serivceFee;
    if (document.getElementById('exampleRadios2').checked == true) { //if business is selected set the bond to total  
        document.getElementById('bond').value = 0;
        if (document.getElementById("warrantyCheck").checked) {
            t = 0;
        }
        console.log("B" + total);
    } else if (document.getElementById('comsumerRadio').checked == true) { //if the user has selected the input to customer then add the bond 
        document.getElementById('bond').value = total;
        console.log("C" + total);
    }

    document.getElementById('totalNoGst').value = t;
    var gstTotal = t;
    gstTotal = gstTotal * 0.15; //calculate GST
    document.getElementById("gst").value = gstTotal;
    document.getElementById('totalGst').value = gstTotal + t;

}

function resetForm() {
    //clear all the bootstrap values 
    console.log('i am cool');
    while (document.getElementById("table1").rows.length > 1) {//clear the rows 
        document.getElementById("table1").deleteRow(1);
    }

    addStatus = true;
    addChargerStatus = true;
    total = 0;
    addSerivceFee = true;
    serivceFee = 85;
    //set the values to 0 or null or their defult states
    document.getElementById("inputDate").value = 0;
    document.getElementById("inputDate2").value = 0;
    document.getElementById("imeiNumber").value = null;
    document.getElementById("mobileNumber").value = null;
    document.getElementById("phoneSelect2").value = "Samsung";
    document.getElementById("faultSelect1").value = "Battery";
    document.getElementById("descriptionTextArea").value = "";
    document.getElementById("warrantyCheck").checked = false;
}

//Logging Data To IndexDB----------------------//
//Code sourced from lab 11 

//---------------------------------------------------------------
//Check the browser configuration to see if it supports IndexedDB or not
//---------------------------------------------------------------
//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
//Check if your browser support IndexedDB API or not?
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}


//Declare database variable "db"
var db;

//1: Create or open the database by using indexedDB.open() method:
// window.indexedDB.open(databaseName, version)
var request = window.indexedDB.open("PhoneFixBookingSystem", 1);

//2a: If failed to create/open database, write message to console.
6
request.onerror = function (event) {
    console.log("error: ");
};
//2b: If database was opened successfully, assign the created database to "db" variable
request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

//3: If the specified version number is greater than the actual version number of the database,
// a database upgrade event "upgradeneeded" occurs.
request.onupgradeneeded = function (event) {
    //Upgrade database version --> create a new database tif the specified database doesn't exist
    var db = event.target.result;
    //Create a new table called "invoice" and assign it to a "objectStore" variable
    // the primary key of the "invoice" table is "id"
    var objectStore;
    if (!db.objectStoreNames.contains('invoice')) {
        //Only create "invoice" table when it doesn't exist
        objectStore = db.createObjectStore('invoice', { keyPath: "id" });
    }

}


function addInvoice() {
    //Get data entered page:1
    let customer_type_Consumer = document.getElementById("comsumerRadio").value;
    let customer_typeBsuiness = document.getElementById("exampleRadios2").value;
    let title_select = document.getElementById("titleSelect").value;
    let firstName = document.getElementById("inputFN").value;
    let lastName = document.getElementById('inputLN').value;
    let street = document.getElementById("street").value;
    let suburb = document.getElementById('suburb').value;
    let city = document.getElementById("city").value;
    let postCode = document.getElementById('postCode').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let docEmail = document.getElementById('email').value;
    //page:2
    let purchase_date = document.getElementById('inputDate').value;
    let repair_date = document.getElementById('inputDate2').value;
    let warrentlyCheck = document.getElementById('warrantyCheck').value;
    let imeiNumber = document.getElementById('imeiNumber').value;
    let phoneTypeSelect = document.getElementById('phoneSelect2').value;
    let modelNumber = document.getElementById('mobileNumber').value;
    let faultSelect = document.getElementById('faultSelect1').value;
    let textArea = document.getElementById('descriptionTextArea').value;
    //page:3
    let phoneSelect = document.getElementById('phoneSelect').value;
    let table = document.getElementById("table1").rows[1].cells[1].value;
    let bond = document.getElementById('bond').value;
    let serviceFee = document.getElementById('serviceFee').value;
    let totalNoGst = document.getElementById('totalNoGst').value;
    let gst = document.getElementById('gst').value;
    let totalGst = document.getElementById('totalGst').value;

    //Calculate the new invoiceID ?
    let invoiceID = 0;

    //ASYNCHRONOOUS TRANSACTION: ISSUE
    //Traverse all the records of the data table by using the pointer object IDBCursor
    //var tx = db.transaction("invoice").objectStore("invoice");
    var tx = db.transaction("invoice", "readwrite");
    //
    tx.objectStore("invoice").openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        //For each cursor (each invoice object)
        if (cursor) {
            //Get id
            let id = cursor.key;
            if (id >= invoiceID) {
                invoiceID = id;
            }
            //Move to next object
            cursor.continue();
        } else {
            //alert("No more entries!");
        }
    };

    //WAIT UNTIL THE TRANSACTION COMPLETE ==> ADD NEW INVOICE
    tx.oncomplete = function () {
        //Read back updated data
        db.transaction("invoice").objectStore("invoice").get(0).onsuccess = function (event) {
            //Increase the invoiceID by 1
            invoiceID++;
            alert("invoiceID =" + invoiceID);

            //Open a transaction to access to table "invoice" in the mode of "readwrite" & add a new invoice
            var request = db.transaction(["invoice"], "readwrite")
                .objectStore("invoice")
                .add({
                    id: invoiceID, customer_type_Consumer: customer_type_Consumer, customer_typeBsuiness: customer_typeBsuiness, title_select: title_select,
                    firstName: firstName, lastName: lastName, street: street, suburb: suburb, city: city, postCode: postCode, phoneNumber: phoneNumber,
                    docEmail: docEmail, purchase_date: purchase_date, repair_date: repair_date, warrentlyCheck: warrentlyCheck, imeiNumber: imeiNumber,
                    phoneTypeSelect: phoneTypeSelect, modelNumber: modelNumber, faultSelect: faultSelect, textArea: textArea, phoneSelect: phoneSelect,
                    table: table, bond: bond, serviceFee: serviceFee, totalNoGst: totalNoGst, gst: gst, totalGst: totalGst
                });

            //If the addition was successful, alert an successful message
            request.onsuccess = function (event) {
               // alert("SUCCESSFUL! New invoice = " + invoiceID + " has been added to your database.");
            };
            //If the addition failed, alert an error message
            request.onerror = function (event) {
                alert("ERROR! Unable to add a new invoice to your database! invoiceID =" + invoiceID);
            }
        }
    }
}

//---------------------------------------------------------------
function displayInvoices() {
    //console.log("Display is being called")
    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);

        //Get the entire object store "invoice" which contains all invoice info
        var objectStore = db.transaction("invoice").objectStore("invoice");
        //Get "table" element
        var invoice_table = document.getElementById("invoice_table");
        var row, cell;
        var id, customer_type_Consumer, customer_typeBsuiness, title_select, firstName, lastName, street, suburb, city, postCode, phoneNumber,
            docEmail, purchase_date, repair_date, warrentlyCheck, imeiNumber, phoneTypeSelect, modelNumber, faultSelect, textArea, phoneSelect, table,
            bond, serviceFee, totalNoGst, gst, totalGst;
        var allInfo = "";

        //If the "get" transaction was successful, traverse all the records of the data table
        // by using the pointer object IDBCursor
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            //For each cursor (each invoice object), get invoice info and add it to the "invoice_table"
            if (cursor) {
                //Add a new row inside the invoice_table to display invoice info
                id = cursor.key;
                customer_type_Consumer = cursor.value.customer_type_Consumer;
                customer_typeBsuiness = cursor.value.customer_typeBsuiness;
                title_select = cursor.value.title_select;
                firstName = cursor.value.firstName;
                lastName = cursor.value.lastName;
                street = cursor.value.street;
                suburb = cursor.value.suburb;
                city = cursor.value.city;
                postCode = cursor.value.postCode;
                phoneNumber = cursor.value.phoneNumber;
                docEmail = cursor.value.docEmail;
                purchase_date = cursor.value.purchase_date;
                repair_date = cursor.value.repair_date;
                warrentlyCheck = cursor.value.warrentlyCheck;
                imeiNumber = cursor.value.imeiNumber;
                phoneTypeSelect = cursor.value.phoneTypeSelect;
                modelNumber = cursor.value.modelNumber;
                faultSelect = cursor.value.faultSelect;
                textArea = cursor.value.textArea;
                phoneSelect = cursor.value.phoneSelect;
                table = cursor.value.table;
                bond = cursor.value.bond;
                serviceFee = cursor.value.serviceFee;
                totalNoGst = cursor.value.totalNoGst;
                gst = cursor.value.gst;
                totalGst = cursor.value.totalGst;

                //
                //if id >=
                idCount.push(id); //add the IDs to the array 

                var numberOfObjects = idCount.length;
                //console.log("length of array: " + numberOfObjects); //get the length of the array 

                //Move to next object
                cursor.continue();

            } else {
                //skip the object with the ID of the number in the if statement 
                //console.log("doing something else");
            }
            console.log("this is working");
            document.getElementById("allInvoices").innerHTML = allInfo;
            document.getElementById('nameOut').innerHTML = title_select + " " + firstName + " " + lastName;
            document.getElementById("addressOut").innerHTML = street + " " + suburb;
            document.getElementById("postCodeOut").innerHTML = postCode;
            document.getElementById('phoneNumberOut').innerHTML = phoneNumber;
            document.getElementById('emailOut').innerHTML = docEmail;
            document.getElementById('jobNumberOut').innerHTML = id;
            document.getElementById('invoiceNumberOut').innerHTML = id;
            document.getElementById('paymentOut').innerHTML = totalGst;

            document.getElementById("purhaseOut").innerHTML = purchase_date
            document.getElementById('repairDate').innerHTML = repair_date;
            document.getElementById('warentyState').innerHTML = warrentlyCheck;
            document.getElementById('IMEINumbers').innerHTML = imeiNumber;
            document.getElementById('deviceMake').innerHTML = phoneTypeSelect;
            document.getElementById('modelNumber').innerHTML = modelNumber;
            document.getElementById("faultOut").innerHTML = faultSelect;
            document.getElementById("descriptionOut").innerHTML = textArea;
            document.getElementById("moenyOut").innerHTML = totalGst;

            document.getElementById('bondOut').innerHTML = bond;
            document.getElementById('serviceFeeOut').innerHTML = serviceFee;
            document.getElementById('totalOut').innerHTML = totalNoGst;
            document.getElementById("gstOut").innerHTML = gst;
            document.getElementById('totalGstOut').innerHTML = totalGst;
            document.getElementById('tableOut').innerHTML = table;
        };
    };
}
//Auto complete function from https://www.addy.co.nz/address-finder-code-example

// This is the callback function to initialise the address lookup
function initAddy() {
    var addyComplete = new AddyComplete(document.getElementById("street"));
    addyComplete.fields = {
        address1: document.getElementById("address_line_1"), //set the values to what the libary says it should be
        address2: document.getElementById("address_line_2"),
        suburb: document.getElementById("suburb"),
        city: document.getElementById("city"),
        postcode: document.getElementById("postCode")
    }

}

function uploadimage(){
    var fileUpload = document.getElementById('fileOut').value;
    document.getElementById('imageTag').src = fileUpload; 
}

//Function saused from https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html
window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img.onload = imageIsLoaded;
        }
    });
  });
  

function goToFaq(){
    window.open("faqs.html");
}