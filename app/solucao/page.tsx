// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Thermometer,
//   Wind,
//   Brain,
//   CloudRain,
//   Skull,
//   Loader2,
//   AlertTriangle,
//   FileDigit,
//   Droplets, // Ícone para Umidade
//   Gauge, // Ícone para Pressão
// } from "lucide-react"

// // --- Componente para a visualização gráfica (atualizado com ícone) ---
// const DataGauge = ({
//   label,
//   value,
//   unit,
//   min,
//   max,
//   colorClass,
//   icon,
// }: {
//   label: string
//   value: number
//   unit: string
//   min: number
//   max: number
//   colorClass: string
//   icon: React.ReactNode // Prop para o ícone
// }) => {
//   const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))

//   return (
//     <div className="w-full">
//       <div className="flex justify-between items-center mb-1 text-sm">
//         <div className="flex items-center space-x-2">
//           {icon}
//           <span className="font-medium text-muted-foreground">{label}</span>
//         </div>
//         <span className="font-bold">
//           {value.toFixed(1)} {unit}
//         </span>
//       </div>
//       <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
//         <div className={`h-3 rounded-full ${colorClass}`} style={{ width: `${percentage}%` }} />
//       </div>
//     </div>
//   )
// }

// export default function SolucaoPage() {
//   // --- Estados ---
//   const [predictionResult, setPredictionResult] = useState<any>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [manualData, setManualData] = useState({
//     Temperatura: "28",
//     Umidade: "85",
//     CO2: "900",
//     CO: "2.5",
//     Pressao_Atm: "1010",
//     NO2: "80",
//     SO2: "55",
//     O3: "150",
//   })
//   const [locationData, setLocationData] = useState({
//     cidade: "",
//     pais: "Brasil",
//   })

//   // --- Função de chamada à API por localização ---
//   const handleLocationPrediction = async () => {
//     if (!locationData.cidade || !locationData.pais) {
//       setError("Por favor, preencha a cidade e o país.")
//       return
//     }
//     setIsLoading(true)
//     setError(null)
//     setPredictionResult(null)

//     try {
//       const response = await fetch("https://web-production-b320.up.railway.app/predict/local", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           cidade: locationData.cidade,
//           pais: locationData.pais,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error(`Erro na comunicação com o servidor: ${response.statusText}`)
//       }

//       const result = await response.json()
//       setPredictionResult(result)
//     } catch (err: any) {
//       console.error("Falha ao buscar predição:", err)
//       setError(
//         "Não foi possível obter os dados. Verifique a cidade e tente novamente. (A API pode não ter dados para o local exato)"
//       )
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // --- Função de predição com dados manuais via API ---
//   const handleManualPrediction = async () => {
//     const isInvalid = Object.values(manualData).some((value) => value === "" || isNaN(parseFloat(value)))
//     if (isInvalid) {
//       setError("Por favor, preencha todos os campos com valores numéricos.")
//       return
//     }

//     setIsLoading(true)
//     setError(null)
//     setPredictionResult(null)

//     // Converte os dados manuais para números
//     const payload = Object.fromEntries(
//       Object.entries(manualData).map(([key, value]) => [key, parseFloat(value)])
//     )

//     try {
//       const response = await fetch("https://web-production-b320.up.railway.app/predict/variaveis", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       })

//       if (!response.ok) {
//         throw new Error(`Erro na comunicação com o servidor: ${response.statusText}`)
//       }

//       const apiResult = await response.json()

//       // Função para mapear a probabilidade para o risco
//       const mapProbaToRisk = (value: number) => {
//         if (value < 1) return "Baixo"
//         if (value >= 1 && value <= 2) return "Moderado"
//         return "Alto"
//       }

//       // Monta o objeto de resultado no formato esperado pela interface
//       const finalResult = {
//         cidade: "Dados Manuais",
//         features_usadas: payload, // Necessário para o render condicional
//         qualidade_ambiental: {
//           prediction: apiResult.prediction,
//           label: apiResult.label,
//         },
//         risco_chuva_acida: mapProbaToRisk(apiResult.proba[0]),
//         fumaca_toxica: mapProbaToRisk(apiResult.proba[1]),
//         risco_efeito_estufa: mapProbaToRisk(apiResult.proba[2]),
//       }

//       setPredictionResult(finalResult)
//     } catch (err: any) {
//       console.error("Falha ao buscar predição manual:", err)
//       setError("Não foi possível obter a predição. Verifique os valores e tente novamente.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // --- Funções de estilo ---
//   const getRiskColor = (risco: string) => {
//     if (!risco) return "text-gray-600 bg-gray-100"
//     switch (risco.toLowerCase()) {
//       case "baixo":
//         return "text-green-600 bg-green-100"
//       case "moderado":
//         return "text-yellow-600 bg-yellow-100"
//       case "alto":
//         return "text-red-600 bg-red-100"
//       default:
//         return "text-gray-600 bg-gray-100"
//     }
//   }

//   const getQualityColor = (qualidade: string) => {
//     if (!qualidade) return "text-gray-600 bg-gray-100"
//     switch (qualidade.toLowerCase()) {
//       case "excelente":
//       case "boa":
//         return "text-green-600 bg-green-100"
//       case "moderada":
//         return "text-yellow-600 bg-yellow-100"
//       case "ruim":
//         return "text-orange-600 bg-orange-100"
//       case "muito ruim":
//       case "péssima":
//         return "text-red-600 bg-red-100"
//       default:
//         return "text-gray-600 bg-gray-100"
//     }
//   }

//   const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target
//     setManualData({ ...manualData, [id]: value })
//   }

//   return (
//     <div className="min-h-screen py-12 px-4">
//       <div className="container mx-auto max-w-6xl">
//         {/* --- Cabeçalho --- */}
//         <div className="text-center mb-12">
//           <div className="space-y-4">
//             <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent">
//               Predição de Qualidade do Ar
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//               Utilize nossa IA para analisar dados atmosféricos em tempo real por localização ou insira os
//               dados manualmente.
//             </p>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* --- Seção de Entrada de Dados com Abas --- */}
//           <Card className="border-2 shadow-lg">
//             <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg p-6">
//               <CardTitle className="flex items-center space-x-3 text-2xl font-bold text-blue-800">
//                 <FileDigit className="h-8 w-8 text-blue-600" />
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//                   Entrada de Dados
//                 </span>
//               </CardTitle>
//               <p className="text-sm text-blue-700 mt-2">
//                 Escolha entre consultar dados automáticos por localização ou inserir manualmente.
//               </p>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <Tabs defaultValue="location" className="w-full">
//                 <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg mb-4">
//                   <TabsTrigger value="location" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all">
//                     Por Localização
//                   </TabsTrigger>
//                   <TabsTrigger value="manual" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all">
//                     Dados Manuais
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="location" className="pt-4">
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="cidade">Cidade</Label>
//                       <Input id="cidade" placeholder="Ex: Blumenau" value={locationData.cidade} onChange={(e) => setLocationData({ ...locationData, cidade: e.target.value })}/>
//                     </div>
//                     <div>
//                       <Label htmlFor="pais">País</Label>
//                       <Select value={locationData.pais} onValueChange={(value) => setLocationData({ ...locationData, pais: value })}>
//                         <SelectTrigger><SelectValue placeholder="Selecione o país" /></SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Brasil">Brasil</SelectItem>
//                           <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
//                           <SelectItem value="Reino Unido">Reino Unido</SelectItem>
//                           <SelectItem value="Alemanha">Alemanha</SelectItem>
//                           <SelectItem value="França">França</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <Button onClick={handleLocationPrediction} className="w-full" disabled={isLoading}>
//                       {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Consultando...</>) : ("Analisar por Localização")}
//                     </Button>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="manual" className="pt-4">
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                        <div>
//                         <Label htmlFor="Temperatura">Temperatura (°C)</Label>
//                         <Input id="Temperatura" type="number" value={manualData.Temperatura} onChange={handleManualInputChange} />
//                       </div>
//                       <div>
//                         <Label htmlFor="Umidade">Umidade (%)</Label>
//                         <Input id="Umidade" type="number" value={manualData.Umidade} onChange={handleManualInputChange} />
//                       </div>
//                       <div>
//                         <Label htmlFor="CO2">CO₂ (ppm)</Label>
//                         <Input id="CO2" type="number" value={manualData.CO2} onChange={handleManualInputChange} />
//                       </div>
//                       <div>
//                         <Label htmlFor="CO">CO (mg/m³)</Label>
//                         <Input id="CO" type="number" value={manualData.CO} onChange={handleManualInputChange} />
//                       </div>
//                        <div>
//                         <Label htmlFor="NO2">NO₂ (µg/m³)</Label>
//                         <Input id="NO2" type="number" value={manualData.NO2} onChange={handleManualInputChange} />
//                       </div>
//                       <div>
//                         <Label htmlFor="SO2">SO₂ (µg/m³)</Label>
//                         <Input id="SO2" type="number" value={manualData.SO2} onChange={handleManualInputChange} />
//                       </div>
//                       <div>
//                         <Label htmlFor="O3">O₃ (µg/m³)</Label>
//                         <Input id="O3" type="number" value={manualData.O3} onChange={handleManualInputChange} />
//                       </div>
//                       <div>
//                         <Label htmlFor="Pressao_Atm">Pressão (hPa)</Label>
//                         <Input id="Pressao_Atm" type="number" value={manualData.Pressao_Atm} onChange={handleManualInputChange} />
//                       </div>
//                     </div>
//                     <Button onClick={handleManualPrediction} className="w-full" disabled={isLoading}>
//                       {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analisando...</>) : ("Analisar Dados Manuais")}
//                     </Button>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>

//           {/* --- Seção de Resultados --- */}
//           <Card className="border-2">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <Brain className="h-6 w-6 text-primary" />
//                 <span>Resultado da Análise</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               {isLoading && (<div className="text-center py-12 text-muted-foreground"><Loader2 className="h-16 w-16 mx-auto mb-4 animate-spin opacity-50" /><p>Buscando e processando dados...</p></div>)}
//               {error && (<div className="text-center py-12 text-red-600 bg-red-50 p-4 rounded-lg"><AlertTriangle className="h-12 w-12 mx-auto mb-4" /><p className="font-semibold">Ocorreu um Erro</p><p className="text-sm">{error}</p></div>)}
//               {!isLoading && !error && !predictionResult && (<div className="text-center py-12 text-muted-foreground"><Wind className="h-16 w-16 mx-auto mb-4 opacity-50" /><p>Insira os dados para obter a análise da qualidade do ar.</p></div>)}
              
//               {predictionResult && predictionResult.features_usadas && (
//                 <div className="space-y-6">
//                   {/* Bloco de Qualidade do Ar (sempre exibido) */}
//                   <div className="text-center p-4 bg-muted/50 rounded-lg">
//                     <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
//                       Qualidade do Ar para{" "}
//                       {predictionResult.cidade === "Dados Manuais"
//                         ? "Análise Manual"
//                         : predictionResult.cidade}
//                     </h3>
//                     <Badge className={`text-xl px-6 py-2 mt-2 ${getQualityColor(predictionResult.qualidade_ambiental?.label)}`}>
//                       {predictionResult.qualidade_ambiental?.label || "Indisponível"}
//                     </Badge>
//                   </div>

//                   {/* ATUALIZADO: Bloco de Medidores (Temperatura, etc.) SÓ APARECE para consulta por localidade */}
//                   {predictionResult.cidade !== "Dados Manuais" && (
//                     <div className="space-y-4">
//                       <DataGauge
//                         label="Temperatura"
//                         icon={<Thermometer className="h-4 w-4 text-red-500" />}
//                         value={predictionResult.features_usadas.Temperatura}
//                         unit="°C" min={-10} max={40}
//                         colorClass="bg-gradient-to-r from-yellow-400 to-red-500"
//                       />
//                       <DataGauge
//                         label="Umidade"
//                         icon={<Droplets className="h-4 w-4 text-blue-500" />}
//                         value={predictionResult.features_usadas.Umidade}
//                         unit="%" min={0} max={100}
//                         colorClass="bg-gradient-to-r from-cyan-400 to-blue-500"
//                       />
//                       <DataGauge
//                         label="Pressão"
//                         icon={<Gauge className="h-4 w-4 text-gray-500" />}
//                         value={predictionResult.features_usadas.Pressao_Atm}
//                         unit="hPa" min={980} max={1050}
//                         colorClass="bg-gradient-to-r from-gray-400 to-gray-600"
//                       />
//                     </div>
//                   )}

//                   {/* Bloco de Análise de Riscos (sempre exibido) */}
//                   <div>
//                     <h4 className="font-semibold mb-3 text-center">Análise de Riscos</h4>
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg">
//                         <div className="flex items-center space-x-3"><CloudRain className="h-5 w-5 text-blue-500" /><span className="font-medium">Chuva Ácida</span></div>
//                         <Badge className={getRiskColor(predictionResult.risco_chuva_acida)}>{predictionResult.risco_chuva_acida}</Badge>
//                       </div>
//                       <div className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg">
//                         <div className="flex items-center space-x-3"><Skull className="h-5 w-5 text-gray-600" /><span className="font-medium">Fumaça Tóxica</span></div>
//                         <Badge className={getRiskColor(predictionResult.fumaca_toxica)}>{predictionResult.fumaca_toxica}</Badge>
//                       </div>
//                       <div className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg">
//                         <div className="flex items-center space-x-3"><Thermometer className="h-5 w-5 text-orange-500" /><span className="font-medium">Efeito Estufa</span></div>
//                         <Badge className={getRiskColor(predictionResult.risco_efeito_estufa)}>{predictionResult.risco_efeito_estufa}</Badge>
//                       </div>
//                     </div>
//                   </div>

//                   {/* ATUALIZADO: Bloco de Dados Coletados SÓ APARECE para consulta por localidade */}
//                   {predictionResult.cidade !== "Dados Manuais" && (
//                     <div>
//                       <h4 className="font-semibold mb-3 text-center">Dados Coletados</h4>
//                       <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
//                         <p><strong>CO₂:</strong> {predictionResult.features_usadas.CO2.toFixed(1)} ppm</p>
//                         <p><strong>CO:</strong> {predictionResult.features_usadas.CO.toFixed(3)} mg/m³</p>
//                         <p><strong>NO₂:</strong> {predictionResult.features_usadas.NO2.toFixed(3)} µg/m³</p>
//                         <p><strong>SO₂:</strong> {predictionResult.features_usadas.SO2.toFixed(3)} µg/m³</p>
//                         <p><strong>O₃:</strong> {predictionResult.features_usadas.O3.toFixed(3)} µg/m³</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

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
  Droplets, // Ícone para Umidade
  Gauge, // Ícone para Pressão
} from "lucide-react"

// --- Componente para a visualização gráfica (atualizado com ícone) ---
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
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1 text-sm">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="font-medium text-muted-foreground">{label}</span>
        </div>
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

  // --- Função de predição com dados manuais via API ---
  const handleManualPrediction = async () => {
    const isInvalid = Object.values(manualData).some(
      (value) => value === "" || isNaN(parseFloat(value))
    )
    if (isInvalid) {
      setError("Por favor, preencha todos os campos com valores numéricos.")
      return
    }

    setIsLoading(true)
    setError(null)
    setPredictionResult(null)

    // Converte os dados manuais para números
    const numericData = Object.fromEntries(
      Object.entries(manualData).map(([key, value]) => [key, parseFloat(value)])
    )

    // O payload é ajustado para o formato que a API espera: { "features": { ... } }
    const payload = {
      features: numericData,
    }

    try {
      const response = await fetch(
        "https://projetoqualidadeambientalfinal-production.up.railway.app/predict-features",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) {
        throw new Error(`Erro na comunicação com o servidor: ${response.statusText}`)
      }

      const apiResult = await response.json()

      // A resposta da API é processada para o formato que a UI já usa
      const mapSimNaoToRisk = (value: string) => {
        if (value.toLowerCase() === "sim") return "Alto"
        if (value.toLowerCase() === "não") return "Baixo"
        return "Indisponível"
      }

      // Monta o objeto de resultado no formato esperado pela interface
      const finalResult = {
        cidade: "Dados Manuais",
        features_usadas: numericData,
        qualidade_ambiental: {
          prediction: null,
          label: apiResult.prediction.Qualidade_Ambiental,
        },
        risco_chuva_acida: mapSimNaoToRisk(apiResult.prediction.Risco_Chuva_Acida),
        fumaca_toxica: mapSimNaoToRisk(apiResult.prediction.Risco_Smog_Fotoquimico),
        risco_efeito_estufa: mapSimNaoToRisk(apiResult.prediction.Risco_Efeito_Estufa),
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
              Utilize nossa IA para analisar dados atmosféricos em tempo real por localização ou insira os
              dados manualmente.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
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
                  <div className="space-y-4">
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
                        <Label htmlFor="SO2">SO₂ (µg/m³)</Label>
                        <Input id="SO2" type="number" value={manualData.SO2} onChange={handleManualInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="O3">O₃ (µg/m³)</Label>
                        <Input id="O3" type="number" value={manualData.O3} onChange={handleManualInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="Pressao_Atm">Pressão (hPa)</Label>
                        <Input id="Pressao_Atm" type="number" value={manualData.Pressao_Atm} onChange={handleManualInputChange} />
                      </div>
                    </div>
                    <Button onClick={handleManualPrediction} className="w-full" disabled={isLoading}>
                      {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analisando...</>) : ("Analisar Dados Manuais")}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
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
              {isLoading && (<div className="text-center py-12 text-muted-foreground"><Loader2 className="h-16 w-16 mx-auto mb-4 animate-spin opacity-50" /><p>Buscando e processando dados...</p></div>)}
              {error && (<div className="text-center py-12 text-red-600 bg-red-50 p-4 rounded-lg"><AlertTriangle className="h-12 w-12 mx-auto mb-4" /><p className="font-semibold">Ocorreu um Erro</p><p className="text-sm">{error}</p></div>)}
              {!isLoading && !error && !predictionResult && (<div className="text-center py-12 text-muted-foreground"><Wind className="h-16 w-16 mx-auto mb-4 opacity-50" /><p>Insira os dados para obter a análise da qualidade do ar.</p></div>)}
              
              {predictionResult && predictionResult.features_usadas && (
                <div className="space-y-6">
                  {/* Bloco de Qualidade do Ar (sempre exibido) */}
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Qualidade do Ar para{" "}
                      {predictionResult.cidade === "Dados Manuais"
                        ? "Análise Manual"
                        : predictionResult.cidade}
                    </h3>
                    <Badge className={`text-xl px-6 py-2 mt-2 ${getQualityColor(predictionResult.qualidade_ambiental?.label)}`}>
                      {predictionResult.qualidade_ambiental?.label || "Indisponível"}
                    </Badge>
                  </div>

                  {/* ATUALIZADO: Bloco de Medidores (Temperatura, etc.) SÓ APARECE para consulta por localidade */}
                  {predictionResult.cidade !== "Dados Manuais" && (
                    <div className="space-y-4">
                      <DataGauge
                        label="Temperatura"
                        icon={<Thermometer className="h-4 w-4 text-red-500" />}
                        value={predictionResult.features_usadas.Temperatura}
                        unit="°C" min={-10} max={40}
                        colorClass="bg-gradient-to-r from-yellow-400 to-red-500"
                      />
                      <DataGauge
                        label="Umidade"
                        icon={<Droplets className="h-4 w-4 text-blue-500" />}
                        value={predictionResult.features_usadas.Umidade}
                        unit="%" min={0} max={100}
                        colorClass="bg-gradient-to-r from-cyan-400 to-blue-500"
                      />
                      <DataGauge
                        label="Pressão"
                        icon={<Gauge className="h-4 w-4 text-gray-500" />}
                        value={predictionResult.features_usadas.Pressao_Atm}
                        unit="hPa" min={980} max={1050}
                        colorClass="bg-gradient-to-r from-gray-400 to-gray-600"
                      />
                    </div>
                  )}

                  {/* Bloco de Análise de Riscos (sempre exibido) */}
                  <div>
                    <h4 className="font-semibold mb-3 text-center">Análise de Riscos</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3"><CloudRain className="h-5 w-5 text-blue-500" /><span className="font-medium">Chuva Ácida</span></div>
                        <Badge className={getRiskColor(predictionResult.risco_chuva_acida)}>{predictionResult.risco_chuva_acida}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3"><Skull className="h-5 w-5 text-gray-600" /><span className="font-medium">Fumaça Tóxica</span></div>
                        <Badge className={getRiskColor(predictionResult.fumaca_toxica)}>{predictionResult.fumaca_toxica}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3"><Thermometer className="h-5 w-5 text-orange-500" /><span className="font-medium">Efeito Estufa</span></div>
                        <Badge className={getRiskColor(predictionResult.risco_efeito_estufa)}>{predictionResult.risco_efeito_estufa}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* ATUALIZADO: Bloco de Dados Coletados SÓ APARECE para consulta por localidade */}
                  {predictionResult.cidade !== "Dados Manuais" && (
                    <div>
                      <h4 className="font-semibold mb-3 text-center">Dados Coletados</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <p><strong>CO₂:</strong> {predictionResult.features_usadas.CO2.toFixed(1)} ppm</p>
                        <p><strong>CO:</strong> {predictionResult.features_usadas.CO.toFixed(3)} mg/m³</p>
                        <p><strong>NO₂:</strong> {predictionResult.features_usadas.NO2.toFixed(3)} µg/m³</p>
                        <p><strong>SO₂:</strong> {predictionResult.features_usadas.SO2.toFixed(3)} µg/m³</p>
                        <p><strong>O₃:</strong> {predictionResult.features_usadas.O3.toFixed(3)} µg/m³</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
