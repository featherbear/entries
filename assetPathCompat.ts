type Node = {
    type: string
    tagName?: string
    children?: Node[]
    properties: { [key: string]: any, src?: string }
}

export default function () {
    function visit(node: Node) {
        if (node.tagName === 'img') {
            // ../../../public/assets/[image].png
            // -> ../../assets/[image].png
            node.properties.src = node.properties.src.replace(/^(\.\.\/){2}(\.\.\/public)/, '$1')
        } else (node?.children ?? []).forEach(visit)
    }

    return function (tree, file) {
        visit(tree)
    }
}
