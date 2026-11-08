import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Coffee,
  Utensils,
  Wine,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Navigation,
  Heart,
  ChevronDown,
  Check,
  ExternalLink,
  MessageCircle,
  Croissant,
  Sun
} from 'lucide-react'

// Custom Instagram SVG icon
function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const mainRef = useRef(null)
  const heroRef = useRef(null)
  const philosophyRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenuTab, setActiveMenuTab] = useState('colazione')
  const [isOpenNow, setIsOpenNow] = useState(false)
  const [currentDaySchedule, setCurrentDaySchedule] = useState('')

  // Check opening status in real time
  useEffect(() => {
    const updateOpeningStatus = () => {
      const now = new Date()
      const day = now.getDay() // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const hour = now.getHours()
      const minute = now.getMinutes()
      const currentTime = hour * 60 + minute

      let open = false
      let scheduleText = ''

      if (day === 1) {
        // Lunedì 06:00 - 15:00
        scheduleText = 'Lunedì: 06:00 - 15:00'
        if (currentTime >= 6 * 60 && currentTime < 15 * 60) open = true
      } else if (day >= 2 && day <= 5) {
        // Martedì - Venerdì 06:00 - 21:00
        const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
        scheduleText = `${days[day]}: 06:00 - 21:00`
        if (currentTime >= 6 * 60 && currentTime < 21 * 60) open = true
      } else if (day === 6) {
        // Sabato 06:00 - 13:00
        scheduleText = 'Sabato: 06:00 - 13:00'
        if (currentTime >= 6 * 60 && currentTime < 13 * 60) open = true
      } else if (day === 0) {
        // Domenica 07:00 - 13:00
        scheduleText = 'Domenica: 07:00 - 13:00'
        if (currentTime >= 7 * 60 && currentTime < 13 * 60) open = true
      }

      setIsOpenNow(open)
      setCurrentDaySchedule(scheduleText)
    }

    updateOpeningStatus()
    const timer = setInterval(updateOpeningStatus, 60000)
    return () => clearInterval(timer)
  }, [])

  // Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP Animations with context cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero subtle fade-up
      gsap.from('.hero-fade', {
        opacity: 0,
        y: 35,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power2.out',
      })

      // Value Section fade-in & reveal
      gsap.from('.valore-card', {
        scrollTrigger: {
          trigger: '#valore-section',
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power2.out',
      })

      // Philosophy word-by-word reveal
      const words = philosophyRef.current?.querySelectorAll('.philosophy-word')
      if (words && words.length > 0) {
        gsap.from(words, {
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 75%',
          },
          opacity: 0.15,
          y: 8,
          stagger: 0.04,
          duration: 0.6,
          ease: 'power2.out',
        })
      }

      // Method Card scroll stacking
      const methodCards = gsap.utils.toArray('.method-stack-card')
      methodCards.forEach((card, index) => {
        if (index < methodCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 20%',
            endTrigger: methodCards[index + 1],
            end: 'top 20%',
            onEnter: () => {
              gsap.to(card, {
                scale: 0.95,
                opacity: 0.7,
                duration: 0.4,
                ease: 'power2.out',
              })
            },
            onLeaveBack: () => {
              gsap.to(card, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
              })
            },
          })
        }
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  // Directions Link to Piazza Fonteiana, 2
  const mapsUrl = "https://maps.app.goo.gl/DNq2xNgqnvytHXGm6"
  const phoneCall = "tel:+393382615950"
  const whatsappUrl = "https://wa.me/393382615950?text=Buongiorno%20Primo%20Piano,%20vorrei%20informazioni%20o%20riservare%20un%20tavolo."

  // Menu Categories
  const menuCategories = {
    colazione: [
      {
        nome: "Cornetti Artigianali a Sfoglia",
        desc: "Sfoglia croccante e cuore morbido farcito al momento (crema pasticcera, cioccolato, pistacchio o confetture).",
        badge: "Fornitura Quotidiana",
        prezzo: "€ 1,50 - 1,80"
      },
      {
        nome: "Selezione Dedicata Vegana",
        desc: "Croissant e fagottini 100% vegetali con farciture ai frutti di bosco o cereali antichi.",
        badge: "100% Vegan",
        prezzo: "€ 1,60"
      },
      {
        nome: "Pasticceria Fresca & Mignon",
        desc: "Piccoli capolavori di dolcezza, tartellette alla frutta fresca, bignè e torte casalinghe del giorno.",
        badge: "Specialità",
        prezzo: "Al pezzo / All'etto"
      },
      {
        nome: "Pancakes Preparati al Momento",
        desc: "Soffici e golosi, serviti caldi con sciroppo d'acero, miele o crema alle nocciole per una colazione rilassata.",
        badge: "Espresso",
        prezzo: "€ 4,50"
      }
    ],
    pranzo: [
      {
        nome: "I Primi Piatti della Tradizione",
        desc: "Primi sempre caldi preparati freschi ogni mattina: cacio e pepe, amatriciana, lasagne e pasta fresca.",
        badge: "Tavola Calda",
        prezzo: "Piatti del Giorno"
      },
      {
        nome: "Secondi Piatti e Carni Scelte",
        desc: "Arrosti morbidi, polpette al sugo come a casa, cotolette dorate e opzioni leggere di pesce.",
        badge: "Espresso & Caldo",
        prezzo: "Piatti del Giorno"
      },
      {
        nome: "Contorni di Stagione",
        desc: "Verdure ripassate alla romana, patate al forno profumate al rosmarino e insalate fresche composte.",
        badge: "Genuinità",
        prezzo: "Contorni freschi"
      }
    ],
    forno: [
      {
        nome: "Pizzette Tonne Romane",
        desc: "La classica pizzetta da bar capitolina con impasto croccante e saporito, rossa o marinara.",
        badge: "Forno Autentico",
        prezzo: "Sempre Calde"
      },
      {
        nome: "Focacce Caserecce Ripiene",
        desc: "Focaccia alta e soffice farcita con mortadella, crudo di Parma o verdure grigliate.",
        badge: "Casereccio",
        prezzo: "Al trancio"
      },
      {
        nome: "I Grandi Tramezzini",
        desc: "Il re dello spuntino: pane morbidissimo e farciture ricche preparate al mattino presto.",
        badge: "Freschezza Quotidiana",
        prezzo: "Vari gusti"
      }
    ],
    aperitivo: [
      {
        nome: "Calici di Vini Locali & Nazionali",
        desc: "Una curata selezione di etichette dei Castelli Romani, del Lazio e delle migliori cantine italiane.",
        badge: "Enoteca",
        prezzo: "Al calice o bottiglia"
      },
      {
        nome: "Spritz & Signature Cocktail",
        desc: "Aperol o Campari Spritz preparati a regola d'arte, Americano e rinfrescanti miscele serali.",
        badge: "Happy Hour",
        prezzo: "Con stuzzichini"
      },
      {
        nome: "Tagliere Casereccio Primo Piano",
        desc: "Pizzette calde, sfoglie salate, salumi affettati, formaggi e focaccia casereccia serviti al tavolo.",
        badge: "Da Condividere",
        prezzo: "Incluso con aperitivo"
      }
    ]
  }

  // Reviews from real customers on Google Maps
  const reviews = [
    {
      autore: "Paolo F.",
      ruolo: "Cliente abituale",
      testo: "Io ed il mio amico facciamo colazione ogni mattina qui prima di scuola. Il posto è tranquillo ed accogliente, la musica perfetta per creare un'atmosfera piacevole, servizio e colazione ottimi. Consiglio davvero di provarlo.",
      voto: 5
    },
    {
      autore: "Marco R.",
      ruolo: "Recensione Google Maps",
      testo: "Atmosfera semplice ma autenticamente accogliente; il caffè qui è sempre perfetto e la pasticceria freschissima. Un punto di riferimento vero a Monteverde.",
      voto: 5
    },
    {
      autore: "Lia B.",
      ruolo: "Recensione Google Maps",
      testo: "Ottimi aperitivi serviti con gentilezza e stuzzichini caserecci. Personale sempre col sorriso, ci si sente a casa fin dal primo istante.",
      voto: 5
    }
  ]

  const orariSettimanali = [
    { giorno: "Lunedì", ore: "06:00 – 15:00", attivo: new Date().getDay() === 1 },
    { giorno: "Martedì", ore: "06:00 – 21:00", attivo: new Date().getDay() === 2 },
    { giorno: "Mercoledì", ore: "06:00 – 21:00", attivo: new Date().getDay() === 3 },
    { giorno: "Giovedì", ore: "06:00 – 21:00", attivo: new Date().getDay() === 4 },
    { giorno: "Venerdì", ore: "06:00 – 21:00", attivo: new Date().getDay() === 5 },
    { giorno: "Sabato", ore: "06:00 – 13:00", attivo: new Date().getDay() === 6 },
    { giorno: "Domenica", ore: "07:00 – 13:00", attivo: new Date().getDay() === 0 },
  ]

  return (
    <div ref={mainRef} className="relative min-h-screen bg-cream text-charcoal overflow-x-hidden">

      {/* ========================================================
          A. NAVBAR — "Floating Presence"
          Fixed, centered, transparent over hero -> bg-[background]/80 backdrop-blur-lg on scroll
         ======================================================== */}
      <header className="fixed top-0 inset-x-0 z-40 px-4 pt-4 md:pt-6 pointer-events-none transition-all duration-300">
        <nav
          className={`pointer-events-auto max-w-5xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500 ${
            isScrolled
              ? 'bg-[#F4EFEA]/85 backdrop-blur-lg border border-warmBrown/10 shadow-soft'
              : 'bg-charcoal/20 backdrop-blur-md border border-white/10 text-white'
          }`}
        >
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-serif font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300">
              PRIM<span className="text-gold">1º</span> PIANO
            </span>
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-current/20 opacity-80">
              Bistrot
            </span>
          </a>

          {/* 3 Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#valore-section"
              className={`nav-link font-medium ${isScrolled ? 'text-charcoal hover:text-warmBrown' : 'text-cream/90 hover:text-white'}`}
            >
              Specialità
            </a>
            <a
              href="#filosofia-section"
              className={`nav-link font-medium ${isScrolled ? 'text-charcoal hover:text-warmBrown' : 'text-cream/90 hover:text-white'}`}
            >
              Filosofia
            </a>
            <a
              href="#posizione-section"
              className={`nav-link font-medium ${isScrolled ? 'text-charcoal hover:text-warmBrown' : 'text-cream/90 hover:text-white'}`}
            >
              Dove Siamo
            </a>
          </div>

          {/* Right Action: Live Status Indicator & Primary Action */}
          <div className="flex items-center gap-3">
            {/* Live Indicator Pill */}
            <div className={`hidden lg:flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full ${
              isScrolled ? 'bg-stone-200/60 text-charcoal' : 'bg-black/30 text-cream'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <span>{isOpenNow ? 'Aperto ora' : 'Chiuso'}</span>
            </div>

            {/* Primary CTA (User Action: Raggiungi il locale) */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary text-xs md:text-sm font-semibold shadow-sm ${
                isScrolled
                  ? 'bg-warmBrown text-cream hover:bg-warmBrown-dark'
                  : 'bg-gold text-charcoal hover:bg-gold-light'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Raggiungici</span>
            </a>
          </div>
        </nav>
      </header>


      {/* ========================================================
          B. HERO — "Prima Impressione"
          100dvh, Unsplash warm photo, soft gradient, bold + italic serif, fade-up
         ======================================================== */}
      <section
        ref={heroRef}
        className="relative h-[100dvh] w-full flex items-center justify-center text-center px-4 overflow-hidden"
      >
        {/* Background Image: High-res authentic warm Roman bistrot & outdoor tables mood */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=85"
            alt="Primo Piano Bistrot in Piazza Fonteiana"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-1000"
            style={{ animationDuration: '8s' }}
          />
          {/* Soft atmospheric gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-charcoal/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto pt-20">
          {/* Badge Social Proof */}
          <div className="hero-fade inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cream text-xs md:text-sm font-medium mb-6">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>4.9 su Google Maps</span>
            <span className="opacity-40">|</span>
            <span className="text-gold-light font-semibold">50+ Recensioni</span>
          </div>

          {/* Hero Pattern: [Nome brand] Bold Serif / [Valore distintivo] Italic Serif Grande */}
          <h1 className="hero-fade text-cream font-serif font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none">
            Primo Piano
            <span className="block font-serif italic font-normal text-gold-light text-2xl sm:text-4xl md:text-5xl mt-3 tracking-normal">
              Il calore autentico di Piazza Fonteiana.
            </span>
          </h1>

          {/* Descriptive Subtitle */}
          <p className="hero-fade text-cream/85 text-base sm:text-lg md:text-xl font-light mt-6 max-w-2xl mx-auto leading-relaxed">
            Caffè, bistrot ed enoteca di quartiere. Dalla fragranza dei cornetti artigianali appena sfornati alla tavola calda casereccia, fino all'aperitivo rilassato con i vini del nostro territorio.
          </p>

          {/* Action Button: Raggiungere il locale in 1 tap */}
          <div className="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto bg-gold hover:bg-gold-light text-charcoal font-semibold text-base shadow-warm-lg"
            >
              <Navigation className="w-4 h-4" />
              <span>Calcola Percorso a 1 Tap</span>
            </a>

            <a
              href="#valore-section"
              className="btn-primary w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-cream border border-white/20 text-base"
            >
              <span>Scopri le Nostre Specialità</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Micro Address Callout */}
          <div className="hero-fade mt-8 flex items-center justify-center gap-2 text-cream/70 text-xs sm:text-sm">
            <MapPin className="w-4 h-4 text-gold" />
            <span>Piazza Fonteiana, 2 · 00152 Roma (Monteverde)</span>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none text-cream/60">
          <div className="w-5 h-9 rounded-full border border-cream/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-gold rounded-full animate-bounce" />
          </div>
        </div>
      </section>


      {/* ========================================================
          C. SEZIONE VALORE
          Tre blocchi: 1. Qualità, 2. Metodo (Timeline), 3. Fiducia (Hover highlight + Icona Lucide)
         ======================================================== */}
      <section id="valore-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta">
            I Nostri Punti di Forza
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-warmBrown-dark mt-2 tracking-tight">
            Tre pilastri del nostro bistrot
          </h2>
          <p className="text-charcoal/70 text-base mt-3">
            Nessun compromesso: ogni momento della giornata merita profumi veri e accoglienza genuina.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. QUALITÀ: Descrizione sintetica, micro fade-in */}
          <div className="valore-card card-warm p-8 flex flex-col justify-between hover:border-gold/50 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-warmBrown mb-6 shadow-sm">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-warmBrown-dark mb-3">
                1. Qualità della Materia Prima
              </h3>
              <p className="text-charcoal/80 text-sm leading-relaxed">
                Cornetti a sfoglia croccante preparati ogni notte, opzioni vegane fragranti, pasticceria mignon fresca e torte del giorno. Per la colazione internazionale, i pancake sono cotti espressi sul momento.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200/50 flex items-center gap-2 text-xs font-semibold text-terracotta">
              <Sparkles className="w-4 h-4" />
              <span>Artigianale & Casereccio</span>
            </div>
          </div>

          {/* 2. METODO: Timeline verticale elegante, reveal progressivo allo scroll */}
          <div className="valore-card card-warm p-8 border-warmBrown/20 bg-warmBrown/[0.03]">
            <div className="w-12 h-12 rounded-2xl bg-warmBrown flex items-center justify-center text-cream mb-6 shadow-sm">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-warmBrown-dark mb-4">
              2. Metodo: Il Ritmo del Giorno
            </h3>
            
            {/* Timeline Verticale Elegante */}
            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-warmBrown/20">
              <div className="relative group">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-gold border-2 border-cream" />
                <span className="text-xs font-semibold text-warmBrown uppercase tracking-wider block">
                  Ore 06:00 · Il Risveglio
                </span>
                <p className="text-xs text-charcoal/80 mt-0.5">
                  Lievitati appena sfornati, caffè tostato e profumo di sfoglia in piazza.
                </p>
              </div>

              <div className="relative group">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-terracotta border-2 border-cream" />
                <span className="text-xs font-semibold text-warmBrown uppercase tracking-wider block">
                  Ore 12:30 · La Tavola Calda
                </span>
                <p className="text-xs text-charcoal/80 mt-0.5">
                  Primi romani caldi, secondi caserecci e contorni pronti per una pausa rigenerante.
                </p>
              </div>

              <div className="relative group">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-olive border-2 border-cream" />
                <span className="text-xs font-semibold text-warmBrown uppercase tracking-wider block">
                  Ore 17:30 · L'Enoteca in Piazza
                </span>
                <p className="text-xs text-charcoal/80 mt-0.5">
                  Calici selezionati del territorio, spritz e taglieri serviti all'aperto.
                </p>
              </div>
            </div>
          </div>

          {/* 3. FIDUCIA: Hover con highlight sottile, icona Lucide coerente */}
          <div className="valore-card card-warm p-8 flex flex-col justify-between hover:shadow-warm-lg hover:border-gold/60 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-gold-dark mb-6 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-warmBrown-dark mb-3">
                3. Fiducia & Cordialità
              </h3>
              <p className="text-charcoal/80 text-sm leading-relaxed">
                Il sorriso di Stefano e del nostro team, la musica perfetta in sottofondo e la sicurezza di essere accolti come persone di famiglia. La nostra reputazione è confermata da oltre 50 testimonianze dirette.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-charcoal/70">Media Google</span>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-warmBrown bg-gold/20 px-3 py-1 rounded-full">
                ★ 4.9 / 5.0
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          MENU & SPECIALITÀ INTERATTIVE (Copia Migliorata dei Servizi)
         ======================================================== */}
      <section className="py-20 bg-stone-100/70 border-y border-stone-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-warmBrown">
                I Nostri Sapori
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-warmBrown-dark mt-1">
                La Vetrina di Primo Piano
              </h2>
            </div>
            
            {/* Category Selector Tabs */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0 p-1.5 bg-cream-warm rounded-full border border-stone-200">
              {[
                { id: 'colazione', label: 'Colazioni', icon: Coffee },
                { id: 'pranzo', label: 'Tavola Calda', icon: Utensils },
                { id: 'forno', label: 'Forno & Salato', icon: Sparkles },
                { id: 'aperitivo', label: 'Enoteca & Aperitivi', icon: Wine },
              ].map(tab => {
                const Icon = tab.icon
                const isActive = activeMenuTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveMenuTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-warmBrown text-cream shadow-sm'
                        : 'text-charcoal/70 hover:text-charcoal'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Menu Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuCategories[activeMenuTab].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-xs font-serif font-medium text-warmBrown">
                      {item.prezzo}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-charcoal group-hover:text-warmBrown transition-colors">
                    {item.nome}
                  </h4>
                  <p className="text-charcoal/70 text-sm mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick info note */}
          <div className="mt-8 text-center text-xs text-charcoal/60">
            Disponibilità per ordini da asporto e torte per ricorrenze via WhatsApp al <a href={whatsappUrl} className="underline font-semibold text-warmBrown">+39 338 261 5950</a>
          </div>
        </div>
      </section>


      {/* ========================================================
          D. FILOSOFIA — "Identità"
          Pattern:
          "La maggior parte di [settore] punta su quantità."
          "Noi puntiamo su qualità, relazione e continuità."
          Seconda frase in serif italic grande con parola chiave colore accento.
          Reveal parola per parola con GSAP.
         ======================================================== */}
      <section
        id="filosofia-section"
        ref={philosophyRef}
        className="py-32 px-4 sm:px-6 lg:px-8 bg-charcoal text-cream relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold-light opacity-80 block mb-6">
            La Nostra Identità
          </span>

          {/* Prima frase */}
          <p className="text-lg sm:text-xl md:text-2xl font-light text-cream/70 mb-8 max-w-2xl mx-auto">
            La maggior parte dei bistrot moderni punta sulla velocità e sulla produzione in serie.
          </p>

          {/* Seconda frase: grande serif italic, parola chiave colore accento, reveal parola per parola */}
          <div className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-cream">
            {`Noi puntiamo su qualità artigianale, relazione sincera e continuità del sapore casereccio.`
              .split(' ')
              .map((word, i) => {
                const isHighlight = word.toLowerCase().includes('qualità') || word.toLowerCase().includes('artigianale') || word.toLowerCase().includes('sapore')
                return (
                  <span
                    key={i}
                    className={`philosophy-word inline-block mr-2.5 mb-1 ${
                      isHighlight ? 'text-gold not-italic font-bold' : ''
                    }`}
                  >
                    {word}
                  </span>
                )
              })}
          </div>

          <div className="mt-12 flex items-center justify-center gap-3 text-cream/60 text-sm">
            <span className="h-px w-12 bg-cream/20" />
            <span>Piazza Fonteiana 2, Roma</span>
            <span className="h-px w-12 bg-cream/20" />
          </div>
        </div>
      </section>


      {/* ========================================================
          E. METODO — "Il Nostro Processo"
          Tre step:
          1. Ascolto
          2. Progettazione
          3. Cura continua
          Scroll stacking delicato: card attiva in primo piano, card precedente scala a 0.95 e opacità 0.7.
         ======================================================== */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta">
            Il Nostro Metodo
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-warmBrown-dark mt-2 tracking-tight">
            Come nasce ogni momento a Primo Piano
          </h2>
          <p className="text-charcoal/70 text-sm sm:text-base mt-2">
            La dedizione che trasforma un semplice passaggio al bar in un rito piacevole.
          </p>
        </div>

        <div className="space-y-8 relative">
          {/* STEP 1: Ascolto */}
          <div className="method-stack-card card-warm p-8 md:p-10 sticky top-28 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-3 py-1 rounded-full">
                  Fase 01 · Ascolto
                </span>
                <h3 className="font-serif font-bold text-2xl text-warmBrown-dark mt-4 mb-3">
                  I Desideri del Nostro Quartiere
                </h3>
                <p className="text-charcoal/80 text-base leading-relaxed">
                  Conosciamo per nome chi varca la porta ogni mattina. Ascoltiamo le esigenze dei residenti, dei professionisti e degli studenti, introducendo cornetti vegani, opzioni leggere per la pausa pranzo e dolci personalizzati per ogni ricorrenza.
                </p>
              </div>
              <div className="w-16 h-16 rounded-3xl bg-warmBrown/10 flex items-center justify-center text-warmBrown shrink-0">
                <Heart className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* STEP 2: Progettazione */}
          <div className="method-stack-card card-warm p-8 md:p-10 sticky top-36 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-terracotta bg-terracotta/15 px-3 py-1 rounded-full">
                  Fase 02 · Progettazione & Lavorazione
                </span>
                <h3 className="font-serif font-bold text-2xl text-warmBrown-dark mt-4 mb-3">
                  Mani in Pasta e Cotture Espresse
                </h3>
                <p className="text-charcoal/80 text-base leading-relaxed">
                  Dal laboratorio mattutino per la sfoglia e i tramezzini freschissimi alla cucina che accende i fornelli alle 11:30 per sfornare primi piatti caldi e pietanze tipiche della tradizione casalinga romana.
                </p>
              </div>
              <div className="w-16 h-16 rounded-3xl bg-terracotta/10 flex items-center justify-center text-terracotta shrink-0">
                <Utensils className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* STEP 3: Cura Continua */}
          <div className="method-stack-card card-warm p-8 md:p-10 sticky top-44 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-olive bg-olive/15 px-3 py-1 rounded-full">
                  Fase 03 · Cura Continua
                </span>
                <h3 className="font-serif font-bold text-2xl text-warmBrown-dark mt-4 mb-3">
                  L'Esperienza all'Aperto in Piazza
                </h3>
                <p className="text-charcoal/80 text-base leading-relaxed">
                  Pulizia meticolosa, tavolini esterni sempre curati tra piante aromatiche e il sole di Piazza Fonteiana. Che sia un caffè al volo o un aperitivo lungo un'ora, l'ospitalità resta sempre accogliente e calorosa.
                </p>
              </div>
              <div className="w-16 h-16 rounded-3xl bg-olive/10 flex items-center justify-center text-olive shrink-0">
                <Sun className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          RECENSIONI VERIFICATE GOOGLE MAPS (Social Proof Reale)
         ======================================================== */}
      <section className="py-20 bg-cream-light border-t border-stone-200/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1 text-gold mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-warmBrown-dark">
              Cosa dicono di noi i clienti
            </h3>
            <p className="text-charcoal/70 text-sm mt-1">
              Testimonianze reali verificate su Google Maps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-gold mb-3">
                    {[...Array(rev.voto)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-charcoal/80 text-sm italic leading-relaxed">
                    "{rev.testo}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-sm text-charcoal">{rev.autore}</span>
                    <span className="block text-xs text-charcoal/50">{rev.ruolo}</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Verificata
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================
          POSIZIONE, ORARI DINAMICI & COME RAGGIUNGERCI
         ======================================================== */}
      <section id="posizione-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card Orari Dinamici */}
          <div className="lg:col-span-5 card-warm p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-warmBrown">
                <Clock className="w-5 h-5 text-gold-dark" />
                <h3 className="font-serif font-bold text-xl text-warmBrown-dark">
                  Orari di Apertura
                </h3>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                isOpenNow ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-charcoal/70'
              }`}>
                {isOpenNow ? 'Aperto' : 'Chiuso'}
              </span>
            </div>

            <div className="space-y-2.5">
              {orariSettimanali.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs sm:text-sm transition-colors ${
                    item.attivo
                      ? 'bg-gold/15 font-semibold text-warmBrown-dark border border-gold/30'
                      : 'text-charcoal/80 hover:bg-stone-100/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.attivo && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                    {item.giorno}
                  </span>
                  <span>{item.ore}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-charcoal/60 mt-4 italic">
              * La riga evidenziata indica l'orario del giorno corrente ({currentDaySchedule}).
            </p>
          </div>

          {/* Dettagli Navigazione & Contatti */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-stone-200/70 shadow-soft">
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              Vieni a Trovarci
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-warmBrown-dark mt-1 mb-4">
              Piazza Fonteiana, 2 · Roma
            </h3>
            <p className="text-charcoal/70 text-sm leading-relaxed mb-6">
              Ci trovi in uno degli angoli più suggestivi e tranquilli di Monteverde. I tavolini all'aperto affacciano direttamente sulla piazza, perfetti per godersi il sole e l'aria romana.
            </p>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <a
                href={phoneCall}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-cream hover:bg-cream-warm border border-stone-200/60 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-warmBrown/10 text-warmBrown flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-charcoal/60">Telefono</span>
                  <span className="font-semibold text-xs sm:text-sm text-charcoal">+39 338 261 5950</span>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/60 transition-colors text-emerald-900"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-emerald-700">WhatsApp</span>
                  <span className="font-semibold text-xs sm:text-sm">Scrivici in chat</span>
                </div>
              </a>
            </div>

            {/* Main Navigation Route CTA */}
            <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full bg-warmBrown hover:bg-warmBrown-dark text-cream text-sm font-semibold shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Apri su Google Maps</span>
              </a>

              <a
                href="https://waze.com/ul?q=Piazza%20Fonteiana%202%20Roma"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full bg-stone-100 hover:bg-stone-200 text-charcoal text-sm font-medium border border-stone-200"
              >
                <ExternalLink className="w-4 h-4 text-charcoal/60" />
                <span>Apri su Waze</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          F. CALL TO ACTION FINALE
          Sezione centrale pulita. Titolo: "Vivi l'esperienza."
          Pulsante principale coerente con CTA dell'utente (Raggiungere il locale).
         ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-warmBrown-dark text-cream text-center relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-terracotta/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold-light opacity-90 block mb-3">
            Ti Aspettiamo a Monteverde
          </span>

          <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-cream tracking-tight mb-6">
            Vivi l'esperienza.
          </h2>

          <p className="text-cream/80 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Dalla prima tazzina di caffè al calice di vino al tramonto, c'è sempre un tavolo pronto per te in Piazza Fonteiana.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto bg-gold hover:bg-gold-light text-charcoal font-semibold text-base px-9 py-4 shadow-warm-lg"
            >
              <Navigation className="w-4 h-4" />
              <span>Raggiungi Piazza Fonteiana 2</span>
            </a>

            <a
              href={phoneCall}
              className="btn-primary w-full sm:w-auto bg-white/10 hover:bg-white/20 text-cream border border-white/20 text-base px-8 py-4"
            >
              <Phone className="w-4 h-4" />
              <span>Chiama: +39 338 261 5950</span>
            </a>
          </div>
        </div>
      </section>


      {/* ========================================================
          G. FOOTER
          * Sfondo colore scuro.
          * Nome attività + tagline.
          * Orari.
          * Contatti.
          * Indicatore: "Presenza digitale attiva" con punto verde animato.
         ======================================================== */}
      <footer className="bg-charcoal-dark text-cream/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif font-bold text-2xl text-cream tracking-tight block">
              PRIM<span className="text-gold">1º</span> PIANO
            </span>
            <p className="text-sm text-cream/70 max-w-sm leading-relaxed">
              Un angolo accogliente in Piazza Fonteiana 2, Roma. Pasticceria e cornetti artigianali, tavola calda genuina a pranzo e aperitivi con etichette selezionate.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://www.instagram.com/primopianobistrot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-cream flex items-center justify-center transition-colors"
                title="Seguici su Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-cream flex items-center justify-center transition-colors"
                title="Vedi su Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href={phoneCall}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-cream flex items-center justify-center transition-colors"
                title="Chiama direttamente"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Orari Sintetici */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-gold-light">
              Orari di Servizio
            </h4>
            <div className="text-xs space-y-1.5 text-cream/70">
              <p><strong className="text-cream">Lunedì:</strong> 06:00 – 15:00</p>
              <p><strong className="text-cream">Martedì – Venerdì:</strong> 06:00 – 21:00</p>
              <p><strong className="text-cream">Sabato:</strong> 06:00 – 13:00</p>
              <p><strong className="text-cream">Domenica:</strong> 07:00 – 13:00</p>
            </div>
          </div>

          {/* Contatti */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-gold-light">
              Contatti & Sede
            </h4>
            <div className="text-xs space-y-2 text-cream/70">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>Piazza Fonteiana, 2<br />00152 Roma (RM)</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                <a href={phoneCall} className="hover:text-cream">+39 338 261 5950</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <a href="mailto:stefanocalassi@yahoo.it" className="hover:text-cream">stefanocalassi@yahoo.it</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright + Presenza Digitale Attiva (Obbligatorio da Regola) */}
        <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <div>
            © {new Date().getFullYear()} Primo Piano Bistrot · Tutti i diritti riservati.
          </div>

          {/* Indicatore obbligatorio: Presenza digitale attiva con punto verde animato */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-cream/90 font-medium tracking-wide">
              Presenza digitale attiva
            </span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button on Mobile */}
      <aside aria-label="Contatti rapidi">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
          aria-label="Contattaci su WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </aside>

    </div>
  )
}
