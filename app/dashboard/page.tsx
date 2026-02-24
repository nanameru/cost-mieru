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
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Server,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#8B5CF6", "#EC4899", "#EF4444"];

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
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600" />
          <p className="text-sm text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600" />
          <p className="text-sm text-muted-foreground">ユーザー情報を取得しています...</p>
        </div>
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

  const changePercent = stats?.changePercent;
  const isPositiveChange = changePercent !== undefined && changePercent > 0;
  const isNegativeChange = changePercent !== undefined && changePercent < 0;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-0 shadow-sm">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              今月の支出合計
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
              <BarChart3 className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {formatCurrency(stats?.thisMonthTotal ?? 0)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatMonth(currentMonth)}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-sm">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              登録サービス数
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Server className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {stats?.activeServices ?? 0}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">アクティブ</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-sm">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              前月比
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
              {isPositiveChange ? (
                <TrendingUp className="h-4 w-4 text-amber-600" />
              ) : isNegativeChange ? (
                <TrendingDown className="h-4 w-4 text-emerald-600" />
              ) : (
                <TrendingUp className="h-4 w-4 text-amber-600" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">
                {changePercent !== undefined && changePercent !== 0
                  ? `${changePercent > 0 ? "+" : ""}${changePercent}%`
                  : "---"}
              </span>
              {isPositiveChange && (
                <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                  <ArrowUpRight className="mr-0.5 h-3 w-3" />
                  増加
                </span>
              )}
              {isNegativeChange && (
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                  <ArrowDownRight className="mr-0.5 h-3 w-3" />
                  削減
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">先月との比較</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-sm">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-400 to-violet-600" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              予算残り
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
              <Wallet className="h-4 w-4 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {stats?.budgetRemaining !== null && stats?.budgetRemaining !== undefined
                ? formatCurrency(stats.budgetRemaining)
                : "未設定"}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {stats?.budgetRemaining !== null && stats?.budgetRemaining !== undefined
                ? "今月の残り予算"
                : "予算設定から設定"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              月間支出推移
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ChartContainer config={barChartConfig} className="h-[300px] w-full">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="month"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="total"
                    fill="var(--color-total)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="flex h-[300px] flex-col items-center justify-center gap-3 text-muted-foreground">
                <BarChart3 className="h-10 w-10 text-muted-foreground/30" />
                <div className="text-center">
                  <p className="font-medium">支出データがありません</p>
                  <p className="mt-1 text-sm">「支出記録」から追加してください</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              サービス別分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <div className="flex flex-col gap-4">
                <ChartContainer config={pieChartConfig} className="h-[220px] w-full">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      dataKey="value"
                      nameKey="name"
                      strokeWidth={2}
                      stroke="#fff"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 px-2">
                  {pieData.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="truncate text-muted-foreground">
                        {item.name}
                      </span>
                      <span className="ml-auto shrink-0 font-medium">
                        ¥{item.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-[300px] flex-col items-center justify-center gap-3 text-muted-foreground">
                <Server className="h-10 w-10 text-muted-foreground/30" />
                <div className="text-center">
                  <p className="font-medium">支出データがありません</p>
                  <p className="mt-1 text-sm">サービスを登録してください</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
