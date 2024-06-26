const perfil = document.querySelector('.main');

function getAPigithub() {
    fetch('https://api.github.com/users/Rafaelnjardim')
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            let data = await res.json();
            let informações = document.createElement('div');
            informações.innerHTML = `
                <div class="informações">
                    <img src="${data.avatar_url}" alt="" width="150px">
                    <ul class="listadeinformações">
                        <li class="itens">${data.name}</li>
                        <li class="itens">${data.company}</li>
                        <li class="itens">${data.location}</li>
                        <li class="itens" style="font-size: small;">${data.blog}</li>
                    </ul>
                </div>
                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div class="col">
                        <div class="card">
                            <img src="assets/images/img6.png" class="card-img-top" alt="vasco">
                            <div class="card-body">
                                <h5 class="card-title">Repositório sobre o hino do Vasco</h5>
                                <p class="card-text"><a href="/public/repo.html"><button>Saber mais</button></a></p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="assets/images/image2.jpg" class="card-img-top" alt="remo">
                            <div class="card-body">
                                <h5 class="card-title">Repositório sobre o hino do Remo</h5>
                                <p class="card-text"><a href="/public/repo.html"><button>Saber mais</button></a></p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="assets/images/img5.jpg" class="card-img-top" alt="vitória-ba">
                            <div class="card-body">
                                <h5 class="card-title">Repositório sobre o hino do Vitória-BA</h5>
                                <p class="card-text"><a href="/public/repo.html"><button>Saber mais</button></a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    Links sugeridos
                    <div id="carouselExampleCaptions" class="carousel slide border-bottom border-black">
                        <div class="carousel-indicators" id="carousel-indicators"></div>
                        <div class="carousel-inner" id="carousel-inner"></div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div class="fs-5 border border-black">
                        <span>Colegas de trabalho:</span>
                        <div id="colegas"></div>
                        <div class="fs-6" style="margin-left: 13cap;">
                            Responsável pelo site: ${data.name}
                        </div>
                    </div>
                </footer>
            `;
            perfil.appendChild(informações);

            loadCarousel();
            loadColleagues();
        })
        .catch(error => console.error('Erro:', error));
}

function loadCarousel() {
    fetch('carousel.json')
        .then(response => response.json())
        .then(data => {
            const indicators = document.getElementById('carousel-indicators');
            const inner = document.getElementById('carousel-inner');

            data.forEach((item, index) => {

                const button = document.createElement('button');
                button.type = 'button';
                button.dataset.bsTarget = '#carouselExampleCaptions';
                button.dataset.bsSlideTo = index;
                button.ariaLabel = `Slide ${index + 1}`;
                if (index === 0) {
                    button.className = 'active';
                    button.ariaCurrent = 'true';
                }
                indicators.appendChild(button);

                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                carouselItem.innerHTML = `
                    <a href="${item.link}"><img src="${item.image}" class="d-block w-100" alt="..."></a>
                    <div class="carousel-caption d-none d-md-block">
                        <h5 class="${item.caption_class || ''}">${item.caption}</h5>
                    </div>
                `;
                inner.appendChild(carouselItem);
            });
        })
        .catch(error => console.error('Erro ao carregar o JSON do carrossel:', error));
}

function loadColleagues() {
    fetch('colegas.json')
        .then(response => response.json())
        .then(data => {
            const colleaguesContainer = document.getElementById('colegas');
            data.forEach(colleague => {
                const colleagueElement = document.createElement('span');
                colleagueElement.innerHTML = `
                    <a href="${colleague.link}" target="_blank">
                        ${colleague.name}: <img src="${colleague.image}" alt="${colleague.name}" width="50px" style="margin-right: 10px;">
                    </a>
                `;
                colleaguesContainer.appendChild(colleagueElement);
            });
        })
        .catch(error => console.error('Erro ao carregar o JSON dos colegas:', error));
}

getAPigithub();
