import Image from 'next/image';
import { Check, Flame, HeartPulse, ShieldCheck, Sparkles, Truck, WalletCards, MessageCircle } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle'; import OrderForm from '@/components/OrderForm';
const benefits=[['Instant Pain Relief','Targets tight arches, heels and sore toes.',HeartPulse],['Soothing Heat','Warms cold, stiff feet and supports relaxation.',Flame],['Custom Control','Choose from three intensities and deep-kneading modes.',Sparkles],['Easy to Clean','Removable, washable foot covers for hygienic care.',ShieldCheck]];
const pricing=[[1,149999],[2,294999],[3,442999],[5,739999]];
export default function Home(){return <main><header className="sticky top-0 z-40 border-b border-stone-200/70 bg-stone-50/85 backdrop-blur dark:border-white/10 dark:bg-[#07110d]/85"><div className="container-shell flex h-16 items-center justify-between"><a href="#" className="flex items-center gap-2 text-xl font-black"><span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white">J</span>J‑Stores</a><div className="flex items-center gap-3"><ThemeToggle/><a href="#order" className="btn-primary hidden sm:inline-flex">Order Now</a></div></div></header>
<section className="overflow-hidden pt-7 sm:pt-16"><div className="container-shell grid items-center gap-7 sm:gap-10 lg:grid-cols-2"><div><span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900 sm:px-4 sm:py-2 sm:text-sm"><Flame size={16}/>30-Day Promo</span><h1 className="mt-4 text-[2.5rem] font-black leading-[1.02] tracking-tight sm:mt-5 sm:text-6xl">15 Minutes to Feet That Feel Brand New.</h1><p className="mt-4 max-w-xl text-base leading-7 opacity-75 sm:mt-5 sm:text-lg sm:leading-8">Melt away daily stress and heel discomfort with deep Shiatsu kneading and soothing heat therapy.</p><div className="mt-6 grid grid-cols-2 gap-3 sm:mt-7 sm:flex sm:flex-wrap"><a href="#order" className="btn-primary px-3 sm:px-6">Order Now</a><a href="https://wa.me/2349071298919?text=Hello%20J-Stores%2C%20I%20want%20to%20order%20the%20Foot%20Massager" className="btn border border-stone-300 px-3 dark:border-white/15 sm:px-6"><MessageCircle className="mr-2" size={18}/>WhatsApp</a></div><div className="mt-5 grid grid-cols-2 gap-3 text-xs font-semibold sm:mt-6 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3 sm:text-sm"><span className="flex items-start gap-2"><Truck size={18} className="shrink-0 text-emerald-600"/>Free doorstep delivery</span><span className="flex items-start gap-2"><WalletCards size={18} className="shrink-0 text-emerald-600"/>Payment on delivery</span></div></div><div className="relative"><div className="absolute inset-8 -z-10 rounded-full bg-emerald-400/20 blur-3xl"/><Image src="/products/product-1.png" width={1208} height={724} priority sizes="(max-width: 1023px) 100vw, 50vw" alt="J-Stores foot massager" className="w-full rounded-2xl shadow-glow sm:rounded-[2rem]"/></div></div></section>
<section className="section"><div className="container-shell"><div className="max-w-2xl"><p className="font-bold text-emerald-600">WHY PEOPLE LOVE IT</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">Why everyone is going for the ultimate foot massager</h2></div><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{benefits.map(([t,d,I]:any)=><article key={t} className="card p-6"><I className="text-emerald-600"/><h3 className="mt-5 text-xl font-bold">{t}</h3><p className="mt-2 opacity-70">{d}</p></article>)}</div></div></section>
<section className="section bg-stone-900 text-white dark:bg-black/30"><div className="container-shell grid gap-10 lg:grid-cols-2 lg:items-center"><div className="aspect-video overflow-hidden rounded-3xl"><iframe className="h-full w-full" src="https://www.youtube.com/embed/4ogQOhOEdhg" title="Foot Massager demonstration" allowFullScreen loading="lazy"/></div><div><p className="font-bold text-emerald-400">SEE IT IN ACTION</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">Relax while the massager does the work</h2><ul className="mt-6 space-y-4">{['Deep kneading massage','Optional soothing heat','Three intensity settings','Automatic 15-minute session'].map(x=><li key={x} className="flex gap-3"><Check className="text-emerald-400"/>{x}</li>)}</ul></div></div></section>
<section className="section"><div className="container-shell"><div className="text-center"><p className="font-bold text-emerald-600">HOW IT WORKS</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">Relief in 3 easy steps</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{[['01','Plug In & Slip In','Comfortably fits a wide range of foot sizes.'],['02','Select Your Mode','Choose your preferred heat and massage intensity.'],['03','Sit Back & Rest','The automatic 15-minute session handles the rest.']].map(x=><article className="card p-7" key={x[0]}><span className="text-4xl font-black text-emerald-600">{x[0]}</span><h3 className="mt-5 text-xl font-bold">{x[1]}</h3><p className="mt-2 opacity-70">{x[2]}</p></article>)}</div></div></section>
<section className="section"><div className="container-shell"><div className="grid gap-5 md:grid-cols-3">{[2,7,13].map((n,i)=><Image key={n} src={`/products/product-${n}.png`} width={800} height={700} alt={`Foot massager feature ${i+1}`} className="card h-full w-full object-cover"/>)}</div></div></section>
<section className="section bg-emerald-950 text-white"><div className="container-shell"><div className="text-center"><p className="font-bold text-emerald-300">30-DAY PROMO</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">Choose your package</h2><p className="mt-3 opacity-75">Original single-unit price: <s>₦210,000</s></p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{pricing.map(([q, p]) => {
  const originalPrice = q * 210000;

  return (
    <article
      key={q}
      className="rounded-3xl bg-white p-6 text-stone-900"
    >
      <p className="font-bold">
        {q} Foot Massager{q > 1 ? 's' : ''}
      </p>

      <p className="mt-4 text-lg text-stone-400 line-through">
        ₦{originalPrice.toLocaleString()}
      </p>

      <p className="text-3xl font-black text-emerald-700">
        ₦{p.toLocaleString()}
      </p>

      <p className="mt-2 text-sm text-stone-500">
        Free delivery • Pay on delivery
      </p>

      <a href="#order" className="btn-primary mt-6 w-full">
        Order Now
      </a>
    </article>
  );
})}</div></div></section>
<section id="order" className="section"><div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div className="lg:sticky lg:top-24"><p className="font-bold text-emerald-600">GIVE YOUR FEET RELIEF</p><h2 className="mt-2 text-4xl font-black">Place your order in less than 2 minutes.</h2><div className="mt-6 space-y-4">{[['Free nationwide delivery',Truck],['Payment on delivery',WalletCards],['30-day replacement for confirmed manufacturing defects',ShieldCheck]].map(([x,I]:any)=><div key={x} className="flex gap-3"><I className="text-emerald-600"/><span>{x}</span></div>)}</div><p className="mt-6 text-sm opacity-65">Replacement applies where the product has not been tampered with, misused or physically damaged.</p></div><OrderForm/></div></section>
<footer className="border-t border-stone-200 py-10 dark:border-white/10"><div className="container-shell grid gap-5 sm:grid-cols-2 sm:items-end"><div><p>© 2026 J-Stores. All Rights Reserved.</p><p className="mt-2 text-sm opacity-70">admin@jstores.com.ng • +234 907 129 8919</p></div><nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:justify-end"><a href="/privacy">Privacy</a><a href="/delivery">Delivery</a><a href="/replacement">Replacement</a><a href="/terms">Terms</a></nav></div></footer>
<a aria-label="Chat on WhatsApp" href="https://wa.me/2349071298919?text=Hello%20J-Stores%2C%20I%20want%20to%20order%20the%20Foot%20Massager" className="fixed bottom-20 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white shadow-xl sm:bottom-6"><MessageCircle/></a><div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t bg-white p-3 dark:border-white/10 dark:bg-[#07110d] sm:hidden"><div><p className="text-xs opacity-60">Promo price</p><strong>₦149,999</strong></div><a href="#order" className="btn-primary py-2.5">Order Now</a></div></main>}
