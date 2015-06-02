<?php
if (!defined('TYPO3_MODE')) {
    die('Access denied.');
}

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
    'Keizer.' . $_EXTKEY,
    'Show',
    array(
        'Cookie' => 'show'
    ),
    array()
);

$GLOBALS['TYPO3_CONF_VARS']['FE']['eID_include']['koning_cookie_control'] = 'EXT:' . $_EXTKEY . '/Classes/Eid/CookieEid.php';