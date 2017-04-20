<?php
namespace Keizer\KoningCookieControl\Utility;

/**
 * Utility: Cookie getters & setters
 *
 * @package Keizer\KoningCookieControl\Utility
 */
class CookieUtility
{

    /**
     * @var string
     */
    static protected $cookieKey = 'koning_cookie_control';

    /**
     * Sets the cookie status based on the request parameter allowCookies
     *
     * @param array $request
     * @return boolean
     */
    public static function set(array $request)
    {
        if (isset($request['allowCookies'])) {
            $parameters = array(
                'allowCookies' => filter_var($request['allowCookies'], FILTER_VALIDATE_BOOLEAN),
                'expire' => strtotime('+3 months'),
                'path' => null,
                'domain' => null,
                'secure' => null,
                'httpOnly' => null,
            );

            $parameters = static::handleSignal('set', $parameters);

            setcookie(
                static::$cookieKey,
                (int)$parameters['allowCookies'],
                $parameters['expire'],
                $parameters['path'],
                $parameters['domain'],
                $parameters['secure'],
                $parameters['httpOnly']
            );
        }
        return false;
    }

    /**
     * Returns the cookie status
     *
     * @return array
     */
    public static function get()
    {
        $allowCookies = true;
        $firstVisit = true;
        if (isset($_COOKIE[static::$cookieKey])) {
            $firstVisit = false;
            if ((bool) $_COOKIE[static::$cookieKey] === false) {
                $allowCookies = false;
            }
        } else {
            static::set(array('allowCookies' => $allowCookies));
        }

        $parameters = static::handleSignal('get', array('allowCookies' => $allowCookies, 'firstVisit' => $firstVisit));

        return $parameters;
    }

    /**
     * Default signal handler for cookie control
     *
     * @param string $method
     * @param array $arguments
     * @return array
     */
    protected static function handleSignal($method, $arguments)
    {
        /** @var \TYPO3\CMS\Extbase\SignalSlot\Dispatcher $dispatcher */
        $dispatcher = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance('TYPO3\\CMS\\Extbase\\SignalSlot\Dispatcher');
        return $dispatcher->dispatch('Keizer\KoningCookieControl\Utility\CookieUtility', $method, $arguments);
    }

}
