// =========================================
// Speech Transcription Service
// =========================================
//
// Placeholder implementation.
//
// Later this function will use:
//
// • Google Gemini Speech API
// OR
// • OpenAI Whisper API
//
// to convert audio into text.
//

const transcribeSpeech = async (audioPath) => {
  try {
    /*
      TODO

      Read audio file

      Send to Speech-to-Text API

      Return transcription
    */

    return "";
  } catch (error) {
    console.error("Speech Transcription Error:", error);
    return "";
  }
};

module.exports = {
  transcribeSpeech,
};