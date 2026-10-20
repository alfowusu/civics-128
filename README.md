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

**Big ▶ Play all / ↺ Start over buttons** are at the top of the home screen and the Study list. They play the recorded audio, and fall back to the device voice only if the audio can't load. ⏮ from the first question (or within the first 3 seconds of it) goes back to 0:00, including the intro. ↺ restarts from the beginning and resets the saved position. Every MP3 segment (intro, category announcements, questions, answers) uses the same voice, en-US-JennyNeural at -5% rate (see `voice`/`rate` in `audio/audio.json`). Each track also lists chapters, starting with an Intro chapter at 0:00.

The local answers in the audio (Ohio senators, OH-12 representative, governor, capital) are for Athens, OH as of Oct 20, 2026. Regenerate the audio after the Nov 3, 2026 election.

## English test, speaking, N-400 practice, and weak-spot report

- **Reading test**: read 1 of up to 3 sentences out loud (speech recognition with a forgiving match, or grade yourself).
- **Writing test**: the officer's sentence plays as an MP3; you type it. Grading follows USCIS leniency (capital letters, punctuation, and small spelling slips are OK; missing important words or abbreviations are not), and the app shows a word-by-word diff. Pass with 1 of up to 3 sentences.
  - 42 reading and 40 writing sentences use **only** words from the official USCIS lists: [Reading Vocabulary](https://www.uscis.gov/sites/default/files/document/guides/reading_vocab.pdf) and [Writing Vocabulary](https://www.uscis.gov/sites/default/files/document/guides/writing_vocab.pdf) (rev. 08/08, the lists USCIS links for the current 2025 test).
- **Vocabulary**: both official lists, with audio for every word.
- **Speaking practice**: the officer reads each civics question aloud and no answer choices are shown. Answer by voice (or typing). Optional real-test rules: 20 questions, 12 to pass.
- **N-400 interview practice**: biographic questions, Part 9 "Have you ever…" questions, the oath questions, and "What does it mean?" word meanings. Based on [Form N-400](https://www.uscis.gov/n-400), Edition 01/20/25. This is not legal advice. Your answers must be truthful and match your N-400; talk to an immigration attorney if you have concerns. Spoken or typed answers are not saved; only which items you practiced is saved, on your device.
- **Weak-spot report**: accuracy by topic, most-missed questions, a 30-day chart, reading/writing results, and a one-tap "Practice these" set.

All voice clips (`audio/clips/`, 464 files, about 10 MB) use the same en-US-JennyNeural voice as the long recordings. They are cached the first time they play, and **Download all audio for offline** saves everything.
