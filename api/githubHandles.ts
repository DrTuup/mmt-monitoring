export async function getGitHubHandles(options: any) {
  let result = await options.octokit.repos.getContent({
    owner: options.org,
    repo: options.repo,
    path: options.path,
  });

  let content = Buffer.from(result.data.content, "base64").toString("utf-8");
  let jsonContent = JSON.parse(content);
  jsonContent = jsonContent.map((item: GithubHandle) => {
    return {
      handle: item.handle,
      class: item.class,
      firstname: item.firstname,
      lastname: item.lastname,
    };
  });
  return jsonContent;
}
