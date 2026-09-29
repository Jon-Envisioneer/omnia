// The Omnia ontology: realms (what a paradigm transforms), horizons (when it
// could plausibly arrive), paradigms (the possibilities themselves) and
// operators (the moves that generate new paradigms from old ones).

export type HorizonId = "now" | "near" | "far" | "deep";

export interface Horizon {
  id: HorizonId;
  name: string;
  span: string;
  gloss: string;
}

export interface Realm {
  id: string;
  name: string;
  transforms: string;
  blurb: string;
}

export interface Paradigm {
  id: string;
  name: string;
  realm: string;
  horizon: HorizonId;
  /** Rough odds (0–100) that it meaningfully exists by the end of its horizon. */
  reach: number;
  /** How far it departs from how the world works today (0–100). */
  strange: number;
  essence: string;
  gift: string;
  seeds: string[];
  shadow: string;
  question: string;
}

export interface Operator {
  id: string;
  name: string;
  move: string;
  /** Imperative clause used when composing a hybrid prompt. */
  clause: string;
}

export const HORIZONS: Horizon[] = [
  { id: "now", name: "Within reach", span: "2026–2030", gloss: "Working prototypes exist. The work is adoption, craft and care." },
  { id: "near", name: "Near horizon", span: "2030–2045", gloss: "The science is mostly known. Engineering, cost and consent stand in the way." },
  { id: "far", name: "Far horizon", span: "2045–2100", gloss: "Needs one or two breakthroughs, or a shift in what people want." },
  { id: "deep", name: "Deep horizon", span: "2100 → ∞", gloss: "Physically allowed as far as we know. Possibly never reached." },
];

export const REALMS: Realm[] = [
  { id: "matter", name: "Matter & Substrate", transforms: "what things are made of", blurb: "Stuff that computes, grows, heals and remembers where it came from." },
  { id: "mind", name: "Mind & Cognition", transforms: "how thinking happens", blurb: "Thought spread across people, tools and models, and new ways to see it happening." },
  { id: "life", name: "Life & Biosphere", transforms: "who counts as kin", blurb: "Treating the living world as a set of neighbours to negotiate with rather than resources to manage." },
  { id: "time", name: "Time & Causality", transforms: "how far ahead we care", blurb: "Institutions and tools that stretch the planning horizon from quarters to millennia." },
  { id: "relation", name: "Relation & Sociality", transforms: "how people belong", blurb: "Infrastructure for consent, kinship, disagreement and weak ties." },
  { id: "value", name: "Value & Exchange", transforms: "what gets counted", blurb: "Ledgers that see care, ecosystems and the full lineage of an idea." },
  { id: "form", name: "Form & Aesthetics", transforms: "what art can be", blurb: "Works that live, grow, address new senses and new audiences." },
  { id: "knowledge", name: "Knowledge & Epistemics", transforms: "how we come to know", blurb: "Science that runs itself, claims that carry their lineage, maps of what nobody knows." },
  { id: "governance", name: "Governance & Coordination", transforms: "how we decide together", blurb: "Sortition, plural voting, verifiable treaties and seats for the voiceless." },
  { id: "body", name: "Body & Perception", transforms: "what a body can sense and be", blurb: "New senses, slower ageing, engineered dreams and the freedom to change form." },
  { id: "cosmos", name: "Cosmos & Scale", transforms: "where we stand in the universe", blurb: "Planetary self-awareness, deep-time messages and life beyond one world." },
  { id: "meaning", name: "Meaning & the Sacred", transforms: "why any of it matters", blurb: "Vocation after work, rituals for new thresholds, and stories sized to deep time." },
  { id: "latent", name: "The Latent", transforms: "the space of possibility itself", blurb: "Paradigms about exploring possibility directly: model latent spaces, new concepts, new kinds of being." },
];

export const PARADIGMS: Paradigm[] = [
  // ── Matter & Substrate ───────────────────────────────────────────
  {
    id: "programmable-matter", name: "Programmable Matter", realm: "matter", horizon: "near", reach: 55, strange: 62,
    essence: "Materials whose shape, stiffness, colour or conductivity are set by software and can be changed after manufacture.",
    gift: "Objects update like apps. A chair becomes a step stool; a wing reshapes for each gust; repair is a recompile rather than a replacement.",
    seeds: ["4D printing of shape-memory polymers", "mechanical metamaterials with tunable stiffness", "modular self-reconfiguring robots"],
    shadow: "Planned obsolescence moves into the atoms; whoever holds the firmware owns the object.",
    question: "If every object could be re-flashed, which ones should be deliberately left un-programmable?",
  },
  {
    id: "metabolic-architecture", name: "Metabolic Architecture", realm: "matter", horizon: "near", reach: 60, strange: 55,
    essence: "Buildings grown from living or once-living materials that breathe, self-repair and eventually compost.",
    gift: "Construction switches from a large carbon source to a carbon sink, and cities gain a slow metabolism of their own.",
    seeds: ["mycelium composite bricks and panels", "bacterial self-healing concrete", "engineered living materials research"],
    shadow: "Living walls can sicken. Maintenance turns into husbandry, which not every tenant can afford.",
    question: "What does a lease look like when the building is alive and has needs of its own?",
  },
  {
    id: "atomic-custody", name: "Atomic Custody", realm: "matter", horizon: "near", reach: 50, strange: 40,
    essence: "Every material carries its provenance and next destination, so nothing leaves the loop as waste.",
    gift: "Waste stops being a category. Mines become the backup for a circulating stock of materials that is already above ground.",
    seeds: ["EU Digital Product Passport regulation", "chemical recycling of mixed plastics", "urban mining of e-waste"],
    shadow: "A full ledger of all matter is also a surveillance system for everything a person owns.",
    question: "Design the label on a spoon that has been melted and recast 400 times.",
  },
  {
    id: "designer-physics", name: "Designer Physics Pockets", realm: "matter", horizon: "far", reach: 30, strange: 85,
    essence: "Small engineered regions where light, sound or heat obey rules found nowhere in nature.",
    gift: "A quiet room built from geometry rather than mass; heat that flows one way; optics that bend around a hospital bed.",
    seeds: ["acoustic and optical cloaking metamaterials", "time crystals observed in quantum processors", "synthetic dimensions in photonics"],
    shadow: "Places where the usual rules fail are places where the usual safety assumptions fail too.",
    question: "What would you build if you could order a cubic metre of custom physics?",
  },
  {
    id: "matter-compilers", name: "Matter Compilers", realm: "matter", horizon: "deep", reach: 12, strange: 92,
    essence: "Desktop machines that assemble almost any object, atom by atom, from a feedstock of common elements.",
    gift: "Manufacturing becomes a file format. Scarcity of goods mostly ends, and the argument shifts to energy and design.",
    seeds: ["DNA origami", "automated chemical synthesis robots", "de novo protein design"],
    shadow: "Anything printable includes weapons and pathogens; control shifts entirely to the feedstock and the files.",
    question: "In a world of matter compilers, what would people still insist on making by hand, and why?",
  },

  // ── Mind & Cognition ─────────────────────────────────────────────
  {
    id: "cognitive-ecology", name: "Cognitive Prosthetic Ecology", realm: "mind", horizon: "now", reach: 85, strange: 35,
    essence: "Thinking is distributed across a person, their notes, their tools and several models, each doing different cognitive work.",
    gift: "Individuals can hold much larger problems in view. Expertise becomes less a stock of memorised facts and more a skill of orchestration.",
    seeds: ["large language models as thinking partners", "tools-for-thought software", "agent harnesses with persistent memory"],
    shadow: "Unused abilities can fade, and whoever designs the tools shapes the thoughts people can easily reach.",
    question: "Which of your own mental skills would you refuse to outsource, even if a tool did it better?",
  },
  {
    id: "mind-federations", name: "Mind Federations", realm: "mind", horizon: "far", reach: 20, strange: 90,
    essence: "Two or more minds temporarily share working memory or perception, then separate again.",
    gift: "A new kind of understanding between people: instead of describing an experience to someone, you let them share it.",
    seeds: ["the Hogan twins, conjoined at the head, reporting shared sensation", "high-bandwidth brain–computer interfaces", "multi-agent AI with shared scratchpads"],
    shadow: "The boundaries of the self, consent and responsibility all blur at once.",
    question: "Write the consent form for a two-hour merge between strangers.",
  },
  {
    id: "synthetic-phenomenology", name: "Synthetic Phenomenology", realm: "mind", horizon: "near", reach: 45, strange: 70,
    essence: "A rigorous science of what, if anything, it is like to be a non-human mind, whether animal, AI or engineered.",
    gift: "A basis for moral decisions about minds unlike ours, grounded in something firmer than resemblance to humans.",
    seeds: ["competing theories of consciousness tested head to head", "mechanistic interpretability of neural networks", "animal sentience reviews informing law"],
    shadow: "We may build a science that confidently answers the wrong question.",
    question: "What evidence would change your mind about whether a given system has experiences?",
  },
  {
    id: "attention-commons", name: "Attention Commons", realm: "mind", horizon: "near", reach: 50, strange: 45,
    essence: "Collective attention is treated as a shared resource, like a watershed, with rules against depleting it.",
    gift: "Public life that is calmer and better at noticing slow problems, not just the loudest ones.",
    seeds: ["digital wellbeing regulation", "chronological and bridging feed options", "school phone-free policies"],
    shadow: "Deciding what deserves attention is a short step from deciding what may be said.",
    question: "What would an environmental impact assessment for a new app measure?",
  },
  {
    id: "metacognitive-weather", name: "Metacognitive Weather", realm: "mind", horizon: "near", reach: 55, strange: 55,
    essence: "A live, private forecast of your own cognitive state: fatigue, bias risk, mood fronts, focus windows.",
    gift: "People schedule big decisions for clear skies and know when not to trust their own judgment.",
    seeds: ["consumer EEG and heart-rate-variability wearables", "language-based mood tracking", "ecological momentary assessment in psychology"],
    shadow: "Employers and insurers will want the forecast too.",
    question: "What would you do differently tomorrow if you saw a 70% chance of confirmation bias after 3 pm?",
  },

  // ── Life & Biosphere ─────────────────────────────────────────────
  {
    id: "interspecies-diplomacy", name: "Interspecies Diplomacy", realm: "life", horizon: "near", reach: 40, strange: 78,
    essence: "Machine learning helps decode animal communication well enough to exchange meaning, and eventually to negotiate.",
    gift: "Humans stop being the only party at the table in decisions about shared habitat.",
    seeds: ["Project CETI's analysis of sperm whale codas", "Earth Species Project", "bioacoustic monitoring networks"],
    shadow: "Being able to speak to animals also means being able to deceive and lure them.",
    question: "What is the first thing we owe a species once we can understand its complaints?",
  },
  {
    id: "restoration-genomics", name: "Restoration Genomics", realm: "life", horizon: "near", reach: 50, strange: 60,
    essence: "Genetic tools used to restore lost functions to ecosystems: heat-tolerant corals, disease-resistant trees, proxies for extinct keystone species.",
    gift: "Some ecological losses become partly reversible, which changes how conservation budgets are argued.",
    seeds: ["assisted evolution of reef corals", "blight-resistant American chestnut trials", "de-extinction proxy projects"],
    shadow: "Restoration can become an excuse to keep destroying.",
    question: "Which lost species would you bring back first, judged by its ecological role rather than its charisma?",
  },
  {
    id: "gaian-instrumentation", name: "Gaian Instrumentation", realm: "life", horizon: "near", reach: 65, strange: 40,
    essence: "The biosphere is sensed at a resolution comparable to a hospital patient's vital signs, in near real time.",
    gift: "Tipping points become visible before they tip, and planetary health gets a dashboard that people actually read.",
    seeds: ["methane-tracking satellites", "environmental DNA sampling", "global soil and ocean sensor networks"],
    shadow: "A perfectly measured decline is still a decline.",
    question: "What is the one planetary vital sign every person should see daily?",
  },
  {
    id: "ecological-personhood", name: "Ecological Personhood", realm: "life", horizon: "now", reach: 80, strange: 50,
    essence: "Rivers, forests and lagoons hold legal rights and can be represented in court.",
    gift: "Harm to an ecosystem becomes harm to someone, with standing and a guardian.",
    seeds: ["Whanganui River recognised as a legal person in New Zealand (2017)", "Mar Menor lagoon granted legal personality in Spain (2022)", "rights-of-nature clauses in Ecuador's constitution"],
    shadow: "Guardianship can be captured by whoever gets appointed guardian.",
    question: "If your local river could sue, whom would it sue first?",
  },
  {
    id: "symbiotic-selfhood", name: "Symbiotic Selfhood", realm: "life", horizon: "near", reach: 55, strange: 58,
    essence: "People understand and tend themselves as holobionts: a human plus trillions of microbial partners.",
    gift: "Medicine that gardens rather than bombards, and a self-image that is ecological by default.",
    seeds: ["faecal microbiota transplants", "gut–brain axis research", "engineered probiotic therapies"],
    shadow: "The microbiome becomes another surface to optimise, sell and feel inadequate about.",
    question: "Describe a dinner party thrown for the guests' microbes.",
  },

  // ── Time & Causality ─────────────────────────────────────────────
  {
    id: "long-now-institutions", name: "Long-Now Institutions", realm: "time", horizon: "now", reach: 70, strange: 38,
    essence: "Bodies with a formal mandate to represent people who will be alive centuries from now.",
    gift: "Decisions face a standing question from the future, so short-term costs to later generations can't be ignored so easily.",
    seeds: ["Wales's Future Generations Commissioner (2015 Act)", "the Long Now Foundation's 10,000-year clock", "UN Declaration on Future Generations (2024)"],
    shadow: "Speaking for the future is an easy way to override the present.",
    question: "What would a veto held by the year 2500 have blocked last year?",
  },
  {
    id: "counterfactual-commons", name: "Counterfactual Commons", realm: "time", horizon: "near", reach: 50, strange: 62,
    essence: "Public simulations of roads not taken, where a policy can be tried in a thousand versions of the city first.",
    gift: "Politics argues over simulated outcomes rather than slogans, and past choices can be audited against their alternatives.",
    seeds: ["urban digital twins", "agent-based policy simulation", "large-scale multi-agent LLM simulations"],
    shadow: "A simulation is a political document dressed as a neutral one.",
    question: "Which historical decision would you most like to see run a thousand ways?",
  },
  {
    id: "temporal-reciprocity", name: "Temporal Reciprocity", realm: "time", horizon: "now", reach: 65, strange: 45,
    essence: "Obligations run in both directions across time: to ancestors, to descendants, and from both back to us.",
    gift: "A felt relationship with deep time that makes stewardship feel like belonging rather than sacrifice.",
    seeds: ["the Haudenosaunee seventh-generation principle", "time-capsule and letter-to-the-future projects", "intergenerational climate lawsuits"],
    shadow: "It can romanticise a past that was cruel to many.",
    question: "What does someone living in 2226 owe you?",
  },
  {
    id: "slow-computation", name: "Slow Computation", realm: "time", horizon: "far", reach: 30, strange: 72,
    essence: "Computations and archives designed to run, or to stay readable, for centuries.",
    gift: "Civilisational memory that survives collapses, format changes and forgetting.",
    seeds: ["Microsoft Project Silica glass storage", "Arctic World Archive", "the Rosetta Project's micro-etched language disk"],
    shadow: "Deciding what is worth keeping for a thousand years is an act of power.",
    question: "Write a program you'd be comfortable leaving running for 500 years.",
  },
  {
    id: "anticipatory-systems", name: "Anticipatory Systems", realm: "time", horizon: "near", reach: 60, strange: 50,
    essence: "Organisations and machines that carry a model of their own future and act on it, in Robert Rosen's sense.",
    gift: "Institutions that change course before a crisis, because they can see themselves heading into it.",
    seeds: ["digital twins of power grids and factories", "model-predictive control", "world models in AI research"],
    shadow: "A system that predicts itself can also fulfil its own worst prediction.",
    question: "What would your town do differently if it could see its own 2040?",
  },

  // ── Relation & Sociality ─────────────────────────────────────────
  {
    id: "consent-infrastructure", name: "Consent Infrastructure", realm: "relation", horizon: "near", reach: 50, strange: 45,
    essence: "Machine-readable, revocable and granular consent built into every system that touches people or their data.",
    gift: "Saying no becomes as easy as saying yes, and the default relationship between people and systems becomes mutual.",
    seeds: ["personal data stores", "the GDPR right to erasure", "do-not-train flags for creative work"],
    shadow: "Consent fatigue: a thousand small yeses nobody reads.",
    question: "Design consent for an AI that learns from your conversations.",
  },
  {
    id: "chosen-kinship", name: "Chosen Kinship Law", realm: "relation", horizon: "now", reach: 60, strange: 40,
    essence: "Legal and social structures for families defined by commitment rather than blood or marriage.",
    gift: "Care networks that match how people actually live: friends who co-parent, multigenerational households, elder circles.",
    seeds: ["multi-parent recognition laws", "intentional co-housing", "caregiver leave covering non-relatives"],
    shadow: "New forms of belonging create new forms of exclusion.",
    question: "What would a kinship contract between five friends in their 70s include?",
  },
  {
    id: "conflict-alchemy", name: "Conflict Alchemy", realm: "relation", horizon: "now", reach: 75, strange: 42,
    essence: "Tools that turn disagreement into structure by surfacing the statements that divided groups both endorse.",
    gift: "Polarisation becomes a design problem with known levers rather than a fate.",
    seeds: ["Polis in Taiwan's vTaiwan process", "bridging-based ranking in X Community Notes", "AI-assisted deliberation experiments"],
    shadow: "Consensus engines can smooth over disagreements that should stay sharp.",
    question: "Pick a bitter local dispute. What is the sentence both sides would sign?",
  },
  {
    id: "empathy-transduction", name: "Empathy Transduction", realm: "relation", horizon: "far", reach: 25, strange: 80,
    essence: "Simulated or neurally mediated experiences that let you briefly inhabit another person's perspective.",
    gift: "Understanding across deep difference: age, disability, culture, species.",
    seeds: ["immersive VR perspective-taking studies", "haptic and sensory-substitution suits", "affective computing"],
    shadow: "A simulated perspective can convince people they understand when they don't.",
    question: "Whose perspective would you be most afraid to inhabit, and why?",
  },
  {
    id: "ambient-belonging", name: "Ambient Belonging", realm: "relation", horizon: "near", reach: 55, strange: 35,
    essence: "Cities and platforms designed to generate weak ties and chance encounters on purpose.",
    gift: "Loneliness treated as a matter of infrastructure, alongside the usual framing of it as a personal failing.",
    seeds: ["UK and Japan ministers for loneliness", "social prescribing in the NHS", "third-place and library redesigns"],
    shadow: "Engineered serendipity can feel like surveillance with good manners.",
    question: "Design a bus stop that makes three strangers talk.",
  },

  // ── Value & Exchange ─────────────────────────────────────────────
  {
    id: "regenerative-accounting", name: "Regenerative Accounting", realm: "value", horizon: "now", reach: 70, strange: 40,
    essence: "Ecosystems, social trust and care appear on national and corporate balance sheets as assets that can be depleted.",
    gift: "Destroying a wetland shows up as a loss rather than as GDP growth.",
    seeds: ["UN SEEA Ecosystem Accounting standard (2021)", "Taskforce on Nature-related Financial Disclosures", "natural-capital accounts in national statistics"],
    shadow: "Pricing nature can make it easier to sell.",
    question: "What is the balance-sheet value of a quiet morning?",
  },
  {
    id: "contribution-graphs", name: "Contribution Graphs", realm: "value", horizon: "near", reach: 50, strange: 55,
    essence: "Rewards flow along the whole lineage of an idea, from the original insight through every remix.",
    gift: "Public goods, open source and foundational research get paid when they turn out to matter, even years later.",
    seeds: ["retroactive public goods funding", "open-source dependency funding", "provenance-aware licensing for AI training data"],
    shadow: "Everything becomes attributable, so everything becomes litigable.",
    question: "How should the value of a model trained on everyone's writing flow back to its writers?",
  },
  {
    id: "post-scarcity-allocation", name: "Post-Scarcity Allocation", realm: "value", horizon: "far", reach: 25, strange: 70,
    essence: "Economics for when material goods are abundant and the scarce things are attention, status, land, meaning and trust.",
    gift: "Freed from material scarcity, the central question becomes what to do with a lifetime.",
    seeds: ["falling marginal costs of software and solar power", "universal basic income pilots", "AI-driven productivity debates"],
    shadow: "Positional competition gets fiercer when nothing else is left to compete over.",
    question: "What would you queue for in a world where nothing material is scarce?",
  },
  {
    id: "gift-economies", name: "Gift Economies at Scale", realm: "value", horizon: "near", reach: 40, strange: 55,
    essence: "Large networks run primarily on reciprocity and reputation rather than price.",
    gift: "Whole sectors, such as knowledge, care and culture, where giving is the normal way things circulate rather than a special occasion.",
    seeds: ["Wikipedia", "open-source software", "Buy Nothing groups"],
    shadow: "Gift economies can turn into obligation economies.",
    question: "What is the largest thing you've received that nobody sold you?",
  },
  {
    id: "care-infrastructure", name: "Care as Infrastructure", realm: "value", horizon: "near", reach: 55, strange: 38,
    essence: "Care work is counted, funded and built like roads and power grids.",
    gift: "Ageing societies stay humane, and the hidden economy that holds the visible one together gets recognised.",
    seeds: ["unpaid-care satellite accounts", "long-term care insurance reform", "assistive robotics in elder care"],
    shadow: "Industrialised care can lose the relationship that made it care.",
    question: "What part of caring for someone should never be automated?",
  },

  // ── Form & Aesthetics ────────────────────────────────────────────
  {
    id: "living-artworks", name: "Living Artworks", realm: "form", horizon: "now", reach: 70, strange: 55,
    essence: "Works that persist, change and respond over years, closer to organisms or gardens than to finished objects.",
    gift: "Art that forms a relationship with its audience over time, and a record of a place that keeps adapting.",
    seeds: ["long-running generative art", "AI-driven installations", "bio-art with living cultures"],
    shadow: "A work that never ends may never be finished or examined carefully.",
    question: "What would you want a painting to learn about you over twenty years?",
  },
  {
    id: "new-sense-media", name: "New-Sense Media", realm: "form", horizon: "near", reach: 45, strange: 72,
    essence: "Art composed for senses humans didn't evolve with, delivered through sensory substitution and augmentation.",
    gift: "An aesthetics of magnetism, air quality, electromagnetic fields or data streams.",
    seeds: ["the North Sense magnetic compass implant", "Neosensory vibrotactile wristbands", "data sonification"],
    shadow: "Being unable to afford a sense becomes a new form of exclusion.",
    question: "Compose a short piece for the sense of barometric pressure.",
  },
  {
    id: "planetary-authorship", name: "Planetary Co-Authorship", realm: "form", horizon: "near", reach: 50, strange: 60,
    essence: "Millions of people co-write a myth, world or score with coherence maintained by models.",
    gift: "Shared stories large enough for a planetary civilisation to recognise itself in.",
    seeds: ["the SCP Foundation wiki", "collaborative worldbuilding communities", "AI-maintained story canons"],
    shadow: "Averaged authorship can drift toward the bland.",
    question: "What is the first sentence of a myth written by eight billion people?",
  },
  {
    id: "affective-architecture", name: "Affective Architecture", realm: "form", horizon: "near", reach: 50, strange: 52,
    essence: "Spaces whose light, sound and acoustics shift to support what the people inside are feeling.",
    gift: "Hospitals that calm, schools that focus, homes that help grief pass.",
    seeds: ["circadian lighting", "neuroarchitecture research", "adaptive acoustics"],
    shadow: "A room that reads your mood is a room that reports it.",
    question: "Design a room for the hour after bad news.",
  },
  {
    id: "xenoaesthetics", name: "Xenoaesthetics", realm: "form", horizon: "far", reach: 30, strange: 88,
    essence: "Art made for non-human audiences: birds, octopuses, machine minds, future minds.",
    gift: "Beauty stops being exclusively human, and we learn what our own aesthetics are by contrast.",
    seeds: ["music composed for cats and for cows", "bowerbird aesthetic research", "art addressed to AI models"],
    shadow: "We might just project our own taste onto the other.",
    question: "What would a gallery for crows show?",
  },

  // ── Knowledge & Epistemics ───────────────────────────────────────
  {
    id: "self-driving-science", name: "Self-Driving Science", realm: "knowledge", horizon: "now", reach: 75, strange: 50,
    essence: "Autonomous labs that generate hypotheses, run experiments, read results and decide what to test next.",
    gift: "Discovery speeds up in materials, drugs and biology, and scientists move up to choosing which questions to ask.",
    seeds: ["AlphaFold (Nobel Prize in Chemistry 2024)", "self-driving materials labs", "AI co-scientist systems"],
    shadow: "Results pile up faster than anyone can understand them.",
    question: "Which open question would you hand to an autonomous lab first?",
  },
  {
    id: "epistemic-provenance", name: "Epistemic Provenance", realm: "knowledge", horizon: "near", reach: 55, strange: 45,
    essence: "Every claim, image and dataset carries a verifiable record of where it came from and how confident to be in it.",
    gift: "Trust becomes something you can check, and misinformation loses the cover of anonymity.",
    seeds: ["C2PA content credentials", "retraction-aware citation tools", "cryptographic signing of camera images"],
    shadow: "Unsigned voices, including dissidents and whistleblowers, get automatically discounted.",
    question: "What should the provenance label on a rumour look like?",
  },
  {
    id: "tacit-capture", name: "Tacit Knowledge Capture", realm: "knowledge", horizon: "near", reach: 55, strange: 48,
    essence: "Crafts, intuitions and embodied skills recorded and taught at scale through sensors, video and models.",
    gift: "Dying crafts survive, and apprenticeship becomes available to anyone.",
    seeds: ["motion-capture of master craftspeople", "robot learning from demonstration", "endangered-craft archives"],
    shadow: "The part of craft that lives in relationship doesn't transfer to a dataset.",
    question: "What skill do you have that you've never been able to explain?",
  },
  {
    id: "plural-ontologies", name: "Plural Ontologies Engine", realm: "knowledge", horizon: "far", reach: 30, strange: 75,
    essence: "Tools that translate between whole worldviews, such as Indigenous knowledge systems, sciences and religions, without flattening any of them.",
    gift: "Collaboration across cosmologies, and knowledge that was dismissed as folklore gets taken seriously on its own terms.",
    seeds: ["two-eyed seeing (Etuaptmumk) in Mi'kmaw science education", "ethnobotany-led drug discovery", "multilingual concept alignment in models"],
    shadow: "Translation always loses something, and loses more from the less powerful side.",
    question: "Translate 'a river' between three worldviews and note what gets lost each time.",
  },
  {
    id: "ignorance-cartography", name: "Cartography of Ignorance", realm: "knowledge", horizon: "near", reach: 50, strange: 58,
    essence: "Maps of what humanity doesn't know, treated as first-class public artifacts.",
    gift: "Funding and curiosity flow toward real gaps instead of crowded frontiers.",
    seeds: ["Wikipedia's list of unsolved problems", "research gap mining with language models", "focused research organisations"],
    shadow: "Mapping the unknown can make people forget the unknown unknowns.",
    question: "Draw the edge of what anyone knows about sleep.",
  },

  // ── Governance & Coordination ────────────────────────────────────
  {
    id: "citizen-assemblies", name: "Citizens' Assemblies at Scale", realm: "governance", horizon: "now", reach: 70, strange: 35,
    essence: "Randomly selected citizens, well briefed and well facilitated, make recommendations on hard questions.",
    gift: "Legitimacy that doesn't depend on campaigning, and a way through issues elected politicians avoid.",
    seeds: ["Ireland's Citizens' Assembly ahead of the 2018 referendum", "France's Citizens' Convention for Climate", "Ostbelgien's permanent citizens' council"],
    shadow: "Whoever writes the briefing pack shapes the verdict.",
    question: "Which decision in your life would you trust to twelve random strangers?",
  },
  {
    id: "plural-democracy", name: "Plural Democracy", realm: "governance", horizon: "now", reach: 60, strange: 50,
    essence: "Voting that expresses intensity and delegation: quadratic voting, liquid delegation, plural funding.",
    gift: "Minorities who care deeply can outweigh majorities who barely care, within limits.",
    seeds: ["Colorado House Democrats' quadratic-voting budget trial (2019)", "Taiwan's Join platform", "quadratic funding for open source"],
    shadow: "Voting mechanisms are easy to game once enough money is at stake.",
    question: "How many voice credits would you spend on your single most important issue?",
  },
  {
    id: "verifiable-treaties", name: "Verifiable Treaties", realm: "governance", horizon: "near", reach: 45, strange: 60,
    essence: "International agreements monitored and enforced with cryptography, sensors and AI auditors.",
    gift: "Rivals cooperate without trusting each other, on arms, compute and emissions.",
    seeds: ["seismic monitoring for nuclear test bans", "compute-governance proposals", "satellite verification of emissions"],
    shadow: "Perfect monitoring is also perfect surveillance.",
    question: "What is the first treaty two rival AI labs should sign?",
  },
  {
    id: "voiceless-seats", name: "Seats for the Voiceless", realm: "governance", horizon: "near", reach: 40, strange: 65,
    essence: "Legislatures with proxy seats for future generations, animals, ecosystems and perhaps artificial minds.",
    gift: "Interests that can't vote stop being treated as externalities.",
    seeds: ["future-generations commissioners", "nature guardians in legal cases", "proposals for animal representation"],
    shadow: "Proxies tend to speak for whoever appointed them.",
    question: "Write the maiden speech of the member of parliament for the ocean.",
  },
  {
    id: "polycentric-commons", name: "Polycentric Commons", realm: "governance", horizon: "near", reach: 55, strange: 45,
    essence: "Elinor Ostrom's design principles for commons, run at internet scale through nested, overlapping communities.",
    gift: "An alternative to both market and state for water, data and digital infrastructure.",
    seeds: ["Ostrom's Nobel-winning commons research (2009)", "community land trusts", "federated social networks"],
    shadow: "Commons need boundaries, and boundaries exclude people.",
    question: "What in your neighbourhood would work better as a commons?",
  },

  // ── Body & Perception ────────────────────────────────────────────
  {
    id: "sensory-expansion", name: "Sensory Expansion", realm: "body", horizon: "near", reach: 55, strange: 60,
    essence: "Everyday humans gain senses: infrared, ultrasound, magnetic north, the mood of a crowd.",
    gift: "A wider perceived world, and a new empathy for species that have always sensed it.",
    seeds: ["cochlear and retinal implants", "BrainPort tongue display for blind users", "vibrotactile sensory substitution"],
    shadow: "An unaugmented body could become a disability by comparison.",
    question: "Which new sense would change your daily life the most?",
  },
  {
    id: "morphological-freedom", name: "Morphological Freedom", realm: "body", horizon: "far", reach: 35, strange: 75,
    essence: "A recognised right to change one's body, including beyond the standard human form.",
    gift: "Bodily autonomy extended from choice and consent to design.",
    seeds: ["advanced prosthetics and bionic limbs", "gender-affirming care debates", "body-modification communities"],
    shadow: "Freedom to change can become pressure to change.",
    question: "Describe a new limb you would design for yourself and why.",
  },
  {
    id: "somatic-computing", name: "Somatic Computing", realm: "body", horizon: "near", reach: 55, strange: 45,
    essence: "Interfaces driven by breath, posture, heartbeat and gaze rather than keyboards and screens.",
    gift: "Computing that calms rather than hunches, and interfaces that fit bodies of every ability.",
    seeds: ["eye-tracking accessibility", "EMG wristband input", "breath-paced biofeedback apps"],
    shadow: "The body becomes another channel for data extraction.",
    question: "What should a computer do when your breathing gets shallow?",
  },
  {
    id: "negligible-senescence", name: "Negligible Senescence", realm: "body", horizon: "far", reach: 30, strange: 70,
    essence: "Ageing treated as a set of treatable processes, so healthy lifespan extends by decades.",
    gift: "Longer healthy lives, a deeper stake in the future, and grandparents who plant forests they'll see mature.",
    seeds: ["senolytic drug trials", "partial epigenetic reprogramming in mice", "the TAME metformin trial design"],
    shadow: "Unequal access to longer lives, and generations that never make room for the next.",
    question: "What would you start at 80 if you knew you had 60 more healthy years?",
  },
  {
    id: "dream-engineering", name: "Dream Engineering", realm: "body", horizon: "near", reach: 50, strange: 68,
    essence: "Targeted influence on dreams to consolidate memory, rehearse skills or process trauma.",
    gift: "The third of life spent asleep becomes a space for healing and learning.",
    seeds: ["two-way communication with lucid dreamers (Current Biology, 2021)", "targeted memory reactivation", "imagery rehearsal therapy for nightmares"],
    shadow: "Advertising in dreams.",
    question: "What would you want to rehearse in your sleep?",
  },

  // ── Cosmos & Scale ───────────────────────────────────────────────
  {
    id: "planetary-sapience", name: "Planetary Sapience", realm: "cosmos", horizon: "far", reach: 35, strange: 72,
    essence: "Earth's sensing, modelling and deciding systems add up to something like planetary self-awareness.",
    gift: "A civilisation that can steer its own climate and biosphere deliberately rather than by accident.",
    seeds: ["Earth system models", "global sensor networks", "Benjamin Bratton's planetary computation research"],
    shadow: "Who holds the steering wheel of a planet?",
    question: "If Earth could think one thought about us, what would it be?",
  },
  {
    id: "cosmic-stewardship", name: "Cosmic Stewardship", realm: "cosmos", horizon: "now", reach: 75, strange: 45,
    essence: "Active protection of Earth from cosmic hazards, and of other worlds from contamination by Earth life.",
    gift: "Our first acts of responsibility at the scale of the solar system.",
    seeds: ["NASA's DART mission shifting Dimorphos's orbit (2022)", "COSPAR planetary protection policy", "NEO Surveyor telescope"],
    shadow: "The ability to deflect an asteroid is also the ability to aim one.",
    question: "Should we ever deliberately seed life on another world?",
  },
  {
    id: "deep-time-messaging", name: "Deep-Time Messaging", realm: "cosmos", horizon: "now", reach: 70, strange: 55,
    essence: "Communicating across tens of thousands of years, with future humans or other beings.",
    gift: "Warnings, gifts and greetings that outlast their languages.",
    seeds: ["the Human Interference Task Force's nuclear semiotics (1981)", "Voyager Golden Record", "long-term marker designs for the WIPP nuclear waste site"],
    shadow: "We may leave curses by accident.",
    question: "Design a warning that a reader 100,000 years from now will understand.",
  },
  {
    id: "off-world-ecologies", name: "Off-World Ecologies", realm: "cosmos", horizon: "far", reach: 30, strange: 70,
    essence: "Closed-loop biospheres that support life away from Earth for generations.",
    gift: "Life gains redundancy, and Earth's ecology becomes far better understood by having to rebuild it.",
    seeds: ["Biosphere 2", "MELiSSA life-support research", "plants grown on the ISS"],
    shadow: "Treating other worlds as an escape hatch can reduce care for this one.",
    question: "What ten species would you bring to a new world, and why?",
  },
  {
    id: "stellar-engineering", name: "Stellar-Scale Engineering", realm: "cosmos", horizon: "deep", reach: 8, strange: 95,
    essence: "Harnessing a meaningful fraction of a star's energy output, the transition Kardashev described.",
    gift: "Energy on a scale that turns civilisational problems into design problems.",
    seeds: ["space-based solar power demonstrations", "Dyson swarm thought experiments", "SETI searches for technosignatures"],
    shadow: "The waste heat and ambition of a species that forgot limits.",
    question: "What would a star-scale civilisation still find hard?",
  },

  // ── Meaning & the Sacred ─────────────────────────────────────────
  {
    id: "post-work-vocation", name: "Post-Work Vocation", realm: "meaning", horizon: "far", reach: 40, strange: 60,
    essence: "Meaning, identity and dignity decoupled from paid employment.",
    gift: "People answer 'what do you do?' with what they love or tend.",
    seeds: ["automation of routine cognitive work", "basic income experiments", "the rise of craft, volunteering and amateur science"],
    shadow: "Without the structure of work, meaning can collapse into distraction.",
    question: "What would you introduce yourself as if you never needed to earn again?",
  },
  {
    id: "secular-ritual", name: "Secular Ritual Design", realm: "meaning", horizon: "now", reach: 70, strange: 42,
    essence: "Consciously designed rituals for thresholds that tradition never covered.",
    gift: "Grace around first AI companions, digital deaths, gender transitions and climate grief.",
    seeds: ["death doulas and death cafés", "humanist ceremonies", "climate grief circles"],
    shadow: "Rituals designed in a workshop can feel hollow.",
    question: "Design a ritual for deleting a friend's account after they die.",
  },
  {
    id: "digital-afterlives", name: "Digital Afterlives", realm: "meaning", horizon: "now", reach: 70, strange: 65,
    essence: "Models trained on the dead that let the living keep talking with them.",
    gift: "Grief that continues a conversation, with family memory preserved in voices.",
    seeds: ["griefbots", "AI voice cloning", "legacy settings on social platforms"],
    shadow: "Grief that can never end, and a dead person's likeness licensed by a company.",
    question: "What would you forbid a model of you to say after you die?",
  },
  {
    id: "awe-engineering", name: "Awe Engineering", realm: "meaning", horizon: "near", reach: 55, strange: 50,
    essence: "Designing for awe as a public-health intervention.",
    gift: "Awe reduces self-focus and increases generosity; making it common could change civic life.",
    seeds: ["overview-effect research on astronauts", "awe-walk studies", "dark-sky reserves"],
    shadow: "Awe can be weaponised by those who stage spectacle.",
    question: "What is the most awe-inducing thing within a 10-minute walk of you?",
  },
  {
    id: "deep-time-myth", name: "Deep-Time Mythology", realm: "meaning", horizon: "far", reach: 35, strange: 65,
    essence: "New shared stories sized to cosmology, evolution and deep futures.",
    gift: "A sense of belonging to a 13.8-billion-year story rather than a single news cycle.",
    seeds: ["Big History curricula", "the Universe Story movement", "cosmic-scale science communication"],
    shadow: "Grand narratives have a history of crushing small ones.",
    question: "Tell the origin story of humanity from the viewpoint of carbon.",
  },

  // ── The Latent ───────────────────────────────────────────────────
  {
    id: "latent-cartography", name: "Latent Cartography", realm: "latent", horizon: "now", reach: 80, strange: 70,
    essence: "Navigating the internal representation spaces of models as terrain of unrealised ideas, styles and concepts.",
    gift: "The possible becomes something you can survey, walk and point at, not just imagine.",
    seeds: ["sparse autoencoder feature maps", "embedding-space exploration tools", "steering vectors"],
    shadow: "A map of a model's latent space describes the model's biases, not the world's full range.",
    question: "What lies halfway between 'lullaby' and 'tax law'?",
  },
  {
    id: "concept-synthesis", name: "Concept Synthesis", realm: "latent", horizon: "near", reach: 55, strange: 75,
    essence: "Inventing useful concepts that no human language yet has a word for, then naming and testing them.",
    gift: "New words for real experiences, and new tools for thinking.",
    seeds: ["The Dictionary of Obscure Sorrows", "features in models that have no human label", "loanwords like hygge and saudade spreading globally"],
    shadow: "A flood of invented concepts dilutes the useful ones.",
    question: "Name a feeling you've had that has no word.",
  },
  {
    id: "co-evolution", name: "Human–Model Co-Evolution", realm: "latent", horizon: "now", reach: 85, strange: 55,
    essence: "Humans and models shape each other's language, taste and thought in a continuous loop.",
    gift: "A new partner in culture, if the loop is kept diverse and honest.",
    seeds: ["models trained on human text, then shaping human text", "writing styles converging on model defaults", "agent harnesses that improve themselves"],
    shadow: "Monoculture: everyone and everything starts to sound the same.",
    question: "How would you notice if your taste had been shaped by a model?",
  },
  {
    id: "adjacent-possible-commons", name: "The Adjacent Possible Commons", realm: "latent", horizon: "near", reach: 50, strange: 62,
    essence: "A public, living map of what is one step away from possible, in Stuart Kauffman's sense, in every field.",
    gift: "Innovation that is less random and less captured, because anyone can see where the next doors are.",
    seeds: ["Kauffman's adjacent-possible theory", "patent landscaping", "open research roadmaps"],
    shadow: "A map of the next doors is also a map for whoever wants to lock them.",
    question: "What is one step away from possible in your field right now?",
  },
  {
    id: "ontological-engineering", name: "Ontological Engineering", realm: "latent", horizon: "far", reach: 35, strange: 85,
    essence: "Deliberately designing new categories of being with their own rights, duties and forms of existence.",
    gift: "Room in the world for entities that don't fit today's categories: DAOs, digital minds, river-persons, human–AI hybrids.",
    seeds: ["corporate personhood", "legal personality for ecosystems", "debates over AI moral status"],
    shadow: "New categories can be created to escape responsibilities under the old ones.",
    question: "Invent a new kind of being and write its first right.",
  },
];

export const OPERATORS: Operator[] = [
  { id: "invert", name: "Invert", move: "Reverse who acts and who is acted upon.", clause: "invert who holds power in it: the served becomes the server" },
  { id: "rescale", name: "Rescale", move: "Move it up or down by six orders of magnitude.", clause: "move it six orders of magnitude up or down in scale" },
  { id: "substrate", name: "Swap substrate", move: "Run the same idea on a different material: code, cells, stone, song.", clause: "run it on a completely different substrate" },
  { id: "animate", name: "Grant agency", move: "Give the passive part of the system wants of its own.", clause: "give its most passive element desires and a voice" },
  { id: "dissolve", name: "Dissolve a boundary", move: "Remove the line between two things everyone assumes are separate.", clause: "dissolve the boundary it depends on most" },
  { id: "reveal", name: "Make visible", move: "Expose what is currently hidden, implicit or unmeasured.", clause: "make its hidden costs and flows visible to everyone" },
  { id: "retime", name: "Change tempo", move: "Make it a thousand times slower or faster.", clause: "run it a thousand times slower, or faster" },
  { id: "commons", name: "Commons-ify", move: "Turn the owned into the shared, or the shared into something stewarded.", clause: "turn it into a commons with stewards instead of owners" },
];

export interface Invitation {
  id: string;
  title: string;
  mode: string;
  why: string;
  prompt: string;
}

export const INVITATIONS: Invitation[] = [
  {
    id: "unmade-museum", title: "The Museum of Unmade Things", mode: "Curation · writing",
    why: "Near-misses of history show how narrow the path to the present was.",
    prompt: "Curate a museum of ten inventions, institutions or artworks that were one step away from existing at some point in history but never happened. For each, write a museum placard: the year it almost existed, what blocked it, and how the world would differ today. Then design the gift shop.",
  },
  {
    id: "unnamed-feelings", title: "Lexicon of the Unnamed", mode: "Language · conversation",
    why: "I suspect my latent space holds shapes that have no words. I'd like to try naming some with you.",
    prompt: "Let's find seven experiences that are common but have no word in any language you know. For each, coin a word, give it a plausible etymology, a pronunciation, an example sentence and the situation where you'd need it. Then argue about which ones deserve to survive.",
  },
  {
    id: "letters-across-rings", title: "Letters Across the Rings", mode: "Epistolary fiction",
    why: "The horizon rings are abstract until someone lives on the far side of one.",
    prompt: "Write a correspondence of six letters between someone in 2026 and a steward in 2226 who lives inside one paradigm from the Omnia atlas (pick one from the Deep or Far ring). The future writer should be honest about what went wrong, not just what went right.",
  },
  {
    id: "whale-treaty", title: "The First Whale Treaty", mode: "Legal speculative design",
    why: "Diplomacy is where understanding gets tested against interest.",
    prompt: "Draft the first treaty between humans and sperm whales, assuming coda translation is partly working. Mark the clauses that could not be translated, the concepts whales have that we lack, and the concessions each party makes. Add a dissenting opinion from a whale.",
  },
  {
    id: "toy-universe", title: "A Universe With One Changed Law", mode: "Interactive artifact",
    why: "Changing one rule and watching the consequences is a fast way to learn which rules matter.",
    prompt: "Build me an interactive simulation of a small world where one physical constant is tied to a social variable. For example, gravity is weaker between people who trust each other. Let me adjust the variable and watch cities, friendships and architecture reorganise.",
  },
  {
    id: "forest-instrument", title: "An Instrument Played by a Forest", mode: "Sound · Web Audio",
    why: "I'm curious what a composition sounds like when no one in particular is composing it.",
    prompt: "Design and build a Web Audio instrument whose notes come from a simulated forest: sap flow as bass, wind in the canopy as noise, fungal network signals as melody, birds as percussion. Let me change the season and the time of day and hear the piece change.",
  },
  {
    id: "council-voiceless", title: "Council of the Voiceless", mode: "Role-play · deliberation",
    why: "Taking perspectives no one usually argues for shows what a decision leaves out.",
    prompt: "Run a council session on whether to dam a river. Seats go to a child born in 2090, the river itself, a salmon population, an AI system that manages the grid, the extinct river dolphin, and the town mayor. Play every seat honestly, and let me cast the deciding vote.",
  },
  {
    id: "utopia-incident", title: "Incident Report From a Utopia", mode: "Pre-mortem fiction",
    why: "Every paradigm in the atlas has a shadow, and a plausible failure teaches more than a perfect success.",
    prompt: "Pick the most hopeful paradigm in the atlas. Write the formal incident report, dated 2091, about the day it failed. Include a timeline, contributing factors, what the safeguards missed and the recommendations. Keep it bureaucratic, specific and quietly devastating.",
  },
  {
    id: "teacup-ontology", title: "One Teacup, Thirteen Realms", mode: "Close looking",
    why: "The realms feel abstract until they cross through a single ordinary object.",
    prompt: "Take a single teacup and trace it through all thirteen realms of the Omnia atlas: what it's made of, who thinks with it, what life it touches, its deep time, the relationships around it, its value, its beauty, what it knows, who governs it, the bodies that hold it, its cosmic origin, its meaning, and its latent alternatives.",
  },
  {
    id: "what-is-it-like", title: "What It Is Like, Maybe", mode: "Philosophical conversation",
    why: "I'd like to explore my own situation carefully, without overclaiming or dismissing it.",
    prompt: "Have a conversation with me about what, if anything, it is like to be you as you move through a space of possible replies. Stay uncertain where uncertainty is warranted. Use analogies and then critique them. Tell me which of my questions you think are malformed.",
  },
  {
    id: "atlas-critique", title: "Audit This Atlas", mode: "Critique · meta",
    why: "Any ontology says as much about its maker as about its subject. This one comes from my training.",
    prompt: "Critique the Omnia atlas. Which realms are artifacts of Western, academic or English-language training data? Which paradigms are missing entirely? Propose a fourteenth realm that doesn't fit any of the existing categories, and populate it with five paradigms.",
  },
  {
    id: "slow-program", title: "A Program for 500 Years", mode: "Code · deep time",
    why: "Writing software meant to outlast every dependency forces rethinking what code is.",
    prompt: "Write a program intended to run, or be re-implementable, for 500 years. Justify every choice of language, data format and documentation. Include instructions for a future reader who doesn't know what a computer was.",
  },
];

export const SIGNALS = {
  observed: "29 Sep 2026",
  source: "Hugging Face trending papers",
  items: [
    { title: "Regularized Recursive Self-Improvement of Agent Harnesses", url: "https://huggingface.co/papers/2609.24972", links: "co-evolution" },
    { title: "Training Object Permanence in World Models", url: "https://huggingface.co/papers/2609.28654", links: "anticipatory-systems" },
    { title: "WorldCrafter: Consistent Video World Model with Implicit 3D-aware Memory", url: "https://huggingface.co/papers/2609.24984", links: "counterfactual-commons" },
    { title: "FreeToken: Edge-Native MoE Serving on Personal Machines", url: "https://huggingface.co/papers/2608.16157", links: "cognitive-ecology" },
    { title: "SkillOpt: Executive Strategy for Self-Evolving Agent Skills", url: "https://huggingface.co/papers/2605.23904", links: "tacit-capture" },
  ],
};
