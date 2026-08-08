#!/usr/bin/env node

const title = process.argv[2] ?? "";
const conventionalTitle = /^(?:feat|fix|perf|refactor|docs|test|build|ci|chore|revert)(?:\([^\r\n)]+\))?!?:\s+\S.*$/;

if (!conventionalTitle.test(title)) {
  console.error(
    "PR title must be a Conventional Commit, for example: feat(sdk): add typed client",
  );
  process.exitCode = 1;
}
