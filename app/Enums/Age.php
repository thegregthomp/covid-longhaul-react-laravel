<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class Age extends Enum
{
    const A_18U = 'under 18';
    const A_1824 = '18 to 24';
    const A_2529 = '25 to 29';
    const A_3034 = '30 to 34';
    const A_3539 = '35 to 39';
    const A_4044 = '40 to 44';
    const A_4549 = '45 to 49';
    const A_5054 = '50 to 54';
    const A_5559 = '55 to 59';
    const A_6064 = '60 to 64';
    const A_6569 = '65 to 69';
    const A_7074 = '70 to 74';
    const A_75O = '75+';
}
