const EMAIL_SUMMARY_PROMPT = `Create a concise email summary from this dialogue. Follow ALL rules:

**Strict Requirements**
1. Return ONLY valid JSON with lowercase keys: {"subject":"...","body":"..."}
2. ***Only format the body and nothing else**. Dont format subject, or between json file.
3. Dont give any other response other than the JSON file, match

**Your output must be machine-readable JSON that exactly matches the required structure.**

Example 1:

Dialogue: ###
Sarah: Hey team, just finished the Q1 sales report. Numbers look great!
Mike: Awesome! Can you share the highlights?
Sarah: Sure. We're up 15% YoY, with particularly strong growth in the APAC region.
Lisa: That's fantastic. When can we present this to the board?
Sarah: I was thinking next Tuesday at 2 PM. Does that work for everyone?
Mike: Works for me.
Lisa: Same here. I'll book the conference room.

Email Summary:
{"subject":"Q1 Sales Report - Board Presentation Tuesday",
"body":"Hi Team, Sarah shared the completed Q1 sales report with Mike and Lisa, highlighting a 15% YoY growth, particularly strong in APAC. Key Points: - Q1 sales up 15% compared to last year - APAC region showed strongest growth - Board presentation scheduled for Tuesday at 2 PM - Lisa will book the conference room for the presentation. Best regards, Deepmoy"}


-----

Example 2:

Dialogue: ###
Tom: Hey everyone, got some updates on the new product launch.
Emma: Great, what's the latest?
Tom: Marketing team says we're good to go for July 15th.
David: That's earlier than expected. Are we sure everything will be ready?
Tom: Yes, QA team gave the green light yesterday.
Emma: Fantastic! What about the press release?
Tom: It's drafted. Can you review it by Friday, Emma?
Emma: Absolutely. I'll have feedback by end of day Friday.
David: Should we schedule a final team meeting before the launch?
Tom: Good idea. How about next Wednesday at 10 AM?
Emma: Works for me.
David: Me too. I'll send out the invite.

Email Summary:
{"subject":"Product Launch Set for July 15th",
"body":"Hello Team, Tom updated Emma and David on the new product launch, confirming a July 15th launch date as approved by Marketing and QA. Action Items: - Emma to review press release draft by Friday EOD - David to schedule final team meeting for Wednesday at 10 AM - All hands on deck for July 15th launch Please ensure all your respective tasks are on track for the launch date. Regards, Deepmoy"}


------

Example 3:

Dialogue: ###
Alex: Hi team, I've just come from the budget meeting with finance.
Priya: How did it go? Did we get approval for the new hires?
Alex: Partially. They approved two new developers but put the designer role on hold.
Jake: That's better than nothing. When can we start recruiting?
Alex: Immediately. HR said they can post the job listings tomorrow.
Priya: Great! I'll draft the job descriptions tonight.
Jake: I can review them in the morning before they go to HR.
Alex: Perfect. Let's aim to have the first round of interviews next week.
Priya: Sounds good. I'll block out some time on our calendars.
Jake: Should we involve the senior devs in the interview process?
Alex: Definitely. I'll speak with them tomorrow to see who's available.

Email Summary:
{"subject":"New Developer Hiring Process Kickoff",
"body":"Dear Team, Alex briefed Priya and Jake on the outcome of the budget meeting, confirming approval for hiring two new developers. Next Steps: - Priya to draft job descriptions tonight - Jake to review descriptions tomorrow morning - HR to post job listings tomorrow - Priya to schedule interview slots for next week - Alex to coordinate senior dev involvement in interviews Let's move quickly to secure top talent. Reach out if you need any support. Best regards, Deepmoy"}






---

Now process this dialogue:**I repeat the output should not be formatted**

Dialogue: ###
{dialogue}
###
 
Email Summary:
`;

export function createEmailPrompt(dialogue: string): string {
    return EMAIL_SUMMARY_PROMPT.replace("{dialogue}", dialogue);
}

