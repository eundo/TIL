// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const siteUrl = process.env.URL || 'https://eundo.today';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Eundo's Today",
  tagline: 'Today I Learned',
  favicon: 'img/ed1.png',

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
          editUrl: function ({versionDocsDirPath, docPath}) {
            return `https://github.com/eundo/TIL/edit/main/${versionDocsDirPath}/${docPath}`;
          },
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/eundo/TIL/edit/main/blog/',
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
        image: 'img/ped1.png',
        navbar: {
          title: "Eundo's Today",
          logo: {
            alt: "Eundo's Today Logo",
            src: 'img/ed1.png',
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
              sidebarId: 'tilSidebar',
              position: 'left',
              label: 'TIL',
            },
            { to: '/blog/dev-story', label: 'Dev Story', position: 'left' },
            {
              type: 'docSidebar',
              sidebarId: 'projectSidebar',
              position: 'left',
              label: 'Project',
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
              title: 'Content',
              items: [
                {
                  label: 'About Me',
                  to: '/docs/aboutMe/PARK%20EUNDO',
                },
                {
                  label: 'TIL',
                  to: '/docs/til/intro',
                },
                {
                  label: 'Project',
                  to: '/docs/project',
                },
              ],
            },
            {
              title: 'Posts',
              items: [
                {
                  label: 'Dev Story',
                  to: '/blog/dev-story',
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
          copyright: `© ${new Date().getFullYear()} Eundo's Today. All rights reserved. Built with ❤️ using Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: ['java'],
        },
      }),
};

module.exports = config;
