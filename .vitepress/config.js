import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'Nikogin Framework',
    description: 'WordPress plugin development framework',
    base: '/docs/',

    themeConfig: {
        logo: '/logo.svg',
        nav: [
            { text: 'Guide',    link: '/guide/introduction' },
            { text: 'Database', link: '/database/repository' },
            { text: 'Console',  link: '/console/commands' },
        ],

        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Introduction',        link: '/guide/introduction' },
                    { text: 'Installation',         link: '/guide/installation' },
                    { text: 'Directory Structure',  link: '/guide/directory-structure' },
                    { text: 'Lifecycle',            link: '/guide/lifecycle' },
                ],
            },
            {
                text: 'Essentials',
                items: [
                    { text: 'Configuration',     link: '/essentials/configuration' },
                    { text: 'Service Providers', link: '/essentials/service-providers' },
                    { text: 'Container',         link: '/essentials/container' },
                    { text: 'Routing',           link: '/essentials/routing' },
                ],
            },
            {
                text: 'Database',
                items: [
                    { text: 'DB Repository',       link: '/database/repository' },
                    { text: 'WP Repository',        link: '/database/wp-repository' },
                    { text: 'Taxonomy Repository',  link: '/database/taxonomy-repository' },
                    { text: 'Migrations',           link: '/database/migrations' },
                ],
            },
            {
                text: 'WordPress',
                items: [
                    { text: 'Listeners',         link: '/wordpress/listeners' },
                    { text: 'Jobs',              link: '/wordpress/jobs' },
                    { text: 'Shortcodes',        link: '/wordpress/shortcodes' },
                    { text: 'Admin Controllers', link: '/wordpress/admin-controllers' },
                ],
            },
            {
                text: 'HTTP & API',
                items: [
                    { text: 'API Controllers', link: '/http/api-controllers' },
                    { text: 'HTTP Client',     link: '/http/http-client' },
                ],
            },
            {
                text: 'Frontend',
                items: [
                    { text: 'Assets (Vite)', link: '/frontend/assets' },
                    { text: 'Views',         link: '/frontend/views' },
                ],
            },
            {
                text: 'Console',
                items: [
                    { text: 'Available Commands',  link: '/console/commands' },
                    { text: 'make:repository',     link: '/console/make-repository' },
                    { text: 'make:listener',       link: '/console/make-listener' },
                    { text: 'make:controller',     link: '/console/make-controller' },
                    { text: 'make:migration',      link: '/console/make-migration' },
                    { text: 'make:job',            link: '/console/make-job' },
                    { text: 'make:shortcode',      link: '/console/make-shortcode' },
                    { text: 'make:provider',       link: '/console/make-provider' },
                ],
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/nikoginwp' },
        ],

        footer: {
            message: 'Nikogin Framework — WordPress plugin development made simple.',
        },

        search: { provider: 'local' },
    },
})
