document.body.classList.add('nav-enhanced');

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('navMenu');
const plannerForm = document.getElementById('plannerForm');
const contactForm = document.getElementById('contactForm');
const plannerStatus = document.getElementById('plannerStatus');
const contactStatus = document.getElementById('contactStatus');

const closeMenu = () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
};

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 820) {
            closeMenu();
        }
    });
});

const triggerMailto = (href, button, statusElement, loadingCopy) => {
    const originalText = button.textContent;

    button.disabled = true;
    button.classList.add('is-loading');
    button.textContent = loadingCopy;
    statusElement.textContent = 'Abriendo tu cliente de correo para terminar el envio.';

    window.setTimeout(() => {
        window.location.href = href;
        window.setTimeout(() => {
            button.disabled = false;
            button.classList.remove('is-loading');
            button.textContent = originalText;
            statusElement.textContent = '';
        }, 900);
    }, 100);
};

plannerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(plannerForm);
    const destino = formData.get('destino');
    const tipo = formData.get('tipo');
    const fecha = formData.get('fecha') || 'Por definir';
    const presupuesto = formData.get('presupuesto');

    const subject = encodeURIComponent('Quiero cotizar un viaje');
    const body = encodeURIComponent(
        `Hola, quiero una propuesta de viaje.\r\n\r\n` +
        `Destino: ${destino}\r\n` +
        `Tipo de viaje: ${tipo}\r\n` +
        `Fecha estimada: ${fecha}\r\n` +
        `Presupuesto por persona: ${presupuesto}`
    );

    const submitButton = plannerForm.querySelector('button[type="submit"]');
    triggerMailto(`mailto:macaldo565@gmail.com?subject=${subject}&body=${body}`, submitButton, plannerStatus, 'Abriendo...');
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nombre = formData.get('nombre');
    const correo = formData.get('correo');
    const tipo = formData.get('tipo');
    const fecha = formData.get('fecha') || 'Por definir';
    const mensaje = formData.get('mensaje') || 'Sin mensaje adicional';

    const subject = encodeURIComponent(`Solicitud de viaje de ${nombre}`);
    const body = encodeURIComponent(
        `Hola, quiero solicitar una propuesta de viaje.\r\n\r\n` +
        `Nombre: ${nombre}\r\n` +
        `Correo: ${correo}\r\n` +
        `Tipo de viaje: ${tipo}\r\n` +
        `Fecha tentativa: ${fecha}\r\n\r\n` +
        `Detalles:\r\n${mensaje}`
    );

    const submitButton = contactForm.querySelector('button[type="submit"]');
    triggerMailto(`mailto:macaldo565@gmail.com?subject=${subject}&body=${body}`, submitButton, contactStatus, 'Abriendo...');
});
