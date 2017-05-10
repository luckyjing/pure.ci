export function makeImageName(hostname, projectId, repositoryName) {
  projectId = projectId
    .replace('-', '')
    .replace('_', '')
    .toLowerCase();
  return `${hostname}/${projectId}/${repositoryName}`;
}