/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY ?? "";
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? "";
const repoName = repository.split("/")[1] ?? "";
const isUserSite =
  repoName &&
  owner &&
  repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const basePath = isGithubActions && !isUserSite ? `/${repoName}` : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : ""
};

module.exports = nextConfig;
