<?php
if (!defined('TYPO3_MODE')) {
    die ('Access denied.');
}

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    'koning_cookie_control',
    'Show',
    'LLL:EXT:koning_cookie_control/Resources/Private/Language/locallang_be.xlf:show.title'
);
