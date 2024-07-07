export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}

export function handleSubmit(request, evt, renderLoading) {
   evt.preventDefault();
   const submitButton = evt.submitter;
   renderLoading(true, submitButton);
   request()
     .then(() => {
       evt.target.reset();
     })
     .catch((err) => {
       console.error(`Ошибка: ${err}`);
     })
     .finally(() => {
       renderLoading(false, submitButton);
     });
 }