"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MapAreaProps {
  selectedRegion: string | null
  pinnedRegions: string[]
  mapLayer: string
  mapStyle: string
  isRightPanelOpen: boolean
  activeTab: string
  onMapStyleChange: (style: string) => void
  onRegionSelect: (region: string) => void
  onRegionPin: (region: string) => void
  onRegionUnpin: (region: string) => void
  onViewDetails: (region: string) => void
  onSwitchToComparison: () => void
  onClose: () => void
}

// Mock country data with updated boundary coordinates
const mockCountries = [
  {
    name: "Ghana",
    lat: 7.9465,
    lng: -1.0232,
    peakDemand: 245,
    loadFactor: 0.78,
    electrification: 95,
    // Ghana country boundary coordinates
    polygon: [
      [-3.0485543918543954, 5.044025460524637],
      [-2.766650016281403, 5.279508697907232],
      [-2.9757955564743668, 5.732102068787199],
      [-3.1849343722235517, 6.834831532891215],
      [-2.5574867267589525, 8.214094387702588],
      [-2.8120995877485484, 9.749933850918538],
      [-2.8575662145852334, 11.04677882363238],
      [-0.11138418465702671, 11.144944607501458],
      [0.19780954829386133, 10.475079496536992],
      [0.4251646168573302, 9.812709687899371],
      [0.3887861641865413, 9.49894362418219],
      [0.49784683654547734, 8.789660816421446],
      [0.6614557717292087, 8.42100698323165],
      [0.6160369654628823, 7.799875520172122],
      [0.5887654769635162, 7.19584442809402],
      [0.6888870587815745, 6.609051293288587],
      [1.2163399724606734, 6.139103813287321],
      [0.852612126695675, 5.759223321693682],
      [-0.05675553912286091, 5.578243662482393],
      [-1.3116780522583156, 5.06215197801852],
      [-2.075537777225776, 4.726908890128854],
      [-3.0485542809047104, 5.053084088422821],
      [-3.0485696197061145, 5.04388665181807],
    ],
  },
  {
    name: "Nigeria",
    lat: 9.082,
    lng: 8.6753,
    peakDemand: 189,
    loadFactor: 0.72,
    electrification: 88,
    // Updated Nigeria country boundary coordinates
    polygon: [
      [2.69228220558594, 6.3676710615714285],
      [4.40633494231372, 6.418239668810628],
      [5.8751724564062044, 4.2830596250361594],
      [8.50294290465061, 4.523635289265712],
      [9.430161341694827, 6.164514864227414],
      [10.725800716173552, 7.025646259805669],
      [11.522668054476213, 6.720582133790629],
      [13.354816300028176, 9.81744091659003],
      [13.995361706299576, 12.131914137683097],
      [13.720334513252254, 13.715095673713463],
      [9.91415563368875, 13.066684257894991],
      [6.759674627928206, 13.666614065877198],
      [4.349401168850363, 13.6342184275168],
      [3.6436743496266786, 12.346652417994534],
      [3.689371208804374, 10.451307325112424],
      [2.7613395451352574, 9.055069477416595],
      [2.69228220558594, 6.3676710615714285],
    ],
  },
  {
    name: "Benin",
    lat: 9.3077,
    lng: 2.3158,
    peakDemand: 156,
    loadFactor: 0.65,
    electrification: 82,
    // Updated Benin country boundary coordinates
    polygon: [
      [2.706562747237001, 6.409928916473177],
      [2.8338803651374747, 9.13850695826693],
      [3.7932606087915417, 10.563152172652991],
      [3.5581414457465144, 11.850149668534456],
      [2.7401181997878155, 12.434068525358342],
      [2.328423649172578, 12.165629316153115],
      [1.3087046313599444, 11.336065702024442],
      [0.9336870790633895, 10.999949430752608],
      [0.7447461257232533, 10.481831827734652],
      [1.3113658514796782, 10.03155431161764],
      [1.4205231416510173, 9.317553191097318],
      [1.752393675882928, 6.267359742893973],
      [2.706562747237001, 6.409928916473177],
    ],
  },
  {
    name: "Togo",
    lat: 8.6195,
    lng: 0.8248,
    peakDemand: 134,
    loadFactor: 0.69,
    electrification: 91,
    // Updated Togo country boundary coordinates
    polygon: [
      [1.7097799808383911, 6.338604913806805],
      [1.5764333375147146, 9.24705288326328],
      [0.7904362323294265, 11.042485836839788],
      [0.020263481015405205, 11.113865073491269],
      [0.3721839294910012, 10.021147283699833],
      [0.523322106120645, 8.48324131474746],
      [0.605642045251102, 6.729716084230418],
      [1.1570051652311406, 6.06208756751785],
      [1.7097799808383911, 6.338604913806805],
    ],
  },
  {
    name: "Niger",
    lat: 17.6078,
    lng: 8.0817,
    peakDemand: 98,
    loadFactor: 0.58,
    electrification: 76,
    // Niger country boundary coordinates (simplified)
    polygon: [
      [0.166, 11.9434],
      [2.0508, 12.627],
      [3.5156, 12.0352],
      [3.6133, 11.6602],
      [4.2676, 12.8711],
      [5.2441, 13.8711],
      [6.1426, 13.5078],
      [7.0313, 13.0898],
      [8.5156, 12.8516],
      [9.9512, 12.8516],
      [10.9863, 13.2539],
      [12.0215, 13.0371],
      [13.3086, 13.5547],
      [14.5156, 13.9727],
      [15.2832, 15.6836],
      [15.957, 20.3379],
      [15.957, 23.4707],
      [11.9727, 23.4707],
      [8.5742, 21.5645],
      [5.6738, 19.6016],
      [2.1777, 15.9434],
      [0.166, 14.9277],
      [0.166, 11.9434],
    ],
  },
]

export function MapArea({
  selectedRegion,
  pinnedRegions,
  mapLayer,
  mapStyle,
  isRightPanelOpen,
  activeTab,
  onMapStyleChange,
  onRegionSelect,
  onRegionPin,
  onRegionUnpin,
  onViewDetails,
  onSwitchToComparison,
  onClose,
}: MapAreaProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const polygonsRef = useRef<any[]>([])
  const tooltipRef = useRef<any>(null)
  const leafletRef = useRef<any>(null)

  const getLayerValue = (country: any) => {
    switch (mapLayer) {
      case "Peak max":
        return country.peakDemand
      case "Mean":
        return country.peakDemand * 0.7
      case "Aggregated":
        return country.peakDemand * 0.85
      case "Household Peak max":
        return country.peakDemand * 0.4
      case "Household mean":
        return country.peakDemand * 0.3
      case "Household aggregated":
        return country.peakDemand * 0.35
      default:
        return country.peakDemand
    }
  }

  const getColorIntensity = (value: number) => {
    if (mapLayer.includes("mean") || mapLayer.includes("Mean")) {
      return Math.floor((value / 150) * 100)
    }
    if (mapLayer.includes("Household")) {
      return Math.floor((value / 100) * 100)
    }
    return Math.min(100, Math.floor((value / 250) * 100))
  }

  const getColorFromIntensity = (intensity: number) => {
    if (intensity >= 80) return "#253494" // Very high - dark blue
    if (intensity >= 60) return "#2c7fb8" // High - medium blue
    if (intensity >= 40) return "#41b6c4" // Medium - light blue
    if (intensity >= 20) return "#a1dab4" // Low - light green
    return "#ffffcc" // Very low - pale yellow
  }

  const getLegendValues = () => {
    switch (mapLayer) {
      case "Peak max":
        return ["5 MW", "10 MW", "15 MW", "25 MW", "30 MW"]
      case "Mean":
        return ["1 MW", "3 MW", "5 MW", "8 MW", "10 MW"]
      case "Aggregated":
        return ["24 MWh/day", "48 MWh/day", "72 MWh/day", "96 MWh/day", "120 MWh/day"]
      case "Household Peak max":
        return ["1.5 kW", "2.0 kW", "2.5 kW", "3.0 kW", "3.5 kW"]
      case "Household mean":
        return ["100 W", "175 W", "250 W", "325 W", "400 W"]
      case "Household aggregated":
        return ["1 kWh/day", "2 kWh/day", "3 kWh/day", "4 kWh/day", "5 kWh/day"]
      default:
        return ["5 MW", "10 MW", "15 MW", "25 MW", "30 MW"]
    }
  }

  const getMapTileUrl = useCallback(() => {
    switch (mapStyle) {
      case "Dark":
        return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      case "Satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }
  }, [mapStyle])

  const getAllLayerValues = (country: any) => {
    const layers = ["Peak max", "Mean", "Aggregated", "Household Peak max", "Household mean", "Household aggregated"]

    return layers.map((layer) => {
      let value
      switch (layer) {
        case "Peak max":
          value = country.peakDemand
          break
        case "Mean":
          value = country.peakDemand * 0.7
          break
        case "Aggregated":
          value = country.peakDemand * 0.85
          break
        case "Household Peak max":
          value = country.peakDemand * 0.4
          break
        case "Household mean":
          value = country.peakDemand * 0.3
          break
        case "Household aggregated":
          value = country.peakDemand * 0.35
          break
        default:
          value = country.peakDemand
      }

      const unit = layer.includes("Household")
        ? layer.includes("mean")
          ? "W"
          : layer.includes("aggregated")
            ? "kWh/day"
            : "kW"
        : layer.includes("Aggregated")
          ? "MWh/day"
          : "MW"

      return { layer, value: Math.round(value), unit }
    })
  }

  const updatePolygons = useCallback(() => {
    if (!mapInstanceRef.current || !leafletRef.current) return

    const L = leafletRef.current

    // Clear existing polygons
    polygonsRef.current.forEach((polygon) => {
      if (mapInstanceRef.current && mapInstanceRef.current.hasLayer(polygon)) {
        mapInstanceRef.current.removeLayer(polygon)
      }
    })
    polygonsRef.current = []

    // Add new polygons for countries
    mockCountries.forEach((country) => {
      const value = getLayerValue(country)
      const intensity = getColorIntensity(value)
      const color = getColorFromIntensity(intensity)
      const isSelected = selectedRegion === country.name
      const isPinned = pinnedRegions.includes(country.name)

      // Convert coordinates to Leaflet format [lat, lng]
      const leafletCoords = country.polygon.map(([lng, lat]) => [lat, lng])

      let borderColor = "#ffffff"
      let borderWeight = 2
      let fillOpacity = 0.8

      if (isSelected) {
        borderColor = "#FF6B35" // Orange for active selection
        borderWeight = 4
        fillOpacity = 0.9
      } else if (isPinned) {
        borderColor = "#3B82F6" // Blue for pinned
        borderWeight = 3
        fillOpacity = 0.7
      }

      const polygon = L.polygon(leafletCoords, {
        color: borderColor,
        weight: borderWeight,
        opacity: 1,
        fillColor: color,
        fillOpacity: fillOpacity,
      })

      // Add hover events
      polygon.on("mouseover", (e: any) => {
        if (!isSelected) {
          polygon.setStyle({
            weight: isPinned ? 4 : 3,
            fillOpacity: 0.9,
            color: isPinned ? "#3B82F6" : "#000000",
          })
        }

        // Show tooltip
        if (tooltipRef.current) {
          const unit = mapLayer.includes("Household")
            ? mapLayer.includes("mean")
              ? "W"
              : mapLayer.includes("aggregated")
                ? "kWh/day"
                : "kW"
            : mapLayer.includes("Aggregated")
              ? "MWh/day"
              : "MW"

          tooltipRef.current.innerHTML = `
            <div>
              <strong>${country.name}</strong><br>
              <span class="text-gray-500">${mapLayer}:</span> <strong>${Math.round(value)} ${unit}</strong>
            </div>
          `
          tooltipRef.current.style.display = "block"
        }
      })

      polygon.on("mouseout", () => {
        if (!isSelected) {
          polygon.setStyle({
            weight: isPinned ? 3 : 2,
            fillOpacity: isPinned ? 0.7 : 0.8,
            color: isPinned ? "#3B82F6" : "#ffffff",
          })
        }

        // Hide tooltip
        if (tooltipRef.current) {
          tooltipRef.current.style.display = "none"
        }
      })

      const allLayerValues = getAllLayerValues(country)

      // Only show compare button if there's a region being analyzed in the right panel (single analysis mode)
      const showCompareButton = selectedRegion !== null && isRightPanelOpen

      const isCurrentlySelected = selectedRegion === country.name

      // Status indicators
      let statusIndicators = ""
      if (isCurrentlySelected) {
        statusIndicators += `
    <div class="flex items-center space-x-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-md border border-orange-200 mb-2">
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      <span class="font-medium">Currently analyzed</span>
    </div>
  `
      }
      if (isPinned) {
        statusIndicators += `
    <div class="flex items-center space-x-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-200 mb-2">
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"/>
      </svg>
      <span class="font-medium">Compared</span>
    </div>
  `
      }

      // Update the popup content to use statusIndicators instead of statusIndicator
      const popupContent = `
<div class="p-3 min-w-[240px] max-w-[280px]">
  <h3 class="text-base font-semibold text-gray-900 mb-2 leading-tight">${country.name}</h3>
  ${statusIndicators}
  <div class="border-t border-gray-200 pt-2 pb-2">
    ${allLayerValues
      .map(
        ({ layer, value, unit }) => `
      <div class="flex justify-between items-center py-1">
        <span class="text-gray-500 text-sm">${layer}:</span>
        <span class="font-bold text-gray-900 ml-2 text-sm">${value} ${unit}</span>
      </div>
    `,
      )
      .join("")}
  </div>
  
  <div class="pt-2 flex space-x-2 border-t border-gray-200">
    ${
      !isCurrentlySelected
        ? `
    <button 
      onclick="window.viewDetails('${country.name}')" 
      class="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-xs bg-emerald-700 text-white rounded-md hover:bg-emerald-800 font-medium transition-colors duration-200"
    >
      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      Analyze Region
    </button>
    `
        : ""
    }
    ${
      showCompareButton
        ? `<button 
      onclick="window.toggleCompare('${country.name}')" 
      class="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-xs ${isPinned ? "bg-gray-300 text-gray-600" : "bg-gray-200 text-gray-600"} rounded-md hover:bg-gray-300 hover:text-gray-600 transition-colors duration-200"
    >
      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"/>
    </svg>
      ${isPinned ? "Remove from Comparison" : "Compare"}
    </button>`
        : ""
    }
  </div>
</div>
`

      // Create popup but don't bind it yet
      const popup = L.popup({
        maxWidth: 320,
        className: "custom-popup",
        closeButton: true,
        autoClose: false,
        closeOnEscapeKey: true,
        zIndexOffset: 10000,
      }).setContent(popupContent)

      // Add click event that opens popup but doesn't select region
      polygon.on("click", (e: any) => {
        e.originalEvent.stopPropagation()

        // Close any existing popups
        mapInstanceRef.current.closePopup()

        // Open popup at click location
        popup.setLatLng(e.latlng).openOn(mapInstanceRef.current)

        // Remove this line - don't automatically select the region
        // onRegionSelect(country.name)
      })

      polygon.addTo(mapInstanceRef.current)
      polygonsRef.current.push(polygon)
    })
  }, [mapLayer, selectedRegion, pinnedRegions, onRegionSelect, isRightPanelOpen, activeTab])

  // Initialize map
  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      // Dynamically import Leaflet
      import("leaflet").then((L) => {
        leafletRef.current = L

        // Initialize map centered on West Africa
        const map = L.map(mapRef.current!).setView([9.082, 1.0199], 5)

        // Add tile layer
        L.tileLayer(getMapTileUrl(), {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map)

        mapInstanceRef.current = map

        // Create tooltip div
        const tooltipDiv = L.DomUtil.create("div", "custom-tooltip")
        tooltipDiv.style.display = "none"
        tooltipDiv.style.position = "absolute"
        tooltipDiv.style.backgroundColor = "white"
        tooltipDiv.style.padding = "8px 12px"
        tooltipDiv.style.border = "1px solid #ccc"
        tooltipDiv.style.borderRadius = "4px"
        tooltipDiv.style.zIndex = "2000"
        tooltipDiv.style.pointerEvents = "none"
        tooltipDiv.style.fontSize = "12px"
        tooltipDiv.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"
        document.body.appendChild(tooltipDiv)
        tooltipRef.current = tooltipDiv

        // Update tooltip position on mousemove
        map.on("mousemove", (e: any) => {
          if (tooltipRef.current && tooltipRef.current.style.display === "block") {
            tooltipRef.current.style.left = `${e.originalEvent.pageX + 10}px`
            tooltipRef.current.style.top = `${e.originalEvent.pageY + 10}px`
          }
        })

        // Initial polygon creation
        updatePolygons()
      })
    }

    return () => {
      // Clean up tooltip on unmount
      if (tooltipRef.current && document.body.contains(tooltipRef.current)) {
        document.body.removeChild(tooltipRef.current)
      }
    }
  }, [updatePolygons])

  // Update tile layer when style changes
  useEffect(() => {
    if (mapInstanceRef.current && leafletRef.current) {
      const L = leafletRef.current
      // Update tile layer when style changes
      mapInstanceRef.current.eachLayer((layer: any) => {
        if (layer instanceof L.TileLayer) {
          mapInstanceRef.current.removeLayer(layer)
        }
      })

      L.tileLayer(getMapTileUrl(), {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstanceRef.current)
    }
  }, [mapStyle, getMapTileUrl])

  // Update polygons when dependencies change
  useEffect(() => {
    updatePolygons()
  }, [updatePolygons])

  // Setup global functions for popup buttons
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).viewDetails = (countryName: string) => {
        if (selectedRegion === countryName && isRightPanelOpen && activeTab === "single") {
          // If clicking on currently analyzed region, remove it from analysis
          onRegionSelect(null)
        } else {
          // Otherwise, analyze this region (this will set it as selected and open sidebar)
          onViewDetails(countryName)
        }
        if (mapInstanceRef.current) {
          mapInstanceRef.current.closePopup()
        }
      }
      ;(window as any).toggleCompare = (countryName: string) => {
        if (pinnedRegions.includes(countryName)) {
          onRegionUnpin(countryName)
        } else {
          onRegionPin(countryName)
          onSwitchToComparison()
        }
        if (mapInstanceRef.current) {
          mapInstanceRef.current.closePopup()
        }
      }
    }
  }, [
    pinnedRegions,
    onRegionPin,
    onRegionUnpin,
    onViewDetails,
    onSwitchToComparison,
    selectedRegion,
    onRegionSelect,
    isRightPanelOpen,
    activeTab,
  ])

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Search Bar - Larger and simplified */}
      <div className="p-3 bg-gray-50 border-b border-gray-200 h-[65px] flex items-center">
        <div className="flex items-center space-x-2 w-full max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Jump to country or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        {/* Map Controls - Restored z-index */}
        <div className="absolute top-4 right-4 space-y-2 z-[900]">
          <Card className="p-3 w-40">
            <div className="space-y-3">
              {/* Map Style */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Base Map</label>
                <div className="relative">
                  <Select value={mapStyle} onValueChange={onMapStyleChange}>
                    <SelectTrigger className="w-full h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[950]">
                      <SelectItem value="Light">
                        <div className="flex items-center space-x-2">
                          <span>Light</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Dark">
                        <div className="flex items-center space-x-2">
                          <span>Dark</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Satellite">
                        <div className="flex items-center space-x-2">
                          <span>Satellite</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Simplified Legend */}
          <Card className="p-3 w-40">
            <div className="space-y-2">
              <label className="text-xs font-medium leading-tight">Legend - {mapLayer}</label>
              <div className="space-y-1">
                {getLegendValues().map((value, index) => {
                  const colors = ["#ffffcc", "#a1dab4", "#41b6c4", "#2c7fb8", "#253494"]
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-4 h-2 rounded flex-shrink-0" style={{ backgroundColor: colors[index] }}></div>
                      <span className="text-xs text-gray-600">{value}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Leaflet Map Container */}
        <div ref={mapRef} className="w-full h-full" style={{ minHeight: "500px" }} />

        {/* Leaflet CSS */}
        <style jsx global>{`
          @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
          
          .leaflet-container {
            height: 100%;
            width: 100%;
          }
          
          .leaflet-popup-content {
            margin: 0;
            padding: 0;
          }
          
          .leaflet-popup-content-wrapper {
            width: 100%;
            padding: 0;
            border-radius: 8px;
          }
          
          .custom-popup .leaflet-popup-content-wrapper {
            padding: 0;
          }
          
          /* Try a different approach - move the popup pane to the top */
          .leaflet-map-pane {
            z-index: 2 !important;
          }
          
          .leaflet-tile-pane {
            z-index: 1 !important;
          }
          
          .leaflet-overlay-pane {
            z-index: 3 !important;
          }
          
          .leaflet-shadow-pane {
            z-index: 4 !important;
          }
          
          .leaflet-marker-pane {
            z-index: 5 !important;
          }
          
          .leaflet-tooltip-pane {
            z-index: 6 !important;
          }
          
          .leaflet-popup-pane {
            z-index: 9999 !important;
          }
          
          .leaflet-control {
            z-index: 800 !important;
          }
          
          .text-gray-500 {
            color: #6b7280;
          }
          
          .text-gray-900 {
            color: #111827;
          }
          
          .border-gray-200 {
            border-color: #e5e7eb;
          }
          
          .text-orange-600 {
            color: #ea580c;
          }
          
          .bg-orange-50 {
            background-color: #fff7ed;
          }
          
          .border-orange-200 {
            border-color: #fed7aa;
          }
          
          .text-blue-600 {
            color: #2563eb;
          }
          
          .bg-blue-50 {
            background-color: #eff6ff;
          }
          
          .border-blue-200 {
            border-color: #bfdbfe;
          }
        `}</style>
      </div>
    </div>
  )
}
