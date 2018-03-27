
$(document).ready(function () {

    var modal1 = document.getElementById("myModal");
    // var modalComment = document.getElementById('commentModal');

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
      modal1.style.display = "none";
    };

    window.onclick = function(event) {
      if (event.target == modal1) {
        modal1.style.display = "none";
      }
    };


var userNameOk = false;
var userNamesArray = [];

  //Start of user login ========================================================================================================
    $("#userPassword").keyup(function(event) {
        if (event.keyCode === 13) {
          $("#loginSubmit").click();
        }
      });

    $("#loginSubmit").on("click", function(event){
        event.preventDefault();
        sessionStorage.clear();

        if($("#username").val() && $("#userPassword").val()){
            var submittedPassword = $("#userPassword").val()
            var username = $("#username").val().toLowerCase();
            console.log("LINE 15" + username);

            $("#username").val("");
            $("#userPassword").val("");

        //query taskrs for username and password and check if they match
            $.ajax("/api/taskrs/"+ username, {
                type: "GET",
                data: username
            }).then(function(dbTaskr) {
                if (dbTaskr === null) {
                    $("#modal1Body").empty();
                    modal1.style.display = "block";
                    $("#modal1Body").append(`
                        <h4 class="text-center">There is no Account associated with that Username</h4>
                        <h4 class="text-center">Please try again, or Sign up for an Account</h4>
                    `);
                    setTimeout(() => {
                        location.href = "/";
                    }, 10000)
                } else {
                    console.log("LINE 25" + dbTaskr);
                    console.log("My password is" + dbTaskr.password);
                    var dbPassword = dbTaskr.password;
                    var userDbID = dbTaskr.id;

                // Store username and password to sessionStorage
                    sessionStorage.setItem("username", dbTaskr.username);
                    sessionStorage.setItem("id", dbTaskr.id);

                        if (submittedPassword !== dbPassword){
                            $("#modal1Body").empty();
                            modal1.style.display = "block";
                            $("#modal1Body").append(`
                                <h4 class="text-center">Your Password is Incorrect</h4>
                                <h4 class="text-center">If you Forgot it, you can reset it</h4>
                                <h4 class="text-center">by clicking "Forget Password"</h4>
                            `);
                            setTimeout(() => {
                                location.href = "/";
                            }, 3000)
                        } else{
                            // AJax Put to update LoggedIn to True
                            var login = {
                                loggedIn: true,
                                id: sessionStorage.getItem("id")
                            };

                            $.ajax("/api/login",
                            {
                                type: "PUT",
                                data: login
                            }
                            ).then(function(dbTaskr) {
                                location.href = "/home";

                            });
                        }
                    }
                });
        }else{
            $("#modal1Body").empty();
            modal1.style.display = "block";
            $("#modal1Body").append(`
                <h4 class="text-center">Please Enter a Username and Password</h4>
                <h4 class="text-center">to Log in!</h4>
                `);
                setTimeout(() => {
                    location.href = "/";
                }, 3000)
            }
        //end of if statement
    })

//End of user login ========================================================================================================


//Start of Logout ========================================================================================================
    $("#logoutSubmit").on("click", function(event){
        event.preventDefault();
          // AJax Put to update LoggedIn to False
            var logout = {
                loggedIn: false,
                id: sessionStorage.getItem("id")
            };
            $.ajax("/api/logout",
                {
                    type: "PUT",
                    data: logout
                }
            ).then(function(dbTaskr) {
        //end of if statement
                sessionStorage.clear();
            // Redirect to Login Page
            location.href="/";
            });
    })
//End of Logout ========================================================================================================

//Lets user know if username is available ========================================================================================================

$("#userNameCreate").on("keyup", function() {
  $("#userNameOk").empty();
  if ($("#userNameCreate").val().length > 2) {
    $.ajax("/api/taskrs", {
      type: "GET",
      data: username
    }).then(function(dbTaskr) {
      console.log(dbTaskr);
      for (let i = 0; i < dbTaskr.length; i++) {
        userNamesArray.push(dbTaskr[i].username);
      }

      if (userNamesArray.includes($("#userNameCreate").val())) {
        $("#userNameOk").html("<h5 style=color:red;>UserName is already Taken</h5>");
            userNameOk=false;

      } else if (!userNamesArray.includes($("#userNameCreate").val())) {
        $("#userNameOk").html( "<h5 style=color:green;>UserName is already Available</h5>");
            userNameOk = true;

      }
    });
  }
  console.log(userNamesArray);
});


//Start of create user account ========================================================================================================
    $("#signupSubmit").on("click", function (event) {
        event.preventDefault();
        if ($("#userNameCreate").val() && $("#userPasswordCreate").val() && $("#userPasswordCreate2").val()
            && $("#secQuestionOneAnswer").val() && $("#secQuestionTwoAnswer").val() && $("#secQuestionThreeAnswer").val() ) {


            if (userNameOk === true) {
                if($("#userPasswordCreate").val() === $("#userPasswordCreate2").val()){
                        var createUser = {
                            username: $("#userNameCreate").val().toLowerCase(),
                            password: $("#userPasswordCreate").val(),
                            secQuestion1: $("#secQuestionOne").val(),
                            secQuestionAnswer1: $("#secQuestionOneAnswer").val().toLowerCase(),
                            secQuestion2: $("#secQuestionTwo").val(),
                            secQuestionAnswer2: $("#secQuestionTwoAnswer").val().toLowerCase(),
                            secQuestion3: $("#secQuestionThree").val(),
                            secQuestionAnswer3: $("#secQuestionThreeAnswer").val().toLowerCase(),
                            taskrPhoto: $("#userPic").val(),
                            loggedIn: true
                        }

                            console.log(createUser)
                            //query taskrs for username and password and check if they match
                            $.ajax("/api/taskrs", {
                                type: "POST",
                                data: createUser
                            }).then(
                                function () {
                                    $("#modal1Body").empty();
                                        modal1.style.display = "block";
                                    $("#modal1Body").append(`
                                        <h4 class="text-center">Account successfully created! *</h4>
                                    `);
                                    setTimeout(() => {
                                        location.href = "/";}, 3000);
                                });


                                $("#userNameCreate").val("");
                                $("#userPasswordCreate").val("");
                                $("#userPasswordCreate2").val("");
                                $("#secQuestionOne").val("");
                                $("#secQuestionOneAnswer").val("");
                                $("#secQuestionTwo").val("");
                                $("#secQuestionTwoAnswer").val("");
                                $("#secQuestionThree").val("");
                                $("#secQuestionThreeAnswer").val("");
                                $("#userPic").val("");
                } else{
                        $("#modal1Body").empty();
                        modal1.style.display = "block";
                        $("#modal1Body").append(`
                            <h4 class="text-center">Passwords Do Not Match</h4>
                        `);
                            setTimeout(() => {
                        modal1.style.display = "none";
                        }, 3000)
                    }
            }  else{
                        $("#modal1Body").empty();
                        modal1.style.display = "block";
                        $("#modal1Body").append(`
                            <h4 class="text-center">Username is not Available</h4>
                        `);
                            setTimeout(() => {
                        modal1.style.display = "none";
                        }, 3000)
                    }

        }//if any boxes left empty
        else{
            $("#modal1Body").empty();
            modal1.style.display = "block";
            $("#modal1Body").append(`
                <h4 class="text-center">Please completely Fills out all the boxes mark with *</h4>
            `);
            setTimeout(() => {
                modal1.style.display = "none";
            }, 3000);
        }
    })

//End of create user account ========================================================================================================


// Start of create Task ========================================================================================================
    $("#taskSubmit").on("click", function(event) {
      event.preventDefault();


      if ($("#taskName").val() && $("#taskPrice").val() && $("#taskCategories").val() && $("#taskBody").val()&& $("#taskDayOfWeek").val()) {

                var taskCreate = {
                    title: $("#taskName").val(),
                    taskPhoto: $("#taskPic").val(),
                    price: $("#taskPrice").val(),
                    category: $("#taskCategories").val(),
                    body: $("#taskBody").val(),
                    dayofWeek: $("#taskDayOfWeek").val(),
                    TaskrId: sessionStorage.getItem("id"),
                    taskrName: sessionStorage.getItem("username"),
                };

            // }
            $("#taskName").val(""),
            $("#taskPic").val(""),
            $("#taskPrice").val(""),
            $("#taskCategories").val(""),
            $("#taskBody").val(""),
            $("#taskDayOfWeek").val(""),

        console.log(taskCreate);
        //query taskrs for username and password and check if they match
        $.ajax("/api/tasks", {
            type: "POST",
            data: taskCreate
            }).then(function(dbTaskr) {

            console.log(dbTaskr);

            $("#modal1Body").empty();
            modal1.style.display = "block";
            $("#modal1Body").append(`
                 <h4 class="text-center">Task Created!</h4>
            `);
            setTimeout(() => {
                location.href = "/home";
            }, 2000);
        });
      } else {
        //end of if statement
            $("#modal1Body").empty();
            modal1.style.display = "block";
            $("#modal1Body").append(`
                <h4 class="text-center">Please completely Fills out all the boxes mark with *</h4>
            `);
            setTimeout(() => {
              modal1.style.display = "none";
            }, 4000);
      }
    });
// End of create Post ========================================================================================================


// Delete Acct ========================================================================================================
    $("#deleteSubmit").on("click", function(event) {
      event.preventDefault();
        console.log("user delete");
            $("#modal1Body").empty();
                modal1.style.display = "block";
            $("#modal1Body").append(`
                    <div class="container">
                        <div class="jumbotron">
                            <h1 class="text-center">Delete Your Account</h1>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <h5>Warning: Clicking the "Confirm" Button below will delete your account and all associated Tasks. This account is final!</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class=" offset-md-4 col-md-2">
                                <button id="deleteConfirm" class="btn btn-primary">Submit</button>
                            </div>
                            <div class=" col-md-2">
                                <a class="btn btn-primary" href="/home">Cancel</a>
                            </div>
                        </div>
                    </div>
               `);
            });

    $("#myModal").on("click", "#deleteConfirm", function(event) {
     event.preventDefault();
      var id = sessionStorage.getItem("id");
      console.log(id);

            $.ajax("/api/tasks/delete/" + id, {
            type: "DELETE",
            }).then(function(dbTaskr) {
                deleteUser(id);
                setTimeout(() => {
                }, 4000);
            })


            function deleteUser(id){
                $.ajax("/api/taskrs/" + id, {
                type: "DELETE",
                }).then(function(dbTaskr) {
                    $("#modal1Body").empty();
                    modal1.style.display = "block";
                    $("#modal1Body").append(`
                        <h4 class="text-center">Account Delete</h4>
                    `);
                    setTimeout(() => {
                        location.href = "/";
                    }, 4000);
                });
            }


    });





// End of Delete ========================================================================================================

// Update Acct ========================================================================================================
let username = $("#usernameAccountSettings");
let password = $("#userPasswordUp1");
let password2 = $("#userPasswordUp2");
let secQuestion1 = $("#secQuestionOneUp");
let secQuestionAnswer1 = $("#secQA1");
let secQuestion2 = $("#secQuestionTwoUp");
let secQuestionAnswer2 = $("#secQA2");
let secQuestion3 = $("#secQuestionThreeUp");
let secQuestionAnswer3 = $("#secQA3");
let userPic = $("#userPic");
let id = $("#accountID");



$("#editAccountSubmit").on("click", function(event) {
      event.preventDefault();

      var id = sessionStorage.getItem("id");
      console.log(id);

      $.ajax("/api/taskrs1/" + id, {
        type: "GET",
        data: id
      }).then(function(dbTaskr) {
        console.log("LINE 25", dbTaskr);

        $("#modal1Body").empty();
        modal1.style.display = "block";
        $("#modal1Body").append(`
            <div class="container">
            <div id="accountID"></div>
                <div class="jumbotron">
                    <h1 class="text-center">Edit Your Account Settings</h1>
                </div>
                <div class="row">
                    <div class="offset-md-3 col-md-6">
                        <form>
                            <div class="form-group">
                                <label for="password">Password *</label>
                                <input id="userPasswordUp1" type="text" class="form-control text-center">
                                <small class="form-text text-muted">Must be at least 3 characters min</small>
                            </div>
                            <div class="form-group">
                                <label for="password">Password *</label>
                                <input id="userPasswordUp2" type="text" class="form-control text-center">
                                <small class="form-text text-muted">Must be at least 3 characters min</small>
                            </div>
                            <div class="form-group">
                                <label for="img">User Image (Not Required but Welcomed!)</label>
                                <input id="#userPic" type="text" class="form-control text-center" maxlength='500' >
                                <small class="form-text text-muted">Enter a Link to Your Profile Photo</small>
                            </div>
                            <div class="form-group">
                                <label for="secQuestionOne">Security Question 1 *</label>
                                <select class="form-control" id="secQuestionOneUp">
                                    <option>What is you mothers maiden name?</option>
                                    <option>Name of your childhood best friend?</option>
                                    <option>Make of your first car?</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="secQuestionOneAnswer">Security Question 1 Answer *</label>
                                <input id="secQA1" type="text" class="form-control text-center">
                            </div>
                            <div class="form-group">
                                <label for="secQuestionTwo">Security Question 2 *</label>
                                <select class="form-control" id="secQuestionTwoUp">
                                    <option>Name of your first pet?</option>
                                    <option>Name of your high school mascot?</option>
                                    <option>City of your birth?</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="secQuestionTwoAnswer">Security Question 2 Answer *</label>
                                <input id="secQA2" type="text" class="form-control text-center">
                            </div>
                            <div class="form-group">
                                <label for="secQuestionThree">Security Question 3 *</label>
                                <select class="form-control" id="secQuestionThreeUp">
                                    <option>What is your favorite color?</option>
                                    <option>Name of the street you grew up on?</option>
                                    <option>Apple or Samsung?</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="secQuestionThreeAnswer">Security Question 3 Answer *</label>
                                <input id="secQA3" type="text" class="form-control text-center">
                            </div>
                            <div class="form-group">
                                <label for="text"> * Indicates a Required Field</label>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class=" col-md-2">
                        <button id="accountUpdateSubmit" class="btn btn-primary">Submit</button>
                    </div>
                    <div class=" col-md-2">
                        <a class="btn btn-primary" href="/home">Cancel</a>
                    </div>
                </div>
            </div>
        `);


username = $("#usernameAccountSettings");
password = $("#userPasswordUp1");
password2 = $("#userPasswordUp2");
secQuestion1 = $("#secQuestionOneUp");
secQuestionAnswer1 = $("#secQA1");
secQuestion2 = $("#secQuestionTwoUp");
secQuestionAnswer2 = $("#secQA2");
secQuestion3 = $("#secQuestionThreeUp");
secQuestionAnswer3 = $("#secQA3");
userPic = $("#userPic");
id = $("#accountID");



        password.val(dbTaskr.password);
        password2.val(dbTaskr.password);
        secQuestion1.val(dbTaskr.secQuestion1);
        secQuestionAnswer1.val(dbTaskr.secQuestionAnswer1);
        secQuestion2.val(dbTaskr.secQuestion2);
        secQuestionAnswer2.val(dbTaskr.secQuestionAnswer2);
        secQuestion3.val(dbTaskr.secQuestion3);
        secQuestionAnswer3.val(dbTaskr.secQuestionAnswer3);
        userPic.val(dbTaskr.taskrPhoto);
        id.val(dbTaskr.id);
        username.val(dbTaskr.username);

      });

})


    $("#myModal").on("click", "#accountUpdateSubmit", function (event) {
        event.preventDefault();
        if ($("#userPasswordUp1").val() && $("#userPasswordUp2").val() && $("#secQA1").val() && $("#secQA2").val() && $("#secQA3").val() ) {

                if($("#userPasswordUp1").val() === $("#userPasswordUp2").val()){

                        var updateUser = {
                            username: $("#usernameAccountSettings").val(),
                            password: $("#userPasswordUp1").val(),
                            secQuestion1: $("#secQuestionOneUp").val(),
                            secQuestionAnswer1: $("#secQA1").val().toLowerCase(),
                            secQuestion2: $("#secQuestionTwoUp").val(),
                            secQuestionAnswer2: $("#secQA2").val().toLowerCase(),
                            secQuestion3: $("#secQuestionThreeUp").val(),
                            secQuestionAnswer3: $("#secQA3").val().toLowerCase(),
                            taskrPhoto: $("#userPic").val(),
                            id: $("#accountID").val(),
                            loggedIn: true
                        }

                            //query taskrs for username and password and check if they match
                            $.ajax("/api/updateAcct", {
                                type: "PUT",
                                data: updateUser
                            }).then(
                                function () {
                                    console.log("user updated");
                                        $("#modal1Body").empty();
                                            modal1.style.display = "block";
                                        $("#modal1Body").append(`
                                            <h4 class="text-center">Account Updated!</h4>
                                        `);
                                        setTimeout(() => {
                                            location.href = "/home";
                                        }, 3000);
                                     });
                            } else
                                $("#modal1Body").empty();
                                    modal1.style.display = "block";
                                $("#modal1Body").append(`
                                    <h4 class="text-center">Passwords Do Not Match!</h4>
                                `);
                                setTimeout(() => {
                                    modal1.style.display = "none";
                                }, 2000);

                     }//end of if statement
                    else{
                        $("#modal1Body").empty();
                            modal1.style.display = "block";
                        $("#modal1Body").append(`
                            <h4 class="text-center">Please Fill Out all Boxes</h4>
                        `);
                        setTimeout(() => {
                            modal1.style.display = "none";
                        }, 2000);
                    }
                })



// End of Update Acct ========================================================================================================

});
