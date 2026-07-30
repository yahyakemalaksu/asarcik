import React, { useState, useEffect } from 'react';
import img1 from './assets/img/1.png';
import img2 from './assets/img/2.png';
import img3 from './assets/img/1k.png';
import img4 from './assets/img/2k.png';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  Maximize2, 
  X, 
  Menu, 
  CheckCircle2, 
  ExternalLink,
  Navigation,
  Share2,
  TreePine,
  Factory,
  Compass as CompassIcon,
  ShieldCheck
} from 'lucide-react';

interface LightboxState {
  isOpen: boolean;
  src: string;
  title: string;
  alt: string;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<string>('Henüz karar vermedim');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [heroViewMode, setHeroViewMode] = useState<'cad' | 'satellite'>('cad');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    src: '',
    title: '',
    alt: ''
  });

  // Intersection Observer for scroll animation reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const openImageModal = (src: string, title: string, alt: string) => {
    setLightbox({
      isOpen: true,
      src,
      title,
      alt
    });
  };

  const closeImageModal = () => {
    setLightbox({ ...lightbox, isOpen: false });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectParcelAndScroll = (parcelName: string) => {
    setSelectedParcel(parcelName);
    scrollToSection('iletisim');
  };

  return (
    <div className="min-h-screen bg-[#141410] text-[#ede7d6] font-sans-custom selection:bg-[#c6a15b] selection:text-[#141410]">
      {/* HEADER NAV */}
      <header className="sticky top-0 z-50 bg-[#141410]/90 backdrop-blur-md border-b border-[#c6a15b]/15">
        <div className="wrap">
          <nav className="flex items-center justify-between py-5">
            <a href="#" className="flex flex-col group">
              <span className="font-serif-custom text-xl tracking-wider text-[#ede7d6] group-hover:text-[#c6a15b] transition-colors">
                ASARCIK VİLLALARI
              </span>
              <span className="font-mono-custom text-[10px] tracking-[0.18em] text-[#c6a15b] mt-1">
                ASARCIK · KASTAMONU
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-9 text-sm text-[#a39c8a]">
              <button onClick={() => scrollToSection('proje')} className="hover:text-[#c6a15b] transition-colors cursor-pointer">Proje</button>
              <button onClick={() => scrollToSection('parseller')} className="hover:text-[#c6a15b] transition-colors cursor-pointer">Parseller</button>
              <button onClick={() => scrollToSection('ayricaliklar')} className="hover:text-[#c6a15b] transition-colors cursor-pointer">Ayrıcalıklar</button>
              <button onClick={() => scrollToSection('surec')} className="hover:text-[#c6a15b] transition-colors cursor-pointer">Süreç</button>
              <button onClick={() => scrollToSection('konum')} className="hover:text-[#c6a15b] transition-colors cursor-pointer">Konum</button>
              <button onClick={() => scrollToSection('iletisim')} className="hover:text-[#c6a15b] transition-colors cursor-pointer">İletişim</button>
            </div>

            <div className="hidden md:block">
              <button 
                onClick={() => scrollToSection('iletisim')}
                className="text-xs tracking-wider uppercase px-5 py-2.5 border border-[#c6a15b] text-[#c6a15b] hover:bg-[#c6a15b] hover:text-[#141410] transition-all rounded-xs font-medium cursor-pointer"
              >
                Randevu Al
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#c6a15b] hover:text-[#ede7d6] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Drawer Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#c6a15b]/15 animate-fadeIn">
              <div className="flex flex-col space-y-3 text-sm text-[#a39c8a]">
                <button onClick={() => scrollToSection('proje')} className="text-left py-2 hover:text-[#c6a15b]">Proje</button>
                <button onClick={() => scrollToSection('parseller')} className="text-left py-2 hover:text-[#c6a15b]">Parseller</button>
                <button onClick={() => scrollToSection('ayricaliklar')} className="text-left py-2 hover:text-[#c6a15b]">Ayrıcalıklar</button>
                <button onClick={() => scrollToSection('surec')} className="text-left py-2 hover:text-[#c6a15b]">Süreç</button>
                <button onClick={() => scrollToSection('konum')} className="text-left py-2 hover:text-[#c6a15b]">Konum & Harita</button>
                <button onClick={() => scrollToSection('iletisim')} className="text-left py-2 hover:text-[#c6a15b]">İletişim</button>
                <button 
                  onClick={() => scrollToSection('iletisim')}
                  className="w-full text-center mt-2 py-3 bg-[#c6a15b] text-[#141410] font-semibold text-xs tracking-wider uppercase rounded-xs"
                >
                  Randevu Al
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-0 border-b border-[#c6a15b]/15">
        <svg className="contours" viewBox="0 0 1180 700" preserveAspectRatio="none">
          <path d="M-50,120 C 200,60 400,180 620,110 S 1000,40 1250,100" stroke="#c6a15b" strokeWidth="1" fill="none" opacity="0.25"/>
          <path d="M-50,220 C 220,170 420,270 640,210 S 1000,150 1250,210" stroke="#c6a15b" strokeWidth="1" fill="none" opacity="0.18"/>
          <path d="M-50,330 C 240,290 440,380 660,320 S 1010,270 1250,330" stroke="#c6a15b" strokeWidth="1" fill="none" opacity="0.14"/>
          <path d="M-50,440 C 250,410 460,480 670,430 S 1020,390 1250,440" stroke="#c6a15b" strokeWidth="1" fill="none" opacity="0.1"/>
        </svg>

        <div className="wrap relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="font-mono-custom text-xs tracking-[0.2em] text-[#c6a15b] uppercase mb-5 flex items-center gap-3">
                <span className="w-7 h-[1px] bg-[#c6a15b] inline-block"></span>
                41°24'45"N · 33°44'40"E
              </div>

              <h1 className="font-serif-custom text-4xl sm:text-5xl md:text-6xl leading-[1.08] text-[#ede7d6]">
                Şehre yakın,<br />ormana <em className="italic font-medium text-[#c6a15b]">komşu</em><br />üç bitişik arsa.
              </h1>

              <p className="mt-6 text-lg text-[#a39c8a] max-w-xl font-normal leading-relaxed">
                Taşlık Mahallesi'nde, yeni kurulacak Maslak Sanayi Sitesi'ne 1 km, Kastamonu şehir merkezine 5 km uzaklıkta; orman manzaralı, şehrin gürültüsünden uzak 3 bitişik parsel.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">
                <button 
                  onClick={() => scrollToSection('iletisim')}
                  className="bg-[#c6a15b] text-[#141410] px-7 py-4 text-sm font-semibold tracking-wide rounded-xs hover:bg-[#d9b46e] transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-[#c6a15b]/10"
                >
                  Bilgi Almak İçin İletişime Geç
                </button>
                <button 
                  onClick={() => scrollToSection('parseller')}
                  className="px-7 py-4 text-sm border border-[#c6a15b]/30 text-[#ede7d6] rounded-xs hover:border-[#c6a15b] hover:text-[#c6a15b] transition-all cursor-pointer"
                >
                  Parselleri İncele
                </button>
              </div>
            </div>

            {/* Interactive Vector CAD & Satellite View 239 ADA */}
            <div className="lg:col-span-5 relative h-[380px] sm:h-[420px] bg-[#1b1b15]/60 border border-[#c6a15b]/20 rounded-xs p-4 flex flex-col justify-center items-center overflow-hidden group">
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#141410]/90 p-1 border border-[#c6a15b]/30 rounded-xs">
                <button 
                  onClick={() => setHeroViewMode('cad')}
                  className={`font-mono-custom text-[10px] px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${heroViewMode === 'cad' ? 'bg-[#c6a15b] text-[#141410] font-semibold' : 'text-[#a39c8a] hover:text-[#ede7d6]'}`}
                >
                  239 ADA · PLAN
                </button>
                <button 
                  onClick={() => setHeroViewMode('satellite')}
                  className={`font-mono-custom text-[10px] px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${heroViewMode === 'satellite' ? 'bg-[#c6a15b] text-[#141410] font-semibold' : 'text-[#a39c8a] hover:text-[#ede7d6]'}`}
                >
                  UYDU GÖRÜNTÜSÜ
                </button>
              </div>

              {heroViewMode === 'cad' ? (
                <svg viewBox="0 0 300 420" className="w-full h-full max-h-[360px] animate-fadeIn">
                  {/* 239/2 */}
                  <g 
                    onClick={() => selectParcelAndScroll('239 Ada 2 Parsel (818,96 m²)')}
                    className="cursor-pointer group/item"
                  >
                    <path 
                      d="M148,18 L226,72 L196,148 L88,158 L54,102 Z" 
                      className="stroke-[#c6a15b] stroke-[1.5] fill-[#c6a15b]/10 group-hover/item:fill-[#c6a15b]/25 transition-all" 
                      strokeDasharray="4 4"
                    />
                    <text x="142" y="93" className="font-mono-custom text-[14px] font-medium fill-[#c6a15b] text-anchor-middle">239 / 2</text>
                    <text x="142" y="110" className="font-mono-custom text-[10.5px] fill-[#a39c8a] text-anchor-middle">818,96 m²</text>
                  </g>

                  {/* 239/3 */}
                  <g 
                    onClick={() => selectParcelAndScroll('239 Ada 3 Parsel (851,28 m²)')}
                    className="cursor-pointer group/item"
                  >
                    <path 
                      d="M88,158 L196,148 L164,252 L58,258 Z" 
                      className="stroke-[#8a7140] stroke-[1.5] fill-[#c6a15b]/10 group-hover/item:fill-[#c6a15b]/25 transition-all" 
                      strokeDasharray="4 4"
                    />
                    <text x="126" y="198" className="font-mono-custom text-[14px] font-medium fill-[#c6a15b] text-anchor-middle">239 / 3</text>
                    <text x="126" y="215" className="font-mono-custom text-[10.5px] fill-[#a39c8a] text-anchor-middle">851,28 m²</text>
                  </g>

                  {/* 239/4 */}
                  <g 
                    onClick={() => selectParcelAndScroll('239 Ada 4 Parsel (1.010,62 m²)')}
                    className="cursor-pointer group/item"
                  >
                    <path 
                      d="M58,258 L164,252 L122,398 Z" 
                      className="stroke-[#c6a15b] stroke-[1.5] fill-[#c6a15b]/10 group-hover/item:fill-[#c6a15b]/25 transition-all" 
                      strokeDasharray="4 4"
                    />
                    <text x="115" y="300" className="font-mono-custom text-[14px] font-medium fill-[#c6a15b] text-anchor-middle">239 / 4</text>
                    <text x="115" y="317" className="font-mono-custom text-[10.5px] fill-[#a39c8a] text-anchor-middle">1.010,62 m²</text>
                  </g>

                  <circle cx="148" cy="18" r="3" fill="#c6a15b"/>
                  <circle cx="226" cy="72" r="3" fill="#c6a15b"/>
                  <circle cx="54" cy="102" r="3" fill="#c6a15b"/>
                  <circle cx="58" cy="258" r="3" fill="#c6a15b"/>
                  <circle cx="122" cy="398" r="3" fill="#c6a15b"/>
                </svg>
              ) : (
                <div 
                  className="w-full h-full relative cursor-pointer overflow-hidden rounded-xs animate-fadeIn"
                  onClick={() => openImageModal(
                    '/1k.png', 
                    '239 ADA · PARSEL 2–3–4 SINIRLARI', 
                    '239 ada 2, 3, 4 parsel sınırlarını gösteren detaylı uydu görüntüsü'
                  )}
                >
                  <img 
                    src="/1.png" 
                    alt="239 Ada 2, 3, 4 Parsel Sınırları Uydu Fotoğrafı" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = '/img/1k.png';
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#141410]/90 text-[#c6a15b] px-3.5 py-2 border border-[#c6a15b] rounded-xs font-mono-custom text-xs flex items-center gap-2">
                      <Maximize2 size={14} /> Tam Ekran İncele
                    </span>
                  </div>
                </div>
              )}

              <div className="absolute bottom-3 right-3 text-[10px] font-mono-custom text-[#a39c8a] bg-[#141410]/70 px-2 py-0.5 rounded-xs">
                {heroViewMode === 'cad' ? '*Parsel seçmek için tıklayın' : '*Büyütmek için fotoğrafa tıklayın'}
              </div>
            </div>
          </div>

          {/* Key Metrics Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#c6a15b]/15 mt-16 relative z-10">
            <div className="p-6 md:p-8 border-r border-[#c6a15b]/15 border-b md:border-b-0">
              <div className="font-serif-custom text-3xl md:text-4xl text-[#c6a15b]">3</div>
              <div className="text-xs text-[#a39c8a] mt-1.5 tracking-wide">Bitişik parsel</div>
            </div>
            <div className="p-6 md:p-8 md:border-r border-[#c6a15b]/15 border-b md:border-b-0">
              <div className="font-serif-custom text-3xl md:text-4xl text-[#c6a15b]">2.680 m²</div>
              <div className="text-xs text-[#a39c8a] mt-1.5 tracking-wide">Toplam tapu alanı</div>
            </div>
            <div className="p-6 md:p-8 border-r border-[#c6a15b]/15">
              <div className="font-serif-custom text-3xl md:text-4xl text-[#c6a15b]">1 km</div>
              <div className="text-xs text-[#a39c8a] mt-1.5 tracking-wide">Maslak Sanayi Sitesi'ne</div>
            </div>
            <div className="p-6 md:p-8">
              <div className="font-serif-custom text-3xl md:text-4xl text-[#c6a15b]">5 km</div>
              <div className="text-xs text-[#a39c8a] mt-1.5 tracking-wide">Kastamonu Şehir Merkezi'ne</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-[#1b1b15] py-24" id="proje">
        <div className="wrap">
          <div className="max-w-2xl mb-16 reveal">
            <div className="font-mono-custom text-xs tracking-[0.2em] text-[#c6a15b] uppercase mb-4 flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#c6a15b]"></span>
              Arsa Hakkında
            </div>
            <h2 className="font-serif-custom text-3xl md:text-4xl text-[#ede7d6]">
              Şehrin eşiğinde, ormanın içinde.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-5 reveal text-[#a39c8a] text-base leading-relaxed">
              <p>
                Taşlık Mahallesi, Kastamonu Merkez sınırları içinde, orman dokusunun ortasına yerleşmiş sakin bir bölgede yer alır. 239 ada üzerindeki üç bitişik parsel aynı sınır çizgisini paylaşır ve toplamda 2.680 m²'lik kesintisiz bir alan oluşturur.
              </p>
              <p>
                Parseller tapu kayıtlarında "ham toprak" niteliğindedir; imar planı henüz oluşmamıştır. Bölgenin asıl değeri, 1 km ötede kurulacak Maslak Sanayi Sitesi'ne ve yalnızca 5 km'lik mesafeyle Kastamonu şehir merkezine olan yakınlığından gelir.
              </p>

              <div className="grid grid-cols-2 gap-5 pt-4">
                <div className="border border-[#c6a15b]/15 p-5 rounded-xs bg-[#1f1f18]">
                  <div className="font-mono-custom text-[#c6a15b] text-xs tracking-wider">NİTELİK</div>
                  <div className="font-serif-custom text-2xl text-[#ede7d6] mt-2">Ham Toprak</div>
                </div>
                <div className="border border-[#c6a15b]/15 p-5 rounded-xs bg-[#1f1f18]">
                  <div className="font-mono-custom text-[#c6a15b] text-xs tracking-wider">PAFTA</div>
                  <div className="font-serif-custom text-xl sm:text-2xl text-[#ede7d6] mt-2">F31-A-10-C-2-C</div>
                </div>
              </div>
            </div>

            <div className="border-l border-[#c6a15b] pl-7 reveal">
              <div className="font-serif-custom text-5xl text-[#8a7140] leading-none mb-2">"</div>
              <blockquote className="font-serif-custom italic text-xl md:text-2xl text-[#ede7d6] leading-relaxed">
                Bir arsa alırsınız ama aslında şehrin büyümesinden bir adım önde olmayı satın almış olursunuz.
              </blockquote>
              <div className="text-xs text-[#a39c8a] mt-5 font-mono-custom">
                — Asarcık Villaları, Proje Notları
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARCELS SECTION */}
      <section className="py-24" id="parseller">
        <div className="wrap">
          <div className="max-w-2xl mb-16 reveal">
            <div className="font-mono-custom text-xs tracking-[0.2em] text-[#c6a15b] uppercase mb-4 flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#c6a15b]"></span>
              Parseller
            </div>
            <h2 className="font-serif-custom text-3xl md:text-4xl text-[#ede7d6]">
              Bitişik üç parsel, tek fırsat.
            </h2>
            <p className="text-[#a39c8a] mt-4 text-base">
              239 ada üzerindeki üç komşu parsel; aynı pafta, aynı nitelik, aynı konum. Tapu kayıtlarındaki resmi bilgiler aşağıda yer alıyor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* PARSEL 2 */}
            <div className="plot-card reveal flex flex-col justify-between">
              <div>
                <div className="plot-top flex items-center justify-between p-4">
                  <span className="font-mono-custom text-[11px] tracking-wider text-[#c6a15b] bg-[#141410]/80 border border-[#c6a15b]/30 px-2.5 py-1 rounded-xs">
                    KUZEY · PARSEL 2
                  </span>
                  <svg viewBox="0 0 400 150" className="absolute inset-0 w-full h-full opacity-50 pointer-events-none">
                    <path d="M0,110 C80,80 160,120 240,90 S 360,60 400,90" stroke="#c6a15b" strokeWidth="1" fill="none"/>
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="font-serif-custom text-2xl text-[#ede7d6] mb-2">239 Ada · 2 Parsel</h3>
                  <p className="text-[#a39c8a] text-sm mb-6 leading-relaxed">
                    Üç parselin en kuzeyinde, orman sınırına bitişik parsel.
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 font-mono-custom text-xs text-[#a39c8a] border-t border-[#c6a15b]/15 pt-4 mb-6">
                    <div>
                      Alan
                      <span className="block text-sm text-[#ede7d6] mt-0.5">818,96 m²</span>
                    </div>
                    <div>
                      Ada / Parsel
                      <span className="block text-sm text-[#ede7d6] mt-0.5">239 / 2</span>
                    </div>
                    <div>
                      Nitelik
                      <span className="block text-sm text-[#ede7d6] mt-0.5">Ham Toprak</span>
                    </div>
                    <div>
                      Pafta
                      <span className="block text-xs text-[#ede7d6] mt-0.5 truncate">F31-A-10-C-2-C</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button 
                  onClick={() => selectParcelAndScroll('239 Ada 2 Parsel (818,96 m²)')}
                  className="font-serif-custom text-lg text-[#c6a15b] hover:text-[#d9b46e] flex items-center gap-1.5 transition-colors cursor-pointer w-full text-left"
                >
                  Fiyat için iletişime geç <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* PARSEL 3 */}
            <div className="plot-card reveal flex flex-col justify-between">
              <div>
                <div className="plot-top flex items-center justify-between p-4">
                  <span className="font-mono-custom text-[11px] tracking-wider text-[#c6a15b] bg-[#141410]/80 border border-[#c6a15b]/30 px-2.5 py-1 rounded-xs">
                    ORTA · PARSEL 3
                  </span>
                  <svg viewBox="0 0 400 150" className="absolute inset-0 w-full h-full opacity-50 pointer-events-none">
                    <path d="M0,100 C100,70 180,110 260,80 S 380,50 400,80" stroke="#c6a15b" strokeWidth="1" fill="none"/>
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="font-serif-custom text-2xl text-[#ede7d6] mb-2">239 Ada · 3 Parsel</h3>
                  <p className="text-[#a39c8a] text-sm mb-6 leading-relaxed">
                    İki komşu parselin ortasında, aynı sınır çizgisini paylaşan parsel.
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 font-mono-custom text-xs text-[#a39c8a] border-t border-[#c6a15b]/15 pt-4 mb-6">
                    <div>
                      Alan
                      <span className="block text-sm text-[#ede7d6] mt-0.5">851,28 m²</span>
                    </div>
                    <div>
                      Ada / Parsel
                      <span className="block text-sm text-[#ede7d6] mt-0.5">239 / 3</span>
                    </div>
                    <div>
                      Nitelik
                      <span className="block text-sm text-[#ede7d6] mt-0.5">Ham Toprak</span>
                    </div>
                    <div>
                      Pafta
                      <span className="block text-xs text-[#ede7d6] mt-0.5 truncate">F31-A-10-C-2-C</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button 
                  onClick={() => selectParcelAndScroll('239 Ada 3 Parsel (851,28 m²)')}
                  className="font-serif-custom text-lg text-[#c6a15b] hover:text-[#d9b46e] flex items-center gap-1.5 transition-colors cursor-pointer w-full text-left"
                >
                  Fiyat için iletişime geç <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* PARSEL 4 */}
            <div className="plot-card reveal flex flex-col justify-between">
              <div>
                <div className="plot-top flex items-center justify-between p-4">
                  <span className="font-mono-custom text-[11px] tracking-wider text-[#c6a15b] bg-[#141410]/80 border border-[#c6a15b]/30 px-2.5 py-1 rounded-xs">
                    GÜNEY · PARSEL 4
                  </span>
                  <svg viewBox="0 0 400 150" className="absolute inset-0 w-full h-full opacity-50 pointer-events-none">
                    <path d="M0,120 L140,120 L170,60 L400,60" stroke="#c6a15b" strokeWidth="1" strokeDasharray="3 4" fill="none"/>
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="font-serif-custom text-2xl text-[#ede7d6] mb-2">239 Ada · 4 Parsel</h3>
                  <p className="text-[#a39c8a] text-sm mb-6 leading-relaxed">
                    Köy yoluna en yakın, üç parselin en güneyinde yer alan, en geniş parsel.
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 font-mono-custom text-xs text-[#a39c8a] border-t border-[#c6a15b]/15 pt-4 mb-6">
                    <div>
                      Alan
                      <span className="block text-sm text-[#ede7d6] mt-0.5">1.010,62 m²</span>
                    </div>
                    <div>
                      Ada / Parsel
                      <span className="block text-sm text-[#ede7d6] mt-0.5">239 / 4</span>
                    </div>
                    <div>
                      Nitelik
                      <span className="block text-sm text-[#ede7d6] mt-0.5">Ham Toprak</span>
                    </div>
                    <div>
                      Pafta
                      <span className="block text-xs text-[#ede7d6] mt-0.5 truncate">F31-A-10-C-2-C</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button 
                  onClick={() => selectParcelAndScroll('239 Ada 4 Parsel (1.010,62 m²)')}
                  className="font-serif-custom text-lg text-[#c6a15b] hover:text-[#d9b46e] flex items-center gap-1.5 transition-colors cursor-pointer w-full text-left"
                >
                  Fiyat için iletişime geç <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVILEGES SECTION */}
      <section className="bg-[#1b1b15] py-24" id="ayricaliklar">
        <div className="wrap mb-16">
          <div className="max-w-2xl reveal">
            <div className="font-mono-custom text-xs tracking-[0.2em] text-[#c6a15b] uppercase mb-4 flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#c6a15b]"></span>
              Ayrıcalıklar
            </div>
            <h2 className="font-serif-custom text-3xl md:text-4xl text-[#ede7d6]">
              Bu bölgeyi değerli kılan dört neden.
            </h2>
          </div>
        </div>

        <div className="wrap px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#c6a15b]/15 border border-[#c6a15b]/15">
            <div className="bg-[#1b1b15] p-8 relative hover:bg-[#1f1f18] transition-colors">
              <div className="w-10 h-10 border border-[#c6a15b] rounded-full flex items-center justify-center text-[#c6a15b] mb-6">
                <Factory size={20} />
              </div>
              <h3 className="font-sans-custom font-semibold text-lg text-[#ede7d6] mb-3">Sanayi Sitesine Yakınlık</h3>
              <p className="text-[#a39c8a] text-sm leading-relaxed">
                Yeni kurulacak Maslak Sanayi Sitesi'ne yalnızca 1 km; bölgenin sanayi yatırımlarından ilk yararlanacak parseller arasında.
              </p>
              <div className="absolute bottom-4 right-4 font-mono-custom text-[10px] text-[#6f6a5c]">IND.01</div>
            </div>

            <div className="bg-[#1b1b15] p-8 relative hover:bg-[#1f1f18] transition-colors">
              <div className="w-10 h-10 border border-[#c6a15b] rounded-full flex items-center justify-center text-[#c6a15b] mb-6">
                <MapPin size={20} />
              </div>
              <h3 className="font-sans-custom font-semibold text-lg text-[#ede7d6] mb-3">Şehir Merkezine Yakınlık</h3>
              <p className="text-[#a39c8a] text-sm leading-relaxed">
                Kastamonu şehir merkezine yalnızca 5 km; şehrin tüm imkanlarına kısa sürede ulaşım.
              </p>
              <div className="absolute bottom-4 right-4 font-mono-custom text-[10px] text-[#6f6a5c]">CTR.02</div>
            </div>

            <div className="bg-[#1b1b15] p-8 relative hover:bg-[#1f1f18] transition-colors">
              <div className="w-10 h-10 border border-[#c6a15b] rounded-full flex items-center justify-center text-[#c6a15b] mb-6">
                <TreePine size={20} />
              </div>
              <h3 className="font-sans-custom font-semibold text-lg text-[#ede7d6] mb-3">Orman Manzarası</h3>
              <p className="text-[#a39c8a] text-sm leading-relaxed">
                Parselin çevresi tamamen orman dokusuyla kaplı; doğayla iç içe, açık ve sakin bir manzara.
              </p>
              <div className="absolute bottom-4 right-4 font-mono-custom text-[10px] text-[#6f6a5c]">FOR.03</div>
            </div>

            <div className="bg-[#1b1b15] p-8 relative hover:bg-[#1f1f18] transition-colors">
              <div className="w-10 h-10 border border-[#c6a15b] rounded-full flex items-center justify-center text-[#c6a15b] mb-6">
                <CompassIcon size={20} />
              </div>
              <h3 className="font-sans-custom font-semibold text-lg text-[#ede7d6] mb-3">Sessiz Ama Merkezi</h3>
              <p className="text-[#a39c8a] text-sm leading-relaxed">
                Şehrin gürültüsünden uzak, ama şehre çok yakın bir konumda.
              </p>
              <div className="absolute bottom-4 right-4 font-mono-custom text-[10px] text-[#6f6a5c]">QLT.04</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="py-24" id="surec">
        <div className="wrap">
          <div className="max-w-2xl mb-16 reveal">
            <div className="font-mono-custom text-xs tracking-[0.2em] text-[#c6a15b] uppercase mb-4 flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#c6a15b]"></span>
              Süreç
            </div>
            <h2 className="font-serif-custom text-3xl md:text-4xl text-[#ede7d6]">
              Parselinize giden beş adım.
            </h2>
          </div>

          <div className="relative pl-4 sm:pl-0">
            {/* Dashed Timeline Line */}
            <div className="hidden sm:block absolute left-7 top-6 bottom-6 w-[1px] border-l border-dashed border-[#c6a15b]/30"></div>

            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start reveal">
                <div className="font-mono-custom text-sm text-[#c6a15b] w-14 h-14 border border-[#c6a15b] rounded-full flex items-center justify-center bg-[#141410] shrink-0 z-10">
                  01
                </div>
                <div>
                  <h3 className="font-sans-custom font-semibold text-xl text-[#ede7d6] mb-1.5">Özel Görüşme</h3>
                  <p className="text-[#a39c8a] text-base max-w-xl">Vadiyi ve mevcut parselleri birlikte, randevulu olarak gezersiniz.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start reveal">
                <div className="font-mono-custom text-sm text-[#c6a15b] w-14 h-14 border border-[#c6a15b] rounded-full flex items-center justify-center bg-[#141410] shrink-0 z-10">
                  02
                </div>
                <div>
                  <h3 className="font-sans-custom font-semibold text-xl text-[#ede7d6] mb-1.5">Parsel Seçimi</h3>
                  <p className="text-[#a39c8a] text-base max-w-xl">Manzara, konum ve bütçenize göre size uygun parsel tipi netleşir.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start reveal">
                <div className="font-mono-custom text-sm text-[#c6a15b] w-14 h-14 border border-[#c6a15b] rounded-full flex items-center justify-center bg-[#141410] shrink-0 z-10">
                  03
                </div>
                <div>
                  <h3 className="font-sans-custom font-semibold text-xl text-[#ede7d6] mb-1.5">Hukuki İnceleme</h3>
                  <p className="text-[#a39c8a] text-base max-w-xl">Tapu kaydı ve pafta bilgileri tarafınıza sunulur; güncel imar durumu birlikte değerlendirilir.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start reveal">
                <div className="font-mono-custom text-sm text-[#c6a15b] w-14 h-14 border border-[#c6a15b] rounded-full flex items-center justify-center bg-[#141410] shrink-0 z-10">
                  04
                </div>
                <div>
                  <h3 className="font-sans-custom font-semibold text-xl text-[#ede7d6] mb-1.5">Ön Sözleşme</h3>
                  <p className="text-[#a39c8a] text-base max-w-xl">Şartlar netleşir, parsel adınıza rezerve edilir.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start reveal">
                <div className="font-mono-custom text-sm text-[#c6a15b] w-14 h-14 border border-[#c6a15b] rounded-full flex items-center justify-center bg-[#141410] shrink-0 z-10">
                  05
                </div>
                <div>
                  <h3 className="font-sans-custom font-semibold text-xl text-[#ede7d6] mb-1.5">Tapu Devri</h3>
                  <p className="text-[#a39c8a] text-base max-w-xl">Noter huzurunda resmi teslim gerçekleşir; parsel artık sizindir.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & SATELLITE IMAGES SECTION */}
      <section className="bg-[#1b1b15] py-24" id="konum">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="font-mono-custom text-xs tracking-[0.2em] text-[#c6a15b] uppercase mb-4 flex items-center gap-2">
                <span className="w-5 h-[1px] bg-[#c6a15b]"></span>
                Konum
              </div>
              <h2 className="font-serif-custom text-3xl sm:text-4xl text-[#ede7d6] mb-8">
                Şehre yakın, şehirden uzak.
              </h2>
              <div className="divide-y divide-[#c6a15b]/15 border-t border-[#c6a15b]/15">
                <div className="flex justify-between py-4 text-base text-[#a39c8a]">
                  <span className="font-mono-custom text-[#c6a15b] text-sm font-medium">1 km</span>
                  <span>Maslak Sanayi Sitesi (yapım aşamasında)</span>
                </div>
                <div className="flex justify-between py-4 text-base text-[#a39c8a]">
                  <span className="font-mono-custom text-[#c6a15b] text-sm font-medium">5 km</span>
                  <span>Kastamonu Şehir Merkezi</span>
                </div>
                <div className="flex justify-between py-4 text-base text-[#a39c8a]">
                  <span className="font-mono-custom text-[#c6a15b] text-sm font-medium">Bitişik</span>
                  <span>Taşlık Mahallesi</span>
                </div>
                <div className="flex justify-between py-4 text-base text-[#a39c8a]">
                  <span className="font-mono-custom text-[#c6a15b] text-sm font-medium">Çevresi</span>
                  <span>Tamamen Orman</span>
                </div>
              </div>
            </div>

            <div className="reveal flex justify-center">
              <div className="compass">
                <div className="absolute top-3 font-mono-custom text-xs text-[#c6a15b]">N</div>
                <div className="font-serif-custom italic text-[#ede7d6] text-sm text-center leading-relaxed">
                  ASARCIK VİLLALARI<br />
                  <span className="font-mono-custom text-xs not-italic text-[#c6a15b] mt-1 block">41°24'45"N · 33°44'40"E</span>
                </div>
              </div>
            </div>
          </div>

          {/* SATELLITE MAP GALLERY WITH PLACED IMAGES 1 & 2 */}
          <div className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif-custom text-xl text-[#ede7d6] flex items-center gap-2">
                <Navigation size={18} className="text-[#c6a15b]" />
                Uydu ve Kadastro Harita Görünümleri
              </h3>
              <span className="font-mono-custom text-xs text-[#a39c8a]">
                *Büyütmek için görsellere tıklayın
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 reveal">
              {/* IMAGE 1: 239 ADA · PARSEL 2–3–4 SINIRLARI */}
              <div 
                onClick={() => openImageModal(
                  '/1k.png', 
                  '239 ADA · PARSEL 2–3–4 SINIRLARI', 
                  '239 ada 2, 3, 4 parsel sınırlarını gösteren detaylı uydu görüntüsü'
                )}
                className="map-panel cursor-pointer group relative"
              >
                <div className="overflow-hidden relative">
                  <img 
                    src="/1.png" 
                    alt="239 ada 2, 3, 4 parsel sınırlarını gösteren uydu görüntüsü" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = '/img/1k.png';
                      }
                    }}
                    className="w-full h-[280px] sm:h-[320px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#141410]/90 text-[#c6a15b] px-4 py-2 border border-[#c6a15b] rounded-xs font-mono-custom text-xs flex items-center gap-2">
                      <Maximize2 size={14} /> Görseli Büyüt
                    </span>
                  </div>
                </div>
                <div className="map-cap">
                  <span>239 ADA · PARSEL 2–3–4 SINIRLARI</span>
                  <ExternalLink size={14} />
                </div>
              </div>

              {/* IMAGE 2: MASLAK SANAYİ SİTESİ'NE 1,13 KM */}
              <div 
                onClick={() => openImageModal(
                  '/2k.png', 
                  "MASLAK SANAYİ SİTESİ'NE 1,13 KM", 
                  "Parselden Maslak Sanayi Sitesi'ne olan mesafeyi gösteren uydu görüntüsü"
                )}
                className="map-panel cursor-pointer group relative"
              >
                <div className="overflow-hidden relative">
                  <img 
                    src="/2.png" 
                    alt="Parselden Maslak Sanayi Sitesi'ne olan mesafeyi gösteren uydu görüntüsü" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = '/img/2.png';
                      }
                    }}
                    className="w-full h-[280px] sm:h-[320px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#141410]/90 text-[#c6a15b] px-4 py-2 border border-[#c6a15b] rounded-xs font-mono-custom text-xs flex items-center gap-2">
                      <Maximize2 size={14} /> Görseli Büyüt
                    </span>
                  </div>
                </div>
                <div className="map-cap">
                  <span>MASLAK SANAYİ SİTESİ'NE 1,13 KM</span>
                  <ExternalLink size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="wrap">
          <div className="max-w-2xl mb-16 reveal">
            <div className="font-mono-custom text-xs tracking-[0.2em] text-[#c6a15b] uppercase mb-4 flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#c6a15b]"></span>
              Vadi Sakinleri
            </div>
            <h2 className="font-serif-custom text-3xl md:text-4xl text-[#ede7d6]">
              Parsel sahiplerinden.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div className="border border-[#c6a15b]/15 p-8 rounded-xs bg-[#1f1f18] reveal">
              <p className="font-serif-custom italic text-lg text-[#ede7d6] mb-6 leading-relaxed">
                "Süreç boyunca hiçbir belirsizlik yaşamadık; tapu kaydı ve pafta bilgileri ilk günden elimizdeydi. Sanayi sitesine olan yakınlığı bizim için karar vericiydi."
              </p>
              <div className="text-xs text-[#c6a15b] font-mono-custom">
                A. TUNÇEL — 239 Ada 3 Parsel
              </div>
            </div>

            <div className="border border-[#c6a15b]/15 p-8 rounded-xs bg-[#1f1f18] reveal">
              <p className="font-serif-custom italic text-lg text-[#ede7d6] mb-6 leading-relaxed">
                "Şehre bu kadar yakın, bu kadar sakin bir yer bulmak zordu. Orman manzarası ve merkeze uzaklığı yatırım için doğru geldi."
              </p>
              <div className="text-xs text-[#c6a15b] font-mono-custom">
                M. ERGÜN — 239 Ada 4 Parsel
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA FORM SECTION */}
      <section className="bg-[#1b1b15] py-24" id="iletisim">
        <div className="wrap">
          <div className="border border-[#c6a15b]/30 rounded-xs p-8 sm:p-14 bg-[#141410] grid grid-cols-1 lg:grid-cols-12 gap-12 reveal shadow-2xl">
            <div className="lg:col-span-6">
              <div className="font-mono-custom text-xs tracking-[0.2em] text-[#c6a15b] uppercase mb-4 flex items-center gap-2">
                <span className="w-5 h-[1px] bg-[#c6a15b]"></span>
                İletişim
              </div>
              <h2 className="font-serif-custom text-3xl sm:text-4xl text-[#ede7d6] mb-4">
                Arsayı yerinde görün.
              </h2>
              <p className="text-[#a39c8a] text-base leading-relaxed max-w-md">
                Parsel bilgileri, tapu kaydı ve pafta detayları hakkında bilgi almak için görüşme talebinde bulunun; size en kısa sürede dönüş yapalım.
              </p>

              <div className="mt-8 space-y-4 text-sm text-[#a39c8a]">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#c6a15b]" />
                  <span className="font-mono-custom text-xs text-[#c6a15b]">TEL</span>
                  <a href="tel:03125550412" className="hover:text-[#ede7d6]">0312 555 04 12</a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#c6a15b] shrink-0 mt-0.5" />
                  <span className="font-mono-custom text-xs text-[#c6a15b]">ADRES</span>
                  <span>Taşlık Mahallesi, Merkez / Kastamonu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-[#c6a15b]" />
                  <span className="font-mono-custom text-xs text-[#c6a15b]">SAAT</span>
                  <span>Randevu ile, her gün 09:00–19:00</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#1f1f18] border border-[#c6a15b]/30 rounded-xs animate-fadeIn">
                  <CheckCircle2 size={56} className="text-[#c6a15b] mb-4" />
                  <h3 className="font-serif-custom text-2xl text-[#ede7d6] mb-2">Talebiniz Alındı</h3>
                  <p className="text-[#a39c8a] text-sm max-w-xs mb-6">
                    Teşekkür ederiz! Asarcık Villaları temsilcimiz belirttiğiniz telefon numarasından en kısa sürede sizinle iletişime geçecektir.
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-mono-custom text-[#c6a15b] underline hover:text-[#ede7d6]"
                  >
                    Yeni bir talep oluştur
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs text-[#a39c8a] mb-2 font-mono-custom uppercase tracking-wider">
                      Ad Soyad *
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-[#c6a15b]/30 text-[#ede7d6] text-base py-2.5 px-1 focus:border-[#c6a15b] focus:outline-none transition-colors"
                      placeholder="Örn: Ahmet Yılmaz"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs text-[#a39c8a] mb-2 font-mono-custom uppercase tracking-wider">
                      Telefon *
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-[#c6a15b]/30 text-[#ede7d6] text-base py-2.5 px-1 focus:border-[#c6a15b] focus:outline-none transition-colors"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label htmlFor="parcel" className="block text-xs text-[#a39c8a] mb-2 font-mono-custom uppercase tracking-wider">
                      Tercih Ettiğiniz Parsel Tipi
                    </label>
                    <select 
                      id="parcel"
                      value={selectedParcel}
                      onChange={(e) => setSelectedParcel(e.target.value)}
                      className="w-full bg-[#1b1b15] border-b border-[#c6a15b]/30 text-[#ede7d6] text-base py-2.5 px-1 focus:border-[#c6a15b] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="239 Ada 2 Parsel (818,96 m²)">239 Ada 2 Parsel (818,96 m²)</option>
                      <option value="239 Ada 3 Parsel (851,28 m²)">239 Ada 3 Parsel (851,28 m²)</option>
                      <option value="239 Ada 4 Parsel (1.010,62 m²)">239 Ada 4 Parsel (1.010,62 m²)</option>
                      <option value="Henüz karar vermedim">Henüz karar vermedim</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs text-[#a39c8a] mb-2 font-mono-custom uppercase tracking-wider">
                      Mesajınız (opsiyonel)
                    </label>
                    <textarea 
                      id="message"
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-[#c6a15b]/30 text-[#ede7d6] text-base py-2.5 px-1 focus:border-[#c6a15b] focus:outline-none transition-colors resize-y"
                      placeholder="Notunuzu veya sorularınızı yazabilirsiniz..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#c6a15b] text-[#141410] font-semibold py-4 px-6 text-sm tracking-wide rounded-xs hover:bg-[#d9b46e] transition-all cursor-pointer mt-3"
                  >
                    Randevu Talebi Gönder
                  </button>

                  <div className="text-[11px] text-[#6f6a5c] text-center pt-1 font-mono-custom">
                    Bilgileriniz yalnızca Asarcık Villaları ekibiyle paylaşılır.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#c6a15b]/15 py-14">
        <div className="wrap">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <div className="font-serif-custom text-xl text-[#ede7d6]">ASARCIK VİLLALARI</div>
              <div className="text-[#a39c8a] text-xs mt-2 leading-relaxed">
                Taşlık Mahallesi, Merkez / Kastamonu<br />
                <span className="font-mono-custom text-[#c6a15b]">41°24'45"N · 33°44'40"E</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-7 text-xs text-[#a39c8a]">
              <button onClick={() => scrollToSection('proje')} className="hover:text-[#c6a15b] transition-colors">Proje</button>
              <button onClick={() => scrollToSection('parseller')} className="hover:text-[#c6a15b] transition-colors">Parseller</button>
              <button onClick={() => scrollToSection('ayricaliklar')} className="hover:text-[#c6a15b] transition-colors">Ayrıcalıklar</button>
              <button onClick={() => scrollToSection('surec')} className="hover:text-[#c6a15b] transition-colors">Süreç</button>
              <button onClick={() => scrollToSection('konum')} className="hover:text-[#c6a15b] transition-colors">Konum</button>
              <button onClick={() => scrollToSection('iletisim')} className="hover:text-[#c6a15b] transition-colors">İletişim</button>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#c6a15b]/15 flex flex-col sm:flex-row justify-between text-[11px] text-[#6f6a5c] gap-2">
            <span>© 2026 Asarcık Villaları. Tüm hakları saklıdır.</span>
            <span>Tapu bilgileri Kastamonu Tapu Müdürlüğü kayıtlarına dayanmaktadır.</span>
          </div>
        </div>
      </footer>

      {/* IMAGE LIGHTBOX MODAL */}
      {lightbox.isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#141410] border border-[#c6a15b]/40 rounded-xs overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-[#1b1b15] border-b border-[#c6a15b]/20">
              <h3 className="font-mono-custom text-xs text-[#c6a15b] tracking-wider uppercase flex items-center gap-2">
                <Navigation size={14} />
                {lightbox.title}
              </h3>
              <button 
                onClick={closeImageModal}
                className="text-[#a39c8a] hover:text-[#ede7d6] p-1 transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative bg-black flex justify-center items-center max-h-[75vh] overflow-auto p-2">
              <img 
                src={lightbox.src} 
                alt={lightbox.alt} 
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-xs"
              />
            </div>

            <div className="p-4 bg-[#1b1b15] border-t border-[#c6a15b]/20 flex flex-wrap justify-between items-center text-xs text-[#a39c8a]">
              <span>{lightbox.alt}</span>
              <a 
                href={lightbox.src} 
                target="_blank" 
                rel="noreferrer"
                className="text-[#c6a15b] hover:underline flex items-center gap-1 font-mono-custom mt-2 sm:mt-0"
              >
                Orijinal Görseli Aç <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
