"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Phone, Mail, Sparkles, ArrowRight, MessageCircle, Clock, Shield, Users, Heart, Award, Truck, ChevronDown } from 'lucide-react'
import Image from "next/image"

export default function MedicalCleaningLanding() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      facility: formData.get("facility") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    }
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (response.ok) {
        alert(
          "✅ お問い合わせを受け付けました！\n\n24時間以内にご連絡いたします。\nありがとうございました。",
        )
        e.currentTarget.reset()
      } else {
        let errorMessage = `❌ エラーが発生しました (${response.status})\n\n`
        if (result.error) {
          errorMessage += `エラー: ${result.error}\n\n`
        }
        errorMessage += `お手数ですが、お電話でお問い合わせください。\n📞 045-701-6985`
        alert(errorMessage)
      }
    } catch (error: any) {
      let errorMessage = "❌ 送信に失敗しました。\n\n"
      errorMessage += `エラー詳細: ${error?.message || "Unknown error"}\n\n`
      errorMessage +=
        "お手数ですが、お電話でお問い合わせください。\n📞 045-701-6985"
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqData = [
    {
      question: "1着からでも依頼できますか？",
      answer:
        "はい、1着から喜んでお受けいたします。個人の医療従事者の方でも、大きな医療機関でも、どちらでも対応可能です。少量でもお気軽にご相談ください。",
    },
    {
      question: "集配エリアはどこまでですか？",
      answer:
        "神奈川県全域に対応しております。横浜市全18区、川崎市、相模原市、その他県内全域で無料集配サービスを行っています。詳細なエリアについてはお問い合わせください。",
    },
    {
      question: "納期はどのくらいですか？",
      answer:
        "通常は2-3営業日でお返しいたします。お急ぎの場合は最短当日納品も可能です（午前中集荷の場合）。定期契約の場合は、ご希望に応じて毎日・週2回・週1回などのスケジュールで対応いたします。",
    },
    {
      question: "料金体系を教えてください",
      answer:
        "スクラブ、検診着、理学療法士ウェアなど、アイテムや汚れの程度により料金が異なります。まずは無料見積りをご利用ください。定期契約の場合は割引料金もございます。",
    },
    {
      question: "特殊な素材でも対応できますか？",
      answer:
        "はい、医療現場で使用される様々な素材に対応しております。ポリエステル、綿、混紡素材、抗菌加工済み生地、ストレッチ素材など、それぞれの特性に合わせた洗浄方法で処理いたします。",
    },
    {
      question: "汚れがひどい場合でも大丈夫ですか？",
      answer:
        "血液、薬品、その他の医療現場特有の汚れにも対応しております。熟練職人が手作業で前処理を行い、専用洗剤を使用して確実に汚れを除去いたします。落ちない場合は無料で再処理いたします。",
    },
    {
      question: "契約期間の縛りはありますか？",
      answer:
        "契約期間の縛りは一切ございません。1回のみのご利用でも、継続的なご利用でも、お客様のご都合に合わせて柔軟に対応いたします。解約金なども一切発生いたしません。",
    },
    {
      question: "品質に満足できない場合はどうなりますか？",
      answer:
        "100%満足保証をお約束しております。仕上がりにご満足いただけない場合は、無料で再仕上げいたします。それでもご満足いただけない場合は、料金を全額返金いたします。",
    },
  ]
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Floating CTA Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full px-6 py-3"
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          無料見積り
        </Button>
      </motion.div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-green-600/10"
          style={{ y }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1
                className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                神奈川県の<span className="text-blue-600">医療白衣</span>を
                <br />
                専門技術で<span className="text-green-600">確実に美しく</span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                医療機関・調剤薬局・理学療法士・検診機関の皆様へ
                <br />
                <span className="font-semibold text-blue-700">1着から対応</span>
                ・
                <span className="font-semibold text-green-700">
                  最短当日納品
                </span>
                ・
                <span className="font-semibold text-blue-700">品質保証</span>
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  無料トライアル体験
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg bg-transparent"
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  <Mail className="mr-2 w-5 h-5" />
                  メールでお問い合わせ
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <Image
                  src="/images/main-medical-team.png"
                  alt="神奈川県の医療現場をサポートする笑顔のチーム"
                  width={500}
                  height={600}
                  priority
                  className="rounded-2xl shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-800">
              安心の実績
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              選ばれ続ける3つの理由
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center h-full border-2 border-blue-100 hover:border-blue-300 transition-colors">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  豊富な取引実績
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  神奈川県内の多数の医療機関との継続的な取引実績で安心してご利用いただけます
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center h-full border-2 border-green-100 hover:border-green-300 transition-colors">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  契約の安心保証
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  途中解約や契約終了による法人様は一切なし。満足度の高いサービスを提供
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center h-full border-2 border-orange-100 hover:border-orange-300 transition-colors">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  最短当日納品
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  急な依頼にも対応可能。最短当日納品で医療現場の緊急ニーズにお応えします
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Problems Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-red-100 text-red-800">
              医療現場のお悩み
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              こんなことで
              <span className="text-red-600">お困り</span>
              ではありませんか？
            </h2>
            <p className="text-xl text-gray-600">
              医療現場でよくあるお悩みを解決します
            </p>
          </motion.div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "洗濯に時間がかかる",
                  desc: "忙しい医療現場で白衣の洗濯に時間を取られている",
                  icon: Clock,
                },
                {
                  title: "品質の劣化が心配",
                  desc: "頻繁な洗濯で白衣の色あせや生地の傷みが気になる",
                  icon: Heart,
                },
                {
                  title: "スタッフの負担増加",
                  desc: "スタッフが個人で洗濯することで負担が増えている",
                  icon: Users,
                },
                {
                  title: "少量でも依頼したい",
                  desc: "1着からでも気軽に依頼できるクリーニング店が見つからない",
                  icon: Truck,
                },
                {
                  title: "専門性が欲しい",
                  desc: "医療用ウェアの特殊な素材や汚れに対応できる業者がない",
                  icon: Award,
                },
                {
                  title: "コストが心配",
                  desc: "クリーニング代が高額になってしまうのではないかと不安",
                  icon: Shield,
                },
              ].map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full bg-red-50 border-red-200 hover:bg-red-100 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
                        <problem.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-red-800 mb-2">
                          {problem.title}
                        </h3>
                        <p className="text-red-700 text-sm leading-relaxed">
                          {problem.desc}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                選ばれる理由
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                神奈川県の医療現場に特化した
                <br />
                <span className="text-blue-600">プロフェッショナル</span>
                サービス
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                医療現場の特殊なニーズを理解し、最適なソリューションを提供します
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "最短当日納品対応",
                    desc: "急な依頼にも対応。最短当日納品で現場をサポート",
                    icon: Clock,
                    color: "blue",
                  },
                  {
                    title: "無料集配サービス",
                    desc: "神奈川県内なら1着から無料で集配。毎日・週指定も可能",
                    icon: Truck,
                    color: "green",
                  },
                  {
                    title: "個別洗い・特殊素材対応",
                    desc: "スクラブ、検診着、理学療法士ウェアなど多彩な素材に対応",
                    icon: Award,
                    color: "purple",
                  },
                  {
                    title: "品質保証",
                    desc: "プロの技術で白衣本来の白さと清潔感を保持",
                    icon: Shield,
                    color: "orange",
                  },
                ].map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div
                      className={`bg-${solution.color}-100 rounded-full p-3 flex-shrink-0`}
                    >
                      <solution.icon
                        className={`w-6 h-6 text-${solution.color}-600`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {solution.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {solution.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="/images/medical-professionals-trio.png"
                alt="医師・看護師・理学療法士 - 専門的な医療チーム"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">品質保証</p>
                    <p className="text-sm text-gray-600">100%満足保証</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              他社比較
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              他社との比較
            </h2>
            <p className="text-xl text-gray-600">
              なぜ当社が選ばれるのか、一目でわかります
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">
                        比較項目
                      </th>
                      <th className="px-6 py-4 text-center font-semibold bg-blue-700">
                        当社
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        一般クリーニング店
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        自社洗濯
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { item: "医療専門対応", us: "◎", general: "△", self: "×" },
                      { item: "最短当日納品", us: "◎", general: "×", self: "○" },
                      { item: "1着から対応", us: "◎", general: "◎", self: "○" },
                      {
                        item: "無料集配サービス",
                        us: "◎",
                        general: "△",
                        self: "×",
                      },
                      { item: "コスト効率", us: "◎", general: "○", self: "△" },
                      { item: "品質保証", us: "◎", general: "○", self: "△" },
                      { item: "特殊汚れ対応", us: "◎", general: "△", self: "×" },
                      {
                        item: "スタッフ負担軽減",
                        us: "◎",
                        general: "○",
                        self: "×",
                      },
                    ].map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {row.item}
                        </td>
                        <td className="px-6 py-4 text-center text-green-600 font-bold text-xl bg-green-50">
                          {row.us}
                        </td>
                        <td className="px-6 py-4 text-center text-yellow-600 font-bold text-xl">
                          {row.general}
                        </td>
                        <td className="px-6 py-4 text-center text-red-600 font-bold text-xl">
                          {row.self}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-blue-50 p-4 border-t">
                <div className="flex justify-center space-x-8 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 font-bold text-lg">◎</span>
                    <span className="text-gray-600">優秀</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-600 font-bold text-lg">
                      ○
                    </span>
                    <span className="text-gray-600">良好</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-600 font-bold text-lg">
                      △
                    </span>
                    <span className="text-gray-600">普通</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600 font-bold text-lg">×</span>
                    <span className="text-gray-600">対応不可</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
      {/* 🎯 お客様の声セクション - 確実に表示されるバージョン */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4 inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              お客様の声
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              神奈川県の医療現場から
              <span className="text-yellow-600">喜びの声</span>
              をいただいています
            </h2>
            <p className="text-xl text-gray-600">
              実際にご利用いただいているお客様からの評価
            </p>
          </div>
          {/* 🌟 お客様の声カード */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-yellow-50 border-yellow-200 border rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-lg">★★★★★</span>
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "スタッフ全員の白衣管理が大幅に楽になりました。品質も申し分なく、特に襟汚れの落ち具合には驚いています。集配サービスも助かっています。"
              </p>
              <div className="border-t border-yellow-200 pt-4">
                <p className="font-semibold text-gray-900">看護師長</p>
                <p className="text-sm text-gray-600">総合病院</p>
              </div>
            </div>
            <div className="p-6 bg-yellow-50 border-yellow-200 border rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-lg">★★★★★</span>
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "1着から対応してくれるので、個人経営でも気軽に利用できます。料金も明確で、仕上がりの品質を考えるとコストパフォーマンスが
                excellent です。"
              </p>
              <div className="border-t border-yellow-200 pt-4">
                <p className="font-semibold text-gray-900">薬剤師</p>
                <p className="text-sm text-gray-600">調剤薬局</p>
              </div>
            </div>
            <div className="p-6 bg-yellow-50 border-yellow-200 border rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-lg">★★★★★</span>
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "特殊な素材のウェアも丁寧に仕上げてくれます。以前は自分で洗濯していましたが、プロの仕上がりは全然違います。時間も節約できて一石二鳥です。"
              </p>
              <div className="border-t border-yellow-200 pt-4">
                <p className="font-semibold text-gray-900">理学療法士</p>
                <p className="text-sm text-gray-600">リハビリセンター</p>
              </div>
            </div>
          </div>
          {/* 📊 満足度統計 */}
          <div className="text-center">
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                📊 お客様満足度
              </h3>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-700">98%</div>
                  <div className="text-sm text-yellow-600">満足度</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-700">0%</div>
                  <div className="text-sm text-yellow-600">解約率</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-700">150+</div>
                  <div className="text-sm text-yellow-600">取引先</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SDGs Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-800">
              SDGs・サステナブル
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              環境に優しく、働き方改革にも貢献
            </h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    エコ包装・環境配慮
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    生分解性包装材を使用し、環境負荷を最小限に抑制
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    働き方改革支援
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    スタッフの負担軽減で、本来の医療業務に集中できる環境を提供
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    品質管理体制
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    プロの技術と最新設備で高品質なクリーニングを提供
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/medical-uniforms-collection.png"
                alt="環境に配慮した多様な医療用ユニフォーム"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Craftsman Skills Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-orange-100 text-orange-800">
              職人の技術
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              熟練職人による
              <span className="text-orange-600">手仕上げクリーニング</span>
            </h2>
            <p className="text-xl text-gray-600">
              機械では落とせない頑固な汚れも、職人の技術で新品同様の仕上がりに
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <Image
                  src="/images/collar-cleaning-comparison.jpg"
                  alt="クリーニング前後の襟汚れ比較 - 職人技術による劇的な変化"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="bg-orange-100 rounded-full p-2">
                      <Award className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        職人技術
                      </p>
                      <p className="text-xs text-gray-600">手仕上げ専門</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  経験豊富な職人が一着一着丁寧に仕上げます
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  当社では手仕上げクリーニングをメインとし、長年の経験を積んだ熟練職人が洗いから仕上げまで全工程を担当。
                  機械だけでは落とせない頑固な襟汚れや袖口の黄ばみも、職人の技術と専用洗剤で新品同様の白さを取り戻します。
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      熟練職人による手作業
                    </h4>
                    <p className="text-gray-600">
                      20年以上の経験を持つ職人が、一着一着の状態を見極めて最適な処理を行います
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      専用洗剤と技術の融合
                    </h4>
                    <p className="text-gray-600">
                      医療現場特有の汚れに対応した専用洗剤と、職人の手技を組み合わせた独自の洗浄方法
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      品質保証と仕上がり確認
                    </h4>
                    <p className="text-gray-600">
                      納品前に職人が一着ずつ仕上がりを確認。満足いただけない場合は無料で再仕上げいたします
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-orange-800 mb-2">
                  🏆 職人からのメッセージ
                </h4>
                <p className="text-orange-700 italic">
                  「医療現場で働く皆様の大切な白衣を、新品同様の美しさでお返しすることが私たちの誇りです。
                  どんなに頑固な汚れでも、必ず綺麗にしてみせます。」
                </p>
                <p className="text-sm text-orange-600 mt-2 font-medium">
                  - クリーニング職人 田中
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-indigo-100 text-indigo-800">
              よくあるご質問
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              よくあるご質問
            </h2>
            <p className="text-xl text-gray-600">
              お客様からよくいただくご質問にお答えします
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Collapsible
                  open={openFaq === index}
                  onOpenChange={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                >
                  <CollapsibleTrigger asChild>
                    <Card className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 text-left">
                          {faq.question}
                        </h3>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            openFaq === index ? "transform rotate-180" : ""
                          }`}
                        />
                      </div>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="mt-2 p-6 bg-blue-50 border-blue-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                💬 その他のご質問
              </h3>
              <p className="text-blue-700 mb-4">
                上記以外にもご不明な点がございましたら、お気軽にお問い合わせください。
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                お問い合わせする
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Contact Form */}
      <section id="contact" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              お問い合わせ
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              無料見積り・お問い合わせ
            </h2>
            <p className="text-xl text-gray-600">
              24時間受付中！メール・お電話でお気軽にご相談ください
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <div className="text-center mb-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    📧 24時間受付中！お気軽にお問い合わせください
                  </h3>
                  <p className="text-green-700 text-sm">
                    フォーム送信後、24時間以内にご連絡いたします。
                    <br />
                    お急ぎの方はお電話でも承っております。
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">ご担当者名 *</Label>
                      <Input id="name" name="name" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="facility">施設名 *</Label>
                      <Input
                        id="facility"
                        name="facility"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">電話番号 *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">メールアドレス *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="service">希望内容</Label>
                    <Select name="service">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trial">無料トライアル体験</SelectItem>
                        <SelectItem value="estimate">見積り依頼</SelectItem>
                        <SelectItem value="regular">定期契約相談</SelectItem>
                        <SelectItem value="other">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">ご質問・ご要望</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-1"
                      placeholder="ご質問やご要望がございましたらお聞かせください"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    {isSubmitting ? "送信中..." : "お問い合わせを送信"}
                  </Button>
                </form>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="p-8 border-2 border-blue-200 bg-blue-50">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    今すぐ電話する！
                  </h3>
                  <p className="text-gray-600 mb-6">
                    お急ぎの方はお電話が一番早いです
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-4"
                    onClick={() => window.open("tel:045-701-6985")}
                  >
                    <Phone className="mr-3 w-6 h-6" />
                    045-701-6985
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    受付時間：平日 9:00-17:00
                  </p>
                </div>
              </Card>
              <Card className="p-8 bg-green-50 border-2 border-green-200">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    メールで相談！
                  </h3>
                  <p className="text-gray-600 mb-6">24時間いつでも受付中</p>
                  <Button
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-4"
                    onClick={() =>
                      window.open("mailto:shimoda@wbrownie.com")
                    }
                  >
                    <Mail className="mr-3 w-6 h-6" />
                    メール送信
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    24時間以内に返信いたします
                  </p>
                </div>
              </Card>
              <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  📍 対応エリア
                </h3>
                <h4 className="font-semibold text-gray-800 mb-2">
                  神奈川県全域
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {[
                    "青葉区",
                    "旭区",
                    "泉区",
                    "磯子区",
                    "神奈川区",
                    "金沢区",
                    "港南区",
                    "港北区",
                    "栄区",
                    "瀬谷区",
                    "都筑区",
                    "鶴見区",
                    "戸塚区",
                    "中区",
                    "西区",
                    "保土ケ谷区",
                    "緑区",
                    "南区",
                  ].map((area, index) => (
                    <span key={index}>{area}</span>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">合同会社渡邊商会</h3>
              <p className="text-gray-300 mb-4">
                神奈川県の医療現場に特化したプロフェッショナルクリーニングサービス
              </p>
              <p className="text-gray-400 text-sm">
                住所：横浜市都筑区牛久保東1-33-44
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">サービス</h4>
              <ul className="space-y-2 text-gray-300">
                <li>医療白衣クリーニング</li>
                <li>スクラブクリーニング</li>
                <li>理学療法士ウェア</li>
                <li>検診着クリーニング</li>
                <li>ケアウェアクリーニング</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>045-701-6985</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>shimoda@wbrownie.com</span>
                </div>
                <p>営業時間: 平日9:00〜17:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 合同会社渡邊商会. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
