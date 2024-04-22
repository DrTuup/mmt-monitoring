import { getAssignments } from "./getAssignments";
import { OctokitOptions } from "./options";

export async function getAssignmentName(options: OctokitOptions, repo: string) {
  const json = await getAssignments(options);

  let result = json.filter((assignment: any) =>
    repo.toLowerCase().includes(assignment.name.toLowerCase())
  );

  if (result.length == 0) return ""; //throw new Error(`no assignment info found for ${repo}`)
  if (result.length == 2) return result[1].name;
  return result[0].name;
}
