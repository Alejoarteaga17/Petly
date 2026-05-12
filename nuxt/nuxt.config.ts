// https://nuxt.com/docs/api/configuration/nuxt-config 
export default defineNuxtConfig({ 
  compatibilityDate: '2025-07-15', 
  devtools: { enabled: true },
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT || 3001)
  },
  routeRules: {
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    
    '/domesticAnimals': { ssr: true },
    '/domesticAnimals/**': { ssr: true },
    
    '/information': { ssr: false },
    '/information/**': { ssr: false },
    
    '/': { ssr: true },
  },
  nitro: {
    prerender: {
      routes: ['/blog', '/blog/1', '/blog/2', '/blog/3']
    }
  }, 
  app: { 
    head: { 
      link: [ 
        { 
          rel: 'stylesheet', 
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', 
          integrity: 
            'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH', 
          crossorigin: 'anonymous', 
        }, 
      ], 
      script: [ 
        { 
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', 
          integrity: 
            'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz', 
          crossorigin: 'anonymous', 
          defer: true, 
        }, 
      ], 
    }, 
  }, 
}) 