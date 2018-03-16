

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
                        // location.href="/home";
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


 $.ajax("/api/tasks/" + sessionStorage.getItem("id"), {
   type: "GET",
   id: sessionStorage.getItem("id")
 }).then(function(dbTaskr) {
     console.log("HELLO")
            console.log(dbTaskr)
            var choiceArray = [];
            for (let i = 0; i < dbTaskr.length; i++) {
                let title = dbTaskr.title[i];
                let body = dbTaskr.body[i];
                let price = dbTaskr.price[i];
                let day = dbTaskr.dayofWeek[i];
                let category = dbTaskr.category[i];
                
                      
            }  
                  

 });

                          
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


// Start of create Post ========================================================================================================
    $("#taskSubmit").on("click", function(event) {
      event.preventDefault();
      if ($("#taskName").val() && $("#taskPrice").val() && $("#taskCategories").val() && $("#taskBody").val()&& $("#taskDayOfWeek").val()) {
        var taskCreate = {
            title: $("#taskName").val(),
            price: $("#taskPrice").val(),
            category: $("#taskCategories").val(),
            body: $("#taskBody").val(),
            dayofWeek: $("#taskDayOfWeek").val(),
            TaskrId: $("#taskrId").val(),
        };
            $("#taskName").val(""),
            $("#taskPrice").val(""),
            $("#taskCategories").val(""),
            $("#taskBody").val(""),
            $("#taskDayOfWeek").val(""),
            $("#taskrId").val(""),

        console.log(taskCreate);
        //query taskrs for username and password and check if they match
        $.ajax("/api/tasks", {
            type: "POST",
            data: taskCreate
            }).then(function(dbTaskr) {
            console.log(dbTaskr);
          // Reload the page to get the updated list
          //   location.href = "/home/:id";
        });
      } else {
        //end of if statement
            alert("Fill out all the boxes.");
      }
    });
// End of create Post ========================================================================================================



});
