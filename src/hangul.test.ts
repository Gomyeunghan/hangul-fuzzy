import { describe, expect, it } from "vitest";
import { disassemble, getChoseong } from "./hangul";

// 세팅 확인용. 2단계 테스트 케이스는 따로 추가 예정
describe("setup", () => {
  it("exports functions", () => {
    expect(typeof disassemble).toBe("function");
    expect(typeof getChoseong).toBe("function");
  });
  it("debug", () => {
    console.log(disassemble("프미나"));
  });
  it("getChoseung Debug", () => {
    console.log(getChoseong("프론트"));
  });
});
