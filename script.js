// Sistema de navegación por bloques para presentación
console.log('Script cargado correctamente');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado');
    
    const bloques = document.querySelectorAll('.bloque-vertical');
    console.log('Bloques encontrados:', bloques.length);
    
    const encabezado = document.querySelector('.encabezado-principal');
    const piePagina = document.querySelector('.pie-pagina');
    let bloqueActivo = null;

    // Sistema de zoom para imágenes
    const todasLasImagenes = document.querySelectorAll('img');
    console.log('Imágenes encontradas:', todasLasImagenes.length);
    
    todasLasImagenes.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.style.transition = 'transform 0.3s ease';
        
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Click en imagen:', this.src);
            abrirImagenZoom(this.src, this.alt);
        });
        
        img.addEventListener('mouseenter', function() {
            if (!this.closest('.modal-zoom-imagen')) {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        img.addEventListener('mouseleave', function() {
            if (!this.closest('.modal-zoom-imagen')) {
                this.style.transform = 'scale(1)';
            }
        });
    });

    // Función para abrir imagen con zoom
    function abrirImagenZoom(src, alt) {
        console.log('Abriendo zoom para:', src);
        
        const modalZoom = document.createElement('div');
        modalZoom.className = 'modal-zoom-imagen';
        modalZoom.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
            cursor: zoom-out;
        `;
        
        const contenedorImg = document.createElement('div');
        contenedorImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            position: relative;
            animation: zoomIn 0.3s ease;
        `;
        
        const imagen = document.createElement('img');
        imagen.src = src;
        imagen.alt = alt;
        imagen.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            cursor: default;
        `;
        
        const btnCerrarZoom = document.createElement('button');
        btnCerrarZoom.innerHTML = '✕';
        btnCerrarZoom.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            background: #ef4444;
            color: white;
            border: none;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            font-size: 2rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.5);
            transition: all 0.3s ease;
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        btnCerrarZoom.onmouseenter = function() {
            this.style.transform = 'scale(1.1) rotate(90deg)';
            this.style.background = '#dc2626';
        };
        
        btnCerrarZoom.onmouseleave = function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.background = '#ef4444';
        };
        
        const cerrarModal = function() {
            console.log('Cerrando modal zoom');
            modalZoom.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (modalZoom.parentNode) {
                    modalZoom.remove();
                }
            }, 300);
        };
        
        btnCerrarZoom.onclick = function(e) {
            e.stopPropagation();
            cerrarModal();
        };
        
        modalZoom.onclick = function(e) {
            if (e.target === modalZoom) {
                cerrarModal();
            }
        };
        
        contenedorImg.appendChild(imagen);
        modalZoom.appendChild(contenedorImg);
        modalZoom.appendChild(btnCerrarZoom);
        document.body.appendChild(modalZoom);
        
        // Cerrar con ESC
        const cerrarConEsc = function(e) {
            if (e.key === 'Escape') {
                cerrarModal();
                document.removeEventListener('keydown', cerrarConEsc);
            }
        };
        document.addEventListener('keydown', cerrarConEsc);
    }

    // Agregar cursor pointer y evento click a los bloques
    bloques.forEach((bloque, index) => {
        bloque.style.cursor = 'pointer';
        bloque.style.transition = 'all 0.3s ease';
        
        // Event listener para click
        bloque.addEventListener('click', function(e) {
            console.log('Click en bloque', index + 1);
            
            // Evitar que el click en imágenes active la maximización
            if (e.target.tagName === 'IMG') {
                return;
            }
            
            maximizarBloque(this);
        });
        
        // Hover effect
        bloque.addEventListener('mouseenter', function() {
            if (!bloqueActivo) {
                this.style.transform = 'scale(1.01)';
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
            padding: 100px 60px 120px 60px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            background: white !important;
        `;
        
        // Ajustar títulos para que se vean bien
        const titulos = bloque.querySelectorAll('.titulo-bloque');
        titulos.forEach(titulo => {
            titulo.style.fontSize = '2.5rem';
            titulo.style.marginTop = '0';
            titulo.style.marginBottom = '2rem';
            titulo.style.textAlign = 'center';
        });
        
        // Ajustar subtítulos descriptivos
        const subtitulos = bloque.querySelectorAll('.con-desc-sis-arch');
        subtitulos.forEach(sub => {
            sub.style.fontSize = '1.2rem';
            sub.style.textAlign = 'center';
            sub.style.marginBottom = '2rem';
        });

        // Agregar botones de navegación
        const navContainer = document.createElement('div');
        navContainer.className = 'nav-container';
        navContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 20px;
            z-index: 10001;
            background: transparent;
            padding: 0;
            border-radius: 50px;
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
        document.body.appendChild(navContainer);

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

        // Remover botones de navegación del body
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) navContainer.remove();

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
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    console.log('Sistema de presentación interactiva cargado ✓');
    console.log('Sistema de zoom de imágenes cargado ✓');
});
