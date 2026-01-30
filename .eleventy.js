module.exports = function(eleventyConfig) {
    // Copy ALL assets from src/assets/ to public/assets/
    eleventyConfig.addPassthroughCopy("src/assets");
    
    // Copy img directory for blog and newsroom images
    eleventyConfig.addPassthroughCopy("src/img");

    // Calling toml file
    eleventyConfig.addPassthroughCopy('./src/netlify.toml');
    
    // Calling blog
    eleventyConfig.addPassthroughCopy('./src/admin');

    // Blog collections
    eleventyConfig.addCollection("blog", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/blog/*.md");
    });
    
    // Newsroom collections
    eleventyConfig.addCollection("newsroom", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/newsroom/*.md");
    });
    
    // Add date filter for blog posts
    eleventyConfig.addFilter("postDate", function(dateObj) {
        return new Date(dateObj).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    });
    
    // Add excerpt filter for blog posts
    eleventyConfig.addFilter("excerpt", function(content) {
        const text = content.replace(/<[^>]*>/g, ''); // Strip HTML tags
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    });
    
    // Add date filter for meta tags
    eleventyConfig.addFilter("date", function(dateObj, format) {
        if (!dateObj) return '';
        const date = new Date(dateObj);
        if (format === 'Y-m-d') {
            return date.toISOString().split('T')[0];
        }
        return date.toISOString();
    });

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
