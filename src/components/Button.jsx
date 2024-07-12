import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-yellow-500",
    textColor = "text-white",
    className= "",
    ...props
}) {
  return (
    <button className={`${bgColor} ${className} ${textColor} mr-2 px-4 py-2 rounded-lg`} {...props}>
        {children}
    </button>
  )
}

export default Button