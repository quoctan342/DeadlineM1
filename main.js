const limit = 10;

function start() {
    let posts = []
    getData(function(data) {
        HandleClickPage(data);
        renderPagination(data);
        renderPosts(data);
    })

}

start();

function getData(callback) {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
        return response.json();
    })
    .then(callback)
}

function renderPosts(posts, current_page = 1) {
    let dataBlock = document.getElementById('data');
  
    let post_start = (current_page - 1) * limit + 1;
    let post_end = ((current_page - 1) * limit + 1) + limit - 1

    let htmls = posts.map(function (post,index) {
        if (index >= (post_start - 1) && index <= (post_end - 1)) {
            return `
                <li>
                    <p><strong>ID</strong>: ${post.id}</p>
                    <p><strong>Title</strong>: ${post.title}</p>
                    <p><strong>Body</strong>: ${post.body}</p>
                </li>
            `
        }
    });

    dataBlock.innerHTML = htmls.join('');
}

function renderPagination(posts, page_select = 1) {
    const total_page = posts.length / limit;
    const current_page = page_select;
    let pagi_postBlock = document.getElementById('pagi_post');
    let html = '';
    for (let i = 1; i < total_page; i++) {
        if (i === 1) {
            if (current_page === 1) {
                html = html + ` <li class="page-item disabled" id="page-item-disabled" onclick="() => { event.preventDefault(); }">
                <a class="page-link" href="#" aria-label="Previous" id="previous">
                &laquo;     
                </a>
              </li>`
            } else {
                html = html + ` <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous" id="previous">
                &laquo;     
                </a>
                </li>`
            }
        }
        if (i === current_page) { 
            html = html + `<li class="page-item active" id="page_active"><a class="page-link" href="#">${i}</a></li>`
        } else {
            html = html + `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
        }
        if (i === total_page - 1) {
            if (current_page === total_page - 1) {
                html = html + `<li class="page-item disabled" id="page-item-disabled">
            <a class="page-link" href="#" aria-label="Next" id="next">
                &raquo;
            </a>
          </li>`
            } else {
                html = html + `<li class="page-item">
            <a class="page-link" href="#" aria-label="Next" id="next">
                &raquo;
            </a>
          </li>`
            }
        }
    }
    
    pagi_postBlock.innerHTML = html;
}

function HandleClickPage(data) {
    let pagi_postBlock = document.getElementById('pagi_post');
    pagi_postBlock.onclick = function (event) {
        
        let page_active = document.getElementById('page_active').childNodes[0].text
        let page_select = Number(event.target.text) 
        if (event.target.id === 'previous') {
            page_select = Number(page_active) - 1
        } else if (event.target.id === 'next') {
            page_select = Number(page_active) + 1
        }

        renderPagination(data, page_select);
        renderPosts(data, page_select);
        
    }
}