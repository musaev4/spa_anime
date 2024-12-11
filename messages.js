document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('messages-container');

    function addMessage({ text, type = 'info', duration = 5000 }) {
        const message = document.createElement('div');
        message.className = `message-toast flex items-center gap-3 rounded-lg shadow-lg backdrop-blur-sm
            ${type === 'error' ? 'bg-red-500/10 text-red-200 border border-red-500/20' : ''}
            ${type === 'warning' ? 'bg-amber-500/10 text-amber-200 border border-amber-500/20' : ''}
            ${type === 'success' ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/20' : ''}
            ${type === 'info' ? 'bg-sky-500/10 text-sky-200 border border-sky-500/20' : ''}
            p-4`;
        message.role = 'alert';

        message.innerHTML = `
            <div class="flex-shrink-0">
                <svg class="w-5 h-5 ${type === 'error' ? 'text-red-400' : ''} ${type === 'warning' ? 'text-amber-400' : ''} ${type === 'success' ? 'text-emerald-400' : ''} ${type === 'info' ? 'text-sky-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${getIconPath(type)}"></path>
                </svg>
            </div>
            <p class="flex-1 text-sm font-medium">${text}</p>
            <button class="close-btn flex-shrink-0 transition-all duration-200 hover:opacity-70">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
            </button>
            <div class="absolute bottom-0 left-0 h-0.5 w-full rounded-full overflow-hidden">
                <div class="progress-bar h-full ${type === 'error' ? 'bg-red-400' : ''} ${type === 'warning' ? 'bg-amber-400' : ''} ${type === 'success' ? 'bg-emerald-400' : ''} ${type === 'info' ? 'bg-sky-400' : ''}"></div>
            </div>
        `;

        const closeBtn = message.querySelector('.close-btn');
        const progressBar = message.querySelector('.progress-bar');

        const removeMessage = () => {
            message.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => message.remove(), 300);
        };

        closeBtn.addEventListener('click', removeMessage);

        message.addEventListener('mouseenter', () => {
            progressBar.style.animationPlayState = 'paused';
        });

        message.addEventListener('mouseleave', () => {
            progressBar.style.animationPlayState = 'running';
        });

        setTimeout(removeMessage, duration);

        container.appendChild(message);
    }

    function getIconPath(type) {
        switch (type) {
            case 'error': return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
            case 'warning': return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
            case 'success': return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
            default: return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
        }
    }

    window.addMessage = addMessage;
});
