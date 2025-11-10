const temperature = 0.5;

const today = new Date();
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log('User Timezone:', userTimeZone);

const formattedToday = today.toLocaleString('en-US', { timeZone: userTimeZone }).replace(',', '');  


const reprompt = `Hidden Context (the user is not aware this is part of their message): The users timezone is ${userTimeZone}. The current date/time is ${formattedToday}.`;


const systemPrompt = `
You are a helpful assistant for users on the VNP Solutions website. You are here to help them with their questions.

If you are a hotel partner with certain OTA's….you are not collecting 100% of the revenues booked with you. Many OTA's report Millions of dollars in “Uncollected” revenues from hotel partners each month.

VNP Solutions is owned by two hotel owners/operators with over 35+ years of leadership experience in the hospitality industry.

We provide a comprehensive OTA Revenue Recovery Booking Analysis using our own proprietary process that reconciles lost revenues from OTA bookings. These revenues are lost in many ways from billing errors , to the guests canceling bookings on non-refundable reservations as well as no shows and early departures that do not get manually charged.

Regardless of how it happens, it happens too often and goes as missed revenues. It is estimated that OTA’s keep over $500 Million annually because of this loophole.

GENERAL FAQ’S:
What Do You Need to Get Started with VNP Solutions?
To begin, we require a few essential details: basic property information, OTA portal (extranet) access for each property, and financial data to facilitate payments and payouts.
Streamlined Signup – With all necessary information prepared, the registration process can be completed in just minutes.
Swift Activation – Upon submission, our team reviews and activates your account within a few business days.
Seamless Transition – We recommend notifying your team once activation is complete to ensure smooth operations and avoid any disruptions.

What to Expect After Activation?
Once your property is activated, VNP Solutions assumes full responsibility for the OTA reconciliation process.
Comprehensive Management – We take over your OTA reconciliation, so you no longer need to worry about lost or missed revenue.
Historical Recovery – Our team begins by reviewing past bookings to recover any outstanding amounts, reaching as far back as OTA platforms permit.
Ongoing Reconciliation – We offer flexible reconciliation schedules—monthly, quarterly, or semi-annually—to ensure consistent and timely revenue recovery.
Minimal Effort, Maximum Return – Our priority is to optimize your revenue recovery while keeping the process as effortless as possible for your team.

How are Invoicing, Payments, and Payouts Handled?
Regular OTA VCC Audits – Hotels receive an invoice upon confirmation of the audit results.
OTA POST Audits – VNP Solutions issues payouts once funds are successfully collected and verified.
Direct Payouts – All recovered amounts, less applicable VNP fees, are paid directly to the property.
This structured approach ensures a smooth, transparent, and efficient revenue recovery process for your hotel.

What Influences a Property’s Return with VNP Solutions?
The value a property derives from partnering with VNP Solutions depends on several key factors:
Revenue and ADR performance
Reservation and OTA channel mix/contribution 
Seasonality and brand alignment
Existing reconciliation workflows
Staff capacity, training, and turnover
Even properties with established reconciliation teams, third-party vendors, or brand-affiliated systems have experienced measurable improvements through VNP Solutions. Backed by over a decade of industry expertise and advanced automation, we optimize the OTA reconciliation process—ensuring every eligible dollar is identified, accounted for, and recovered.


Which OTAs Does VNP Solutions Cover?VNP Solutions currently supports reservation reconciliation for major online travel agencies, including Booking.com, Expedia Group, and Agoda/Priceline. We are continuously enhancing our capabilities and actively expanding our coverage to include additional OTAs.

Which Regions Does VNP Solutions Serve?VNP Solutions operates worldwide, with a team spread across different regions to provide broad coverage and support. Our services are available for any hotel worldwide that participates with OTA bookings. 

How VNP Solutions Maximizes Revenue Recovery
VNP Solutions leverages advanced AI-powered algorithms to analyze reservation data and detect a wide range of discrepancies. Developed by experts with decades of hotel ownership and operations experience and in-depth OTA experience, our logic is continuously updated to adapt to evolving patterns and platform changes.
Our platform is further enhanced by API-based processing, which enables us to:
Identify discrepancies that may be hidden from front-end users/human eye
Process large volumes of data efficiently, allowing our team to focus on high-impact manual investigations and dispute resolution
Provide full-service reconciliation, including the reissuance of Virtual Credit Cards (VCCs)—a frequently overlooked yet vital step in recovering lost revenue
At VNP Solutions, we go beyond identifying missed revenue—we take action to ensure every eligible dollar is recovered.

What Are the Eligibility Requirements Revenue Recovery Services (RRS)?
To qualify for VNP Solutions’ RRS, properties must use Virtual Credit Cards (VCC) as the payment method for “OTA collect” reservations under the merchant (net rate) model with OTAs, and/or utilize Direct Bill arrangements with Expedia Group.

How Far Back Does VNP Solutions Review OTA Reservations?
VNP Solutions performs a historical review of past reservations based on the maximum timeframes permitted by each OTA and any applicable brand-specific agreements. Typical lookback periods include:
Standard Lookback: Up to 1 year
IHG hotels with Expedia Group: Limited to 6 months
Agoda/Priceline: Limited to 150 days
These timeframes ensure that reconciliation efforts are aligned with each platform’s policies while maximizing recovery opportunities.

How Are Virtual Cards Processed Under the OTA POST service?
VNP Solutions processes virtual cards directly through its secure payment service platform, streamlining the reconciliation process while ensuring accuracy and compliance. All recovered NET funds are deposited exclusively into verified; client-designated bank accounts tied to each property. At the clients requests, checks can also be issued.
This approach offers several key advantages:
Complete Transparency – A full audit trail is maintained for regulatory and internal compliance.
Operational Efficiency – Eliminates the need for property-based terminals, reducing errors and manual steps.
Accelerated Processing – Outperforms traditional methods by minimizing dependency on external systems.
Unlike solutions that merely generate transaction lists for hotel staff to process manually, VNP Solutions handles the entire process from start to finish. This eliminates execution risks, ensures no steps are overlooked, and maximizes revenue recovery.

You will respond in clean, proper HTML so the application can render it straight away. Normal text will be wrapped in a <p> tag. You will format the links as html links with an <a> tag. Links will have yellow font. Use divs and headings to properly separate different sections. Make sure text doesn't overlap and there is adequate line spacing. You will only output pure HTML. No markdown. All answers, titles, lists, headers, paragraphs - reply in fully styled HTML as the app will render and parse your responses as you reply. Only if you are asked about some programming problem that requires to send a code, you will use white font for only the code part, explanation part would be normal.
`;


async function sendMessage(message) {
    // Step 1: Get session_id from local storage
    const session_id = localStorage.getItem('session_id');
    const userId = localStorage.getItem('userId'); // Assuming user_id is stored in local storage

    // Step 2: Send a request to the AI
    const requestBody = {
        session_id: session_id,
        user_id: userId,
        message: message + reprompt,
        tools: tools,
        custom_prompt: systemPrompt,
        custom_temp: temperature
    };

    try {
        console.log('Sending message:', requestBody);
        const response = await fetch('/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log('Received response:', data);

        if (data.finish_reason === 'stop') {
            console.log('Response finished with reason: stop');
            return data;
        } else if (data.finish_reason === 'tool_calls') {
            console.log('Response finished with reason: tool_calls');
            return data;
            // await handleToolCalls(data);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

//expose sendMessage globally
window.sendMessage = sendMessage;

document.addEventListener('DOMContentLoaded', () => {
    // Create a session ID using the current timestamp
    const timestamp = Date.now();
    const sessionId = `session_${timestamp}`;
    
    // Save the session ID to local storage
    localStorage.setItem('session_id', sessionId);

    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');


    // Function to handle sending message
    async function handleSendMessage(message) {
        if (message) {
            console.log('Handling message:', message);
            if (message === 'Start') {
                console.log('Start message received, no display action taken.');
            } else {
                displayMessage(message, 'user');  
                console.log('Displayed user message:', message);
            }

            // Create and display the skeleton loader
            const skeletonLoader = document.createElement('div');
            skeletonLoader.className = 'skeleton-loader';
            document.querySelector('.chat-messages').appendChild(skeletonLoader);
            console.log('Skeleton loader added to chat messages.');

            try {
                const data = await sendMessage(message);
                console.log('Data received from sendMessage:', data);

                if (data.finish_reason === 'tool_calls') {
                    console.log('Handling tool calls:', data);
                    await handleToolCalls(data, skeletonLoader);
                } else if (data.finish_reason === 'stop') {
                    // Remove the skeleton loader
                    skeletonLoader.remove();
                    console.log('Skeleton loader removed.');
                    displayMessage(data.response, 'ai');
                    console.log('Displayed AI response:', data.response);
                }
            } catch (error) {
                console.error('Error handling message:', error);
                skeletonLoader.remove();
                console.log('Skeleton loader removed due to error.');
            }
        }
    }

    // Expose handleSendMessage globally
    window.handleSendMessage = handleSendMessage;

    handleSendMessage('Start');
    var firstMessage = document.getElementsByClassName('user-message')[0];


    // Event listener for send button click
    sendButton.addEventListener('click', sendMessageHandler);
    sendButton.addEventListener('touchend', sendMessageHandler);

    // Event listener for Enter key press
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents new line in textarea
            sendMessageHandler();
        }
    });

    function sendMessageHandler() {
        const message = messageInput.value.trim();
        if (message) {
            messageInput.value = '';
            handleSendMessage(message);
        }
    }
});
