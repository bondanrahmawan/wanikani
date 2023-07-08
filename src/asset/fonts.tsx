import localFont from "next/font/local";
import { Noto_Sans_JP, Zen_Kaku_Gothic_Antique, Zen_Kaku_Gothic_New } from "next/font/google";

export const notoSansJP = Noto_Sans_JP({
	subsets: ["cyrillic"],
	weight: "300",
});

export const zenkakuGothicAntique = Zen_Kaku_Gothic_Antique({
	subsets: ["cyrillic"],
	weight: "300",
});

export const zenkakuGothicNew = Zen_Kaku_Gothic_New({
	subsets: ["cyrillic"],
	weight: "300",
});

export const hiraginoKaku = localFont({
	src: "./hiraginoKaku/hiraginoKaku.otf",
	display: "swap",
});
