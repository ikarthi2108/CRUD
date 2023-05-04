//https://javascript.info/xmlhttprequest#http-headers
// npm install -g json-server
// json-server --watch db.json in Terminal(command prompt)
function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/Account");
    xhttp.send();
    //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest 
    //XMLHttpRequest Methods and Properties
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = "";
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + object["id"] + "</td>";
          trHTML +=
            '<td><img width="50px" src="' +
            object["AccHolderPhoto"] +
            '" class="AccHolderPhoto"></td>';
          trHTML += "<td>" + object["AccNo"] + "</td>";
          trHTML += "<td>" + object["AccHolderName"] + "</td>";
          trHTML += "<td>" + object["AccType"] + "</td>";
          trHTML += "<td>" + object["Address"] + "</td>";
          trHTML += "<td>" + object["Balance"] + "</td>";
          trHTML +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
            object["id"] +
            ')"><i class="fa-regular fa-pen-to-square"></i></button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger ms-2" onclick="userDelete(' +
            object["id"] +
            ')"><i class="fa-solid fa-trash "></i></button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();

  function showUserCreateBox() {
    //https://sweetalert2.github.io/v9.html
    Swal.fire({
      title: "Create user",
      html:
        '<input id="id" type="hidden">' +
        '<input id="AccNo" class="swal2-input" placeholder="AccNO">' +
        '<input id="AccHolderName" class="swal2-input" placeholder="AccHolderName">' +
        '<input id="AccType" class="swal2-input" placeholder="AccType">' +
        '<input id="Address" class="swal2-input" placeholder="Address">'+
        '<input id="Balance" class="swal2-input" placeholder="Balance">',
      preConfirm: () => {
        userCreate();
      },
    });
  }
  
  function userCreate() {
    const AccNo = document.getElementById("AccNo").value;
    const AccHolderName = document.getElementById("AccHolderName").value;
    const AccType = document.getElementById("AccType").value;
    const Address = document.getElementById("Address").value;
    const Balance = document.getElementById("Balance").value;
  if(validate()==true){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/account/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        AccNo: AccNo,
        AccHolderName: AccHolderName,
        AccType: AccType,
        Address: Address,
        Balance: Balance,
        AccHolderPhoto: "https://www.melivecode.com/users/1.png",
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }
}

  function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/Account/${id}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        console.log(objects);
        Swal.fire({
          title: "Edit User",
          html:
            '<input id="id" type="hidden" value="' +
            objects[`${id}`] +
            '">' +
            '<input id="AccNo" class="swal2-input" placeholder="AccNo" value="' +
            objects["AccNo"] +
            '"><br><br>' +
            '<input id="AccHolderName" class="swal2-input" placeholder="AccHolderName" value="'+
            objects["AccHolderName"] +
            '"</select><br><br>' +
            '<label>AccType</label><select name="country" id="AccType" style="width:160px"><option value="Savings">Savings</option><option value="Current">Current</option>'+
            objects["AccType"] +
            '"</select><br>'+
            '<br><textarea placeholder=address id="Address" type=time class="swal2-input" value="' +
            objects["Address"] +
            '"></textarea>' +
            
            '<br><input id="Balance" class="swal2-input" placeholder="Balance" value="' +
            objects["Balance"] +
            '">',
          preConfirm: () => {
            
            userEdit(id);
          },
        });
      }
    };
  }
  
  function userEdit(id) {
    const AccNo = document.getElementById("AccNo").value;
    const AccHolderName = document.getElementById("AccHolderName").value;
    const AccType = document.getElementById("AccType").value;
    const Address = document.getElementById("Address").value;  
    const Balance = document.getElementById("Balance").value;
    if(validate()==true){
      const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `http://localhost:3000/Account/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        AccNo: AccNo,
        AccHolderName: AccHolderName,
        AccType: AccType,
        Address: Address,      
        Balance:Balance,
        AccHolderPhoto: "https://logitrustvoyages.com/logitrustblog/wp-content/uploads/2020/07/street_food.jpeg",
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }
  }

  function userDelete(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open(`DELETE`, `http://localhost:3000/Account/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.value) {
            xhttp.send(
                JSON.stringify({
                  id: id,
                })
              );
              xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                 loadTable();
          }
        };
    }
      });
      }
      function validate() {
      const AccNo = document.getElementById("AccNo").value;
      const AccHolderName = document.getElementById("AccHolderName").value;
      const Address = document.getElementById("Address").value;
      const AccType = document.getElementById("AccType").value;
      const Balance= document.getElementById("Balance").value;
      //regular expression
      const nameCheck = /^[a-zA-Z\s]{2,20}$/;
      const numCheck = /^[0-9]{10}$/;
      const EMailIdCheck = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  
  
      if (AccNo == "" || AccHolderName == "" || Address == "" || AccType == "" || Balance== "") {
          Swal.fire({
              title: "Fields should not be empty",
              showConfirmButton: true,
              icon: "error"
          })
          return false;
      }
  
      if (!AccHolderName.match(nameCheck)) {
  
          Swal.fire({
              title: "Invalid Input",
              text: "Account holder should contain only alphabets",
              icon: "error",
              showConfirmButton: true,
  
          })
          return false;
  
      }
  
  
      if (!Balance.match(numCheck)) {
  
          Swal.fire({
              title: "Invalid Input",
              text: "Contact Number should contain 10 digits",
              icon: "error",
              showConfirmButton: true,
  
          })
          return false;
  
      }
      if (!Address.match(EMailIdCheck)) {
  
          Swal.fire({
              title: "Invalid Input",
              text: "Enter a valid email",
              icon: "error",
              showConfirmButton: true,
  
          })
          return false;
  
      }
      if (AccNo.match(nameCheck) && AccType.match(numCheck) && EMailId.match(EMailIdCheck)) {
          Swal.fire({
              title: "Successfully Created",
              icon: "success",
              showConfirmButton: true
  
  
          })
          return true;
      }
  }