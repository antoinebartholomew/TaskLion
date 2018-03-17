

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





//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&                        


//  $.ajax("/api/tasks/" + sessionStorage.getItem("id"), {
//    type: "GET",
//    id: sessionStorage.getItem("id")
//  }).then(function(dbTaskr) {
//    console.log(dbTaskr);
//    var tasksArray = [];
//    var in_progressArray = [];
//    var completedArray = [];
//    for (let i = 0; i < dbTaskr.length; i++) {
//      if (dbTaskr[i].taskrAccept == false && dbTaskr[i].requesterAccept == false && dbTaskr[i].taskrMarkComplete == false && dbTaskr[i].requesterMarkComplete == false) {
//        tasksArray.push(dbTaskr[i]);
//      } else if (dbTaskr[i].taskrAccept == true && dbTaskr[i].requesterAccept == true && dbTaskr[i].taskrMarkComplete == false && dbTaskr[i].requesterMarkComplete == false) {
//        in_progressArray.push(dbTaskr[i]);
//      } else if (dbTaskr[i].taskrAccept == true && dbTaskr[i].requesterAccept == true && dbTaskr[i].taskrMarkComplete == true && dbTaskr[i].requesterMarkComplete == true) {
//        completedArray.push(dbTaskr[i]);
//      }
//    }
//    for (let i = 0; i < tasksArray[i].length; i++) {
//      let title = tasksArray[i].title;
//      let body = tasksArray[i].body;
//      let price = tasksArray[i].price;
//      let dow = tasksArray[i].dayofWeek;
//      let cat = tasksArray[i].category;
//      $("#userPostedTask").append(`
//             <div class="row">
//                 <div class="col-md-2">
//                     <h6>Task:</h6>
//                         <p>${title}</p>
//                     </div>
//                     <div class="col-md-2">
//                         <h6>Description:</h6> 
//                         <p>${body}</p>           
//                     </div>
//                     <div class="col-md-2">
//                         <h6>$$ Price:</h6> 
//                         <p>${price}</p>           
//                     </div>
//                     <div class="col-md-2">
//                         <h6>Day of Week:</h6> 
//                         <p>${dow}</p>           
//                     </div>
//                     <div class="col-md-2">
//                         <h6>Category:</h6> 
//                         <p>${cat}</p>           
//                 </div>
//             </div>
//         `);
//    }
//    for (let i = 0; i < in_progressArray.length; i++) {
//      let title = in_progressArray[i].title;
//      let body = in_progressArray[i].body;
//      let price = in_progressArray[i].price;
//      let dow = in_progressArray[i].dayofWeek;
//      let cat = in_progressArray[i].category;
//      $("#userPendingTask").append(`
//             <div class="row">
//                 <div class="col-md-2">
//                     <h6>Task:</h6>
//                         <p>${title}</p>
//                     </div>
//                     <div class="col-md-2">
//                         <h6>Description:</h6> 
//                         <p>${body}</p>           
//                     </div>
//                     <div class="col-md-2">
//                         <h6>$$ Price:</h6> 
//                         <p>${price}</p>           
//                     </div>
//                     <div class="col-md-2">
//                         <h6>Day of Week:</h6> 
//                         <p>${dow}</p>           
//                     </div>
//                     <div class="col-md-2">
//                         <h6>Category:</h6> 
//                         <p>${cat}</p>           
//                 </div>
//             </div>
//             `);
//    }
//    for (let i = 0; i < completedArray.length; i++) {
//      let title = completedArray[i].title;
//      let body = completedArray[i].body;
//      let price = completedArray[i].price;
//      let dow = completedArray[i].dayofWeek;
//      let cat = completedArray[i].category;
//      $("#userCompletedTask").append(`
//             <div class="row">
//                 <div class="col-md-2">
//                     <h6>Task:</h6>
//                         <p>${title}</p>
//                     </div>
//                     <div class="col-md-2">
//                         <h6>Description:</h6> 
//                         <p>${body}</p>           
//                     </div>
//                     <div class="col-md-2">
//                         <h6>$$ Price:</h6> 
//                         <p>${price}</p>           
//                     </div>
//                     <div class="col-md-2">
//                         <h6>Day of Week:</h6> 
//                         <p>${dow}</p>           
//                     </div>
//                     <div class="col-md-2">
//                         <h6>Category:</h6> 
//                         <p>${cat}</p>           
//                 </div>
//             </div>
//             `);
//    }
//    console.log(tasksArray);
//    console.log(in_progressArray);
//    console.log(completedArray);
//  });
                          
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   





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
                    // location.href = "/home/:id";
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
      if ($("#taskName").val() && $("#taskPrice").val() && $("#taskCategories").val() && $("#taskBody").val()&& $("#taskDayOfWeek").val()) {
        var taskCreate = {
            title: $("#taskName").val(),
            price: $("#taskPrice").val(),
            category: $("#taskCategories").val(),
            body: $("#taskBody").val(),
            dayofWeek: $("#taskDayOfWeek").val(),
            TaskrId: sessionStorage.getItem("id"),
        };
            $("#taskName").val(""),
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
            location.href = "/home";
        });
      } else {
        //end of if statement
            alert("Fill out all the boxes.");
      }
    });
// End of create Post ========================================================================================================

});











