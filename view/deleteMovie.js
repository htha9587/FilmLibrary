/**
 * Version 0.8
 * Author: htha9587
 * 12-26-16
 */

fl.view.deleteMovie = 
{
  setupUserInterface: function () 
  {
    var deleteButton = document.forms['Movie'].commit;
    var selectEl = document.forms['Movie'].selectMovie;
    var key="", keys=[], movie=null, optionEl=null, i=0;
    //Loads all book objects.
   Movie.loadAll();
    keys = Object.keys( Movie.instances);
    //Populates the selection list with movies.
    for (i=0; i < keys.length; i++) 
    {
      key = keys[i];
      movie = Movie.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = movie.title;
      optionEl.value = movie.movieId;
      selectEl.add( optionEl, null);
    }
    deleteButton.addEventListener("click", 
        fl.view.deleteMovie.handleDeleteButtonClickEvent);
    window.addEventListener("beforeunload", function ()
    		{
       Movie.saveAll(); 
    });
  },
  //Event handler for deleting a movie.
  handleDeleteButtonClickEvent: function () 
  {
    var selectEl = document.forms['Movie'].selectMovie;
    var movieId = selectEl.value;
    if (movieId) {
      Movie.destroy( movieId);
      //Removes deleted movie from select options.
      selectEl.remove( selectEl.selectedIndex);
    }
  }
};