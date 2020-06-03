import places from 'places.js'

export const initAutocomplete = () => {
  const input = document.getElementById('address-input');

  if (input) {
    const placesAutocomplete = places({
      container: input
    });
  }
};
