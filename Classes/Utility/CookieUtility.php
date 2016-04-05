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
        if (isset($request['allowCookies']) && in_array((int) $request['allowCookies'], array(0, 1))) {
            $expirationDate = strtotime('+3 months');
            return setcookie(self::$cookieKey, (int) $request['allowCookies'], $expirationDate);
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
        if (isset($_COOKIE[self::$cookieKey])) {
            $firstVisit = false;
            if ((int) $_COOKIE[self::$cookieKey] === 0) {
                $allowCookies = false;
            }
        } else {
            self::set(array('allowCookies' => 1));
        }
        return array('allowCookies' => $allowCookies, 'firstVisit' => $firstVisit);
    }
}