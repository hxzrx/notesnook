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

import { Input } from "@theme-ui/components";
import { useState } from "react";
import { Flex, Text } from "@theme-ui/components";
import { ImageAttributes } from "../../extensions/image";
import { Popup } from "../components/popup";
import { downloadImage, toDataURL } from "../../utils/downloader";
import { useToolbarStore } from "../stores/toolbar-store";

export type ImageUploadPopupProps = {
  onInsert: (image: ImageAttributes) => void;
  onClose: () => void;
};
export function ImageUploadPopup(props: ImageUploadPopupProps) {
  const { onInsert, onClose } = props;
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string>();
  const [url, setUrl] = useState<string>("");
  const downloadOptions = useToolbarStore((store) => store.downloadOptions);

  return (
    <Popup
      title="Insert image from URL"
      onClose={onClose}
      action={{
        loading: isDownloading,
        title: "Insert image",
        disabled: !url,
        onClick: async () => {
          setIsDownloading(true);
          setError(undefined);

          try {
            const { blob, size, type } = await downloadImage(
              url,
              downloadOptions
            );
            onInsert({ src: await toDataURL(blob), size, mime: type });
          } catch (e) {
            if (e instanceof Error) setError(e.message);
          } finally {
            setIsDownloading(false);
          }
        }
      }}
    >
      <Flex sx={{ px: 1, flexDirection: "column", width: ["auto", 350] }}>
        <Input
          type="url"
          autoFocus
          placeholder="Paste Image URL here"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError(undefined);
          }}
        />

        {error ? (
          <Text
            variant={"error"}
            sx={{
              bg: "errorBg",
              mt: 1,
              p: 1,
              borderRadius: "default"
            }}
          >
            Failed to download image: {error.toLowerCase()}.
          </Text>
        ) : (
          <Text
            variant={"subBody"}
            sx={{
              bg: "shade",
              color: "primary",
              mt: 1,
              p: 1,
              borderRadius: "default"
            }}
          >
            To protect your privacy, we will download the image &amp; add it to
            your attachments.
          </Text>
        )}
      </Flex>
    </Popup>
  );
}
