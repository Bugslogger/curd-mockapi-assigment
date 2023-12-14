import React, { memo, useEffect } from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  defaultValue,
  id,
  className,
  name,
  checked,
  defaultChecked,
  required = false,
  inputClass,
  labelClass,
  InputChange,
  InputBlur,
  isError,
  error,
}) => {
  useEffect(() => {
    if (!type) {
      throw new Error("type prop can not be empty");
    }
  }, [type]);

  return (
    <div className={"flex flex-col gap-1 font-poppins " + className}>
      {label && (
        <label htmlFor={id} className={"font-[500] " + labelClass}>
          <span className="text-sm">{label}</span>
          {required && <span className="text-error">*</span>}
        </label>
      )}
      {type && (
        <input
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          defaultChecked={defaultChecked}
          checked={checked}
          type={type}
          onBlur={InputBlur}
          onChange={InputChange}
          placeholder={placeholder}
          required={required}
          className={
            "px-3 py-2 focus:outline-none placeholder:text-sm placeholder:text-[#7a7a7a] border rounded-[5px] border-gray " +
            inputClass
          }
        />
      )}
      {isError && <div className="text-xs text-error px-1">{error}</div>}
    </div>
  );
};

export default memo(Input);
