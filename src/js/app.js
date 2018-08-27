
import {lightbox} from './lightbox.js';
import {typing} from './typing.js';
import {showMenu} from './showmenu.js';
import {uploadMars} from './uploadHero.js';


$( () => {

    typing();
    showMenu();
    uploadMars();

    function uploadImages(){

        let nasaAPI = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=100&api_key=J0MCwnniX5tD5Hd0fymDwHTwztHBtyMYfx18aqvR'

        var lastImage = 0;
        let gallery = $('#images-container')

        function insertMarsPhotos(images) {
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

            gallery.after(buttonMore);
        }


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


        $("body").on('click', 'button', function(e) {
            e.preventDefault();
            var load = 0;

            $.each(gallery.find('figure'), function(indexImage, image) {

                if (indexImage > lastImage && load < 4) {
                    $(image).show();
                    lastImage = indexImage;
                    load++;
                }

                }
            )}
        )}


    uploadImages();


    function lightbox(){
		$("a").click(function() {
            var thisImgSrc = $(this).find("img").attr("src");
            console.log(thisImgSrc)
			var imgDiv = $('<div class="wrapper">').css({background: "url(" + thisImgSrc + ") no-repeat center", "background-size": "cover"});
			var buttonClose = $('<button class="buttonClose">').html("&#10006<br>Close");
			var fullScreenElement = $('<div class="fullScreen">');
			imgDiv.prepend(buttonClose);
			fullScreenElement.prepend(imgDiv);

			$("body").prepend(fullScreenElement);

			$(".buttonClose").click(function() {
				$(this).parent().parent().remove();
			});

		});
    }
    lightbox();

})
