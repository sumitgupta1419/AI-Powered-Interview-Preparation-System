import sys
import io

# -----------------------------
# Fix Windows Unicode Problem
# -----------------------------
sys.stdout = io.TextIOWrapper(
    sys.stdout.buffer,
    encoding="utf-8"
)

sys.stderr = io.TextIOWrapper(
    sys.stderr.buffer,
    encoding="utf-8"
)

from faster_whisper import WhisperModel

print("Python Started", flush=True)

if len(sys.argv) < 2:
    print("ERROR: Audio file path not provided.", flush=True)
    sys.exit(1)

audio_path = sys.argv[1]

print("Audio:", audio_path, flush=True)

try:

    print("Loading Whisper Model...", flush=True)

    model = WhisperModel(
        "base",
        device="cpu",
        compute_type="int8"
    )

    print("Model Loaded", flush=True)

except Exception as e:

    print(str(e), flush=True)
    sys.exit(1)

try:

    print("Starting Transcription...", flush=True)

    segments, info = model.transcribe(
        audio_path,
        beam_size=5
    )

    print("Transcription Finished", flush=True)

    transcript = ""

    for segment in segments:
        transcript += segment.text + " "

    print(transcript.strip(), flush=True)

except Exception as e:

    print(str(e), flush=True)
    sys.exit(1)