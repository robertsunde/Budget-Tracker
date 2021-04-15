let db;

//////////////////////////////////////////////
// Calling the budget database
//////////////////////////////////////////////


const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
  };

  request.onsuccess = function(event) {
    db = event.target.result;
    console.log(db)
  
//////////////////////////////////////////////
// Makining sure the application is online
//////////////////////////////////////////////

    if (navigator.onLine) {
        checkDatabase();
      }
    };

    request.onerror = function(event) {
        console.log(event.target.errorCode);
      };
      
///////////////////////////////////////////////
// Functions for database functionality
//////////////////////////////////////////////



///////////////////////////////////////////////
// SAVERECORD
//////////////////////////////////////////////

      function saveRecord(record) {
 const transaction = db.transaction(["pending"], "readwrite");

 const store = transaction.objectStore("pending");

 store.add(record);
}



///////////////////////////////////////////////
// CHECKDATABASE
//////////////////////////////////////////////

function checkDatabase() {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    const getAll = store.getAll();

    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
          fetch("/api/transaction/bulk", {
            method: "POST",
            body: JSON.stringify(getAll.result),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            }
          })
          .then(response => response.json())
          .then(() => {

            const transaction = db.transaction(["pending"], "readwrite");
            const store = transaction.objectStore("pending");

            store.clear();
        });
      }
    };
  }


  ///////////////////////////////////////////////////////////
  // Checking for application to regain internet access.
  ///////////////////////////////////////////////////////////

  window.addEventListener("online", checkDatabase);