import siteConfig from '@/config/site';

export default function FloatingLineButton() {
    return (
        <a
            href={siteConfig.social.line}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn"
            aria-label="ติดต่อผ่าน LINE"
        >
            <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
                <path d="M12,.5C5.66.5.5,4.95.5,10.42c0,4.9,4.34,9,10.23,9.78.4.09.94.27,1.08.61.12.31.08.79.04,1.1l-.17,1c-.05.29-.22,1.16,1.01.63,1.23-.53,6.65-3.92,9.08-6.71h0C23.23,14.8,24,12.69,24,10.42,24,4.95,18.34.5,12,.5Z" />
            </svg>
        </a>
    );
}
