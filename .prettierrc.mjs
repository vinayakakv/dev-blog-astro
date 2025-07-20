/** @type {import("prettier").Config} */
export default {
  semi: false,
  useTabs: false,
  tabWidth: 2,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
