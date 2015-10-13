<?php

$EM_CONF[$_EXTKEY] = array(
    'title' => 'Cookie Control',
    'description' => 'Advanced cookie control extension with enabled/disabled callbacks',
    'category' => 'plugin',
    'version' => '1.0.2',
    'state' => 'stable',
    'clearCacheOnLoad' => true,
    'author' => 'Jesper Paardekooper,Benjamin Serfhos',
    'author_email' => 'j.paardekooper@grandslam-media.nl,serfhos@rsm.nl',
    'author_company' => 'Rotterdam School of Management, Erasmus University',
    'constraints' => array(
        'depends' => array(
            'typo3' => '6.2.0-7.99.99',
        ),
        'conflicts' => array(),
        'suggests' => array(),
    ),
);