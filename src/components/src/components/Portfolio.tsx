import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import portfolioFitness from "@/assets/portfolio-fitness.jpg";
import portfolioCafe from "@/assets/portfolio-cafe.jpg";
import portfolioCorporate from "@/assets/portfolio-corporate.jpg";
import portfolioFashion from "@/assets/portfolio-fashion.jpg";
import portfolioCreative from "@/assets/portfolio-creative.jpg";

const projects = [
  {
    title: "Elite Fitness",
    category: "Fitness & Gym",
    description: "A premium fitness platform with dark luxury aesthetics and gold accents.",
    images: [portfolioFitness, portfolioCafe, portfolioCorporate],
  },
  {
    title: "Artisan Bistro",
    category: "Café & Restaurant",
    description: "An elegant dining experience website with warm, inviting visuals.",
    images: [portfolioCafe, portfolioFitness, portfolioFashion],
  },
  {
    title: "Nexus Corp",
    category: "Corporate Business",
    description: "A clean, professional corporate site with modern simplicity.",
    images: [portfolioCorporate, portfolioCreative, portfolioFitness],
  },
  {
    title: "Maison Noir",
    category: "Fashion E-commerce",
    description: "A high-end fashion boutique with sophisticated product displays.",
    images: [portfolioFashion, portfolioCafe, portfolioCreative],
  },
  {
    title: "Studio Flux",
    category: "Creative Portfolio",
    description: "A bold creative portfolio showcasing dramatic visuals and artistry.",
    images: [portfolioCreative, portfolioFashion, portfolioCorporate],
  },
];

const Portfolio = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-silver/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block font-body text-xs tracking-[0.3em] uppercase text-primary/80 mb-4">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6">
            Portfolio
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Explore our collection of premium websites crafted for exceptional brands.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              <div
                onClick={() => openGallery(project)}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 lg:p-8">
                  <span className="font-body text-xs tracking-widest uppercase text-primary mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl font-light mb-2">
                    {project.title}
                  </h3>
                  <span className="font-body text-sm text-muted-foreground">
                    Click to view gallery
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-xl"
            onClick={closeGallery}
          >
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-foreground/20 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Gallery Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-6xl mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Project Info */}
              <div className="text-center mb-6">
                <span className="font-body text-xs tracking-widest uppercase text-primary mb-2 block">
                  {selectedProject.category}
                </span>
                <h3 className="font-display text-3xl lg:text-4xl font-light mb-2">
                  {selectedProject.title}
                </h3>
                <p className="font-body text-muted-foreground max-w-lg mx-auto">
                  {selectedProject.description}
                </p>
              </div>

              {/* Main Image */}
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-muted">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center gap-3 mt-6">
                {selectedProject.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-14 rounded-md overflow-hidden transition-all duration-300 ${
                      idx === currentImageIndex 
                        ? "ring-2 ring-primary scale-105" 
                        : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Image Counter */}
              <p className="text-center mt-4 font-body text-sm text-muted-foreground">
                {currentImageIndex + 1} / {selectedProject.images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
