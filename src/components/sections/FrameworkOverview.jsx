import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FrameworkOverview = () => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const sections = panelsRef.current;
    if (sections.length === 0) return;

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => '+=' + containerRef.current.offsetWidth * (sections.length - 1),
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const blocks = [
    {
      title: 'Observer System (OS)',
      description: 'Predicts and monitors external conditions.',
      bg: 'bg-isrm-blue/30',
    },
    {
      title: 'Physical System (PS)',
      description: 'Supplies real-world constraints and inputs.',
      bg: 'bg-isrm-green/30',
    },
    {
      title: 'Update Signal U(t)',
      description: 'ΔC(t) - E(t) + S(t): triggers adaptation when threshold is exceeded.',
      bg: 'bg-isrm-accent/30',
    },
  ];

  return (
    <section className="mt-20 mb-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-4xl font-bold mb-2">🧠 ISRM Framework Overview</h2>
        <p className="text-white/70">Scroll to explore how Observer System, Physical System, and U(t) interact.</p>
      </div>
      <div ref={containerRef} className="flex w-[300vw]">
        {blocks.map((block, index) => (
          <div
            key={index}
            ref={(el) => (panelsRef.current[index] = el)}
            className={`w-screen h-[70vh] p-10 flex items-center justify-center text-center ${block.bg} backdrop-blur-md`}
          >
            <div className="max-w-lg">
              <h3 className="text-3xl font-bold mb-4">{block.title}</h3>
              <p className="text-white/80">{block.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FrameworkOverview;
