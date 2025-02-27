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

import { setPrivacyMode } from "../../config/privacyMode";

export default (args) => {
  if (!globalThis.window || !["win32", "darwin"].includes(process.platform))
    return;

  const { privacyMode } = args;
  globalThis.window.setContentProtection(privacyMode);

  if (process.platform === "win32") {
    globalThis.window.setThumbnailClip(
      privacyMode
        ? { x: 0, y: 0, width: 1, height: 1 }
        : { x: 0, y: 0, width: 0, height: 0 }
    );
  }

  setPrivacyMode(privacyMode);
};
