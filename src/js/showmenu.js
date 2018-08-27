function showMenu () {

    $('.main-nav-toggle').on('click', function(){
        $(this).next().toggleClass('show')
    })
}

export {showMenu}
