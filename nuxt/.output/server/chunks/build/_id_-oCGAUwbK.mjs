import { b as useRoute, c as articles, d as createError, a as __nuxt_component_0 } from './server.mjs';
import { defineComponent, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const id = String(route.params.id);
    const article = articles.find((a) => a.id === id);
    if (!article) {
      throw createError({ statusCode: 404, statusMessage: "Article not found", fatal: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><header class="mb-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog",
        class: "btn btn-outline-primary d-inline-flex align-items-center mb-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="me-2"${_scopeId}>←</span> Back to blog `);
          } else {
            return [
              createVNode("span", { class: "me-2" }, "←"),
              createTextVNode(" Back to blog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="h2">${ssrInterpolate(unref(article).title)}</h1><p class="text-body-secondary mb-0">By ${ssrInterpolate(unref(article).author)} · ${ssrInterpolate(unref(article).date)}</p></header>`);
      if (unref(article).image) {
        _push(`<img${ssrRenderAttr("src", unref(article).image)}${ssrRenderAttr("alt", unref(article).title)} class="img-fluid rounded mb-4">`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-4"><!--[-->`);
      ssrRenderList(unref(article).content.split("\n"), (line, idx) => {
        _push(`<p>${ssrInterpolate(line)}</p>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-oCGAUwbK.mjs.map
