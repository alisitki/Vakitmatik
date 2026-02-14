import type {
  ContactItem,
  FaqItem,
  FeatureItem,
  HeroHighlightItem,
  HeroTypedLine,
  MotionConfig,
  NavItem,
  ShowcaseItem,
  UseCaseItem,
} from "@/types/landing";

export const navItems: NavItem[] = [
  { href: "#urun", label: "Ürün" },
  { href: "#ozellikler", label: "Özellikler" },
  { href: "#urun-deneyimi", label: "Ürün Deneyimi" },
  { href: "#kullanim-alanlari", label: "Kullanım Alanları" },
  { href: "#sss", label: "SSS" },
  { href: "#iletisim", label: "İletişim" },
];

export const heroTypedLines: HeroTypedLine[] = [
  { text: "Vakitmatik ile", className: "line-strong" },
  { text: "vakit bilgisini", className: "line-accent" },
  { text: "tek bakışta yönetin." },
];

export const heroHighlights: HeroHighlightItem[] = [
  {
    title: "Yüksek Okunabilirlik",
    description: "Uzaktan net görünüm sunan güçlü kontrast yaklaşımı.",
  },
  {
    title: "Düzenli Akış",
    description: "Günlük kullanımda karışıklığı azaltan sade panel kurgusu.",
  },
  {
    title: "Saha Uyumlu",
    description: "Cami, mescit ve kurumsal alanlarda pratik kullanım.",
  },
];

export const featureItems: FeatureItem[] = [
  {
    icon: "01",
    title: "Anlık vakit görünürlüğü",
    description: "Önemli vakitleri tek panelde net ve ritmik biçimde sunar.",
  },
  {
    icon: "02",
    title: "Sade görevli yönetimi",
    description: "Teknik bilgi yükünü azaltan pratik menü akışı sağlar.",
  },
  {
    icon: "03",
    title: "Mekan ölçeğine uygun yapı",
    description: "Farklı alanlarda tutarlı görsel hiyerarşiyle çalışır.",
  },
  {
    icon: "04",
    title: "Kararlı çalışma düzeni",
    description: "Uzun süreli açık kullanımda güvenilir performans hedefler.",
  },
  {
    icon: "05",
    title: "Montaj dostu tasarım",
    description: "Kurulum sürecini hızlandıran saha odaklı fiziksel yapı.",
  },
  {
    icon: "06",
    title: "Kurumsal sunuma uygun",
    description: "Toplu kullanım alanlarında profesyonel görünüm üretir.",
  },
];

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "ana-panel",
    title: "Ana Panel Akışı",
    summary: "Günün vakit düzeni tek bakışta anlaşılır bir kompozisyonda sunulur.",
    bullets: [
      "Yüksek kontrastlı tipografi",
      "Mesafe odaklı okunabilirlik",
      "Toplu kullanımda sade görünüm",
    ],
    media: {
      type: "image",
      src: "/images/showcase-main.svg",
      alt: "Vakitmatik ana panel temsil görseli",
    },
  },
  {
    id: "gorevli-akisi",
    title: "Görevli Kontrol Akışı",
    summary: "Temel kontroller hızlı erişim noktalarıyla teknik yükü azaltır.",
    bullets: [
      "Adım adım sade menü",
      "Kısa sürede ayar güncelleme",
      "Operasyonel süreklilik",
    ],
    media: {
      type: "video",
      src: "/videos/showcase-flow.mp4",
      poster: "/images/showcase-flow.svg",
      alt: "Vakitmatik görevli kontrol akışı placeholder medya",
    },
  },
  {
    id: "mekan-senkron",
    title: "Mekan Bazlı Senkron",
    summary: "Farklı kullanım alanlarında aynı tasarım dili ile bütünlük korunur.",
    bullets: [
      "Cami ve mescit uyumu",
      "Kurumsal ibadet alanı desteği",
      "Tutarlı panel deneyimi",
    ],
    media: {
      type: "image",
      src: "/images/showcase-space.svg",
      alt: "Vakitmatik mekan bazlı senkron temsil görseli",
    },
  },
];

export const useCaseItems: UseCaseItem[] = [
  {
    tag: "Cami",
    title: "Cemaat için düzenli yönlendirme",
    description: "Vakit bilgisinin tek noktada toplanmasıyla toplu takip kolaylaşır.",
  },
  {
    tag: "Kurum",
    title: "İbadet alanlarında standart akış",
    description: "Ofis ve kampüslerde tutarlı bilgi ekranı deneyimi oluşturur.",
  },
  {
    tag: "Eğitim",
    title: "Yoğun alanlarda hızlı okuma",
    description: "Öğrenci yoğun mekanlarda görünürlüğü öncelikleyen düzen sunar.",
  },
  {
    tag: "Sosyal",
    title: "Ortak alanlarda net bilgilendirme",
    description: "Karmaşık bilgilendirme yerine sade ve anlaşılır panel akışı sağlar.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Vakitmatik kurulum sonrası sürekli internet ister mi?",
    answer:
      "Hayır. Temel çalışma akışı için sürekli internet bağlantısı zorunlu değildir.",
  },
  {
    question: "Kurulum süreci uzun sürer mi?",
    answer:
      "Montaj alanı hazır olduğunda kurulum kısa sürede tamamlanabilecek şekilde planlanır.",
  },
  {
    question: "Günlük kullanım teknik uzmanlık gerektirir mi?",
    answer:
      "Hayır. Menü akışı görevli kullanımına uygun biçimde sadeleştirilmiştir.",
  },
  {
    question: "Mekan ışığı değiştiğinde okunabilirlik etkilenir mi?",
    answer:
      "Parlaklık ve tipografi yaklaşımı farklı iç mekan koşullarına uyum sağlayacak şekilde tasarlanır.",
  },
];

export const contactItems: ContactItem[] = [
  {
    label: "Telefon",
    value: "+90 (312) 000 00 00",
    href: "tel:+903120000000",
    note: "Hafta içi 09:00 - 18:00",
  },
  {
    label: "E-posta",
    value: "bilgi@vakitmatik.com.tr",
    href: "mailto:bilgi@vakitmatik.com.tr",
    note: "Ürün ve teklif talepleri",
  },
  {
    label: "Adres",
    value: "Ankara / Türkiye",
    note: "Satış ve teknik destek noktası",
  },
];

export const particleConfig: MotionConfig = {
  density: {
    desktop: 200,
    tablet: 130,
    mobile: 70,
  },
  speed: 0.25,
  palette: ["#4285F4", "#EA4335", "#FBBC04", "#34A853", "#A142F4"],
  qualityMode: "adaptive",
};
