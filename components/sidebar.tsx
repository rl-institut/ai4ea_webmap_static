"use client"

import { Zap, Building, Factory, Home, Calendar, Clock, Database, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface SidebarProps {
  timeRange: string
  loadType: string
  mapLayer: string
  onTimeRangeChange: (range: string) => void
  onLoadTypeChange: (type: string) => void
  onMapLayerChange: (layer: string) => void
}

export function Sidebar({
  timeRange,
  loadType,
  mapLayer,
  onTimeRangeChange,
  onLoadTypeChange,
  onMapLayerChange,
}: SidebarProps) {
  return (
    <div className="w-[360px] bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Header - Reduced padding */}
      <div className="p-3 border-b border-gray-200 h-[65px] flex items-center">
        <h2 className="text-lg font-semibold">Filters & Settings</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Data Layer Controls - Moved to top with emerald styling and increased height */}
        <div className="space-y-3">
          <div className="flex items-center space-x-1">
            <Database className="h-4 w-4 text-gray-600" />
            <Label className="text-base">Data Layer</Label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "Peak max", label: "Peak max" },
              { value: "Mean", label: "Mean" },
              { value: "Aggregated", label: "Aggregated" },
              { value: "Household Peak max", label: "Household Peak" },
              { value: "Household mean", label: "Household Mean" },
              { value: "Household aggregated", label: "Household Agg." },
            ].map(({ value, label }) => (
              <Button
                key={value}
                variant="outline"
                size="sm"
                onClick={() => onMapLayerChange(value)}
                className={`flex items-center justify-center py-6 px-4 h-auto text-sm transition-colors duration-200 ${
                  mapLayer === value
                    ? "bg-emerald-700 text-white hover:bg-emerald-800 hover:text-white focus:bg-emerald-800 border-emerald-700 font-medium"
                    : "border-emerald-500 bg-white text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Time Range Toggle */}
        <div className="space-y-2">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-gray-600" />
            <Label>Time Range</Label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "Daily", label: "Daily", icon: Calendar },
              { value: "Weekly", label: "Weekly", icon: BarChart3 },
            ].map(({ value, label, icon: Icon }) => (
              <Button
                key={value}
                variant="outline"
                size="sm"
                onClick={() => onTimeRangeChange(value)}
                className={`flex items-center justify-center p-3 h-auto transition-colors duration-200 ${
                  timeRange === value
                    ? "bg-gray-500 text-white hover:bg-gray-600 hover:text-white border-gray-500"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-600 border-gray-200"
                }`}
              >
                <Icon className="h-4 w-4 mr-1.5" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Load Type Buttons - Icons and text in one row */}
        <div className="space-y-2">
          <div className="flex items-center space-x-1">
            <Zap className="h-4 w-4 text-gray-600" />
            <Label>Load Type</Label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "Total", icon: Zap, label: "Total" },
              { value: "Residential", icon: Home, label: "Residential" },
              { value: "Commercial", icon: Building, label: "Commercial" },
              { value: "Industrial", icon: Factory, label: "Industrial" },
            ].map(({ value, icon: Icon, label }) => (
              <Button
                key={value}
                variant="outline"
                size="sm"
                onClick={() => onLoadTypeChange(value)}
                className={`flex items-center justify-center p-3 h-auto transition-colors duration-200 ${
                  loadType === value
                    ? "bg-gray-500 text-white hover:bg-gray-600 hover:text-white border-gray-500"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-600 border-gray-200"
                }`}
              >
                <Icon className="h-4 w-4 mr-1.5" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-[#2C6E49]">
            Privacy
          </Link>
          <span>•</span>
          <Link href="/imprint" className="hover:text-[#2C6E49]">
            Imprint
          </Link>
        </div>
      </div>
    </div>
  )
}
