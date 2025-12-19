import { atom } from "jotai";

// 모바일 메뉴 상태
export const isMobileMenuOpenAtom = atom(false);

// 활성 모달 상태
export const activeModalAtom = atom<string | null>(null);
