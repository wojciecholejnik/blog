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
    const optArticleTagsSelector = '.post-tags .list';
    generateTitleLinks();

    const generateTags = function(){

        /* [DONE] find all articles */
        const articles = document.querySelectorAll('.post');

        /* [DONE] START LOOP: for every article: */
        for(let article of articles){
            //console.log('Articles: ' + article);

            /* [DONE] find tags wrapper */
            const findedWrapper = article.querySelector(optArticleTagsSelector);
            //console.log('findedWrapper: ' + findedWrapper);

            /* [DONE] make html variable with empty string */
            //let html = '';

            /* [DONE] get tags from data-tags attribute */
            let articleTags = article.getAttribute('data-tags');
            //console.log('articleTags: ' + articleTags);

            /* split tags into array */
            const articleTagsArray = articleTags.split(' ');
            //console.log('articleTagsArray: ' + articleTagsArray);
            /* START LOOP: for each tag */
            for(let tag of articleTagsArray){
                //console.log('tag: ' + tag)
                /* generate HTML of the link */
                const html = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
                //console.log(html);
                /* add generated code to html variable */
                findedWrapper.insertAdjacentHTML('beforeend', html);
            /* END LOOP: for each tag */
            } //console.log(findedWrapper);
            /* insert HTML of all the links into the tags wrapper */

        /* END LOOP: for every article: */
        }
    };
    generateTags();

    const tagClickHandler = function(event){
        /* prevent default action for this event */
        event.preventDefault();

        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;

        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        console.log(href);

        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        findedTags = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each active tag link */
        for (let findedTag of findedTags){

        /* remove class active */

        /* END LOOP: for each active tag link */
      }
        /* find all tag links with "href" attribute equal to the "href" constant */

        /* START LOOP: for each found tag link */

        /* add class active */

        /* END LOOP: for each found tag link */

        /* execute function "generateTitleLinks" with article selector as argument */
        //generateTitleLinks('[data-tags~="' + tag + '"]');
    };
    const addClickListenersToTags = function(){
        /* find all links to tags */

        /* START LOOP: for each link */

        /* add tagClickHandler as event listener for that link */

        /* END LOOP: for each link */
    };

}
