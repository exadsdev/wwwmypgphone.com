'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import siteConfig from '@/config/site';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'หน้าแรก' },
        { href: '/videos', label: 'วิดีโอ' },
        { href: '/blog', label: 'Blog' },
        { href: '/about', label: 'เกี่ยวกับเรา' },
        { href: '/warranty', label: 'การรับประกัน' },
        { href: '/contact', label: 'ติดต่อเรา' },
    ];

    const isActive = (href) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <header className="header">
            <nav className="nav container">
                <Link href="/" className="logo" aria-label={`${siteConfig.name} หน้าแรก`}>
                    <Image
                        src={siteConfig.images.logo}
                        alt={`${siteConfig.name} Logo`}
                        width={120}
                        height={40}
                        priority
                    />
                </Link>

                <button
                    className="nav-toggle"
                    aria-label="เปิดเมนู"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} role="menubar">
                    {navLinks.map((link) => (
                        <li key={link.href} role="none">
                            <Link
                                href={link.href}
                                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                                role="menuitem"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
