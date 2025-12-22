export const revalidate = false;

const LLMS_TXT = `# OpenDataLoader PDF

> Fast, accurate PDF parsing for RAG and LLM pipelines. 100% local, no GPU required.

## What is OpenDataLoader PDF?

OpenDataLoader PDF is an open-source PDF parser designed specifically for RAG (Retrieval-Augmented Generation) pipelines. It converts PDFs to LLM-ready Markdown and JSON with:

- 91% reading order accuracy (XY-Cut++ algorithm)
- 0.05s per page processing speed
- Bounding boxes for every element (for citations)
- 100% local processing (no network calls)
- Deterministic output (same input = same output)

## Quick Start

\`\`\`bash
pip install -U opendataloader-pdf
\`\`\`

\`\`\`python
import opendataloader_pdf

opendataloader_pdf.convert(
    input_path=["document.pdf"],
    output_dir="output/",
    format="json,markdown"
)
\`\`\`

## Documentation

For complete documentation, see: https://opendataloader.org/docs

For full documentation in LLM-readable format, see: https://opendataloader.org/llms-full.txt

## Links

- Website: https://opendataloader.org
- Documentation: https://opendataloader.org/docs
- GitHub: https://github.com/opendataloader-project/opendataloader-pdf
- PyPI: https://pypi.org/project/opendataloader-pdf/
- npm: https://www.npmjs.com/package/@opendataloader/pdf
`;

export async function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
