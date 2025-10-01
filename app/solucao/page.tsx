"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  MapPin,
  Thermometer,
  Wind,
  Brain,
  CloudRain,
  Skull,
  Droplets,
  Cloud,
  Loader2,
  AlertTriangle,
} from "lucide-react"

// --- Componente para a visualização gráfica ---
const DataGauge = ({
  label,
  value,
  unit,
  min,
  max,
  colorClass,
}: {
  label: string
  value: number
  unit: string
  min: number
  max: number
  colorClass: string
}) => {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1 text-sm">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className="font-bold">
          {value.toFixed(1)} {unit}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div className={`h-3 rounded-full ${colorClass}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

export default function SolucaoPage() {
  // --- Estados ---
  const [predictionResult, setPredictionResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
    pais: "Brasil", // Valor padrão
  })

  // --- Função de chamada à API por localização ---
  const handleLocationPrediction = async () => {
    if (!locationData.cidade || !locationData.pais) {
      setError("Por favor, preencha a cidade e o país.")
      return
    }
    setIsLoading(true)
    setError(null)
    setPredictionResult(null)

    try {
      const response = await fetch("https://web-production-b320.up.railway.app/predict/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cidade: locationData.cidade,
          pais: locationData.pais,
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro na comunicação com o servidor: ${response.statusText}`)
      }

      const result = await response.json()
      setPredictionResult(result)
    } catch (err: any) {
      console.error("Falha ao buscar predição:", err)
      setError(
        "Não foi possível obter os dados. Verifique a cidade e tente novamente. (A API pode não ter dados para o local exato)"
      )
    } finally {
      setIsLoading(false)
    }
  }

  // --- Funções de estilo ---
  const getRiskColor = (risco: string) => {
    if (!risco) return "text-gray-600 bg-gray-100"
    switch (risco.toLowerCase()) {
      case "baixo":
        return "text-green-600 bg-green-100"
      case "moderado":
        return "text-yellow-600 bg-yellow-100"
      case "alto":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getQualityColor = (qualidade: string) => {
    if (!qualidade) return "text-gray-600 bg-gray-100"
    switch (qualidade.toLowerCase()) {
      case "boa":
        return "text-green-600 bg-green-100"
      case "moderada":
        return "text-yellow-600 bg-yellow-100"
      case "ruim":
        return "text-orange-600 bg-orange-100"
      case "muito ruim":
      case "péssima":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* --- Cabeçalho --- */}
        <div className="text-center mb-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              Predição de Qualidade do Ar
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Utilize nossa IA para analisar dados atmosféricos em tempo real por localização.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* --- Seção de Entrada de Dados --- */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-primary" />
                <span>Consultar por Localização</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    placeholder="Ex: Blumenau"
                    value={locationData.cidade}
                    onChange={(e) => setLocationData({ ...locationData, cidade: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="pais">País</Label>
                  <Select
                    value={locationData.pais}
                    onValueChange={(value) => setLocationData({ ...locationData, pais: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Brasil">Brasil</SelectItem>
                      <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                      <SelectItem value="Reino Unido">Reino Unido</SelectItem>
                      <SelectItem value="Alemanha">Alemanha</SelectItem>
                      <SelectItem value="França">França</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleLocationPrediction} className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Consultando...
                    </>
                  ) : (
                    "Analisar Qualidade do Ar"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* --- Seção de Resultados --- */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-primary" />
                <span>Resultado da Análise</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="text-center py-12 text-muted-foreground">
                  <Loader2 className="h-16 w-16 mx-auto mb-4 animate-spin opacity-50" />
                  <p>Buscando e processando dados...</p>
                </div>
              )}
              {error && (
                <div className="text-center py-12 text-red-600 bg-red-50 p-4 rounded-lg">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
                  <p className="font-semibold">Ocorreu um Erro</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              {!isLoading && !error && !predictionResult && (
                <div className="text-center py-12 text-muted-foreground">
                  <Wind className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Insira uma localização para obter a análise da qualidade do ar.</p>
                </div>
              )}
              {predictionResult && predictionResult.features_usadas && (
                <div className="space-y-6">
                  {/* --- Qualidade Geral --- */}
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Qualidade do Ar em {predictionResult.cidade}
                    </h3>
                    <Badge className={`text-xl px-6 py-2 mt-2 ${getQualityColor(predictionResult.label)}`}>
                      {predictionResult.label || "Indisponível"}
                    </Badge>
                  </div>

                  {/* --- Visualização de Temperatura e Umidade --- */}
                  <div className="space-y-4">
                    <DataGauge
                      label="Temperatura"
                      value={predictionResult.features_usadas.Temperatura}
                      unit="°C"
                      min={-10}
                      max={40}
                      colorClass="bg-gradient-to-r from-yellow-400 to-red-500"
                    />
                    <DataGauge
                      label="Umidade"
                      value={predictionResult.features_usadas.Umidade}
                      unit="%"
                      min={0}
                      max={100}
                      colorClass="bg-gradient-to-r from-cyan-400 to-blue-500"
                    />
                  </div>

                  {/* --- Análise de Fenômenos --- */}
                  <div>
                    <h4 className="font-semibold mb-3 text-center">Análise de Riscos</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CloudRain className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">Chuva Ácida</span>
                        </div>
                        <Badge className={getRiskColor(predictionResult.risco_chuva_acida)}>
                          {predictionResult.risco_chuva_acida}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Skull className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Fumaça Tóxica</span>
                        </div>
                        <Badge className={getRiskColor(predictionResult.fumaca_toxica)}>
                          {predictionResult.fumaca_toxica}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Thermometer className="h-5 w-5 text-orange-500" />
                          <span className="font-medium">Efeito Estufa</span>
                        </div>
                        <Badge className={getRiskColor(predictionResult.risco_efeito_estufa)}>
                          {predictionResult.risco_efeito_estufa}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* --- Demais Variáveis --- */}
                  <div>
                    <h4 className="font-semibold mb-3 text-center">Dados Coletados</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong>Pressão:</strong> {predictionResult.features_usadas.Pressao_Atm.toFixed(1)} hPa
                      </p>
                      <p>
                        <strong>CO₂:</strong> {predictionResult.features_usadas.CO2.toFixed(1)} ppm
                      </p>
                      <p>
                        <strong>CO:</strong> {predictionResult.features_usadas.CO.toFixed(3)} mg/m³
                      </p>
                      <p>
                        <strong>NO₂:</strong> {predictionResult.features_usadas.NO2.toFixed(3)} µg/m³
                      </p>
                      <p>
                        <strong>SO₂:</strong> {predictionResult.features_usadas.SO2.toFixed(3)} µg/m³
                      </p>
                      <p>
                        <strong>O₃:</strong> {predictionResult.features_usadas.O3.toFixed(3)} µg/m³
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}