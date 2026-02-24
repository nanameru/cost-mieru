"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCurrentUser, getCurrentMonth, formatCurrency, formatMonth } from "@/lib/hooks";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Receipt, TrendingUp } from "lucide-react";

export default function ExpensesPage() {
  const { user } = useCurrentUser();
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [open, setOpen] = useState(false);

  const services = useQuery(
    api.services.listByUser,
    user ? { userId: user._id } : "skip"
  );

  const expenses = useQuery(
    api.expenses.listByUserMonth,
    user ? { userId: user._id, month: selectedMonth } : "skip"
  );

  const createExpense = useMutation(api.expenses.create);
  const removeExpense = useMutation(api.expenses.remove);

  const [serviceId, setServiceId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    if (!user || !serviceId || !amount) return;
    await createExpense({
      userId: user._id,
      serviceId: serviceId as Id<"services">,
      amount: Number(amount),
      date,
      note: note || undefined,
    });
    setServiceId("");
    setAmount("");
    setNote("");
    setOpen(false);
  };

  const handleDelete = async (id: Id<"expenses">) => {
    await removeExpense({ id });
  };

  const totalAmount = (expenses ?? []).reduce((sum, e) => sum + e.amount, 0);
  const expenseCount = expenses?.length ?? 0;

  // 月選択用のオプション生成（過去12ヶ月）
  const monthOptions: string[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthOptions.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">支出記録</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            月ごとの支出を記録・管理します
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((m) => (
                <SelectItem key={m} value={m}>
                  {formatMonth(m)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-emerald-600 shadow-sm shadow-emerald-600/20 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                支出を追加
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>支出を記録</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    サービス
                  </label>
                  <Select value={serviceId} onValueChange={setServiceId}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="サービスを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {(services ?? []).map((s) => (
                        <SelectItem key={s._id} value={s._id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      金額 (¥)
                    </label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="例: 3000"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      日付
                    </label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    メモ（任意）
                  </label>
                  <Input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="例: 2月分のサブスクリプション"
                    className="rounded-lg"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
                >
                  記録する
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="relative overflow-hidden border-0 shadow-sm">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">
                {formatMonth(selectedMonth)}の支出合計
              </p>
              <p className="text-2xl font-bold tracking-tight">
                {formatCurrency(totalAmount)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-0 shadow-sm">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <Receipt className="h-5 w-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">記録件数</p>
              <p className="text-2xl font-bold tracking-tight">{expenseCount}件</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">日付</TableHead>
                <TableHead>サービス</TableHead>
                <TableHead className="text-right">金額</TableHead>
                <TableHead>メモ</TableHead>
                <TableHead className="pr-6 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses && expenses.length > 0 ? (
                expenses.map((expense) => (
                  <TableRow key={expense._id} className="group">
                    <TableCell className="pl-6 text-sm text-muted-foreground">
                      {expense.date}
                    </TableCell>
                    <TableCell className="font-medium">
                      {expense.serviceName}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(expense.amount)}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                      {expense.note ?? "---"}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => handleDelete(expense._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Receipt className="h-8 w-8 text-muted-foreground/30" />
                      <p>この月の支出記録がありません</p>
                      <p className="text-sm">「支出を追加」から記録しましょう</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
