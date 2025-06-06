"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { MapArea } from "@/components/map-area"
import { RightPanel } from "@/components/right-panel"

export default function Dashboard() {
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [pinnedRegions, setPinnedRegions] = useState<string[]>([])
  const [timeRange, setTimeRange] = useState("Daily")
  const [loadType, setLoadType] = useState("Total")
  const [mapLayer, setMapLayer] = useState("Peak max")
  const [mapStyle, setMapStyle] = useState("Light")
  const [activeTab, setActiveTab] = useState("single")

  const handleRegionSelect = (region: string | null) => {
    setSelectedRegion(region)
    // Don't open the sidebar when clicking on a region
  }

  const handleViewDetails = (region: string) => {
    setSelectedRegion(region)
    setRightPanelOpen(true)
    setActiveTab("single") // Switch to single analysis tab
  }

  const handleSwitchToComparison = () => {
    setActiveTab("comparison") // Switch to comparison tab
    setRightPanelOpen(true)
  }

  const handleRegionPin = (region: string) => {
    if (pinnedRegions.length < 7 && !pinnedRegions.includes(region)) {
      setPinnedRegions([...pinnedRegions, region])
    }
  }

  const handleRegionUnpin = (region: string) => {
    setPinnedRegions(pinnedRegions.filter((r) => r !== region))
  }

  const handleDeselectAll = () => {
    setPinnedRegions([])
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          timeRange={timeRange}
          loadType={loadType}
          mapLayer={mapLayer}
          onTimeRangeChange={setTimeRange}
          onLoadTypeChange={setLoadType}
          onMapLayerChange={setMapLayer}
        />

        <div className="flex-1 flex flex-col">
          <MapArea
            selectedRegion={selectedRegion}
            pinnedRegions={pinnedRegions}
            mapLayer={mapLayer}
            mapStyle={mapStyle}
            isRightPanelOpen={rightPanelOpen}
            activeTab={activeTab}
            onMapStyleChange={setMapStyle}
            onRegionSelect={handleRegionSelect}
            onRegionPin={handleRegionPin}
            onRegionUnpin={handleRegionUnpin}
            onViewDetails={handleViewDetails}
            onSwitchToComparison={handleSwitchToComparison}
          />
        </div>

        <RightPanel
          isOpen={rightPanelOpen}
          onClose={() => setRightPanelOpen(false)}
          selectedRegion={selectedRegion}
          pinnedRegions={pinnedRegions}
          timeRange={timeRange}
          loadType={loadType}
          onRegionSelect={setSelectedRegion}
          onRegionUnpin={handleRegionUnpin}
          onRegionPin={handleRegionPin}
          onDeselectAll={handleDeselectAll}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  )
}
