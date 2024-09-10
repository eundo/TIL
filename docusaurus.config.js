// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Eundo's Today",
  tagline: 'Today I Learned',
  favicon: 'img/ed1.png',

  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',

  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: function ({
                               locale,
                               version,
                               versionDocsDirPath,
                               docPath,
                               permalink,
                             }) {
            return `https://github.com/eundo/TIL/edit/main/${versionDocsDirPath}/${docPath}`;
          },
        },
        blog: {
          showReadingTime: true,
          editUrl:
              'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  headTags: [
    {
      tagName: 'script',
      attributes: {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-VG06L597YE',
      },
    },
    {
      tagName: 'script',
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VG06L597YE');
      `,
    },
  ],
  themeConfig:
      ({
        image: '/static/img/ped1.jpg',
        navbar: {
          title: "Eundo's Today",
          logo: {
            alt: 'My Site Logo',
            src: 'img/ed1.png',
          },
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'aboutMeSidebar',
              position: 'left',
              label: 'About Me',
            },
            { to: '/blog/dev-story', label: 'Dev Story', position: 'left' },
            {
              type: 'docSidebar',
              sidebarId: 'devStorySidebar',
              position: 'left',
              label: 'Tech',
            },
          //  { to: '/blog/miscellaneous', label: 'Miscellaneous', position: 'left' },
            {
              href: 'https://github.com/eundo/TIL',
              label: 'GitHub',
              position: 'right',
            },
          ],
          // items: [
          //   {
          //     type: 'docSidebar',
          //     sidebarId: 'tutorialSidebar',
          //     position: 'left',
          //     label: 'Docs',
          //   },
          //   {to: '/blog', label: 'Blog', position: 'left'}, // Blog 메뉴 추가
          //   {to: '/docs/til/2023/intro', label: 'TIL 2023', position: 'left'}, // TIL 2023 메뉴 추가
          //   {
          //     href: 'https://github.com/eundo/TIL',
          //     label: 'GitHub',
          //     position: 'right',
          //   },
          // ],
        },
        googleAnalytics: {
          trackingID: 'G-VG06L597YE',
          anonymizeIP: false, // 선택 사항: IP 익명화 설정
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Docs',
              items: [
                {
                  label: 'Tutorial',
                  to: '/docs/intro',
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'Stack Overflow',
                  href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                },
                {
                  label: 'Discord',
                  href: 'https://discordapp.com/invite/docusaurus',
                },
                {
                  label: 'Twitter',
                  href: 'https://twitter.com/docusaurus',
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
          theme: require('prism-react-renderer/themes/github'), // Light Theme
          darkTheme: require('prism-react-renderer/themes/dracula'), // Dark Theme
          additionalLanguages: ['java'], // 필요한 언어 추가
          // theme: lightCodeTheme,
          // darkTheme: darkCodeTheme,
          // additionalLanguages: ['java'], // 필요에 따라 추가 언어
        },

        // prism: {
        //   theme: require('prism-react-renderer/themes/dracula'), // 원하는 테마 선택
        //
        // },
        customCss: require.resolve('./src/css/custom.css'),
      }),
};

module.exports = config;
