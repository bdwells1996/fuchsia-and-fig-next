import Button from "@/components/Button";

export default function Home() {
	return (
		<div className="min-h-screen bg-background">

			{/* ── Nav ──────────────────────────────────────────── */}
			<nav className="border-b border-border-subtle bg-surface/80 backdrop-blur-sm sticky top-0 z-30">
				<div className="container-site flex items-center justify-between h-16">
					<span className="font-display text-2xl text-text-primary">
						Fuchsia & Fig
					</span>
					<div className="hidden sm:flex items-center gap-8">
						<a href="/" className="nav-link">About</a>
						<a href="/" className="nav-link active">Design</a>
						<a href="/" className="nav-link">Services</a>
						<a href="/" className="nav-link">Contact</a>
					</div>
					<Button variant="outline" size="sm">Get in touch</Button>
				</div>
			</nav>

			{/* ── Hero ─────────────────────────────────────────── */}
			<section className="section-xl">
				<div className="container-narrow text-center">
					<p className="eyebrow-secondary mb-6">Design System Showcase</p>
					<h1 className="display-xl text-text-primary mb-7">
						Where beauty meets intention
					</h1>
					<p className="body-lg mb-10 mx-auto max-w-md">
						A curated collection of design tokens, components and patterns built
						for the Fuchsia &amp; Fig brand.
					</p>
					<div className="flex flex-wrap justify-center gap-3">
						<Button variant="primary" size="lg">Explore our work</Button>
						<Button variant="outline" size="lg">Learn more</Button>
					</div>
				</div>
			</section>

			<div className="container-site space-y-24 py-24">

				{/* ── Sage × Bloom Showcase ─────────────────────────── */}
				<section>
					<p className="eyebrow mb-3">Colour in Context</p>
					<h2 className="heading-lg text-text-primary mb-3">Sage & Bloom</h2>
					<p className="body-md mb-12 max-w-2xl">
						Sage provides quiet, natural space — the canvas. Bloom arrives
						deliberately as the accent. Together they feel organic and confident
						without competing.
					</p>

					{/* --- Commission banner --- */}
					<div className="rounded-3xl bg-sage-100 px-8 sm:px-14 py-14 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
						<div>
							<span className="badge badge-sage mb-4">Currently open for commissions</span>
							<h3 className="display-lg text-fig-500 mb-3">
								Let's make something<br />together.
							</h3>
							<p className="body-lg max-w-sm">
								Original works in oil, gouache, and mixed media. Each piece made
								to order and shipped worldwide.
							</p>
						</div>
						<Button variant="primary" size="xl" className="shrink-0">
							Start a commission
						</Button>
					</div>

					{/* --- Work cards --- */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">

						<div className="card overflow-hidden">
							<div className="h-56 bg-sage-200 relative">
								<span className="badge badge-bloom absolute top-4 left-4">Available</span>
							</div>
							<div className="card-body">
								<h3 className="heading-sm text-text-primary mb-1">Still Life No. 12</h3>
								<p className="body-sm mb-4">Oil on linen · 40 × 50 cm</p>
								<div className="flex items-center justify-between">
									<span className="heading-xs" style={{ color: "var(--brand-primary)" }}>£1,200</span>
									<Button variant="primary" size="sm">Enquire</Button>
								</div>
							</div>
						</div>

						<div className="card overflow-hidden">
							<div className="h-56 bg-sage-300 relative">
								<span className="badge badge-neutral absolute top-4 left-4">Sold</span>
							</div>
							<div className="card-body">
								<h3 className="heading-sm text-text-primary mb-1">Garden Study III</h3>
								<p className="body-sm mb-4">Gouache on paper · 30 × 40 cm</p>
								<div className="flex items-center justify-between">
									<span className="heading-xs text-text-tertiary line-through">£680</span>
									<Button variant="outline" size="sm" disabled>Sold</Button>
								</div>
							</div>
						</div>

						<div className="card overflow-hidden" style={{ borderColor: "#f2bace" }}>
							<div className="h-56 bg-sage-400 relative">
								<span className="badge badge-bloom absolute top-4 left-4">Commission</span>
							</div>
							<div className="card-body">
								<h3 className="heading-sm text-text-primary mb-1">Portrait Commission</h3>
								<p className="body-sm mb-4">Oil on canvas · any size</p>
								<div className="flex items-center justify-between">
									<span className="heading-xs" style={{ color: "var(--brand-primary)" }}>From £800</span>
									<Button variant="primary" size="sm">Book now</Button>
								</div>
							</div>
						</div>

					</div>

					{/* --- Testimonial + Newsletter --- */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">

						<div className="rounded-2xl bg-sage-50 p-8 flex flex-col justify-between">
							<p
								className="font-display text-6xl leading-none mb-2"
								style={{ color: "var(--brand-primary)" }}
							>
								&ldquo;
							</p>
							<p className="body-lg text-text-primary mb-6 -mt-2">
								The commission exceeded every expectation. The way she captures
								light is unlike anything I've seen — it stops every guest in their tracks.
							</p>
							<div className="flex items-center gap-3">
								<div
									className="avatar avatar-md"
									style={{ background: "#d9e9d7", color: "#29422b" }}
								>
									SL
								</div>
								<div>
									<p className="heading-xs text-text-primary">Sarah L.</p>
									<p className="body-xs">Portrait commission, 2024</p>
								</div>
							</div>
						</div>

						<div className="rounded-2xl border border-border-subtle p-8 flex flex-col justify-between">
							<div>
								<span className="badge badge-sage mb-4">Studio notes</span>
								<h3 className="heading-md text-text-primary mb-3">
									Follow the work as it happens
								</h3>
								<p className="body-md mb-6">
									Monthly dispatches from the studio — new works, process notes,
									and first access to available pieces.
								</p>
							</div>
							<div className="flex gap-2">
								<label htmlFor="newsletter-email" className="sr-only">Email address</label>
								<input
									id="newsletter-email"
									className="input"
									type="email"
									placeholder="your@email.com"
								/>
								<Button variant="primary" size="md" className="shrink-0">Join</Button>
							</div>
						</div>

					</div>

					{/* --- Pricing tiers --- */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{[
							{ name: "Print", desc: "Limited edition giclée prints on archival paper.", price: "From £85", cta: "Shop prints", featured: false },
							{ name: "Original", desc: "One-of-a-kind works on paper or canvas.", price: "£400 – £2,400", cta: "View originals", featured: true },
							{ name: "Commission", desc: "A painting made entirely for you.", price: "From £600", cta: "Enquire", featured: false },
						].map(({ name, desc, price, cta, featured }) => (
							<div
								key={name}
								className={`rounded-2xl p-7 flex flex-col gap-5 ${
									featured ? "bg-sage-100 border-2 border-sage-300" : "border border-border-subtle"
								}`}
							>
								{featured && <span className="badge badge-bloom self-start">Most popular</span>}
								<div>
									<h3 className="heading-sm text-text-primary mb-1">{name}</h3>
									<p className="body-sm">{desc}</p>
								</div>
								<p
									className="heading-md"
									style={{ color: featured ? "var(--brand-primary)" : "var(--text-primary)" }}
								>
									{price}
								</p>
								<Button
									variant={featured ? "primary" : "outline"}
									size="md"
									className="mt-auto"
								>
									{cta}
								</Button>
							</div>
						))}
					</div>
				</section>

				{/* ── Colour Palette ───────────────────────────────── */}
				<section>
					<p className="eyebrow-secondary mb-3">Colour System</p>
					<h2 className="heading-lg text-text-primary mb-8">Brand Palette</h2>

					{[
						{
							label: "Sage — Background Green",
							swatches: [
								["50","#f5f9f5"],["100","#e9f2e8"],["200","#d9e9d7"],
								["300","#cce2ca"],["400","#c6dfc3"],["500","#bfdcbb"],
								["600","#91bf8c"],["700","#649f60"],["800","#4d764c"],
								["900","#375436"],["950","#243823"],
							],
						},
						{
							label: "Fig — Primary Green",
							swatches: [
								["50","#ecf8ec"],["100","#d1ebd4"],["200","#a0d4a4"],
								["300","#6ab46f"],["400","#467c4a"],["500","#29422b"],
								["600","#223523"],["700","#1a281b"],["800","#151e16"],
								["900","#0f150f"],["950","#090c09"],
							],
						},
						{
							label: "Violet — Complementary Purple",
							swatches: [
								["50","#faf4fb"],["100","#f2e5f6"],["200","#dbbfe8"],
								["300","#c596d9"],["400","#a965c8"],["500","#883eaa"],
								["600","#6f328b"],["700","#56276d"],["800","#421f51"],
								["900","#2b1637"],["950","#1a0e20"],
							],
						},
						{
							label: "Bloom — Primary Pink",
							swatches: [
								["50","#fdf2f4"],["100","#f9e1ea"],["200","#f2bace"],
								["300","#e98bab"],["400","#e1608b"],["500","#d72f68"],
								["600","#b42253"],["700","#8c1c42"],["800","#631731"],
								["900","#401121"],["950","#270b15"],
							],
						},
					].map(({ label, swatches }) => (
						<div key={label} className="mb-10 last:mb-0">
							<p className="body-xs font-semibold text-text-tertiary mb-3 uppercase tracking-widest">
								{label}
							</p>
							<div className="grid grid-cols-5 sm:grid-cols-11 gap-2">
								{swatches.map(([step, hex]) => (
									<div key={step} className="text-center">
										<div
											className="w-full aspect-square rounded-lg mb-1 border border-black/5"
											style={{ backgroundColor: hex }}
										/>
										<p className="text-xs text-text-tertiary font-mono">{step}</p>
									</div>
								))}
							</div>
						</div>
					))}
				</section>

				{/* ── Typography ───────────────────────────────────── */}
				<section>
					<p className="eyebrow-secondary mb-3">Typography</p>
					<h2 className="heading-lg text-text-primary mb-10">Type System</h2>

					<div className="space-y-10">
						<div className="border-b border-border-subtle pb-10">
							<p className="body-xs text-text-tertiary uppercase tracking-widest font-semibold mb-5">
								Display — Abril Fatface
							</p>
							<p className="display-xl text-text-primary">Elegance in every detail</p>
							<p className="display-lg text-text-secondary mt-3">Crafted with intention</p>
						</div>

						<div className="border-b border-border-subtle pb-10">
							<p className="body-xs text-text-tertiary uppercase tracking-widest font-semibold mb-5">
								Headings — Quicksand
							</p>
							<div className="space-y-3">
								<p className="heading-xl text-text-primary">Heading XL — 2.25rem / 700</p>
								<p className="heading-lg text-text-primary">Heading LG — 1.875rem / 600</p>
								<p className="heading-md text-text-primary">Heading MD — 1.5rem / 600</p>
								<p className="heading-sm text-text-primary">Heading SM — 1.25rem / 600</p>
								<p className="heading-xs text-text-primary">Heading XS — 1.0625rem / 600</p>
							</div>
						</div>

						<div>
							<p className="body-xs text-text-tertiary uppercase tracking-widest font-semibold mb-5">
								Body & Labels — Quicksand
							</p>
							<div className="space-y-3">
								<p className="body-xl">Body XL — Ideal for hero introductions and pull quotes.</p>
								<p className="body-lg">Body LG — Great for section introductions and feature descriptions.</p>
								<p className="body-md">Body MD — The default reading size for most content areas.</p>
								<p className="body-sm">Body SM — Used in captions, metadata, and secondary info.</p>
								<p className="body-xs">Body XS — Fine print, legal text, and footnotes.</p>
							</div>
						</div>
					</div>
				</section>

				{/* ── Buttons ──────────────────────────────────────── */}
				<section>
					<p className="eyebrow-secondary mb-3">Interactive</p>
					<h2 className="heading-lg text-text-primary mb-10">Buttons</h2>

					<div className="mb-8">
						<p className="label mb-4">Variants</p>
						<div className="flex flex-wrap gap-4 items-center">
							<Button variant="primary">Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="outline">Outline</Button>
						</div>
					</div>

					<div className="mb-8">
						<p className="label mb-4">Sizes</p>
						<div className="flex flex-wrap gap-4 items-center">
							<Button variant="outline" size="xs">XSmall</Button>
							<Button variant="outline" size="sm">Small</Button>
							<Button variant="outline" size="md">Medium</Button>
							<Button variant="primary" size="lg">Large</Button>
							<Button variant="outline" size="xl">XLarge</Button>
						</div>
					</div>

					<div>
						<p className="label mb-4">States</p>
						<div className="flex flex-wrap gap-4 items-center">
							<Button variant="outline" disabled>Disabled</Button>
							<Button variant="primary" loading>Loading</Button>
							<Button variant="outline" className="animate-bloom-pulse">Pulsing</Button>
						</div>
					</div>
				</section>

				{/* ── Badges ───────────────────────────────────────── */}
				<section>
					<p className="eyebrow-secondary mb-3">Labels</p>
					<h2 className="heading-lg text-text-primary mb-8">Badges & Chips</h2>

					<div className="flex flex-wrap gap-3 mb-8">
						<span className="badge badge-bloom">Bloom</span>
						<span className="badge badge-fig">Fig</span>
						<span className="badge badge-violet">Violet</span>
						<span className="badge badge-sage">Sage</span>
						<span className="badge badge-success">In season</span>
						<span className="badge badge-warning">Limited</span>
						<span className="badge badge-error">Sold out</span>
						<span className="badge badge-neutral">Archive</span>
					</div>

					<div className="flex flex-wrap gap-3">
						<button type="button" className="chip">Florals</button>
						<button type="button" className="chip chip-active">Weddings</button>
						<button type="button" className="chip">Gifts</button>
						<button type="button" className="chip">Events</button>
						<button type="button" className="chip">Seasonal</button>
					</div>
				</section>

				{/* ── Cards ────────────────────────────────────────── */}
				<section>
					<p className="eyebrow-secondary mb-3">Content</p>
					<h2 className="heading-lg text-text-primary mb-8">Cards</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="card card-hover">
							<div className="h-48 bg-surface-sunken" />
							<div className="card-body">
								<span className="badge badge-neutral mb-3">Florals</span>
								<h3 className="heading-sm text-text-primary mb-2">Wedding Florals</h3>
								<p className="body-sm">
									Bespoke arrangements that tell your story, crafted with the finest seasonal blooms.
								</p>
							</div>
							<div className="card-footer flex items-center justify-between">
								<span className="body-xs">From £250</span>
								<Button variant="outline" size="sm">Enquire</Button>
							</div>
						</div>

						<div className="card card-hover">
							<div className="h-48 bg-surface-sunken" />
							<div className="card-body">
								<span className="badge badge-neutral mb-3">Dried</span>
								<h3 className="heading-sm text-text-primary mb-2">Dried Arrangements</h3>
								<p className="body-sm">
									Timeless dried and preserved pieces that bring warmth and texture to any space.
								</p>
							</div>
							<div className="card-footer flex items-center justify-between">
								<span className="body-xs">From £85</span>
								<Button variant="outline" size="sm">Enquire</Button>
							</div>
						</div>

						<div className="card card-hover">
							<div className="h-48 bg-surface-sunken" />
							<div className="card-body">
								<span className="badge badge-bloom mb-3">Featured</span>
								<h3 className="heading-sm text-text-primary mb-2">Seasonal Subscriptions</h3>
								<p className="body-sm">
									Monthly curations of what's in bloom, delivered straight to your door.
								</p>
							</div>
							<div className="card-footer flex items-center justify-between">
								<span className="body-xs">From £45/month</span>
								<Button variant="primary" size="sm">Subscribe</Button>
							</div>
						</div>
					</div>
				</section>

				{/* ── Form Inputs ──────────────────────────────────── */}
				<section>
					<p className="eyebrow-secondary mb-3">Forms</p>
					<h2 className="heading-lg text-text-primary mb-8">Input Fields</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
						<div>
							<label htmlFor="form-name" className="label label-required">Your name</label>
							<input id="form-name" className="input" type="text" placeholder="Jane Smith" />
						</div>
						<div>
							<label htmlFor="form-email" className="label label-required">Email address</label>
							<input id="form-email" className="input" type="email" placeholder="jane@example.com" />
						</div>
						<div>
							<label htmlFor="form-event" className="label">Event type</label>
							<select id="form-event" className="select">
								<option>Wedding</option>
								<option>Corporate event</option>
								<option>Birthday</option>
								<option>Gift</option>
							</select>
						</div>
						<div>
							<label htmlFor="form-budget" className="label">Budget</label>
							<input id="form-budget" className="input input-error" type="text" placeholder="£500" />
							<p className="field-error">Please enter a valid budget amount.</p>
						</div>
						<div className="sm:col-span-2">
							<label htmlFor="form-vision" className="label">Tell us about your vision</label>
							<textarea id="form-vision" className="textarea" placeholder="Describe your dream arrangement…" />
							<p className="field-hint">The more detail, the better we can help.</p>
						</div>
						<div className="sm:col-span-2 flex flex-col gap-3">
							<label className="check-group">
								<input type="checkbox" defaultChecked />
								<span className="body-sm text-text-primary">I agree to the terms and conditions</span>
							</label>
							<label className="check-group">
								<input type="radio" name="contact" />
								<span className="body-sm text-text-primary">Contact me by email</span>
							</label>
							<label className="check-group">
								<input type="radio" name="contact" />
								<span className="body-sm text-text-primary">Contact me by phone</span>
							</label>
						</div>
						<div className="sm:col-span-2">
							<Button variant="primary" size="lg" fullWidth>Send enquiry</Button>
						</div>
					</div>
				</section>

				{/* ── Surfaces ─────────────────────────────────────── */}
				<section>
					<p className="eyebrow-secondary mb-3">Surfaces</p>
					<h2 className="heading-lg text-text-primary mb-8">Backgrounds & Gradients</h2>

					<div className="grid grid-cols-3 gap-4 mb-8">
						<div className="surface rounded-xl p-6 border border-border-subtle shadow-warm-sm">
							<p className="label mb-1">Surface</p>
							<p className="body-xs">White — main content areas</p>
						</div>
						<div className="surface-raised rounded-xl p-6 border border-border-subtle shadow-warm-md">
							<p className="label mb-1">Surface Raised</p>
							<p className="body-xs">Elevated with shadow</p>
						</div>
						<div className="surface-sunken rounded-xl p-6 border border-border-subtle">
							<p className="label mb-1">Surface Sunken</p>
							<p className="body-xs">Recessed / inset areas</p>
						</div>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
						<div className="gradient-sage rounded-2xl p-6 text-center">
							<p className="heading-xs text-sage-900">Sage</p>
							<p className="body-sm text-sage-800 mt-1">Background green</p>
						</div>
						<div className="gradient-fig rounded-2xl p-6 text-center">
							<p className="heading-xs text-fig-500">Fig</p>
							<p className="body-sm text-fig-400 mt-1">Primary green</p>
						</div>
						<div className="gradient-violet rounded-2xl p-6 text-center">
							<p className="heading-xs text-violet-800">Violet</p>
							<p className="body-sm text-violet-700 mt-1">Complementary</p>
						</div>
						<div className="gradient-bloom rounded-2xl p-6 text-center">
							<p className="heading-xs text-bloom-800">Bloom</p>
							<p className="body-sm text-bloom-700 mt-1">Primary pink</p>
						</div>
					</div>
				</section>

				{/* ── Avatars ──────────────────────────────────────── */}
				<section>
					<p className="eyebrow-secondary mb-3">Identity</p>
					<h2 className="heading-lg text-text-primary mb-8">Avatars</h2>
					<div className="flex flex-wrap items-end gap-6">
						{[
							["avatar-xs", "XS", "24px"],
							["avatar-sm", "SM", "32px"],
							["avatar-md", "MD", "40px"],
							["avatar-lg", "LG", "52px"],
							["avatar-xl", "XL", "72px"],
						].map(([size, label, px]) => (
							<div key={size} className="text-center">
								<div className={`avatar ${size} mx-auto mb-2`}>{label}</div>
								<p className="body-xs">{px}</p>
							</div>
						))}
						<div className="text-center">
							<div
								className="avatar avatar-lg mx-auto mb-2"
								style={{ background: "var(--brand-secondary-subtle)", color: "var(--brand-secondary)" }}
							>
								F&amp;F
							</div>
							<p className="body-xs">Fig tint</p>
						</div>
					</div>
				</section>

				{/* ── Animations ───────────────────────────────────── */}
				<section>
					<p className="eyebrow-secondary mb-3">Motion</p>
					<h2 className="heading-lg text-text-primary mb-8">Animation Utilities</h2>
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
						{[
							["animate-fade-in",   "Fade In"],
							["animate-fade-up",   "Fade Up"],
							["animate-scale-in",  "Scale In"],
							["animate-fade-down", "Fade Down"],
						].map(([cls, label]) => (
							<div key={cls} className="text-center">
								<div className={`card card-body-sm ${cls} mb-3`}>
									<div className="w-10 h-10 rounded-full bg-surface-sunken mx-auto" />
								</div>
								<p className="body-xs font-mono">{cls}</p>
								<p className="body-xs text-text-tertiary">{label}</p>
							</div>
						))}
					</div>
				</section>

				{/* ── Skeleton ─────────────────────────────────────── */}
				<section>
					<p className="eyebrow-secondary mb-3">Loading</p>
					<h2 className="heading-lg text-text-primary mb-8">Skeleton Loaders</h2>
					<div className="max-w-sm card card-body space-y-4">
						<div className="flex items-center gap-3">
							<div className="skeleton avatar-lg rounded-full" style={{ width: "3.25rem", height: "3.25rem" }} />
							<div className="flex-1 space-y-2">
								<div className="skeleton h-4 rounded w-3/4" />
								<div className="skeleton h-3 rounded w-1/2" />
							</div>
						</div>
						<div className="skeleton h-32 rounded-xl" />
						<div className="space-y-2">
							<div className="skeleton h-3 rounded w-full" />
							<div className="skeleton h-3 rounded w-5/6" />
							<div className="skeleton h-3 rounded w-4/6" />
						</div>
					</div>
				</section>

			</div>

			{/* ── Footer ───────────────────────────────────────── */}
			<footer className="border-t border-border-subtle mt-24">
				<div className="container-site py-12">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
						<span className="font-display text-xl text-text-primary">
							Fuchsia & Fig
						</span>
						<p className="body-sm text-text-tertiary text-center">
							© {new Date().getFullYear()} Fuchsia and Fig. All rights reserved.
						</p>
						<div className="flex gap-6">
							<a href="/" className="link-subtle text-sm">Privacy</a>
							<a href="/" className="link-subtle text-sm">Terms</a>
							<a href="/" className="link-subtle text-sm">Contact</a>
						</div>
					</div>
				</div>
			</footer>

		</div>
	);
}
