// 2단계에서 직접 구현할 부분. 시그니처만 잡아둠.
const CHO = [..."ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"]; // 19개
const JUNG = [..."ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ"]; // 21개
const JONG = ["", ..."ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ"]; // 28개 (0번 = 받침 없음)

/** '프' → ['ㅍ', 'ㅡ'], '각' → ['ㄱ', 'ㅏ', 'ㄱ']. 한글이 아니면 [char] 그대로 */
export function disassemble(char: string): string[] {
  const codeAt = char.charCodeAt(0);
  if (codeAt >= 0xac00 && codeAt <= 0xd7a3) {
    const offset = codeAt - 0xac00;
    const initialSound = Math.floor(offset / 588); // 초성 * 중성의 개수
    const medial = Math.floor((offset % 588) / 28);
    const finalConsonant = offset % 28;

    const cho = CHO[initialSound];
    const jung = JUNG[medial];
    const jong = JONG[finalConsonant];

    let arr: string[] = [];
    if (cho && jung) {
      if (jong == "") {
        arr = [cho, jung];
      } else if (jong) {
        arr = [cho, jung, jong];
      }
    }

    return arr;
  }

  return [char];
}

/** '프론트엔드' → 'ㅍㄹㅌㅇㄷ'. 한글이 아닌 문자는 그대로 둔다 */
export function getChoseong(text: string): string {
  let result = "";
  const disassembleStr: string[][] = [];
  const arr = [...text];
  arr.forEach((element) => {
    disassembleStr.push(disassemble(element));
  });

  if (disassembleStr[0] && disassembleStr[0][0]) {
    for (let index = 0; index < disassembleStr.length; index++) {
      const chars = disassembleStr[index];
      if (!chars) return "";
      result += chars[0];
    }
  }

  return result;
}
