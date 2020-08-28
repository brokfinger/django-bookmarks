(function () {
    var jquery_version = '3.3.1';
    var site_url = 'http://127.0.0.1:8000/';
    var static_url = site_url + 'static/';
    var min_width = 100;
    var min_height = 100;

    function bookmarklet(msg) {
        // load CSS-styles
        var css = jQuery('<link>');
        css.attr({
            rel: 'stylesheet',
            type: 'text/css',
            href: static_url + 'css/bookmarklet.css?r=' +
                Math.floor(Math.random() * 9999)
        });
        jQuery('head').append(css);

        // load HTML
        box_html = '<div id="bookmarklet"><a href="#"' +
            ' id="close">&times;</a><h1>Выберите изображение в' +
            ' закладки:</h1><div class="images"></div></div>';
        jQuery('body').append(box_html);

        // close bookmarklet
        jQuery('#bookmarklet #close').click(function () {
            jQuery('#bookmarklet').remove();
        })

        // input images in HTML-container
        jQuery.each(jQuery('img[src$="jpg"]'), function (index, image) {
            if (jQuery(image).width() >= min_width && jQuery(image).height() >= min_height) {
                image_url = jQuery(image).attr('src');
                jQuery('#bookmarklet .images').append(
                    '<a href="#"><img src="' + image_url + '"/></a>'
                );
            }
        });

        // where image select, add it in list save images on site
        jQuery('#bookmarklet .images a').click(function (e) {
            selected_image = jQuery(this).children('img').attr('src');
            jQuery('#bookmarklet').hide();

            window.open(site_url + 'images/create/?url=' +
                encodeURIComponent(selected_image) + '&title=' +
                encodeURIComponent(jQuery('title').text()), '_blank');
        });
    }

    // check connect jQuery and load new version bookmarklet
    if (typeof window.jQuery != 'undefined') {
        bookmarklet();
    } else {
        var conflict = typeof window.$ != 'undefined';
        var script = document.createElement('script');
        var attempts = 15;

        script.src = '//ajax.googleapis.com/ajax/libs/jquery/' +
            jquery_version + '/jquery.min.js';
        document.head.appendChild(script);

        (function () {
            if (typeof window.jQuery == 'undefined') {
                if (--attempts > 0) {
                    window.setTimeout(arguments.callee, 250)
                } else {
                    alert('Ошибка в загрузке jQuery')
                }
            } else {
                bookmarklet();
            }
        })();
    }
})()
