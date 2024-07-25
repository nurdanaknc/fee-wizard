import { Input } from "baseui/input";
import React from "react";


interface InputFieldProps {
    value: string;
    placeholder?: string;   
    type?: string;
    setValue: (value: string) => void;
}

export default function InputField(props: InputFieldProps ) {
    return (
        <Input
        value={props.value}
        onChange={e => props.setValue(e.currentTarget.value)}
        placeholder={props.placeholder}
        clearOnEscape
        type={props.type || "text"}
      />
    );
    }
