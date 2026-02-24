"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "@/lib/hooks";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";

const CATEGORIES = [
  { value: "llm", label: "LLM / チャット" },
  { value: "image", label: "画像生成" },
  { value: "audio", label: "音声 / TTS" },
  { value: "coding", label: "コーディング" },
  { value: "other", label: "その他" },
];

const PROVIDERS = [
  "OpenAI",
  "Anthropic",
  "Google",
  "Microsoft",
  "GitHub",
  "Midjourney",
  "Stability AI",
  "ElevenLabs",
  "その他",
];

const PRESETS = [
  { name: "ChatGPT Plus", category: "llm", provider: "OpenAI", price: 3000 },
  { name: "Claude Pro", category: "llm", provider: "Anthropic", price: 3000 },
  { name: "GitHub Copilot", category: "coding", provider: "GitHub", price: 1500 },
  { name: "Midjourney", category: "image", provider: "Midjourney", price: 1500 },
  { name: "Gemini Advanced", category: "llm", provider: "Google", price: 3000 },
];

export default function ServicesPage() {
  const { user } = useCurrentUser();
  const services = useQuery(
    api.services.listByUser,
    user ? { userId: user._id } : "skip"
  );
  const createService = useMutation(api.services.create);
  const removeService = useMutation(api.services.remove);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("llm");
  const [provider, setProvider] = useState("OpenAI");
  const [pricingType, setPricingType] = useState("monthly");
  const [monthlyPrice, setMonthlyPrice] = useState("");

  const handleSubmit = async () => {
    if (!user || !name) return;
    await createService({
      userId: user._id,
      name,
      category,
      provider,
      pricingType,
      monthlyPrice: monthlyPrice ? Number(monthlyPrice) : undefined,
    });
    setName("");
    setCategory("llm");
    setProvider("OpenAI");
    setPricingType("monthly");
    setMonthlyPrice("");
    setOpen(false);
  };

  const handlePreset = async (preset: typeof PRESETS[number]) => {
    if (!user) return;
    await createService({
      userId: user._id,
      name: preset.name,
      category: preset.category,
      provider: preset.provider,
      pricingType: "monthly",
      monthlyPrice: preset.price,
    });
  };

  const handleDelete = async (id: Id<"services">) => {
    await removeService({ id });
  };

  const getCategoryLabel = (value: string) =>
    CATEGORIES.find((c) => c.value === value)?.label ?? value;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">サービス管理</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              サービスを追加
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新しいサービスを追加</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  サービス名
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例: ChatGPT Plus"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  カテゴリ
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  プロバイダー
                </label>
                <Select value={provider} onValueChange={setProvider}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVIDERS.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  料金タイプ
                </label>
                <Select value={pricingType} onValueChange={setPricingType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">月額固定</SelectItem>
                    <SelectItem value="usage">従量課金</SelectItem>
                    <SelectItem value="free">無料</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  月額料金 (¥)
                </label>
                <Input
                  type="number"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                  placeholder="例: 3000"
                />
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                追加
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* プリセット */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            クイック追加（プリセット）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => handlePreset(preset)}
              >
                <Plus className="mr-1 h-3 w-3" />
                {preset.name} (¥{preset.price.toLocaleString()}/月)
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* テーブル */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>サービス名</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead>プロバイダー</TableHead>
                <TableHead>料金タイプ</TableHead>
                <TableHead className="text-right">月額</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services && services.length > 0 ? (
                services.map((service) => (
                  <TableRow key={service._id}>
                    <TableCell className="font-medium">
                      {service.name}
                    </TableCell>
                    <TableCell>{getCategoryLabel(service.category)}</TableCell>
                    <TableCell>{service.provider}</TableCell>
                    <TableCell>
                      {service.pricingType === "monthly"
                        ? "月額固定"
                        : service.pricingType === "usage"
                          ? "従量課金"
                          : "無料"}
                    </TableCell>
                    <TableCell className="text-right">
                      {service.monthlyPrice
                        ? `¥${service.monthlyPrice.toLocaleString()}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={service.isActive ? "default" : "secondary"}
                      >
                        {service.isActive ? "有効" : "無効"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(service._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    サービスが登録されていません。上の「サービスを追加」から始めましょう。
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
