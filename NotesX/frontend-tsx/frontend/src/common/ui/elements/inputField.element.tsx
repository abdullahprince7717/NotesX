import React from 'react';
import { Controller } from 'react-hook-form';

const InputField: React.FC<IInputFieldProps> = ({
    name,
    control,
    defaultValue = '',
    placeholder,
    type,
    rules = {},
    errors = {},
    className = '',
    disabled = false,
    value = '',
}) => {
    return (
        <div className="flex flex-col">
            <Controller
                name={name}
                control={control}
                defaultValue={value || defaultValue}
                rules={rules}
                render={({ field }) => (
                    <>
                        <input
                            {...field}
                            type={type}
                            className={`w-full rounded-md my-1 p-4 bg-[#E9F0FF] text-xs text-gray-900  ${className}`}
                            placeholder={placeholder}
                            disabled={disabled}
                        />
                        <span className="text-red-500 text-sm">
                            {errors[name] && errors[name].message}
                        </span>
                    </>
                )}
            />
        </div>
    );
};

export default InputField;
