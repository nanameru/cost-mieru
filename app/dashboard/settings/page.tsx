"use client";

import { useCurrentUser, getCurrentMonth, formatMonth } from "@/lib/hooks";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserProfile } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function SettingsPage() {
  const { user } = useCurrentUser();
  const currentMonth = getCurrentMonth();

  const expenses = useQuery(
    api.expenses.listByUserMonth,
    user ? { userId: user._id, month: currentMonth } : "skip"
  );

  const handleExportCSV = () => {
    if (!expenses || expenses.length === 0) return;

    const headers = ["日付", "サービス名", "金額(¥)", "メモ"];
    const rows = expenses.map((e) => [
      e.date,
      e.serviceName ?? "",
      String(e.amount),
      e.note ?? "",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cost-mieru-${currentMonth}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">設定</h1>

      <Card>
        <CardHeader>
          <CardTitle>データエクスポート</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            {formatMonth(currentMonth)}の支出データをCSV形式でダウンロードします。
          </p>
          <Button
            onClick={handleExportCSV}
            variant="outline"
            disabled={!expenses || expenses.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            CSVエクスポート
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>アカウント設定</CardTitle>
        </CardHeader>
        <CardContent>
          <UserProfile />
        </CardContent>
      </Card>
    </div>
  );
}
