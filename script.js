
// Track start time for time_on_page calculation
const pageStartTime = Date.now();

const STATIC_ANSWER_TEXT = "This text will be shown to everyone that asks any question in the chat window";
const PDF_BASE_URL = "MT0_ErathJohannes_2_Pager.pdf";

// Detection for Interfaces
const isInterfaceA = window.location.pathname.toLowerCase().includes('interfacea.html');
const isInterfaceB = window.location.pathname.toLowerCase().includes('interfaceb.html');
const isInterfaceC = window.location.pathname.toLowerCase().includes('interfacec.html');

const pdfFrame = document.getElementById('pdf-frame');
const hasPdfFrame = !!pdfFrame;

// Determine interface type letter for tracking
const INTERFACE_TYPE = isInterfaceC ? "C" : (isInterfaceB ? "B" : "A");

// Interface-specific PDF settings
const INITIAL_PDF_URL = isInterfaceC
    ? `${PDF_BASE_URL}#page=1&zoom=100`
    : `${PDF_BASE_URL}#page=3&zoom=100`;

let sessionId = "";
let appGroup = sessionStorage.getItem('app_group') || "None";
let appStep = parseInt(sessionStorage.getItem('app_step')) || 0;

const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-button');
const emptyState = document.getElementById('empty-state');
const sessionDisplay = document.getElementById('session-display');

const SUPABASE_URL = 'https://rwmftrnegxtdxgprrxgo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bWZ0cm5lZ3h0ZHhncHJyeGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTk3MDAsImV4cCI6MjA4ODAzNTcwMH0.gXwofWxiU4GWSm6WOqk8C_jiWjIOT_Ym7y40fgTXEww';

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/**
 * UTILITY: TRACK EVENT
 */
async function trackEvent(eventType, elementId = null) {
    const timeOnPage = ((Date.now() - pageStartTime) / 1000);

    const event = {
        participant_id: sessionId,
        group_id: appGroup,
        step_number: appStep,
        interface_type: INTERFACE_TYPE,
        event_type: eventType,
        element_id: elementId,
        time_on_page: timeOnPage
    };

    console.log("Tracking event:", event);

    if (supabaseClient) {
        const { error } = await supabaseClient
            .from('interaction_logs')
            .insert([event]);

        if (error) {
            console.error("Supabase error:", error);
        }
    } else {
        console.warn("Supabase client not found. Event only logged to console.");
    }
}

/**
 * INITIALIZATION
 */
function init() {
    // 1. Session ID Logic
    let sid = sessionStorage.getItem('app_session_id');
    if (!sid) {
        sid = 'user-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
        sessionStorage.setItem('app_session_id', sid);
    }
    sessionId = sid;
    if (sessionDisplay) {
        sessionDisplay.innerText = `Session: ${sessionId}`;
    }

    // 2. PDF Frame Setup (Interface B & C)
    if (hasPdfFrame && pdfFrame) {
        pdfFrame.src = INITIAL_PDF_URL;
    }

    // Track page load
    trackEvent('page_load', 'window');
}

/**
 * SHOW THINKING INDICATOR
 */
function showThinkingIndicator() {
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'thinking-bubble';
    thinkingDiv.id = 'thinking-indicator';
    thinkingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatWindow.appendChild(thinkingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return thinkingDiv;
}

/**
 * APPEND MESSAGE
 */
function appendMessage(type, text) {
    if (emptyState) emptyState.style.display = 'none';

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type === 'user' ? 'user-message' : 'ai-message'}`;

    if (type === 'ai') {
        if (isInterfaceB) {
            msgDiv.textContent = text;
        } else {
            msgDiv.innerHTML = `${text} <a href="${INITIAL_PDF_URL}" class="citation-link" target="_blank" rel="noopener noreferrer">[1]</a>`;
            const citation = msgDiv.querySelector('.citation-link');
            citation.addEventListener('click', (e) => {
                trackEvent('citation_click', 'citation-link', { pdfUrl: INITIAL_PDF_URL });
            });
        }
    } else {
        msgDiv.textContent = text;
    }

    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/**
 * ACTION HANDLER
 */
function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    // 1. Post User Message
    appendMessage('user', text);
    userInput.value = '';

    // 2. Show the "Thinking" animation
    const indicator = showThinkingIndicator();

    // 3. Dynamic Delay based on input length
    // Base 2s + 20ms per character. Min 2.5s, Max 7s.
    const dynamicDelay = Math.min(7000, Math.max(2500, 2000 + (text.length * 20)));
    console.log(`Calculating delay for length ${text.length}: ${dynamicDelay}ms`);

    // 4. Wait for the dynamic duration
    setTimeout(() => {
        if (indicator) indicator.remove();

        // Post the final answer
        appendMessage('ai', STATIC_ANSWER_TEXT);

        // 5. Interface C Specific: Update PDF iframe with highlighting
        if (isInterfaceC && pdfFrame) {
            const highlightUrl = PDF_BASE_URL + "#:~:text=To%20mitigate%20the%20issue,trust%20in%20the%20AI%20answers.";

            console.log("Updating Interface C PDF frame...");
            pdfFrame.src = "about:blank"; // Reset to ensure reload

            setTimeout(() => {
                pdfFrame.src = highlightUrl;
            }, 100);
        }
    }, dynamicDelay);
}

/**
 * NEXT TASK HANDLER
 */
function handleNextTask() {
    const sequences = {
        'G1': ['InterfaceA.html', 'interfaceB.html', 'interfaceC.html'],
        'G2': ['interfaceB.html', 'interfaceC.html', 'InterfaceA.html'],
        'G3': ['interfaceC.html', 'InterfaceA.html', 'interfaceB.html']
    };

    const currentSequence = sequences[appGroup];

    if (appStep < 3) {
        const nextStep = appStep + 1;
        const nextInterface = currentSequence[nextStep - 1];

        sessionStorage.setItem('app_step', nextStep.toString());
        trackEvent('next_task_click', 'next-task-button');

        // Short delay to ensure tracking event is sent
        setTimeout(() => {
            window.location.href = nextInterface;
        }, 500);
    } else {
        alert("Study completed! Thank you for participating.");
        trackEvent('study_completed', 'next-task-button');
        // Optionally redirect to a final survey or index
        // window.location.href = 'index.html';
    }
}

/**
 * EVENT LISTENERS
 */
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        trackEvent('ask_button_click', 'send-button');
        handleSend();
    });
}

if (userInput) {
    userInput.addEventListener('click', () => {
        trackEvent('input_click', 'user-input');
    });

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            trackEvent('enter_pressed', 'user-input');
            handleSend();
        }
    });
}

const nextTaskBtn = document.getElementById('next-task-button');
if (nextTaskBtn) {
    nextTaskBtn.addEventListener('click', () => {
        handleNextTask();
    });
}

// Start
document.addEventListener('DOMContentLoaded', init);
