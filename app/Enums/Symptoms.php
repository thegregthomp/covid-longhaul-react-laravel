<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class Symptoms extends Enum
{
    const HEADACHE = 'Headache';
    const COATHANGERPAIN = "Coat-Hanger Pain";
    const BRAINFOG = "Brain Fog";
}
