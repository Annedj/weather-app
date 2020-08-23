export default () => {
  const days = document.querySelectorAll('.date-btn');

  if (days) {
    days.forEach((day) => {
      day.addEventListener('click', (event) => {
        event.preventDefault();

      });
    });
  };
};
