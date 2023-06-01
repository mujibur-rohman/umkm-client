import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const InputText = ({
  placeholder,
  error,
  errorMessage,
  size,
  autoComplete,
  disabled,
  onChange,
  value,
  color,
  ...props
}) => {
  const classnamesInput = classNames(
    "border-[1px] py-1 px-2 transition-all duration-300 rounded w-full focus:shadow focus:border-blue-500 outline-none placeholder:font-light pr-7 box-border hover:border-blue-500 focus:ring-1",
    {
      "!border-red-500 placeholder:text-red-500 text-red-500": error,
      "text-xs h-6": size === "small",
      "text-md h-8": size === "medium",
      "text-lg h-10": size === "large",
      "border-primary": color === "primary",
      "border-secondary": color === "secondary",
      "border-accent": color === "accent",
      "border-neutral": color === "neutral",
      "border-success": color === "success",
      "border-warning": color === "warning",
      "border-error": color === "error",
      "bg-gray-200 cursor-not-allowed border-none": disabled,
    }
  );

  return (
    <div className="flex box-border flex-col w-full">
      <input
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        className={classnamesInput}
        value={value}
        type="text"
        placeholder={placeholder}
        {...props}
      />
      <p className="text-[0.7rem] text-red-500">{errorMessage}</p>
    </div>
  );
};

InputText.propTypes = {
  /**
   * Placeholder
   */
  placeholder: PropTypes.string,
  /**
   * Ukuran input
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Label
   */
  label: PropTypes.string,
  /**
   * Require Label
   */
  labelRequire: PropTypes.bool,
  /**
   * Input Error
   */
  error: PropTypes.bool,
  /**
   * Pesan Error
   */
  errorMessage: PropTypes.string,
  /**
   * Auto completed
   */
  autoComplete: PropTypes.oneOf(["on", "off"]),
  /**
   * Disable input
   */
  disabled: PropTypes.bool,
  /**
   * Color theme
   */
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "accent",
    "neutral",
    "success",
    "warning",
    "error",
  ]),
  /**
   * Change handler
   */
  onChange: PropTypes.func,
  /**
   * Value
   */
  value: PropTypes.string,
};

InputText.defaultProps = {
  size: "medium",
  color: "neutral",
  onClick: undefined,
};

export default InputText;
