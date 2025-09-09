export async function generateNewId(collection, idName) {
	const max = await collection.find().sort({ [idName]: -1 }).limit(1);
	return max[0][idName] + 1;
}

export function haversineDistance(coords1, coords2, isMiles = false) {
	const toRad = (x) => x * Math.PI / 180;

	const lat1 = coords1.lat;
	const lon1 = coords1.lon;

	const lat2 = coords2.lat;
	const lon2 = coords2.lon;

	const R = 6371; // Radius of the Earth in km or miles
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	let distance = R * c;

	if (isMiles) {
		distance /= 1.60934; // covert KM to M
	}
	return distance;
}