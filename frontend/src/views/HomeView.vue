<template>
  <section
    class="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-amber-50 py-12 sm:py-16"
  >
    <div
      class="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.18),_transparent_70%)]"
    ></div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-10 lg:grid-cols-2">
        <div class="space-y-6">
          <span
            class="inline-flex rounded-full border border-orange-200 bg-white px-4 py-1 text-sm font-semibold text-orange-700 shadow-sm"
          >
            Welcome to Petly
          </span>

          <div class="space-y-4">
            <h1 class="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              A friendly place to discover and manage domestic animals.
            </h1>
            <p class="max-w-xl text-lg leading-8 text-gray-600">
              Petly helps you explore domestic animals, leave reviews, and manage content from a
              clean admin dashboard. It is designed to keep everything simple, organized, and easy
              to use.
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <div class="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
              <p class="text-sm font-semibold text-orange-700">Discover</p>
              <p class="mt-1 text-sm text-gray-600">
                Browse animals with clear information and images.
              </p>
            </div>

            <div class="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
              <p class="text-sm font-semibold text-orange-700">Review</p>
              <p class="mt-1 text-sm text-gray-600">Share opinions and ratings with other users.</p>
            </div>

            <div class="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
              <p class="text-sm font-semibold text-orange-700">Manage</p>
              <p class="mt-1 text-sm text-gray-600">
                Admins can organize users and animals from one place.
              </p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -inset-4 rounded-[2rem] bg-orange-200/30 blur-3xl"></div>
          <div
            class="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white p-4 shadow-2xl"
          >
            <img
              src="https://english4kidsonline.com/wp-content/uploads/2023/11/cute-pet-collage-isolated.jpg"
              alt="Cute pet collage"
              class="h-[420px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900">Clean navigation</h3>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            Move quickly between the catalog, profile, and admin tools without extra complexity.
          </p>
        </div>

        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900">Useful data</h3>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            See categories, popularity, and user activity organized in a friendly dashboard.
          </p>
        </div>

        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900">Built for growth</h3>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            The project is structured so new features can be added with minimal friction.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
