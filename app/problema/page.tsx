import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Thermometer, Droplets, Wind, Gauge, Zap, CloudRain, Skull } from "lucide-react"

export default function ProblemaPage() {
  const phenomena = [
    {
      title: "Chuva Ácida",
      icon: CloudRain,
      description: "Formada pela combinação de umidade elevada com SO₂ e NO₂",
      factors: ["Umidade alta", "SO₂ elevado", "NO₂ presente"],
      color: "text-blue-500",
    },
    {
      title: "Fumaça Tóxica",
      icon: Skull,
      description: "Resultado da interação entre NO₂ e O₃ em altas temperaturas",
      factors: ["Temperatura alta", "NO₂ elevado", "O₃ presente"],
      color: "text-red-500",
    },
    {
      title: "Efeito Estufa",
      icon: Thermometer,
      description: "Intensificado por concentrações elevadas de CO₂",
      factors: ["CO₂ elevado", "Temperatura alta", "Pressão baixa"],
      color: "text-orange-500",
    },
  ]

  const variables = [
    {
      name: "Temperatura",
      icon: Thermometer,
      impact: "Acelera reações químicas e formação de ozônio",
      color: "bg-red-100 text-red-700",
    },
    {
      name: "Umidade",
      icon: Droplets,
      impact: "Favorece chuva ácida quando combinada com poluentes",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Pressão Atmosférica",
      icon: Gauge,
      impact: "Regula dispersão de poluentes na atmosfera",
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "CO₂",
      icon: Wind,
      impact: "Principal gás do efeito estufa de longo prazo",
      color: "bg-gray-100 text-gray-700",
    },
    {
      name: "CO, SO₂, NO₂",
      icon: AlertTriangle,
      impact: "Marcadores de combustão e poluição urbana",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      name: "O₃ (Ozônio)",
      icon: Zap,
      impact: "Componente principal da fumaça tóxica",
      color: "bg-green-100 text-green-700",
    },
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Análise do Problema
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Qualidade do Ar e Fatores Ambientais</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            A qualidade do ar resulta da complexa interação entre condições meteorológicas e poluentes atmosféricos,
            gerando fenômenos que impactam diretamente a saúde e o meio ambiente.
          </p>
        </div>

        {/* Problem Description */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-teal-50 to-green-50 rounded-3xl opacity-50"></div>
          <div className="absolute top-4 right-4 opacity-10">
            <Wind className="h-32 w-32 text-primary" />
          </div>
          <Card className="relative border-2 border-primary/20 shadow-lg backdrop-blur-sm bg-white/80">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Wind className="h-8 w-8 text-primary" />
                </div>
                <span className="bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
                  Contexto do Problema
                </span>
              </CardTitle>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-teal-500 rounded-full"></div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Thermometer className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="font-semibold text-blue-800">Temperatura</div>
                    <div className="text-sm text-blue-600">Reações químicas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <Droplets className="h-6 w-6 text-teal-600" />
                  <div>
                    <div className="font-semibold text-teal-800">Umidade</div>
                    <div className="text-sm text-teal-600">Chuva ácida</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Gauge className="h-6 w-6 text-purple-600" />
                  <div>
                    <div className="font-semibold text-purple-800">Pressão</div>
                    <div className="text-sm text-purple-600">Dispersão</div>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none space-y-4">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border-l-4 border-blue-500">
                  <p className="text-gray-700 leading-relaxed mb-0">
                    A qualidade do ar resulta da interação entre condições meteorológicas e poluentes atmosféricos.{" "}
                    <span className="font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded">
                      Temperatura e umidade
                    </span>{" "}
                    influenciam as reações químicas: o calor acelera a formação de ozônio (O₃) e smog, enquanto a
                    umidade favorece a chuva ácida quando combinada com SO₂ e NO₂.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-l-4 border-orange-500">
                  <p className="text-gray-700 leading-relaxed mb-0">
                    O <span className="font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded">CO₂</span> atua no
                    longo prazo, intensificando o efeito estufa, enquanto CO, SO₂ e NO₂ impactam diretamente a saúde e o
                    ambiente, servindo de marcadores de combustão e poluição urbana. O ozônio troposférico, formado por
                    reações secundárias, é um dos principais componentes da fumaça tóxica.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-l-4 border-purple-500">
                  <p className="text-gray-700 leading-relaxed mb-0">
                    A{" "}
                    <span className="font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded">
                      pressão atmosférica
                    </span>{" "}
                    regula a dispersão: pressões altas retêm poluentes próximos ao solo, aumentando riscos. A variável
                    Qualidade_Ambiental sintetiza essas medições em classificações acessíveis como "boa" ou "ruim".
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Variables */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
              <Zap className="w-5 h-5 mr-2" />
              Análise das Variáveis
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Variáveis Ambientais</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-primary to-teal-500 rounded-full mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {variables.map((variable, index) => {
              const Icon = variable.icon
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-4 rounded-xl ${variable.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                          {variable.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{variable.impact}</p>
                        <div className="mt-3 h-1 w-0 bg-gradient-to-r from-primary to-teal-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Phenomena Prediction */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Fenômenos Previsíveis</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {phenomena.map((phenomenon, index) => {
              const Icon = phenomenon.icon
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Icon className={`h-8 w-8 ${phenomenon.color}`} />
                      <span>{phenomenon.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{phenomenon.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Fatores Determinantes:</h4>
                      <div className="space-y-2">
                        {phenomenon.factors.map((factor, factorIndex) => (
                          <Badge key={factorIndex} variant="outline" className="mr-2">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Conclusion */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Objetivo da Solução</h3>
            <p className="text-lg text-muted-foreground text-pretty">
              O cruzamento dessas variáveis permite prever episódios de chuva ácida (umidade + SO₂/NO₂), efeito estufa
              (CO₂ elevado) e fumaça tóxica (NO₂ + O₃ em altas temperaturas), fornecendo alertas antecipados para
              proteção da saúde pública e meio ambiente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
