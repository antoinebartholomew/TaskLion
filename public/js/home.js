
$(document).ready(function () {

    // #username
    // #userPassword
    // #loginSubmit

    // $("#loginSubmit").on("click", function(event){
    //     event.preventDefault();
    //     if($("#username").val() && $("#userPassword").val()){              
    //         var checkUser = {
    //             username = $("#username").val(),
    //             password = $("#userPassword").val()
    //         }
    //     //query taskrs for username and password and check if they match
    //         $.ajax("/api/users", {
    //             type: "GET",
    //             data: checkUser
    //         }).then(
    //             function () {
    //                 console.log("user passed");
    //                 // Reload the page to get the updated list
    //                 location.href="/home";
    //             }
    //         );
    //     }
    //     //end of if statement

    // })






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
                loggedIn: false 
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
                    location.href = "/home";
                }
            );
        }
        //end of if statement
        else{
            alert("Fill out all the boxes.")
        }
    })

//End of create user account ========================================================================================================

























});