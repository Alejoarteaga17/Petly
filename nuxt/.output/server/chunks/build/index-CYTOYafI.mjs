import { _ as _export_sfc, a as __nuxt_component_0 } from './server.mjs';
import { withCtx, createVNode, useSSRContext } from 'vue';
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
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="h2 mb-1">Information</h1><p class="text-body-secondary mb-4">Learn more about Petly and find answers to common questions.</p><div class="list-group">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/information/about",
    class: "list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}><div class="fw-medium"${_scopeId}>About</div><div class="small text-body-secondary"${_scopeId}>Who we are and what Petly is all about</div></div><span class="text-body-secondary"${_scopeId}>→</span>`);
      } else {
        return [
          createVNode("div", null, [
            createVNode("div", { class: "fw-medium" }, "About"),
            createVNode("div", { class: "small text-body-secondary" }, "Who we are and what Petly is all about")
          ]),
          createVNode("span", { class: "text-body-secondary" }, "→")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/information/faq",
    class: "list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}><div class="fw-medium"${_scopeId}>FAQ</div><div class="small text-body-secondary"${_scopeId}>Frequently asked questions about domestic animals</div></div><span class="text-body-secondary"${_scopeId}>→</span>`);
      } else {
        return [
          createVNode("div", null, [
            createVNode("div", { class: "fw-medium" }, "FAQ"),
            createVNode("div", { class: "small text-body-secondary" }, "Frequently asked questions about domestic animals")
          ]),
          createVNode("span", { class: "text-body-secondary" }, "→")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/information/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-CYTOYafI.mjs.map
