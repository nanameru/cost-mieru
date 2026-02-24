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
import { Plus, Trash2 } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">支出記録</h1>
        <div className="flex items-center gap-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
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
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                支出を追加
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>支出を記録</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    サービス
                  </label>
                  <Select value={serviceId} onValueChange={setServiceId}>
                    <SelectTrigger>
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
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    金額 (¥)
                  </label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="例: 3000"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    日付
                  </label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    メモ（任意）
                  </label>
                  <Input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="例: 2月分のサブスクリプション"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  記録する
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 合計 */}
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <span className="text-sm text-muted-foreground">
            {formatMonth(selectedMonth)}の支出合計
          </span>
          <span className="text-2xl font-bold">{formatCurrency(totalAmount)}</span>
        </CardContent>
      </Card>

      {/* テーブル */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日付</TableHead>
                <TableHead>サービス</TableHead>
                <TableHead className="text-right">金額</TableHead>
                <TableHead>メモ</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses && expenses.length > 0 ? (
                expenses.map((expense) => (
                  <TableRow key={expense._id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell className="font-medium">
                      {expense.serviceName}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(expense.amount)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {expense.note ?? "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(expense._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    この月の支出記録がありません。
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
