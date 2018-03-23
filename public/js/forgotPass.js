$(document).ready(function () {

// Start of Forgot Password ========================================================================================================
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

//STEP 1.  Getting the username and checking DB
    $("#forgotPassSubmit").on("click", function(event) {
      event.preventDefault();

        if ($("#usernameForgotPass").val().length>0) {

          var usernameEntered = $("#usernameForgotPass").val().toLowerCase();
          console.log(usernameEntered);


          //query taskrs for username and password and check if they match
          $.ajax("/api/taskrs/" + usernameEntered, {
            type: "GET",
            data: usernameEntered
          }).then(function(dbTaskr) {
            console.log(dbTaskr);

//STEP 2.  Respond is sent back after user name is verified and now user security questions and answers are
// pulled from the users account in the database
            if (dbTaskr == null) {
                $("#modal1Body").empty();
                    modal1.style.display = "block";
                    $("#modal1Body").append(`
                        <div class="text-center modal-content-head-img-bottom-space2">
                            <img class="model-content-head-img" src="images/taskr.png" alt="">
                        </div>
                        <h4 class="text-center">No account by that username exists</h4>
                    `);
                    setTimeout(() => {
                        modal1.style.display = "none";
                    }, 4000)
            } else {
              $("#forgotPassSubmit").hide();
              $("#cancelBtn").hide();

              var secQues1 = dbTaskr.secQuestion1;
              var secQues2 = dbTaskr.secQuestion2;
              var secQues3 = dbTaskr.secQuestion3;
              var secQuesAns1 = dbTaskr.secQuestionAnswer1;
              var secQuesAns2 = dbTaskr.secQuestionAnswer2;
              var secQuesAns3 = dbTaskr.secQuestionAnswer3;
              var userId = dbTaskr.id;
//STEP 3.  Append Security Questions and answers to page  
              $("#secQuesInputs").empty()                        
              $("#secQuesInputs").append(`        
                    <div class="row">
                        <div class="offset-md-3 col-md-6 bgwhite createPostModelSettings">
                            <h6 class="text-center">
                            ${secQues1}
                            </h6>
                            <form>
                                <div class="form-group">
                                    <input type="name" class="form-control text-center" id="secQuestAnswer1"  placeholder="Enter Your Answer">
                                </div>
                            </form>
                        </div>
                        <div class="offset-md-3 col-md-6 bgwhite createPostModelSettings">
                            <h6 class="text-center">
                            ${secQues2}
                            </h6>
                            <form>
                                <div class="form-group">
                                    <input type="name" class="form-control text-center" id="secQuestAnswer2" placeholder="Enter Your Answer">
                                </div>
                            </form>
                        </div>
                        <div class="offset-md-3 col-md-6 bgwhite createPostModelSettings">
                            <h6 class="text-center">
                            ${secQues3}
                            </h6>
                            <form>
                                <div class="form-group">
                                    <input type="name" class="form-control text-center" id="secQuestAnswer3" placeholder="Enter Your Answer">
                                </div>
                            </form>
                        </div> 
                        <div class="offset-md-3 col-md-3 bgwhite createPostModelSettings">
                            <button id="forgotPassSubmit1" class="btn btn-primary">Submit</button>
                        </div>
                        <div class="col-md-3 bgwhite createPostModelSettings">
                                <a id="cancelBtn1" class="btn btn-primary" href="/">Cancel</a>
                        </div>
                    </div>
                `);


                
//STEP 4.  Gathering users entered answers and comparing them to the security questions answers

                $("#forgotPassSubmit1").on("click", function(event) {
                    event.preventDefault();

                    var userSecAns1 = $("#secQuestAnswer1").val().trim().toLowerCase();
                    var userSecAns2 = $("#secQuestAnswer2").val().trim().toLowerCase();    
                    var userSecAns3 = $("#secQuestAnswer3").val().trim().toLowerCase();
                    
                    if (userSecAns1 === secQuesAns1 && userSecAns2 === secQuesAns2 && userSecAns3 === secQuesAns3) {
                      //STEP 5.  If answers match append input boxes to enter new password and confirm password.

                      $("#forgotPassSubmit1").hide();
                      $("#cancelBtn1").hide();
                      $("#passwordInputs").empty();  
                      $("#passwordInputs").append(`        
                            <div class="row">
                                <div class="offset-md-3 col-md-6 bgwhite createPostModelSettings">
                                    <form>
                                        <div class="form-group">
                                            <input type="name" class="form-control text-center" id="passUpdate1"  placeholder="Enter Your New Password">
                                        </div>
                                    </form>
                                </div>
                                <div class="offset-md-3 col-md-6 bgwhite createPostModelSettings">
                                    <form>
                                        <div class="form-group">
                                            <input type="name" class="form-control text-center" id="passUpdate2" placeholder="Confirm Your New Password">
                                        </div>
                                    </form>
                                </div>
                                <div class="offset-md-3 col-md-3 bgwhite createPostModelSettings">
                                    <button id="forgotPassSubmit2" class="btn btn-primary">Submit</button>
                                </div>
                                <div class="col-md-3 bgwhite createPostModelSettings">
                                <a id="cancelBtn2" class="btn btn-primary" href="/">Cancel</a>
                                </div>
                            </div>
                        `);

                      //STEP 6.  After users enters passwords.  Checking to see if the match.  If they matching up User Id with the new password.

                      $("#forgotPassSubmit2").on("click",
                        function(event) {
                          event.preventDefault();
                          var newPass1 = $("#passUpdate1").val().trim();
                          var newPass2 = $("#passUpdate2").val().trim();

                          if (newPass1 === newPass2) {
                            var newUserPassword = {
                              password: newPass1,
                              id: userId
                            };
                            $.ajax("/api/update/password", {
                              type: "PUT",
                              data: newUserPassword
                            }).then(function(dbTaskr) {
                              console.log(dbTaskr);
                              $("#modal1Body").empty();
                              modal1.style.display ="block";
                            $("#modal1Body").append(`
                                <div class="text-center modal-content-head-img-bottom-space2">
                                    <img class="model-content-head-img" src="images/taskr.png" alt="">
                                </div>
                                    <h4 class="text-center">Password Successfully Changed!</h4>
                                    <h4 class="text-center">Please login with your new password!</h4>
                                `);
                              setTimeout(() => {
                                location.href = "/";
                              }, 4000);

                              //STEP 7. Clear out input boxes values

                              $("#usernameForgotPass").val( "");
                              $("#secQuestAnswer1").val("");
                              $("#secQuestAnswer2").val("");
                              $("#secQuestAnswer3").val("");
                              $("#passUpdate1").val("");
                              $("#passUpdate2").val("");
                            });
                          } else $("#modal1Body").empty();
                          modal1.style.display = "block";
                            $("#modal1Body").append(`
                                <div class="text-center modal-content-head-img-bottom-space2">
                                    <img class="model-content-head-img" src="images/taskr.png" alt="">
                                </div>
                                    <h4 class="text-center">Your Passwords do not match</h4>
                                `);
                          setTimeout(() => {
                            $("#modal1Body").empty();
                            modal1.style.display = "none";
                          }, 4000);
                        }
                      );
                    } else{// if security questions answers don't match
                        $("#modal1Body").empty();
                        modal1.style.display = "block";
                        $("#modal1Body").append(`
                            <div class="text-center modal-content-head-img-bottom-space2">
                                <img class="model-content-head-img" src="images/taskr.png" alt="">
                            </div>
                                <h4 class="text-center">The Security Question Answers entered do not</h4>
                                <h4 class="text-center">match the previous Security Question Answers</h4>
                            `);
                        setTimeout(() => {
                        $("#modal1Body").empty();
                        modal1.style.display = "none";
                        $("#modal1Body").empty();
                        }, 4000);
                    }
                });
            }    
          });
        }else{
            // if no username is entered into the field.
             $("#modal1Body").empty();
            $("#modal1Body").append(`
                <div class="text-center modal-content-head-img-bottom-space2">
                    <img class="model-content-head-img" src="images/taskr.png" alt="">
                </div>
                <h4 class="text-center">Please enter a Username</h4>
            `);
            setTimeout(() => {
                modal1.style.display = "none";
            }, 4000);
        }
    });
})
// End of Forgot Password ========================================================================================================
