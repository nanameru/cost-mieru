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
import { Plus, Trash2, Sparkles, Server } from "lucide-react";

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

  const handlePreset = async (preset: (typeof PRESETS)[number]) => {
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

  const getPricingLabel = (type: string) => {
    switch (type) {
      case "monthly":
        return "月額固定";
      case "usage":
        return "従量課金";
      case "free":
        return "無料";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">サービス管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            利用中のAIサービスを登録・管理します
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl bg-emerald-600 shadow-sm shadow-emerald-600/20 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              サービスを追加
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>新しいサービスを追加</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  サービス名
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例: ChatGPT Plus"
                  className="rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    カテゴリ
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="rounded-lg">
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
                  <label className="mb-1.5 block text-sm font-medium">
                    プロバイダー
                  </label>
                  <Select value={provider} onValueChange={setProvider}>
                    <SelectTrigger className="rounded-lg">
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
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    料金タイプ
                  </label>
                  <Select value={pricingType} onValueChange={setPricingType}>
                    <SelectTrigger className="rounded-lg">
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
                  <label className="mb-1.5 block text-sm font-medium">
                    月額料金 (¥)
                  </label>
                  <Input
                    type="number"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    placeholder="例: 3000"
                    className="rounded-lg"
                  />
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
              >
                追加する
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Presets */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            クイック追加
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                className="rounded-lg border-dashed transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                onClick={() => handlePreset(preset)}
              >
                <Plus className="mr-1.5 h-3 w-3" />
                {preset.name}
                <span className="ml-1.5 text-muted-foreground">
                  ¥{preset.price.toLocaleString()}/月
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">サービス名</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead>プロバイダー</TableHead>
                <TableHead>料金タイプ</TableHead>
                <TableHead className="text-right">月額</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="pr-6 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services && services.length > 0 ? (
                services.map((service) => (
                  <TableRow key={service._id} className="group">
                    <TableCell className="pl-6 font-medium">
                      {service.name}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {getCategoryLabel(service.category)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{service.provider}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded-md font-normal">
                        {getPricingLabel(service.pricingType)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {service.monthlyPrice
                        ? `¥${service.monthlyPrice.toLocaleString()}`
                        : "---"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={service.isActive ? "default" : "secondary"}
                        className={
                          service.isActive
                            ? "rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            : "rounded-md"
                        }
                      >
                        {service.isActive ? "有効" : "無効"}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => handleDelete(service._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Server className="h-8 w-8 text-muted-foreground/30" />
                      <p>サービスが登録されていません</p>
                      <p className="text-sm">上の「サービスを追加」から始めましょう</p>
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
