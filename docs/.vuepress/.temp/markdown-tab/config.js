import { CodeTabs } from "D:/pro/utopiaye.github.io/node_modules/.pnpm/@vuepress+plugin-markdown-t_9e6679137c8e223d6aab2e8c93ff0ec4/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "D:/pro/utopiaye.github.io/node_modules/.pnpm/@vuepress+plugin-markdown-t_9e6679137c8e223d6aab2e8c93ff0ec4/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "D:/pro/utopiaye.github.io/node_modules/.pnpm/@vuepress+plugin-markdown-t_9e6679137c8e223d6aab2e8c93ff0ec4/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
