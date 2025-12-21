#!/bin/bash
# Web video optimization script
# Removes audio, compresses, and optionally crops black bars

set -e

usage() {
  echo "Usage: $0 <input.mp4> <output.mp4> [--crop]"
  echo ""
  echo "Options:"
  echo "  --crop    Auto-detect and crop black bars"
  echo ""
  echo "Examples:"
  echo "  $0 input.mp4 output.mp4"
  echo "  $0 input.mp4 output.mp4 --crop"
  exit 1
}

if [ $# -lt 2 ]; then
  usage
fi

INPUT="$1"
OUTPUT="$2"
CROP_FLAG="$3"

if [ ! -f "$INPUT" ]; then
  echo "Error: Input file '$INPUT' not found"
  exit 1
fi

# Check for ffmpeg
if ! command -v ffmpeg &> /dev/null; then
  echo "Error: ffmpeg is required. Install with: brew install ffmpeg"
  exit 1
fi

# Show input file info
echo "Input: $INPUT"
ffprobe -v quiet -print_format json -show_format "$INPUT" | jq -r '"Size: \(.format.size | tonumber / 1024 / 1024 | . * 100 | floor / 100)MB, Duration: \(.format.duration)s"'

# Build filter string
FILTER=""

if [ "$CROP_FLAG" = "--crop" ]; then
  echo "Detecting black bars..."
  CROP=$(ffmpeg -i "$INPUT" -vf "cropdetect=24:16:0" -f null - 2>&1 | grep -o "crop=[0-9]*:[0-9]*:[0-9]*:[0-9]*" | tail -1)
  if [ -n "$CROP" ]; then
    echo "Detected: $CROP"
    FILTER="-vf $CROP"
  else
    echo "No black bars detected"
  fi
fi

# Optimize video
echo "Optimizing..."
ffmpeg -i "$INPUT" \
  -an \
  $FILTER \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -movflags +faststart \
  -pix_fmt yuv420p \
  -y "$OUTPUT" 2>&1 | tail -3

# Show results
echo ""
echo "Output: $OUTPUT"
INPUT_SIZE=$(stat -f%z "$INPUT")
OUTPUT_SIZE=$(stat -f%z "$OUTPUT")
REDUCTION=$(echo "scale=0; (1 - $OUTPUT_SIZE / $INPUT_SIZE) * 100" | bc)
echo "Size: $(echo "scale=2; $OUTPUT_SIZE / 1024 / 1024" | bc)MB (${REDUCTION}% reduction)"
