/**
 * Created by pataiadam on 2015.03.24..
 */
$(document).ready(function() {
    var menu = $(".menu > img");
    var arrow = $(".arrow > img");
    var heart = $(".heart > img");
    var add = $(".add > img");
    var search = $(".search > img");
    var download = $(".download > img");
    var trash = $(".trash > img");


    $(".toggle").on('click', function() {
        $.each([menu, arrow], function() {
            this.toggleClass('out');
        });
        $.each([heart, add, search, download, trash], function() {
            this.toggleClass('hide');
        });
        $(this).addClass('anim').delay(800).queue(function(next) {
            $(this).removeClass('anim');
            next()
        });
    });
});
