import { useEffect } from 'react';
import { trackEvent } from '../lib/firebase';

export function useAnalytics(currentPage) {
    useEffect(() => {
        // Check if user has consented to cookies
        const consent = localStorage.getItem('cookie_consent');

        if (consent === 'accepted') {
            // Track Page View
            trackEvent('page_view', {
                page_path: `/${currentPage}`,
                page_title: `NotesForge - ${currentPage}`
            });
        }
    }, [currentPage]);

    const trackCustomEvent = (eventName, params) => {
        const consent = localStorage.getItem('cookie_consent');
        if (consent === 'accepted') {
            trackEvent(eventName, params);
        }
    };

    return { trackCustomEvent };
}
