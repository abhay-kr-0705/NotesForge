import { useEffect } from 'react';
import { trackEvent } from '../lib/firebase';

export function useAnalytics(currentPage) {
    useEffect(() => {
        // Check consent (Soft Opt-in: Track unless explicitly declined)
        const consent = localStorage.getItem('cookie_consent');

        if (consent !== 'declined') {
            // Track Page View
            trackEvent('page_view', {
                page_path: `/${currentPage}`,
                page_title: `NotesForge - ${currentPage}`
            });
        }
    }, [currentPage]);

    const trackCustomEvent = (eventName, params) => {
        const consent = localStorage.getItem('cookie_consent');
        if (consent !== 'declined') {
            trackEvent(eventName, params);
        }
    };

    return { trackCustomEvent };
}
