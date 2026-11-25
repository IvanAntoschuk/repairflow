export function genTrackId() {
	const y = new Date().getFullYear()
	const n = String(Math.floor(100 + Math.random() * 900))
	return `RF-${y}-${n}`
}