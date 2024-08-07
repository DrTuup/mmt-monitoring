import { OctokitOptions } from "./options";

export async function getGitHubHandles(options: OctokitOptions) {
  let result = await options.octokit.repos.getContent({
    owner: options.org,
    repo: options.repo,
    path: options.path,
  });

  // @ts-ignore
  let content = Buffer.from(result.data.content, "base64").toString("utf-8");
  let handles = JSON.parse(content);
  handles = handles.map((item: GithubHandle) => {
    return {
      handle: item.handle,
      class: item.class,
      firstname: item.firstname,
      lastname: item.lastname,
      email: item.email,
    };
  });
  return handles;
}
