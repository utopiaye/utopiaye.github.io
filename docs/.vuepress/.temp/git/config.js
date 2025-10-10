import { GitContributors } from "D:/pro/utopiaye.github.io/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_3d5794d33aa1c0c470638abdebb7ff4e/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "D:/pro/utopiaye.github.io/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_3d5794d33aa1c0c470638abdebb7ff4e/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
