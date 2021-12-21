/* eslint-disable @typescript-eslint/no-explicit-any */

interface Result {
  successful: boolean;
  data: any;
  errorMesg?: string | Error
}

function formatResult(data: any, errorMesg?: string | Error): Result {
  if (errorMesg instanceof Error) {
    return {
      successful: false,
      errorMesg: errorMesg.name + ': ' + errorMesg.message + ': ' + errorMesg.stack,
      data: null
    }
  } else if (typeof errorMesg === 'string') {
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