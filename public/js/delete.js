    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div id="modalBody"/>
      </div>
    </div>;


#myModal.modal
  .modal-content
    span.close ×
    #modalBody
  | ;




modal.style.display = "block";
$("#modalBody").append(`
                        <h5 class="text-center">Leave A Comment!</h5>
                        <div id="taskid1"></div>
                        <div class="row">
                            <div class="offset-md-3 col-md-6">
                                <form>
                                    <div class="form-group">
                                        <label for="Title">Enter your Comment</label>
                                        <input class="form-control" id="taskComment" maxlength="250" type="text" placeholder="John did a great job!...." />
                                        <small class="form-text text-muted">250 Character Max</small>
                                    </div>
                                </form>
                            </div>
                            <div class="offset-md-3 col-md-1">
                                <button class="btn btn-primary" id="addComment" type="submit">Submit</button>
                            </div>
                            <div class="col-md-1">
                                <a class="btn btn-primary" href="/home">Cancel</a>
                            </div>
                        </div>
                  `);




                    $("#modalBody").empty();
                    modal.style.display = "block";
                    $("#modalBody").append(`
                        <h4 class="text-center">Welcome!</h4>
                     `)
                      setTimeout(() => {
                         location.href = "/home";
                      }, 1000);
                                