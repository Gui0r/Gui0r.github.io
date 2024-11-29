// Animação do texto de introdução
document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector('.glitch');
    text.setAttribute('data-text', text.textContent);
});

// Função para buscar projetos do GitHub
async function fetchGithubProjects() {
    try {
        const username = 'Gui0r';
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        const projects = await response.json();
        const projectsContainer = document.getElementById('github-projects');
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description || 'Sem descrição'}</p>
                <div class="project-stats">
                    <span><i class="fas fa-star"></i> ${project.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${project.forks_count}</span>
                </div>
                <div class="project-links">
                    <a href="${project.html_url}" target="_blank" class="github-link">
                        <i class="fab fa-github"></i> Ver no GitHub
                    </a>
                    ${project.homepage ? `<a href="${project.homepage}" target="_blank" class="demo-link">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>` : ''}
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        // Adicionar projeto exemplo em caso de erro
        addExampleProject();
    }
}

// Função para adicionar um projeto exemplo
function addExampleProject() {
    const projectsContainer = document.getElementById('github-projects');
    const exampleProject = document.createElement('div');
    exampleProject.className = 'project-card';
    exampleProject.innerHTML = `
        <h3>Projeto Exemplo</h3>
        <p>Este é um exemplo de como seus projetos do GitHub aparecerão aqui.</p>
        <div class="project-stats">
            <span><i class="fas fa-star"></i> 5</span>
            <span><i class="fas fa-code-branch"></i> 2</span>
        </div>
        <div class="project-links">
            <a href="#" class="github-link">
                <i class="fab fa-github"></i> Ver no GitHub
            </a>
        </div>
    `;
    projectsContainer.appendChild(exampleProject);
}

// Função para buscar informações detalhadas do repositório
async function fetchRepoDetails(repoUrl) {
    try {
        const repoName = repoUrl.split('/').slice(-2).join('/');
        const response = await fetch(`https://api.github.com/repos/${repoName}`);
        const data = await response.json();
        return {
            stars: data.stargazers_count,
            forks: data.forks_count,
            language: data.language
        };
    } catch (error) {
        console.error('Erro ao buscar detalhes do repositório:', error);
        return { stars: 0, forks: 0, language: 'N/A' };
    }
}

// Função para adicionar projetos específicos
async function addCustomProjects() {
    const projectsContainer = document.getElementById('github-projects');
    
    const customProjects = [
        {
            name: "Sistema de Gerenciamento de salas de aula",
            description: "Sistema que permite o gerenciamento eficiente de salas de aula.",
            github_url: "https://github.com/gdbarros94/projetoIntegradorRSTI_AgendadorDeSalas",
            stars: 2,
            forks: 1,
            mainLanguage: "JavaScript",
            languages: {
                "HTML": 45,
                "CSS": 30,
                "JavaScript": 25
            }
        },
        {
            name: "Sistema de Gerenciamento de Tarefas",
            description: "sistema de gerenciamento de tarefas onde você vai poder adicionar tarefas, excluir tarefas, uma descrição das tarefas, data de vencimento e o status, junto com outras funcionalidades.",
            github_url: "https://github.com/Gui0r/TrabalhoFinal",
            stars: 1,
            forks: 0,
            mainLanguage: "C++",
            languages: {
                "C++": 100
            }
        },
        {
            name: "Recriação do site do instagram com HTML e CSS",
            description: "Recriação do site do instagram usando apenas HTML e CSS.",
            github_url: "https://github.com/Gui0r/Rec_Instagram",
            stars: 0,
            forks: 0,
            mainLanguage: "HTML",
            languages: {
                "HTML": 60,
                "CSS": 40
            }
        },
        {
            name: "Sistema de Gerenciamento Escolar para a escola Senac NH",
            description: "Sistema que permite o gerenciamento escolar da escola Senac NH. Faz o gerenciamento dos estudantes, professores, matérias, e muito mais funcionalidades.",
            github_url: "https://github.com/gdbarros94/gerenciamento-Escolar",
            stars: 3,
            forks: 2,
            mainLanguage: "Python",
            languages: {
                "HTML": 30,
                "CSS": 20,
                "JavaScript": 20,
                "Python": 30
            }
        }
    ];

    // Criar cards para cada projeto
    for (const project of customProjects) {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p class="project-description">${project.description}</p>
            
            <div class="project-languages">
                ${Object.entries(project.languages).map(([lang, percentage]) => `
                    <div class="language-bar">
                        <span class="language-name">${lang}</span>
                        <div class="language-progress">
                            <div class="language-fill ${lang.toLowerCase()}" style="width: ${percentage}%"></div>
                        </div>
                        <span class="language-percentage">${percentage}%</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="project-stats">
                <span class="stat-item">
                    <i class="fas fa-star"></i> ${project.stars} stars
                </span>
                <span class="stat-item">
                    <i class="fas fa-code-branch"></i> ${project.forks} forks
                </span>
                <span class="stat-item">
                    <i class="fas fa-code"></i> ${project.mainLanguage}
                </span>
            </div>
            
            <div class="project-links">
                <a href="${project.github_url}" target="_blank" class="github-link">
                    <i class="fab fa-github"></i> Ver no GitHub
                </a>
                ${project.demo_url ? `
                    <a href="${project.demo_url}" target="_blank" class="demo-link">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                ` : ''}
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    }
}

// Substitua a chamada da função fetchGithubProjects por:
document.addEventListener('DOMContentLoaded', addCustomProjects);

// Adicionar animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Adicionar animação de entrada aos elementos quando ficarem visíveis
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInElements = document.querySelectorAll('.experience-container, .skill-container, .project-card');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeInObserver.observe(element);
});