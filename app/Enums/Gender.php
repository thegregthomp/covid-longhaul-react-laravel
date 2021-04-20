<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class Gender extends Enum
{
    const MALE = 'Male';
    const FEMALE = 'Female';
    const NONBINARY = 'Non-Binary';
    const NO_ANSWER = 'Prefer Not to Answer';
}
