// Sistema de navegación por bloques para presentación
console.log('Script cargado correctamente');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado');
    
    const bloques = document.querySelectorAll('.bloque-contenido');
    console.log('Bloques encontrados:', bloques.length);
    
    const encabezado = document.querySelector('.encabezado-principal');
    const piePagina = document.querySelector('.pie-pagina');
    let bloqueActivo = null;

    // Agregar cursor pointer y evento click a los bloques
    bloques.forEach((bloque, index) => {
        bloque.style.cursor = 'pointer';
        bloque.style.transition = 'all 0.3s ease';
        
        // Agregar indicador visual
        const indicador = document.createElement('div');
        indicador.className = 'indicador-click';
        indicador.innerHTML = '👆 Click para expandir';
        indicador.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
            color: white;
            padding: 12px 25px;
            border-radius: 25px;
            font-size: 0.95em;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            z-index: 5;
            pointer-events: none;
            animation: pulseIndicador 2s ease-in-out infinite;
        `;
        bloque.appendChild(indicador);
        
        // Event listener para click
        bloque.addEventListener('click', function(e) {
            console.log('Click en bloque', index + 1);
            
            // Evitar que el click en botones active la maximización
            if (e.target.closest('.btn-cerrar') || 
                e.target.closest('.btn-nav')) {
                return;
            }
            
            maximizarBloque(this);
        });
        
        // Hover effect
        bloque.addEventListener('mouseenter', function() {
            if (!bloqueActivo) {
                this.style.transform = 'scale(1.02)';
            }
        });
        
        bloque.addEventListener('mouseleave', function() {
            if (!bloqueActivo) {
                this.style.transform = 'scale(1)';
            }
        });
    });

    // Función para maximizar un bloque
    function maximizarBloque(bloque) {
        console.log('Maximizando bloque');
        
        if (bloqueActivo === bloque) {
            minimizarTodo();
            return;
        }

        if (bloqueActivo) {
            minimizarTodo();
        }

        bloqueActivo = bloque;
        
        // Ocultar otros elementos
        encabezado.style.display = 'none';
        piePagina.style.display = 'none';
        
        bloques.forEach(b => {
            if (b !== bloque) {
                b.style.display = 'none';
            }
        });

        // Maximizar el bloque actual
        bloque.classList.add('bloque-maximizado');
        bloque.style.cssText += `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 1000 !important;
            overflow-y: auto !important;
            margin: 0 !important;
            border-radius: 0 !important;
            padding: 80px 60px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
        `;
        
        // Ocultar indicador
        const indicador = bloque.querySelector('.indicador-click');
        if (indicador) {
            indicador.style.display = 'none';
        }

        // Agregar botón de cerrar
        const btnCerrar = document.createElement('button');
        btnCerrar.className = 'btn-cerrar';
        btnCerrar.innerHTML = '✕ Cerrar';
        btnCerrar.style.cssText = `
            position: fixed;
            top: 30px;
            left: 30px;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
            z-index: 1001;
            transition: all 0.3s ease;
        `;
        btnCerrar.onmouseenter = function() {
            this.style.transform = 'scale(1.05)';
        };
        btnCerrar.onmouseleave = function() {
            this.style.transform = 'scale(1)';
        };
        btnCerrar.onclick = (e) => {
            e.stopPropagation();
            minimizarTodo();
        };
        bloque.appendChild(btnCerrar);

        // Agregar botones de navegación
        const navContainer = document.createElement('div');
        navContainer.className = 'nav-container';
        navContainer.style.cssText = `
            position: fixed;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 20px;
            z-index: 1001;
        `;
        
        const btnAnterior = document.createElement('button');
        btnAnterior.className = 'btn-nav btn-anterior';
        btnAnterior.innerHTML = '← Anterior';
        btnAnterior.style.cssText = `
            background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
            color: white;
            border: none;
            padding: 15px 35px;
            border-radius: 25px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3);
            transition: all 0.3s ease;
        `;
        btnAnterior.onmouseenter = function() {
            this.style.transform = 'translateY(-3px)';
        };
        btnAnterior.onmouseleave = function() {
            this.style.transform = 'translateY(0)';
        };
        btnAnterior.onclick = (e) => {
            e.stopPropagation();
            navegarBloque('anterior');
        };
        
        const btnSiguiente = document.createElement('button');
        btnSiguiente.className = 'btn-nav btn-siguiente';
        btnSiguiente.innerHTML = 'Siguiente →';
        btnSiguiente.style.cssText = `
            background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
            color: white;
            border: none;
            padding: 15px 35px;
            border-radius: 25px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            transition: all 0.3s ease;
        `;
        btnSiguiente.onmouseenter = function() {
            this.style.transform = 'translateY(-3px)';
        };
        btnSiguiente.onmouseleave = function() {
            this.style.transform = 'translateY(0)';
        };
        btnSiguiente.onclick = (e) => {
            e.stopPropagation();
            navegarBloque('siguiente');
        };
        
        navContainer.appendChild(btnAnterior);
        navContainer.appendChild(btnSiguiente);
        bloque.appendChild(navContainer);

        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('Bloque maximizado');
    }

    // Función para minimizar todo
    function minimizarTodo() {
        console.log('Minimizando');
        
        if (!bloqueActivo) return;

        bloqueActivo.classList.remove('bloque-maximizado');
        bloqueActivo.style.cssText = '';

        // Remover botones
        const btnCerrar = bloqueActivo.querySelector('.btn-cerrar');
        const navContainer = bloqueActivo.querySelector('.nav-container');
        if (btnCerrar) btnCerrar.remove();
        if (navContainer) navContainer.remove();

        // Mostrar indicador
        const indicador = bloqueActivo.querySelector('.indicador-click');
        if (indicador) {
            indicador.style.display = 'block';
        }

        // Mostrar todos los elementos
        encabezado.style.display = 'block';
        piePagina.style.display = 'block';
        
        bloques.forEach(b => {
            b.style.display = 'block';
        });

        bloqueActivo = null;
    }

    // Función para navegar entre bloques
    function navegarBloque(direccion) {
        const bloquesArray = Array.from(bloques);
        const indiceActual = bloquesArray.indexOf(bloqueActivo);
        
        let nuevoIndice;
        if (direccion === 'anterior') {
            nuevoIndice = indiceActual - 1;
            if (nuevoIndice < 0) nuevoIndice = bloquesArray.length - 1;
        } else {
            nuevoIndice = indiceActual + 1;
            if (nuevoIndice >= bloquesArray.length) nuevoIndice = 0;
        }

        maximizarBloque(bloquesArray[nuevoIndice]);
    }

    // Atajos de teclado
    document.addEventListener('keydown', function(e) {
        if (!bloqueActivo) return;

        switch(e.key) {
            case 'Escape':
                minimizarTodo();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                navegarBloque('siguiente');
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                navegarBloque('anterior');
                break;
        }
    });

    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulseIndicador {
            0%, 100% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.05); }
        }
        
        .bloque-contenido:hover .indicador-click {
            transform: translateX(-50%) scale(1.1) !important;
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }
    `;
    document.head.appendChild(style);

    console.log('Sistema de presentación interactiva cargado ✓');
});
