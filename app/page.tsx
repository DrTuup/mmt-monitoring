"use client";

import { useEffect, useState } from "react";
import { getGitHubHandles } from "@/api/githubHandles";

// components
import Title from "@/components/title";
import options from "@/api/options";

export default function Home() {
  const [githubHandles, setGitHubHandles] = useState([]);
  useEffect(() => {
    getGitHubHandles(options).then((handles) => {
      setGitHubHandles(handles);
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
    </>
  );
}
