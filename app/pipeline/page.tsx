import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Database, Settings, Brain, Target, CheckCircle } from "lucide-react"

export default function PipelinePage() {
  const pipelineSteps = [
    {
      title: "Entrada de Dados",
      icon: Database,
      description: "Coleta das variáveis ambientais e meteorológicas",
      variables: ["Temperatura", "Umidade", "CO₂", "CO", "NO₂", "SO₂", "O₃", "Pressão Atmosférica"],
      color: "bg-blue-500",
    },
    {
      title: "Pré-processamento",
      icon: Settings,
      description: "Tratamento e preparação dos dados para o modelo",
      variables: [
        "Tratamento de valores nulos",
        "Conversão de váriávies (object → numérico)",
        "Criação de váriaveis para classificação de fenômenos",
        "Normalização/Escala dos dados",
        "Balanceamento de dados"
      ],
      color: "bg-orange-500",
    },
    {
      title: "Modelo de IA",
      icon: Brain,
      description: "Algoritmos de classificação para predição",
      variables: ["Separção de dados","Treino/Teste","Random Forest Classifier"],
      color: "bg-purple-500",
    },
    {
      title: "Classificação",
      icon: Target,
      description: "Análise de condições para fenômenos específicos",
      variables: [
        "Verificação de condições para Chuva Ácida",
        "Análise de possibilidade de Fumaça Tóxica",
        "Avaliação de risco de Efeito Estufa",
        "Classificação da Qualidade Ambiental",
      ],
      color: "bg-green-500",
    },
    {
      title: "Saída",
      icon: CheckCircle,
      description: "Resultado final da predição",
      variables: ['"Boa"', '"Moderada"', '"Ruim"', '"Muito Ruim"'],
      color: "bg-teal-500",
    },
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Settings className="w-4 h-4 mr-2" />
            Pipeline de Dados
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Fluxo de Processamento de Dados</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Processo completo desde a coleta de dados ambientais até a predição final da qualidade do ar e identificação
            de fenômenos específicos.
          </p>
        </div>

        {/* Pipeline Visualization */}
        <div className="space-y-8">
          {pipelineSteps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === pipelineSteps.length - 1

            return (
              <div key={index} className="relative">
                <Card className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${step.color} text-white`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{step.title}</h2>
                        <p className="text-muted-foreground font-normal">{step.description}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {step.variables.map((variable, varIndex) => (
                        <Badge key={varIndex} variant="outline" className="justify-start p-2">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow between steps */}
                {!isLast && (
                  <div className="flex justify-center my-6">
                    <div className="flex flex-col items-center">
                      <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
                      <div className="w-px h-4 bg-border" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Process Details */}
        <Card className="mt-12 bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span>Lógica de Classificação</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              O modelo verifica as condições específicas para cada fenômeno ambiental:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2"> Probabilidade Chuva Ácida</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Umidade elevada + concentrações altas de SO₂ e NO₂
                </p>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2"> Probabilidade Fumaça Tóxica</h4>
                <p className="text-sm text-red-600 dark:text-red-400">Temperatura alta + presença de NO₂ e O₃</p>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Probabilidade Efeito Estufa</h4>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  Concentrações elevadas de CO₂ e temperatura alta
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
