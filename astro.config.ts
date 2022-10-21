import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import svelte from "@astrojs/svelte";

type Node = {
  type: string
  tagName?: string
  children?: Node[]
  properties: { [key: string]: any, src?: string }
}



// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx({
      rehypePlugins: [
        function () {
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

      ]
    }),
    // sitemap({
    //   filter(page) {
    //     console.log(this);
    //     console.log(page);
    //     return true
    //   }
    // })
    // ,
    svelte()]
});