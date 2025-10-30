document.addEventListener('DOMContentLoaded', () => {

    // const onlineJsonUrl = 'https://json.extendsclass.com/bin/2b315a9c4507';
    const onlineJsonUrl = 'objektid.json';
    const postsContainer = document.querySelector('.posts-feed');

    const createPostHTML = (post) => { // loob ühe postituse HTML-i
        //kas postituse objektil on pildi URL olemas, kas see pole tühi
        const postImageHTML = post.image ? `<img src="${post.image}" alt="Postituse pilt" class="post-image">` : '';

        return `
            <div class="post">
                <div class="post-header">
                    <i class="fas fa-user-circle"></i> <!-- See on praegu staatiline ikoon nagu sinu näites -->
                    <span class="post-date">${new Date(post.created_at).toLocaleDateString('et-EE')}</span>
                </div>
                ${postImageHTML} <!-- Lisame pildi HTML-i ainult siis, kui pilt on olemas -->
                <div class="post-text">${post.content}</div>
                <div class="post-actions">
                    <i class="fas fa-thumbs-up"></i>
                </div>
            </div>
        `;
    };

    // Laeme andmed Fetch API abil
    fetch(onlineJsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Võrguviga: ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            // Tühjendame konteineri enne uute postituste lisamist.
            postsContainer.innerHTML = '';

            // Käime läbi kõik postitused JSON-failist ja lisame need lehele.
            posts.forEach(post => {
                postsContainer.innerHTML += createPostHTML(post);
            });
        })
        .catch(error => {
            console.error('Andmete laadimisel tekkis viga:', error);
            postsContainer.innerHTML = '<p style="text-align: center; color: red;">Postituste laadimine ebaõnnestus.</p>';
        });
});