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
        var container = jQuery('.koning-cookie-control');
        if (container.length > 0) {
            container.find('.toggle-widget').click(function (e) {
                e.preventDefault();
                KoningCookieControl.toggleWidget();
            });

            KoningCookieControl.getAllowCookies(function () {
                KoningCookieControl.toggleTogglerOptions(function () {
                    KoningCookieControl.hideWidget();

                    if (KoningCookieControl.firstVisit) {
                        KoningCookieControl.showWidget();
                    }

                    KoningCookieControl.runCallBacks();
                });
            });

            container.find('.cookie-toggle').click(function () {
                KoningCookieControl.setAllowCookies(function () {
                    KoningCookieControl.toggleTogglerOptions(function () {
                        KoningCookieControl.hideWidget();
                    });
                });
                return false;
            });
        }
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
        var content = jQuery('.koning-cookie-control .cookie-content-container');
        if (content.is(':visible')) {
            KoningCookieControl.hideWidget();
        } else {
            KoningCookieControl.showWidget();
        }
    },

    /**
     * Hides the Cookie widget
     *
     * @return void
     */
    hideWidget: function () {
        jQuery('.koning-cookie-control .cookie-content-container').fadeOut(800);
    },

    /**
     * Show the Cookie widget
     *
     * @return void
     */
    showWidget: function () {
        jQuery('.koning-cookie-control .cookie-content-container').fadeIn(800);
    },

    /**
     * Toggles the text options for the toggler button
     *
     * @param callback
     * @return void
     */
    toggleTogglerOptions: function (callback) {
        var container = jQuery('.koning-cookie-control');
        if (KoningCookieControl.allowCookies) {
            container.find('.cookie-toggle.on').show();
            container.find('.cookie-toggle.off').hide();
            container.find('.cookie-toggles').addClass('on').removeClass('off');
        } else {
            container.find('.cookie-toggle.on').hide();
            container.find('.cookie-toggle.off').show();
            container.find('.cookie-toggles').removeClass('on').addClass('off');
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
            success: function () {
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