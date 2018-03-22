$("#loginSubmit").on("click", function(event) {
  event.preventDefault();
  sessionStorage.clear();

  if ($("#username").val() && $("#userPassword").val()) {
    var submittedPassword = $("#userPassword").val();
    var username = $("#username")
      .val()
      .toLowerCase();
    console.log("LINE 15" + username);

    $("#username").val("");
    $("#userPassword").val("");

    //query taskrs for username and password and check if they match
    $.ajax("/api/taskrs/" + username, {
      type: "GET",
      data: username
    }).then(function(dbTaskr) {
      if (dbTaskr === null) {
        $("#modal1Body").empty();
        modal1.style.display = "block";
        $("#modal1Body").append(`
                        <div class="text-center modal-content-head-img-bottom-space2">
                            <img class="model-content-head-img" src="images/taskr.png" alt="">
                        </div>
                        <h4 class="text-center">There is no Account associated with that Username</h4>
                        <h4 class="text-center">Please try again, or Sign up for an Account</h4>
                    `);
        setTimeout(() => {
          location.href = "/";
        }, 10000);
      } else {
        console.log("LINE 25" + dbTaskr);
        console.log("My password is" + dbTaskr.password);
        var dbPassword = dbTaskr.password;
        var userDbID = dbTaskr.id;

        // Store username and password to sessionStorage
        sessionStorage.setItem("username", dbTaskr.username);
        sessionStorage.setItem("id", dbTaskr.id);

        if (submittedPassword !== dbPassword) {
          $("#modal1Body").empty();
          modal1.style.display = "block";
          $("#modal1Body").append(`
                                <div class="text-center modal-content-head-img-bottom-space2">
                                    <img class="model-content-head-img" src="images/taskr.png" alt="">
                                </div>
                                <h4 class="text-center">Your Password is Incorrect</h4>
                                <h4 class="text-center">If you Forgot it, you can reset it</h4>
                                <h4 class="text-center">by clicking "Forget Password"</h4>
                            `);
          setTimeout(() => {
            location.href = "/";
          }, 6000);
        } else {
          // AJax Put to update LoggedIn to True
          var login = {
            loggedIn: true,
            id: sessionStorage.getItem("id")
          };

          $.ajax("/api/login", {
            type: "PUT",
            data: login
          }).then(function(dbTaskr) {
            location.href = "/home";
          });
        }
      }
    });
  } else $("#modal1Body").empty();
  modal1.style.display = "block";
  $("#modal1Body").append(`
                <div class="text-center modal-content-head-img-bottom-space2">
                    <img class="model-content-head-img" src="images/taskr.png" alt="">
                </div>
                <h4 class="text-center">Please Enter a Username and Password</h4>
                <h4 class="text-center">to Log in!</h4>
                `);
  setTimeout(() => {
    location.href = "/";
  }, 4000);
  //end of if statement
});
// 