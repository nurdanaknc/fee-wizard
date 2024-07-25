import { Button, SIZE } from "baseui/button";
import React from "react";
import Icon from "@mdi/react";
import { mdiHomePlus, mdiLogin } from "@mdi/js";

interface ButtonProps {
  type?: "login" | "addResidence";
  onClick: () => void;
  label?: string;
  size?: string;
  outlined? : boolean;
}

export default function ButtonComp(props: ButtonProps) {
  const outlinedTheme = {
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
    ":hover": {
      backgroundColor: "#f1f1f1",
      border: "1px solid black",
      color: "black",
    },
    ":focus": {
      backgroundColor: "#f1f1f1",
      border: "1px solid black",
      color: "black",
    },
  };
  
return (
    <Button
        className="w-auto"
        onClick={() => props.onClick()}
        size={
            props.size === "small"
                ? SIZE.compact
                : props.size === "large"
                ? SIZE.large
                : SIZE.default
        }
        startEnhancer={() =>
            props.type === "addResidence" ? (
                <Icon
                    path={mdiHomePlus}
                    size={1}
                    color={props.outlined ? "black" : "white"}
                />
            ) : null
        }
        overrides={{
            BaseButton: {
                style: props.outlined ? outlinedTheme : {},
            },
        }}
    >
        {props.label}
    </Button>
);
}
