export const extractError = (error) => {
  if (error instanceof Error && undefined !== error.response) {
    return ' Error: ' + error.response.data.error + '.';
  }

  return '';
}
