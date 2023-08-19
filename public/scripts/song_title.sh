#!/usr/bin/env bash

VIDEO_TITLE=$1

CLEAN_VIDEO_TITLE=$(echo "$VIDEO_TITLE" | tr -d '[:punct:]' | tr -d ' ')

if [ -z "$CLEAN_VIDEO_TITLE" ]; then
    exit 1
fi

VIDEO_ID=$(yt-dlp "ytsearch1:$CLEAN_VIDEO_TITLE" --get-id)

# SONG_TITLE=$(yt-dlp -e "https://www.youtube.com/watch?v=$VIDEO_ID" | tr -d '[:punct:]' | tr -d ' ' | tr '[:upper:]' '[:lower:]' | awk '{ print $0 ".webm" }')
SONG_TITLE=$(yt-dlp -e "https://www.youtube.com/watch?v=$VIDEO_ID")
echo $SONG_TITLE