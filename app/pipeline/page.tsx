import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Settings, Brain, Target, CheckCircle } from "lucide-react"

export default function PipelinePage() {
  const pipelineSteps = [
    {
      title: "Entrada de Dados",
      icon: Database,
      description: "Coleta das variáveis ambientais e meteorológicas",
      variables: ["Temperatura", "Umidade", "CO₂", "CO", "NO₂", "SO₂", "O₃", "Pressão Atmosférica"],
      color: "blue",
    },
    {
      title: "Pré-processamento",
      icon: Settings,
      description: "Tratamento e preparação dos dados para o modelo",
      variables: [
        "Tratamento de valores nulos",
        "Conversão de variáveis (object → numérico)",
        "Criação de variáveis para classificação",
        "Normalização/Escala dos dados",
        "Balanceamento de dados",
      ],
      color: "orange",
    },
    {
      title: "Modelo de IA",
      icon: Brain,
      description: "Algoritmos de classificação para predição",
      variables: ["Separação de dados", "Treino/Teste", "Random Forest Classifier"],
      color: "purple",
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
      color: "green",
    },
    {
      title: "Saída",
      icon: CheckCircle,
      description: "Resultado final da predição",
      variables: ['"Boa"', '"Moderada"', '"Ruim"', '"Muito Ruim"'],
      color: "teal",
    },
  ]

  // Mapeamento de cores para classes do Tailwind
  const colorClasses = {
    blue: {
      bg: "bg-blue-500",
      border: "border-blue-500",
      text: "text-blue-500",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
    },
    orange: {
      bg: "bg-orange-500",
      border: "border-orange-500",
      text: "text-orange-500",
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
    },
    purple: {
      bg: "bg-purple-500",
      border: "border-purple-500",
      text: "text-purple-500",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
    },
    green: {
      bg: "bg-green-500",
      border: "border-green-500",
      text: "text-green-500",
      iconBg: "bg-green-100 dark:bg-green-900/30",
    },
    teal: {
      bg: "bg-teal-500",
      border: "border-teal-500",
      text: "text-teal-500",
      iconBg: "bg-teal-100 dark:bg-teal-900/30",
    },
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
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
        <div className="relative">
          {/* Linha de fundo */}
          <div className="absolute left-9 top-0 h-full w-px bg-border -z-10 hidden md:block" />

          {pipelineSteps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === pipelineSteps.length - 1
            const colors = colorClasses[step.color as keyof typeof colorClasses]

            return (
              <div key={index} className="relative pl-20 mb-8">
                {/* Ícone da Etapa na Linha do Tempo */}
                <div className="absolute left-0 top-1 transform -translate-x-1/2 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full ${colors.iconBg} flex items-center justify-center ring-8 ring-background`}>
                    <Icon className={`h-8 w-8 ${colors.text}`} />
                  </div>
                </div>

                <Card className={`border-l-4 ${colors.border} shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>
                  <CardHeader>
                    <div>
                      <h2 className="text-2xl font-bold">{step.title}</h2>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Lista de variáveis */}
                    <ul className="space-y-2 md:columns-2 gap-x-8">
                      {step.variables.map((variable, varIndex) => (
                        <li key={varIndex} className="flex items-center text-sm">
                          <CheckCircle className={`h-4 w-4 mr-3 flex-shrink-0 ${colors.text}`} />
                          <span className="text-muted-foreground">{variable}</span>
                        </li>
                      ))}
                    </ul>

                    {/* LÓGICA DE CLASSIFICAÇÃO ADICIONADA AQUI, NA ÚLTIMA ETAPA */}
                    {isLast && (
                      <div className="mt-6 pt-6 border-t">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                           <Brain className="w-5 h-5 mr-2 text-primary" />
                           Lógica de Classificação dos Fenômenos
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          Além da classificação geral, a saída inclui a análise de risco para fenômenos específicos:
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Chuva Ácida</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-400">
                              Verifica se há umidade elevada em conjunto com concentrações altas de **SO₂** e **NO₂**.
                            </p>
                          </div>
                          <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                            <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Fumaça Tóxica</h4>
                            <p className="text-sm text-red-700 dark:text-red-400">
                              Analisa se a temperatura está alta na presença de **NO₂** e Ozônio (**O₃**).
                            </p>
                          </div>
                          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                            <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Efeito Estufa</h4>
                            <p className="text-sm text-orange-700 dark:text-orange-400">
                              Avalia se as concentrações de **CO₂** estão elevadas, potencializadas pela temperatura.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}