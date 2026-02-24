"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCurrentUser, getCurrentMonth, formatCurrency, formatMonth } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { AlertTriangle, CheckCircle, Target, TrendingUp } from "lucide-react";

const chartConfig: ChartConfig = {
  budget: { label: "予算", color: "#D1FAE5" },
  actual: { label: "実績", color: "#10B981" },
};

export default function BudgetPage() {
  const { user } = useCurrentUser();
  const currentMonth = getCurrentMonth();
  const [budgetInput, setBudgetInput] = useState("");

  const budget = useQuery(
    api.budgets.getByUserMonth,
    user ? { userId: user._id, month: currentMonth } : "skip"
  );

  const stats = useQuery(
    api.expenses.getDashboardStats,
    user ? { userId: user._id, month: currentMonth } : "skip"
  );

  const setBudget = useMutation(api.budgets.set);

  const handleSetBudget = async () => {
    if (!user || !budgetInput) return;
    await setBudget({
      userId: user._id,
      month: currentMonth,
      totalBudget: Number(budgetInput),
    });
    setBudgetInput("");
  };

  const totalBudget = budget?.totalBudget ?? 0;
  const totalSpent = stats?.thisMonthTotal ?? 0;
  const isOverBudget = totalBudget > 0 && totalSpent > totalBudget;
  const usagePercent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
  const remaining = totalBudget - totalSpent;

  const chartData = [
    { name: formatMonth(currentMonth), budget: totalBudget, actual: totalSpent },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">予算設定</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          月間予算を設定して支出を管理します
        </p>
      </div>

      {/* Budget input */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-emerald-600" />
            月間予算を設定
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="relative max-w-xs flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ¥
              </span>
              <Input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                placeholder={budget ? `現在: ${totalBudget.toLocaleString()}` : "例: 10000"}
                className="rounded-lg pl-7"
              />
            </div>
            <Button
              onClick={handleSetBudget}
              className="rounded-xl bg-emerald-600 shadow-sm shadow-emerald-600/20 hover:bg-emerald-700"
            >
              設定する
            </Button>
          </div>
          {budget && (
            <p className="mt-3 text-sm text-muted-foreground">
              現在の予算: <span className="font-medium text-foreground">{formatCurrency(totalBudget)}</span> / 月
            </p>
          )}
        </CardContent>
      </Card>

      {/* Status */}
      {totalBudget > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className={`relative overflow-hidden border-0 shadow-sm ${isOverBudget ? "ring-1 ring-red-200" : ""}`}>
            <div className={`absolute inset-x-0 top-0 h-1 ${isOverBudget ? "bg-gradient-to-r from-red-400 to-red-600" : "bg-gradient-to-r from-emerald-400 to-emerald-600"}`} />
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                {isOverBudget ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">
                    {isOverBudget ? "予算超過" : "予算内"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {usagePercent}% 使用済み
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-sm">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">支出額</p>
              <p className="mt-1 text-xl font-bold tracking-tight">
                {formatCurrency(totalSpent)}
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-sm">
            <div className={`absolute inset-x-0 top-0 h-1 ${remaining >= 0 ? "bg-gradient-to-r from-violet-400 to-violet-600" : "bg-gradient-to-r from-red-400 to-red-600"}`} />
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">残り予算</p>
              <p className={`mt-1 text-xl font-bold tracking-tight ${remaining < 0 ? "text-red-600" : ""}`}>
                {formatCurrency(remaining)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Progress bar */}
      {totalBudget > 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">予算消化率</span>
              <span className="font-semibold">
                {formatCurrency(totalSpent)} / {formatCurrency(totalBudget)}
              </span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  isOverBudget
                    ? "bg-gradient-to-r from-red-400 to-red-500"
                    : usagePercent > 80
                      ? "bg-gradient-to-r from-amber-400 to-amber-500"
                      : "bg-gradient-to-r from-emerald-400 to-emerald-500"
                }`}
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className={`font-medium ${isOverBudget ? "text-red-600" : usagePercent > 80 ? "text-amber-600" : "text-emerald-600"}`}>
                {usagePercent}%
              </span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chart */}
      {totalBudget > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              予算 vs 実績
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="budget" fill="var(--color-budget)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="actual" fill="var(--color-actual)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
