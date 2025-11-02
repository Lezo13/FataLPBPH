import { PasswordRequirement } from '../../enums';
import { PasswordConstraint } from '../../models';

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_VALIDATION_CONSTRAINTS: PasswordConstraint[] = [
    {
        pattern: /[a-z]/,
        key: PasswordRequirement.lowerCase
    },
    {
        pattern: /[A-Z]/,
        key: PasswordRequirement.upperCase
    },
    {
        pattern: /[0-9]/,
        key: PasswordRequirement.number
    },
    {
        pattern: /[!#$%&()*+,-./:;<=>?@\\^_`{|}~[\]:\x27\x22]/,
        key: PasswordRequirement.specialCharacter
    }
];
