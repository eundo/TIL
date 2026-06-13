// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const siteUrl = process.env.URL || 'https://eundo.today';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Eundo Park Portfolio',
  tagline: 'Product-minded full-stack developer',
  favicon: 'img/brand-mark.svg',

  url: siteUrl,
  baseUrl: '/',

  organizationName: 'eundo',
  projectName: 'TIL',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-VG06L597YE',
          anonymizeIP: true,
        },
      }),
    ],
  ],
  themeConfig:
      ({
        image: 'img/brand-social.svg',
        navbar: {
          title: 'eundo.today',
          logo: {
            alt: 'eundo.today brand mark',
            src: 'img/brand-mark.svg',
          },
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'aboutMeSidebar',
              position: 'left',
              label: 'About Me',
            },
            {
              type: 'docSidebar',
              sidebarId: 'projectSidebar',
              position: 'left',
              label: 'Projects',
            },
            { to: '/blog/dev-story', label: 'Dev Story', position: 'left' },
            {
              type: 'dropdown',
              position: 'left',
              label: 'Notes',
              items: [
                {
                  label: 'TIL',
                  to: '/docs/til/intro',
                },
                {
                  label: 'Book Notes',
                  to: '/docs/book',
                },
              ],
            },
            {
              href: 'https://github.com/eundo/TIL',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Portfolio',
              items: [
                {
                  label: 'About Me',
                  to: '/docs/aboutMe/PARK%20EUNDO',
                },
                {
                  label: 'Projects',
                  to: '/docs/project',
                },
                {
                  label: 'Dev Story',
                  to: '/blog/dev-story',
                },
              ],
            },
            {
              title: 'Notes',
              items: [
                {
                  label: 'TIL',
                  to: '/docs/til/intro',
                },
                {
                  label: 'Book Notes',
                  to: '/docs/book',
                },
              ],
            },
            {
              title: 'More',
              items: [
                {
                  label: 'Blog',
                  to: '/blog',
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/eundo/TIL',
                },
                {
                  html: `
                <a href="https://www.netlify.com" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Netlify">
                  <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" />
                </a>
              `,
                },
              ],
            },
          ],
          copyright: `Copyright ${new Date().getFullYear()} Eundo Park. Built with Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: ['java'],
        },
      }),
};

module.exports = config;
