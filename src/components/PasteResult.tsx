import React from "react";

import styles from "./PasteResult.module.css";

type Props = { data: string | null };
export const PasteResult = ({ data }: Props) => {
  const [showByUnique, setShowByUnique] = React.useState(false);

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

  return (
    <div>
      <div className={styles.stats}>
        <p>Found {tableData.length} posts</p>
        <p>Found {uniqueUserTableData.length} Unique posted users</p>
        <button
          onClick={() => {
            setShowByUnique((prev) => !prev);
          }}
        >
          Toggle unique users
        </button>
      </div>
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
