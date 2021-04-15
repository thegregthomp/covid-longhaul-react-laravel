const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .react()
    .sass("resources/sass/app.scss", "public/css")
    .options({
        autoprefixer: {
            options: {
                browsers: ["last 6 versions"]
            }
        },
        processCssUrls: true,
        postCss: [tailwindcss("./tailwind.config.js")]
    })
    .browserSync("127.0.0.1:8000");

mix.override(config => {
    config.module.rules = config.module.rules.map(rule => {
        if (rule.use) {
            rule.use = rule.use.map(loader => {
                if (loader.loader && loader.loader === "resolve-url-loader") {
                    loader.options.engine = "postcss";
                }
                return loader;
            });
        }
        return rule;
    });

    return config;
});
