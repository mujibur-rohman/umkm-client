import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Avatar = ({
  name,
  src,
  changeAble = false,
  size,
  alt,
  className,
  ...props
}) => {
  const getInitialName = (name) => {
    if (!name) return;
    const initial = name.split(" ");
    return `${initial[0].toUpperCase().charAt(0)}${
      initial[1] ? initial[1].charAt(0).toUpperCase() : ""
    }`;
  };

  const classname = classNames(
    `relative ${className} border-4 border-black online rounded-full overflow-hidden flex items-center justify-center [&>*:nth-child(2)]:hover:opacity-0  [&>*:nth-child(3)]:hover:opacity-100`,
    {
      [`[&>*:nth-child(1)]:text-xs [&>*:nth-child(2)]:h-3 [&>*:nth-child(2)]:text-[0.5rem] w-8 h-8 [&>*:nth-child(3)]:text-[0.3rem]`]:
        size === "xs",
      [`[&>*:nth-child(1)]:text-xl [&>*:nth-child(2)]:h-4 [&>*:nth-child(2)]:text-[0.7rem] w-12 h-12 [&>*:nth-child(3)]:text-[0.5rem]`]:
        size === "sm",
      [`[&>*:nth-child(1)]:text-3xl [&>*:nth-child(2)]:h-5 [&>*:nth-child(2)]:text-[0.9rem] w-16 h-16 [&>*:nth-child(3)]:text-[0.6rem]`]:
        size === "md",
      [`[&>*:nth-child(1)]:text-4xl [&>*:nth-child(2)]:h-7 [&>*:nth-child(2)]:text-[1.2rem] w-24 h-24 [&>*:nth-child(3)]:text-[0.8rem]`]:
        size === "lg",
      [`[&>*:nth-child(1)]:text-5xl [&>*:nth-child(2)]:h-11 [&>*:nth-child(2)]:text-2xl w-32 h-32 [&>*:nth-child(3)]:text-[1rem]`]:
        size === "xl",
    }
  );
  const classnameIcon = classNames({
    "w-2 h-2": size === "xs",
    "w-3 h-3": size === "sm",
    "w-4 h-4": size === "md",
    "w-5 h-5": size === "lg",
    "w-6 h-6": size === "xl",
  });

  return (
    <div className={classname}>
      {/* Content */}
      {src ? (
        <img
          src={src}
          className="object-cover object-center w-full h-full"
          alt={alt}
        />
      ) : (
        <span
          className={`bg-red-500 text-white h-full w-full flex justify-center items-center`}
        >
          {getInitialName(name)}
        </span>
      )}
      {changeAble && (
        <>
          {/* Edit Icon */}
          <div className="absolute transition-opacity bottom-0 left-0 right-0 text-white bg-black/50 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={classnameIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
          {/* Backdrop */}
          <div className="absolute top-0 opacity-0 transition-opacity left-0 bottom-0 right-0 bg-black/50 flex justify-center text-center items-center text-white">
            Klik untuk mengubah gambar
          </div>
          {/* Input File */}
          <input
            type="file"
            className="absolute top-0 right-0 left-0 bottom-0 file:hidden cursor-pointer opacity-0"
            accept="image/*"
            {...props}
          />
        </>
      )}
    </div>
  );
};

Avatar.propTypes = {
  /**
   * Source image untuk avatar
   */
  src: PropTypes.string,
  /**
   * Username untuk menampilkan inisial nama
   */
  name: PropTypes.string.isRequired,
  /**
   * Alternatif text untuk image
   */
  alt: PropTypes.string,
  /**
   * Ukuran avatar
   */
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  /**
   * Untuk meberikan fitur ubah profile
   */
  changeAble: PropTypes.bool,
};

Avatar.defaultProps = {
  name: "User",
  alt: "name",
  size: "md",
};

export default Avatar;
