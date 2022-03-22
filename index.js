$(document).ready(function () {

    var bookTitle; //var that will hold the book title
    var dataValue;
    var formData;
    var getFormJSON;
    var data;
    var table_lib_source;
    var dataTable;


    var responseJson;


    let appStyling = `<style>

    #main-container{
        padding: 3em;
    }

    table {
        table-layout: fixed;
        border: 1px solid;
      }
      
      td {
        border: 1px solid;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      label {
          font-weight: bold;
      }

      form {
          text-align: center;
      }

      .text-wrap {
        white-space: normal;
        word-wrap: break-word !important;
    }

    .modal-backdrop {
        z-index: 99 !important;
    }

    .modal-dialog, .modal-fade, .modal-backdrop {
        z-index: 100 !important;
    }

    #contactMainContainer {
        display: none;
    }

    #pageSubscription {
        display: none;
    }

    #Share {
        display: none !important;
    }

    #socialNav {
        display: none;
    }

    .dataTables_wrapper {
        font-family: Roboto;
        position: relative;
        clear: both;
        *zoom: 1;
        zoom: 1;
        cursor: pointer;
    }

    
    th.dt-center, td.dt-center {
        text-align: center;
    }

    table tr td:hover {
        cursor: pointer;
    }
    #addFormDiv{
        padding: 1em;
    }



    .submit {
        appearance: none;
        background-color: #2ea44f;
        border: 1px solid rgba(27, 31, 35, .15);
        border-radius: 6px;
        box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        padding: 6px 16px;
        position: relative;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: middle;
        white-space: nowrap;
      }
      
      .submit:focus:not(:focus-visible):not(.focus-visible) {
        box-shadow: none;
        outline: none;
      }
      
      .submit:hover {
        background-color: #2c974b;
      }
      
      .submit:focus {
        box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
        outline: none;
      }
      
      .submit:disabled {
        background-color: #94d3a2;
        border-color: rgba(27, 31, 35, .1);
        color: rgba(255, 255, 255, .8);
        cursor: default;
      }
      
      .submit:active {
        background-color: #298e46;
        box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
      }






      
    .cancel {
        appearance: none;
        background-color: #2ea44f;
        border: 1px solid rgba(27, 31, 35, .15);
        border-radius: 6px;
        box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        padding: 6px 16px;
        position: relative;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: middle;
        white-space: nowrap;
      }
      
      .cancel:focus:not(:focus-visible):not(.focus-visible) {
        box-shadow: none;
        outline: none;
      }
      
      .cancel:hover {
        background-color: #2c974b;
      }
      
      .cancel:focus {
        box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
        outline: none;
      }
      
      .cancel:disabled {
        background-color: #94d3a2;
        border-color: rgba(27, 31, 35, .1);
        color: rgba(255, 255, 255, .8);
        cursor: default;
      }
      
      .cancel:active {
        background-color: #298e46;
        box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
      }

</style>`


    // <label for="id">Enter ID:</label><br>
    // <input type="text" name="id" id="form id" required/><br>
    let addDocumentFormHTML = `<div id="addFormDiv"><form id="formSendData"><h1>Please enter the required information:</h1>
<label for="title">Enter Title:</label><br>
<input type="text" name="Title" id="form title" required/><br>
<label for="author">Enter Author's Name:</label><br>
<input type="text" name="Author" id="form author" required/><br>
<label for="category">Enter Category</label><br>
<input type="text" name="Category" id="form category" required/><br>
<label for="Library_GPL">Paste the link for Guelph Public Library:</label><br>
<input type="text" name="Library_GPL" id="form gpl" required/><br>
<label for="Library_WCL">Paste the link for Wellington County Library:</label><br>
<input type="text" name="Library_WCL" id="form wcl" required/><br> <br>
<input type="button" class="submit" id="submit" value="Submit"/>
<input type="button" class="cancel" id="cancel" value="Cancel"/>        
</form></div>`;


    {/* <label for="id">Enter ID:</label><br>
<input type="text" name="id" id="form edit-id" readonly/><br> */}


    let editDocumentFormHTML = `<form id="formEditData"><h1>Please edit the details:</h1>
    <input type="hidden" name="id" id="form edit-id" required/><br>
    <label for="title">Enter Title:</label><br>
    <input type="text" name="Title" id="form edit-title" required/><br>
    <label for="author">Enter Author's Name:</label><br>
    <input type="text" name="Author" id="form edit-author" required/><br>
    <label for="category">Enter Category</label><br>
    <input type="text"  name="Category" id="form edit-category" required/><br>
    <label for="Library_GPL">Paste the link for Guelph Public Library:</label><br>
    <input type="text" name="Library_GPL" id="form edit-gpl" required/><br>
    <label for="Library_WCL">Paste the link for Wellington County Library:</label><br>
    <input type="text" name="Library_WCL" id="form edit-wcl" required/><br> <br>
    <input type="button" class="submit" id="edit-submit" value="Submit"/>
    <input type="button" class="cancel" id="edit-cancel" value="Cancel"/>        
    </form>`;

    let htmlContainers = ` 
    <div id="drop-down"></div>


    <div id="table-container"></div>

    <div id="pages"></div>


    <!--Container for the loading animation-->
    <div id="loader">
        <div id="box"></div>
    </div>

    <div id="metadata-form-container"></div>

    
    <div id='add-new-document'> </div>
    <div id='add-document-form'></div>
    <div id='edit-document-form'></div>
    `;



    //checking if the DOM includes a div container with id "main-container"
    if (document.getElementById("main-container")) {
        document.head.insertAdjacentHTML("beforeend", appStyling);
        document.getElementById("main-container").insertAdjacentHTML("afterbegin", htmlContainers);     //Adding the required containers to the main container for the app to work.

    }



    loaderDiv = document.getElementById("loader");  //container of the loading animation

    metadataFormContainerDiv = document.getElementById("metadata-form-container");  //container for the metadata form of a blob file

    pagesDiv = document.getElementById("pages");    //Container of the pages for pagination of blobs table

    addDocumentForm = document.getElementById("add-document-form");

    editDocumentForm = document.getElementById("edit-document-form");

    var tableHeader;





    var tableContainerDiv = document.getElementById("table-container"); //Container of the blobs table
    let table_library = `<div style="overflow-x: auto;"><table id="table_library" class="display nowrap responsive table table-striped table-bordered table-responsive compact">
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Library_GPL</th>
                <th>Library_WCL</th>
                <th>update</th>
                <th>Delete</th>
            </tr>
        </thead>
    </table></div>`





    tableContainerDiv.insertAdjacentHTML("afterbegin", table_library);


    loaderDiv = document.getElementById("loader");  //container of the loading animation

    metadataFormContainerDiv = document.getElementById("metadata-form-container");  //container for the metadata form of a blob file

    pagesDiv = document.getElementById("pages");    //Container of the pages for pagination of blobs table

    addDocumentButtonDiv = document.getElementById("add-new-document");


    addDocumentButtonDiv.innerHTML = `<button id="addNewDocument">Add a new record</button>`;

    addDocumentForm.insertAdjacentHTML("afterbegin", addDocumentFormHTML);

    editDocumentForm.insertAdjacentHTML("afterbegin", editDocumentFormHTML);


    addDocumentForm.style.display = "none";
    editDocumentForm.style.display = "none";
    addDocumentButtonDiv.style.display = "block";


    document.getElementById("addNewDocument").addEventListener('click', function () {
        tableContainerDiv.style.display = "none";
        addDocumentForm.style.display = "block";
        addDocumentButtonDiv.style.display = "none";
    });


    getDataForDataTable()

    document.getElementById("submit").addEventListener('click', function () {
        const formElement = document.querySelector("form")
        console.log("form data is present");
        console.log(formElement)
        console.log(getFormJSON(formElement))

        sendDataToCosmos(getFormJSON(formElement));
        addDocumentForm.style.display = "none";
        tableContainerDiv.style.display = "block";
        setTimeout(function () {
            location.reload();
        }, 500);
    });

    getFormJSON = (form) => {
        const data = new FormData(form);
        return Array.from(data.keys()).reduce((result, key) => {
            result[key] = data.get(key);
            return result;
        }, {});
    };

    //add Method
    function sendDataToCosmos(addData) {
        console.log(addData)
        const requestURL = "https://modfiycosmosdb.azurewebsites.net/api/addDocumentLibraryCatalogue?code=v0hbnoZf3GvVRbvf714siLSIa6NBpmlFf9qSPmYkAkJbk2uAR/sCBA==&Title=" + encodeURIComponent(addData.Title);
        fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify(addData),
            headers: {
                 "Content-type": "application/json; charset=UTF-8"
         }
        })
            .then(response => {
                if (response.ok) {
                    console.log("add complete")
                }
            })
            .then(json => console.log(json))

    }


    function getDataForDataTable() {
        const request = new Request("https://modfiycosmosdb.azurewebsites.net/api/getAllDocument?code=BK1wNPJsYzW3bah3QudDmYWCEnLpiflL2ea6mtifyqACRcW6fQj61w==");
        fetch(request)
            .then(response => response.text())
            .then(json => {
                responseJson = JSON.parse(json);
                console.log(responseJson);
                createDataTable(responseJson);

            })
    }

    function createDataTable(responseJson) {
        var dataTable = $('#table_library').DataTable({
            "pageLength": 50,
            "data": responseJson,
            "columns": [
                { "data": "Title", "name": "title", "visible": true, "autoWidth": true },
                { "data": "Author", "name": "author", "visible": true, "autoWidth": true },
                { "data": "Category", "name": "category", "visible": true, "autoWidth": true },
                { "data": "Library_GPL", "name": "library_gpl", "visible": true, "autoWidth": true },
                { "data": "Library_WCL", "name": "library_wcl", "visible": true, "autoWidth": true },
                { "title": "Edit", "defaultContent": "<div>Edit</div>" },
                { "title": "Delete", "defaultContent": "<div>Delete</div>" }
            ],

            "columnDefs": [
                { render: function (data, type, full, meta) { return "<div class='text-wrap' style='width: 6em;'>" + data + "</div>"; }, width: 10, targets: 0 }, // title  
                { render: function (data, type, full, meta) { return "<div class='text-wrap' style='width: 5em;'>" + data + "</div>"; }, width: 10, targets: 1 }, // author
                { render: function (data, type, full, meta) { return "<div class='text-wrap' style='width: 4em;'>" + data + "</div>"; }, width: 10, targets: 2 }, // category
                { render: function (data, type, full, meta) { return "<div class='text-wrap' style='width: 8em;'><a href='" + data + "' target='_blank'>Check Availability</a></div>"; }, width: 10, targets: 3 }, // libarry_gpl
                { render: function (data, type, full, meta) { return "<div class='text-wrap' style='width: 8em;'><a href='" + data + "' target='_blank'>Check Availability</a></div>"; }, width: 10, targets: 4 }, // library_wcl
                { render: function (data, type, row) {
                   
                     return `<div class='text-wrap' style='width: 8em;'><button class='edit'>Edit</button></div>`;
                 }, width: 10,targets: 5}, // button update
                {  render: function (data, type, full, meta) {
                    return `<div class='text-wrap' style='width: 8em;'><button class='delete'>Delete</button></div>`;
                }, width: 10,targets: 6} // button delete
            ]


        });

        $('#table_library tbody').on('click', 'button.delete', function () {
            //if delete is in the next line
            // var row1 = $(this).parents('tr')
            // console.log($(this))
            // console.log(row1)
            var data = dataTable.row().data();
            if (data === undefined){
                data = dataTable.row(parents('tr')).data();
                data = dataTable.row($(this).parents('tr')).data();
            }
            console.log(data)


            console.log(data.id + " is the id  whose title is " + data.Title);
            const requestURL = "https://cashishfunctionapp.azurewebsites.net/api/deletefunction?id=" + encodeURIComponent(data.id);
            fetch(requestURL, {
                method: 'DELETE',
            })
            setTimeout(function () {
                location.reload();
            }, 500);

            // $('#table_library').DataTable().ajax.reload();
        });

        $('#table_library tbody').on('click', 'button.edit', function () {
            var data = dataTable.row().data();
            if (data === undefined){
                data = dataTable.row(parents('tr')).data();
                data = dataTable.row($(this).parents('tr')).data();
            }
            console.log(data)
            updateRecords(data)

        });




    }


    function updateRecords(data) {


        tableContainerDiv.style.display = "none";
        editDocumentForm.style.display = "block";
        document.getElementById("form edit-id").value = data.id;
        document.getElementById("form edit-title").value = data.Title;
        document.getElementById("form edit-author").value = data.Author;
        document.getElementById("form edit-category").value = data.Category;
        document.getElementById("form edit-gpl").value = data.Library_GPL;
        document.getElementById("form edit-wcl").value = data.Library_WCL;


        document.getElementById("edit-submit").addEventListener('click', function () {
            const formElement = document.getElementById("formEditData")
            console.log("form data is present");
            console.log(getFormJSON(formElement))
            sendDataToCosmos(getFormJSON(formElement));
            editDocumentForm.style.display = "none";
            tableContainerDiv.style.display = "block";
            // setTimeout(function() {
            //     location.reload();
            //   }, 500);
        });

        getFormJSON = (form) => {
            const data = new FormData(form);
            return Array.from(data.keys()).reduce((result, key) => {
                result[key] = data.get(key);
                return result;
            }, {});
        };

    }


    //DELETE	 https://{databaseaccount}.documents.azure.com/dbs/{db-id}/colls/{coll-id}/docs/{doc-id}

    // function deleteBookRecord(){

    //     function ajaxCall() {
    //         $.ajax({

    //             // Our sample url to make request 
    //             url: 'https://tweedsmuirqa.documents.azure.com/dbs/TweedsmuirDatabase/colls/librarycatalogue/docs/2',

    //             // Type of Request
    //             type: "DELETE",

    //             // Function to call when to
    //             // request is ok 
    //             success: function (data) {
    //                 var x = JSON.stringify(data);
    //                 console.log(x);
    //             },

    //             // Error handling 
    //             error: function (error) {
    //                 console.log(`Error ${error}`);
    //             }
    //         });
    //     }
    //     ajaxCall();
    // }






    //getBookRecords("Greenlights")
    function getBookRecords(bookTitle) {

        const request = new Request("https://modfiycosmosdb.azurewebsites.net/api/queryCatalogue?code=/PIO0juyuhXKUNNhvnIzatHAs8IG/82/BLbAKJGvOpXajE7AwOT0Ww==&Title=" + encodeURIComponent(bookTitle));
        this.fetch(request)
            .then(response => response.text())
            .then(json => console.log(json))

    }




    document.getElementById("cancel").addEventListener('click', function () {
        console.log("cancel button clicked");
        addDocumentForm.style.display = "none";
        tableContainerDiv.style.display = "block";
        addDocumentButtonDiv.style.display = "block";
    })


    document.getElementById("edit-cancel").addEventListener('click', function () {
        console.log("cancel button clicked");
        editDocumentForm.style.display = "none";
        tableContainerDiv.style.display = "block";
        addDocumentButtonDiv.style.display = "block";
    })

})


function editFunction1(data) {
    alert(data)
}

function deleteFunction1(data) {
    console.log(data)
}