const loginUser = async (userLog) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userLog),
  });

  const content = await rawResponse.json();

  const now = new Date();
  content.tokenExpiresIn = now.setHours(now.getHours() + 4);

  return content;
};

export { loginUser as default };
