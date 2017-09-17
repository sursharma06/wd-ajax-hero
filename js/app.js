(function () {
  'use strict';

  var movies = [];

  const renderMovies = function () {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title,
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`,
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    var searchTerm = document.querySelector('#search').value;
    if (searchTerm != '') {
      $.get('https://omdb-api.now.sh/?s=' + searchTerm, function (data) {
        for (var i = 0; i < data.Search.length; i++) {
          var movie = {};
          movie.title = data.Search[i].Title;
          movie.poster = data.Search[i].Poster;
          movie.id = data.Search[i].id;
          movie.year = data.Search[i].year;
          //console.log(data.Search[i]);
          movies.push(movie);
          console.log(movies);
        }

        renderMovies();
      });
    }
  });
})();







//     document.querySelector('form').addEventListener('submit', function (event) {
//         event.preventDefault();
//         var searchTerm = document.querySelector('#search').value;
//         if (searchTerm != '') {
//           document.querySelector('#search').value = '';
//           $.get('https://omdb-api.now.sh/?s=' + searchTerm, function (data) {
//             console.log(data.Search[0]);
//           });
//         // var searchTerm = document.querySelector('#search').value;
//         // //console.log("you clicked the button");
//         // $.get('https://omdb-api.now.sh/?s=' + searchTerm, function (data) {
//         //   console.log(data);
//         //   var movie = {};
//         //   for (var i = 0; i < data.Search.length; i++) {
//         //     console.log(data.Search[i]);
//         //
//         //     //document.querySelector('img').src = data.Search[i].Poster;
//       //     //document.querySelector('body').append(data.Search[i].Poster);
//       //     renderMovies();}
//       };
//     })();
//
// // $.get('https://omdb-api.now.sh/?t=rambo', function (data) {
// //   console.log(data);
// // });
