'use client';

import { useState, useEffect } from 'react';
import siteConfig from '@/config/site';
import { getVisits, clearVisits, getClicks, clearClicks, countTypes, getLatestRows } from '@/components/VisitorTracker';

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [saveMessage, setSaveMessage] = useState('');

    // Settings State
    const [settings, setSettings] = useState({ googleTagId: '', shopUrl: '' });

    // Video Management State
    const [videos, setVideos] = useState([]);
    const [newVideo, setNewVideo] = useState({ title: '', youtubeUrl: '', description: '', slug: '' });
    const [videoPreview, setVideoPreview] = useState(null);
    const [editingVideoIndex, setEditingVideoIndex] = useState(-1);

    // Blog Management State
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        title: '', slug: '', excerpt: '', content: '', author: siteConfig.name,
        featuredImage: '', category: 'ทั่วไป', tags: '', metaDescription: '', metaKeywords: '',
    });
    const [editingPostIndex, setEditingPostIndex] = useState(-1);
    const [showHtmlEditor, setShowHtmlEditor] = useState(false);

    // Stats State
    const [stats, setStats] = useState({
        visits: { total: 0, human: 0, bot: 0 },
        clicks: { total: 0, human: 0, bot: 0 },
    });
    const [recentVisits, setRecentVisits] = useState([]);
    const [recentClicks, setRecentClicks] = useState([]);

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsLoggedIn(true);
            loadAllData();
        }
    }, []);

    const loadAllData = () => {
        try {
            const savedSettings = localStorage.getItem('siteSettings');
            if (savedSettings) setSettings(JSON.parse(savedSettings));
            const savedVideos = localStorage.getItem('adminVideos');
            if (savedVideos) setVideos(JSON.parse(savedVideos));
            const savedPosts = localStorage.getItem('adminPosts');
            if (savedPosts) setPosts(JSON.parse(savedPosts));

            // Load from VisitorTracker
            const allVisits = getVisits();
            const allClicks = getClicks();
            setStats({ visits: countTypes(allVisits), clicks: countTypes(allClicks) });
            setRecentVisits(getLatestRows(allVisits, 50));
            setRecentClicks(getLatestRows(allClicks, 50));
        } catch (e) { console.error('Error loading data:', e); }
    };

    // ==================== Auth ====================
    const handleLogin = (e) => {
        e.preventDefault();
        if (username === siteConfig.admin.username && password === siteConfig.admin.password) {
            localStorage.setItem('adminAuth', 'true');
            setIsLoggedIn(true);
            setError('');
            loadAllData();
        } else {
            setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        setIsLoggedIn(false);
    };

    // ==================== Settings ====================
    const handleSaveSettings = () => {
        localStorage.setItem('siteSettings', JSON.stringify(settings));
        showMsg('✅ บันทึกการตั้งค่าสำเร็จ!');
    };

    const showMsg = (msg) => {
        setSaveMessage(msg);
        setTimeout(() => setSaveMessage(''), 3000);
    };

    // ==================== Stats Handlers ====================
    const handleClearStats = (type) => {
        if (confirm(`ต้องการลบข้อมูล ${type} ทั้งหมดหรือไม่?`)) {
            if (type === 'visits' || type === 'all') {
                clearVisits();
            }
            if (type === 'clicks' || type === 'all') {
                clearClicks();
            }
            loadAllData(); // Reload stats
            showMsg(`✅ ลบ ${type} สำเร็จ!`);
        }
    };

    // ==================== YouTube Helpers ====================
    const extractYouTubeId = (url) => {
        if (!url) return null;
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
            /^([a-zA-Z0-9_-]{11})$/,
        ];
        for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
        return null;
    };

    const getYouTubeThumbnail = (id, q = 'hqdefault') => id ? `https://i.ytimg.com/vi/${id}/${q}.jpg` : null;

    const handleVideoUrlChange = (url) => {
        setNewVideo({ ...newVideo, youtubeUrl: url });
        const id = extractYouTubeId(url);
        if (id) {
            setVideoPreview({
                id, thumbnail: getYouTubeThumbnail(id), thumbnailMax: getYouTubeThumbnail(id, 'maxresdefault'),
                embedUrl: `https://www.youtube.com/embed/${id}`, watchUrl: `https://www.youtube.com/watch?v=${id}`,
            });
        } else setVideoPreview(null);
    };

    const generateSlug = (title) => title.toLowerCase().replace(/[^\u0E00-\u0E7Fa-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').substring(0, 50);

    // ==================== Video Handlers ====================
    const handleAddVideo = () => {
        if (!newVideo.title || !videoPreview) { alert('กรุณากรอกชื่อวิดีโอและใส่ลิงก์ YouTube ที่ถูกต้อง'); return; }
        const video = {
            id: Date.now(), title: newVideo.title, slug: newVideo.slug || generateSlug(newVideo.title),
            description: newVideo.description, youtubeId: videoPreview.id, thumbnail: videoPreview.thumbnail,
            thumbnailMax: videoPreview.thumbnailMax, embedUrl: videoPreview.embedUrl, watchUrl: videoPreview.watchUrl,
            createdAt: new Date().toISOString(),
        };
        let updated;
        if (editingVideoIndex >= 0) { updated = [...videos]; updated[editingVideoIndex] = { ...updated[editingVideoIndex], ...video }; setEditingVideoIndex(-1); }
        else { updated = [...videos, video]; }
        setVideos(updated);
        localStorage.setItem('adminVideos', JSON.stringify(updated));
        resetVideoForm();
        showMsg('✅ บันทึกวิดีโอสำเร็จ!');
    };

    const resetVideoForm = () => { setNewVideo({ title: '', youtubeUrl: '', description: '', slug: '' }); setVideoPreview(null); setEditingVideoIndex(-1); };
    const handleEditVideo = (i) => { const v = videos[i]; setNewVideo({ title: v.title, youtubeUrl: v.watchUrl, description: v.description || '', slug: v.slug }); setVideoPreview({ id: v.youtubeId, thumbnail: v.thumbnail, thumbnailMax: v.thumbnailMax, embedUrl: v.embedUrl, watchUrl: v.watchUrl }); setEditingVideoIndex(i); setActiveTab('videos'); };
    const handleDeleteVideo = (i) => { if (confirm('ต้องการลบวิดีโอนี้?')) { const u = videos.filter((_, j) => j !== i); setVideos(u); localStorage.setItem('adminVideos', JSON.stringify(u)); } };

    // ==================== Blog Handlers ====================
    const handleAddPost = () => {
        if (!newPost.title || !newPost.content) { alert('กรุณากรอกชื่อบทความและเนื้อหา'); return; }
        const post = {
            id: Date.now(), title: newPost.title, slug: newPost.slug || generateSlug(newPost.title),
            excerpt: newPost.excerpt || newPost.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
            content: newPost.content, author: newPost.author || siteConfig.name, featuredImage: newPost.featuredImage,
            category: newPost.category || 'ทั่วไป', tags: newPost.tags.split(',').map(t => t.trim()).filter(t => t),
            metaDescription: newPost.metaDescription || newPost.excerpt, metaKeywords: newPost.metaKeywords,
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), published: true,
        };
        let updated;
        if (editingPostIndex >= 0) { updated = [...posts]; updated[editingPostIndex] = { ...updated[editingPostIndex], ...post, id: updated[editingPostIndex].id, createdAt: updated[editingPostIndex].createdAt }; setEditingPostIndex(-1); }
        else { updated = [...posts, post]; }
        setPosts(updated);
        localStorage.setItem('adminPosts', JSON.stringify(updated));
        resetPostForm();
        showMsg('✅ บันทึกบทความสำเร็จ!');
    };

    const resetPostForm = () => { setNewPost({ title: '', slug: '', excerpt: '', content: '', author: siteConfig.name, featuredImage: '', category: 'ทั่วไป', tags: '', metaDescription: '', metaKeywords: '' }); setEditingPostIndex(-1); };
    const handleEditPost = (i) => { const p = posts[i]; setNewPost({ title: p.title, slug: p.slug, excerpt: p.excerpt || '', content: p.content, author: p.author || siteConfig.name, featuredImage: p.featuredImage || '', category: p.category || 'ทั่วไป', tags: Array.isArray(p.tags) ? p.tags.join(', ') : '', metaDescription: p.metaDescription || '', metaKeywords: p.metaKeywords || '' }); setEditingPostIndex(i); setActiveTab('blog'); };
    const handleDeletePost = (i) => { if (confirm('ต้องการลบบทความนี้?')) { const u = posts.filter((_, j) => j !== i); setPosts(u); localStorage.setItem('adminPosts', JSON.stringify(u)); } };
    const togglePostPublished = (i) => { const u = [...posts]; u[i].published = !u[i].published; u[i].updatedAt = new Date().toISOString(); setPosts(u); localStorage.setItem('adminPosts', JSON.stringify(u)); };

    // ==================== Insert HTML ====================
    const insertHtml = (tag) => {
        const ta = document.getElementById('postContent'); if (!ta) return;
        const start = ta.selectionStart, end = ta.selectionEnd, sel = newPost.content.substring(start, end);
        let nc;
        if (tag === 'img') { const url = prompt('URL รูปภาพ:', ''); if (url) { const alt = prompt('คำอธิบายรูป:', ''); nc = newPost.content.substring(0, start) + `<img src="${url}" alt="${alt || ''}" style="max-width:100%;height:auto;border-radius:8px;margin:1rem 0;" />` + newPost.content.substring(end); } else return; }
        else if (tag === 'a') { const url = prompt('URL ลิงก์:', ''); if (url) { const txt = sel || prompt('ข้อความ:', ''); nc = newPost.content.substring(0, start) + `<a href="${url}"${url.startsWith('/') ? '' : ' target="_blank" rel="noopener"'}>${txt}</a>` + newPost.content.substring(end); } else return; }
        else if (tag === 'internal-link') {
            const pages = [{ url: '/', name: 'หน้าแรก' }, { url: '/about', name: 'เกี่ยวกับเรา' }, { url: '/contact', name: 'ติดต่อเรา' }, { url: '/videos', name: 'วิดีโอ' }, { url: '/blog', name: 'บทความ' }, { url: '/faq', name: 'FAQ' }, { url: '/warranty', name: 'การรับประกัน' }];
            const list = pages.map((p, i) => `${i + 1}. ${p.name} (${p.url})`).join('\n');
            const choice = prompt(`เลือกหน้า:\n${list}\nใส่หมายเลข:`, '');
            if (choice && pages[parseInt(choice) - 1]) { const pg = pages[parseInt(choice) - 1]; nc = newPost.content.substring(0, start) + `<a href="${pg.url}">${sel || pg.name}</a>` + newPost.content.substring(end); } else return;
        } else { nc = newPost.content.substring(0, start) + `<${tag}>${sel}</${tag}>` + newPost.content.substring(end); }
        setNewPost({ ...newPost, content: nc });
    };

    // ==================== Styles ====================
    const s = {
        container: { minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4f8, #e2e8f0)', padding: '1rem' },
        card: { background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '1.5rem', marginBottom: '1.5rem' },
        cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '2px solid #e2e8f0' },
        cardTitle: { fontSize: '1.25rem', fontWeight: '700', color: '#1e3a5f', margin: 0 },
        statCard: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' },
        statNumber: { fontSize: '2.5rem', fontWeight: '800', margin: '0.5rem 0' },
        badge: { display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', marginRight: '0.5rem' },
        badgeSuccess: { background: '#dcfce7', color: '#166534' },
        badgeDark: { background: '#374151', color: '#fff' },
        tab: { padding: '0.75rem 1.5rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600', color: '#64748b', borderBottom: '3px solid transparent', transition: 'all 0.2s' },
        tabActive: { color: '#2563eb', borderBottom: '3px solid #2563eb' },
        input: { width: '100%', padding: '0.75rem 1rem', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' },
        textarea: { width: '100%', padding: '0.75rem 1rem', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '1rem', outline: 'none', minHeight: '200px', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' },
        label: { display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' },
        button: { padding: '0.75rem 1.5rem', borderRadius: '10px', border: 'none', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
        buttonPrimary: { background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff' },
        buttonDanger: { background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: '#fff' },
        buttonOutline: { background: 'transparent', border: '2px solid #e2e8f0', color: '#374151' },
        table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' },
        th: { textAlign: 'left', padding: '0.5rem', background: '#f8fafc', borderBottom: '2px solid #e2e8f0', fontWeight: '600', whiteSpace: 'nowrap' },
        td: { padding: '0.5rem', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' },
        toolbar: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' },
        toolbarBtn: { padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' },
    };

    // ==================== Helpers ====================
    const formatTime = (isoStr) => {
        try {
            const d = new Date(isoStr);
            return d.toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' });
        } catch { return isoStr || '-'; }
    };

    const truncate = (str, len = 30) => str && str.length > len ? str.substring(0, len) + '...' : str || '-';

    // ==================== Login Form ====================
    if (!isLoggedIn) {
        return (
            <div style={{ ...s.container, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ ...s.card, width: '100%', maxWidth: '400px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔐</div>
                        <h1 style={{ color: '#1e3a5f', margin: 0 }}>Admin Login</h1>
                    </div>
                    {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '10px', marginBottom: '1rem', textAlign: 'center' }}>⚠️ {error}</div>}
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1rem' }}><label style={s.label}>ชื่อผู้ใช้</label><input type="text" style={s.input} value={username} onChange={(e) => setUsername(e.target.value)} required /></div>
                        <div style={{ marginBottom: '1.5rem' }}><label style={s.label}>รหัสผ่าน</label><input type="password" style={s.input} value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
                        <button type="submit" style={{ ...s.button, ...s.buttonPrimary, width: '100%' }}>เข้าสู่ระบบ</button>
                    </form>
                </div>
            </div>
        );
    }

    // ==================== Admin Dashboard ====================
    return (
        <div style={s.container}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ ...s.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ color: '#1e3a5f', margin: 0, fontSize: '1.5rem' }}>📊 Admin Dashboard</h1>
                        <p style={{ opacity: 0.7, margin: '0.25rem 0 0', fontSize: '0.9rem' }}>รายงานผู้เข้าชม/คลิก แยกคน-บอท</p>
                    </div>
                    <button onClick={handleLogout} style={{ ...s.button, ...s.buttonOutline }}>🚪 ออกจากระบบ</button>
                </div>

                {/* Tabs */}
                <div style={{ ...s.card, padding: '0', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '2px solid #e2e8f0' }}>
                        {['dashboard', 'blog', 'videos', 'settings'].map(tab => (
                            <button key={tab} style={{ ...s.tab, ...(activeTab === tab ? s.tabActive : {}) }} onClick={() => setActiveTab(tab)}>
                                {tab === 'dashboard' && '📊 Dashboard'}
                                {tab === 'blog' && '📝 จัดการบล็อก'}
                                {tab === 'videos' && '🎬 จัดการวิดีโอ'}
                                {tab === 'settings' && '⚙️ ตั้งค่า'}
                            </button>
                        ))}
                    </div>
                </div>

                {saveMessage && <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '10px', marginBottom: '1rem', fontWeight: '600', textAlign: 'center' }}>{saveMessage}</div>}

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <>
                        {/* Stats Cards Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                            {/* Visits */}
                            <div style={s.card}>
                                <div style={s.cardHeader}><h3 style={s.cardTitle}>👁️ Visits (ผู้เข้าชม)</h3></div>
                                <div style={s.statCard}><div style={s.statNumber}>{stats.visits.total}</div><div style={{ opacity: 0.9, fontSize: '0.9rem' }}>ครั้งทั้งหมด</div></div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ ...s.badge, ...s.badgeSuccess }}>คน: {stats.visits.human}</span>
                                    <span style={{ ...s.badge, ...s.badgeDark }}>บอท: {stats.visits.bot}</span>
                                </div>
                                <button onClick={() => handleClearStats('visits')} style={{ ...s.button, ...s.buttonDanger, marginTop: '1rem', fontSize: '0.85rem', padding: '0.5rem 1rem' }}>🗑️ ลบ Visits</button>
                            </div>
                            {/* Clicks */}
                            <div style={s.card}>
                                <div style={s.cardHeader}><h3 style={s.cardTitle}>👆 Clicks (การคลิก)</h3></div>
                                <div style={{ ...s.statCard, background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}><div style={s.statNumber}>{stats.clicks.total}</div><div style={{ opacity: 0.9, fontSize: '0.9rem' }}>ครั้งทั้งหมด</div></div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ ...s.badge, ...s.badgeSuccess }}>คนคลิก: {stats.clicks.human}</span>
                                    <span style={{ ...s.badge, ...s.badgeDark }}>บอทคลิก: {stats.clicks.bot}</span>
                                </div>
                                <button onClick={() => handleClearStats('clicks')} style={{ ...s.button, ...s.buttonDanger, marginTop: '1rem', fontSize: '0.85rem', padding: '0.5rem 1rem' }}>🗑️ ลบ Clicks</button>
                            </div>
                            {/* Content Summary + Clear All */}
                            <div style={s.card}>
                                <div style={s.cardHeader}><h3 style={s.cardTitle}>📚 เนื้อหา</h3></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '2rem', fontWeight: '800', color: '#2563eb' }}>{posts.length}</div><div style={{ fontSize: '0.85rem', opacity: 0.7 }}>📝 บทความ</div></div>
                                    <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '2rem', fontWeight: '800', color: '#d97706' }}>{videos.length}</div><div style={{ fontSize: '0.85rem', opacity: 0.7 }}>🎬 วิดีโอ</div></div>
                                </div>
                                <button onClick={() => handleClearStats('all')} style={{ ...s.button, ...s.buttonDanger, width: '100%', marginTop: '1rem' }}>🗑️ ลบสถิติทั้งหมด</button>
                            </div>
                        </div>

                        {/* Visits Table */}
                        <div style={s.card}>
                            <div style={s.cardHeader}><h3 style={s.cardTitle}>👁️ Visits ล่าสุด (50 รายการ)</h3></div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>💡 เอาเมาส์ชี้เพื่อดูข้อความเต็ม</div>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={s.table}>
                                    <thead>
                                        <tr>
                                            <th style={s.th}>เวลา</th>
                                            <th style={s.th}>ประเภท</th>
                                            <th style={s.th}>IP</th>
                                            <th style={s.th}>URL</th>
                                            <th style={s.th}>Referer</th>
                                            <th style={s.th}>User-Agent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentVisits.length === 0 ? (
                                            <tr><td colSpan="6" style={{ ...s.td, textAlign: 'center', opacity: 0.6 }}>ยังไม่มีข้อมูล visits</td></tr>
                                        ) : (
                                            recentVisits.map((v, i) => (
                                                <tr key={i}>
                                                    <td style={s.td}>{formatTime(v.time)}</td>
                                                    <td style={s.td}><span style={{ ...s.badge, ...(v.visitorType === 'bot' ? s.badgeDark : s.badgeSuccess) }}>{v.visitorType === 'bot' ? 'บอท' : 'คน'}</span></td>
                                                    <td style={s.td}>{v.ip || '-'}</td>
                                                    <td style={s.td} title={v.url}>{truncate(v.url, 40)}</td>
                                                    <td style={s.td} title={v.referer}>{truncate(v.referer, 30)}</td>
                                                    <td style={s.td} title={v.userAgent}>{truncate(v.userAgent, 40)}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Clicks Table */}
                        <div style={s.card}>
                            <div style={s.cardHeader}><h3 style={s.cardTitle}>👆 Clicks ล่าสุด (50 รายการ)</h3></div>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={s.table}>
                                    <thead>
                                        <tr>
                                            <th style={s.th}>เวลา</th>
                                            <th style={s.th}>ประเภท</th>
                                            <th style={s.th}>Target</th>
                                            <th style={s.th}>URL</th>
                                            <th style={s.th}>Referer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentClicks.length === 0 ? (
                                            <tr><td colSpan="5" style={{ ...s.td, textAlign: 'center', opacity: 0.6 }}>ยังไม่มีข้อมูล clicks</td></tr>
                                        ) : (
                                            recentClicks.map((c, i) => (
                                                <tr key={i}>
                                                    <td style={s.td}>{formatTime(c.time)}</td>
                                                    <td style={s.td}><span style={{ ...s.badge, ...(c.visitorType === 'bot' ? s.badgeDark : s.badgeSuccess) }}>{c.visitorType === 'bot' ? 'บอท' : 'คน'}</span></td>
                                                    <td style={s.td}>{c.target || '-'}</td>
                                                    <td style={s.td} title={c.url}>{truncate(c.url, 40)}</td>
                                                    <td style={s.td} title={c.referer}>{truncate(c.referer, 30)}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* Blog Tab */}
                {activeTab === 'blog' && (
                    <>
                        <div style={s.card}>
                            <div style={s.cardHeader}><h3 style={s.cardTitle}>{editingPostIndex >= 0 ? '✏️ แก้ไขบทความ' : '➕ เพิ่มบทความใหม่'}</h3></div>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                    <div><label style={s.label}>📌 ชื่อบทความ *</label><input type="text" style={s.input} value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} /></div>
                                    <div><label style={s.label}>🏷️ Slug</label><input type="text" style={s.input} value={newPost.slug} onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })} /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                    <div><label style={s.label}>✍️ ผู้เขียน</label><input type="text" style={s.input} value={newPost.author} onChange={(e) => setNewPost({ ...newPost, author: e.target.value })} /></div>
                                    <div><label style={s.label}>📁 หมวดหมู่</label><select style={s.input} value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}><option>ทั่วไป</option><option>รีวิว</option><option>เทคนิค</option><option>ข่าวสาร</option><option>โปรโมชั่น</option></select></div>
                                </div>
                                <div><label style={s.label}>🖼️ รูปภาพหลัก (URL)</label><input type="text" style={s.input} value={newPost.featuredImage} onChange={(e) => setNewPost({ ...newPost, featuredImage: e.target.value })} />{newPost.featuredImage && <img src={newPost.featuredImage} alt="Preview" style={{ maxWidth: '200px', marginTop: '0.5rem', borderRadius: '8px' }} onError={(e) => e.target.style.display = 'none'} />}</div>
                                <div><label style={s.label}>📄 บทสรุป</label><textarea style={{ ...s.textarea, minHeight: '80px' }} value={newPost.excerpt} onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })} /></div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}><label style={s.label}>📝 เนื้อหา (รองรับ HTML) *</label><button style={{ ...s.toolbarBtn, background: showHtmlEditor ? '#2563eb' : '#fff', color: showHtmlEditor ? '#fff' : '#374151' }} onClick={() => setShowHtmlEditor(!showHtmlEditor)}>{showHtmlEditor ? '👁️ Preview' : '< > HTML'}</button></div>
                                    <div style={s.toolbar}>
                                        <button type="button" style={s.toolbarBtn} onClick={() => insertHtml('h2')}>H2</button>
                                        <button type="button" style={s.toolbarBtn} onClick={() => insertHtml('h3')}>H3</button>
                                        <button type="button" style={s.toolbarBtn} onClick={() => insertHtml('p')}>P</button>
                                        <button type="button" style={s.toolbarBtn} onClick={() => insertHtml('strong')}><b>B</b></button>
                                        <button type="button" style={s.toolbarBtn} onClick={() => insertHtml('em')}><i>I</i></button>
                                        <button type="button" style={s.toolbarBtn} onClick={() => insertHtml('ul')}>• List</button>
                                        <button type="button" style={s.toolbarBtn} onClick={() => insertHtml('li')}>• Item</button>
                                        <button type="button" style={{ ...s.toolbarBtn, background: '#dcfce7' }} onClick={() => insertHtml('a')}>🔗 Link</button>
                                        <button type="button" style={{ ...s.toolbarBtn, background: '#dbeafe' }} onClick={() => insertHtml('internal-link')}>📎 Internal</button>
                                        <button type="button" style={{ ...s.toolbarBtn, background: '#fef3c7' }} onClick={() => insertHtml('img')}>🖼️ รูป</button>
                                    </div>
                                    {showHtmlEditor ? <div style={{ ...s.textarea, minHeight: '300px', padding: '1rem', background: '#f8fafc', overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: newPost.content || '<p style="opacity:0.5">Preview...</p>' }} /> : <textarea id="postContent" style={{ ...s.textarea, minHeight: '300px', fontFamily: 'monospace' }} value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} />}
                                </div>
                                <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '10px', borderLeft: '4px solid #2563eb' }}>
                                    <h4 style={{ marginTop: 0, color: '#1e40af' }}>🔍 SEO Settings</h4>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <div><label style={s.label}>Meta Description</label><textarea style={{ ...s.textarea, minHeight: '60px' }} value={newPost.metaDescription} onChange={(e) => setNewPost({ ...newPost, metaDescription: e.target.value })} /><small style={{ opacity: 0.7 }}>{newPost.metaDescription.length}/160</small></div>
                                        <div><label style={s.label}>Meta Keywords</label><input type="text" style={s.input} value={newPost.metaKeywords} onChange={(e) => setNewPost({ ...newPost, metaKeywords: e.target.value })} /></div>
                                        <div><label style={s.label}>Tags (แยกด้วย comma)</label><input type="text" style={s.input} value={newPost.tags} onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })} /></div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <button onClick={handleAddPost} style={{ ...s.button, ...s.buttonPrimary }}>{editingPostIndex >= 0 ? '💾 บันทึก' : '➕ เพิ่มบทความ'}</button>
                                    {editingPostIndex >= 0 && <button onClick={resetPostForm} style={{ ...s.button, ...s.buttonOutline }}>❌ ยกเลิก</button>}
                                </div>
                            </div>
                        </div>
                        <div style={s.card}>
                            <div style={s.cardHeader}><h3 style={s.cardTitle}>📚 บทความทั้งหมด ({posts.length})</h3></div>
                            {posts.length === 0 ? <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.7 }}><div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div><p>ยังไม่มีบทความ</p></div> : (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {posts.map((p, i) => (
                                        <div key={p.id || i} style={{ border: '2px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                            {p.featuredImage && <img src={p.featuredImage} alt={p.title} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} onError={(e) => e.target.style.display = 'none'} />}
                                            <div style={{ flex: 1, minWidth: '200px' }}><h4 style={{ margin: '0 0 0.5rem', color: '#1e3a5f' }}>{p.title}</h4><div style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.5rem' }}><span>📁 {p.category}</span><span style={{ marginLeft: '1rem' }}>✍️ {p.author}</span><span style={{ marginLeft: '1rem' }}>📅 {new Date(p.createdAt).toLocaleDateString('th-TH')}</span></div><div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}><span style={{ ...s.badge, ...(p.published ? s.badgeSuccess : { background: '#fef3c7', color: '#92400e' }) }}>{p.published ? '✅ เผยแพร่' : '📝 ฉบับร่าง'}</span><span style={{ ...s.badge, ...s.badgeDark }}>/blog/{p.slug}</span></div></div>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}><button onClick={() => togglePostPublished(i)} style={{ ...s.button, ...s.buttonOutline, fontSize: '0.85rem', padding: '0.5rem' }}>{p.published ? '📝 ซ่อน' : '✅ เผยแพร่'}</button><button onClick={() => handleEditPost(i)} style={{ ...s.button, ...s.buttonOutline, fontSize: '0.85rem', padding: '0.5rem' }}>✏️</button><button onClick={() => handleDeletePost(i)} style={{ ...s.button, ...s.buttonDanger, fontSize: '0.85rem', padding: '0.5rem' }}>🗑️</button></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Videos Tab */}
                {activeTab === 'videos' && (
                    <>
                        <div style={s.card}>
                            <div style={s.cardHeader}><h3 style={s.cardTitle}>{editingVideoIndex >= 0 ? '✏️ แก้ไขวิดีโอ' : '➕ เพิ่มวิดีโอใหม่'}</h3></div>
                            <div style={{ display: 'grid', gridTemplateColumns: videoPreview ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
                                <div>
                                    <div style={{ marginBottom: '1rem' }}><label style={s.label}>🔗 YouTube URL *</label><input type="text" style={s.input} value={newVideo.youtubeUrl} onChange={(e) => handleVideoUrlChange(e.target.value)} /></div>
                                    <div style={{ marginBottom: '1rem' }}><label style={s.label}>📌 ชื่อวิดีโอ *</label><input type="text" style={s.input} value={newVideo.title} onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })} /></div>
                                    <div style={{ marginBottom: '1rem' }}><label style={s.label}>🏷️ Slug</label><input type="text" style={s.input} value={newVideo.slug} onChange={(e) => setNewVideo({ ...newVideo, slug: e.target.value })} /></div>
                                    <div style={{ marginBottom: '1rem' }}><label style={s.label}>📝 คำอธิบาย</label><textarea style={{ ...s.textarea, minHeight: '100px' }} value={newVideo.description} onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })} /></div>
                                    <div style={{ display: 'flex', gap: '0.75rem' }}><button onClick={handleAddVideo} style={{ ...s.button, ...s.buttonPrimary }}>{editingVideoIndex >= 0 ? '💾 บันทึก' : '➕ เพิ่มวิดีโอ'}</button>{editingVideoIndex >= 0 && <button onClick={resetVideoForm} style={{ ...s.button, ...s.buttonOutline }}>❌ ยกเลิก</button>}</div>
                                </div>
                                {videoPreview && <div><label style={s.label}>🖼️ Preview</label><div style={{ border: '2px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}><img src={videoPreview.thumbnail} alt="Thumbnail" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} onError={(e) => { e.target.src = videoPreview.thumbnailMax; }} /><div style={{ padding: '1rem' }}><div style={{ fontSize: '0.85rem', opacity: 0.7 }}><strong>ID:</strong> {videoPreview.id}</div></div></div><div style={{ background: '#dcfce7', color: '#166534', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginTop: '0.5rem' }}>✅ ลิงก์ถูกต้อง!</div></div>}
                            </div>
                        </div>
                        <div style={s.card}>
                            <div style={s.cardHeader}><h3 style={s.cardTitle}>📚 วิดีโอทั้งหมด ({videos.length})</h3></div>
                            {videos.length === 0 ? <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.7 }}><div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div><p>ยังไม่มีวิดีโอ</p></div> : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                    {videos.map((v, i) => (
                                        <div key={v.id || i} style={{ border: '2px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                                            <img src={v.thumbnail} alt={v.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} onError={(e) => { e.target.src = `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`; }} />
                                            <div style={{ padding: '1rem' }}><h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{v.title}</h4><div style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.75rem' }}>Slug: <code>{v.slug}</code></div><div style={{ display: 'flex', gap: '0.5rem' }}><button onClick={() => handleEditVideo(i)} style={{ ...s.button, ...s.buttonOutline, flex: 1, fontSize: '0.85rem', padding: '0.5rem' }}>✏️</button><button onClick={() => handleDeleteVideo(i)} style={{ ...s.button, ...s.buttonDanger, flex: 1, fontSize: '0.85rem', padding: '0.5rem' }}>🗑️</button></div></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div style={s.card}>
                        <div style={s.cardHeader}><h3 style={s.cardTitle}>⚙️ ตั้งค่าระบบ</h3></div>
                        <div style={{ display: 'grid', gap: '1rem', maxWidth: '600px' }}>
                            <div><label style={s.label}>Google Ads Tag ID</label><input type="text" style={s.input} value={settings.googleTagId} onChange={(e) => setSettings({ ...settings, googleTagId: e.target.value })} placeholder="AW-XXXXXXXXX" /></div>
                            <div>
                                <label style={s.label}>Shop URL</label>
                                <input type="text" style={s.input} value={settings.shopUrl} onChange={(e) => setSettings({ ...settings, shopUrl: e.target.value })} placeholder="https://workshop.pgphone-thai.shop" />
                                <small style={{ opacity: 0.7 }}>ตัวอย่าง: https://workshop.pgphone-thai.shop</small>
                            </div>
                            {/* Preview Shop Image */}
                            {settings.shopUrl && (
                                <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '10px', border: '2px solid #e2e8f0' }}>
                                    <label style={s.label}>🖼️ Preview รูปจาก Shop URL</label>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>
                                        URL: {settings.shopUrl.replace(/\/+$/, '')}/img-proxy.php?f=1.gif&v=00419aed08
                                    </p>
                                    <img
                                        src={`${settings.shopUrl.replace(/\/+$/, '')}/img-proxy.php?f=1.gif&v=00419aed08`}
                                        alt="Shop preview"
                                        style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', objectFit: 'contain' }}
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                                    />
                                    <div style={{ display: 'none', color: '#dc2626', padding: '1rem', background: '#fee2e2', borderRadius: '8px' }}>
                                        ⚠️ ไม่สามารถโหลดรูปได้ ตรวจสอบ URL ให้ถูกต้อง
                                    </div>
                                </div>
                            )}
                            <button onClick={handleSaveSettings} style={{ ...s.button, ...s.buttonPrimary, marginTop: '0.5rem' }}>💾 บันทึก</button>
                        </div>
                        <div style={{ marginTop: '2rem', padding: '1rem', background: '#fef3c7', borderRadius: '10px', borderLeft: '4px solid #f59e0b' }}>
                            <strong style={{ color: '#92400e' }}>💡 ข้อมูลเว็บไซต์:</strong>
                            <table style={{ marginTop: '0.5rem', width: '100%', fontSize: '0.9rem' }}><tbody>
                                <tr><td style={{ padding: '0.25rem 0', opacity: 0.7 }}>ชื่อ:</td><td>{siteConfig.name}</td></tr>
                                <tr><td style={{ padding: '0.25rem 0', opacity: 0.7 }}>URL:</td><td>{siteConfig.baseUrl}</td></tr>
                                <tr><td style={{ padding: '0.25rem 0', opacity: 0.7 }}>โทร:</td><td>{siteConfig.company.phone}</td></tr>
                                <tr><td style={{ padding: '0.25rem 0', opacity: 0.7 }}>LINE:</td><td>{siteConfig.social.lineId}</td></tr>
                            </tbody></table>
                            <p style={{ margin: '0.5rem 0 0', opacity: 0.8, fontSize: '0.85rem' }}>แก้ไขใน <code>.env</code> หรือ <code>src/config/site.js</code></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
