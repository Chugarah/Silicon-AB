export default {
  extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],
  rules: {
    // Lägg till anpassade regler här
  },
  overrides: [
    {
      files: ["**/*.vue"],
      customSyntax: "postcss-html",
    },
  ],
};
