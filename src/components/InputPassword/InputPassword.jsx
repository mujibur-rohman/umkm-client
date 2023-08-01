import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./style.module.css";

function EyeSlash({ togglePassword, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      onClick={togglePassword}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

function Eye({ togglePassword, ...props }) {
  return (
    <svg
      onClick={togglePassword}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function InputPassword({
  placeholder,
  error,
  errorMessage,
  size,
  disabled,
  value,
  color,
  ...props
}) {
  const [isPassword, setIsPassword] = useState(true);
  const togglePassword = () => setIsPassword(!isPassword);
  const classnamesInput = classNames(`${styles["input-password"]}`, {
    [styles["is-error"]]: error,
    "text-xs h-6": size === "small",
    "text-md h-8": size === "medium",
    "text-lg h-10": size === "large",
    "border-primary primary": color === "primary",
    "border-secondary secondary": color === "secondary",
    "border-accent accent": color === "accent",
    "border-info info": color === "info",
    "border-neutral neutral": color === "neutral",
    "border-success success": color === "success",
    "border-warning warning": color === "warning",
    "border-error error": color === "error",
    disabled,
  });
  return (
    <div className={`${styles["wrapper-input-password"]}`}>
      <div className="relative">
        <input
          disabled={disabled}
          className={classnamesInput}
          value={value}
          type={isPassword ? "password" : "text"}
          placeholder={placeholder}
          {...props}
        />
        <div className={`${styles["eye-icon"]}`}>
          {isPassword ? (
            <Eye
              togglePassword={togglePassword}
              className="w-4 h-4 cursor-pointer"
            />
          ) : (
            <EyeSlash
              togglePassword={togglePassword}
              className="w-4 h-4 cursor-pointer"
            />
          )}
        </div>
      </div>
      <p className="text-[0.7rem] text-red-500">{errorMessage}</p>
    </div>
  );
}

InputPassword.propTypes = {
  /**
   * Placeholder
   */
  placeholder: PropTypes.string,
  /**
   * Ukuran input
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Input Error
   */
  error: PropTypes.bool,
  /**
   * Pesan Error
   */
  errorMessage: PropTypes.string,
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
    "info",
    "success",
    "warning",
    "error",
  ]),

  /**
   * Value
   */
  value: PropTypes.string,
};

InputPassword.defaultProps = {
  size: "medium",
  color: "neutral",
  placeholder: "Password",
};

export default InputPassword;
