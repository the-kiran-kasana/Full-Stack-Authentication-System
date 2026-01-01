const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

function transcribeAudio(audioPath) {
  return new Promise((resolve, reject) => {
    const command = `python3 -m whisper "${audioPath}" --model small --language en --output_format txt --output_dir ${path.dirname(audioPath)}`;

    exec(command, (error) => {
      if (error) return reject(error);

      const textPath = audioPath.replace(/\.\w+$/, ".txt");
      const text = fs.readFileSync(textPath, "utf8");
      resolve(text);
    });
  });
}

module.exports = transcribeAudio;
