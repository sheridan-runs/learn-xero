export type Question = {
  id: number;
  text: string;
  options: Option[];
};

export type Option = {
  text: string;
  points: number; // 0, 5, or 10
  isNA?: boolean; // If true, this question is excluded from total possible score
};

export const questions: Question[] = [
  // ... (Keep your questions array exactly the same) ...
  {
    id: 1,
    text: "How do supplier bills (e.g. Spark, Rent, Subcontractors) get into Xero?",
    options: [
      { text: "I print them out and file them physically.", points: 0 },
      { text: "I type the details in manually.", points: 0 },
      { text: "I email/forward them to the Xero Bills address.", points: 10 },
      { text: "I use Hubdoc or Dext to auto-extract the data.", points: 10 },
    ],
  },
  {
    id: 2,
    text: "How do you chase overdue invoices from customers?",
    options: [
      { text: "I check the list once a month and manually email them.", points: 0 },
      { text: "I have 'Invoice Reminders' turned on (7, 14, 21 days).", points: 10 },
      { text: "I text/call them personally when I remember.", points: 5 },
      { text: "N/A: I don't send invoices (Retail/POS business).", points: 0, isNA: true },
    ],
  },
  {
    id: 3,
    text: "When you open the Reconcile screen, how much typing do you do?",
    options: [
      { text: "I have to type the 'Who' and 'What' for almost every line.", points: 0 },
      { text: "I mostly rely on Xero's blue 'Suggested Matches' but click OK manually.", points: 5 },
      { text: "I’ve set up Bank Rules for recurring costs, so I just click 'OK'.", points: 10 },
    ],
  },
  {
    id: 4,
    text: "How do you handle personal spending on the business card?",
    options: [
      { text: "I try not to do it, but leave it unreconciled if I do.", points: 0 },
      { text: "I code it to 'Drawings' or 'Loan' immediately.", points: 10 },
      { text: "I reimburse the company cash instantly.", points: 10 },
      { text: "N/A: I strictly keep business and personal finances separate.", points: 10 },
    ],
  },
  {
    id: 5,
    text: "If you were away for a month, could someone else run your payroll?",
    options: [
      { text: "No, calculations are on a spreadsheet/in my head.", points: 0 },
      { text: "Yes, it's all in Xero Payroll or dedicated software (e.g. Smartly, PayHero).", points: 10 },
      { text: "N/A: I don't have employees.", points: 0, isNA: true },
    ],
  },
  {
    id: 6,
    text: "How do you check your GST return before filing?",
    options: [
      { text: "I don't check. I just trust the 'Due' figure.", points: 0 },
      { text: "I export the Audit Report to PDF/Excel and scan for errors.", points: 10 },
      { text: "I manually recalculate everything on a calculator.", points: 5 },
      { text: "N/A: Not GST Registered.", points: 0, isNA: true },
    ],
  },
  {
    id: 7,
    text: "You just bought a coffee for a client meeting. What do you do?",
    options: [
      { text: "Put the receipt in my pocket and hope it survives.", points: 0 },
      { text: "Snap a photo with the Xero App immediately.", points: 10 },
      { text: "Wait until I'm back at my desk to upload it.", points: 5 },
    ],
  },
  {
    id: 8,
    text: "Do you have to manually upload bank statements (CSV files)?",
    options: [
      { text: "No, all my bank accounts have live feeds into Xero.", points: 10 },
      { text: "Yes, I have to manually import statements for at least one account.", points: 0 },
    ],
  },
];

export const calculateHealthScore = (answers: Record<number, number>) => {
  let totalPoints = 0;
  let maxPossible = 0;

  questions.forEach((q) => {
    const selectedOptionIndex = answers[q.id];
    if (selectedOptionIndex !== undefined) {
      const option = q.options[selectedOptionIndex];
      if (!option.isNA) {
        totalPoints += option.points;
        maxPossible += 10;
      }
    }
  });

  const percentage = maxPossible === 0 ? 0 : Math.round((totalPoints / maxPossible) * 100);

  let title = "";
  let description = "";
  let action = "";
  let ctaText = "";
  let ctaUrl = "";
  let ctaContext = ""; // The "Why"
  let ctaSubtext = ""; // The "Security/Reassurance"

  if (percentage < 40) {
    title = "The Manual Operator";
    description = "You are likely spending 4-6 hours a month on tasks that could be automated. You are working for Xero; it's not working for you.";
    action = "Stop typing bills manually. Set up 'Auto-forwarding' today.";
    
    // Low Score: Empathy First
    ctaContext = "I'm Sheridan from Nurture. I see files like this all the time, so don't stress. But we do need to fix the foundation before it gets out of control. I can clean up the mess, and help you automate the rest.";
    ctaText = "Book a Xero Cleanup";
    ctaUrl = "https://nurture.kiwi/virtual-cfo/";
    ctaSubtext = "No judgment. Just a clean slate."; // <--- Friendly & Reassuring
    
  } else if (percentage < 80) {
    title = "The Spreadsheet Survivor";
    description = "You're safe, but slow. You're doing the basics right, but missing out on the 'magic' features (Bank Rules, Bulk Coding) that save hours.";
    action = "Turn on 'Invoice Reminders' and set up 3 Bank Rules this week.";
    
    // Mid Score: Value First
    ctaContext = "Hi, I'm Sheridan 👋. You have a solid foundation, but you're working harder than you need to. I can help you unlock the automation features you're already paying for.";
    ctaText = "Get a Xero Tune-Up";
    ctaUrl = "https://nurture.kiwi/virtual-cfo/";
    ctaSubtext = "Small tweaks. Massive time savings."; // <--- Benefit Driven
    
  } else {
    title = "The Cloud Native";
    description = "Your books are a well-oiled machine. You have audit trails, automation, and peace of mind.";
    action = "Since your data is clean, you're ready for the next level: Forecasting.";
    
    // High Score: Praise -> Offer Upgrade
    ctaContext = "Most businesses can't forecast because their data is messy. Yours isn't. You are ready to stop looking backward and start planning your cash flow.";
    ctaText = "Launch Runway Visualiser";
    ctaUrl = "https://yourbudget.xyz";
    ctaSubtext = "Free tool. No signup required.";
  }

  return { percentage, title, description, action, ctaText, ctaUrl, ctaContext, ctaSubtext };
};
