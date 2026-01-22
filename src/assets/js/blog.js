// Show More functionality for blog page
document.addEventListener('DOMContentLoaded', function() {
    let articlesShown = 0;
    const showMoreBtn = document.getElementById('showMoreBtn');
    
    function showMoreArticles() {
        const articles = document.querySelectorAll('.article-container');
        let newlyShown = 0;
        
        console.log('Total articles:', articles.length);
        console.log('Articles already shown:', articlesShown);
        
        // Show next 6 articles with fade-in animation
        for (let i = articlesShown; i < articles.length && newlyShown < 6; i++) {
            if (articles[i].style.display === 'none') {
                articles[i].style.display = 'block';
                
                // Add fade-in animation with staggered delay
                setTimeout(() => {
                    articles[i].classList.add('fade-in');
                }, newlyShown * 100); // Stagger by 100ms
                
                newlyShown++;
                articlesShown++;
                console.log('Showing article:', i, articles[i]);
            }
        }
        
        console.log('Newly shown:', newlyShown);
        console.log('Total now shown:', articlesShown);
        
        // Hide button if all articles are now shown
        if (articlesShown >= articles.length) {
            showMoreBtn.style.display = 'none';
            console.log('All articles shown, hiding button');
        }
    }
    
    if (showMoreBtn) {
        console.log('Show More button found, setting up functionality');
        
        // Show first 6 articles on page load
        showMoreArticles();
        
        // Bind click event for subsequent loads
        showMoreBtn.addEventListener('click', function() {
            console.log('Show More button clicked');
            showMoreArticles();
        });
    } else {
        console.log('Show More button not found');
    }
    
    // Assign author avatars, bios, and social links based on data-author attribute
    let avatars = document.querySelectorAll(".avatar");
    let authorBio = document.querySelectorAll(".author-bio-content");
    let authorSocialMedia = document.querySelectorAll(".author-social-media");
    
    for (let i = 0; i < avatars.length; i++) {
        let author = avatars[i].getAttribute("data-author");
        
        switch (author) {
            case "Max Pulcini":
                avatars[i].src = "/img/max-pulcini.png";
                if (authorBio[i]) authorBio[i].innerText = "Max Pulcini is EverWash's Director of Marketing & Communications, where he's worked since August 2017. At EverWash, Max oversees communications strategy, content creation, press relations, and channel partnerships. A native of South Jersey, and a Philadelphia resident since 2009, Max joined EverWash following a career in journalism, which led to by-lines in Philadelphia-based publications such as Spirit News, Philadelphia City Paper, and Billy Penn, as well as national news outlets like The Daily Beast. A graduate of Temple University's School of Media and Communications, Max has an affinity for Philadelphia sports teams, gaming, cured meats, and cheeses, despite his lactose intolerance.";
                if (authorSocialMedia[i]) authorSocialMedia[i].href = "https://www.linkedin.com/in/maxpulcini/";
                break;
            case "Harriet Ayoade":
                avatars[i].src = "/img/harriet-ayoade.png";
                if (authorBio[i]) authorBio[i].innerText = "Harriet Ayoade is EverWash's Vice President of Marketing. Among her responsibilities, she oversees marketing and branding efforts. During the day, she's a big-picture, people-obsessed strategist, which she loves and couldn't imagine doing anything else. In her spare time, she indulges in her passion and writes fiction that captures her life's strange and beautiful experiences. In addition, she coaches and mentors others, emphasizing perseverance, self-care, and authenticity. If she is not exploring the world with her family, working, mentoring, or writing, she is likely watching streaming shows, exhibiting her expertise in the art of binge-watching.";
                if (authorSocialMedia[i]) authorSocialMedia[i].href = "https://www.linkedin.com/in/harrietayoade/";
                break;
            case "Nash Goudie":
                avatars[i].src = "/img/nash-goudie.png";
                if (authorBio[i]) authorBio[i].innerText = "Nash Goudie leads marketing initiatives at EverWash, bringing creativity and strategic thinking to help car wash operators grow their businesses.";
                if (authorSocialMedia[i]) authorSocialMedia[i].href = "https://www.linkedin.com/in/nashgoudie/";
                break;
            case "Yamilette Roman":
                avatars[i].src = "/img/yamilette-roman.png";
                if (authorBio[i]) authorBio[i].innerText = "Yamilette Roman is EverWash's Marketing Specialist. She handles the company's social media strategy and fosters the employee advocacy program, among various other integral aspects of the marketing realm. Hailing from the vibrant Dominican Republic, Yamilette proudly embraces her Latina heritage while effortlessly communicating in both English and Spanish. She holds a bachelor's degree in Digital Marketing from Rutgers University. During her leisure time, you'll find Yamilette immersed in the world of literature, sipping café con leche, or watching the latest anime sensations.";
                if (authorSocialMedia[i]) authorSocialMedia[i].href = "https://www.linkedin.com/in/yamilette-roman/";
                break;
            case "Ryan Caldwell":
                avatars[i].src = "/img/ryan-caldwell.jpg";
                if (authorBio[i]) authorBio[i].innerText = "Ryan Caldwell serves as EverWash's B2B Marketing Manager, and has been with EverWash since April 2019. In this capacity, Ryan takes charge of EverWash's B2B communications, marketing email automations, and brand management. With a bachelor's degree in Graphic Design from Wayne State University, he steers the visual strategy, ensuring uniformity across all marketing materials and platforms. Hailing from the Metro-Detroit area, Ryan boasts a diverse professional background, having previously ventured into various fields including graphic design, sales, customer service, convention planning, logistics, and production. In his leisure hours, Ryan unwinds by channeling his creativity into artwork, using paints, pencils, and markers, often focusing on comic book sketches. Above all else, Ryan cherishes spending quality time with his wife and two daughters. Whether it's camping, embracing the thrill of rollercoasters, or embarking on cross-country journeys in search of exciting adventures, they bond over the joy of sharing remarkable tunes along the way.";
                if (authorSocialMedia[i]) authorSocialMedia[i].href = "https://www.linkedin.com/in/ryan-caldwell-709a60244/";
                break;
            case "Mike Christie":
                avatars[i].src = "/img/mike-christie.jpg";
                if (authorBio[i]) authorBio[i].innerText = "Mike is the Vice President of EverWash Assist. He is responsible for the sales and operation of the call center division. Mike is no stranger to the business of washing cars and serving customers. For 15 years, he owned and operated two full-service car washes in Connecticut. His unique perspective and understanding of the car wash customer has been very helpful in developing EverWash's call center service.";
                if (authorSocialMedia[i]) authorSocialMedia[i].href = "https://www.linkedin.com/in/mikechristie60/";
                break;
            case "Rachel Fry":
                avatars[i].src = "/img/rachel-fry.png";
                if (authorBio[i]) authorBio[i].innerText = "Rachel Fry is a key member of the EverWash team, contributing to the company's growth and success.";
                if (authorSocialMedia[i]) authorSocialMedia[i].href = "https://www.linkedin.com/in/rachelfryhr/";
                break;
            case "Todd Rendle":
                avatars[i].src = "/img/todd-rendle.png";
                if (authorBio[i]) authorBio[i].innerText = "Todd Rendle serves as President and CFO at EverWash, bringing financial expertise and strategic leadership to the organization.";
                if (authorSocialMedia[i]) authorSocialMedia[i].href = "https://www.linkedin.com/in/toddrendle/";
                break;
            default:
                avatars[i].src = "/img/everwash-newsroom.png";
                if (authorBio[i]) authorBio[i].innerText = "The EverWash Newsroom is your source for the latest updates, press releases, and headlines from EverWash — the nation's largest car wash membership network. Our Newsroom features content tailor made for EverWash partners, prospect wash operators, car wash industry insiders, and any curious customers searching for a closer look at EverWash news and current events.";
                if (authorSocialMedia[i]) authorSocialMedia[i].href = "https://www.linkedin.com/company/everwash";
        }
    }
    
    // Twitter Share Functionality
    document.querySelectorAll('.twitter-share').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = encodeURIComponent('https://everwashpartners.com' + this.dataset.url);
            const text = encodeURIComponent(this.dataset.title);
            const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=everwash`;
            window.open(twitterUrl, '_blank', 'width=550,height=420');
        });
    });
});