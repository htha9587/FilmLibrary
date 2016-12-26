
/**
 * Version 0.9
 * Author: htha9587
 * 12-26-16
 */

fl.view.createMovie = 
{
  setupUserInterface: function () 
  {
    var saveButton = document.forms['Movie'].commit;
    //Loads all movie objects.
   Movie.loadAll();
    //Sets an event handler for the save/submit button.
    saveButton.addEventListener("click", 
        fl.view.createMovie.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function () 
    		{
        Movie.saveAll(); 
    });
  },
  //Saves user input data.
  handleSaveButtonClickEvent: function () 
  {
    var formEl = document.forms['Movie'];
    var slots = { movieId: formEl.movieId.value, 
        title: formEl.title.value, 
        releaseDate: formEl.releaseDate.value};
    Movie.create( slots);
    formEl.reset();
  }
};