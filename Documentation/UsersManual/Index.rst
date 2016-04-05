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
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-XXXXXX-X', 'auto');
            ga('send', 'pageview');
        },

        /**
         * @return void
         */
        addPiwik: function() {
            (function (f, d) {
                f._paq = f._paq || [];
                f._paq.push(['trackPageView']);
                f._paq.push(['enableLinkTracking']);

                var u="//{$PIWIK_URL}/";
                f._paq.push(['setTrackerUrl', u+'piwik.php']);
                f._paq.push(['setSiteId', {$IDSITE}]);
                var g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
            })(window, document);
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
            koning_cookie_control = EXT:koning_cookie_control/Resources/Public/Styles/CookieControl.css
        }

        includeJSlibs {
            jquery = //code.jquery.com/jquery-1.10.2.min.js
            jquery {
                external = 1
                forceOnTop = 1
                disableCompression = 1
                excludeFromConcatenation = 1
            }

            koning_cookie_control = EXT:koning_cookie_control/Resources/Public/JavaScripts/CookieControl.js
            koning_cookie_control.forceOnTop = 1
        }

        footerData {
            10 < lib.koningCookieControlPlugin
        }
    }
