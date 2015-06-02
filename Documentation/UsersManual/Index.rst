.. ==================================================
.. FOR YOUR INFORMATION
.. --------------------------------------------------
.. -*- coding: utf-8 -*- with BOM.

.. include:: ../Includes.txt
.. index:: UsersManual

Users Manual
------------
The extension will create an opening so your functions can be executed on the given action.

.. only:: html

    :ref:`installation` | :ref:`extending` | :ref:`page_includes`

.. _installation:

Installation
============

1. Download and install the the extension via the Extension Manager
2. Add the static template "Cookie Control - Library" in the root template
3. Manually or automatic insertion of the page includes;
    * Manually include the js, css and lib.koningCookieControlPlugin into your PAGE object (see below; Manually include PAGE items)
    * Add the static template "Cookie Control - Default Page Includes (js/css)" in the root template
4. Feel free to extend with your own executable (see below; Extending your own functions)

.. _extending:

Extending your own functions
============================
If you want to extend the scripts being executed on opt-in or opt-out; you can configure it via the following steps;

Create javascript function
^^^^^^^^^^^^^^^^^^^^^^^^^^

my_personal_cookies.js
::

    /**
     * Cookies
     *
     * @type object
     */
    MyPersonalCookies = {

        /**
         * @return void
         */
        addGoogleAnalytics: function() {
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-XXXXXXX-XX']);
            _gaq.push(['_trackPageview']);

            var _ga_src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
            jQuery.getScript(_ga_src, function () {
                var GATracker = _gat._createTracker('###ACCOUNT###');
                GATracker._trackPageview();
            });
        },

        /**
         * @return void
         */
        addPiwik: function() {
            var piwikUrl = 'YourPiwikUrl';

            var _paq = _paq || [];
            (function(){ var u=(("https:" == document.location.protocol) ? "https://"+piwikUrl+"/" : "http://"+piwikUrl+"/");
            _paq.push(['setSiteId', 'UA-XXXXXX-XX']);
            _paq.push(['setTrackerUrl', u+'piwik.php']);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript'; g.defer=true; g.async=true; g.src=u+'piwik.js';
            s.parentNode.insertBefore(g,s); })();
        }
    };

Include Javascript in page rendering
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Make sure these files are included in source;

::

    page.includeJSFooter.my_personal_cookies = location/to/your/my_personal_cookies.js


Add function as opt-in/opt-out functions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

    plugin.tx_koningcookiecontrol {
        settings {
            callBacks {
                enabled {
                    10 = MyPersonalCookies.addAnalytics
                    20 = MyPersonalCookies.addPiwik
                }
            }
        }
    }


.. _page_includes:

Manually include PAGE items
===========================

See: EXT:koning_cookie_control/Configuration/TypoScript/PageIncludes/setup.txt

::

    page {
        includeCSS {
            koning_cookie_control = EXT:koning_cookie_control/Resources/Public/Sass/CookieControl.css
        }

        includeJSlibs {
            jquery = //code.jquery.com/jquery-1.10.2.min.js
            jquery {
                external = 1
                forceOnTop = 1
                disableCompression = 1
                excludeFromConcatenation = 1
            }

            koning_cookie_control = EXT:koning_cookie_control/Resources/Public/JavaScript/CookieControl.js
            koning_cookie_control.forceOnTop = 1
        }

        footerData {
            10 < lib.koningCookieControlPlugin
        }
    }
