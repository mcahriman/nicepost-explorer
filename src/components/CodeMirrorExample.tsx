import { javascript } from "@codemirror/lang-javascript";
import {
  faClipboard,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactCodeMirror from "@uiw/react-codemirror";
import React, { useState } from "react";

import classes from "./CodeMirrorExample.module.css";

type Props = { title: string; code: string };

const CodeMirrorExample = ({ code, title }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (data: string) => {
    navigator.clipboard.writeText(data).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <div className={classes.codeMirrorExample}>
      <h4>{title}</h4>
      <button
        className={classes.copyButton}
        onClick={() => {
          copyToClipboard(code);
        }}
        title="Copy to clipboard"
      >
        {copied ? (
          <FontAwesomeIcon icon={faClipboardCheck} />
        ) : (
          <FontAwesomeIcon icon={faClipboard} />
        )}
      </button>

      <ReactCodeMirror
        className={classes.codeContainer}
        value={code}
        extensions={[javascript({})]}
        height="20rem"
        width="100%"
      />
    </div>
  );
};

export default CodeMirrorExample;
