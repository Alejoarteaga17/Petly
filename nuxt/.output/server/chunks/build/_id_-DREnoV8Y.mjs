import { b as useRoute, d as createError, a as __nuxt_component_0 } from './server.mjs';
import { defineComponent, withAsyncContext, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: response } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/domesticAnimals",
      "$VXxcBhlD1J"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const domesticAnimals = response.value?.domesticAnimals ?? response.value ?? [];
    const route = useRoute();
    const id = String(route.params.id);
    const domesticAnimal = domesticAnimals.find((d) => d.id === id);
    if (!domesticAnimal) {
      throw createError({ statusCode: 404, statusMessage: "Domestic animal not found", fatal: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(domesticAnimal)) {
        _push(`<article${ssrRenderAttrs(_attrs)}>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/domesticAnimals",
          class: "btn btn-outline-primary d-inline-flex align-items-center mb-3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="me-2"${_scopeId}>←</span> All domestic animals `);
            } else {
              return [
                createVNode("span", { class: "me-2" }, "←"),
                createTextVNode(" All domestic animals ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h1 class="h2 mb-1">${ssrInterpolate(unref(domesticAnimal).breed)}</h1><p class="text-body-secondary mb-4">${ssrInterpolate(unref(domesticAnimal).countryOrigin)} · ${ssrInterpolate(unref(domesticAnimal).lifeExpectancy)}</p><img${ssrRenderAttr("src", unref(domesticAnimal).image)}${ssrRenderAttr("alt", unref(domesticAnimal).breed)} class="img-fluid rounded mb-4" style="${ssrRenderStyle({ "max-height": "320px", "object-fit": "cover", "width": "100%" })}"><p class="lead mb-4">${ssrInterpolate(unref(domesticAnimal).description)}</p><div class="row g-3"><div class="col-6 col-md-3"><div class="border rounded p-3 text-center"><div class="small text-body-secondary mb-1">Weight</div><div class="fw-semibold">${ssrInterpolate(unref(domesticAnimal).weight)}</div></div></div><div class="col-6 col-md-3"><div class="border rounded p-3 text-center"><div class="small text-body-secondary mb-1">Height</div><div class="fw-semibold">${ssrInterpolate(unref(domesticAnimal).height)}</div></div></div><div class="col-6 col-md-3"><div class="border rounded p-3 text-center"><div class="small text-body-secondary mb-1">Life Expectancy</div><div class="fw-semibold">${ssrInterpolate(unref(domesticAnimal).lifeExpectancy)}</div></div></div><div class="col-6 col-md-3"><div class="border rounded p-3 text-center"><div class="small text-body-secondary mb-1">Origin</div><div class="fw-semibold">${ssrInterpolate(unref(domesticAnimal).countryOrigin)}</div></div></div></div><div class="mt-4"><h2 class="h5">Behaviours</h2><p class="text-body-secondary">${ssrInterpolate(unref(domesticAnimal).behaviours)}</p></div><div class="mt-3"><h2 class="h5">Common Diseases</h2><p class="text-body-secondary">${ssrInterpolate(unref(domesticAnimal).commonDisease)}</p></div><div class="mt-3"><h2 class="h5">History</h2><p class="text-body-secondary">${ssrInterpolate(unref(domesticAnimal).history)}</p></div></article>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/domesticAnimals/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DREnoV8Y.mjs.map
