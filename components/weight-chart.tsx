"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { WeightPoint } from "@/lib/mock-data"

export function WeightChart({ data }: { data: WeightPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="oklch(0.65 0.12 270 / 0.15)"
            vertical={false}
          />
          <XAxis
            dataKey="fecha"
            stroke="oklch(0.72 0.03 270)"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="oklch(0.72 0.03 270)"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={["dataMin - 2", "dataMax + 2"]}
          />
          <Tooltip
            contentStyle={{
              background: "oklch(0.19 0.04 274)",
              border: "1px solid oklch(0.65 0.12 270 / 0.4)",
              borderRadius: "12px",
              color: "oklch(0.96 0.01 260)",
              fontSize: "13px",
            }}
            labelStyle={{ color: "oklch(0.72 0.16 220)", fontWeight: 700 }}
            formatter={(value: number, name: string) => [
              name === "peso" ? `${value} kg` : `${value}%`,
              name === "peso" ? "Peso" : "% Grasa",
            ]}
          />
          <Line
            type="monotone"
            dataKey="peso"
            stroke="oklch(0.72 0.16 220)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "oklch(0.72 0.16 220)" }}
            activeDot={{ r: 5 }}
            filter="url(#glow)"
          />
          <Line
            type="monotone"
            dataKey="grasa"
            stroke="oklch(0.66 0.22 290)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "oklch(0.66 0.22 290)" }}
            activeDot={{ r: 5 }}
            filter="url(#glow)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
