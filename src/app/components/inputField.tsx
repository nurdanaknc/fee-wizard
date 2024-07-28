import { Input } from "baseui/input";
import React from "react";
import Regex from "@/helpers/regex";


interface InputFieldProps {
    value: string;
    placeholder?: string;   
    type?: string;
    setValue?: (value: string) => void;
    isDisabled?: boolean;
    regex?: string;
}

export default function InputField(props: InputFieldProps ) {
    return (
        <Input
        value={props.value}
        disabled={props.isDisabled}
        onChange={e => {
          if(props.regex){
            if(Regex(props.regex, e.currentTarget.value)){
              props.setValue!(e.currentTarget.value)
            }
          }
          else{
            props.setValue!(e.currentTarget.value)}
          }
        }
        placeholder={props.placeholder}
        clearOnEscape
        type={props.type || "text"}
      />
    );
    }
