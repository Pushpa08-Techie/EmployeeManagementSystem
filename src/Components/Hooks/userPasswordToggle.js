import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
 
const usePasswordToggle = () => {
    const [PasswordInputType, setPasswordInputType] = useState('password');
    const [ToggleIcon, setToggleIcon] = useState(faEyeSlash);
 
    const ToggleIconHandler = () => {
        setPasswordInputType(PasswordInputType === 'password' ? 'text' : 'password');
        setToggleIcon(ToggleIcon === faEyeSlash ? faEye : faEyeSlash);
    };
 
    return [PasswordInputType, ToggleIconHandler];
};
 
export default usePasswordToggle;