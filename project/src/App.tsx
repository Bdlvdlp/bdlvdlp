import { useEffect, useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from 'lucide-react';
import marineNationaleLogo from './assets/marine_blanc.png';
import './index.css';

const useSmoothScroll = () => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const importLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        lenisRef.current = lenis;

        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch (e) {
        console.error("Failed to load Lenis", e);
      }
    };
    importLenis();

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return lenisRef;
};

const projects = [
  {
    id: 1,
    title: 'Application web pour les moniteurs de sport',
    category: 'Web Application',
    description: 'J\'ai été chargé seul de remplacer les fichiers Excel utilisés par les moniteurs de sport de la Marine Nationale par une véritable application web. L\'objectif était de centraliser la gestion des évaluations physiques, de simplifier les inscriptions, d\'automatiser la saisie des résultats et de produire des statistiques. Les moniteurs passent de 26 champs à saisir pour chaque marin à 6. Le projet a été déployé sur serveur et est maintenant en phase d\'expérimentation.',
    tech: ['React', 'JavaScript', 'Node.js', 'MySQL'],
  },
  {
    id: 2,
    title: 'Application de navigation Antarctique - ASTROLAB',
    category: 'Système de Navigation',
    description: 'Développement d\'une application web critique pour la navigation du brise-glace ASTROLAB en Antarctique. Fournit aux pilotes des glaces une vision temps réel de la situation glacière grâce à l\'analyse automatique d\'images satellite, l\'intégration de données GEOTIFF et le traçage de routes optimisées avec GPS. Le développement est en cours, une première version partira en expédition en octobre.',
    tech: ['React', 'Python', 'JavaScript', 'GEOTIFF', 'Images Satellite', 'API'],
  },
  {
    id: 3,
    title: 'Application web pour les commissaires',
    category: 'Système Financier',
    description: 'Seul développeur sur ce projet complexe, je développe une application destinée aux commissaires de la Marine Nationale. L\'objectif est d\'unifier plusieurs systèmes existants afin d\'harmoniser la gestion des achats, ventes, stocks et documents financiers à bord. J\'ai mis en place de nombreuses automatisations et assure la fiabilité des opérations monétaires, particulièrement sensibles. L\'application est encore en cours de développement.',
    tech: ['React', 'Node.js', 'SQLite', 'Automatisation'],
  },
  {
    id: 4,
    title: 'Analyse de risque érosion côtière',
    category: 'Projet Personnel',
    description: 'Projet personnel pour aider une étudiante lors de la rédaction de son mémoire sur l\'érosion et la manière dont les assurances gèrent cette problématique. Récupération d\'une base de données de clients, analyse de leurs adresses pour définir en fonction de leur distance au trait de côte à risque, s\'ils étaient considérés comme à risque ou non face à l\'érosion. Développement d\'une carte interactive utilisant les APIs du gouvernement pour vérifier les adresses et les données du trait de côte des Côtes d\'Armor en Bretagne.',
    tech: ['React', 'Python', 'Leaflet', 'APIs Gouvernement'],
  }
];

function ProjectCard({ project, index, scrollYProgress }: { project: typeof projects[0], index: number, scrollYProgress: any }) {
  // Définir les directions d'entrée pour chaque carte
  const directions = [
    { x: [0, 0], y: [0, 0] },           // Carte 1: déjà visible
    { x: [window.innerWidth, 0], y: [0, 0] }, // Carte 2: depuis la droite
    { x: [-window.innerWidth, 0], y: [0, 0] }, // Carte 3: depuis la gauche
    { x: [0, 0], y: [window.innerHeight, 0] }  // Carte 4: depuis le bas
  ];

  const direction = directions[index];
  const start = index * 0.25;
  const end = start + 0.25;

  // Animations de translation
  const x = useTransform(scrollYProgress, [start, end], direction.x);
  const y = useTransform(scrollYProgress, [start, end], direction.y);
  
  // Effet de perspective: les cartes en dessous se réduisent légèrement
  const scale = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    [0.95, 1, 1, 0.95]
  );

  // Progression de la bordure (de 0 à 1 pour SVG pathLength)
  // L'animation de la bordure ne commence que quand la carte est en place (milieu de son segment)
  // Alterner : cartes impaires se remplissent (0->1), cartes paires se vident (1->0)
  const borderProgress = useTransform(
    scrollYProgress,
    [start + 0.1, end],
    index % 2 === 0 ? [0, 1] : [1, 0]  // Alterner le sens de l'animation
  );

  return (
    <motion.div 
      style={{ x, y, scale }}
      className="absolute top-0 left-0 right-0 h-screen flex flex-col justify-center items-center p-8"
    >
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl w-full overflow-hidden">
        {/* Bordure de progression SVG */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={`borderGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-color)" />
              <stop offset="100%" stopColor="var(--accent-color)" />
            </linearGradient>
          </defs>
          <motion.rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            rx="14"
            ry="14"
            fill="none"
            stroke={`url(#borderGradient-${index})`}
            strokeWidth="3"
            strokeLinecap="round"
            pathLength="1"
            style={{
              strokeDasharray: "1",
              strokeDashoffset: useTransform(borderProgress, [0, 1], [1, 0]),
            }}
          />
        </svg>
        
        <div className="relative z-10">
        <p className="text-lg text-accent-color mb-4 font-medium">{`0${index + 1}`}</p>
        <h3 className="text-3xl md:text-5xl font-serif mb-6">{project.title}</h3>
        <p className="text-sm text-gray-500 mb-6">{project.category}</p>
        <p className="text-gray-600 leading-relaxed mb-8 text-lg">{project.description}</p>
        <div className="flex flex-wrap gap-3 mb-8">
          {project.tech.map((tech) => (
            <div key={tech} className="px-4 py-2 text-sm border border-border-color rounded-full text-gray-600 bg-gray-50">
              {tech}
            </div>
          ))}
        </div>
        {(project.id === 1 || project.id === 2 || project.id === 3) && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 border border-border-color rounded-lg w-fit">
            <img src={marineNationaleLogo} alt="Marine Nationale" className="w-8 h-8 invert" />
            <span className="text-sm text-gray-600">Projet Marine Nationale</span>
          </div>
        )}
        </div>
      </div>
    </motion.div>
  );
}

const ArtGalleryPage = () => {
  useSmoothScroll();
  const projectsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ["start start", "end end"]
  });

  const isMobile = () => {
    if (typeof navigator === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const getLinkedInUrl = () => {
    if (isMobile()) {
      return "linkedin://profile/baptiste-delaville-de-la-parra";
    }
    return "https://fr.linkedin.com/in/baptiste-delaville-de-la-parra";
  };

  const getGithubUrl = () => {
    if (isMobile()) {
      return "github://user/Bdlvdlp";
    }
    return "https://github.com/Bdlvdlp";
  };

  const containerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <div className="art-gallery-body">
      <motion.main 
        className="max-w-7xl mx-auto px-6 md:px-12"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        <header className="py-12 md:py-20 flex justify-between items-start border-b border-border-color">
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl">Baptiste Delaville De La Parra</h1>
            <p className="text-sm text-gray-500">Développeur Full-Stack</p>
          </motion.div>
          <motion.div variants={itemVariants} className="text-right text-sm hidden md:block">
            <p>Disponible pour de nouvelles opportunités</p>
            <p>Basé à Brest, France</p>
          </motion.div>
        </header>

        <section id="about" className="py-20 md:py-32 border-b border-border-color">
          <motion.p 
            variants={itemVariants}
            className="text-3xl md:text-5xl leading-tight max-w-4xl"
          >
            Étudiant développeur en alternance dans un laboratoire d'innovation de la Marine Nationale, passionné par la création d'expériences web modernes et les technologies innovantes<span className="text-accent-color">.</span>
          </motion.p>
        </section>

        <section ref={projectsRef} className="relative" style={{ height: '400vh' }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </section>

        <section id="contact" className="py-20 md:py-32">
          <motion.h2 variants={itemVariants} className="text-4xl mb-8">Entrons en contact<span className="text-accent-color">.</span></motion.h2>
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start gap-8">
            <p className="text-lg text-gray-600 max-w-md">
              Je suis toujours ouvert à de nouvelles collaborations et opportunités. N'hésitez pas à me contacter.
            </p>
            <div className="flex flex-col items-start gap-4 text-lg">
              <motion.a
                href="mailto:baptiste.del@hotmail.com"
                className="flex items-center gap-2 group text-text-color hover:text-accent-color transition-colors duration-300"
                whileHover="hover"
              >
                <span className="font-medium">baptiste.del@hotmail.com</span>
                <motion.span variants={{ hover: { x: 5, y: -5 } }}><ArrowUpRight className="w-5 h-5" /></motion.span>
              </motion.a>
              <motion.a
                href={getGithubUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group text-text-color hover:text-accent-color transition-colors duration-300"
                whileHover="hover"
              >
                <span className="font-medium">Github</span>
                <motion.span variants={{ hover: { x: 5, y: -5 } }}><ArrowUpRight className="w-5 h-5" /></motion.span>
              </motion.a>
              <motion.a
                href={getLinkedInUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group text-text-color hover:text-accent-color transition-colors duration-300"
                whileHover="hover"
              >
                <span className="font-medium">LinkedIn</span>
                <motion.span variants={{ hover: { x: 5, y: -5 } }}><ArrowUpRight className="w-5 h-5" /></motion.span>
              </motion.a>
            </div>
          </motion.div>
        </section>

        <motion.footer variants={itemVariants} className="py-8 text-center border-t border-border-color">
          <p className="text-sm text-gray-400">
            © 2025 Baptiste Delaville De La Parra.
          </p>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default ArtGalleryPage;
