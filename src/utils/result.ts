/* eslint-disable @typescript-eslint/no-explicit-any */

interface Result {
  successful: boolean;
  data: any;
  errorMesg?: string
}

function formatResult(data: any, errorMesg?: string): Result {
  if (errorMesg) {
    return {
      successful: false,
      errorMesg: errorMesg,
      data: null
    }
  }
  return {
    successful: true,
    data: data
  }
}

export default formatResult;