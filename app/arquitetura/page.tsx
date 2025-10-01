import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Database, Cloud, Server, Globe, Layers, Settings, BarChart3 } from "lucide-react"

export default function ArquiteturaPage() {
  const circularFlow = [
    {
      id: 1,
      title: "CRISP-DM Inicial",
      icon: Layers,
      description: "Metodologia inicial para entendimento do problema",
      details: [],
      color: "bg-purple-500",
      position: { top: "10%", left: "50%" },
    },
    {
      id: 2,
      title: "Dataset & Exploração",
      icon: Database,
      description: "Coleta e exploração inicial dos dados",
      details: [],
      color: "bg-blue-500",
      position: { top: "25%", left: "80%" },
    },
    {
      id: 3,
      title: "Entendimento do Problema",
      icon: BarChart3,
      description: "Análise profunda do problema de qualidade do ar",
      details: [],
      color: "bg-indigo-500",
      position: { top: "50%", left: "90%" },
    },
    {
      id: 4,
      title: "Ajuste do Dataset",
      icon: Settings,
      description: "Preparação e limpeza dos dados",
      details: [],
      color: "bg-cyan-500",
      position: { top: "75%", left: "80%" },
    },
    {
      id: 5,
      title: "Treino do Modelo",
      icon: Brain,
      description: "Treinamento e validação do modelo de IA",
      details: [],
      color: "bg-green-500",
      position: { top: "90%", left: "50%" },
    },
    {
      id: 6,
      title: "API de Predição",
      icon: Server,
      description: "Criação da API para inferência",
      details: [],
      color: "bg-orange-500",
      position: { top: "75%", left: "20%" },
    },
    {
      id: 7,
      title: "Recepção de Dados",
      icon: Cloud,
      description: "Recebe dados do frontend ou OpenWeather API",
      details: [],
      color: "bg-yellow-500",
      position: { top: "50%", left: "10%" },
    },
    {
      id: 8,
      title: "Retorno das Predições",
      icon: Globe,
      description: "Entrega dos resultados de predição",
      details: [],
      color: "bg-teal-500",
      position: { top: "25%", left: "20%" },
    },
  ]

  const crispDmPhases = [
    {
      phase: "Business Understanding",
      description: "Compreensão do problema de qualidade do ar e definição dos objetivos",
    },
    {
      phase: "Data Understanding",
      description: "Análise exploratória dos dados ambientais e meteorológicos",
    },
    {
      phase: "Data Preparation",
      description: "Limpeza, transformação e preparação dos dados para modelagem",
    },
    {
      phase: "Modeling",
      description: "Seleção e treinamento de algoritmos de machine learning",
    },
    {
      phase: "Evaluation",
      description: "Avaliação da performance e validação dos modelos",
    },
    {
      phase: "Deployment",
      description: "Implementação do modelo em produção via API",
    },
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Brain className="w-4 h-4 mr-2" />
            Arquitetura do Sistema
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Arquitetura e Fluxo do Sistema</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Arquitetura completa desde a entrada do dataset até a apresentação dos resultados no frontend, utilizando
            CRISP-DM para refinamento e APIs para dados em tempo real.
          </p>
        </div>

        {/* Seção da Topologia do Sistema */}
        <div className="mb-16">

          {/* ===== 1. VISUALIZAÇÃO PARA DESKTOP (Layout Circular) ===== */}
          {/* Aparece apenas em telas grandes (lg) ou maiores */}
          <div className="relative w-full h-[650px] mx-auto hidden lg:block">
            {/* Círculo Central */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
              <Brain className="w-12 h-12 text-white" />
            </div>

            {/* Componentes do Fluxo Circular */}
            {circularFlow.map((component, index) => {
              const Icon = component.icon
              const nextIndex = (index + 1) % circularFlow.length
              const nextComponent = circularFlow[nextIndex]
              return (
                <div key={`desktop-${component.id}`}>
                  {/* Card do Componente */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 w-48 mt-4"
                    style={{ top: component.position.top, left: component.position.left }}
                  >
                    <Card className="border-2 bg-transparenthover:border-primary/50 transition-all hover:scale-105 shadow-lg">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center space-x-2 text-sm">
                          <div className={`p-2 rounded-lg ${component.color} text-white`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-semibold">{component.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-muted-foreground mb-2">{component.description}</p>
                        <div className="space-y-1">
                          {component.details.slice(0, 2).map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center space-x-1">
                              <div className="w-1 h-1 bg-primary rounded-full" />
                              <span className="text-xs text-muted-foreground">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Setas curvadas (SVG) */}
                  <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
                    <defs>
                      <marker id={`arrowhead-${index}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
                      </marker>
                    </defs>
                    <path
                      d={`M ${parseFloat(component.position.left)}% ${parseFloat(component.position.top)}% 
                          Q 50% 50% 
                          ${parseFloat(nextComponent.position.left)}% ${parseFloat(nextComponent.position.top)}%`}
                      stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd={`url(#arrowhead-${index})`} opacity="0.6"
                    />
                  </svg>
                </div>
              )
            })}
          </div>

          {/* ===== 2. VISUALIZAÇÃO PARA CELULAR (Layout de Lista) ===== */}
          {/* Aparece em telas pequenas e some a partir do breakpoint 'lg' */}
          <div className="flex flex-col gap-4 lg:hidden">
            {circularFlow.map(component => {
              const Icon = component.icon
              return (
                <Card key={`mobile-${component.id}`} className="border-2 w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-base">
                      <div className={`p-2 rounded-lg ${component.color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-semibold">{component.title}</span>
                    </CardTitle>
                  </CardHeader>
                  {/* O CardContent não é renderizado aqui para simplificar a view mobile */}
                </Card>
              )
            })}
          </div>
        </div>

        {/* Seção CRISP-DM */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Metodologia CRISP-DM</h2>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-6 w-6 text-primary" />
                <span>Cross-Industry Standard Process for Data Mining</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {crispDmPhases.map((phase, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{phase.phase}</h4>
                      <p className="text-muted-foreground text-sm">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seção Stack Tecnológico */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Stack Tecnológico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <Database className="h-12 w-12 mx-auto text-blue-500" />
                <h4 className="font-semibold">Dados</h4>
                <p className="text-sm text-muted-foreground">Datasets ambientais</p>
              </div>
              <div className="space-y-2">
                <Brain className="h-12 w-12 mx-auto text-purple-500" />
                <h4 className="font-semibold">ML/IA</h4>
                <p className="text-sm text-muted-foreground">Python, Scikit-learn, Random forest classifier</p>
              </div>
              <div className="space-y-2">
                <Server className="h-12 w-12 mx-auto text-orange-500" />
                <h4 className="font-semibold">Backend</h4>
                <p className="text-sm text-muted-foreground">API REST, FastAPI</p>
              </div>
              <div className="space-y-2">
                <Server className="h-12 w-12 mx-auto text-orange-500" />
                <h4 className="font-semibold">Backend</h4>
                <p className="text-sm text-muted-foreground">API Pública, Railway</p>
              </div>
              <div className="space-y-2">
                <Server className="h-12 w-12 mx-auto text-orange-500" />
                <h4 className="font-semibold">Backend</h4>
                <p className="text-sm text-muted-foreground">API Externa, OpenWeather</p>
              </div>
              <div className="space-y-2">
                <Globe className="h-12 w-12 mx-auto text-teal-500" />
                <h4 className="font-semibold">Frontend</h4>
                <p className="text-sm text-muted-foreground">React, Next.js, Tailwind CSS</p>
              </div>
              <div className="space-y-2">
                <Globe className="h-12 w-12 mx-auto text-teal-500" />
                <h4 className="font-semibold">Frontend</h4>
                <p className="text-sm text-muted-foreground">Domínio publico, Vercel</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}