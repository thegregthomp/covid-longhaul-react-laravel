<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class Weight extends Enum
{
    const UNDERWEEIGHT = 'Underweight';
    const AVERAGE = 'Average';
    const OVERWEIGHT = 'Overweight';
    const NO_ANSWER = 'Prefer Not to Answer';
}
