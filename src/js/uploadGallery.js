function uploadGallery(){

    let nasaAPI = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=55&api_key=J0MCwnniX5tD5Hd0fymDwHTwztHBtyMYfx18aqvR'

    var lastImage = 0;
    let gallery = $('#images-container')

    function insertMarsPhotos(images) {

        var buttonRow = $("<div class='btn-more-box'></div>")
        const buttonMore = $("<button class='load-more'>").html("Więcej &raquo;");


        $.each(images, function(indexImage, image) {
            let photoMars = $("<a class='image'><figure><img src=" + image.img_src + " data-author=" + (image.rover).name + " data-earthdate=" + image.earth_date + "></figure></a>");
            photoMars.find("img").attr("data-camera", (image.camera).full_name);

            if (indexImage <= 3) {
                gallery.append(photoMars);
                lastImage = indexImage;
            } else {
                gallery.append(photoMars);
                photoMars.prev().hide();
            }
        });

        $("figure").append("<figurecaption>");

        $("img").each(function() {
            var date = $(this).attr("data-earthdate");
            var camera = $(this).attr("data-camera");
            $(this).next().html(date + '<br>' + camera);
        });

        buttonRow.append(buttonMore);
        gallery.after(buttonRow);

        lightbox()
    };


    function loadGallery() {
        $.ajax({
            url: nasaAPI,
            type: "GET",
            dataType: "json"
        }).done(function(response) {
            insertMarsPhotos(response.photos);
        }).fail(function(error) {
            console.log(error);
        })
    }
    loadGallery();

    function lightbox(){
		$("a.image").click(function(e) {
            e.preventDefault();
            var thisPhotoSrc = $(this).find("img").attr("src");
            var lightbox = $('<div class="lightbox">');
            var bigPhoto = $('<div class="lightbox-container">').css({background: "url(" + thisPhotoSrc + ") no-repeat center", "background-size": "cover"});
            var buttonClose = $('<button class="lightbox-close">').html("&#10006");

			bigPhoto.prepend(buttonClose);
            lightbox.prepend(bigPhoto);

			$("body").prepend(lightbox);

			$(buttonClose).click(function() {
				$(this).parent().parent().remove();
			});

		});
	};


    $("body").on('click', 'button', function(e) {
        e.preventDefault();
        var showPhotos = 0;

        $.each(gallery.find('a.image'), function(newIndex, element) {

            if (newIndex > lastImage && showPhotos < 4) {
                $(element).show();
                lastImage = newIndex;
                showPhotos++
            }
        }
    )}



)}


export {uploadGallery}
