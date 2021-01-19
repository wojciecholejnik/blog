
{
    'use strict';
    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
    };

    const optArticleSelector = '.post',
        optTitleListSelector = '.titles',
        optTitleSelector = '.post-title',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorsSelector = '.post-author',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-';
    
        /*---------------------------------------*/

    const titleClickHandler = function(event){
        event.preventDefault();
        const clickedElement = this;

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
    /*---------------------------------------*/
    const generateTitleLinks = function(customSelector = ''){


        /* [DONE] remove contents of titleList */
        document.querySelector(optTitleListSelector).innerHTML = '';

        /* [DONE] for each article */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);
        
        for (let article of articles) {

            /* [DONE] get the article id */
            const articleId = article.getAttribute('id');

            /* [DONE] find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            /* [DONE] get the title from the title element */

            /* [DONE] create HTML of the link */
            const linkHTMLData = {id: articleId, title: articleTitle};
            const linkHTML = templates.articleLink(linkHTMLData);
            /* [DONE] insert link into titleList */
            var linksPosition = document.getElementById('title-list');
            linksPosition.insertAdjacentHTML('beforeend', linkHTML);
        }

        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }

    };
    generateTitleLinks();
    /*---------------------------------------*/
    const calculateTagsParams = function(tags){
        /* Create new constans 'params' for object with 2 keys - max 0 & min 999999 */
        const params = {min: 99999, max: 0};

        for(let tag in tags){
            if(tags[tag] > params.max){
                params.max = tags[tag];
            }
            if(tags[tag] < params.min){
                params.min = tags[tag];
            }

        }
        return params;

    };
    /*---------------------------------------*/
    const calculateTagClass = function(count, params){
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
        return optCloudClassPrefix + classNumber;
    };
    /*---------------------------------------*/
    const generateTags = function(){

        /* [NEW] create a new variable allTags with an empty object */
        let allTags = {};
        /* [DONE] find all articles */
        const articles = document.querySelectorAll('.post');

        /* [DONE] START LOOP: for every article: */
        for(let article of articles){

            /* [DONE] find tags wrapper */
            const findedWrapper = article.querySelector(optArticleTagsSelector);

            /* [DONE] get tags from data-tags attribute */
            let articleTags = article.getAttribute('data-tags');

            /* [DONE] split tags into array */
            const articleTagsArray = articleTags.split(' ');
            
            /* START LOOP: for each tag */
            for(let tag of articleTagsArray){
                /* generate HTML of the link */
                const linkHTMLData = {id: tag, title: tag};
                const html = templates.articleLink(linkHTMLData);
                
                /* add generated code to html variable */
                findedWrapper.insertAdjacentHTML('beforeend', html);
                
                /* [NEW] check if this link is NOT already in allTags */
                if(!allTags[tag]) {
                    
                    /* [NEW] add tag to allTags object */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }
            /* END LOOP: for each tag */
            }  
        /* END LOOP: for every article: */
        }

        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector('.tags');

        const tagsParams = calculateTagsParams(allTags);
        
        /* [NEW] create variable for all links HTML code */
        const allTagsData = {tags: []};

        /* [NEW] START LOOP: for each tag in allTags: */
        for(let tag in allTags){
        /* [NEW] generate code of a link and add it to allTagsHTML */
            allTagsData.tags.push({
                tag: tag,
                count: allTags[tag],
                className: calculateTagClass(allTags[tag], tagsParams)
            });

        }
        /* [NEW] END LOOP: for each tag in allTags: */

        /*[NEW] add HTML from allTagsHTML to tagList */
        tagList.innerHTML = templates.tagCloudLink(allTagsData);
    };

    generateTags();
    /*---------------------------------------*/
    const tagClickHandler = function(event){

        /* prevent default action for this event */
        event.preventDefault();

        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;

        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');

        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');

        /* find all tag links with class active */
        const findedActiveTags = document.querySelectorAll('a.active[href^="#tag-"]');
        
        /* START LOOP: for each active tag link */
        for(let findedActiveTag of findedActiveTags){

            /* remove class active */
            findedActiveTag.classList.remove('active');

            /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

        /* START LOOP: for each found tag link */
        for(let tagLink of tagLinks){
        /* add class active */
            tagLink.classList.add('active');
        /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    };
    const addClickListenersToTags = function(){
        /* find all links to tags */
        const findedLinks = document.querySelectorAll('a[href^="#tag-"]');

        /* START LOOP: for each link */
        for(const findedLink of findedLinks){

            /* add tagClickHandler as event listener for that link */
            findedLink.addEventListener('click', tagClickHandler);

        /* END LOOP: for each link */
        }
    };
    addClickListenersToTags();
    /*---------------------------------------*/

    const generateAuthors = function(){
        /* [NEW] create a new variable allAuthors with an empty array */
        let allAuthors = {};
        
        /* [DONE] find all articles */
        const articles = document.querySelectorAll('.post');
        
        /* [DONE] START LOOP: for every article: */
        for(let article of articles){
            
            /* [DONE] find authors wrapper */
            const authorsWrapper = article.querySelector(optArticleAuthorsSelector);
            
            /* [DONE] make html variable with empty string */
            var html = '';
            
            /* get author from data-authors attribute */
            let articleAuthor = article.getAttribute('data-author');
            
            /* generate HTML of the link */
            const author_name = articleAuthor.replace(' ', '_');
            
            const linkHTMLData = {id: author_name, title: articleAuthor};
            const authorHtml = templates.articleLink(linkHTMLData);

            /* add generated code to html variable */
            html = html + authorHtml;
            
            /* [DONE] check if this link is NOT already in allTags */
            if(!allAuthors[articleAuthor]) {
                
                /* [DONE] add tag to allTags object */
                allAuthors[articleAuthor] = 1;
            } else {
                allAuthors[articleAuthor]++;
            }
            
            /* insert HTML of all the links into the tags wrapper */
            authorsWrapper.insertAdjacentHTML('beforeend', html);
           
        /* END LOOP: for every article: */
        }
        
        /* [NEW] find list of tags in right column */
        const authorList = document.querySelector('.authors');

        const authorsParams = calculateTagsParams(allAuthors);

        /* [NEW] create variable for all links HTML code */
        let allAuthorsHTML = '';

        /* [NEW] START LOOP: for each tag in allTags: */
        for(let author in allAuthors){
            /* [NEW] generate code of a link and add it to allTagsHTML */
            const authorLinkHTML = '<li><a href="#author_' + author + '" class="' + calculateTagClass(allAuthors[author], authorsParams) + '">' + author  + '</a></li>';
            allAuthorsHTML += authorLinkHTML;
        }
        /* [NEW] END LOOP: for each tag in allTags: */

        /*[NEW] add HTML from allTagsHTML to tagList */
        authorList.innerHTML = allAuthorsHTML;
    };
    generateAuthors();
    /*---------------------------------------*/

    const authorClickHandler= function(event)  {
        /* prevent default action for this event */
        event.preventDefault;
        
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        
        /* make a new constant "author" and extract author name from the "href" constant */
        const author = href.replace('#author_', '');
        
        /* replace '_' by ' ' s*/
        const authorWithout_ = author.replace('_', ' ');
        
        /* find all tag links with class active */
        const findedActivesAuthors = document.querySelectorAll('a.active[href^="#author"]');
        
        /* START LOOP: for each active tag link */
        for(let findedActiveAuthor of findedActivesAuthors){
            /* remove class active */
            findedActiveAuthor.classList.remove('active');
            /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const authorLinks = document.querySelectorAll('article[href="' + href + '"]');
        
        /* START LOOP: for each found tag link */
        for (let authorLink of authorLinks){
            /* add class active */
            authorLink.classList.add('active');   
            /* END LOOP: for each found tag link */
        }

        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-author="' + authorWithout_ + '"]');
    };

    const addClickListenersToAuthors = function(){
        
        /* find all links to authors */
        const findedAuthorLinks = document.querySelectorAll('a[href^="#author"]');
        
        /* START LOOP: for each link */
        for (let link of findedAuthorLinks) {
            
            /* add authorClickHandler as event listener for that link */
            link.addEventListener('click', authorClickHandler);
            /* END LOOP: for each link */
        }
    };

    addClickListenersToAuthors();
}
