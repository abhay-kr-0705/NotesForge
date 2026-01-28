import React, { useState, useEffect } from 'react';
import { Shield, Users, Clock, Activity, Lock, RefreshCw, FileText } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, limit, getDocs, where, Timestamp } from 'firebase/firestore';
import { useTheme } from '../../lib/ThemeContext';

export function AdminDashboard({ onBack }) {
    const { isLight } = useTheme();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        activeUsers: 0,
        totalVisits24h: 0,
        totalVisits7d: 0,
        recentEvents: []
    });

    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            fetchStats();
        } else {
            alert("Incorrect Password");
        }
    };

    const fetchStats = async () => {
        if (!db) return;
        setLoading(true);

        try {
            const eventsRef = collection(db, "events");

            // 1. Get Recent Events (Increased limit for analytics)
            const qRecent = query(eventsRef, orderBy("timestamp", "desc"), limit(500));
            const recentSnap = await getDocs(qRecent);
            const events = recentSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestampObj: doc.data().timestamp,
                date: doc.data().timestamp?.toDate().toLocaleDateString(),
                timestamp: doc.data().timestamp?.toDate().toLocaleString() || 'Just now'
            }));

            // 2. Process Analytics
            const pageViews = {};
            const platforms = { Desktop: 0, Mobile: 0 };
            const funnel = { uploads: 0, processed: 0, downloads: 0 };
            const dailyActivity = {}; // Date -> Count

            // Initialize last 7 days for activity graph
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                dailyActivity[d.toLocaleDateString()] = 0;
            }

            events.forEach(ev => {
                // Top Pages
                if (ev.event === 'page_view' && ev.page_path) {
                    pageViews[ev.page_path] = (pageViews[ev.page_path] || 0) + 1;
                }

                // Platform
                if (ev.userAgent) {
                    const isMobile = /iPhone|iPad|iPod|Android/i.test(ev.userAgent);
                    platforms[isMobile ? 'Mobile' : 'Desktop']++;
                }

                // Funnel
                if (ev.event === 'file_upload') funnel.uploads++;
                if (ev.event === 'process_start') funnel.processed++;
                if (ev.event === 'download_pdf') funnel.downloads++;

                // Daily Activity
                if (ev.date && dailyActivity[ev.date] !== undefined) {
                    dailyActivity[ev.date]++;
                }
            });

            // Sort Top Pages
            const topPages = Object.entries(pageViews)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([path, count]) => ({ path, count }));

            // Format Activity Data
            const activityData = Object.entries(dailyActivity).map(([date, count]) => ({
                date: date.split('/')[1] + '/' + date.split('/')[0], // DD/MM (approx)
                count
            }));

            // 3. Active Users (Last 30 mins)
            const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
            const activeCount = events.filter(e => e.timestampObj?.toDate() > thirtyMinsAgo).length;

            // 4. 24h Count
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const visits24h = events.filter(e => e.timestampObj?.toDate() > oneDayAgo).length;

            setStats({
                activeUsers: Math.ceil(activeCount / 1.5),
                totalVisits24h: visits24h,
                totalVisits7d: events.length,
                recentEvents: events.slice(0, 20),
                topPages,
                platforms,
                funnel,
                activityData,
                rawEvents: events // For export
            });

        } catch (error) {
            console.error("Error fetching stats:", error);
            if (error.message.includes("requires an index")) {
                alert("Missing Firestore Index. Check console for the creation link.");
            } else if (error.code === 'permission-denied') {
                alert("Access Denied: Check Firestore Security Rules.");
            } else {
                alert("Failed to load analytics: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        if (!stats.rawEvents) return;

        const headers = ["ID", "Event", "Path", "Details", "Timestamp"];
        const rows = stats.rawEvents.map(e => [
            e.id,
            e.event,
            e.page_path || '-',
            JSON.stringify(e).replace(/,/g, ';').substring(0, 50), // Basic cleanup
            e.timestamp
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `notesforge_events_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isAuthenticated) {
        return (
            <div className={`min-h-screen flex items-center justify-center p-4 ${isLight ? "bg-white" : "bg-background"}`}>
                <div className={`max-w-md w-full p-8 rounded-2xl border text-center space-y-6 ${isLight ? "bg-white border-slate-200 shadow-xl" : "bg-slate-900 border-white/10"
                    }`}>
                    <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto">
                        <Lock className="w-8 h-8 text-violet-500" />
                    </div>
                    <h2 className={`text-2xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border text-center tracking-widest ${isLight
                                ? "bg-slate-50 border-slate-200 text-slate-900 focus:border-violet-500"
                                : "bg-slate-800 border-slate-700 text-white focus:border-violet-500"
                                }`}
                        />
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold transition-colors"
                        >
                            Unlock Dashboard
                        </button>
                    </form>
                    <button onClick={onBack} className="text-sm text-slate-500 hover:underline">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen p-6 ${isLight ? "bg-slate-50" : "bg-background"}`}>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className={`text-3xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Analytics Dashboard</h1>
                        <p className="text-slate-500">Real-time visitor tracking & insights</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={downloadCSV}
                            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors flex items-center gap-2 ${isLight ? "bg-white border-slate-200 hover:bg-slate-50 text-slate-700" : "bg-slate-900 border-white/10 hover:bg-white/5 text-slate-300"
                                }`}
                        >
                            <FileText className="w-4 h-4" /> Export CSV
                        </button>
                        <button
                            onClick={fetchStats}
                            disabled={loading}
                            className={`p-2 rounded-xl border transition-colors ${isLight ? "bg-white border-slate-200 hover:bg-slate-50" : "bg-slate-900 border-white/10 hover:bg-white/5"
                                }`}
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                        </button>
                        <button
                            onClick={onBack}
                            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
                        >
                            Exit
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={Activity}
                        label="Active Now (Est.)"
                        value={stats.activeUsers}
                        color="text-emerald-500"
                        isLight={isLight}
                    />
                    <StatCard
                        icon={Users}
                        label="Events (24h)"
                        value={stats.totalVisits24h}
                        color="text-blue-500"
                        isLight={isLight}
                    />
                    <StatCard
                        icon={Shield}
                        label="Conversion Rate"
                        value={stats.funnel?.uploads ? `${Math.round((stats.funnel.downloads / stats.funnel.uploads) * 100)}%` : '0%'}
                        color="text-violet-500"
                        isLight={isLight}
                    />
                </div>

                {/* Charts Row */}
                {stats.topPages && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Weekly Activity Graph */}
                        <div className={`p-6 rounded-2xl border ${isLight ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"}`}>
                            <h3 className={`text-lg font-bold mb-6 ${isLight ? "text-slate-900" : "text-white"}`}>Weekly Activity</h3>
                            <div className="flex items-end justify-between h-40 gap-2">
                                {stats.activityData?.map((day, i) => {
                                    const max = Math.max(...stats.activityData.map(d => d.count), 10); // Scale
                                    const height = Math.max((day.count / max) * 100, 5); // Min 5% height
                                    return (
                                        <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                            <div className="relative w-full bg-slate-100/10 rounded-t-lg bg-slate-800/50 h-full flex items-end overflow-hidden">
                                                <div
                                                    className={`w-full transition-all duration-500 group-hover:opacity-80 ${isLight ? "bg-violet-500" : "bg-violet-600"}`}
                                                    style={{ height: `${height}%` }}
                                                />
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                                    {day.count}
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-500 truncate w-full text-center">{day.date}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Conversion Funnel */}
                        <div className={`p-6 rounded-2xl border ${isLight ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"}`}>
                            <h3 className={`text-lg font-bold mb-6 ${isLight ? "text-slate-900" : "text-white"}`}>Conversion Funnel</h3>
                            <div className="space-y-6">
                                {/* Steps */}
                                {['uploads', 'processed', 'downloads'].map((step, i) => {
                                    const labels = ['Up', 'Pro', 'Down'];
                                    const fullLabels = ['Files Uploaded', 'Processed', 'Downloaded PDF'];
                                    const count = stats.funnel?.[step] || 0;
                                    const max = Math.max(stats.funnel?.uploads || 1, 1);
                                    const width = (count / max) * 100;

                                    return (
                                        <div key={step} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className={isLight ? "text-slate-700" : "text-slate-300"}>{fullLabels[i]}</span>
                                                <span className={`font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{count}</span>
                                            </div>
                                            <div className={`h-3 w-full rounded-full overflow-hidden ${isLight ? "bg-slate-100" : "bg-slate-800"}`}>
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${i === 0 ? "bg-blue-500" : i === 1 ? "bg-violet-500" : "bg-emerald-500"
                                                        }`}
                                                    style={{ width: `${Math.max(width, 2)}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Secondary Stats Row */}
                {stats.topPages && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Top Pages */}
                        <div className={`p-6 rounded-2xl border ${isLight ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"}`}>
                            <h3 className={`text-lg font-bold mb-4 ${isLight ? "text-slate-900" : "text-white"}`}>Top Pages</h3>
                            <div className="space-y-3">
                                {stats.topPages.map((page, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className={`text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>{page.path || "Home"}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 bg-violet-500/20 rounded-full w-24 overflow-hidden">
                                                <div
                                                    className="h-full bg-violet-500"
                                                    style={{ width: `${(page.count / Math.max(...stats.topPages.map(p => p.count))) * 100}%` }}
                                                />
                                            </div>
                                            <span className={`text-xs font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{page.count}</span>
                                        </div>
                                    </div>
                                ))}
                                {stats.topPages.length === 0 && <p className="text-slate-500 text-sm">No data yet</p>}
                            </div>
                        </div>

                        {/* Device Breakdown */}
                        <div className={`p-6 rounded-2xl border ${isLight ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"}`}>
                            <h3 className={`text-lg font-bold mb-4 ${isLight ? "text-slate-900" : "text-white"}`}>Platform Stats</h3>
                            <div className="flex items-center justify-center h-40 gap-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-violet-500">{stats.platforms?.Desktop || 0}</div>
                                    <div className="text-sm text-slate-500">Desktop</div>
                                </div>
                                <div className="w-px h-12 bg-slate-700/50" />
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-emerald-500">{stats.platforms?.Mobile || 0}</div>
                                    <div className="text-sm text-slate-500">Mobile</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recent Events Table */}
                <div className={`rounded-2xl border overflow-hidden ${isLight ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900 border-white/10"
                    }`}>
                    <div className="p-6 border-b border-inherit">
                        <h3 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Recent Events</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className={`text-xs uppercase ${isLight ? "bg-slate-50 text-slate-500" : "bg-slate-900/50 text-slate-400"}`}>
                                <tr>
                                    <th className="px-6 py-3">Event</th>
                                    <th className="px-6 py-3">Path</th>
                                    <th className="px-6 py-3">Time</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isLight ? "divide-slate-200" : "divide-white/5"}`}>
                                {stats.recentEvents.map((event) => (
                                    <tr key={event.id} className={isLight ? "hover:bg-slate-50" : "hover:bg-white/5"}>
                                        <td className={`px-6 py-4 font-medium ${isLight ? "text-slate-900" : "text-white"}`}>
                                            {event.event}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {event.page_path || '/'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {event.timestamp}
                                        </td>
                                    </tr>
                                ))}
                                {stats.recentEvents.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-8 text-center text-slate-500">
                                            No events recorded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color, isLight }) {
    return (
        <div className={`p-6 rounded-2xl border ${isLight ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900 border-white/10"
            }`}>
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${isLight ? "bg-slate-100" : "bg-white/5"}`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div>
                    <p className="text-sm text-slate-500">{label}</p>
                    <h3 className={`text-2xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{value}</h3>
                </div>
            </div>
        </div>
    );
}
