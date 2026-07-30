const path = require("path");
const { spawn } = require("child_process");

// ======================================
// Speech To Text Service
// ======================================

const speechToText = (audioPath) => {
  return new Promise((resolve, reject) => {

    const pythonScript = path.join(
      __dirname,
      "..",
      "python",
      "transcribe.py"
    );

    // const pythonExecutable =
    //   process.env.PYTHON_PATH || "python";
    const pythonExecutable =
  process.env.PYTHON_PATH ||
  "C:\\Users\\sumit\\OneDrive\\Desktop\\Projects\\AI powered interview preparation\\venv\\Scripts\\python.exe";

    console.log("==================================");
    console.log("Starting Speech To Text");
    console.log("Python :", pythonExecutable);
    const fs = require("fs");

console.log(
  "Python Exists:",
  fs.existsSync(pythonExecutable)
);
    console.log("Script :", pythonScript);
    console.log("Audio  :", audioPath);
    console.log("==================================");

    // const python = spawn(pythonExecutable, [
    //   pythonScript,
    //   audioPath,
    // ]);

    const python = spawn(
  pythonExecutable,
  [pythonScript, audioPath],
  {
    env: {
      ...process.env,
      PYTHONIOENCODING: "utf-8",
    },
  }
);
    let transcript = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
      console.log("STDOUT:");
      console.log(data.toString());

      transcript += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.log("STDERR:");
      console.log(data.toString());

      errorOutput += data.toString();
    });

    python.on("close", (code) => {

      console.log("Python exited with code:", code);

      if (code !== 0) {

        console.log("Whisper Error:");
        console.log(errorOutput);

        return reject(
          new Error(errorOutput || "Speech-to-text failed.")
        );

      }

      console.log("Transcript:");
      console.log(transcript);

      resolve(transcript.trim());

    });

    python.on("error", (err) => {
      console.log("Spawn Error:");
      console.log(err);

      reject(err);
    });

  });
};

module.exports = {
  speechToText,
};