
"use client";

import { useEffect, useRef, useState } from "react";

type Sound = {
  hira: string;
  romaji: string;
  aliases: string[];
  audio: string;
};

type SoundGroup = {
  name: string;
  sounds: Sound[];
};

function makeSounds(text: string): Sound[] {
  return text.trim().split(/\s+/).map((item) => {
    const [hira, romaji, aliasText, audioText] = item.split(":");

    return {
      hira,
      romaji,
      aliases: [romaji, ...(aliasText ? aliasText.split(",") : [])],
      audio: audioText || romaji,
    };
  });
}

const groups: SoundGroup[] = [
  {
    name: "清音",
    sounds: makeSounds(`
      あ:a い:i う:u え:e お:o
      か:ka き:ki く:ku け:ke こ:ko
      さ:sa し:shi:si す:su せ:se そ:so
      た:ta ち:chi:ti つ:tsu:tu て:te と:to
      な:na に:ni ぬ:nu ね:ne の:no
      は:ha ひ:hi ふ:fu:hu へ:he ほ:ho
      ま:ma み:mi む:mu め:me も:mo
      や:ya ゆ:yu よ:yo
      ら:ra り:ri る:ru れ:re ろ:ro
      わ:wa を:wo ん:n
    `),
  },
  {
    name: "浊音",
    sounds: makeSounds(`
      が:ga ぎ:gi ぐ:gu げ:ge ご:go
      ざ:za じ:ji::ji ず:zu::zu ぜ:ze ぞ:zo
      だ:da ぢ:ji:di:di づ:zu:du:du で:de ど:do
      ば:ba び:bi ぶ:bu べ:be ぼ:bo
    `),
  },
  {
    name: "半浊音",
    sounds: makeSounds(`
      ぱ:pa ぴ:pi ぷ:pu ぺ:pe ぽ:po
    `),
  },
  {
    name: "拗音",
    sounds: makeSounds(`
      きゃ:kya きゅ:kyu きょ:kyo
      しゃ:sha しゅ:shu しょ:sho
      ちゃ:cha ちゅ:chu ちょ:cho
      にゃ:nya にゅ:nyu にょ:nyo
      ひゃ:hya ひゅ:hyu ひょ:hyo
      みゃ:mya みゅ:myu みょ:myo
      りゃ:rya りゅ:ryu りょ:ryo
      ぎゃ:gya ぎゅ:gyu ぎょ:gyo
      じゃ:ja じゅ:ju じょ:jo
      びゃ:bya びゅ:byu びょ:byo
      ぴゃ:pya ぴゅ:pyu ぴょ:pyo
    `),
  },
];

const categories = ["全部", ...groups.map((group) => group.name)];
const ROUND_SIZE = 30;

const dailyQuotes = [
  "如果你觉得这里不够好，就亲手去改善它，不要只想着逃离它。",
  "你若嫌弃环境有缺憾，就从自己做起去修正，而不是抱怨之后转身离开。",
  "不要一看到不足就想着出走，有能力的人，会留下来去改变这片土地。",
  "如果你觉得周遭不够理想，不必急于远走，试着做一点建设，而不是一味逃避。",
  "当你看见这里的缺点，不要只顾着吐槽与离开，试着成为改善它的一份力量。",
  "不要抱怨所处的环境，与其选择逃离，不如躬身建设。",
  "你所站立的地方，若有不足，不必远遁，你的行动，就是最好的改变。",
  "觉得身边风气不好，就从你自己做好，去影响他人，而不是抽身躲开。",
  "遇到不完美的环境，逃避是最简单的选择，留下来建设，才更有力量。",
  "不要等着别人把一切变好，如果你不满意，就亲自参与建设，不要一走了之。",
  "倘若你觉得这片地方有缺憾，不要只做旁观者去批判，试着做建设者去修补。",
  "与其寻找完美的避难之地，不如留下来，把当下的地方慢慢变好。",
  "环境不会自动变好，你若心生不满，与其逃离，不如躬身去建设。",
  "如果你觉得身边缺少光亮，不必逃向远方，你自己，就可以成为一束光。",
  "不要因为有瑕疵就舍弃脚下这片土地，一起修正它，远比单纯远离更有意义。",
  "真正的强者，发现环境的问题，选择留下来改造，而不是转身逃避。",
  "你不必等万事完美才留下，不满意，就动手建设，而不是等待、逃离。",
  "当你对当下的环境失望，别着急离开，试着用微小行动去慢慢重塑它。",
  "不要只去指责这里的不足，与其远离，不如用行动参与，慢慢完善它。",
  "你站在哪里，哪里便是你的阵地，阵地有缺憾，要做的是修缮，不是弃守。",
  "如果你觉得大家不够文明，就从你开始守规矩，去带动身边人，不要默默走开。",
  "逃避只能躲开问题，唯有留下来建设，才能真正解决问题。",
  "不必幻想远方一定更好，如果你对当下不满，试着建设眼前的这片天地。",
  "看见缺点就想着逃离是本能，留下来去建设，才是选择与担当。",
  "不要把所有期待寄托在别处，不满意当下，就亲手去建设它。",
  "环境的改变，始于每一个不愿逃离、愿意建设的普通人。",
  "如果你觉得这里不够温暖，不要转身远行，试着做那个传递温暖的人。",
  "不要一味抱怨周遭的不完美，与其远离，不如躬身入局，一起修缮。",
  "远方不会自动救赎你，如果你对当下不满，留下来建设才是出路。",
  "你怎么样，这片地方便怎么样；你愿意建设，它才会慢慢变得更好。",
];

function toKatakana(hira: string) {
  return hira.replace(/[ぁ-ゖ]/g, (character) =>
    String.fromCharCode(character.charCodeAt(0) + 0x60)
  );
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function createRound(pool: Sound[]): Sound[] {
  if (pool.length === 0) return [];

  const result: Sound[] = [];
  const shuffledPool = shuffle(pool);

  while (result.length < ROUND_SIZE) {
    const batch = shuffle(shuffledPool);

    if (
      result.length > 0 &&
      batch.length > 1 &&
      batch[0].hira === result[result.length - 1].hira
    ) {
      [batch[0], batch[1]] = [batch[1], batch[0]];
    }

    result.push(...batch);
  }

  return result.slice(0, ROUND_SIZE);
}

export default function Home() {
  const [kanaType, setKanaType] = useState<"平假名" | "片假名">("平假名");
  const [learningGroup, setLearningGroup] = useState("清音");
  const [testGroup, setTestGroup] = useState("全部");
  const [round, setRound] = useState<Sound[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [mistakes, setMistakes] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [dailyQuote, setDailyQuote] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advancedRef = useRef(false);

  const learningSounds =
    groups.find((group) => group.name === learningGroup)?.sounds ?? [];

  const question = round[questionIndex] ?? null;

  const displayKana = (sound: Sound) =>
    kanaType === "平假名" ? sound.hira : toKatakana(sound.hira);

  const score = ROUND_SIZE - mistakes.length;
  const accuracy = Math.round((score / ROUND_SIZE) * 100);

  function stopAudioAndTimer() {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }

  function startRound(category = testGroup) {
    stopAudioAndTimer();

    const pool =
      category === "全部"
        ? groups.flatMap((group) => group.sounds)
        : groups.find((group) => group.name === category)?.sounds ?? [];

    setRound(createRound(pool));
    setQuestionIndex(0);
    setAnswer("");
    setFeedback("idle");
    setMistakes([]);
    setFinished(false);
    advancedRef.current = false;

    setTimeout(() => inputRef.current?.focus(), 100);
  }

  useEffect(() => {
    startRound("全部");

    return () => {
      stopAudioAndTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storageKey = "japanese-learning-last-quote";

    try {
      const previousQuote = window.localStorage.getItem(storageKey);
      const candidates = dailyQuotes.filter(
        (quote) => quote !== previousQuote
      );
      const pool = candidates.length > 0 ? candidates : dailyQuotes;
      const nextQuote = pool[Math.floor(Math.random() * pool.length)];

      setDailyQuote(nextQuote);
      window.localStorage.setItem(storageKey, nextQuote);
    } catch {
      setDailyQuote(
        dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)]
      );
    }
  }, []);

  function playLearningAudio(sound: Sound) {
    stopAudioAndTimer();

    const audio = new Audio(`/audio/${sound.audio}.mp3`);
    audioRef.current = audio;

    audio.play().catch((error) => {
      console.error("音频播放失败，请检查 MP3 文件：", error);
    });
  }

  function advanceQuestion() {
    if (advancedRef.current) return;

    advancedRef.current = true;
    stopAudioAndTimer();

    if (questionIndex + 1 >= ROUND_SIZE) {
      setFinished(true);
      setFeedback("idle");
      return;
    }

    setQuestionIndex((index) => index + 1);
    setAnswer("");
    setFeedback("idle");
    advancedRef.current = false;

    setTimeout(() => inputRef.current?.focus(), 80);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!question || finished || feedback === "correct") return;

    const normalized = answer.trim().toLowerCase();
    if (!normalized) return;

    if (question.aliases.includes(normalized)) {
      setFeedback("correct");
      stopAudioAndTimer();

      const audio = new Audio(`/audio/${question.audio}.mp3`);
      audioRef.current = audio;

      let hasAdvanced = false;

      const advanceOnce = () => {
        if (hasAdvanced) return;
        hasAdvanced = true;

        if (advanceTimer.current) {
          clearTimeout(advanceTimer.current);
          advanceTimer.current = null;
        }

        advanceQuestion();
      };

      audio.addEventListener("ended", advanceOnce, { once: true });
      advanceTimer.current = setTimeout(advanceOnce, 4000);

      audio.play().catch((error) => {
        console.error("音频播放失败，请检查 MP3 文件：", error);

        if (advanceTimer.current) clearTimeout(advanceTimer.current);
        advanceTimer.current = setTimeout(advanceOnce, 600);
      });
    } else {
      setFeedback("wrong");

      if (!mistakes.includes(questionIndex)) {
        setMistakes((previous) => [...previous, questionIndex]);
      }
    }
  }

  function changeTestGroup(value: string) {
    setTestGroup(value);
    startRound(value);
  }

  return (
    <main
      lang="ja"
      className="min-h-screen bg-[#faf9f6] text-[#37352f] [font-family:'Hiragino_Kaku_Gothic_ProN','Hiragino_Sans','Yu_Gothic','Meiryo',sans-serif]"
    >
      <div className="mx-auto w-full max-w-[1180px] px-4 py-7 sm:px-7 sm:py-9 lg:px-9">
        <header className="mb-8 flex items-center justify-between gap-4 sm:mb-10">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#f3e9e5] px-3.5 py-1.5 text-xs tracking-wide text-[#987673]">
              <span>✿</span>
              <span>にほんご · Japanese</span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
              五十音を学ぼう
            </h1>
            <p className="mt-2 text-sm leading-7 text-[#918b82] sm:text-base">
              每一次练习，都是一点点进步。
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f3e8e4] text-2xl sm:h-14 sm:w-14">
            🌸
          </div>
        </header>

        <section className="rounded-[24px] border border-[#eeece6] bg-white p-4 shadow-[0_5px_24px_rgba(55,48,38,0.025)] sm:p-6 lg:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs tracking-[0.16em] text-[#b18b88]">
                LESSON 01
              </p>
              <h2 className="mt-1.5 text-xl font-medium sm:text-2xl">
                五十音学习
              </h2>
            </div>

            <div className="flex w-full rounded-xl bg-[#f6f5f1] p-1 sm:w-auto">
              {(["平假名", "片假名"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setKanaType(type)}
                  className={`flex-1 rounded-lg px-5 py-2.5 text-sm transition sm:flex-none sm:px-6 ${
                    kanaType === type
                      ? "bg-white font-medium text-[#4c4943] shadow-sm"
                      : "text-[#939087] hover:text-[#4c4943]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {groups.map((group) => (
              <button
                key={group.name}
                onClick={() => setLearningGroup(group.name)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  learningGroup === group.name
                    ? "border-[#ddc0bb] bg-[#f8efec] font-medium text-[#875f62]"
                    : "border-[#eceae4] bg-white text-[#77746b] hover:bg-[#faf9f6]"
                }`}
              >
                {group.name}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-5 sm:gap-3 md:grid-cols-7 lg:grid-cols-10">
            {learningSounds.map((sound) => (
              <button
                key={sound.hira}
                onClick={() => playLearningAudio(sound)}
                title={`播放 ${displayKana(sound)} 的发音`}
                className="group flex min-h-[88px] flex-col items-center justify-center rounded-[17px] border border-[#f0eee8] bg-[#fdfcf9] transition hover:-translate-y-0.5 hover:border-[#e3c7c3] hover:bg-[#fff8f7] active:scale-[0.98] sm:min-h-[102px]"
              >
                <span className="text-3xl font-normal text-[#37352f] transition group-hover:text-[#a46e73] sm:text-4xl">
                  {displayKana(sound)}
                </span>
                <span className="mt-1.5 text-xs text-[#aaa69d]">
                  {sound.romaji}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs text-[#aaa69d] sm:text-sm">
            ♡ 点击假名，听一听它的发音。
          </p>
        </section>

        <section className="mt-6 rounded-[24px] border border-[#eeece6] bg-white p-4 shadow-[0_5px_24px_rgba(55,48,38,0.025)] sm:mt-7 sm:p-6 lg:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs tracking-[0.16em] text-[#b18b88]">
                PRACTICE
              </p>
              <h2 className="mt-1.5 text-xl font-medium sm:text-2xl">
                练习时间
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-[#918b82]">
                每轮 30 题。答对听发音，完成后查看成绩。
              </p>
            </div>

            {!finished && (
              <div className="rounded-xl bg-[#faf5f2] px-4 py-3 sm:min-w-32">
                <div className="text-xs text-[#a38a83]">答题进度</div>
                <div className="mt-1 text-xl font-medium tabular-nums text-[#755a57]">
                  {questionIndex + 1}
                  <span className="ml-1 text-sm font-normal text-[#bca9a2]">
                    / {ROUND_SIZE}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="testKanaType"
                className="mb-1.5 block text-sm text-[#77746b]"
              >
                假名类型
              </label>
              <select
                id="testKanaType"
                value={kanaType}
                onChange={(event) =>
                  setKanaType(event.target.value as "平假名" | "片假名")
                }
                className="w-full rounded-xl border border-[#eeece6] bg-[#fdfcf9] px-3.5 py-3 text-sm outline-none focus:border-[#d9b6b3]"
              >
                <option value="平假名">平假名</option>
                <option value="片假名">片假名</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="testCategory"
                className="mb-1.5 block text-sm text-[#77746b]"
              >
                测试分类
              </label>
              <select
                id="testCategory"
                value={testGroup}
                onChange={(event) => changeTestGroup(event.target.value)}
                className="w-full rounded-xl border border-[#eeece6] bg-[#fdfcf9] px-3.5 py-3 text-sm outline-none focus:border-[#d9b6b3]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!finished && question && (
            <div className="mx-auto mt-6 max-w-xl sm:mt-8">
              <div className="rounded-[22px] bg-[#faf9f6] px-4 py-6 text-center sm:px-8 sm:py-9">
                <p className="text-sm text-[#89877f]">
                  这个假名的罗马音是什么？
                </p>

                <div className="my-5 text-7xl font-normal text-[#37352f] sm:my-7 sm:text-8xl">
                  {displayKana(question)}
                </div>

                <form onSubmit={handleSubmit}>
                  <input
                    ref={inputRef}
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    disabled={feedback === "correct"}
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="输入罗马音，例如 ka"
                    className="w-full rounded-xl border border-[#eae7df] bg-white px-4 py-3.5 text-center text-lg outline-none transition placeholder:text-sm placeholder:text-[#c0bcb3] focus:border-[#d9b6b3] sm:py-4 sm:text-xl"
                  />

                  <button
                    type="submit"
                    disabled={!answer.trim() || feedback === "correct"}
                    className="mt-3 w-full rounded-xl bg-[#393832] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#504d46] disabled:cursor-not-allowed disabled:opacity-40 sm:py-4"
                  >
                    确认答案
                  </button>
                </form>

                {feedback === "correct" && (
                  <div className="mt-4 rounded-xl bg-[#edf5ec] px-4 py-3 text-sm text-[#547c54]">
                    ✓ 正确！听一下发音吧。
                  </div>
                )}

                {feedback === "wrong" && (
                  <div className="mt-4 rounded-xl bg-[#fbefed] px-4 py-4 text-left">
                    <p className="text-sm font-medium text-[#a45f60]">
                      再试一次吧 ♡
                    </p>
                    <p className="mt-2 text-sm text-[#77746b]">
                      正确答案：{question.aliases.join(" / ")}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setAnswer("");
                        setFeedback("idle");
                        inputRef.current?.focus();
                      }}
                      className="mt-3 rounded-lg border border-[#eaded9] bg-white px-4 py-2 text-sm text-[#77746b] hover:bg-[#fffaf8]"
                    >
                      重新输入
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[#aaa69d] sm:text-sm">
                  本轮答错：{mistakes.length} 题
                </p>
                <button
                  type="button"
                  onClick={advanceQuestion}
                  className="rounded-lg border border-[#eeece6] px-4 py-2.5 text-sm text-[#89877f] transition hover:bg-[#faf9f6]"
                >
                  跳过这题 →
                </button>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#f0eee8]">
                <div
                  className="h-full rounded-full bg-[#d7aaa7] transition-all"
                  style={{
                    width: `${((questionIndex + 1) / ROUND_SIZE) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {finished && (
            <div className="mx-auto mt-7 max-w-xl rounded-[22px] bg-[#faf5f2] px-5 py-8 text-center sm:px-8 sm:py-10">
              <div className="text-3xl">🌸</div>
              <p className="mt-3 text-sm text-[#89877f]">本轮练习完成</p>

              <div className="mt-4 text-6xl font-medium tracking-tight text-[#755a57] sm:text-7xl">
                {score}
                <span className="ml-2 text-2xl font-normal text-[#c2aaa4]">
                  / {ROUND_SIZE}
                </span>
              </div>

              <p className="mt-3 text-lg font-medium text-[#755a57]">
                正确率 {accuracy}%
              </p>

              <p className="mt-2 text-sm leading-7 text-[#89877f]">
                {accuracy >= 90
                  ? "すごい！太棒了，继续保持。"
                  : accuracy >= 70
                    ? "做得不错，再练习几次会更熟练。"
                    : "慢慢来，多练习几轮就会越来越熟悉。"}
              </p>

              <button
                type="button"
                onClick={() => startRound()}
                className="mt-6 w-full rounded-xl bg-[#393832] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#504d46] sm:w-auto sm:px-10"
              >
                再练习一轮 ♡
              </button>
            </div>
          )}
        </section>

        <section className="mx-auto mt-10 max-w-3xl px-1 pb-2 pt-2 sm:mt-14">
          <div className="relative overflow-hidden rounded-[24px] border border-[#eee5dd] bg-[#f7f1eb] px-5 py-8 text-center sm:px-12 sm:py-10">
            <div className="pointer-events-none absolute left-4 top-3 select-none text-3xl text-[#e8d8cd] opacity-80 sm:left-8 sm:top-5 sm:text-4xl">
              「
            </div>

            <div className="pointer-events-none absolute bottom-0 right-4 select-none text-3xl text-[#e8d8cd] opacity-80 sm:right-8 sm:text-4xl">
              」
            </div>

            <div className="relative">
              <div className="mb-3 text-lg text-[#b99a8d]">✿</div>

              <p className="text-xs tracking-[0.25em] text-[#aa9184]">
                给自己的一句话
              </p>

              <div
                className="mx-auto mt-5 max-w-2xl text-xl leading-[2.1] text-[#625248] sm:text-2xl sm:leading-[2.2]"
                style={{
                  fontFamily:
                    '"STKaiti", "Kaiti SC", "KaiTi", "楷体", "华文楷体", "STSong", "Noto Serif CJK SC", serif',
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  textWrap: "pretty",
                }}
              >
                {dailyQuote}
              </div>

              <div className="mx-auto mt-6 h-px w-10 bg-[#d9c3b5]" />

              <p className="mt-4 text-xs tracking-wider text-[#b09c8e]">
                愿你有所热爱，也愿你亲手改变。
              </p>
            </div>
          </div>
        </section>

        <footer className="pb-3 pt-5 text-center text-xs tracking-wide text-[#b8b1a7]">
          ことばを少しずつ、楽しく。
        </footer>
      </div>
    </main>
  );
}
