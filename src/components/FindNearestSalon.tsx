

const salons = [
  { name: 'Salon Tây Hồ', lat: 21.079153, lng: 105.818443 },
  { name: 'Salon Trần Duy Hưng', lat: 21.013347, lng: 105.800318 },
  { name: 'Salon Cầu Giấy', lat: 21.035683, lng: 105.790421 }
];

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const FindNearestSalon = () => {
  const handleClick = () => {
    if (!navigator.geolocation) {
      alert('Trình duyệt của bạn không hỗ trợ định vị.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let nearestSalon = salons[0];
        let minDistance = Infinity;
        salons.forEach((salon) => {
          const distance = getDistance(latitude, longitude, salon.lat, salon.lng);
          if (distance < minDistance) {
            minDistance = distance;
            nearestSalon = salon;
          }
        });
        const url = `https://www.google.com/maps/search/?api=1&query=${nearestSalon.lat},${nearestSalon.lng}`;
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Lỗi lấy vị trí:', error);
        alert('Không thể lấy vị trí của bạn. Vui lòng bật định vị.');
      }
    );
  };

  return (
    <div className="my-8 p-4 text-center">
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Tìm Salon Gần Nhất
      </button>
    </div>
  );
};

export default FindNearestSalon;
