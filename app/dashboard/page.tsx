"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCurrentUser, getCurrentMonth, formatCurrency, formatMonth } from "@/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart3, TrendingUp, Server, Wallet } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

const barChartConfig: ChartConfig = {
  total: {
    label: "支出合計",
    color: "#10B981",
  },
};

const pieChartConfig: ChartConfig = {
  total: {
    label: "支出",
  },
};

export default function DashboardPage() {
  const { user, isLoaded } = useCurrentUser();
  const currentMonth = getCurrentMonth();

  const stats = useQuery(
    api.expenses.getDashboardStats,
    user ? { userId: user._id, month: currentMonth } : "skip"
  );

  const monthlyTotals = useQuery(
    api.expenses.getMonthlyTotals,
    user ? { userId: user._id } : "skip"
  );

  const distribution = useQuery(
    api.expenses.getServiceDistribution,
    user ? { userId: user._id, month: currentMonth } : "skip"
  );

  if (!isLoaded) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">ユーザー情報を取得しています...</p>
      </div>
    );
  }

  const chartData = (monthlyTotals ?? []).map((item) => ({
    month: formatMonth(item.month),
    total: item.total,
  }));

  const pieData = (distribution ?? []).map((item, index) => ({
    name: item.serviceName,
    value: item.total,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ダッシュボード</h1>

      {/* KPIカード */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今月の支出合計</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.thisMonthTotal ?? 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">登録サービス数</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeServices ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">前月比</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.changePercent !== undefined && stats.changePercent !== 0
                ? `${stats.changePercent > 0 ? "+" : ""}${stats.changePercent}%`
                : "—"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">予算残り</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.budgetRemaining !== null && stats?.budgetRemaining !== undefined
                ? formatCurrency(stats.budgetRemaining)
                : "未設定"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* チャート */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>月間支出推移</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ChartContainer config={barChartConfig} className="h-[300px] w-full">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                支出データがありません。「支出記録」から追加してください。
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>サービス別分布</CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }) => `${name}: ¥${value.toLocaleString()}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                支出データがありません。
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
