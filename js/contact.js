function Location() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            const map = document.querySelector('.map');

            const iframe = document.createElement('iframe');
            iframe.src = `https://maps.google.com/maps?q=${lat},${long}&hl=es&z=14&output=embed`;
            iframe.width = '100%';
            iframe.height = '200px';
            iframe.style.border = '0';

            map.appendChild(iframe);
        }, function (error) {
            console.log("eror", error);
            
        });
    }
}
Location();
