'use client';

import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';
import { Caveat } from 'next/font/google';
import { useEffect, useState } from 'react';

const caveat = Caveat({ subsets: ["latin"] });

// Definice typů fotografií s jejich kategoriemi
const featuredPhotos = [
  { id: 1, category: "Týmové portréty" },
  { id: 2, category: "Svatební fotografie" },
  { id: 3, category: "Reportáže" },
];

export default function Home() {
  const [scroll, setScroll] = useState(0);
  const [isSafari, setIsSafari] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [screenWidth, setScreenWidth] = useState(1024);
  const [mobileSettings, setMobileSettings] = useState({
    default: {
      scale: 3.4,
      translateY: -36,
      translateX: 4
    },
    small: {
      scale: 3.6,
      translateY: -30,
      translateX: 2
    },
    medium: {
      scale: 3.3,
      translateY: -37,
      translateX: 2
    },
    ipadAir: {
      scale: 2.5,
      translateY: -27,
      translateX: 0
    },
    ipadPro: {
      scale: 2.2,
      translateY: -27,
      translateX: 1
    }
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
      setScreenWidth(window.innerWidth);
    };
    
    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && e.key === 'A') {
        setIsAdmin(prev => !prev);
        console.log('Admin mode:', !isAdmin); // Pro debugování
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAdmin]);

  useEffect(() => {
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(isSafariBrowser);

    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Styly pro různé prohlížeče
  const getLayerStyles = () => {
    const isMobile = window.innerWidth < 768;
    const mouseX = isMobile ? 0 : mousePosition.x * 15;
    const mouseY = isMobile ? 0 : mousePosition.y * 8;

    if (isSafari) {
      return {
        container: {
          perspective: '500px',
          transformStyle: 'preserve-3d'
        },
        background: {
          transform: `translateZ(${scroll * 0.05}px) 
                     translate(${mouseX * 0.5}px, ${mouseY * 0.5}px) 
                     scale(${1.15 + scroll * 0.0002})`
        },
        person: {
          transform: `translateZ(${scroll * -0.08}px) 
                     translate(${mouseX * -1.5}px, ${mouseY * -1}px)
                     scale(${1 + scroll * 0.0003})`
        },
        content: {
          transform: `translateZ(${scroll * -0.12}px)
                     translate(${mouseX * -0.8}px, ${mouseY * -1.2}px)`
        }
      };
    } else {
      return {
        container: {},
        background: {
          transform: `translate(${mouseX * 0.5}px, ${scroll * 0.15 + mouseY * 0.5}px) 
                     scale(1.15)`
        },
        person: {
          transform: `translate(${mouseX * -1.5}px, ${scroll * 0.05 + mouseY * -1}px)`
        },
        content: {
          transform: `translate(${mouseX * -0.8}px, ${scroll * -0.15 + mouseY * -1.2}px)`
        }
      };
    }
  };

  const styles = getLayerStyles();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={styles.container}
      >
        {/* Background layer */}
        <div 
          className="absolute inset-0 z-0"
          style={styles.background}
        >
          <Image
            src="/images/hero-background-clean.jpg"
            alt="Pozadí"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Person layer */}
        <div 
          className="absolute inset-0 z-10"
          style={styles.person}
        >
          <div className="relative h-full w-full drop-shadow-2xl">
            <Image
              src="/images/hero-person.png"
              alt="Portrét"
              fill
              className="object-contain"
              style={{
                transform: `scale(${
                  screenWidth >= 1024 && screenWidth < 1280
                    ? mobileSettings.ipadPro.scale
                    : screenWidth >= 768 && screenWidth < 1024
                      ? mobileSettings.ipadAir.scale
                      : screenWidth < 768
                        ? (screenWidth <= 375
                            ? mobileSettings.small.scale 
                            : screenWidth <= 400
                              ? mobileSettings.medium.scale
                              : mobileSettings.default.scale)
                        : 1
                }) 
                translate(${
                  screenWidth >= 1024 && screenWidth < 1280
                    ? mobileSettings.ipadPro.translateX
                    : screenWidth >= 768 && screenWidth < 1024
                      ? mobileSettings.ipadAir.translateX
                      : screenWidth < 768
                        ? (screenWidth <= 375
                            ? mobileSettings.small.translateX 
                            : screenWidth <= 400
                              ? mobileSettings.medium.translateX
                              : mobileSettings.default.translateX)
                        : 0
                }%, 
                ${
                  screenWidth >= 1024 && screenWidth < 1280
                    ? mobileSettings.ipadPro.translateY
                    : screenWidth >= 768 && screenWidth < 1024
                      ? mobileSettings.ipadAir.translateY
                      : screenWidth < 768
                        ? (screenWidth <= 375
                            ? mobileSettings.small.translateY 
                            : screenWidth <= 400
                              ? mobileSettings.medium.translateY
                              : mobileSettings.default.translateY)
                        : 0
                }%)`,
                objectPosition: screenWidth < 1280 ? 'bottom' : 'center'
              }}
              priority
              sizes="100vw"
            />
          </div>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="fixed bottom-4 left-4 z-50 bg-black/80 p-4 rounded-lg text-white max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="sticky top-0 bg-black/80 py-2 -mx-4 px-4">
                <span className="text-sm">Current width: {screenWidth}px</span>
              </div>

              <h3 className="font-bold mb-2">Mobile Settings (Small Screens - iPhone SE)</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm">Scale: {mobileSettings.small.scale}</label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="0.1"
                    value={mobileSettings.small.scale}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      small: {
                        ...prev.small,
                        scale: parseFloat(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Vertical Position: {mobileSettings.small.translateY}%</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={mobileSettings.small.translateY}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      small: {
                        ...prev.small,
                        translateY: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Horizontal Position: {mobileSettings.small.translateX}%</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={mobileSettings.small.translateX}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      small: {
                        ...prev.small,
                        translateX: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-2">Mobile Settings (Medium - iPhone 12 Pro, 13 Pro, etc.)</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm">Scale: {mobileSettings.medium.scale}</label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="0.1"
                    value={mobileSettings.medium.scale}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      medium: {
                        ...prev.medium,
                        scale: parseFloat(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Vertical Position: {mobileSettings.medium.translateY}%</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={mobileSettings.medium.translateY}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      medium: {
                        ...prev.medium,
                        translateY: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Horizontal Position: {mobileSettings.medium.translateX}%</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={mobileSettings.medium.translateX}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      medium: {
                        ...prev.medium,
                        translateX: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-2">Mobile Settings (Large - iPhone 14 Pro Max)</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm">Scale: {mobileSettings.default.scale}</label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="0.1"
                    value={mobileSettings.default.scale}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      default: {
                        ...prev.default,
                        scale: parseFloat(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Vertical Position: {mobileSettings.default.translateY}%</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={mobileSettings.default.translateY}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      default: {
                        ...prev.default,
                        translateY: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Horizontal Position: {mobileSettings.default.translateX}%</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={mobileSettings.default.translateX}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      default: {
                        ...prev.default,
                        translateX: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-2">iPad Air Settings (820px)</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm">Scale: {mobileSettings.ipadAir.scale}</label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="0.1"
                    value={mobileSettings.ipadAir.scale}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      ipadAir: {
                        ...prev.ipadAir,
                        scale: parseFloat(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Vertical Position: {mobileSettings.ipadAir.translateY}%</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={mobileSettings.ipadAir.translateY}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      ipadAir: {
                        ...prev.ipadAir,
                        translateY: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Horizontal Position: {mobileSettings.ipadAir.translateX}%</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={mobileSettings.ipadAir.translateX}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      ipadAir: {
                        ...prev.ipadAir,
                        translateX: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-2">iPad Pro Settings (1024px)</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm">Scale: {mobileSettings.ipadPro.scale}</label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="0.1"
                    value={mobileSettings.ipadPro.scale}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      ipadPro: {
                        ...prev.ipadPro,
                        scale: parseFloat(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Vertical Position: {mobileSettings.ipadPro.translateY}%</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={mobileSettings.ipadPro.translateY}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      ipadPro: {
                        ...prev.ipadPro,
                        translateY: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Horizontal Position: {mobileSettings.ipadPro.translateX}%</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={mobileSettings.ipadPro.translateX}
                    onChange={(e) => setMobileSettings(prev => ({
                      ...prev,
                      ipadPro: {
                        ...prev.ipadPro,
                        translateX: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => console.log(JSON.stringify(mobileSettings, null, 2))}
                  className="bg-white text-black px-3 py-1 rounded text-sm"
                >
                  Copy Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content layer */}
        <div 
          className="relative z-20 text-center text-white drop-shadow-2xl"
          style={{
            ...styles.content,
            marginTop: screenWidth <= 400 ? '100px' : '0'
          }}
        >
          <h1 className={`text-5xl md:text-6xl font-bold mb-4 ${caveat.className} text-shadow-lg`}>
            <TypeAnimation
              sequence={[
                'Ahoj, jsem Lukáš!',
                1000
              ]}
              wrapper="span"
              speed={30}
              style={{ display: 'inline-block' }}
              repeat={1}
              cursor={true}
            />
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-0 animate-fade-in-up text-shadow-lg">
            Fotím, točím, tvořím...<br className="block md:hidden" /> Vymyslíme něco společně? :)
          </p>
          {/* Desktop layout */}
          <div 
            className="flex-row justify-center gap-3"
            style={{ display: isDesktop ? 'flex' : 'none' }}
          >
            <Link
              href="/galerie"
              className="relative px-8 py-3 rounded-full text-lg w-[260px]
                opacity-0 animate-fade-in-up shadow-xl group overflow-hidden
                hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white"
              style={{ animationDelay: '1.5s' }}
            >
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
              <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
                Prohlédnout galerii
              </span>
            </Link>
            <Link
              href="/videa"
              className="relative px-8 py-3 rounded-full text-lg w-[260px]
                opacity-0 animate-fade-in-up shadow-xl group overflow-hidden
                hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white"
              style={{ animationDelay: '1.7s' }}
            >
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
              <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
                Prohlédnout videa
              </span>
            </Link>
            <Link
              href="/kontakt"
              className="relative px-8 py-3 rounded-full text-lg w-[260px]
                opacity-0 animate-fade-in-up shadow-xl group overflow-hidden
                hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white"
              style={{ animationDelay: '1.9s' }}
            >
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
              <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
                Kontaktovat
              </span>
            </Link>
          </div>

          {/* Mobile layout */}
          <div 
            className="flex-col items-center gap-4"
            style={{ display: isDesktop ? 'none' : 'flex' }}
          >
            <Link
              href="/galerie"
              className="relative px-8 py-3 rounded-full text-lg w-[260px]
                opacity-0 animate-fade-in-up shadow-xl group overflow-hidden
                hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white"
              style={{ animationDelay: '1.5s' }}
            >
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
              <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
                Prohlédnout galerii
              </span>
            </Link>
            <Link
              href="/videa"
              className="relative px-8 py-3 rounded-full text-lg w-[260px]
                opacity-0 animate-fade-in-up shadow-xl group overflow-hidden
                hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white"
              style={{ animationDelay: '1.7s' }}
            >
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
              <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
                Prohlédnout videa
              </span>
            </Link>
            <Link
              href="/kontakt"
              className="relative px-8 py-3 rounded-full text-lg w-[260px]
                opacity-0 animate-fade-in-up shadow-xl group overflow-hidden
                hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white"
              style={{ animationDelay: '1.9s' }}
            >
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
              <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
                Kontaktovat
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">O mně</h2>
            <p className="text-lg text-gray-600 mb-8">
              Vítejte v mém světě fotografie. Specializuji se na zachycení 
              jedinečných momentů, které vyprávějí příběhy. S fotoaparátem 
              pracuji již více než 10 let a každý projekt je pro mě novou 
              výzvou k vytvoření něčeho výjimečného.
            </p>
            <Link
              href="/o-mne"
              className="text-black border-b-2 border-black pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
            >
              Více o mně
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Vybrané práce
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPhotos.map((photo) => (
              <div key={photo.id} className="relative aspect-[2/3] group">
                <Image
                  src={`/images/featured-${photo.id}.jpg`}
                  alt={`Featured práce ${photo.id}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {photo.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/galerie"
              className="inline-block bg-black text-white px-8 py-3 rounded-full text-lg hover:bg-gray-800 transition-colors"
            >
              Zobrazit celou galerii
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
