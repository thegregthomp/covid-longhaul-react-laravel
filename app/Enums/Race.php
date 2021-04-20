<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class Race extends Enum
{
    const AMERICANINDIAN = 'American Indian or Alaska Native';
    const ASIAN = 'Asian';
    const BLACK = 'Black or African American';
    const NATIVE_OTHER = 'Native Hawaiian or Other Pacific Islander';
    const WHITE = 'White';
    const OTHER = 'Other';
    const NO_ANSWER = 'Prefer Not to Answer';
}
