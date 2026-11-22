import Navigations from './navigations'

const AppSidebar = () => {
	return (
		<aside className="h-screen w-64 bg-surface-container-lowest border-r border-outline-variant/30 z-50 flex flex-col justify-between">
			<div className="flex flex-col">
				<div className="h-16 flex items-center gap-3 px-space-xl border-b border-outline-variant/30">
					<img
						alt="RepairFlow Logo"
						className="h-8 w-auto object-contain"
						src="https://lh3.googleusercontent.com/aida/ALJJyrAe1YHts2PQwiqQLsmN8kmI6NTQ8WgK29LRZvueGx7B_8dQU8D4zy72bQLCs11pNjDMfJQUORiQcp0EFhQqCBo1uQUbprL0uAFy2rWBgGDjxHPsBjGzK24Z9CIWFRrYwnx0Fm657fd875P106HqDmIWmnwc3h5WomVS0tydr8FHVJslaYEou3rqkMS5mS5BPqorEZ-o0Ow5HbPJZoN7xQb_3aCHhngjR2LrGKAMQJRyOA"
					/>
					<div className="flex flex-col">
						<span className="font-title-card text-title-card text-on-surface leading-none">RepairFlow</span>
						<span className="font-caption-label text-caption-label text-on-surface-variant leading-none mt-1">CMS Сервісу</span>
					</div>
				</div>
				<div className="px-space-md py-space-md">
					<div className="px-space-md py-space-xs mb-space-sm">
						<span className="font-caption-label text-caption-label uppercase tracking-wider text-outline">Робоча область</span>
					</div>
					<Navigations />
				</div>
			</div>
			<div className="p-space-md border-t border-outline-variant/30">
				<div className="p-space-md bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<span className="font-caption-label text-caption-label text-on-surface-variant">Стан черги</span>
						<span className="font-data-mono-sm text-data-mono-sm text-secondary font-bold">94% Норма</span>
					</div>
					<div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
						<div className="bg-secondary h-full rounded-full" style={{ width: '78%' }} />
					</div>
					<span className="font-caption-label text-caption-label text-outline">18 активних майстрів</span>
				</div>
			</div>
		</aside>
	)
}

export default AppSidebar
