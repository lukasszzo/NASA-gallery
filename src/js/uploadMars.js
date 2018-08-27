let marsURL = 'https://api.nasa.gov/planetary/apod?api_key=J0MCwnniX5tD5Hd0fymDwHTwztHBtyMYfx18aqvR'

let $mainMars = $(".main-content");

function insertMars(photos) {
    $.each(photos, function(indexPhoto, photo) {
        $mainMars.css({background: "#000000 url(" + photo.hdurl + ") no-repeat fixed center"});
    });
}

function uploadMars() {
    $.ajax({
        url: marsURL,
        type: "GET",
        dataType: "json"
    }).done(function(response) {
        insertMars([response]);
    }).fail(function(error) {
        console.log(error);
    })
}

export {uploadMars}
