import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  Download,
  ExternalLink,
  Code,
  Database,
  Globe,
  Smartphone,
} from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js and Stripe integration. Features include user authentication, product management, shopping cart, and secure payment processing.",
    image: "/modern-ecommerce-dashboard.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    demoUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/johndoe/ecommerce-platform",
    featured: true,
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/task-management-app.png",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
    demoUrl: "https://taskapp-demo.example.com",
    githubUrl: "https://github.com/johndoe/task-manager",
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard that displays current conditions, forecasts, and interactive maps using multiple weather APIs.",
    image: "/preview/project4.png",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Mapbox", "SCSS"],
    demoUrl: "https://weather-dashboard.example.com",
    githubUrl: "https://github.com/johndoe/weather-dashboard",
  },
  {
    title: "Social Media Analytics",
    description:
      "A comprehensive analytics platform for social media managers to track engagement, growth metrics, and content performance across multiple platforms.",
    image: "/social-media-analytics-dashboard.png",
    technologies: ["React", "D3.js", "Python", "FastAPI", "Redis"],
    demoUrl: "https://analytics-demo.example.com",
    githubUrl: "https://github.com/johndoe/social-analytics",
  },
  {
    title: "Recipe Sharing Platform",
    description:
      "A community-driven recipe sharing platform where users can create, share, and discover new recipes with advanced search and filtering capabilities.",
    image: "/recipe-sharing-website.png",
    technologies: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Cloudinary",
      "NextAuth.js",
    ],
    demoUrl: "https://recipes-demo.example.com",
    githubUrl: "https://github.com/johndoe/recipe-platform",
  },
  {
    title: "Fitness Tracker Mobile App",
    description:
      "A cross-platform mobile application for tracking workouts, nutrition, and fitness goals with offline capabilities and data synchronization.",
    image: "/fitness-tracking-app.png",
    technologies: ["React Native", "Expo", "SQLite", "Redux", "Firebase"],
    demoUrl: "https://fitness-app.example.com",
    githubUrl: "https://github.com/johndoe/fitness-tracker",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section
        id="home"
        className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main heading */}
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight">
            John Doe
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl lg:text-4xl text-primary font-heading font-bold mb-4">
            Full Stack Developer
          </p>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Crafting elegant solutions with modern technologies. Passionate
            about creating exceptional user experiences and scalable
            applications.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 font-semibold group">
              View My Work
              <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 font-semibold group bg-transparent"
            >
              Download Resume
              <Download className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground mb-2">
              Scroll to explore
            </p>
            <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I&apos;m a passionate full stack developer with 5+ years of
              experience building web applications. I love turning complex
              problems into simple, beautiful solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Profile Image and Bio */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-6 flex items-center justify-center border-4 border-primary/10">
                <img
                  src="/developer-headshot.png"
                  alt="John Doe - Full Stack Developer"
                  className="w-56 h-56 rounded-full object-cover"
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
                  John Doe
                </h3>
                <p className="text-primary font-semibold mb-4">
                  Full Stack Developer
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Based in San Francisco, CA. Available for freelance projects
                  and full-time opportunities.
                </p>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                  My Story
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I started my journey in web development 5 years ago, driven by
                  a passion for creating digital experiences that make a
                  difference. What began as curiosity about how websites work
                  has evolved into a career focused on building scalable,
                  user-centric applications.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I specialize in modern JavaScript frameworks, cloud
                  architecture, and creating seamless user experiences. When
                  I&apos;m not coding, you&apos;ll find me exploring new
                  technologies, contributing to open source projects, or hiking
                  in the Bay Area.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                  What I Do
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Code className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Frontend Development
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Backend Development
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Web Applications
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Mobile Development
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-4xl font-heading font-black text-primary mb-2">
                50+
              </div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-black text-primary mb-2">
                5+
              </div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-black text-primary mb-2">
                20+
              </div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h3 className="font-heading font-bold text-3xl text-foreground text-center mb-12">
              Skills & Technologies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Frontend Skills */}
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Code className="h-6 w-6 text-primary mr-2" />
                    <h4 className="font-heading font-bold text-lg">Frontend</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          React
                        </span>
                        <span className="text-sm text-primary">95%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          TypeScript
                        </span>
                        <span className="text-sm text-primary">90%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          Next.js
                        </span>
                        <span className="text-sm text-primary">85%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Backend Skills */}
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Database className="h-6 w-6 text-primary mr-2" />
                    <h4 className="font-heading font-bold text-lg">Backend</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          Node.js
                        </span>
                        <span className="text-sm text-primary">90%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          Python
                        </span>
                        <span className="text-sm text-primary">80%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          PostgreSQL
                        </span>
                        <span className="text-sm text-primary">85%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tools & Platforms */}
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Globe className="h-6 w-6 text-primary mr-2" />
                    <h4 className="font-heading font-bold text-lg">Tools</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Docker</Badge>
                    <Badge variant="secondary">AWS</Badge>
                    <Badge variant="secondary">Git</Badge>
                    <Badge variant="secondary">Vercel</Badge>
                    <Badge variant="secondary">Figma</Badge>
                    <Badge variant="secondary">VS Code</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Soft Skills */}
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Smartphone className="h-6 w-6 text-primary mr-2" />
                    <h4 className="font-heading font-bold text-lg">
                      Soft Skills
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      • Problem Solving
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Team Leadership
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Communication
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Project Management
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Mentoring
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Here are some of my recent projects that showcase my skills and
              passion for development. Each project demonstrates different
              aspects of modern web development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                demoUrl={project.demoUrl}
                githubUrl={project.githubUrl}
                featured={index === 0}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Want to see more of my work? Check out my GitHub profile for
              additional projects and contributions.
            </p>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/johndoe"
                target="_blank"
                rel="noopener noreferrer"
              >
                View All Projects on GitHub
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Let&apos;s Work Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s
              discuss how we can bring your ideas to life.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
