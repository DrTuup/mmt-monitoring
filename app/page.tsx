"use client";

import { getAssignmentResults } from "@/api/getAssignmentResults";
import { getAssignments } from "@/api/getAssignments";
import { getGitHubHandles } from "@/api/getGithubHandles";
import options from "@/api/options";
import Title from "@/components/title";
import { useEffect, useState } from "react";

export default function Home() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [githubHandles, setGithubHandles] = useState<GithubHandle[]>([]);

  useEffect(() => {
    getAssignments(options).then((assignments: Assignment[]) => {
      setAssignments(assignments);
    });

    getGitHubHandles(options).then((githubHandles: GithubHandle[]) => {
      setGithubHandles(githubHandles);
    });

    getAssignmentResults(options).then((results: AssignmentResult[]) => {
      console.log(results);
    });
  }, []);

  return (
    <>
      <Title text="Home" />
      <table>
        <thead>
          <tr>
            <th className="border-none"></th>
            {assignments.map((assignment) => (
              <th
                key={assignment.name}
                className="text-vertical rotate-180 border-none"
              >
                {assignment.order + " - " + assignment.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
}
