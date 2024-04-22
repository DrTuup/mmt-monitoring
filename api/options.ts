import { Octokit } from "@octokit/rest";

export type OctokitOptions = {
  octokit: Octokit;
  org: string;
  repo: string;
  path: string;
};

let octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN,
  userAgent: "mmt-monitoring-2",
});
let org: string = process.env.NEXT_PUBLIC_ORG!;
let repo: string = process.env.NEXT_PUBLIC_GH_HANDLES_REPO!;
let path: string = process.env.NEXT_PUBLIC_GH_HANDLES_PATH!;
let options: OctokitOptions;

export default options = {
  octokit,
  org,
  repo,
  path,
};
