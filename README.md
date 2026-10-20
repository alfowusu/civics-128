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

## Interview practice

- **Speaking practice**: the officer reads each civics question aloud and no answer choices are shown. Answer by voice (or typing), with forgiving matching and an "I was right" override. Optional real-test rules: 20 questions, 12 to pass (stops at 12 right or 9 wrong).
- **Weak-spot report**: topic coverage for all 8 topics (accuracy, questions tried, attempts, last practiced) with a status for each, a recommended next topic with a one-tap "Practice this topic" button, never-seen questions, most-missed questions, a 30-day progress chart, speaking results, and a "Practice these" set.
  - Status rules: **Strong** = 85%+ correct and at least 70% of the topic's questions tried. **Needs work** = under 85% correct with 70%+ tried, or under 60% after 5+ answers. **Not practiced enough** = under 70% tried. **Not started** = no answers yet.

## Daily goal, night mode, memory tips

- **Daily goal**: choose 5, 10 (default), 20, or 30 questions a day. A ring on the home screen fills as you answer in any mode, with a celebration when you reach the goal. The day streak counts the days in a row you hit your goal.
- **Night mode**: Match phone setting (default), Light, or Dark. The choice is saved on the device. Text contrast is checked against WCAG AA on every screen in both themes.
- **Memory tips**: a short tip for each of the 128 questions. Tips appear after you answer, on flashcard backs, and behind a "Tip" button in the study list. They never replace the official answers. For questions whose answer depends on where you live or who holds office, the tip is general.
- **Full-sentence answers**: typed or spoken answers like "I think it's the 14th Amendment" or "It was adopted on July 4th 1776" are understood. Wrong numbers, negations, and "vice president" for "president" are still rejected.

The question clips (`audio/clips/sq1.mp3` … `sq128.mp3`, about 3 MB) use the same en-US-JennyNeural voice as the long recordings. They are cached the first time they play, and **Download all audio for offline** saves them with the recordings.
