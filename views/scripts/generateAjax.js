$(document).ready(function () {
    $(".addcitizen").click(function () {
       $.post("/addcitizen",
          {
             townid: this.id,
            
          }
          );
    });
 });