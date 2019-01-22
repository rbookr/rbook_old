// Toggle Function
$('.toggle').click(function(){
    // Switches the Icon
    $(this).children('i').toggleClass('fa-sort-desc');
    // Switches the forms  
    $('.form').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: "toggle"
    }, "slow");
});
