<?php
use Keizer\KoningCookieControl\Utility\CookieUtility;

$result = array();
if (isset($_GET['method'])) {
    switch ($_GET['method']) {
        case 'set':
            $result['data'] = array(
                'success' => CookieUtility::set(\TYPO3\CMS\Core\Utility\GeneralUtility::_POST())
            );
            break;
        case 'get':
        default:
            $result['data'] = CookieUtility::get();
            break;
    }
} else {
    $result['error'] = 'No method given';
}
header('Content-Type: application/json');
echo json_encode($result);