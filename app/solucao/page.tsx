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
  Thermometer,
  Wind,
  Brain,
  CloudRain,
  Skull,
  Loader2,
  AlertTriangle,
  FileDigit,
  Droplets,
  Gauge,
  MapPin, // Ícone para Localização
  Info,   // Ícone para Recomendação
  Beaker, // Ícone para Poluentes
} from "lucide-react"

// --- Componente para a visualização gráfica (gauge) ---
const DataGauge = ({
  label,
  value,
  unit,
  min,
  max,
  colorClass,
  icon,
}: {
  label: string
  value: number
  unit: string
  min: number
  max: number
  colorClass: string
  icon: React.ReactNode // Prop para o ícone
}) => {
    // Garante que o valor não seja nulo ou indefinido antes de usar
    const validValue = value ?? 0;
    const percentage = Math.max(0, Math.min(100, ((validValue - min) / (max - min)) * 100))

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1 text-sm">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="font-medium text-muted-foreground">{label}</span>
        </div>
        <span className="font-bold">
          {validValue.toFixed(1)} {unit}
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
    Temperatura: "28",
    Umidade: "85",
    CO2: "900",
    CO: "2.5",
    Pressao_Atm: "1010",
    NO2: "80",
    SO2: "55",
    O3: "150",
  })
  const [locationData, setLocationData] = useState({
    cidade: "",
    pais: "Brasil",
  })

  // --- Função de chamada à API por localização (INTOCADA) ---
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
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Erro na comunicação com o servidor: ${response.statusText}`)
      }

      const result = await response.json()
      setPredictionResult(result)
    } catch (err: any) {
      console.error("Falha ao buscar predição:", err)
      setError(
        err.message || "Não foi possível obter os dados. Verifique a cidade e tente novamente."
      )
    } finally {
      setIsLoading(false)
    }
  }

  // --- Função de predição com dados manuais via API (CORRIGIDA) ---
  const handleManualPrediction = async () => {
    const isInvalid = Object.values(manualData).some((value) => value === "" || isNaN(parseFloat(value)))
    if (isInvalid) {
      setError("Por favor, preencha todos os campos com valores numéricos.")
      return
    }

    setIsLoading(true)
    setError(null)
    setPredictionResult(null)

    // Converte os dados manuais para números
    const payload = Object.fromEntries(
      Object.entries(manualData).map(([key, value]) => [key, parseFloat(value)])
    )

    try {
      const response = await fetch("https://web-production-b320.up.railway.app/predict/variaveis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Erro na comunicação com o servidor: ${response.statusText}`)
      }

      const apiResult = await response.json()

      // Monta o objeto de resultado em um formato compatível com a interface
      const finalResult = {
        cidade: "Dados Manuais", // Rótulo para a interface
        qualidade_do_ar: apiResult.qualidade_do_ar, // Objeto vindo diretamente da API
        riscos_ambientais: apiResult.riscos_ambientais, // Objeto vindo diretamente da API
        
        // Adiciona as variáveis utilizadas para serem exibidas no novo card
        variaveis_utilizadas: apiResult.variaveis_utilizadas,

        // Mapeia os dados necessários para os componentes de 'Métricas' existentes
        dados_meteorologicos: {
            temperatura: apiResult.variaveis_utilizadas.Temperatura,
            umidade: apiResult.variaveis_utilizadas.Umidade,
            pressao: apiResult.variaveis_utilizadas.Pressao_Atm,
        },
        // Garante que não haverá 'dados_poluicao' para não renderizar o card errado
        dados_poluicao: null, 
      }

      setPredictionResult(finalResult)
    } catch (err: any) {
      console.error("Falha ao buscar predição manual:", err)
      setError("Não foi possível obter a predição. Verifique os valores e tente novamente.")
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
      case "excelente":
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

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setManualData({ ...manualData, [id]: value })
  }
  
  // Lista de poluentes a serem exibidos no card de "Valores obtidos"
  const poluentesVisiveis = ['CO2', 'CO', 'NO2', 'SO2', 'O3'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* --- Cabeçalho --- */}
        <div className="text-center mb-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              Predição de Qualidade do Ar
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Utilize nossa IA para analisar dados atmosféricos em tempo real por localização ou insira os
              dados manualmente.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* --- Seção de Entrada de Dados com Abas --- */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg p-6">
              <CardTitle className="flex items-center space-x-3 text-2xl font-bold text-blue-800">
                <FileDigit className="h-8 w-8 text-blue-600" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Entrada de Dados
                </span>
              </CardTitle>
              <p className="text-sm text-blue-700 mt-2">
                Escolha entre consultar dados automáticos por localização ou inserir manualmente.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="location" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg mb-4">
                  <TabsTrigger value="location" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all">
                    Por Localização
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all">
                    Dados Manuais
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="location" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input id="cidade" placeholder="Ex: Blumenau" value={locationData.cidade} onChange={(e) => setLocationData({ ...locationData, cidade: e.target.value })}/>
                    </div>
                    <div>
                      <Label htmlFor="pais">País</Label>
                      <Select value={locationData.pais} onValueChange={(value) => setLocationData({ ...locationData, pais: value })}>
                        <SelectTrigger><SelectValue placeholder="Selecione o país" /></SelectTrigger>
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
                      {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Consultando...</>) : ("Analisar por Localização")}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="manual" className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                      <Label htmlFor="Temperatura">Temperatura (°C)</Label>
                      <Input id="Temperatura" type="number" value={manualData.Temperatura} onChange={handleManualInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="Umidade">Umidade (%)</Label>
                      <Input id="Umidade" type="number" value={manualData.Umidade} onChange={handleManualInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="CO2">CO₂ (ppm)</Label>
                      <Input id="CO2" type="number" value={manualData.CO2} onChange={handleManualInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="CO">CO (mg/m³)</Label>
                      <Input id="CO" type="number" value={manualData.CO} onChange={handleManualInputChange} />
                    </div>
                     <div>
                      <Label htmlFor="NO2">NO₂ (µg/m³)</Label>
                      <Input id="NO2" type="number" value={manualData.NO2} onChange={handleManualInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="Pressao_Atm">Pressão (hPa)</Label>
                      <Input id="Pressao_Atm" type="number" value={manualData.Pressao_Atm} onChange={handleManualInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="SO2">SO₂ (µg/m³)</Label>
                      <Input id="SO2" type="number" value={manualData.SO2} onChange={handleManualInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="O3">O₃ (µg/m³)</Label>
                      <Input id="O3" type="number" value={manualData.O3} onChange={handleManualInputChange} />
                    </div>
                  </div>
                  <Button onClick={handleManualPrediction} className="w-full mt-4" disabled={isLoading}>
                    {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analisando...</>) : ("Analisar com Dados Manuais")}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* --- Seção de Resultados --- */}
          <div className="border-2 shadow-lg rounded-lg p-6 bg-white">
            {isLoading && (
              <div className="p-8 flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Analisando dados... Por favor, aguarde.
                  </p>
              </div>
            )}

            {!isLoading && error && (
              <div className="p-6 flex items-center space-x-4">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div>
                    <h3 className="font-bold text-red-700">Ocorreu um Erro</h3>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
              </div>
            )}
            
            {!isLoading && !error && predictionResult && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Resultados para <span className="text-blue-600">{predictionResult.cidade}</span>
                </h2>

                {/* Qualidade do Ar e Recomendação */}
                <Card className="border-2 shadow-lg">
                   <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Wind className="mr-2 h-6 w-6 text-blue-500" />
                      Qualidade do Ar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <Badge className={`px-6 py-2 text-2xl font-bold rounded-full ${getQualityColor(predictionResult.qualidade_do_ar?.descricao)}`}>
                      {predictionResult.qualidade_do_ar?.descricao}
                    </Badge>
                     <div className="flex items-start space-x-3 text-center bg-gray-100 p-4 rounded-lg">
                        <Info className="h-5 w-5 text-gray-500 flex-shrink-0 mt-1" />
                        <p className="text-sm text-muted-foreground">
                            {predictionResult.qualidade_do_ar?.recomendacao}
                        </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Métricas Meteorológicas */}
                <Card className="border-2 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Brain className="mr-2 h-6 w-6 text-blue-500" />
                      Métricas Meteorológicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <DataGauge
                      label="Temperatura"
                      value={predictionResult.dados_meteorologicos?.temperatura}
                      unit="°C" min={-10} max={40}
                      colorClass="bg-red-500"
                      icon={<Thermometer className="h-5 w-5 text-red-500" />}
                    />
                    <DataGauge
                      label="Umidade"
                      value={predictionResult.dados_meteorologicos?.umidade}
                      unit="%" min={0} max={100}
                      colorClass="bg-blue-500"
                      icon={<Droplets className="h-5 w-5 text-blue-500" />}
                    />
                    <DataGauge
                      label="Pressão"
                      value={predictionResult.dados_meteorologicos?.pressao}
                      unit="hPa" min={950} max={1050}
                      colorClass="bg-gray-500"
                      icon={<Gauge className="h-5 w-5 text-gray-500" />}
                    />
                  </CardContent>
                </Card>

                {/* Riscos Ambientais */}
                <Card className="border-2 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />
                      Probabilidade de Riscos Ambientais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-md">
                      <div className="flex items-center">
                        <CloudRain className="mr-3 h-6 w-6 text-blue-400" />
                        <span className="font-medium">Chuva Ácida</span>
                      </div>
                      <Badge className={`px-3 py-1 text-sm ${getRiskColor(predictionResult.riscos_ambientais?.chuva_acida)}`}>
                        {predictionResult.riscos_ambientais?.chuva_acida}
                      </Badge>
                    </div>
                     <div className="flex justify-between items-center p-2 rounded-md">
                      <div className="flex items-center">
                        <Skull className="mr-3 h-6 w-6 text-gray-600" />
                        <span className="font-medium">Fumaça Tóxica</span>
                      </div>
                      <Badge className={`px-3 py-1 text-sm ${getRiskColor(predictionResult.riscos_ambientais?.smog_fumaça_toxica)}`}>
                        {predictionResult.riscos_ambientais?.smog_fumaça_toxica}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-md">
                      <div className="flex items-center">
                         <Thermometer className="mr-3 h-6 w-6 text-red-400" />
                        <span className="font-medium">Efeito Estufa</span>
                      </div>
                      <Badge className={`px-3 py-1 text-sm ${getRiskColor(predictionResult.riscos_ambientais?.efeito_estufa)}`}>
                        {predictionResult.riscos_ambientais?.efeito_estufa}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Card para exibir AS VARIÁVEIS DE POLUENTES da entrada manual */}
                {predictionResult.variaveis_utilizadas && (
                  <Card className="border-2 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <Beaker className="mr-2 h-6 w-6 text-indigo-500" />
                        Valores obtidos para análise
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-y-3 text-sm pt-4">
                      {Object.entries(predictionResult.variaveis_utilizadas)
                        .filter(([key]) => poluentesVisiveis.includes(key)) // <--- FILTRO ADICIONADO AQUI
                        .map(([key, value]) => {
                          // Define a unidade de medida para cada variável
                          let unit = '';
                          if (key === 'CO2') unit = 'ppm';
                          if (key === 'CO') unit = 'mg/m³';
                          if (['NO2', 'SO2', 'O3'].includes(key)) unit = 'µg/m³';
                          
                          return (
                            <div key={key} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                              <strong>{key.replace('_Atm', '')}:</strong> 
                              <span>{Number(value).toFixed(2)} <span className="text-gray-500">{unit}</span></span>
                            </div>
                          )
                        })}
                    </CardContent>
                  </Card>
                )}

                {/* Detalhes da Localização (se disponível) */}
                {predictionResult.coordenadas && (
                     <Card className="border-2 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <MapPin className="mr-2 h-6 w-6 text-green-500" />
                                Detalhes da Localização
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                             <p><strong>Cidade:</strong> {predictionResult.cidade}</p>
                             <p><strong>País:</strong> {predictionResult.pais}</p>
                             <p><strong>Coordenadas:</strong> Latitude {predictionResult.coordenadas.lat}, Longitude {predictionResult.coordenadas.lon}</p>
                        </CardContent>
                    </Card>
                )}

              </div>
            )}

            {!isLoading && !error && !predictionResult && (
                <div className="text-center p-8 flex flex-col justify-center items-center h-full">
                    <Wind className="mx-auto h-16 w-16 text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Aguardando consulta</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Os resultados da sua análise aparecerão aqui.
                    </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}