/**
 * Version 0.4
 * Author: htha9587
 * 12-23-16
 */

//Constructor.
function Movie( slots) 
{
  this.movieId = slots.movieId;
  this.title = slots.title;
  this.releaseDate = slots.releaseDate;
};

Movie.instances = {};  //Initially an empty associative array.

//Converts row to object.
Movie.convertRow2Obj = function (movieRow) 
{
  var movie = new Movie( movieRow);
  return movie;
};

//Loads the film table from Local Storage.
Movie.loadAll = function () 
{
  var key="", keys=[], movieString="", movies={}, i=0;  
  try 
  {
    if (localStorage.getItem("Films")) 
    {
      movieString = localStorage.getItem("Films");
    }
  } catch (e) 
  {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (movieString) {
    movies = JSON.parse( movieString);
    keys = Object.keys( movies);
    console.log( keys.length +" Films loaded.");
    for (i=0; i < keys.length; i++) 
    {
      key = keys[i];
      Book.instances[key] = Book.convertRow2Obj( books[key]);
    }
  }
};

//  Saves all movie objects to Local Storage.
Movie.saveAll = function ()
{
  var movieString="", error=false,
      nmrOfMovies = Object.keys( Movie.instances).length;  
  try 
  {
   movieString = JSON.stringify( Movie.instances);
    localStorage.setItem("Films", movieString);
  } catch (e) 
  {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfMovies + " Films saved.");
};

//Creates a new film row.
Movie.create = function (slots) 
{
  var movie = new Movie( slots);
  Movie.instances[slots.movieId] = movie;
  console.log("Movie " + slots.movieId + " created!");
};

//Updates an existing film row.
Book.update = function (slots)
{
  var movie = Movie.instances[slots.movieId];
  var releaseDate = parseInt( slots.releaseDate);
  if (movie.title !== slots.title) { movie.title = slots.title;}
  if (movie.releaseDate !== slots.releaseDate) { movie.releaseDate = releaseDate;}
  console.log("Movie " + slots.movieId + " modified!");
};

//Deletes a film row from persistent storage.
Movie.destroy = function (movieId) 
{
  if (Movie.instances[movieId]) 
  {
    console.log("Movie " + movieId + " deleted");
    delete Movie.instances[movieId];
  } else {
    console.log("There is no film with that ID " + movieId + " in the database!");
  }
};

//Creates and saves test data
Movie.createTestData = function () 
{
  Movie.instances["006251587X"] = new Movie({movieId:"006251587X", title:"Interstellar", releaseDate:2014});
  Movie.instances["0465026567"] = new Movie({movieId:"0465026567", title:"Arrival", releaseDate:2016});
  Movie.instances["0465030793"] = new Movie({movieId:"0465030793", title:"Alien", releaseDate:1979});
  Movie.saveAll();
};

//Clears data.
Movie.clearData = function () 
{
  if (confirm("Do you really want to delete all film data?")) 
  {
    Movie.instances = {};
    localStorage.setItem("Films", "{}");
  }
};