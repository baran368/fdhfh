document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('menuForm');
    const qrcodesDiv = document.getElementById('qrcodes');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const cafeName = document.getElementById('cafeName').value;
        const menuItems = document.getElementById('menuItems').value;
        
        fetch('/generate-qrcode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cafeName, menuItems })
        })
        .then(response => response.json())
        .then(data => {
            const qrCodeImg = document.createElement('img');
            qrCodeImg.src = data.qrCodeUrl;
            qrCodeImg.alt = 'QR Code';
            qrcodesDiv.appendChild(qrCodeImg);
        })
        .catch(error => console.error('Error:', error));
    });

    // Menü içeriğini yükle
    const urlParams = new URLSearchParams(window.location.search);
    const menuContent = urlParams.get('content');
    if (menuContent) {
        document.getElementById('menuContent').innerHTML = decodeURIComponent(menuContent);
    }
});
