import type { MarkdownHeading, MarkdownInstance } from 'astro'

interface FileBrief {
    frontmatter: Record<string, string>,
    headings: MarkdownHeading[],
    url: string
}
async function* iterate() {
    let paths = import.meta.glob('../pages/posts/*.{md,mdx}')

    for await (let file of Object.values(paths).map(f => <Promise<MarkdownInstance<any>>>(f()))) {
        yield <FileBrief>{
            frontmatter: file.frontmatter,
            headings: file.getHeadings(),
            url: file.url
        }
    }
}

export default async function () {
    let res: FileBrief[] = []
    for await (let p of iterate()) {
        res.push(p)
    }

    return res
}