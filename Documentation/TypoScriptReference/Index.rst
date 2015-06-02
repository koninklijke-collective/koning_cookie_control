.. ==================================================
.. FOR YOUR INFORMATION
.. --------------------------------------------------
.. -*- coding: utf-8 -*- with BOM.

.. include:: ../Includes.txt
.. index:: TypoScript Reference

TypoScript Reference
--------------------

The executables of the cookie control can be done via typoscript configuration.

Extension setup
===============
Here is a reference that is for TypoScript setup

plugin.tx_koningcookiecontrol.settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+-----------------------------------+-------------+------------------------------------------------------------------+------------------------------------------+
| Property                          | Data type   | Description                                                      | Default                                  |
+===================================+=============+==================================================================+==========================================+
| callBacks.enabled                 | array       | Executables when opt-int                                         | [10 => KoningCookieControl.addAnalytics] |
+-----------------------------------+-------------+------------------------------------------------------------------+------------------------------------------+
| callBacks.disabled                | array       | Executables when opt-out                                         |                                          |
+-----------------------------------+-------------+------------------------------------------------------------------+------------------------------------------+

Example
^^^^^^^

::

    plugin.tx_koningcookiecontrol.settings {
        callBacks {
            enabled {
                10 = KoningCookieControl.addAnalytics
            }

            disabled {
                20 = KoningCookieControl.removeAnalytics
            }
        }
    }
