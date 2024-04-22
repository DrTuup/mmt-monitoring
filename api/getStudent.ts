import { getGitHubHandles } from "./getGithubHandles";
import { OctokitOptions } from "./options";

export async function getStudent(repo: string, options: OctokitOptions) {
  let json = await getGitHubHandles(options);

  json = json.filter((gh: any) =>
    repo.toLowerCase().endsWith(`-${gh.handle.toLowerCase()}`)
  );

  return json[0]?.email;
}
