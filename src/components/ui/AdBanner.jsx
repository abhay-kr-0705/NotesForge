import React from 'react';

/**
 * AdBanner Component
 * 
 * Responsive ad banner placeholder for Google AdSense.
 * Replace the data-ad-slot with your actual AdSense slot ID.
 * 
 * Sizes:
 * - horizontal: 728x90 (Leaderboard) - good for between sections
 * - responsive: Auto-sizing based on container
 * - square: 300x250 (Medium Rectangle) - good for sidebars
 */
export function AdBanner({
    type = 'horizontal',
    className = '',
    adSlot = 'XXXXXXXXXX' // Replace with actual ad slot ID
}) {
    // Don't render ads in development mode (optional)
    const isDev = import.meta.env.DEV;

    const adStyles = {
        horizontal: 'min-h-[90px] max-h-[90px]',
        responsive: 'min-h-[100px]',
        square: 'min-h-[250px] max-w-[300px]',
    };

    return (
        <div
            className={`ad-container flex items-center justify-center ${adStyles[type]} ${className}`}
            style={{ margin: '16px auto' }}
        >
            {isDev ? (
                // Development placeholder
                <div className="w-full h-full flex items-center justify-center bg-slate-800/30 border border-dashed border-slate-600 rounded-lg text-slate-500 text-xs">
                    <span>Ad Space ({type})</span>
                </div>
            ) : (
                // Production AdSense code
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your publisher ID
                    data-ad-slot={adSlot}
                    data-ad-format={type === 'responsive' ? 'auto' : 'horizontal'}
                    data-full-width-responsive="true"
                />
            )}
        </div>
    );
}

/**
 * Hook to initialize AdSense ads after component mount
 * Call this in useEffect after the component renders
 */
export function initAds() {
    try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    } catch (e) {
        console.error('AdSense error:', e);
    }
}
