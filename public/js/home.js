$(document).ready(function () {


  //Start of user login ========================================================================================================

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
                    console.log("LINE 25" + dbTaskr);
                    console.log("My password is" + dbTaskr.password);
                    var dbPassword = dbTaskr.password;
                    var userDbID = dbTaskr.id;

                // Store username and password to sessionStorage
                    sessionStorage.setItem("username", dbTaskr.username);
                    sessionStorage.setItem("id", dbTaskr.id);

                    if (submittedPassword === dbPassword){
                        alert("User successfully confirmed")
                        //Redirect to Homepage
                        location.href="/home";
                        // $("#userName").append("Hello " + sessionStorage.getItem("username"));
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
                        });

                    }else
                    alert("Username or Password is incorrect")
                    // Reload the page to get the updated list
                });
        }else
            alert("Please enter a Username and Password")
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
                console.log("LINE 110 LOGOUT " + dbTaskr);
                alert("Goodbye")
                sessionStorage.clear();
            // Redirect to Login Page
            location.href="/";
            });
    })
//End of Logout ========================================================================================================




//Start of create user account ========================================================================================================
    $("#signupSubmit").on("click", function (event) {
        event.preventDefault();
        if ($("#userNameCreate").val() && $("#userPasswordCreate").val() && $("#userPasswordCreate2").val()
            && $("#secQuestionOneAnswer").val() && $("#secQuestionTwoAnswer").val() && $("#secQuestionThreeAnswer").val() ) {

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
                    }else
                        alert("Passwords do not match")

                $("#userNameCreate").val(""),
                $("#userPasswordCreate").val(""),
                $("#userPasswordCreate2").val(""),
                $("#secQuestionOne").val(""),
                $("#secQuestionOneAnswer").val(""),
                $("#secQuestionTwo").val(""),
                $("#secQuestionTwoAnswer").val(""),
                $("#secQuestionThree").val(""),
                $("#secQuestionThreeAnswer").val(""),
                $("#userPic").val(""),

            console.log(createUser)
            //query taskrs for username and password and check if they match
            $.ajax("/api/taskrs", {
                type: "POST",
                data: createUser
            }).then(
                function () {
                    console.log("user created");
                    alert("User Created")
                    // Reload the page to get the updated list
                    location.href = "/";
                }
            );
        }
        //end of if statement
        else{
            alert("Fill out all the boxes.")
        }
    })

//End of create user account ========================================================================================================


// Start of create Task ========================================================================================================
    $("#taskSubmit").on("click", function(event) {
      event.preventDefault();

      var tempPhoto = $("#taskPic");
      var tempPhotoLink = "http://live105.ca/wp-content/uploads/2017/12/stewie_at_work.jpg";


    if ($("#taskPic").val() === null){
            tempPhoto.val(tempPhotoLink)
        } else if ($("#taskPic").val() !== null) {
            tempPhoto.val($("#taskPic").val())
        }

      if ($("#taskName").val() && $("#taskPrice").val() && $("#taskCategories").val() && $("#taskBody").val()&& $("#taskDayOfWeek").val()) {
          

            // if ($("#taskPic").val() = "") {
            //     $("#taskPic").val("http://live105.ca/wp-content/uploads/2017/12/stewie_at_work.jpg");
        
        
                var taskCreate = {
                    title: $("#taskName").val(),
                    taskPhoto: tempPhoto,
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
          // Reload the page to get the updated list
            // location.href = "/home";
        });
      } else {
        //end of if statement
            alert("Fill out all the boxes.");
      }
    });
// End of create Post ========================================================================================================


// Delete Acct ========================================================================================================
    $("#deleteSubmit").on("click", function(event) {
      event.preventDefault();
      modal1.style.display = "block";
    });

    $("#deleteConfirm").on("click", function(event) {
      event.preventDefault();
      var id = sessionStorage.getItem("id");
      console.log(id);
        $.ajax("/api/taskrs/" + id, {
          type: "DELETE",
        }).then(function(dbTaskr) {
          location.href = "/";
        });
    });


        // Get the modal
        var modal1 = document.getElementById('deleteModal');
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks on <span> (x), close the modal
        $("#deleteCancel").onclick = function() {
          modal.style.display = "none";
        };
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
                
// End of Delete ========================================================================================================

// Update Acct ========================================================================================================
    $("#editAccountSubmit").on("click", function(event) {
      event.preventDefault();
      modal.style.display = "block";
      var id = sessionStorage.getItem("id");
      console.log(id);
      
            $.ajax("/api/taskrs1/" + id, {
              type: "GET",
              data: id
            }).then(function(dbTaskr) {
              console.log("LINE 25", dbTaskr);

              let username = $("#usernameAccountSettings");
              let password = $("#userPasswordUp1");
              let password2 = $("#userPasswordUp2");
              let secQuestion1 = $("#secQuestionOneUp");
              let secQuestionAnswer1 = $("#secQuestionOneAnswerUp");
              let secQuestion2 = $("#secQuestionTwoUp");
              let secQuestionAnswer2 = $("#secQuestionTwoAnswerUp");
              let secQuestion3 = $("#secQuestionThreeUp");
              let secQuestionAnswer3 = $("#secQuestionThreeAnswerUp");
              let userPic = $("#userPic");
              let id = $("#accountID");
            
              password.val(dbTaskr.password);
              password2.val(dbTaskr.password);
              secQuestion1.val(dbTaskr.secQuestion1);
              secQuestionAnswer1.val(dbTaskr.secQuestionAnswer1);
              secQuestion2.val(dbTaskr.secQuestion2);
              secQuestionAnswer2.val(dbTaskr.secQuestionAnswer2);
              secQuestion3.val(dbTaskr.secQuestion3);
              secQuestionAnswer3.val(dbTaskr.secQuestionAnswer3);
              userPic.val(dbTaskr.taskrPhoto)
              id.val(dbTaskr.id);
              username.val(dbTaskr.username);     
            }); 
      })




    $("#accountUpdateSubmit").on("click", function (event) {
        event.preventDefault();
        if ($("#userPasswordUp1").val() && $("#userPasswordUp2").val()
            && $("#secQuestionOneAnswerUp").val() && $("#secQuestionTwoAnswerUp").val() && $("#secQuestionThreeAnswerUp").val() ) {

                if($("#userPasswordUp1").val() === $("#userPasswordUp2").val()){

                    var updateUser = {
                        username: $("#usernameAccountSettings").val(),
                        password: $("#userPasswordUp1").val(),
                        secQuestion1: $("#secQuestionOneUp").val(),
                        secQuestionAnswer1: $("#secQuestionOneAnswerUp").val().toLowerCase(),
                        secQuestion2: $("#secQuestionTwoUp").val(),
                        secQuestionAnswer2: $("#secQuestionTwoAnswerUp").val().toLowerCase(),
                        secQuestion3: $("#secQuestionThreeUp").val(),
                        secQuestionAnswer3: $("#secQuestionThreeAnswerUp").val().toLowerCase(),
                        taskrPhoto: $("#userPic").val(),
                        id: $("#accountID").val(),
                        loggedIn: true
                    }
                    }else
                        alert("Passwords do not match")

            console.log(updateUser)
            //query taskrs for username and password and check if they match
            $.ajax("/api/updateAcct", {
                type: "PUT",
                data: updateUser
            }).then(
                function () {
                    console.log("user updated");
                    // modal.style.display = "none";
                    // // confirmModal.style.display = "block";
                    // $("#bbb").append(`
                    //     <div class="modal-content">
                    //         <span class="close">&times;</span>
                    //         <p>Account Updated.</p>
                    //     </div>
                    // `);

                    // Reload the page to get the updated list
                    location.href = "/home";
                }
            );
        }
        //end of if statement
        else{
            alert("Fill out all the boxes.")
        } 
    })    


            // Get the modal
        var modal = document.getElementById('accountUpdateModal');
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks on <span> (x), close the modal
        $("#updateCancel").onclick = function() {
          modal.style.display = "none";
        };
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        // var confirmModal = document.getElementById("updateSuccess");
        // // Get the <span> element that closes the modal
        // var span = document.getElementsByClassName("close")[0];
        // // When the user clicks on <span> (x), close the modal
        // $("#updateCancel").onclick = function() {
        //   confirmModal.style.display = "none";
        // };
        // // When the user clicks anywhere outside of the modal, close it
        // window.onclick = function(event) {
        //     if (event.target == modal) {
        //         confirmModal.style.display = "none";
        //     }
        // }

        
// End of Update Acct ========================================================================================================

});






                    // $("#modalBody").empty();
                    // modal.style.display = "block";
                    // $("#modalBody").append(`
                    //     <h4 class="text-center">Task Unbooked! Thanks</h4>
                    //  `)
                    // setTimeout(() => {
                    //     location.href = "/home";
                    // }, 3000); 