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
                        <div class="card mb-4" style="width: 18rem;">
                            <img src="${data.Poster}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${data.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                <a href="#" class="btn btn-primary" data-bs-toggle="modal" 
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