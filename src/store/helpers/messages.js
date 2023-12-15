import { isPlainObject } from 'lodash';

export const extractDisplayAnswer = (answer) => {
  const { show_html, show_text, text } = answer;

  if (typeof show_html !== 'undefined' && Array.isArray(show_html) && show_html.length) {
    return (show_html || []).map((item) => getAnswerStringValue(item));
  } else if (typeof show_text !== 'undefined' && Array.isArray(show_text) && show_text.length) {
    return show_text.map((item) => getAnswerStringValue(item));
  }
  // --- old Data types and non-answer object --- //
  else if (typeof show_text === 'string') {
    return show_text;
  } else if (Array.isArray(answer) && answer?.length) {
    return (answer || []).map((item) => getAnswerStringValue(item));
  } else if (isPlainObject(answer) && answer?.value) {
    return extractAnswerFromObjectWithValue(answer);
  } else if (typeof answer === 'string') {
    return answer;
  } else {
    return text;
  }
};

const getAnswerStringValue = (answer) => {
  if (isPlainObject(answer)) {
    return extractAnswerFromObjectWithValue(answer);
  } else if (typeof answer === 'string') {
    return answer + '\n';
  } else if (Array.isArray(answer) && answer.length) {
    return answer.map((i) => {
      if (typeof i === 'string') {
        return i + '\n';
      } else if (isPlainObject(i)) {
        return extractAnswerFromObjectWithValue(i);
      }
      return i;
    });
  }
  return '';
};

const extractAnswerFromObjectWithValue = (answer) => {
  if (answer.type === 'image') {
    return `<img src='${answer.value}' aria-label='image from answer' />`;
  } else if (answer.type === 'text' && answer.value) {
    return answer.value + '\n';
  } else if (typeof answer === 'string') {
    return answer + '\n';
  }
  return '';
};
