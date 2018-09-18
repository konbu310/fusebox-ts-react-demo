const { context, src, task } = require("fuse-box/sparky");
const {
  FuseBox,
  WebIndexPlugin,
  StylusPlugin,
  LESSPlugin,
  CSSResourcePlugin,
  CSSPlugin,
  SVGPlugin,
  QuantumPlugin
} = require("fuse-box");
const path = require("path");

task("default", async context => {
  await context.clean();
  await context.dev();
});

task("prod", async context => {
  await context.clean();
  await context.prod();
});

context(
  class {
    // general settings
    setConfig() {
      return FuseBox.init({
        homeDir: "src/",
        output: "dist/$name.js",
        target: "browser@es6",
        plugins: [
          [
            LESSPlugin({
              javascriptEnabled: true
            }),
            CSSResourcePlugin(),
            CSSPlugin()
          ],
          [
            StylusPlugin({
              compress: true
            }),
            CSSResourcePlugin(),
            CSSPlugin()
          ],
          SVGPlugin(),
          WebIndexPlugin({ template: "src/client/html/index.html" }),
          this.isProduction &&
            QuantumPlugin({
              bakeApiIntoBundle: "app",
              css: true,
              uglify: true
            })
        ]
      });
    }
    // clean dist directory
    async clean() {
      await src("dist")
        .clean("dist/")
        .exec();
    }
    // develop build
    dev() {
      const fuse = this.setConfig();
      fuse.dev();
      fuse
        .bundle("app")
        .watch()
        .hmr()
        .instructions("> client/js/index.tsx");
      return fuse.run();
    }
    // production build
    prod() {
      this.isProduction = true;
      const fuse = this.setConfig();
      fuse.bundle("app").instructions("> client/js/index.tsx");
      return fuse.run();
    }
  }
);
