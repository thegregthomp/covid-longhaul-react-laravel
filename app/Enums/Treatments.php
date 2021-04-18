<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class Treatments extends Enum
{
    const B12 = 'B12';
    const VITAMINC = 'Vitamin C';
}
