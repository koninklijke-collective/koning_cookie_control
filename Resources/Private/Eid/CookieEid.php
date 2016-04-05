<?php
use Keizer\KoningCookieControl\Utility\CookieUtility;

$result = array();
$method = \TYPO3\CMS\Core\Utility\GeneralUtility::_GET('method');
if ($method) {
    switch (trim($method)) {
        case 'set':
            $result['data'] = array(
                'success' => CookieUtility::set(\TYPO3\CMS\Core\Utility\GeneralUtility::_POST())
            );
            break;

        case 'get':
            $result['data'] = CookieUtility::get();
            break;

        default:
            $result['error'] = 'Unknown method given';
    }
} else {
    $result['error'] = 'No method given';
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);