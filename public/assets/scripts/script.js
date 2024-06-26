const repositorio =document.querySelector('.cotent-main');
function getApigithub(){
    fetch('https://api.github.com/users/Rafaelnjardim/repos')
    .then(async res=>{
        if( !res.ok){
            throw new console.error(res.status);
        }
        let data = await res.json();
        data.map(item=>{
            let project = document.createElement('div');
            project.innerHTML= `
        <div class="project">
                <div>
                    <h4 class="title">${item.name}</h4>
                    <span class="date-create">${Intl.DateTimeFormat('pt-br').format(new Date(item.created_at))}</span>
                </div>
                <div>
                    <a href="${item.html_url}">${item.html_url}</a>
                    <span class="linguagem"><span class="circle"></span>${item.language}</span>

                </div>
        </div>
            `
            repositorio.appendChild(project)
        })

    })
        
}
getApigithub()