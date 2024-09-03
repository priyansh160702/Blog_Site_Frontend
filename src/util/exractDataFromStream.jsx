// Function to extract data from a ReadableStream
const extractDataFromStream = async (stream) => {
  const reader = stream.getReader();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    // Assuming the stream is text data
    result += new TextDecoder().decode(value);
  }

  return JSON.parse(result);
};

export default extractDataFromStream;
