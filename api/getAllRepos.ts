import { Repo } from "@/types/repo";
import { OctokitOptions } from "./options";

let repos: Repo[];

export async function getAllRepos(options: OctokitOptions) {
  if (repos) {
    return repos;
  }

  let org_repos: Repo[] = await options.octokit.paginate(
    "GET /orgs/{org}/repos",
    { org: options.org, per_page: 100 },
    (response, done) => {
      return response.data as Repo[];
    }
  );
  repos = org_repos;
  return org_repos;
}
