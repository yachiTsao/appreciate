interface I18nLanguage {
  param: string;
  title: string;
}

export enum Locales {
  enUs = "en-US",
  zhTw = "zh-TW",
  zhCn = "zh-CN",
}

export const dayjsLocales = {
  en_us: "en",
  zh_cn: "zh-cn",
  zh_tw: "zh-tw",
};

export const LayoutLanguages: Array<I18nLanguage> = [
  {
    param: Locales.enUs,
    title: "English",
  },
  {
    param: Locales.zhTw,
    title: "繁體中文",
  },
  {
    param: Locales.zhCn,
    title: "简体中文",
  },
];
