import { getAllRepos } from "./getAllRepos";
import { OctokitOptions } from "./options";

export async function getAssignments(options: OctokitOptions) {
  let octokit = options.octokit;

  let org_repos = await getAllRepos(options);

  let arrAssignments = [];
  for await (let repo of org_repos) {
    try {
      // if there is no release (eg. final-startercode), skip this repo
      let releases: any = await octokit.repos.listReleases({
        owner: repo.owner.login,
        repo: repo.name,
      });
      releases = releases.data;

      arrAssignments.push({
        name: repo.name.replace("-startercode", ""),
        order: releases[releases.length - 1].tag_name.toLowerCase(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return arrAssignments;
}
