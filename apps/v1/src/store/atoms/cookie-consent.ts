import type { ConsentStatus } from "@/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const STORAGE_KEY = "cookie-consent";

// localStorage에 자동 동기화되는 atom
export const cookieConsentAtom = atomWithStorage<ConsentStatus>(
  STORAGE_KEY,
  "unknown"
);

// 초기화 완료 상태 (hydration 처리)
export const isConsentReadyAtom = atom(false);

// 파생 atom - 쿠키 사용 가능 여부
export const canUseCookiesAtom = atom((get) => {
  const status = get(cookieConsentAtom);
  const isReady = get(isConsentReadyAtom);
  return isReady && status === "accepted";
});
