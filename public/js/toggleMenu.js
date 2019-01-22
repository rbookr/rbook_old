// Toggle Function
$('.catalog-title').click(function(){
    $(this).find('i').toggleClass('fa-plus-square fa-minus-square')
    $(this).parent().find('ul.catalog').slideToggle(1000)
});
