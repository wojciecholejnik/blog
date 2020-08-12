{

    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log(event);


        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        /* [DONE] add class 'active' to the clicked link */
        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        /* [DONE] get 'href' attribute from the clicked link */
        let hrefAttribute = clickedElement.getAttribute('href');

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        let findedArticle = document.querySelector(hrefAttribute);

        /* [DONE] add class 'active' to the correct article */
        findedArticle.classList.add('active');
    };


    const generateTitleLinks = function() {

        const optArticleSelector = '.post',
            optTitleSelector = '.post-title',
            optTitleListSelector = '.titles';

        /* [DONE] remove contents of titleList */
        document.querySelector(optTitleListSelector).innerHTML = '';

        /* [DONE] for each article */
        const articles = document.querySelectorAll(optArticleSelector);


        for (let article of articles) {

            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            /* get the title from the title element */

            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            /* insert link into titleList */
            var linksPosition = document.getElementById('title-list');
            linksPosition.insertAdjacentHTML('beforeend', linkHTML);
        }

        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }

    };

    generateTitleLinks();
}
