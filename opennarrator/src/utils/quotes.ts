/**
 * A small collection of sample quotes for the "random quote" button.
 * Returns a random entry each call.
 */

const QUOTES = [
  "The only way to do great work is to love what you do.",
  "In the middle of every difficulty lies opportunity.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Life is what happens when you're busy making other plans.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It is during our darkest moments that we must focus to see the light.",
  "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
  "When you reach the end of your rope, tie a knot in it and hang on.",
  "Always remember that you are absolutely unique. Just like everyone else.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail.",
];

export function getRandomQuote(): string {
  const index = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[index];
}
