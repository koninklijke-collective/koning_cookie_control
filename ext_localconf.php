<?php
if (!defined('TYPO3_MODE')) {
    die('Access denied.');
}

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    'koning_cookie_control',
    'Configuration/TypoScript/Default/',
    'Cookie Control - Library'
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    'koning_cookie_control',
    'Configuration/TypoScript/PageIncludes/',
    'Cookie Control - Default Page Includes (js/css)'
);

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
    'Keizer.koning_cookie_control',
    'Show',
    array(
        'Cookie' => 'show'
    ),
    array()
);

$GLOBALS['TYPO3_CONF_VARS']['FE']['eID_include']['koning_cookie_control'] = 'EXT:koning_cookie_control/Resources/Private/Eid/CookieEid.php';
