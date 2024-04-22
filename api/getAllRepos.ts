import { OctokitOptions } from "./options";

export async function getAllRepos(options: OctokitOptions) {
  let org_repos = await options.octokit.paginate(
    "GET /orgs/{org}/repos", // Fix the route parameter
    { org: options.org, per_page: 100 }, // Pass the org parameter
    (response, done) => {
      return response.data;
    }
  );
  return org_repos;
}
