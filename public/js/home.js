
$(document).ready(function () {

  //Start of user login ========================================================================================================

    $("#loginSubmit").on("click", function(event){
        event.preventDefault();
        if($("#username").val() && $("#userPassword").val()){
            var submittedPassword = $("#userPassword").val()

            var username = $("#username").val();
            console.log(username);


        //query taskrs for username and password and check if they match
            $.ajax("/api/taskrs/"+ username, {
                type: "GET",
                data: username
            }).then(function(dbTaskr) {
                    console.log(dbTaskr);
                    console.log("My password is" + dbTaskr.password);
                    var dbPassword = dbTaskr.password;
                    var userDbID = dbTaskr.id;

                    if (submittedPassword === dbPassword){
                        alert("YES")
                    }else
                    alert("NO")
                    // Reload the page to get the updated list
                    // location.href="/home";
                });
        }
        //end of if statement
    })

//End of user login ========================================================================================================





//Start of create user account ========================================================================================================
    $("#signupSubmit").on("click", function (event) {
        event.preventDefault();
        if ($("#userNameCreate").val() && $("#userPasswordCreate").val()
            && $("#secQuestionOneAnswer").val() && $("#secQuestionTwoAnswer").val() && $("#secQuestionThreeAnswer").val() ) {

                var createUser = {
                username: $("#userNameCreate").val(),
                password: $("#userPasswordCreate").val(),
                secQuestionOne: $("#secQuestionOne").val(),
                secQuestionOneAnswer: $("#secQuestionOneAnswer").val(),
                secQuestionTwo: $("#secQuestionTwo").val(),
                secQuestionTwoAnswer: $("#secQuestionTwoAnswer").val(),
                secQuestionThree: $("#secQuestionThree").val(),
                secQuestionThreeAnswer: $("#secQuestionThreeAnswer").val(),
                loggedIn: true
            }
            console.log(createUser)
            //query taskrs for username and password and check if they match
            $.ajax("/api/taskrs", {
                type: "POST",
                data: createUser
            }).then(
                function () {
                    console.log("user created");
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
