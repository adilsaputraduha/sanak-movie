function search(){
    $('#movie-list').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'e38cf479',
            's' : $('#search-input').val()
        },
        success: function(result) {
            if (result.Response == "True") {
                let movies = result.Search;
                $.each(movies, function(i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="${data.Poster}" class="card-img-top">
                            <div class="card-body">
                                <h6 class="card-title">${data.Title}</h6>
                                <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                <a href="#" class="btn btn-success see-detail" data-bs-toggle="modal" 
                                data-bs-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                            </div>
                        </div> 
                    </div>
                    `);
                });
                $('#search-input').val('');
            }else{
                $('#movie-list').html(`
                <h5 class="text-center"> ${result.Error} :(</h5>
                `)
            }
        }
    });
}

$('#search-button').on('click', function() {
    search();
});

$('#search-input').on('keyup', function(e) {
    if(e.keyCode === 13){
        search();
    }
});

$('#movie-list').on('click', '.see-detail', function(){
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'e38cf479',
            'i' : $(this).data('id')
        },
        success: function(movie) {
            if (movie.Response == "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${movie.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h6>${movie.Title}</h6></li>
                                    <li class="list-group-item">Released : ${movie.Released}</li>
                                    <li class="list-group-item">Genre : ${movie.Genre}</li>
                                    <li class="list-group-item">Director : ${movie.Director}</li>
                                    <li class="list-group-item">Actors : ${movie.Actors}</li>
                                </ul>
                            </div>
                        </div
                    </div>
                `);
            }else{

            }
        }
    })
});