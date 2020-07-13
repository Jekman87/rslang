export default function createAlertHTML(data) {
  const { type, text } = data;
  return `
  <div class="alert alert-dismissible alert-${type}">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <p>${text}</p>
  </div>
  `;
}
