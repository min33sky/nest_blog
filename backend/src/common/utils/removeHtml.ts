import sanitize, * as sanitizeHtml from 'sanitize-html';

const sanitizeOption: sanitize.IOptions = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
    'strong',
    'em',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

/**
 * 게시물 작성 & 수정시 특정 HTML 필터링
 * @param content HTML이 포함된 문자열
 * @returns
 */
export const createAndUpdateHtml = (content: string) => {
  const filtered = sanitizeHtml(content, sanitizeOption);
  return filtered;
};

/**
 * 문자열에서 HTML을 제거하고 길이 제한하기
 * @param content HTML이 포함된 문자열
 * @returns
 */
export const removeHtmlAndShorten = (content: string) => {
  const filtered = sanitizeHtml(content, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};
