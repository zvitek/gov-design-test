"use client"

import { GovButton } from "@gov-design-system-ce/react"
import type { JSX as GovJSX } from "@gov-design-system-ce/components"
import React, { FC, ReactElement, ReactNode } from "react"
import "./button.css"

export interface ButtonProps
  extends Omit<GovJSX.GovButton, "iconLeft" | "iconRight"> {
  children: ReactNode
  iconLeft?: ReactElement
  iconRight?: ReactElement
  className?: string
}

const Button: FC<ButtonProps> = props => {
  const { iconLeft, iconRight, ...rest } = props
  return (
    <GovButton
      type={props.type ?? "outlined"}
      variant={props.variant ?? "primary"}
      size={props.size ?? "m"}
      {...rest}
    >
      {props.iconLeft &&
        React.cloneElement(props.iconLeft, { slot: "left-icon" })}
      {props.iconRight &&
        React.cloneElement(props.iconRight, { slot: "right-icon" })}
      {props.children}
    </GovButton>
  )
}

export default Button
