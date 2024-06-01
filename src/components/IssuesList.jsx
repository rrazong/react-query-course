import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function IssuesList() {
  const issuesQuery = useQuery(
    ['issues'],
    () => {
      return fetch('/api/issues').then((res) => res.json());
    }
  );
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data: issues,
  } = issuesQuery;

  return (
    <div>
      <h1>Issues List</h1>
      { isLoading && (
          <p>Loading ...</p>
      )}
      { isSuccess && (
        <ul>
          {
            issues.map((issue) => (
              <li>
                <Link to={`/issue/{issue.id}`}>Issue {issue.id}</Link>
              </li>
            ))
          }
        </ul>
      )}
      { isError && (
        <p>An error happened: {error}</p>
      )}
    </div>
  );
}
