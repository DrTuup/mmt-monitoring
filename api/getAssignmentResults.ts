import { getAllRepos } from "./getAllRepos";
import { getAssignmentName } from "./getAssignmentName";
import { getAssignments } from "./getAssignments";
import { getStudent } from "./getStudent";
import { OctokitOptions } from "./options";

export async function getAssignmentResults(options: OctokitOptions) {
  let repos = await getAllRepos(options);

  repos = repos.filter((repo) => {
    return (
      !(repo as any).name.includes("github-handles") &&
      !(repo as any).name.includes("startercode")
    );
  });

  console.log(repos);

  let arrResults: AssignmentResult[] = [];

  // for await (let repo of repos) {
  //   let pr = await options.octokit.pulls.list({
  //     owner: (repo as any).owner.login,
  //     repo: (repo as any).name,
  //     state: "all",
  //   });

  //   // what is the status of the PR?
  //   let status = "";
  //   if (pr.data.length) {
  //     let merged = typeof pr.data[pr.data.length - 1].merged_at === "string";
  //     if (merged) {
  //       status = "approved";
  //     } else {
  //       status = "submitted";
  //     }
  //   } else {
  //     status = "accepted";
  //   }
  // }

  return arrResults;
}
