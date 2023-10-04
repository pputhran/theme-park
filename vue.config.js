    const { defineConfig } = require("@vue/cli-service");
const { ProvidePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
module.exports = defineConfig({
    runtimeCompiler: true,
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: (config) => {
        config.devtool = "source-map";
        config.resolve.symlinks = false;
        config.resolve.fallback = {
            path: require.resolve("path-browserify"),
        };
        config.plugins.push(new ProvidePlugin({ Buffer: ["buffer", "Buffer"] }));
        config.plugins.push(new ProvidePlugin({ process: ["process/browser"] }));
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: "disabled",
            })
        );
    },
});

