import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  featured?: boolean
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  demoUrl,
  githubUrl,
  featured = false,
}: ProjectCardProps) {
  return (
    <Card
      className={`group overflow-hidden hover:shadow-xl transition-all duration-300 ${featured ? "md:col-span-2" : ""}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={`${title} project screenshot`}
          className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            {demoUrl && (
              <Button size="sm" asChild className="bg-primary/90 hover:bg-primary">
                <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Demo
                </Link>
              </Button>
            )}
            {githubUrl && (
              <Button size="sm" variant="secondary" asChild className="bg-background/90 hover:bg-background">
                <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-1" />
                  Code
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          {featured && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          {demoUrl && (
            <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
              <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Live Demo
              </Link>
            </Button>
          )}
          {githubUrl && (
            <Button size="sm" variant="ghost" asChild className="flex-1">
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Source Code
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
