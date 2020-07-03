/* eslint-disable comma-dangle */
export default async function getRoundWords() {
  const page = Math.round(0 - 0.5 + Math.random() * (10 - 0 + 1));
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/words?group=0&page=${page}&wordsPerExampleSentenceLTE=10&wordsPerPage=5`
  );

  const roundWordsArr = await rawResponse.json();
  return roundWordsArr;
}
