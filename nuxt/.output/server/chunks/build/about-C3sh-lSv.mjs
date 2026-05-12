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
  _push(`<p class="text-uppercase text-secondary small mb-2">Information</p><h1 class="fw-black mb-3">About Petly</h1><p class="lead text-secondary mb-0"> Petly is a place to discover opinions, reviews, and details about domestic animals. </p></div></div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/information/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { about as default };
//# sourceMappingURL=about-C3sh-lSv.mjs.map
