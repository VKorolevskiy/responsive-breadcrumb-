$.fn.responsiveBcrumb = function () {

    var paddingRight = 35;
    var breadUl = this;
    var countLi = this.children('li').length;
    var widthLi = this.outerWidth() / countLi;
    var widthLiAr = [];
    this.children('li').each(function (index) {
        widthLiAr[index] = $(this).outerWidth();
    });

    const widthLiArBig = widthLiAr.filter(widthLiA => widthLiA > widthLi);


    const widthLiArMin = widthLiAr.filter(widthLiA => widthLiA < widthLi);

    var widthLiArMinAll = 0;
    for (var i = 0; i < widthLiArMin.length; i++) {
        widthLiArMinAll = widthLiArMinAll + widthLiArMin[i];
    }

    var bigAllWidth = this.outerWidth() - widthLiArMinAll;

    var getWidth = bigAllWidth / widthLiArBig.length;


    this.children('li').each(function (index) {


        if (getWidth < $(this).outerWidth()) {
            $(this).css('width', getWidth - paddingRight + 'px');
            $(this).addClass('response-item')

        }

    });


    this.children('.response-item').hover(
        function () {
            $(this).css({
                "text-overflow": "unset",
            });
            if (countLi - 1 == $(this).index()) {
                $(this).parent('ul').filter(':not(:animated)').animate({
                    'margin-left': -($(this).children().width() - getWidth + paddingRight * 2) + 'px'
                }, 100);
            } else {

                $(this).parent('ul').animate({
                    'margin-right': -($(this).children().width() - getWidth + paddingRight * 2) + 'px'
                }, 100);

            }

            $(this).animate({
                'width': $(this).children().width() + paddingRight / 2 + 'px'
            });

            return false;
        },
        function () {
            $(this).css({
                "text-overflow": "ellipsis",
            });

            if (countLi - 1 == $(this).index()) {


                breadUl.children('li').last().filter(':not(:animated)').animate({
                    width: getWidth - paddingRight + 'px'
                }, 100, function () {
                    breadUl.filter(':not(:animated)').animate({
                        'margin-left': 0
                    }, 101)


                });


                return false;


            } else {
                $(this).animate({
                    width: getWidth - paddingRight + 'px'
                }, 100);
            }


        });

}