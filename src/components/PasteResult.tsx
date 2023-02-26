import React from "react";

import styles from "./PasteResult.module.css";
import {
  faClipboard,
  faClipboardCheck,
  faComment,
  faCommentAlt,
  faCommentSlash,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExcelExport from "./ExcelExport";

import buttonStyles from "../UI/buttons.module.css";

type Props = { data: string | null };
export const PasteResult = ({ data }: Props) => {
  const [showByUnique, setShowByUnique] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const tableData = JSON.parse(data || "[]")
    .sort((a: string[], b: string[]) => (a[0] > b[0] ? 1 : -1))
    .map((row: string[]) => {
      //sanitize fb profile link
      const profileLink = row[2];
      // cut off the query string
      const sanitizedProfileLink = profileLink.split(/&|\?eav/)[0];
      return [row[0], row[1], sanitizedProfileLink, row];
    });

  const usersMap = new Map();
  const uniqueUserTableData: string[][] = [];

  tableData.forEach((row: string[]) => {
    if (!usersMap.has(row[2])) {
      usersMap.set(row[2], true);
      uniqueUserTableData.push(row);
    }
  });

  const currentData: string[][] = showByUnique
    ? uniqueUserTableData
    : tableData;

  const copyUniqueNewlineSeparated = () => {
    const uniqueUsers = uniqueUserTableData.map((row) => row[0].replace(/\n/g, " "));
    navigator.clipboard.writeText(uniqueUsers.join("\n")).then(() => {
      console.log("Copied to clipboard");
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }
        , 2000);
    }).catch((err) => {
        console.log("Error copying to clipboard", err);
    });
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.summary}>
        <div className={styles.stats}>
          <p>
            <FontAwesomeIcon icon={faComment} /> {tableData.length}
          </p>
          <p>
            <FontAwesomeIcon icon={faCommentAlt} />
            {uniqueUserTableData.length} unique
          </p>
        </div>
        <div className={styles.buttons}>
          <button
            className={buttonStyles.gridControlButton}
            onClick={() => {
              setShowByUnique((prev) => !prev);
            }}
            title="Toggle unique users"
          >
            <FontAwesomeIcon icon={showByUnique ? faUsers : faUser} />
          </button>
          <ExcelExport tableData={currentData} />
          <button
            onClick={copyUniqueNewlineSeparated}
            title="Copy unique users to clipboard"
            className={buttonStyles.gridControlButton}
          >
            <FontAwesomeIcon icon={copied ? faClipboardCheck : faClipboard} />
          </button>
        </div>
      </div>
      {currentData.length === 0 && (
        <div className={styles.noData}>
          <FontAwesomeIcon icon={faCommentSlash} />
          Nothing to show yet
        </div>
      )}
      <table className={styles.resultTable}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Post</th>
            <th>Profile Link</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(([name, comment, profilelink, commentId]) => (
            <tr key={commentId}>
              <td>{name}</td>
              <td>{comment}</td>
              <td>{profilelink}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PasteResult;
