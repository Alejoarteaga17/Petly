import { a as __nuxt_component_0 } from './server.mjs';
import { defineComponent, withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-D4gaZVee.mjs';
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
import '@vue/shared';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/domesticAnimals",
      "$FbrGH7EI7v"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const domesticAnimals = data?.value?.domesticAnimals || [];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="h2 mb-3">Domestic Animals</h1><ul class="list-group"><!--[-->`);
      ssrRenderList(unref(domesticAnimals), (domesticAnimal) => {
        _push(`<li class="list-group-item position-relative">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "stretched-link text-decoration-none fw-medium",
          to: `/domesticAnimals/${domesticAnimal.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(domesticAnimal.breed)}`);
            } else {
              return [
                createTextVNode(toDisplayString(domesticAnimal.breed), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<span class="text-body-secondary d-block small">${ssrInterpolate(domesticAnimal.countryOrigin)} · ${ssrInterpolate(domesticAnimal.lifeExpectancy)}</span></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/domesticAnimals/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BQl80Uw4.mjs.map
