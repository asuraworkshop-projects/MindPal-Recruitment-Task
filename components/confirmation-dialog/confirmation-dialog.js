export function showConfirmationDialog(data, onConfirm) {
  const template = document.createElement('template');
  template.innerHTML = `<dialog id="confirmation_dialog">
    <div class="confirmation-dialog">
      <span id="confirmation_dialog_title" class="text-title">${data.title}</span>
      <span id="confirmation_dialog_info" class="text-medium">${data.info}</span>
      <div class="btn-group">
        <button id="confirmation_dialog_cancel" id="confirmation_dialog_cancel" class="btn" data-btn="secondary">${data.cancelText}</button>
        <button id="confirmation_dialog_confirm" id="confirmation_dialog_confirm" class="btn" data-btn="primary">${data.confirmText}</button>
      </div>
    </div>
  </dialog>`;

  document.body.appendChild(template.content.cloneNode(true));

  const dialog = document.getElementById('confirmation_dialog');
  const confirmButton = document.getElementById('confirmation_dialog_confirm');
  const cancelButton = document.getElementById('confirmation_dialog_cancel');

  dialog.showModal();

  confirmButton.addEventListener('click', () => {
    if (onConfirm && typeof onConfirm === 'function') {
      onConfirm();
    }
    dialog.close();
    dialog.remove();
  });

  cancelButton.addEventListener('click', () => {
    dialog.close();
    dialog.remove();
  });
}
