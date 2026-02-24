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
import { AlertTriangle, CheckCircle } from "lucide-react";

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

  const chartData = [
    { name: formatMonth(currentMonth), budget: totalBudget, actual: totalSpent },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">予算設定</h1>

      {/* 予算設定 */}
      <Card>
        <CardHeader>
          <CardTitle>月間予算を設定</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              placeholder={budget ? `現在: ¥${totalBudget.toLocaleString()}` : "例: 10000"}
              className="max-w-xs"
            />
            <Button
              onClick={handleSetBudget}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              設定する
            </Button>
          </div>
          {budget && (
            <p className="mt-2 text-sm text-muted-foreground">
              現在の予算: {formatCurrency(totalBudget)} / 月
            </p>
          )}
        </CardContent>
      </Card>

      {/* ステータス */}
      {totalBudget > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              {isOverBudget ? (
                <AlertTriangle className="h-6 w-6 text-destructive" />
              ) : (
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              )}
              <div>
                <p className="font-semibold">
                  {isOverBudget
                    ? "⚠️ 予算を超過しています"
                    : "✅ 予算内です"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(totalSpent)} / {formatCurrency(totalBudget)} ({usagePercent}%)
                </p>
              </div>
            </div>
            {/* プログレスバー */}
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${isOverBudget ? "bg-destructive" : "bg-emerald-500"}`}
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* チャート */}
      {totalBudget > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>予算 vs 実績</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
                <Bar dataKey="actual" fill="var(--color-actual)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
