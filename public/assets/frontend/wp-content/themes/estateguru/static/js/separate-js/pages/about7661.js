
var about = (function() {
    return {
        init: function() {
            var items = jQuery('.item', '.date-carousel')
            jQuery('.date-carousel').owlCarousel({
                loop:false,
                margin:0,
                dots:false,
                lazyLoad:true,
                nav:true,
                startPosition: items.length - 1,
                navText: ['<i class="zmdi zmdi-chevron-left"></i>','<i class="zmdi zmdi-chevron-right"></i>'],
                stagePadding: 16,
                // autoWidth:true,            
                responsive:{
                    0:{
                        items:2
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:5
                    }
                }
            });
            jQuery(document).on('click','.js-videoPoster',function(e) {
              //отменяем стандартное действие button
              e.preventDefault();
              var poster = jQuery(this);
              // ищем родителя ближайшего по классу
              var wrapper = poster.closest('.js-videoWrapper');
              videoPlay(wrapper);
            });

            //вопроизводим видео, при этом скрывая постер
            function videoPlay(wrapper) {
              var iframe = wrapper.find('.js-videoIframe');
              // Берем ссылку видео из data
              var src = iframe.data('src');
              // скрываем постер
              wrapper.addClass('videoWrapperActive');
              // подставляем в src параметр из data
              iframe.attr('src',src);
            }
        }
    };
})();
