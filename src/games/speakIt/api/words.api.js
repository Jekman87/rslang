import { WORDS_URL } from './constants';

export async function getWords(config) {
  const { page, group } = config;
  try {
    const url = `${WORDS_URL}page=${page}&group=${group}`;
    const request = await fetch(url);
    const response = await request.json();
    return response;
  } catch (err) {
    return err;
  }
}

export { getWords as default };
