
/**
 * Version 0.8
 * Author: htha9587
 * 12-26-16
 */
 fl.view.listMovies = 
 {
  setupUserInterface: function () 
  {
    var tableBodyEl = document.querySelector("table#movies>tbody");
    var keys=[], key="", row={}, i=0;
    //Loads all movie objects.
    Movie.loadAll();
    keys = Object.keys( Movie.instances);
    //For each movie, creates a table row with a cell for each attribute.
    for (i=0; i < keys.length; i++) 
    {
      key = keys[i];
      row = tableBodyEl.insertRow();
      row.insertCell(-1).textContent = Movie.instances[key].movieId;      
      row.insertCell(-1).textContent = Movie.instances[key].title;  
      row.insertCell(-1).textContent = Movie.instances[key].releaseDate;
    }
  }
};