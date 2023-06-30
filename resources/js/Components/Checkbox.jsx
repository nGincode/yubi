import React, { useState, useRef, useEffect, useCallback } from "react";

export default function Checkbox({
    name,
    value,
    checked,
    className,
    handlesetChecked,
    id,
}) {
    const [isChecked, setIsChecked] = useState(checked ? true : false);

    const [switchChakced, setswitchChakced] = useState(checked ? true : false);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
        setswitchChakced(true);
        if (handlesetChecked) handlesetChecked(isChecked);
    };

    return (
        <>
            <input
                type="checkbox"
                name={name}
                id={id}
                value={value}
                className={className}
                checked={switchChakced ? isChecked : checked}
                onChange={handleOnChange}
            />
            {switchChakced ? (
                <>
                    {!isChecked && (
                        <input
                            type="hidden"
                            name={name}
                            value=""
                            className={className}
                        />
                    )}
                </>
            ) : (
                <>
                    {!checked && (
                        <input
                            type="hidden"
                            name={name}
                            value=""
                            className={className}
                        />
                    )}
                </>
            )}
        </>
    );
}
