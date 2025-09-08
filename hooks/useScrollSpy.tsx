import { useState, useEffect } from 'react';

/**
 * Hook custom pour détecter la section active dans la page
 * @param sectionIds - tableau des IDs des sections à surveiller
 * @param offset - décalage en pixels pour ajuster le déclenchement
 * @returns activeSection - ID de la section actuellement visible
 */
const useScrollSpy = (sectionIds: string[], offset = 80) => {
  const [activeSection, setActiveSection] = useState<string>(''); // état de la section active

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Fonction qui gère le scroll
    const handleScroll = () => {
      // On supprime le timeout précédent pour éviter les updates trop fréquents
      clearTimeout(timeoutId);

      // Petit délai pour rendre la transition plus fluide
      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY + offset; // position du scroll + offset

        let currentSection = '';

        // On parcourt les sections du bas vers le haut
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const sectionId = sectionIds[i];
          const element = document.getElementById(sectionId);

          if (element) {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;

            // Vérifie si la position du scroll est dans cette section
            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
              currentSection = sectionId;
              break; // on a trouvé la section active
            }
          }
        }

        setActiveSection(currentSection);

        // Debug : à enlever en production
        if (currentSection !== activeSection) {
          console.log('Active section changed to:', currentSection);
        }
      }, 50); // délai 50ms
    };

    // Ajout du listener scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Appel immédiat pour définir la section initiale
    handleScroll();

    // Cleanup à la destruction du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [sectionIds, offset]);

  return activeSection;
};

export default useScrollSpy;
