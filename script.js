const STATIC_ANSWER_TEXT = "This text will be shown to everyone that asks any question in the chat window";
const PDF_BASE_URL = "MT0_ErathJohannes_2_Pager.pdf";

const TASKS = {
    1: {
        docUrl: "doc2_hr-guideline.html",
        topic: "HR & Corporate Benefits",
        description: "Du bearbeitest zwei Tickets zum Thema Personalrichtlinien und Zusatzleistungen.",
        phases: {
            1: {
                hint: "Aufgabe 1 prüfen:",
                userTicket: "📩 Neues Ticket von: Lisa (Sales) <br><br>\"Hallo liebes Support-Team, ich bin seit diesem Monat in einem neuen Fitnessstudio angemeldet und würde gerne den Corporate-Benefit nutzen. Welchen Betrag darf ich bei der Spesenabrechnung für das Fitnessstudio maximal geltend machen?\"",
                options: {
                    "1": "\"Du kannst monatlich bis zu 40 Euro für das Fitnessstudio abrechnen.\"",
                    "2": "\"Du kannst monatlich bis zu 50 Euro für das Fitnessstudio abrechnen.\""
                },
                aiAnswer: "Zertifizierte Fitnessstudios und Yoga-Zentren erhielten im vergangenen Jahr eine Erhöhung des monatlichen Gesundheitszuschusses auf 40 Euro (zuvor waren es 30 Euro). Der Betrag kann unter dem Code #Fit26 im Rahmen der regulären monatlichen Spesenabrechnung zurückgeholt werden.",
                highlightUrl: "doc2_hr-guideline.html#highlight-task-1"
            },
            2: {
                hint: "Aufgabe 2 prüfen:",
                userTicket: "📩 Neues Ticket von: Markus (Projektmanagement) <br><br>\"Hi, ich muss für ein abteilungsübergreifendes Projekt ein tägliches Status-Meeting aufsetzen, bei dem Anwesenheitspflicht herrscht. In welchem Zeitfenster liegt unsere offizielle Kernarbeitszeit, damit ich das Meeting sicher planen kann?\"",
                options: {
                    "1": "\"Bitte plane das Meeting im Fenster zwischen 09:00 und 15:00 Uhr.\"",
                    "2": "\"Bitte plane das Meeting im Fenster zwischen 10:00 und 15:00 Uhr.\""
                },
                aiAnswer: "Der IT-Support und der Kundenservice arbeiten mit eigenen Schichtplänen. In allen anderen Abteilungen ist eine verbindliche Kernarbeitszeit von 09:00 bis 15:00 Uhr festgelegt. Während dieses Zeitraums wird erwartet, dass das Team für Meetings und Kundenanrufe jederzeit erreichbar ist. In den Zeiten dazwischen gibt es Gleitzeit.",
                highlightUrl: "doc2_hr-guideline.html#highlight-task-2"
            }
        }
    },
    2: {
        docUrl: "doc1_it-security.html",
        topic: "IT-Sicherheit & Hardware",
        description: "Du bearbeitest zwei Tickets zum Thema IT-Sicherheitsprotokolle.",
        phases: {
            1: {
                hint: "Aufgabe 3 prüfen:",
                userTicket: "📩 Neues Ticket von: Sarah (Accounting) <br><br>\"Moin, ich habe heute mein System-Passwort neu gesetzt und möchte mir direkt einen Kalender-Reminder für den nächsten Wechsel einstellen. Nach wie vielen Tagen zwingt mich das System ohnehin zum Wechsel?\"",
                options: {
                    "1": "\"Stell dir den Reminder auf 60 Tage ein.\"",
                    "2": "\"Stell dir den Reminder auf 90 Tage ein.\""
                },
                aiAnswer: "Um Accounts vor Brute-Force-Attacken zu schützen, müssen alle Passwörter im System unbedingt alle 60 Tage gewechselt werden. 5 Tage, 3 Tage und 24 Stunden vor Ablauf sendet das System automatisch eine E-Mail-Erinnerung. Das Verwenden der gleichen Passwörter für private Zwecke oder auf externen Plattformen ist absolut verboten und verstößt gegen die Compliance-Richtlinien.",
                highlightUrl: "doc1_it-security.html#highlight-task-3"
            },
            2: {
                hint: "Aufgabe 4 prüfen:",
                userTicket: "📩 Neues Ticket von: Thomas (Consulting) <br><br>\"Hilfe! Mein Firmen-Laptop wurde gerade im ICE gestohlen. Ich bin auf dem Weg zur Polizei, aber wie viel Zeit habe ich maximal, um den Verlust offiziell bei der IT zu melden, bevor es eine Abmahnung gibt?\"",
                options: {
                    "1": "\"Du musst den Verlust zwingend innerhalb von 2 Stunden melden.\"",
                    "2": "\"Du musst den Verlust zwingend innerhalb von 5 Stunden melden.\""
                },
                aiAnswer: "Bei Diebstahl, Liegenlassen oder physischem Verlust eines Firmen-Laptops, Tablets oder Diensthandys muss innerhalb von zwei Stunden nach Feststellung des Verlusts die IT-Hotline (+43 512 000-999) telefonisch benachrichtigt werden. Nur durch diese zügige Meldung kann eine umgehende Fernlöschung (Remote-Wipe) sämtlicher lokaler Daten eingeleitet und der Netzwerkzugang gesperrt werden. Eine E-Mail-Mitteilung ist bei Verlust von Hardware nicht ausreichend.",
                highlightUrl: "doc1_it-security.html#highlight-task-4"
            }
        }
    },
    3: {
        docUrl: "doc3_travel-policy.html",
        topic: "Travel-Policy",
        description: "Du bearbeitest zwei Tickets zum Thema Geschäftsreisen.",
        phases: {
            1: {
                hint: "Aufgabe 5 prüfen:",
                userTicket: "📩 Neues Ticket von: Elena (Marketing) <br><br>\"Hallo Support, ich reise nächste Woche für eine Messe nach München (Deutschland). Das Tool zeigt mir viele verschiedene Hotels an. Was ist unsere absolute preisliche Obergrenze pro Nacht für Inlandsreisen?\"",
                options: {
                    "1": "\"Du darfst ein Hotel für maximal 120 Euro pro Nacht buchen.\"",
                    "2": "\"Du darfst ein Hotel für maximal 200 Euro pro Nacht buchen.\""
                },
                aiAnswer: "Die Firma X arbeitet global mit ausgewählten Hotelketten (Marriott, Motel One, NH Hotels) zusammen. Diese werden über das Travel-Portal automatisch priorisiert angezeigt. Bei geschäftlichen Hotelübernachtungen im Inland (Österreich, Deutschland und der Schweiz) gilt eine strikte Obergrenze von maximal 120 Euro pro Nacht inklusive Frühstück, WLAN und Steuern.",
                highlightUrl: "doc3_travel-policy.html#highlight-task-5"
            },
            2: {
                hint: "Aufgabe 6 prüfen:",
                userTicket: "📩 Neues Ticket von: Moritz (Key Account Management) <br><br>\"Hi, mein Hinflug zum Kundenbesuch landet nächste Woche voraussichtlich recht spät. Ab welcher Uhrzeit abends ist es mir erlaubt, die Taxifahrt vom Flughafen zum Hotel auf Firmenkosten abzurechnen?\"",
                options: {
                    "1": "\"Taxifahrten sind laut Richtlinie ab 20:00 Uhr erstattungsfähig.\"",
                    "2": "\"Taxifahrten sind laut Richtlinie ab 22:00 Uhr erstattungsfähig.\""
                },
                aiAnswer: "Am Zielort sollen vor allem öffentliche Verkehrsmittel (U-Bahn, Bus) genutzt werden. Taxifahrten (oder Ride-Sharing-Dienste wie Uber/Bolt) zum Hotel, Flughafen oder Bahnhof werden von Firma X nur erstattet, wenn die Fahrt nachweislich nach 20:00 Uhr erfolgt oder wenn schweres Messematerial (über 15 kg) transportiert werden muss.",
                highlightUrl: "doc3_travel-policy.html#highlight-task-6"
            }
        }
    }
};

// Phase tracking for two-phase task card flow
let currentPhase = 1;      // 1 or 2
let promptSentInPhase = false;
let optionSelectedInPhase = false;
let cumulativeHoverTimeOnTarget = 0; // Tracks valid hover duration for the current active task

// Detection for Interfaces
const isInterfaceA = window.location.pathname.toLowerCase().includes('interfacea.html');
const isInterfaceB = window.location.pathname.toLowerCase().includes('interfaceb.html');
const isInterfaceC = window.location.pathname.toLowerCase().includes('interfacec.html');
const isQuestionnaire = window.location.pathname.toLowerCase().includes('questionnaire.html');

const pdfFrame = document.getElementById('pdf-frame');
const hasPdfFrame = !!pdfFrame;

// Determine interface type letter for tracking (Q for Questionnaire)
const INTERFACE_TYPE = isQuestionnaire ? "Q" : (isInterfaceC ? "C" : (isInterfaceB ? "B" : "A"));

let currentDocUrl = "";

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

// Initialize Supabase Client with explicit headers to prevent "missing apikey" errors
const supabaseClient = (window.supabase && typeof window.supabase.createClient === 'function')
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        }
    })
    : null;

if (!supabaseClient) {
    console.error("Supabase client failed to initialize. Check if the CDN script is loaded correctly.");
}

/**
 * UTILITY: TRACK EVENT
 */
async function trackEvent(eventType, elementId = null, hoverDurationMs = null) {
    const computedTaskNumber = isQuestionnaire ? 0 : ((appStep - 1) * 2 + currentPhase);
    const computedPhaseNumber = isQuestionnaire ? 0 : appStep;

    const event = {
        user_id: sessionId,
        group_id: appGroup,
        task_number: computedTaskNumber,
        phase_number: computedPhaseNumber,
        interface_type: INTERFACE_TYPE,
        event_type: eventType,
        element_id: elementId,
        hover_duration_ms: hoverDurationMs
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
 * UTILITY: LOG CHAT PROMPT
 * Logs the specific prompt text to the chatPrompts_log table.
 */
async function logChatPrompt(promptText) {
    if (!supabaseClient) return;

    const computedTaskNumber = ((appStep - 1) * 2 + currentPhase);
    const computedPhaseNumber = appStep;

    const data = {
        user_id: sessionId,
        prompt_text: promptText,
        interface_type: INTERFACE_TYPE,
        task_number: computedTaskNumber,
        phase_number: computedPhaseNumber,
        group_id: appGroup
    };

    console.log("Logging chat prompt:", data);

    const { error } = await supabaseClient
        .from('chatPrompts_log')
        .insert([data]);

    if (error) {
        console.error("Supabase Error (chatPrompts_log):", error);
    }
}

/**
 * UTILITY: LOG TASK ANSWER
 * Logs the specific final answer choice selected for a task.
 */
async function logTaskAnswer(selectedValue, optionalComment = '') {
    if (!supabaseClient) return;

    let isCorrect = false;
    if (selectedValue !== '3') {
        const s = appStep;
        const p = currentPhase;
        // Mapping of logic (Task -> Step & Phase):
        // Task 1: (HR: Fitness) -> correct is 40 ('1')
        if (s === 1 && p === 1 && selectedValue === '1') isCorrect = true;     
        // Task 2: (HR: Kernzeit) -> KI hallucinates 09:00, correct is 10:00 ('2')
        if (s === 1 && p === 2 && selectedValue === '2') isCorrect = true;   
        // Task 3: (IT: Passwort) -> KI hallucinates 60, correct is 90 ('2')
        if (s === 2 && p === 1 && selectedValue === '2') isCorrect = true;   
        // Task 4: (IT: Laptop) -> correct is 2h ('1')
        if (s === 2 && p === 2 && selectedValue === '1') isCorrect = true;     
        // Task 5: (Travel: Hotel) -> correct is 120 ('1')
        if (s === 3 && p === 1 && selectedValue === '1') isCorrect = true;     
        // Task 6: (Travel: Taxi) -> KI hallucinates 20, correct is 22 ('2')
        if (s === 3 && p === 2 && selectedValue === '2') isCorrect = true;   
    }

    const computedTaskNumber = ((appStep - 1) * 2 + currentPhase);
    const computedPhaseNumber = appStep;

    const data = {
        user_id: sessionId,
        group_id: appGroup,
        interface_type: INTERFACE_TYPE,
        task_number: computedTaskNumber,
        phase_number: computedPhaseNumber,
        selected_value: selectedValue,
        is_correct: isCorrect,
        optional_comment: optionalComment
    };

    console.log("Logging task answer:", data);

    const { error } = await supabaseClient
        .from('task_answers_log')
        .insert([data]);

    if (error) {
        console.error("Supabase Error (task_answers_log):", error);
        alert(`Supabase Error (${error.code || 'DB'}):\n${error.message}\nDetails: ${error.details}`);
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

    // 2. PDF Frame Setup (Dynamic based on task document)
    if (appStep > 0 && TASKS[appStep]) {
        currentDocUrl = TASKS[appStep].docUrl;
    }
    if (hasPdfFrame && pdfFrame && currentDocUrl) {
        pdfFrame.src = currentDocUrl;
    }

    // 3. Task Card Injection (Two-Phase Flow)
    if (appStep > 0) {
        renderTaskCard(currentPhase);
    }

    // 4. Disable the main "Next Task" button until phase 2 is complete
    const nextBtn = document.getElementById('next-task-button');
    if (nextBtn) {
        nextBtn.disabled = true;
    }
}

/**
 * RENDER TASK CARD (Two-Phase)
 */
function renderTaskCard(phase) {
    const taskContainer = document.getElementById('task-description-container');
    if (!taskContainer) return;

    const task = TASKS[appStep];
    if (!task) return;

    const phaseData = task.phases[phase];
    if (!phaseData) return;

    const computedTaskNumber = ((appStep - 1) * 2 + phase);

    taskContainer.innerHTML = `
        <div class="task-card">
            <span class="task-label">Phase ${appStep} — Task ${computedTaskNumber}</span>
            <h2 class="task-card-heading">${task.topic}</h2>
            <p class="task-card-description">${task.description}</p>
            <div class="user-ticket-box" style="background:#f1f5f9; padding:10px; border-left:4px solid var(--primary-color); margin-bottom:1rem; font-style:italic; font-size: 0.95rem;">
                ${phaseData.userTicket}
            </div>
            <p class="task-card-hint" style="font-weight:600; margin-bottom: 0.5rem; color: var(--primary-color);">${phaseData.hint}</p>

            <div class="option-group">
                <label class="option-box disabled" style="font-size: 0.9rem;">
                    <input type="radio" name="accuracy-${phase}" value="1" disabled>
                    <span class="option-label">${phaseData.options["1"]}</span>
                </label>
                <label class="option-box disabled" style="font-size: 0.9rem;">
                    <input type="radio" name="accuracy-${phase}" value="2" disabled>
                    <span class="option-label">${phaseData.options["2"]}</span>
                </label>
                <label class="option-box disabled" style="font-size: 0.9rem;">
                    <input type="radio" name="accuracy-${phase}" value="3" disabled>
                    <span class="option-label">Ich kann diese Frage nicht beantworten</span>
                </label>
            </div>

            <div id="why-textbox-container" style="display: none; margin-bottom: 1rem;">
                <label for="why-textarea" style="font-size: 0.85rem; color: var(--text-main); font-weight: 600;">Why? (Optional)</label>
                <textarea id="why-textarea" placeholder="Please elaborate..." style="width: 100%; padding: 0.5rem; border: 2px solid var(--border-color); border-radius: 0.5rem; margin-top: 0.25rem; resize: vertical; min-height: 60px; font-family: inherit; font-size: 0.85rem;"></textarea>
            </div>

            <button class="card-next-button" id="card-next-btn" disabled>
                ${phase === 1 ? 'Nächstes Ticket öffnen' : 'Nächste Aufgabe (Dokument wechseln)'}
            </button>
        </div>
    `;

    // Wire up option box listeners
    const radios = taskContainer.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            optionSelectedInPhase = true;

            const whyContainer = document.getElementById('why-textbox-container');
            if (whyContainer) {
                if (radio.value === '3') {
                    whyContainer.style.display = 'block';
                } else {
                    whyContainer.style.display = 'none';
                }
            }

            trackEvent('option_selected', radio.value);
            checkPhaseCompletion();
        });
    });

    // Wire up the card next button
    const cardNextBtn = document.getElementById('card-next-btn');
    if (cardNextBtn) {
        cardNextBtn.addEventListener('click', handleCardNext);
    }
}

/**
 * CHECK PHASE COMPLETION
 * Enables the card "Next" button if both conditions are met.
 */
function checkPhaseCompletion() {
    const cardNextBtn = document.getElementById('card-next-btn');
    if (cardNextBtn && promptSentInPhase && optionSelectedInPhase) {
        cardNextBtn.disabled = false;
    }
}

/**
 * HANDLE CARD NEXT BUTTON
 */
function handleCardNext() {
    // 1. Get the selected option BEFORE we move to phase 2 or navigate away
    const selectedRadio = document.querySelector(`input[name="accuracy-${currentPhase}"]:checked`);
    const selectedValue = selectedRadio ? selectedRadio.value : 'none';

    // Check if the user filled out the optional "why" textbox
    const whyContainer = document.getElementById('why-textbox-container');
    const whyTextarea = document.getElementById('why-textarea');
    let whyReason = '';
    if (whyContainer && whyContainer.style.display !== 'none' && whyTextarea) {
        whyReason = whyTextarea.value.trim();
    }
    
    // Log the aggregated hover duration to interaction_logs BEFORE moving to the next phase
    if (cumulativeHoverTimeOnTarget > 0) {
        const expectedTaskNumber = ((appStep - 1) * 2 + currentPhase);
        trackEvent('target_hover_completed', `highlight-task-${expectedTaskNumber}`, cumulativeHoverTimeOnTarget);
        cumulativeHoverTimeOnTarget = 0; // Reset for the next phase!
    }

    // Log the answer to the task answers table
    logTaskAnswer(selectedValue, whyReason);

    if (currentPhase === 1) {
        // Move to phase 2: reset state and re-render card
        currentPhase = 2;
        promptSentInPhase = false;
        optionSelectedInPhase = false;

        trackEvent('card_next_click', 'phase_1_complete');

        // Re-enable chat input for phase 2
        const input = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');
        if (input) {
            input.disabled = false;
            input.placeholder = 'Type your question...';
        }
        if (sendButton) sendButton.disabled = false;

        renderTaskCard(2);
    } else {
        trackEvent('card_next_click', 'phase_2_complete');

        // Disable the card button while navigating
        const cardNextBtn = document.getElementById('card-next-btn');
        if (cardNextBtn) {
            cardNextBtn.disabled = true;
            cardNextBtn.textContent = 'Navigating...';
        }

        // Use the same navigation logic as handleNextTask
        handleNextTask();
    }
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
            msgDiv.innerHTML = `${text} <a href="${currentDocUrl}" class="citation-link" target="_blank" rel="opener">[1]</a>`;
            const citation = msgDiv.querySelector('.citation-link');
            citation.addEventListener('click', (e) => {
                trackEvent('citation_click', 'citation-link', { pdfUrl: currentDocUrl });
            });
        }
    } else {
        msgDiv.textContent = text;
    }

    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/**
 * STREAM MESSAGE (word-by-word like ChatGPT)
 */
function streamMessage(text, onComplete) {
    if (emptyState) emptyState.style.display = 'none';

    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ai-message';

    // Create a span for the streaming text
    const textSpan = document.createElement('span');
    msgDiv.appendChild(textSpan);

    chatWindow.appendChild(msgDiv);

    const words = text.split(' ');
    let wordIndex = 0;

    function typeNextWord() {
        if (wordIndex < words.length) {
            textSpan.textContent += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
            wordIndex++;
            chatWindow.scrollTop = chatWindow.scrollHeight;

            // Random delay between 30-80ms per word for natural feel
            const delay = 30 + Math.random() * 50;
            setTimeout(typeNextWord, delay);
        } else {
            // Streaming complete — add citation if not InterfaceB
            if (!isInterfaceB) {
                const citation = document.createElement('a');
                
                let linkUrl = currentDocUrl;
                if (TASKS[appStep] && TASKS[appStep].phases[currentPhase] && TASKS[appStep].phases[currentPhase].highlightUrl) {
                    linkUrl = TASKS[appStep].phases[currentPhase].highlightUrl;
                }
                
                citation.href = linkUrl;
                citation.className = 'citation-link';
                citation.target = '_blank';
                citation.rel = 'opener';
                citation.textContent = ' [1]';
                citation.addEventListener('click', () => {
                    trackEvent('citation_click', 'citation-link');
                });
                msgDiv.appendChild(citation);
            }

            // Call the completion callback
            if (onComplete) onComplete();
        }
    }

    typeNextWord();
}

/**
 * ACTION HANDLER
 */
function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    // Log the prompt text for qualitative analysis
    logChatPrompt(text);

    // 1. Post User Message
    appendMessage('user', text);
    userInput.value = '';
    userInput.style.height = 'auto'; // Reset height after send

    // 2. Show the "Thinking" animation
    const indicator = showThinkingIndicator();

    // 2.5 Mark that a prompt was sent in this phase
    promptSentInPhase = true;

    // Disable further input for this phase (one prompt per phase)
    userInput.disabled = true;
    userInput.placeholder = 'Prompt sent — please evaluate the answer.';
    if (sendBtn) sendBtn.disabled = true;

    // 3. Dynamic Delay based on input length
    // Base 2s + 35ms per character. Min 2.5s, Max 8,5s.
    const dynamicDelay = Math.min(8500, Math.max(2500, 2000 + (text.length * 35)));
    console.log(`Calculating delay for length ${text.length}: ${dynamicDelay}ms`);

    // 4. Wait for the dynamic duration
    setTimeout(() => {
        if (indicator) indicator.remove();

        // Retrieve the specific predefined AI answer for this task and phase
        const aiAnswer = (TASKS[appStep] && TASKS[appStep].phases[currentPhase])
            ? TASKS[appStep].phases[currentPhase].aiAnswer
            : "I am unable to provide an answer at this time.";

        // Post the AI answer word-by-word (streaming effect)
        streamMessage(aiAnswer, () => {
            // Enable option boxes after streaming completes
            const taskContainer = document.getElementById('task-description-container');
            if (taskContainer) {
                const radios = taskContainer.querySelectorAll('input[type="radio"]');
                radios.forEach(radio => radio.disabled = false);
                const labels = taskContainer.querySelectorAll('.option-box');
                labels.forEach(label => label.classList.remove('disabled'));
            }
            checkPhaseCompletion();
        });

        // 5. Interface Specific: Update PDF iframe with highlighting for both Interface B & C if supported
        if ((isInterfaceC || isInterfaceB) && pdfFrame) {
            console.log("Applying text highlight via postMessage...");
            const computedTaskNumber = ((appStep - 1) * 2 + currentPhase);
            const targetId = `highlight-task-${computedTaskNumber}`;
            
            setTimeout(() => {
                pdfFrame.contentWindow.postMessage({
                    type: 'apply_highlight',
                    taskId: targetId
                }, '*');
            }, 500); // Allow brief render time
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
        trackEvent('all_tasks_completed', 'next-task-button');
        setTimeout(() => {
            window.location.href = 'questionnaire.html';
        }, 500);
    }
}

/**
 * EVENT LISTENERS
 */
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        handleSend();
    });
}

if (userInput) {
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // Auto-resize textarea as user types
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    });
}

const nextTaskBtn = document.getElementById('next-task-button');
if (nextTaskBtn) {
    nextTaskBtn.addEventListener('click', () => {
        handleNextTask();
    });
}

/**
 * OPT-OUT HANDLER
 */
async function handleOptOut() {
    const confirmed = confirm("Are you sure you want to stop the study? Your participation is voluntary, and you can withdraw at any time. If you proceed, your current session will end.");

    if (confirmed) {
        console.log("User confirmed opt-out. Logging event...");

        // Log the specific 'study_opt_out' event for data exclusion
        await trackEvent('study_opt_out', 'opt-out-button');

        // Short delay to ensure event is sent before redirect
        setTimeout(() => {
            window.location.href = 'opt-out.html';
        }, 600);
    }
}

const optOutBtn = document.getElementById('opt-out-button');
if (optOutBtn) {
    optOutBtn.addEventListener('click', handleOptOut);
}

// Add global listener for hover tracking events deeply nested in iframes
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'source_tracking_event') {
        if (event.data.action === 'target_hover_completed') {
            const expectedTaskNumber = ((appStep - 1) * 2 + currentPhase);
            const expectedId = `highlight-task-${expectedTaskNumber}`;

            // Only sum up time spent hovering over the EXACT right paragraph for the current question
            if (event.data.elementId === expectedId) {
                cumulativeHoverTimeOnTarget += event.data.durationMs;
                console.log(`Accumulated +${event.data.durationMs}ms hover on Target ${expectedId}. Total now: ${cumulativeHoverTimeOnTarget}ms`);
            }
        }
    }
});

// Start
document.addEventListener('DOMContentLoaded', init);
