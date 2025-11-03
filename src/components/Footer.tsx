import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-midnight-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="size-6 text-electric-teal">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold">MTD Gayrimenkul</h2>
            </div>
            <p className="mt-4 text-sm text-white/70">Alanya ve Antalya bölgesindeki gayrimenkul ihtiyaçlarınız için güvenilir ortağınız.</p>
            <div className="flex gap-4 mt-6">
              {/* Placeholder for social icons */}
              <a href="#" className="text-white/70 hover:text-white transition-colors">FB</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">IG</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">LN</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li><Link href="/satilik" className="text-sm text-white/70 hover:text-white transition-colors">Satılık</Link></li>
              <li><Link href="/kiralik" className="text-sm text-white/70 hover:text-white transition-colors">Kiralık</Link></li>
              <li><Link href="/projeler" className="text-sm text-white/70 hover:text-white transition-colors">Projeler</Link></li>
              <li><Link href="/hakkimizda" className="text-sm text-white/70 hover:text-white transition-colors">Hakkımızda</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">İletişim</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2"><span>📍</span><span>1234 Örnek Sokak, Alanya, Antalya</span></li>
              <li className="flex items-start gap-2"><span>📞</span><span>+90 555 123 4567</span></li>
              <li className="flex items-start gap-2"><span>✉️</span><span>info@mtdgayrimenkul.com</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Bültenimize Abone Olun</h4>
            <p className="text-sm text-white/70 mb-4">En yeni ilanlardan ilk siz haberdar olun.</p>
            <form className="flex">
              <input className="form-input w-full rounded-l-lg border-0 bg-white/20 text-white placeholder-white/50 focus:ring-0" placeholder="E-posta adresiniz" type="email" />
              <button className="px-4 py-2 bg-white/30 rounded-r-lg hover:bg-white/50 transition-colors" aria-label="Abone Ol">
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} MTD Gayrimenkul & Emlak. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
