import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, ArrowRight, ChevronDown, Map } from 'lucide-react';
import marineNationaleLogo from './assets/marine_blanc.png';

function App() {
  const [activeProject, setActiveProject] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour detecter si on est sur mobile
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Liens avec deep links pour mobile
  const getLinkedInUrl = () => {
    if (isMobile()) {
      return "linkedin://profile/baptiste-delaville-de-la-parra";
    }
    return "https://fr.linkedin.com/in/baptiste-delaville-de-la-parra";
  };

  const getGithubUrl = () => {
    if (isMobile()) {
      return "github://Bdlvdlp";
    }
    return "https://github.com/Bdlvdlp";
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const projects = [
    {
      id: 1,
      title: 'Application web pour les moniteurs de sport',
      category: 'Web Application',
      description: 'J\'ai été chargé seul de remplacer les fichiers Excel utilisés par les moniteurs de sport de la Marine Nationale par une véritable application web. L\'objectif était de centraliser la gestion des évaluations physiques, de simplifier les inscriptions, d\'automatiser la saisie des résultats et de produire des statistiques. Les moniteurs passent de 26 champs à saisir pour chaque marin à 6. Le projet a été déployé sur serveur et est maintenant en phase d\'expérimentation.',
      tech: ['React', 'JavaScript', 'Node.js', 'MySQL'],
      link: '#',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 2,
      title: 'Application de navigation Antarctique - ASTROLAB',
      category: 'Système de Navigation',
      description: 'Développement d\'une application web critique pour la navigation du brise-glace ASTROLAB en Antarctique. Fournit aux pilotes des glaces une vision temps réel de la situation glacière grâce à l\'analyse automatique d\'images satellite, l\'intégration de données GEOTIFF et le traçage de routes optimisées avec GPS. Le développement est en cours, une première version partira en expédition en octobre.',
      tech: ['React', 'Python', 'JavaScript', 'GEOTIFF', 'Images Satellite', 'API'],
      link: '#',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 3,
      title: 'Application web pour les commissaires',
      category: 'Système Financier',
      description: 'Seul développeur sur ce projet complexe, je développe une application destinée aux commissaires de la Marine Nationale. L\'objectif est d\'unifier plusieurs systèmes existants afin d\'harmoniser la gestion des achats, ventes, stocks et documents financiers à bord. J\'ai mis en place de nombreuses automatisations et assure la fiabilité des opérations monétaires, particulièrement sensibles. L\'application est encore en cours de développement.',
      tech: ['React', 'Node.js', 'SQLite', 'Automatisation'],
      link: '#',
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 4,
      title: 'Analyse de risque érosion côtière',
      category: 'Projet Personnel',
      description: 'Projet personnel pour aider une étudiante lors de la rédaction de son mémoire sur l\'érosion et la manière dont les assurances gèrent cette problématique. Récupération d\'une base de données de clients, analyse de leurs adresses pour définir en fonction de leur distance au trait de côte à risque, s\'ils étaient considérés comme à risque ou non face à l\'érosion. Développement d\'une carte interactive utilisant les APIs du gouvernement pour vérifier les adresses et les données du trait de côte des Côtes d\'Armor en Bretagne.',
      tech: ['React', 'Python', 'Leaflet', 'APIs Gouvernement'],
      link: '#',
      color: 'from-red-500 to-blue-500'
    }
  ];

  return (
    <div className="text-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950 via-slate-950 to-orange-900 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 left-10 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 right-10 w-64 h-64 bg-red-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      <section className="relative min-h-screen flex items-center justify-center z-10">

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-orange-500/10 to-blue-500/10 backdrop-blur-sm rounded-full border border-orange-400/20 shadow-lg shadow-orange-500/20">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400 tracking-[0.2em]">
              BDLVDLP
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
              Développeur Full-Stack
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Étudiant développeur en alternance à la Marine Nationale, passionné par le développement web et les technologies modernes
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <button 
              onClick={() => scrollToSection('projects')} 
              className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Voir mes projets
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Me contacter
            </button>
          </div>

          <div className="flex gap-6 justify-center">
            <a 
              href={getGithubUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href={getLinkedInUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:baptiste.del@hotmail.com" className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection('projects')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hover:scale-110 transition-all duration-300 p-3 rounded-full hover:bg-orange-500/10 group cursor-pointer"
          aria-label="Défiler vers les projets"
        >
          <ChevronDown className="w-8 h-8 text-orange-400 group-hover:text-orange-300" />
        </button>
      </section>

      {/* Projets */}
      <section id="projects" className="relative py-32 px-4 z-10">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Code2 className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-gray-300">Réalisations</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Mes Projets
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]"
                onMouseEnter={() => setActiveProject(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-sm text-gray-400 mb-2 block">{project.category}</span>
                      <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                    </div>
                    {project.id === 1 || project.id === 2 || project.id === 3 ? (
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl backdrop-blur-sm border border-orange-400/30 flex items-center justify-center p-2.5 shadow-lg shadow-orange-500/20">
                          <img 
                            src={marineNationaleLogo} 
                            alt="Marine Nationale" 
                            className="w-full h-full object-contain opacity-90 filter brightness-110"
                          />
                        </div>
                      </div>
                    ) : project.id === 4 ? (
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl backdrop-blur-sm border border-orange-400/30 flex items-center justify-center p-2.5 shadow-lg shadow-orange-500/20">
                          <Map className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ) : (
                      <a
                        href={project.link}
                        className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm border border-white/10 hover:border-white/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-500`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-32 px-4 z-10">
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Mail className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-300">Contact</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Travaillons ensemble
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Un projet en tête ? Discutons-en et créons quelque chose d'exceptionnel.
          </p>

          <a
            href="mailto:baptiste.del@hotmail.com"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300"
          >
            <Mail className="w-6 h-6" />
            baptiste.del@hotmail.com
          </a>
        </div>


      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-8 px-4 z-10">
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">
            © 2025 Portfolio. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a 
              href={getGithubUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Github
            </a>
            <a 
              href={getLinkedInUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a href="mailto:baptiste.del@hotmail.com" className="text-gray-500 hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
