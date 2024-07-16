import { notification } from './notification';

export const handleCopyClick = (text = '') => {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  document.execCommand('copy');

  document.body.removeChild(textArea);
  if (text === '') {
    notification('oops clipboard is empty', 'error');
  }
  notification('copied to clipboard: ' + text);
};
