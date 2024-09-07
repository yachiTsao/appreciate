import { LayoutLanguages, type I18nLanguage } from "./config/locales";
import { modules } from "./config/module";

async function getMessages(
  modules: string[],
  LayoutLanguages: Array<I18nLanguage>,
): Promise<LocaleMessages> {
  const messages: LocaleMessages = {};
  for (const lang of LayoutLanguages) {
    messages[lang.param] = {};
  }

  for (const moduleName of modules) {
    for (const lang of LayoutLanguages) {
      try {
        const obj = await import(`./${moduleName}/${lang.param}.json`);
        if (!messages[lang.param][moduleName]) {
          messages[lang.param][moduleName] = {};
        }
        Object.assign(messages[lang.param][moduleName], obj);
      } catch (e: any) {
        console.log(e.message);
      }
    }
  }
  return messages;
}

export const messages = await getMessages(modules, LayoutLanguages);
