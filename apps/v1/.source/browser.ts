// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"ai-safety.mdx": () => import("../content/docs/ai-safety.mdx?collection=docs"), "community.mdx": () => import("../content/docs/community.mdx?collection=docs"), "contributing.mdx": () => import("../content/docs/contributing.mdx?collection=docs"), "development-workflow.mdx": () => import("../content/docs/development-workflow.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "json-schema.mdx": () => import("../content/docs/json-schema.mdx?collection=docs"), "license.mdx": () => import("../content/docs/license.mdx?collection=docs"), "quick-start-docker.mdx": () => import("../content/docs/quick-start-docker.mdx?collection=docs"), "quick-start-java.mdx": () => import("../content/docs/quick-start-java.mdx?collection=docs"), "quick-start-nodejs.mdx": () => import("../content/docs/quick-start-nodejs.mdx?collection=docs"), "quick-start-python.mdx": () => import("../content/docs/quick-start-python.mdx?collection=docs"), "tagged-pdf.mdx": () => import("../content/docs/tagged-pdf.mdx?collection=docs"), "upcoming-roadmap.mdx": () => import("../content/docs/upcoming-roadmap.mdx?collection=docs"), "benchmark/energy.mdx": () => import("../content/docs/benchmark/energy.mdx?collection=docs"), "benchmark/index.mdx": () => import("../content/docs/benchmark/index.mdx?collection=docs"), "benchmark/mhs.mdx": () => import("../content/docs/benchmark/mhs.mdx?collection=docs"), "benchmark/nid.mdx": () => import("../content/docs/benchmark/nid.mdx?collection=docs"), "benchmark/teds.mdx": () => import("../content/docs/benchmark/teds.mdx?collection=docs"), "benchmark/time.mdx": () => import("../content/docs/benchmark/time.mdx?collection=docs"), }),
};
export default browserCollections;