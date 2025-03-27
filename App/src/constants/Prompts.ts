const EMAIL_SUMMARY_PROMPT = `Create a concise email summary from the following dialogue. Follow this structure:



**Strict Rules:**
1. **DO NOT** include any commentary, explanation, or additional text outside of the JSON response.
2. **DO NOT** wrap the JSON in backticks or any formatting symbols.
3. **DO NOT** add any extra response indicators. **Only return valid JSON with the "subject" and "body"
4. **DO NOT** use single quotes for JSON formatting.
5. Ensure JSON is parseable without modification.
6. Ensure that the body of the email is properly formatted, all are not in same line the salutation should come first, from next line main email should start and the closing notes should be in a different line 

**Your output must be machine-readable JSON that exactly matches the required structure.**
### **Expected JSON Structure:**
{
    "Subject": [1-5 word summary] ,
    "body" :  [body should start with proper salutation,write main body summerizing all the points discussed in the Dialogue, end the email with closing notes ]

    
}

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
{
    "Subject": "Q1 Sales Report - Board Presentation Tuesday",
    "Body": "Hi Team,\n\nSarah shared the completed Q1 sales report with Mike and Lisa, highlighting a 15% YoY growth, particularly strong in APAC.\n\nKey Points:\n- Q1 sales up 15% compared to last year\n- APAC region showed strongest growth\n- Board presentation scheduled for Tuesday at 2 PM\n- Lisa will book the conference room for the presentation.\n\nBest regards,\nDeepmoy"
}

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
{
    "Subject":"Product Launch Set for July 15th",
    "Body":"Hello Team,\n\nTom updated Emma and David on the new product launch, confirming a July 15th launch date as approved by Marketing and QA.\n\nAction Items:\n- Emma to review press release draft by Friday EOD\n- David to schedule final team meeting for Wednesday at 10 AM\n- All hands on deck for July 15th launch\n\nPlease ensure all your respective tasks are on track for the launch date.\n\nRegards,\nDeepmoy"
}

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
{
    "Subject":"New Developer Hiring Process Kickoff",
    "Body":"Dear Team,\n\nAlex briefed Priya and Jake on the outcome of the budget meeting, confirming approval for hiring two new developers.\n\nNext Steps:\n- Priya to draft job descriptions tonight\n- Jake to review descriptions tomorrow morning\n- HR to post job listings tomorrow\n- Priya to schedule interview slots for next week\n- Alex to coordinate senior dev involvement in interviews\n\nLet's move quickly to secure top talent. Reach out if you need any support.\n\nBest regards,\nDeepmoy"
}




---

Now process this dialogue:

Dialogue: ###
{dialogue}
###
 
Email Summary: `;

export function createEmailPrompt(dialogue: string): string {
    return EMAIL_SUMMARY_PROMPT.replace("{dialogue}", dialogue);
}
