"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  MapPin,
  Thermometer,
  Wind,
  AlertTriangle,
  CheckCircle,
  XCircle,
  CloudRain,
  Skull,
  Brain,
  Cloud,
} from "lucide-react"

export default function SolucaoPage() {
  const [predictionResult, setPredictionResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [manualData, setManualData] = useState({
    temperatura: "",
    umidade: "",
    co2: "",
    co: "",
    no2: "",
    so2: "",
    o3: "",
    pressao: "",
  })
  const [locationData, setLocationData] = useState({
    cidade: "",
    pais: "",
  })

  const handleManualPrediction = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        qualidade: "Moderada",
        probabilidade: 0.75,
        fenomenos: {
          chuvaAcida: { risco: "Baixo", probabilidade: 0.2 },
          fumacaToxica: { risco: "Médio", probabilidade: 0.6 },
          efeitoEstufa: { risco: "Alto", probabilidade: 0.8 },
        },
        recomendacoes: [
          "Evite atividades ao ar livre prolongadas",
          "Mantenha janelas fechadas durante o dia",
          "Use máscara em áreas urbanas densas",
        ],
      }
      setPredictionResult(mockResult)
      setIsLoading(false)
    }, 2000)
  }

  const handleLocationPrediction = async () => {
    setIsLoading(true)
    // Simulate API call with OpenWeather integration
    setTimeout(() => {
      const mockResult = {
        qualidade: "Boa",
        probabilidade: 0.9,
        dadosMeteorologicos: {
          temperatura: 22,
          umidade: 65,
          pressao: 1013,
        },
        dadosPoluicao: {
          co: 0.3,
          no2: 15.2,
          so2: 8.1,
          o3: 45.3,
          co2: 410,
        },
        fenomenos: {
          chuvaAcida: { risco: "Baixo", probabilidade: 0.1 },
          fumacaToxica: { risco: "Baixo", probabilidade: 0.2 },
          efeitoEstufa: { risco: "Médio", probabilidade: 0.5 },
        },
        recomendacoes: [
          "Condições favoráveis para atividades ao ar livre",
          "Qualidade do ar dentro dos padrões aceitáveis",
        ],
      }
      setPredictionResult(mockResult)
      setIsLoading(false)
    }, 2000)
  }

  const getRiskColor = (risco: string) => {
    switch (risco.toLowerCase()) {
      case "baixo":
        return "text-green-600 bg-green-100"
      case "médio":
        return "text-yellow-600 bg-yellow-100"
      case "alto":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getQualityColor = (qualidade: string) => {
    switch (qualidade.toLowerCase()) {
      case "boa":
        return "text-green-600 bg-green-100"
      case "moderada":
        return "text-yellow-600 bg-yellow-100"
      case "ruim":
        return "text-orange-600 bg-orange-100"
      case "muito ruim":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl blur-3xl -z-10 transform scale-110"></div>
          <div className="relative bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-30 animate-pulse"></div>
                <Badge
                  variant="secondary"
                  className="relative bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 text-primary font-semibold px-6 py-2 text-base"
                >
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Solução Inteligente
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400/30 via-blue-500/30 to-blue-700/30">
  <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent leading-tight">
    Predição de Qualidade do Ar
  </h1>
</div>

              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
              <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
                Sistema inteligente que permite inserir dados manualmente ou consultar informações em tempo real por
                localização, utilizando APIs meteorológicas e nosso modelo de IA treinado.
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-primary/30 rounded-full animate-ping"></div>
            <div className="absolute top-8 right-8 w-1 h-1 bg-secondary/40 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-accent/30 rounded-full animate-bounce"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Thermometer className="h-6 w-6 text-primary" />
                <span>Entrada de Dados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">Dados Manuais</TabsTrigger>
                  <TabsTrigger value="location">Por Localização</TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="temperatura">Temperatura (°C)</Label>
                      <Input
                        id="temperatura"
                        type="number"
                        placeholder="25.0"
                        value={manualData.temperatura}
                        onChange={(e) => setManualData({ ...manualData, temperatura: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="umidade">Umidade (%)</Label>
                      <Input
                        id="umidade"
                        type="number"
                        placeholder="60"
                        value={manualData.umidade}
                        onChange={(e) => setManualData({ ...manualData, umidade: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="co2">CO₂ (ppm)</Label>
                      <Input
                        id="co2"
                        type="number"
                        placeholder="400"
                        value={manualData.co2}
                        onChange={(e) => setManualData({ ...manualData, co2: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="co">CO (mg/m³)</Label>
                      <Input
                        id="co"
                        type="number"
                        placeholder="0.5"
                        value={manualData.co}
                        onChange={(e) => setManualData({ ...manualData, co: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="no2">NO₂ (µg/m³)</Label>
                      <Input
                        id="no2"
                        type="number"
                        placeholder="20"
                        value={manualData.no2}
                        onChange={(e) => setManualData({ ...manualData, no2: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="so2">SO₂ (µg/m³)</Label>
                      <Input
                        id="so2"
                        type="number"
                        placeholder="10"
                        value={manualData.so2}
                        onChange={(e) => setManualData({ ...manualData, so2: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="o3">O₃ (µg/m³)</Label>
                      <Input
                        id="o3"
                        type="number"
                        placeholder="50"
                        value={manualData.o3}
                        onChange={(e) => setManualData({ ...manualData, o3: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pressao">Pressão (hPa)</Label>
                      <Input
                        id="pressao"
                        type="number"
                        placeholder="1013"
                        value={manualData.pressao}
                        onChange={(e) => setManualData({ ...manualData, pressao: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button onClick={handleManualPrediction} className="w-full" disabled={isLoading}>
                    {isLoading ? "Analisando..." : "Analisar Qualidade do Ar"}
                  </Button>
                </TabsContent>

                <TabsContent value="location" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        placeholder="São Paulo"
                        value={locationData.cidade}
                        onChange={(e) => setLocationData({ ...locationData, cidade: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pais">País</Label>
                      <Select onValueChange={(value) => setLocationData({ ...locationData, pais: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BR">Brasil</SelectItem>
                          <SelectItem value="US">Estados Unidos</SelectItem>
                          <SelectItem value="GB">Reino Unido</SelectItem>
                          <SelectItem value="DE">Alemanha</SelectItem>
                          <SelectItem value="FR">França</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Dados Obtidos via API
                      </h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                          • <strong>OpenWeather Current Weather:</strong> Temperatura, Umidade, Pressão
                        </p>
                        <p>
                          • <strong>OpenWeather Air Pollution:</strong> CO, NO₂, SO₂, O₃
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleLocationPrediction} className="w-full" disabled={isLoading}>
                    {isLoading ? "Consultando APIs..." : "Consultar por Localização"}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-primary" />
                <span>Resultado da Predição</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!predictionResult ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Wind className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Insira os dados para obter a predição da qualidade do ar</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Quality Result */}
                  <div className="text-center">
                    <Badge className={`text-lg px-4 py-2 ${getQualityColor(predictionResult.qualidade)}`}>
                      Qualidade: {predictionResult.qualidade}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      Confiança: {(predictionResult.probabilidade * 100).toFixed(1)}%
                    </p>
                  </div>

                  {/* Phenomena Analysis */}
                  <div>
                    <h4 className="font-semibold mb-3">Análise de Fenômenos</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CloudRain className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">Chuva Ácida</span>
                        </div>
                        <Badge className={getRiskColor(predictionResult.fenomenos.chuvaAcida.risco)}>
                          {predictionResult.fenomenos.chuvaAcida.risco}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Skull className="h-5 w-5 text-red-500" />
                          <span className="font-medium">Fumaça Tóxica</span>
                        </div>
                        <Badge className={getRiskColor(predictionResult.fenomenos.fumacaToxica.risco)}>
                          {predictionResult.fenomenos.fumacaToxica.risco}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="h-5 w-5 text-orange-500" />
                          <span className="font-medium">Efeito Estufa</span>
                        </div>
                        <Badge className={getRiskColor(predictionResult.fenomenos.efeitoEstufa.risco)}>
                          {predictionResult.fenomenos.efeitoEstufa.risco}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold mb-3">Recomendações</h4>
                    <div className="space-y-2">
                      {predictionResult.recomendacoes.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Animation/Visual Feedback */}
                  <div className="text-center py-4">
                    <div className="animate-pulse-glow inline-block p-4 rounded-full bg-primary/10">
                      {predictionResult.qualidade === "Boa" ? (
                        <CheckCircle className="h-12 w-12 text-green-500" />
                      ) : predictionResult.qualidade === "Muito Ruim" ? (
                        <XCircle className="h-12 w-12 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-12 w-12 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* API Integration Info */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">Integração com APIs Externas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center space-y-2">
                <Cloud className="h-12 w-12 mx-auto text-blue-500" />
                <h4 className="font-semibold">OpenWeather Current Weather</h4>
                <p className="text-sm text-muted-foreground">
                  Temperatura, Umidade, Pressão Atmosférica e outros dados meteorológicos básicos
                </p>
              </div>
              <div className="text-center space-y-2">
                <Wind className="h-12 w-12 mx-auto text-green-500" />
                <h4 className="font-semibold">OpenWeather Air Pollution</h4>
                <p className="text-sm text-muted-foreground">
                  Concentrações de CO, NO₂, SO₂, O₃ e outros poluentes atmosféricos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
