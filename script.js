// Animação do texto de introdução
document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector('.glitch');
    text.setAttribute('data-text', text.textContent);
});

// Função para buscar projetos do GitHub
async function fetchGithubProjects(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const projects = await response.json();
        
        const projectsContainer = document.getElementById('github-projects');
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description || 'Sem descrição'}</p>
                <p>⭐ ${project.stargazers_count}</p>
                <a href="${project.html_url}" target="_blank">Ver no GitHub</a>
            `;
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
    }
}

// Substitua 'seu-usuario' pelo seu nome de usuário do GitHub
// fetchGithubProjects('seu-usuario');

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