<template>
  <section class="relative overflow-hidden bg-[#fff8f1] py-12 sm:py-16 lg:py-20">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.18),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.12),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.9),_rgba(255,248,241,1))]"></div>
    <div class="absolute left-6 top-10 hidden h-24 w-24 rounded-full bg-orange-300/20 blur-2xl sm:block"></div>
    <div class="absolute bottom-10 right-10 hidden h-32 w-32 rounded-full bg-amber-300/20 blur-3xl sm:block"></div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div class="space-y-8">
          <div class="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/85 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm backdrop-blur">
            <span class="h-2 w-2 rounded-full bg-orange-500"></span>
            Welcome to Petly
          </div>

          <div class="space-y-5">
            <h1 class="max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              A warm, playful space to discover domestic animals.
            </h1>
            <p class="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Explore animal profiles, read reviews, and keep everything organized in one place.
              Petly is built to feel friendly, clear, and easy to navigate from the first click.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <RouterLink
              :to="{ name: 'domesticAnimals' }"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-300"
            >
              <span>Get to know our animals</span>
              <span aria-hidden="true">&rarr;</span>
            </RouterLink>

            <RouterLink
              :to="{ name: 'information' }"
              class="inline-flex items-center justify-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50"
            >
              Learn more
            </RouterLink>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <div class="rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-sm backdrop-blur">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Discover</p>
              <p class="mt-2 text-sm leading-6 text-slate-600">
                Browse animals with clear information and images.
              </p>
            </div>

            <div class="rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-sm backdrop-blur">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Review</p>
              <p class="mt-2 text-sm leading-6 text-slate-600">
                Share opinions and ratings with other users.
              </p>
            </div>

            <div class="rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-sm backdrop-blur">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Manage</p>
              <p class="mt-2 text-sm leading-6 text-slate-600">
                Keep users, categories, and animals organized from one dashboard.
              </p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-orange-200/50 via-white to-amber-200/40 blur-2xl"></div>
          <div class="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-4 shadow-2xl shadow-orange-100/70">
            <div class="relative overflow-hidden rounded-[1.5rem]">
              <img
                src="https://english4kidsonline.com/wp-content/uploads/2023/11/cute-pet-collage-isolated.jpg"
                alt="Cute pet collage"
                class="h-[420px] w-full object-cover sm:h-[500px]"
              />
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent p-5 text-white">
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-orange-200">Featured moments</p>
                <p class="mt-2 max-w-md text-sm leading-6 text-white/90">
                  A softer, more inviting home page that sets the tone for the whole experience.
                </p>
              </div>
            </div>
          </div>

          <div class="absolute -left-3 top-8 hidden rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg shadow-orange-100 backdrop-blur sm:block">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Curated</p>
            <p class="mt-1 text-sm text-slate-700">Profiles, reviews, and insights</p>
          </div>

          <div class="absolute -bottom-4 right-4 hidden rounded-2xl border border-white/70 bg-slate-900 px-4 py-3 text-white shadow-lg shadow-slate-300/40 sm:block">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Ready</p>
            <p class="mt-1 text-sm text-white/90">Explore animals in seconds</p>
          </div>
        </div>
      </div>

      <div class="mt-14 grid gap-6 md:grid-cols-3">
        <div class="rounded-[1.75rem] border border-orange-100 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h3 class="text-lg font-bold text-slate-900">Clean navigation</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            Move quickly between the catalog, profile, and admin tools without extra complexity.
          </p>
        </div>

        <div class="rounded-[1.75rem] border border-orange-100 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h3 class="text-lg font-bold text-slate-900">Useful data</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            See categories, popularity, and user activity organized in a friendly dashboard.
          </p>
        </div>

        <div class="rounded-[1.75rem] border border-orange-100 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h3 class="text-lg font-bold text-slate-900">Built for growth</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            The project is structured so new features can be added with minimal friction.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
