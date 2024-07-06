import { getAllRepos } from "./getAllRepos";
import { OctokitOptions } from "./options";

export async function getAssignments(options: OctokitOptions) {
  let org_repos = await getAllRepos(options);

  let arrAssignments = [];
  for await (let repo of org_repos) {
    let releases: any = await options.octokit.repos.listReleases({
      owner: repo.owner.login,
      repo: repo.name,
    });
    releases = releases.data;

    // if there are releases, add the assignment to the list
    if (releases.length > 0) {
      arrAssignments.push({
        name: repo.name.replace("-startercode", ""),
        order: releases[releases.length - 1]?.tag_name.toLowerCase(),
      });
    }
  }

  return arrAssignments;
}
