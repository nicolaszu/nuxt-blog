const fs = require("fs");
const packageJson = fs.readFileSync("./package.json");
const version = JSON.parse(packageJson).version || "1.0.0";

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  env: {
    version
  },
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Inter:400,500,600&display=swap"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: true,
  /*
   ** Global CSS
   */
  css: ["~/assets/styles/highlight.scss", "~/assets/styles/app.scss"],
  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.scss"
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/vue-placeholder.js",
    "~/plugins/vue-observe-visibility.client.js",
    { src: "~/plugins/vue-tags-input.js", mode: "client", ssr: false },
    { src: "~/plugins/vue-azure-blob-upload.js", mode: "client", ssr: false },
    "~/plugins/http",
    "~/plugins/apollo-error-handler.js",
    "~/plugins/utility-components.js",
    "~/plugins/highlight.js",
    "~/plugins/globalMixin.js"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@nuxtjs/style-resources",
    "@nuxtjs/svg",
    "@nuxtjs/apollo",
    "@nuxtjs/moment",
    "@nuxtjs/dotenv",
    "@nuxtjs/tailwindcss"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxt/http", "@nuxtjs/axios"],

  // auth: {
  //   redirect: {
  //     login: "/", // redirect user when not connected
  //     callback: "/auth/signed-in"
  //   },
  //   strategies: {
  //     local: false,
  //     auth0: {
  //       domain: process.env.AUTH0_DOMAIN,
  //       client_id: process.env.AUTH0_CLIENT_ID
  //     }
  //   }
  // },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GraphQLEndpoint
      },
      errorHandler: "~/plugins/apollo-error-handler.js"
    }
  },
  styleResources: {
    scss: ["~/assets/styles/tokens.scss", "~/assets/styles/codeHighlights.scss"]
  },
  build: {
    vendor: ["@johmun/vue-tags-input"],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
