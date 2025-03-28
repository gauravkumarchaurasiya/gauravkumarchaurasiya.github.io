document.addEventListener('DOMContentLoaded', () => {
    const background = document.querySelector('.background');
    background.style.height = '40vh';
    background.style.width = '80vw';

    const elements = document.querySelectorAll('.element');

    function randomizeElement(element) {
        const startX = Math.random() * background.clientWidth - background.clientWidth / 2;
        const startY = Math.random() * background.clientHeight - background.clientHeight / 2;
        const endX = Math.random() * background.clientWidth - background.clientWidth / 2;
        const endY = Math.random() * background.clientHeight - background.clientHeight / 2;
        const rotation = Math.random() * 360;

        element.style.setProperty('--startX', `${startX}px`);
        element.style.setProperty('--startY', `${startY}px`);
        element.style.setProperty('--endX', `${endX}px`);
        element.style.setProperty('--endY', `${endY}px`);
        element.style.setProperty('--rotation', `${rotation}deg`);
    }

    elements.forEach((element, index) => {
        randomizeElement(element);

        // Change icon when animation restarts
        element.addEventListener("animationiteration", () => {
            const icons = [
                { icon: 'data', class: 'fas fa-database' },
                { icon: 'ai', class: 'fas fa-brain' },
                { icon: 'ml', class: 'fas fa-project-diagram' },
                { icon: 'dl', class: 'fas fa-layer-group' },
                { icon: 'llm', class: 'fas fa-book' },
                { icon: 'neural', class: 'fas fa-network-wired' },
                { icon: 'bigdata', class: 'fas fa-server' },
                { icon: 'nlp', class: 'fas fa-comments' },
                { icon: 'robotics', class: 'fas fa-robot' },
                { icon: 'cloud', class: 'fas fa-cloud' },
                { icon: 'algorithm', class: 'fas fa-code' },
                { icon: 'automation', class: 'fas fa-cogs' },
                { icon: 'quantum', class: 'fas fa-atom' },
                { icon: 'iot', class: 'fas fa-microchip' },
                { icon: 'blockchain', class: 'fas fa-link' },
                { icon: 'optimization', class: 'fas fa-sliders-h' },
                { icon: 'statistics', class: 'fas fa-chart-pie' },
            ];
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            element.setAttribute('data-icon', randomIcon.icon);
            element.querySelector('i').className = randomIcon.class;
            
            // Only re-randomize position when animation restarts
            randomizeElement(element);
        });
    });
});