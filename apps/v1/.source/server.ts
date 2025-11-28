// @ts-nocheck
import * as __fd_glob_20 from "../content/docs/benchmark/time.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/benchmark/teds.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/benchmark/nid.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/benchmark/mhs.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/benchmark/index.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/benchmark/energy.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/upcoming-roadmap.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/tagged-pdf.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/quick-start-python.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/quick-start-nodejs.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/quick-start-java.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/quick-start-docker.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/license.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/json-schema.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/development-workflow.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/contributing.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/community.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/ai-safety.mdx?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/benchmark/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "benchmark/meta.json": __fd_glob_1, }, {"ai-safety.mdx": __fd_glob_2, "community.mdx": __fd_glob_3, "contributing.mdx": __fd_glob_4, "development-workflow.mdx": __fd_glob_5, "index.mdx": __fd_glob_6, "json-schema.mdx": __fd_glob_7, "license.mdx": __fd_glob_8, "quick-start-docker.mdx": __fd_glob_9, "quick-start-java.mdx": __fd_glob_10, "quick-start-nodejs.mdx": __fd_glob_11, "quick-start-python.mdx": __fd_glob_12, "tagged-pdf.mdx": __fd_glob_13, "upcoming-roadmap.mdx": __fd_glob_14, "benchmark/energy.mdx": __fd_glob_15, "benchmark/index.mdx": __fd_glob_16, "benchmark/mhs.mdx": __fd_glob_17, "benchmark/nid.mdx": __fd_glob_18, "benchmark/teds.mdx": __fd_glob_19, "benchmark/time.mdx": __fd_glob_20, });