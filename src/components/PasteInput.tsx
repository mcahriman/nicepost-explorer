import React, { useCallback } from "react";
import classes from "./PasteInput.module.css";
type Props = {};

const PasteInput = (props: Props) => {
  const [pastedImage, setPastedImage] = React.useState<string | null>(null);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      console.log(e.clipboardData);
      //handle paste picture
      const items = e.clipboardData.items;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") === 0) {
          const blob = items[i].getAsFile();
          const reader = new FileReader();
          reader.onload = (event: any) => {
            console.log(event.target.result);
            setPastedImage(event.target.result);
          };
          if (blob) reader.readAsDataURL(blob);
        }
      }
      //handle paste text

      const text = e.clipboardData.getData("text/plain");
      console.log(`pasted ${text.length} characters`);
    },
    []
  );

  return (
    <div className={classes.pastedInput}>
      <textarea onPaste={handlePaste} />
      {pastedImage && (
        <div className={classes.pastedImage}>
          <img src={pastedImage} alt="fetched from clipboard" />
        </div>
      )}
    </div>
  );
};

export default PasteInput;
