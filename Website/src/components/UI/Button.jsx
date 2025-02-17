import React from "react"

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none pointer-cursor"

  const variants = {
    white: "bg-transparent hover:bg-white hover:text-black",
    black : "bg-black text-white hover:bg-white hover:text-black",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    success: "text-green-600 hover:text-white hover:bg-green-600",
    danger: "bg-red-600 text-white hover:bg-red-700 ",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  }

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  }

  const variantStyles = variants[variant]
  const sizeStyles = sizes[size]
  const widthStyles = fullWidth ? "w-full" : ""
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  const buttonStyles = `${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${disabledStyles} ${className}`

  return (
    <button type={type} className={buttonStyles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button

