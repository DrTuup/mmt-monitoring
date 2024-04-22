"use client";

import { useEffect, useState } from "react";
import { getGitHubHandles } from "@/api/getGithubHandles";

// components
import Title from "@/components/title";
import options from "@/api/options";
import { getAssignments } from "@/api/getAssignments";

export default function Home() {
  const [githubHandles, setGitHubHandles] = useState([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  useEffect(() => {
    getGitHubHandles(options).then((handles) => {
      setGitHubHandles(handles);
    });

    getAssignments(options).then((arrAssignments) => {
      setAssignments(arrAssignments);
    });
  }, []);

  return (
    <>
      <Title text="GitHub Handles"></Title>
      <table>
        <thead>
          <tr>
            <th>GitHub Handle</th>
            <th>Class</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {githubHandles.map((handle: GithubHandle, index) => (
            <tr key={index}>
              <td>{handle.handle}</td>
              <td>{handle.class}</td>
              <td>{handle.firstname}</td>
              <td>{handle.lastname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Title text="GitHub Assignments"></Title>
      <table>
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment: Assignment, index) => (
            <tr key={index}>
              <td>{assignment.name}</td>
              <td>{assignment.order}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
