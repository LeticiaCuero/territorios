document.addEventListener('DOMContentLoaded', function() {
    const svgContainer = document.getElementById('svg-container');
    
    const regions = {
        'New Jersey': { 
            color: '#474747', 
            name: 'Nova Jersey',
            leader: {
                name: 'Desconhecido',
                image: './images/profile.svg',
                description: 'O líder de Nova Jersey'
            }
        },
        'Manhattan': { 
            color: '#474747', 
            name: 'Manhattan',
            leader: {
                name: 'Desconhecido',
                image: './images/Manhattan.png',
                description: 'A líder de Manhattan'
            }
        },
        'New York': { 
            color: '#474747', 
            name: 'Nova York',
            leader: {
                name: 'Desconhecido',
                image: './images/NewYork.png',
                description: 'O líder de Nova York'
            }
        },
        'Queens': { 
            color: '#474747', 
            name: 'Queens',
            leader: {
                name: 'Desconhecido',
                image: './images/profile.svg',
                description: 'A líder de Queens'
            }
        },
        'Bronx': { 
            color: '#474747', 
            name: 'Bronx',
            leader: {
                name: 'Saminho (O desgraçado)',
                image: './images/Bronx.png',
                description: 'Cartel responsável pela maior produção' + '\n de equipamentos para roubos do Bronx'
            }
        },
        'Brooklyn': { 
            color: '#474747', 
            name: 'Brooklyn',
            leader: {
                name: 'Desconhecido',
                image: './images/Brooklyn.png',
                description: 'O líder de Brooklyn'
            }
        }
    };

    fetch('Map.svg')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(svgText => {
            svgContainer.innerHTML = svgText;
            
            const fogOverlay = document.createElement('div');
            fogOverlay.id = 'fog-overlay';
            svgContainer.appendChild(fogOverlay);
            
            const svg = svgContainer.querySelector('svg');
            svg.style.background = '#101010';
            
            const emblemas = ['Ouro', 'Esmeralda', 'Diamante', 'Hell', 'Prata', 'Bronze'];
            const mapGroup = svg.querySelector('#Map\\+lvl');
            
            emblemas.forEach(id => {
                const emblema = svg.querySelector(`#${id}`);
                if (emblema && mapGroup) {
                    emblema.remove();
                    mapGroup.appendChild(emblema);
                }
            });

            let currentRegion = null;

            Object.keys(regions).forEach(regionId => {
                const element = document.getElementById(regionId);
                if (element) {
                    element.style.fill = regions[regionId].color;
                    element.style.stroke = '#333333';
                    element.style.strokeWidth = '1';
                    element.classList.add('region');

                    element.addEventListener('mouseenter', (e) => {
                        element.style.stroke = '#000000';
                        element.style.strokeWidth = '2';
                        
                        if (currentRegion !== regionId) {
                            const leaderInfo = regions[regionId].leader;
                            const leaderPanel = document.querySelector('.leader-panel');
                            const leaderInfoEl = document.querySelector('.leader-info');
                            
                            leaderInfoEl.style.display = 'none';
                            leaderInfoEl.classList.add('hidden');
                            
                            requestAnimationFrame(() => {
                                const emblemMap = {
                                    'New York': 'Hell',
                                    'Bronx': 'Esmeralda',
                                    'Manhattan': 'Diamante',
                                    'Brooklyn': 'Prata',
                                    'Queens': 'Bronze',
                                    'New Jersey': 'Ouro'
                                };
                                
                                const emblemaId = emblemMap[regionId];
                                const emblema = document.getElementById(emblemaId);
                                
                                if (leaderPanel && leaderInfoEl && emblema) {
                                    const emblemRect = emblema.getBoundingClientRect();
                                    leaderPanel.style.left = `${emblemRect.left + (emblemRect.width/2)}px`;
                                    leaderPanel.style.top = `${emblemRect.top + (emblemRect.height/2)}px`;
                                    
                                    document.getElementById('leader-image').src = leaderInfo.image;
                                    document.getElementById('leader-name').textContent = leaderInfo.name;
                                    document.getElementById('leader-description').textContent = leaderInfo.description;
                                    
                                    leaderInfoEl.style.display = 'flex';
                                    requestAnimationFrame(() => {
                                        leaderInfoEl.classList.remove('hidden');
                                    });
                                }
                            });
                            
                            currentRegion = regionId;
                        }
                    });

                    element.addEventListener('mouseleave', () => {
                        element.style.stroke = '#333333';
                        element.style.strokeWidth = '1';
                        
                        currentRegion = null;
                        document.querySelector('.leader-info').classList.add('hidden');
                    });
                }
            });
        })
        .catch(error => {
            svgContainer.innerHTML = 'Erro ao carregar o mapa';
        });
});
