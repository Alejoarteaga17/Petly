import { c as articles, a as __nuxt_component_0 } from './server.mjs';
import { defineComponent, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><header class="mb-4"><h1 class="h2">Blog</h1><p class="text-body-secondary">Latest articles on the care and handling of domestic animals.</p></header><div class="list-group"><!--[-->`);
      ssrRenderList(unref(articles), (article) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: article.id,
          to: `/blog/${article.id}`,
          class: "list-group-item list-group-item-action"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="d-flex w-100 justify-content-between"${_scopeId}><h5 class="mb-1"${_scopeId}>${ssrInterpolate(article.title)}</h5><small class="text-body-secondary"${_scopeId}>${ssrInterpolate(article.date)}</small></div><p class="mb-1"${_scopeId}>${ssrInterpolate(article.excerpt)}</p><small class="text-body-secondary"${_scopeId}>By ${ssrInterpolate(article.author)}</small>`);
            } else {
              return [
                createVNode("div", { class: "d-flex w-100 justify-content-between" }, [
                  createVNode("h5", { class: "mb-1" }, toDisplayString(article.title), 1),
                  createVNode("small", { class: "text-body-secondary" }, toDisplayString(article.date), 1)
                ]),
                createVNode("p", { class: "mb-1" }, toDisplayString(article.excerpt), 1),
                createVNode("small", { class: "text-body-secondary" }, "By " + toDisplayString(article.author), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DYnoCy3K.mjs.map
