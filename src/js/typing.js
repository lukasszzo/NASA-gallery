function typing(){

    var i = 0;
    var txt = 'Nasa api gallery';
    var speed = 150;
    let hello = '';

    function type() {
      if (i < txt.length) {

        hello += txt.charAt(i)

        $('.hello-title').text(hello)

        i++;
        setTimeout(type, speed);
      }
    }

    type()
}

export {typing}
