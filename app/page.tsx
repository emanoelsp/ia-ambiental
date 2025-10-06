import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, GraduationCap, User } from "lucide-react"

export default function HomePage() {
  const teamMembers = [
    "Julio Cesar Lümke",
    "Emanoel Spanhol",
    "Andreia Nunes Gonçalves",
    "Rosemeri Janiski Bida De Oliveira Borges",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm font-medium">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Pós-graduação em IA Aplicada
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  Predição de <span className="text-primary">Qualidade do Ar</span> com IA
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Sistema inteligente para análise e predição de condições ambientais utilizando aprendizagem de máquina
                  e dados meteorológicos em tempo real.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="text-sm">
                  <Brain className="w-3 h-3 mr-1" />
                  Machine Learning
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Análise Ambiental
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Predição Inteligente
                </Badge>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 animate-float">
                <Image
                  src="/images/residencia-ia.png"
                  alt="Residência em Inteligência Artificial"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl shadow-2xl animate-pulse-glow"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl transform scale-110" />
            </div>
          </div>
        </div>
    <div className="container mx-auto max-w-4xl mt-10 px-4 border-t-10">
        <h2 className="text-center text-3xl font-bold mt-12 mb-6 text-red-600">
        Este conteúdo é destinado apenas para fins educacionais. Os dados exibidos são ilustrativos e podem não corresponder a situações reais.
      </h2>
      </div>

      </section>

      {/* Project Details */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Academic Info */}
            <Card className="p-8 border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Informações Acadêmicas</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Curso</h3>
                    <p className="text-muted-foreground">Pós-graduação em Inteligência Artificial Aplicada</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Disciplina</h3>
                    <p className="text-muted-foreground"> Aprendizagem de Máquina</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Professor</h3>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-primary" />
                      <p className="text-muted-foreground">Regis Cardoso</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Info */}
            <Card className="p-8 border-2 hover:border-secondary/50 transition-colors">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-secondary" />
                  <h2 className="text-2xl font-bold">Equipe de Desenvolvimento</h2>
                </div>

                <div className="space-y-3">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span className="text-muted-foreground">{member}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-4 bg-gradient-to-r from-muted/20 via-muted/30 to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <Brain className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-balance">
                Visão Geral do <span className="text-primary">Projeto</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-0 text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                    <div className="w-6 h-6 bg-blue-500 rounded-full" />
                  </div>
                  <h3 className="font-semibold text-lg">Análise Inteligente</h3>
                  <p className="text-sm text-muted-foreground">
                    Sistema capaz de analisar variáveis ambientais e meteorológicas complexas
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-2 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-0 text-center space-y-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                    <div className="w-6 h-6 bg-green-500 rounded-full" />
                  </div>
                  <h3 className="font-semibold text-lg">Predição Precisa</h3>
                  <p className="text-sm text-muted-foreground">
                    Predição da qualidade do ar e identificação de fenômenos ambientais
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-2 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-0 text-center space-y-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                    <div className="w-6 h-6 bg-purple-500 rounded-full" />
                  </div>
                  <h3 className="font-semibold text-lg">Integração Completa</h3>
                  <p className="text-sm text-muted-foreground">
                    Integração com APIs meteorológicas e técnicas avançadas de ML
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-4xl mx-auto mt-12">
              <Card className="p-8 bg-gradient-to-br from-background to-muted/20 border-2">
                <CardContent className="p-0">
                  <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                    Este projeto desenvolve um sistema inteligente capaz de analisar variáveis ambientais e
                    meteorológicas para predizer a <span className="font-semibold text-green-600"> qualidade do ar </span> e identificar possíveis fenômenos como{" "}
                    <span className="font-semibold text-red-600">chuva ácida</span>,{" "}
                    <span className="font-semibold text-gray-600">fumaça tóxica</span> e{" "}
                    <span className="font-semibold text-orange-600">efeito estufa</span>. Utilizando técnicas avançadas
                    de aprendizagem de máquina e integração com APIs meteorológicas, oferecemos uma solução completa
                    para monitoramento ambiental.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
