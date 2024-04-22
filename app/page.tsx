"use client";

import { useEffect, useState } from "react";
import { getGitHubHandles } from "@/api/getGithubHandles";

// components
import Title from "@/components/title";
import options from "@/api/options";
import { getAssignments } from "@/api/getAssignments";
import { getAssignmentResults } from "@/api/getAssignmentResults";

function getStatusColor(status: string) {
  switch (status) {
    case "merged":
      return "green";
    case "submitted":
      return "orange";
    case "accepted":
      return "yellow";
    default:
      return "gray";
  }
}

export default function Home() {
  const [assignmentResults, setAssignmentResults] = useState<
    AssignmentResult[]
  >([]);
  const [isLoadingAssignmentResults, setIsLoadingAssignmentResults] =
    useState(true);

  useEffect(() => {
    getAssignmentResults(options).then((results) => {
      setAssignmentResults(results);
      setIsLoadingAssignmentResults(false);
    });
  }, []);

  return (
    <>
      <Title text="Assignment Results"></Title>
      {isLoadingAssignmentResults ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Assignment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assignmentResults.map((result: AssignmentResult, index) => (
              <tr key={index}>
                <td>{result.student}</td>
                <td>{result.assignment}</td>
                <td style={{ backgroundColor: getStatusColor(result.status) }}>
                  {result.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
