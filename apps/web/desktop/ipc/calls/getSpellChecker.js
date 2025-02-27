/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2023 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { getIsSpellCheckerEnabled } from "../../config/spellChecker";

const LANGUAGES = {
  af: "Afrikaans",
  bg: "Bulgarian",
  ca: "Catalan",
  cs: "Czech",
  cy: "Welsh",
  da: "Danish",
  de: "German",
  "de-DE": "German (Germany)",
  el: "Greek",
  en: "English",
  "en-AU": "English (Australia)",
  "en-CA": "English (Canada)",
  "en-GB": "English (UK)",
  "en-GB-oxendict": "English (UK Oxford)",
  "en-US": "English (US)",
  es: "Spanish",
  "es-419": "Spanish (Latin America)",
  "es-AR": "Spanish (Argentina)",
  "es-ES": "Spanish (Spain)",
  "es-MX": "Spanish (Mexico)",
  "es-US": "Spanish (US)",
  et: "Estonian",
  fa: "Persian",
  fo: "Faroese",
  fr: "French",
  "fr-FR": "French (France)",
  he: "Hebrew",
  hi: "Hindi",
  hr: "Croatian",
  hu: "Hungarian",
  hy: "Armenian",
  id: "Indonesian",
  it: "Italian",
  "it-IT": "Italian (Italy)",
  ko: "Korean",
  lt: "Lithuanian",
  lv: "Latvian",
  nb: "Norwegian Bokmål",
  nl: "Dutch",
  pl: "Polish",
  pt: "Portuguese",
  "pt-BR": "Portuguese (Brazil)",
  "pt-PT": "Portuguese (Portugal)",
  ro: "Romanian",
  ru: "Russian",
  sh: "Serbo-Croatian",
  sk: "Slovak",
  sl: "Slovenian",
  sq: "Albanian",
  sr: "Serbian",
  sv: "Swedish",
  ta: "Tamil",
  tg: "Tajik",
  tr: "Turkish",
  uk: "Ukrainian",
  vi: "Vietnamese"
};

/**
 *
 * @param {*} args
 * @param {import("electron").BrowserWindow} win
 * @returns
 */
export default function (_args, win) {
  if (!win) return;

  return {
    enabled: getIsSpellCheckerEnabled(),
    languages: win.webContents.session.availableSpellCheckerLanguages.map(
      (code) => ({
        code,
        name: LANGUAGES[code]
      })
    ),
    enabledLanguages: win.webContents.session
      .getSpellCheckerLanguages()
      .map((code) => ({
        code,
        name: LANGUAGES[code]
      }))
  };
}
