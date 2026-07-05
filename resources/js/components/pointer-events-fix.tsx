import { useEffect } from 'react';

export function PointerEventsFix() {
    useEffect(() => {
        function restorePointerEvents() {
            if (document.body.style.pointerEvents === 'none') {
                document.body.style.pointerEvents = '';
            }
        }

        document.addEventListener('click', restorePointerEvents, true);
        document.addEventListener('mousedown', restorePointerEvents, true);

        const observer = new MutationObserver(() => {
            if (document.body.style.pointerEvents === 'none') {
                document.body.style.pointerEvents = '';
            }
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

        restorePointerEvents();

        return () => {
            document.removeEventListener('click', restorePointerEvents, true);
            document.removeEventListener('mousedown', restorePointerEvents, true);
            observer.disconnect();
        };
    }, []);

    return null;
}
