/**
 * Customer reviews shown on the home page.
 *
 * Every quote is copied word for word from a public review page, read on
 * 2026-09-09. Names appear exactly as the platform displays them. Do not add
 * a review that has not been copied from a real source, and do not edit the
 * wording of one that has.
 *
 * Sources:
 *   HomeAdvisor  https://www.homeadvisor.com/rated.rapidenergysolutions.156594988.html
 *   Google       https://reviews.birdeye.com/rapid-energy-solutions-llc-166951437962584
 */

export type Review = {
  quote: string;
  name: string;
  date: string;
  source: "HomeAdvisor" | "Google";
  rating: 5;
  /** Job value, where the platform published one. */
  amount?: string;
};

/**
 * HomeAdvisor's published average across 11 reviews: ten at 5 stars and one
 * at 1 star (a billing dispute from Dec 2020). Show the real 4.6 and link to
 * the full list rather than implying a clean sweep.
 */
export const reviewSummary = {
  rating: "4.6",
  count: 11,
  source: "HomeAdvisor",
  href: "https://www.homeadvisor.com/rated.rapidenergysolutions.156594988.html",
} as const;

export const reviews: Review[] = [
  {
    quote:
      "Great company to work with! Detail oriented, punctual, helpful, knowledgeable, friendly and great with communication. As a GC I highly recommend working with this company for any of your electrical needs.",
    name: "Raechelle P.",
    date: "Oct 2023",
    source: "HomeAdvisor",
    rating: 5,
  },
  {
    quote:
      "This was a great company to work with and I have already hired them to do additional work on my house. Their guys arrived on time, with masks, and completed all the work efficiently and in line with the estimate I was given. They even sent out a team to troubleshoot my house after another contractor tripped some outlets. The guys were super patient with me and didn't seem to mind my asking a ton of questions.",
    name: "Mary P.",
    date: "Oct 2020",
    source: "HomeAdvisor",
    rating: 5,
    amount: "$1,600",
  },
  {
    quote:
      "Matt and his team did an amazing job. We had them install recessed lighting in a few areas of our home and anticipated having a tremendous amount of drywall work to do afterwards... lo and behold the guys found a way to install the new LED cans with only 2 small patches in the drywall! They were smart, kind, and cleaned up after themselves once the work was done. Highly recommend.",
    name: "Emily S.",
    date: "Google review",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "One of the best I've ever worked with. It was perfect. His attention to details was top notched and phenomenal guy.",
    name: "John S.",
    date: "Apr 2020",
    source: "HomeAdvisor",
    rating: 5,
    amount: "$22,000",
  },
  {
    quote:
      "Very friendly and thorough. Came on time, researched the problem, explained solutions clearly. Great job.",
    name: "Paul F.",
    date: "Jul 2020",
    source: "HomeAdvisor",
    rating: 5,
  },
  {
    quote: "They were very professional. They were timely. They did a good job.",
    name: "Bobbi R.",
    date: "Mar 2020",
    source: "HomeAdvisor",
    rating: 5,
    amount: "$500",
  },
];
