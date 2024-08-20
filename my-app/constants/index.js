export const faq = [
  {
    question: "What does your service offer?",
    answer:
      "We provide detailed drug analysis reports based on Google search volume data, helping pharmaceutical companies understand market trends and consumer interest.",
  },
  {
    question: "Is the data specific to certain regions or countries?",
    answer:
      "We offer global data as well as region-specific analysis for major pharmaceutical markets.",
  },
  {
    question: "Is there a trial period available?",
    answer:
      "We offer a demo for new clients to explore our platform's capabilities.",
  },
  {
    question: "How can this data benefit my company?",
    answer:
      "Our insights can inform product development, marketing strategies, and competitive analysis in the pharmaceutical industry.",
  },
  {
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    question: "How we calculate the different status : regular, rising,...",
    answer: `Trends are determined by analyzing the search volume data for each drug over time. Our algorithm looks at the current period and compares it to historical data from one month ago, three months ago, and six months ago. Here's how we categorize different trends:

Exploding: If the search volume has more than tripled (grown by over 200%) in the last month.

Rising: If the current search volume is at least 10% higher than it was a month ago.

Discovering: If the search volume has grown by more than 50% over six months, starting from a low base (less than 1000 searches).

Regular: If the search volume has remained relatively stable (within 10% change) over the last month.

Early Trend: If there's been a 30% growth over three months, starting from a very low base (less than 500 searches).

Sustained Growth: If there's been consistent growth of at least 20% over six months and 10% over three months.

Rapid Growth: If there's been over 50% growth in the last month and over 100% growth in the last three months.

No Significant Trend: If none of the above criteria are met.`,
  },
];
