"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  GovButton,
  GovFormControl,
  GovFormGroup,
  GovFormInput,
  GovFormLabel,
  GovFormSearch,
  GovIcon,
} from "@gov-design-system-ce/react"
import {
  FormInputEvent,
  GovFormInputCustomEvent,
} from "@gov-design-system-ce/components/dist/types/components"
import { FormInputSizesType } from "@gov-design-system-ce/components/dist/types/components/gov-form/input/constants"

interface SearchProps {
  name?: string
  value?: string
  onSearch: (search: string) => void
  placeholder?: string
  size?: FormInputSizesType
  className?: string
  inverse?: boolean
  focus?: boolean
  autocomplete?: boolean
  disableIcon?: boolean
  searchText?: string
}

export default function Search(props: SearchProps) {
  const [value, setValue] = useState<string>()
  const inputRef = useRef<any>()
  const placeholder = props.placeholder ?? "Hledat"

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  function onChange(event: GovFormInputCustomEvent<FormInputEvent>) {
    const val = event.detail.value
    setValue(val)
    if (props.autocomplete) {
      props.onSearch(val)
    }
  }

  useEffect(() => {
    if (!props.focus) {
      return
    }
    const maxAttempt = 10
    let attempt = 0
    const interval = setInterval(() => {
      attempt++
      const input = inputRef.current?.getElementsByTagName("INPUT").item(0)
      if (input) {
        input.focus()
        clearInterval(interval)
      } else if (maxAttempt === attempt) {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [props.focus])

  function onSearch() {
    props.onSearch(value ?? "")
  }

  return (
    <GovFormControl className={props.className}>
      <div className={"sr-only"}>
        <GovFormLabel slot={"top"}>{placeholder}</GovFormLabel>
      </div>
      <GovFormGroup>
        <GovFormSearch
          variant={"primary"}
          className={
            props.inverse
              ? "focus-within:outline-offset-2 focus-within:outline-white"
              : ""
          }
        >
          <GovFormInput
            name={props.name}
            value={value}
            slot={"input"}
            placeholder={placeholder}
            size={props.size ?? "m"}
            onGov-input={onChange}
            ref={inputRef}
          />
          <GovButton
            variant={"primary"}
            type={"solid"}
            slot={"button"}
            size={props.size ?? "m"}
            onGov-click={onSearch}
            wcagLabel={placeholder}
          >
            {props.searchText}
            {!props.disableIcon && <GovIcon type="basic" name="search" />}
          </GovButton>
        </GovFormSearch>
      </GovFormGroup>
    </GovFormControl>
  )
}
