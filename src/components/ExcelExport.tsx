import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactXlsxExport from "react-xlsx-export";
import buttonStyles from "../UI/buttons.module.css";

type Props = {
  tableData: string[][];
};

const ExcelExport = ({ tableData }: Props) => {
  const dataset = tableData.map((row: string[]) => {
    return {
      name: row[0],
      message: row[1],
      profileLink: row[2],
      commentId: row[3],
    };
  });

  const currentFormattedDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const filename = `fb-comments-${currentFormattedDate}.xlsx`;

  return <ReactXlsxExport data={dataset} filename={filename}
        className={buttonStyles.gridControlButton}
    >
    <FontAwesomeIcon icon={faFileExcel} />
  </ReactXlsxExport>
};

export default ExcelExport;
