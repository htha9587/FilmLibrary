/**
 * Version 0.8
 * Author: htha9587
 * 12-26-16
 */

fl.view.updateMovie = 
{
  setupUserInterface: function () 
  {
    var formEl = document.forms['Movie'],
        saveButton = formEl.commit,
        selectMovieEl = formEl.selectMovie;
    var key="", keys=[], movie=null, optionEl=null, i=0;
    //Loads all movie objects.
    Movie.loadAll();
    //Populates the selection list with movies.
    keys = Object.keys( Movie.instances);
    for (i=0; i < keys.length; i++) 
    {
      key = keys[i];
      movie = Movie.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = movie.title;
      optionEl.value = movie.movieId;
      selectMovieEl.add( optionEl, null);
    }
    //When a film is selected, populates the form with the movie data.
    selectMovieEl.addEventListener("change", function ()
    		{
        var movie=null, key = selectMovieEl.value;
        if (key) 
        {
          movie = Movie.instances[key];
          formEl.movieId.value = movie.movieId;
          formEl.title.value = movie.title;
          formEl.releaseDate.value = movie.releaseDate;
        } else 
        {
      	  formEl.movieId.value = "";
      	  formEl.title.value = "";
      	  formEl.releaseDate.value = "";
        }
    });
    saveButton.addEventListener("click", 
        fl.view.updateMovie.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function () 
    		{
        Movie.saveAll(); 
    });
  },
  //Saves session data.
  handleSaveButtonClickEvent: function ()
  {
    var formEl = document.forms['Movie'];
    var slots = { movieId: formEl.movieId.value, 
          title: formEl.title.value, 
          releaseDate: formEl.releaseDate.value
        };
    Movie.update( slots);
    formEl.reset();
  }
};