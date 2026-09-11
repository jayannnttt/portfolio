/**
 * Automatically sorted list of FITFLOW screenshots.
 * Synced with C:\Users\sunda\Desktop\FITFLOW
 */
export const fitflowScreenshots: string[] = [
  "/screenshots/fitflow/IMG1.png",
  "/screenshots/fitflow/IMG2.png",
  "/screenshots/fitflow/IMG3.png",
  "/screenshots/fitflow/IMG4.png",
  "/screenshots/fitflow/IMG5.png",
  "/screenshots/fitflow/IM6.png",
  "/screenshots/fitflow/IMG7.jpeg",
  "/screenshots/fitflow/IMG8.png"
];

/**
 * Natural numerical sorting for screenshots.
 * Ensures: img 1 -> img 2 -> ... -> img 9 -> img 10 (never alphabetical)
 */
export function sortScreenshotsNumerically(images: string[]): string[] {
  return [...images].sort((a, b) => {
    const extractNum = (str: string) => {
      const filename = str.replace(/\\/g, '/').split('/').pop() || str;
      const match = filename.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    return extractNum(a) - extractNum(b);
  });
}
