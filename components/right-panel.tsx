"use client"

import { X, Download, BarChart3, Trash2, MapPin, ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect, useMemo } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface RightPanelProps {
  isOpen: boolean
  onClose: () => void
  selectedRegion: string | null
  pinnedRegions: string[]
  timeRange: string
  loadType: string
  onRegionSelect: (region: string) => void
  onRegionUnpin: (region: string) => void
  onRegionPin: (region: string) => void
  onDeselectAll: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

// Mock data for charts
const generateLoadData = (regions: string[], timeRange: string) => {
  const hours = timeRange === "Daily" ? 24 : 7 * 24
  const interval = timeRange === "Daily" ? 1 : 6
  const data = []

  for (let i = 0; i < hours; i += interval) {
    const time = timeRange === "Daily" ? `${i}:00` : `Day ${Math.floor(i / 24) + 1}, ${i % 24}:00`

    const entry: any = { time }

    regions.forEach((region) => {
      // Base value that's consistent for each region but varies over time
      const baseValue =
        {
          Nigeria: 180,
          Ghana: 240,
          Benin: 150,
          Togo: 130,
          Niger: 95,
        }[region] || 100

      // Add some variation
      const variation = Math.sin((i / (timeRange === "Daily" ? 24 : 168)) * Math.PI * 2) * 0.3 + 0.7
      entry[region] = Math.round(baseValue * variation)
    })

    data.push(entry)
  }

  return data
}

const sectorData = {
  Nigeria: [
    { name: "Residential", value: 45 },
    { name: "Commercial", value: 35 },
    { name: "Industrial", value: 20 },
  ],
  Ghana: [
    { name: "Residential", value: 40 },
    { name: "Commercial", value: 30 },
    { name: "Industrial", value: 30 },
  ],
  Benin: [
    { name: "Residential", value: 55 },
    { name: "Commercial", value: 25 },
    { name: "Industrial", value: 20 },
  ],
  Togo: [
    { name: "Residential", value: 60 },
    { name: "Commercial", value: 25 },
    { name: "Industrial", value: 15 },
  ],
  Niger: [
    { name: "Residential", value: 65 },
    { name: "Commercial", value: 20 },
    { name: "Industrial", value: 15 },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function RightPanel({
  isOpen,
  onClose,
  selectedRegion,
  pinnedRegions,
  timeRange,
  loadType,
  onRegionSelect,
  onRegionUnpin,
  onRegionPin,
  onDeselectAll,
  activeTab,
  onTabChange,
}: RightPanelProps) {
  const [chartUnit, setChartUnit] = useState("MW")
  const [viewMode, setViewMode] = useState("chart")
  const [exportScope, setExportScope] = useState("selected")
  const [exportFormat, setExportFormat] = useState("csv")
  const [loadData, setLoadData] = useState<any[]>([])
  const [singleRegionSectorData, setSingleRegionSectorData] = useState<any[]>([])
  const [stackedSectorData, setStackedSectorData] = useState<any[]>([])

  // Get regions to analyze based on active tab
  const regionsToAnalyze = useMemo(() => {
    if (activeTab === "single") {
      return selectedRegion ? [selectedRegion] : []
    } else {
      return pinnedRegions
    }
  }, [activeTab, selectedRegion, pinnedRegions])

  // Create a stable string representation of the regions for dependency tracking
  const regionsKey = useMemo(() => {
    return regionsToAnalyze.sort().join(",")
  }, [regionsToAnalyze])

  useEffect(() => {
    // Generate load data when regions or time range changes
    if (regionsToAnalyze.length > 0) {
      const newLoadData = generateLoadData(regionsToAnalyze, timeRange)
      setLoadData(newLoadData)

      // For single region analysis - simple sector data
      if (activeTab === "single" && selectedRegion) {
        const regionData = sectorData[selectedRegion as keyof typeof sectorData] || []
        setSingleRegionSectorData(regionData)
      }

      // For comparison - create stacked bar chart data
      if (activeTab === "comparison" && pinnedRegions.length > 0) {
        const stackedData = [
          {
            name: "Residential",
            ...pinnedRegions.reduce(
              (acc, region) => {
                const data = sectorData[region as keyof typeof sectorData] || []
                const residential = data.find((d) => d.name === "Residential")?.value || 0
                acc[region] = residential
                return acc
              },
              {} as Record<string, number>,
            ),
          },
          {
            name: "Commercial",
            ...pinnedRegions.reduce(
              (acc, region) => {
                const data = sectorData[region as keyof typeof sectorData] || []
                const commercial = data.find((d) => d.name === "Commercial")?.value || 0
                acc[region] = commercial
                return acc
              },
              {} as Record<string, number>,
            ),
          },
          {
            name: "Industrial",
            ...pinnedRegions.reduce(
              (acc, region) => {
                const data = sectorData[region as keyof typeof sectorData] || []
                const industrial = data.find((d) => d.name === "Industrial")?.value || 0
                acc[region] = industrial
                return acc
              },
              {} as Record<string, number>,
            ),
          },
        ]
        setStackedSectorData(stackedData)
      }
    } else {
      setLoadData([])
      setSingleRegionSectorData([])
      setStackedSectorData([])
    }
  }, [regionsKey, timeRange, activeTab, selectedRegion, pinnedRegions])

  const handleRegionClick = (region: string) => {
    onRegionSelect(region)
    onTabChange("single")
  }

  const handleRegionRemove = (region: string) => {
    onRegionUnpin(region)
  }

  const handleAddToComparison = () => {
    if (selectedRegion && !pinnedRegions.includes(selectedRegion)) {
      onRegionPin(selectedRegion)
      onTabChange("comparison")
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`w-[500px] bg-gray-50 border-l border-gray-200 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header - Reduced padding */}
      <div className="p-3 border-b border-gray-200 h-[65px] flex items-center justify-between">
        <h2 className="text-lg font-semibold">Detailed Analysis</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Tabs for Single Analysis vs Comparison */}
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single" className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>Region Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center space-x-1">
              <ArrowLeftRight className="h-3 w-3" />
              <span>Comparison</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-3 mt-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Currently Selected</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRegion ? (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      Analyzing: <span className="font-medium text-gray-900">{selectedRegion}</span>
                    </div>
                    {!pinnedRegions.includes(selectedRegion) && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-600 border-gray-200 transition-colors duration-200"
                        onClick={handleAddToComparison}
                      >
                        Add to Comparison
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No region selected</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-3 mt-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Currently Pinned ({pinnedRegions.length}/7)</CardTitle>
                  {pinnedRegions.length > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-600 border-gray-200 transition-colors duration-200"
                      onClick={onDeselectAll}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Deselect All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {pinnedRegions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {pinnedRegions.map((region) => (
                      <Badge
                        key={region}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 border-blue-200 cursor-pointer hover:bg-blue-200 group"
                        onClick={() => handleRegionClick(region)}
                      >
                        <span className="group-hover:underline">{region}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRegionRemove(region)
                          }}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    No regions pinned for comparison.
                    {selectedRegion && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-2 text-xs bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-600 border-gray-200 transition-colors duration-200"
                        onClick={handleAddToComparison}
                      >
                        Add {selectedRegion}
                      </Button>
                    )}
                  </div>
                )}

                {pinnedRegions.length === 1 && (
                  <div className="mt-3 text-sm text-yellow-800 bg-amber-100 p-3 rounded-md border border-amber-200">
                    You need at least two regions for meaningful comparison.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Load Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Load Over Time</CardTitle>
              <div className="flex items-center space-x-2">
                <ToggleGroup
                  type="single"
                  value={chartUnit}
                  onValueChange={(value) => value && setChartUnit(value)}
                  size="sm"
                >
                  <ToggleGroupItem
                    value="MW"
                    className="text-xs px-2 data-[state=on]:bg-emerald-700 data-[state=on]:text-white"
                  >
                    MW
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="%"
                    className="text-xs px-2 data-[state=on]:bg-emerald-700 data-[state=on]:text-white"
                  >
                    % Peak
                  </ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={(value) => value && setViewMode(value)}
                  size="sm"
                >
                  <ToggleGroupItem
                    value="chart"
                    className="text-xs px-2 data-[state=on]:bg-emerald-700 data-[state=on]:text-white"
                  >
                    Chart
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="table"
                    className="text-xs px-2 data-[state=on]:bg-emerald-700 data-[state=on]:text-white"
                  >
                    Table
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {regionsToAnalyze.length === 0 ? (
              <div className="h-48 bg-gray-50 rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm">Select regions to view load data</div>
                </div>
              </div>
            ) : viewMode === "chart" ? (
              <div className="h-64 w-full">
                <ChartContainer
                  config={regionsToAnalyze.reduce(
                    (acc, region, index) => {
                      acc[region] = {
                        label: region,
                        color: `hsl(var(--chart-${(index % 9) + 1}))`,
                      }
                      return acc
                    },
                    {} as Record<string, { label: string; color: string }>,
                  )}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={loadData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 10 }} />
                      <YAxis
                        label={{
                          value: chartUnit === "MW" ? "Load (MW)" : "Load (% of Peak)",
                          angle: -90,
                          position: "insideLeft",
                          style: { fontSize: 10 },
                        }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      {regionsToAnalyze.map((region, index) => (
                        <Line
                          key={region}
                          type="monotone"
                          dataKey={region}
                          stroke={`var(--color-${region})`}
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            ) : (
              <div className="h-64 bg-gray-50 rounded border border-gray-200 overflow-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-2 text-left">Time</th>
                      {regionsToAnalyze.map((region) => (
                        <th key={region} className="p-2 text-left">
                          {region} ({chartUnit})
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loadData.map((entry, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2">{entry.time}</td>
                        {regionsToAnalyze.map((region) => (
                          <td key={region} className="p-2">
                            {entry[region]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {regionsToAnalyze.length > 1 && (
              <div className="mt-2 text-xs text-gray-500">Showing comparison of {regionsToAnalyze.length} regions</div>
            )}
          </CardContent>
        </Card>

        {/* Load Composition - Bar Chart for Single, Stacked Bar for Comparison */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Load Composition by Sector</CardTitle>
          </CardHeader>
          <CardContent>
            {regionsToAnalyze.length === 0 ? (
              <div className="h-32 bg-gray-50 rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-xs">Select regions to view sector breakdown</div>
                </div>
              </div>
            ) : activeTab === "single" ? (
              // Bar chart for single region
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={singleRegionSectorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: "%", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#2C6E49">
                      {singleRegionSectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              // Stacked bar chart for comparison
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stackedSectorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: "%", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    {pinnedRegions.map((region, index) => (
                      <Bar key={region} dataKey={region} stackId="a" fill={COLORS[index % COLORS.length]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Export Buttons */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Export Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Export Scope Selection with Radio Buttons on Single Row */}
            <div className="space-y-2">
              <label className="text-xs font-medium">Data Scope</label>
              <RadioGroup value={exportScope} onValueChange={setExportScope} className="flex flex-row space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="selected" id="scope-selected" />
                  <Label htmlFor="scope-selected" className="text-xs cursor-pointer">
                    Selected Regions
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="scope-all" />
                  <Label htmlFor="scope-all" className="text-xs cursor-pointer">
                    All Countries
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Export Format Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium">File Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Export Button - Grey styling */}
            <Button
              className="w-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-600 border-gray-200 transition-colors duration-200"
              size="sm"
            >
              <Download className="h-3 w-3 mr-2" />
              Export {exportScope === "selected" ? "Selected Data" : "All Countries"} ({exportFormat.toUpperCase()})
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
