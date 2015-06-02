<?php
if (!defined('TYPO3_MODE')) {
    die ('Access denied.');
}

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    $_EXTKEY,
    'Show',
    'LLL:EXT:' . $_EXTKEY . '/Resources/Private/Language/locallang_be.xlf:show.title'
);