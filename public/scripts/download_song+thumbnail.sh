#!/usr/bin/env bash

VIDEO_TITLE=$1

CLEAN_VIDEO_TITLE=$(echo "$VIDEO_TITLE" | tr -d '[:punct:]' | tr -d ' ')

if [ -z "$CLEAN_VIDEO_TITLE" ]; then
    exit 1
fi

VIDEO_ID=$(yt-dlp "ytsearch1:$CLEAN_VIDEO_TITLE" --get-id)

yt-dlp -f 'bestaudio' -o "$HOME/web-development/backend/api-project1/public/songs/$(yt-dlp -e "https://www.youtube.com/watch?v=$VIDEO_ID" | tr -d '[:punct:]' | tr -d ' ' | tr '[:upper:]' '[:lower:]' | awk '{ print $0 ".webm" }')" "https://www.youtube.com/watch?v=$VIDEO_ID"

yt-dlp -f 'bestaudio' --skip-download --write-thumbnail -o "/home/amateur_hacker/web-development/backend/api-project1/public/thumbnails/$(yt-dlp -e "https://www.youtube.com/watch?v=$VIDEO_ID" | tr -d '[:punct:]' | tr -d ' ' | tr '[:upper:]' '[:lower:]')" "https://www.youtube.com/watch?v=$VIDEO_ID"