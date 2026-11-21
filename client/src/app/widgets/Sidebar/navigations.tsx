import { CirclePlus, HomeIcon, Settings, Toolbox } from 'lucide-react'
import { navLink } from './sidebar.types'

const navigations: navLink[] = [
	{
		id: 1,
		name: 'Головна',
		href: '#',
		dataPath: 'holovna',
		icon: <HomeIcon size={20} color="#494551" />,
	},
	{
		id: 2,
		name: 'Замовлення',
		href: '#',
		dataPath: 'zamovlennya',
		badge: '24',
		icon: <Toolbox size={20} color="#494551" />,
	},
	{
		id: 3,
		name: 'Створити замовлення',
		href: '#',
		dataPath: 'stvoryty-zamovlennya',
		icon: <CirclePlus size={20} color="#494551" />,
	},
	{
		id: 4,
		name: 'Налаштування',
		href: '#',
		dataPath: 'nalashtuvannya',
		icon: <Settings size={20} color="#494551" />,
	},
]

const baseLinkClass = 'flex items-center px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all'

const Navigations = () => {
	return (
		<nav className="flex flex-col gap-1" data-active-classes="bg-primary-container text-on-primary font-body-strong">
			{navigations.map((nav) => (
				<a
					key={nav.id}
					href={nav.href}
					data-path={nav.dataPath}
					className={nav.badge ? `${baseLinkClass} justify-between` : `${baseLinkClass} gap-3`}
				>
					{nav.badge ? (
						<>
							<div className="flex items-center gap-3">
								{nav.icon}
								<span className="font-body-default text-body-default">{nav.name}</span>
							</div>
							<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-data-mono-sm text-data-mono-sm">{nav.badge}</span>
						</>
					) : (
						<>
							{nav.icon}
							<span className="font-body-default text-body-default">{nav.name}</span>
						</>
					)}
				</a>
			))}
		</nav>
	)
}

export default Navigations
