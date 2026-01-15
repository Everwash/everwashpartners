module.exports = function(eleventyConfig) {
    // Copy ALL assets from src/assets/ to public/assets/
    eleventyConfig.addPassthroughCopy("src/assets");


    // Set input and output directories
    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: "public"
        },
        // Development server configuration
        serverOptions: {
            port: 5000,
            host: "0.0.0.0",
            showAllHosts: true
        }
    };
};
