KoningCookieControl = {

    /**
     * @var boolean
     */
    allowCookies: true,

    /**
     * @var boolean
     */
    firstVisit: false,

    /**
     * @var string
     */
    getAllowCookiesUrl: '/?eID=koning_cookie_control&method=get',

    /**
     * @var string
     */
    setAllowCookiesUrl: '/?eID=koning_cookie_control&method=set',

    /**
     * @var object
     */
    callBacks: {
        enabled: [],
        disabled: []
    },

    /**
     * Initialise functionality
     *
     * @return void
     */
    init: function () {
        jQuery('.tx-koning-cookie-control .button').click(function () {
            KoningCookieControl.toggleWidget();
        });

        jQuery('.tx-koning-cookie-control .widget .close-widget').click(function () {
            KoningCookieControl.toggleWidget();
        });

        KoningCookieControl.getAllowCookies(function () {
            KoningCookieControl.toggleTogglerOptions(function () {
                if (KoningCookieControl.firstVisit) {
                    jQuery('.tx-koning-cookie-control .button').trigger('click');
                }
                KoningCookieControl.runCallBacks();
            });
        });

        jQuery('.tx-koning-cookie-control .widget .toggler a').click(function () {
            KoningCookieControl.setAllowCookies(function () {
                KoningCookieControl.toggleTogglerOptions(function () {
                    jQuery('.tx-koning-cookie-control .widget .close-widget').trigger('click');
                });
            });
            return false;
        });
    },

    /**
     * Returns enabled or disabled callbacks
     *
     * @return void
     */
    runCallBacks: function () {
        var callBacks = KoningCookieControl.callBacks.disabled;
        if (KoningCookieControl.allowCookies) {
            callBacks = KoningCookieControl.callBacks.enabled;
        }

        if (callBacks.length > 0) {
            callBacks.forEach(function (method) {
                method();
            });
        }
    },

    /**
     * Toggles the Cookie widget
     *
     * @return void
     */
    toggleWidget: function () {
        if (jQuery('.tx-koning-cookie-control .widget').is(':visible')) {
            jQuery('.tx-koning-cookie-control .widget').fadeOut(800);
        } else {
            jQuery('.tx-koning-cookie-control .widget').fadeIn(800);
        }
    },

    /**
     * Toggles the text options for the toggler button
     *
     * @param callback
     * @return void
     */
    toggleTogglerOptions: function (callback) {
        if (KoningCookieControl.allowCookies) {
            jQuery('.tx-koning-cookie-control .widget span.on').show();
            jQuery('.tx-koning-cookie-control .widget span.off').hide();
            jQuery('.tx-koning-cookie-control .widget .toggler a').addClass('on').removeClass('off');
        } else {
            jQuery('.tx-koning-cookie-control .widget span.on').hide();
            jQuery('.tx-koning-cookie-control .widget span.off').show();
            jQuery('.tx-koning-cookie-control .widget .toggler a').removeClass('on').addClass('off');
        }

        if (callback) {
            callback();
        }
    },

    /**
     * Checks whether or not cookies are allowed
     *
     * @param callback
     * @return void
     */
    getAllowCookies: function (callback) {
        jQuery.getJSON(
                KoningCookieControl.getAllowCookiesUrl,
                function (response) {
                    KoningCookieControl.allowCookies = response.data.allowCookies;
                    KoningCookieControl.firstVisit = response.data.firstVisit;
                    callback();
                }
        );
    },

    /**
     * Sets cookie status
     *
     * @param callback
     * @return void
     */
    setAllowCookies: function (callback) {
        jQuery.ajax({
            type: 'POST',
            url: KoningCookieControl.setAllowCookiesUrl,
            data: {
                allowCookies: (KoningCookieControl.allowCookies) ? 0 : 1
            },
            success: function (response) {
                KoningCookieControl.allowCookies = !KoningCookieControl.allowCookies;
                callback();
            }
        });
    },

    /**
     * Returns true if cookies are allowed
     *
     * @return boolean
     */
    cookiesAreAllowed: function () {
        return KoningCookieControl.allowCookies;
    },

    /**
     * Demo callback method
     *
     * @return void
     */
    addAnalytics: function () {
        // you can add your analytics code here
    }
};