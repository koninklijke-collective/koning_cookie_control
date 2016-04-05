var KoningCookieControl = KoningCookieControl || {

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
                        KoningCookieControl.toggleWidget(container);
                    });

                    KoningCookieControl.getAllowCookies(function () {
                        KoningCookieControl.toggleOptions(container, function () {
                            KoningCookieControl.hideWidget(container);
                            if (KoningCookieControl.firstVisit) {
                                KoningCookieControl.showWidget(container);
                            }

                            KoningCookieControl.runCallBacks();
                        });
                    });

                    container.find('.cookie-toggle').click(function (e) {
                        e.preventDefault();
                        KoningCookieControl.setAllowCookies(function () {
                            KoningCookieControl.toggleOptions(container, function () {
                                KoningCookieControl.hideWidget(container);
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
                if (KoningCookieControl.isCookieAllowed()) {
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
            toggleWidget: function (container) {
                var content = container.find('.cookie-content-container');
                if (content.is(':visible')) {
                    KoningCookieControl.hideWidget(container);
                } else {
                    KoningCookieControl.showWidget(container);
                }
            },

            /**
             * Hides the Cookie widget
             *
             * @return void
             */
            hideWidget: function (container) {
                container.find('.cookie-content-container').fadeOut(800);
            },

            /**
             * Show the Cookie widget
             *
             * @return void
             */
            showWidget: function (container) {
                container.find('.cookie-content-container').fadeIn(800);
            },

            /**
             * Toggles the text options for the toggler button
             *
             * @param container
             * @param callback
             * @return void
             */
            toggleOptions: function (container, callback) {
                if (KoningCookieControl.isCookieAllowed()) {
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
                var toggle = (KoningCookieControl.isCookieAllowed()) ? false : true;
                jQuery.ajax({
                    type: 'POST',
                    url: KoningCookieControl.setAllowCookiesUrl,
                    data: {
                        allowCookies: toggle
                    },
                    success: function () {
                        KoningCookieControl.allowCookies = toggle;
                        callback();
                    }
                });
            },

            /**
             * Returns true if cookies are allowed
             *
             * @return boolean
             */
            isCookieAllowed: function () {
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
