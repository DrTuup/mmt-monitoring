import { getAllRepos } from "./getAllRepos";
import { getAssignmentName } from "./getAssignmentName";
import { getStudent } from "./getStudent";
import { OctokitOptions } from "./options";

export async function getAssignmentResults(options: OctokitOptions) {
  let orgrepos = await getAllRepos(options);
  orgrepos = orgrepos.filter((repo) => {
    return (
      !(repo as any).name.includes("-startercode") &&
      !(repo as any).name.includes("github-handles")
    );
  });

  let arrResults = [];

  for await (let repo of orgrepos) {
    let pr = await options.octokit.pulls.list({
      owner: (repo as any).owner.login,
      repo: (repo as any).name,
      state: "all",
    });

    // what is the status of the PR?
    let status = "";
    if (pr.data.length) {
      let merged = typeof pr.data[pr.data.length - 1].merged_at === "string";
      if (merged) {
        status = "approved";
      } else {
        status = "submitted";
      }
    } else {
      status = "accepted";
    }
    let email = await getStudent(repo.name, options);
    if (email == "") {
      email = repo.html_url;
    }
    let assignment = await getAssignmentName(options, repo.html_url);
    if (assignment == "") {
      assignment = repo.html_url;
    }

    let objTemp = { student: "", assignment: "", status: "" };
    objTemp.status = status;
    objTemp.student = email;
    objTemp.assignment = assignment;
    arrResults.push(objTemp);
  }

  return arrResults;
}
