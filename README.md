# Civics 128

A free practice app for the **2025 version of the USCIS naturalization civics test** (128 questions). Questions and answers come from USCIS document M-1778 (09/25), "128 Civics Questions and Answers (2025 version)".

Live app: https://alfowusu.github.io/civics-128/

- Flashcards, quiz (tap, type or speak your answer), mock interview (up to 20 questions, 12 to pass; 65/20 mode: 10 questions, 6 to pass) and a "review my misses" mode
- Works offline and can be added to your phone's home screen
- Progress is saved only on your device

This is an unofficial study aid, not affiliated with USCIS. Some answers change with elections. Check https://www.uscis.gov/citizenship/testupdates before your interview.

## Audio mode (works with the screen locked)

Pre-recorded MP3s of all 128 questions with every accepted answer, read in order with spoken category announcements. They live in `audio/` and are listed in `audio/audio.json`. Open **Study list → Audio mode** to play them. Because they use a normal `<audio>` element, playback keeps going with the phone locked, and the lock screen shows the current track.

- `civics128-all.mp3`: all 128 questions (about 40 min)
- `01-…08-*.mp3`: one file per category
- `6520-starred.mp3`: the 20 ★ questions for the 65/20 test

Format: mono, 48 kbps, 24 kHz, with ID3 chapters. The voice is synthetic (Microsoft Edge neural TTS, en-US-JennyNeural). The service worker does not precache the MP3s. Use **Download audio for offline** to save them (about 31 MB).

The local answers in the audio (Ohio senators, OH-12 representative, governor, capital) are for Athens, OH as of Oct 20, 2026. Regenerate the audio after the Nov 3, 2026 election.
