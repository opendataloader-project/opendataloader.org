// @ts-nocheck -- skip type checking
import * as d_docs_2 from "../content/docs/my-page-2.mdx?collection=docs"
import * as d_docs_1 from "../content/docs/my-page-1.mdx?collection=docs"
import * as d_docs_0 from "../content/docs/index.mdx?collection=docs"
import { _runtime } from "fumadocs-mdx/runtime/next"
import * as _source from "../source.config"
export const docs = _runtime.docs<typeof _source.docs>([{ info: {"path":"index.mdx","fullPath":"content/docs/index.mdx"}, data: d_docs_0 }, { info: {"path":"my-page-1.mdx","fullPath":"content/docs/my-page-1.mdx"}, data: d_docs_1 }, { info: {"path":"my-page-2.mdx","fullPath":"content/docs/my-page-2.mdx"}, data: d_docs_2 }], [{"info":{"path":"meta.json","fullPath":"content/docs/meta.json"},"data":{"title":"docs","pages":["index","---section---","my-page-1","my-page-2"],"description":"The documentation","root":true}}])