<template>
  <div class="d-flex min-vh-100 flex-column bg-white">
    <header class="sticky-top border-bottom bg-white shadow-sm">
      <div class="container d-flex flex-wrap align-items-center justify-content-between gap-3 py-3">
        <NuxtLink class="text-decoration-none d-flex align-items-center gap-2" to="/">
          <span class="fw-black fs-5 text-dark tracking-wide">PETLY.CO</span>
        </NuxtLink>

        <nav aria-label="Main">
          <ul class="nav mb-0 align-items-center gap-1">
            <li class="nav-item">
              <NuxtLink class="nav-link px-3 py-2 rounded text-secondary fw-medium" to="/" active-class="active text-dark bg-light">
                Home
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link px-3 py-2 rounded text-secondary fw-medium" to="/domesticAnimals" active-class="active text-dark bg-light">
                Domestic Animals
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link px-3 py-2 rounded text-secondary fw-medium" to="/blog" active-class="active text-dark bg-light">
                Blog
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link px-3 py-2 rounded text-secondary fw-medium" to="/information" active-class="active text-dark bg-light">
                Information
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="container flex-grow-1 py-4">
      <NuxtPage />
    </main>

    <footer class="mt-5 border-top pt-5 pb-4">
      <div class="container">
        <div class="row g-4">
          <div class="col-12 col-md-5">
            <h2 class="fw-black fs-4 mb-3">PETLY.CO</h2>
            <p class="text-secondary small" style="max-width: 320px;">
              Find what other people think about your domestic animals and say something about them too.
            </p>
          </div>

          <div class="col-6 col-md-3">
            <h3 class="fw-semibold small mb-3">Company</h3>
            <ul class="list-unstyled text-secondary small">
              <li class="mb-2" style="cursor: pointer;">About</li>
              <li class="mb-2" style="cursor: pointer;">Features</li>
              <li class="mb-2" style="cursor: pointer;">Works</li>
              <li class="mb-2" style="cursor: pointer;">Career</li>
            </ul>
          </div>

          <div class="col-6 col-md-3">
            <h3 class="fw-semibold small mb-3">Help</h3>
            <ul class="list-unstyled text-secondary small">
              <li class="mb-2" style="cursor: pointer;">Customer Support</li>
              <li class="mb-2" style="cursor: pointer;">My Account</li>
              <li class="mb-2" style="cursor: pointer;">Terms & Conditions</li>
              <li class="mb-2" style="cursor: pointer;">Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div class="border-top mt-4 pt-3 text-secondary" style="font-size: 0.75rem;">
          Petly 2026. All Rights Reserved
        </div>
      </div>
    </footer>
  </div>
</template>