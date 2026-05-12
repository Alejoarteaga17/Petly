import { _ as _export_sfc, a as __nuxt_component_0 } from './server.mjs';
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "container py-5" }, _attrs))}><div class="row justify-content-center"><div class="col-12 col-lg-8">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/information",
    class: "btn btn-outline-primary d-inline-flex align-items-center mb-3"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="me-2"${_scopeId}>←</span> Information `);
      } else {
        return [
          createVNode("span", { class: "me-2" }, "←"),
          createTextVNode(" Information ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p class="text-uppercase text-secondary small mb-2">Information</p><h1 class="fw-black mb-4">Frequently Asked Questions</h1><div class="vstack gap-3"><article class="border rounded-3 p-4"><h2 class="h5 mb-2">What is Petly?</h2><p class="text-secondary mb-0">Petly is a platform to discover and share opinions about domestic animals.</p></article><article class="border rounded-3 p-4"><h2 class="h5 mb-2">Can I add reviews?</h2><p class="text-secondary mb-0">Yes, you can explore the app and interact with the available animal and review sections.</p></article></div></div></div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/information/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { faq as default };
//# sourceMappingURL=faq-DOJs1Vhn.mjs.map
