'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import path from 'path';

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [animatingSection, setAnimatingSection] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [imagePositions, setImagePositions] = useState<{[key: string]: string}>({});
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const ADMIN_PASSWORD = 'admin123'; // Toto heslo můžete změnit na bezpečnější

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Klávesová zkratka pro zobrazení password promptu (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'A') {
        if (!isAdminMode) {
          setShowPasswordPrompt(true);
        } else {
          setIsAdminMode(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAdminMode]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      setShowPasswordPrompt(false);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Nesprávné heslo');
      setPassword('');
    }
  };

  const toggleSection = (title: string) => {
    setAnimatingSection(title);
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
    setTimeout(() => setAnimatingSection(null), 500);
  };

  const handlePositionChange = (imageSrc: string, position: number) => {
    setImagePositions(prev => ({
      ...prev,
      [imageSrc]: `center ${position}%`
    }));
  };

  const exportPositions = () => {
    console.log('Image Positions Configuration:');
    console.log(JSON.stringify(imagePositions, null, 2));
  };

  // Helper function to get WebP version of image
  const getOptimizedImagePath = (imagePath: string, isThumb = false): string => {
    const ext = path.extname(imagePath);
    if (isThumb) {
      return imagePath.replace(ext, '.thumb.webp');
    }
    return imagePath.replace(ext, '.webp');
  };

  // Gallery sections with actual images
  const gallerySections = [
    {
      title: "Svatební",
      images: [
        { src: '/images/svatebni/PPRO4804.jpg' },
        { src: '/images/svatebni/P1379431.jpg', position: 'center 6%' },
        { src: '/images/svatebni/PPRO4850.jpg' },
        { src: '/images/svatebni/P1379303.jpg', position: 'center 5%' },
        { src: '/images/svatebni/P1378084.jpg' },
        { src: '/images/svatebni/PPRO4222.jpg' },
        { src: '/images/svatebni/P1376986.jpg' },
        { src: '/images/svatebni/P1379223.jpg' },
        { src: '/images/svatebni/P1378578.jpg', position: 'center 42%' },
        { src: '/images/svatebni/P1051532.jpg', position: 'center 5%' },
        { src: '/images/svatebni/P1108339.jpg', position: 'center 50%' },
        { src: '/images/svatebni/P1097424.jpg' },
        { src: '/images/svatebni/P1074430.jpg' },
        { src: '/images/svatebni/P1107681.jpg' },
        { src: '/images/svatebni/P1096296.jpg' },
        { src: '/images/svatebni/PPRO5345.jpg' },
        { src: '/images/svatebni/PPRO4172.jpg', position: 'center 23%' },
        { src: '/images/svatebni/PPRO4111.jpg' }
      ]
    },
    {
      title: "Reportážní",
      images: [
        { src: '/images/reportazni/P1357885.jpg' },
        { src: '/images/reportazni/P1357860.jpg' },
        { src: '/images/reportazni/P1359450.jpg', position: 'center 33%' },
        { src: '/images/reportazni/P1363844.jpg', position: 'center 30%' },
        { src: '/images/reportazni/P1361131.jpg' },
        { src: '/images/reportazni/P1315873 kopie.jpg' },
        { src: '/images/reportazni/P1302321.jpg' },
        { src: '/images/reportazni/P1291806.jpg' },
        { src: '/images/reportazni/P1411541.jpg' },
        { src: '/images/reportazni/P1400337.jpg' },
        { src: '/images/reportazni/P1400134.jpg' },
        { src: '/images/reportazni/P1400139.jpg' },
        { src: '/images/reportazni/P1399791.jpg' },
        { src: '/images/reportazni/P1357910.jpg', position: 'center 34%' },
        { src: '/images/reportazni/P1354591.jpg' },
        { src: '/images/reportazni/P1344297.jpg', position: 'center 48%' },
        { src: '/images/reportazni/P1303082.jpg' },
        { src: '/images/reportazni/P1302778.jpg', position: 'center 25%' },
        { src: '/images/reportazni/P1314001.jpg' },
        { src: '/images/reportazni/P1411849.jpg', position: 'center 41%' },
        { src: '/images/reportazni/featured-4.jpg' },
        { src: '/images/reportazni/P1411393.jpg', position: 'center 52%' },
        { src: '/images/reportazni/P1411253-Enhanced-NR.jpg' },
        { src: '/images/reportazni/P1400401-Enhanced-NR.jpg' },
        { src: '/images/reportazni/P1359334.jpg', position: 'center 20%' }
      ]
    },
    {
      title: "Ostatní",
      images: [
        { src: '/images/ostatni/P1423818.jpg' },
        { src: '/images/ostatni/P1423615.jpg', position: 'center 6%' },
        { src: '/images/ostatni/P1423239.jpg' },
        { src: '/images/ostatni/featured-5.jpg' }
      ]
    }
  ];

  // Helper function to get all images from current section
  const getCurrentSectionImages = useCallback(() => {
    if (!currentSection) return [];
    const section = gallerySections.find(s => s.title === currentSection);
    return section ? section.images : [];
  }, [currentSection]);

  // Helper function to get next/prev image src
  const getAdjacentImage = useCallback((direction: 'prev' | 'next'): string | null => {
    if (!selectedImage || !currentSection) return null;
    
    const sectionImages = getCurrentSectionImages();
    const currentIndex = sectionImages.findIndex(img => img.src === selectedImage);
    
    if (currentIndex === -1) return null;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex === sectionImages.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? sectionImages.length - 1 : currentIndex - 1;
    }
    
    return sectionImages[newIndex].src;
  }, [selectedImage, currentSection, getCurrentSectionImages]);

  // Helper function to get current and adjacent images
  const getFilmstripImages = useCallback((): string[] => {
    if (!selectedImage || !currentSection) return [];
    
    const sectionImages = getCurrentSectionImages();
    const currentIndex = sectionImages.findIndex(img => img.src === selectedImage);
    
    if (currentIndex === -1) return [];
    
    const images: string[] = [];
    for (let i = -2; i <= 2; i++) {
      let index = currentIndex + i;
      
      // Handle wrapping around
      if (index < 0) index = sectionImages.length + index;
      if (index >= sectionImages.length) index = index - sectionImages.length;
      
      images.push(sectionImages[index].src);
    }
    return images;
  }, [selectedImage, currentSection, getCurrentSectionImages]);

  // Update navigate function to simple image switch
  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    const nextImageSrc = getAdjacentImage(direction);
    if (nextImageSrc) {
      setSelectedImage(nextImageSrc);
    }
  }, [getAdjacentImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'Escape':
          setSelectedImage(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateImage]);

  const handleImageClick = (image: string, sectionTitle: string) => {
    if (!isAdminMode) {
      setSelectedImage(image);
      setCurrentSection(sectionTitle);
    }
  };

  return (
    <main className="relative min-h-screen bg-white">
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Admin přístup</h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Zadejte heslo"
                className="w-full px-4 py-2 rounded border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-500 text-sm mb-4">{passwordError}</p>
              )}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setPassword('');
                    setPasswordError('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Potvrdit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAdminMode && (
        <div className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <button
            onClick={exportPositions}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export Positions
          </button>
        </div>
      )}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold mb-16 text-gray-900">Galerie</h1>
        
        {gallerySections.map((section, sectionIndex) => {
          const isExpanded = expandedSections[section.title];
          const isAnimating = animatingSection === section.title;
          const displayImages = isExpanded ? section.images : section.images.slice(0, 3);
          
          return (
            <div key={section.title} className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">{section.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-out mb-12">
                {displayImages.map((image, imageIndex) => (
                  <div 
                    key={`${section.title}-${imageIndex}`}
                    onClick={() => handleImageClick(image.src, section.title)}
                    className={`cursor-pointer transform transition-all duration-500 ease-out
                      hover:scale-105 ${isAnimating && imageIndex >= 3 ? 'animate-fade-in' : ''}`}
                    style={{
                      opacity: isAnimating && imageIndex >= 3 ? 0 : 1,
                      transform: isAnimating && imageIndex >= 3 ? 'translateY(20px)' : 'translateY(0)',
                      animationDelay: `${(imageIndex - 3) * 100}ms`
                    }}
                  >
                    <div className="aspect-[3/2] relative rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={image.src}
                        alt={`${section.title} ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={imageIndex < 3}
                        style={{ objectPosition: imagePositions[image.src] || image.position || 'center center' }}
                      />
                      {isAdminMode && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            defaultValue="50"
                            className="w-full"
                            onChange={(e) => handlePositionChange(image.src, parseInt(e.target.value))}
                          />
                          <div className="text-xs mt-1 text-center">
                            Position: {imagePositions[image.src] || 'center center'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {section.images.length > 3 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="group inline-flex items-center px-8 py-3 rounded-full text-base font-medium
                    bg-white/60 backdrop-blur-[8px] border border-white/40
                    shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]
                    text-gray-800
                    transition-all duration-300 ease-out
                    hover:bg-white/70 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]
                    hover:scale-105 hover:-translate-y-0.5
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
                  >
                    <span className="relative">
                      {isExpanded ? 'Zobrazit méně' : 'Zobrazit více'}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-800/50 
                        transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <svg
                      className={`ml-2 h-5 w-5 transform transition-transform duration-500 ease-out
                        group-hover:translate-y-0.5 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal pro zobrazení plné velikosti */}
      {selectedImage && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-7xl h-[90vh] flex flex-col">
            {/* Main image container */}
            <div className="relative flex-grow">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={selectedImage}
                    alt="Fotografie v plné velikosti"
                    fill
                    style={{ objectFit: 'contain' }}
                    quality={100}
                    priority
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>

            {/* Filmstrip */}
            <div className="relative h-24 mt-4 flex justify-center items-center gap-6 px-16">
              {getFilmstripImages().map((imageSrc) => {
                const sectionWithImage = gallerySections.find(section =>
                  section.images.some(img => img.src === imageSrc)
                );
                const imageConfig = sectionWithImage?.images.find(img => img.src === imageSrc);
                const position = imagePositions[imageSrc] || imageConfig?.position || 'center center';

                return (
                  <div
                    key={imageSrc}
                    className={`relative h-20 w-32 cursor-pointer transition-all duration-200 rounded-lg overflow-hidden
                      ${imageSrc === selectedImage 
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black opacity-100 scale-110' 
                        : 'opacity-60 hover:opacity-100'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(imageSrc);
                    }}
                  >
                    <Image
                      src={imageSrc}
                      alt={`Náhled fotografie`}
                      fill
                      style={{ objectFit: 'cover', objectPosition: position }}
                      sizes="128px"
                    />
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="text-white hover:text-gray-300 
                  bg-black/50 hover:bg-black/70 p-2 sm:p-3 md:p-4 rounded-full transition-colors
                  focus:outline-none focus:ring-2 focus:ring-white/50"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                className="text-white hover:text-gray-300
                  bg-black/50 hover:bg-black/70 p-2 sm:p-3 md:p-4 rounded-full transition-colors
                  focus:outline-none focus:ring-2 focus:ring-white/50"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl
                bg-black/50 hover:bg-black/70 w-12 h-12 rounded-full flex items-center justify-center
                transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
} 