import * as React from "react";
import {
    toaster,
    ToasterContainer,
    PLACEMENT
} from "baseui/toast";
import { Button, SIZE } from "baseui/button";
import { Block } from "baseui/block";

interface ToasterProps {
}

export default function Toaster(props: ToasterProps) {
    return (
        <ToasterContainer
          autoHideDuration={2222}
          placement={PLACEMENT.topRight}
        >
        </ToasterContainer>
    );
}