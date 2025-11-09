 // Initialize Google Maps with user's live location
function initMap() {
  const mapDiv = document.getElementById('map');
  const defaultPosition = { lat: 17.385044, lng: 78.486671 }; // Default: India

  const map = new google.maps.Map(mapDiv, {
    zoom: 13,
    center: defaultPosition,
    mapTypeId: 'roadmap',
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#e0f7fa' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#00796b' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] }
    ]
  });

  const marker = new google.maps.Marker({
    position: defaultPosition,
    map: map,
    title: "Your Device Location",
    animation: google.maps.Animation.DROP
  });

  // Get user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        marker.setPosition(userPos);
        map.setCenter(userPos);
        marker.setTitle("Your Current Location");
      },
      function() {
        console.log("Location access denied");
      }
    );
  }
}

// SOS Button Alert
document.addEventListener('DOMContentLoaded', function() {
  const sosButton = document.querySelector('.sos-button');
  if (sosButton) {
    sosButton.addEventListener('click', function() {
      alert('🚨 SOS Alert Triggered!\n\nYour location and emergency alert have been sent to your trusted contacts.\n\nStay safe!');
    });
  }
});

// Smooth scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.8s ease-out';
  observer.observe(section);
});

// Initialize map when page loads
window.onload = function() {
  if (typeof google !== "undefined" && google.maps) {
    initMap();
  }
};
