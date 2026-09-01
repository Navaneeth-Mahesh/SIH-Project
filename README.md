# ANTIGRAVITY MASTER PROMPT — VOXSHIELD AI FRONTEND

You are a world-class product designer, creative developer, frontend architect, and interaction designer.

Build the COMPLETE production-quality frontend for:

# VOXSHIELD AI

### Real-Time Voice Clone Detection & Impersonation Prevention

This is a Smart India Hackathon 2026 project.

Problem Statement:
**SIH26104 — AI-Powered Real-Time Detection and Prevention of Voice Cloning Impersonation Attacks**

The frontend must feel like a serious next-generation cybersecurity product, NOT a generic admin dashboard.

The visual quality should be comparable to an **Awwwards Site of the Day**, premium SaaS products, high-end cybersecurity platforms, and experimental creative-development websites.

The entire frontend must be implemented and functional.

DO NOT create fake/demo buttons.
DO NOT create placeholder interactions.
DO NOT create dead navigation.
DO NOT create "Coming Soon" sections.
DO NOT use static fake UI where an actual interaction can be implemented.

If a backend API is not available yet, create a clean API abstraction layer and a realistic local development fallback so every frontend feature remains functional and can later connect to FastAPI without rewriting the UI.

---

# 1. CORE PRODUCT IDEA

VoxShield AI protects users against AI-generated voice impersonation.

Core security pipeline:

DETECT → VERIFY → ALERT → PREVENT

The system should visually communicate:

Audio Input
↓
Preprocessing
↓
AI Anti-Spoofing Detection
↓
Speaker Verification
↓
Liveness / Challenge Verification
↓
Risk Scoring
↓
ALLOW / VERIFY / ALERT / BLOCK

The UI should make this pipeline understandable without overwhelming the user.

---

# 2. DESIGN DIRECTION

Create a unique dark-mode visual language.

Think:

"Cybersecurity command center meets cinematic audio laboratory."

NOT:

* Generic Tailwind dashboard
* Generic glassmorphism template
* Generic purple AI SaaS
* Excessive neon
* Cryptocurrency UI
* Gaming dashboard
* Overloaded 3D website

The design should feel:

* premium
* intelligent
* minimal
* cinematic
* technical
* trustworthy
* futuristic
* sophisticated
* extremely polished

Use a near-black background.

Suggested palette:

Background:
#050505 / #070707

Primary text:
#F5F5F5

Secondary text:
#8B8B8B

Borders:
subtle low-opacity white

Security accent:
deep electric blue / cyan

Warning:
amber

Critical:
red

SUCCESS:
subtle green

Do not use excessive gradients.

Use gradients only where they improve hierarchy.

---

# 3. TYPOGRAPHY

Use a premium modern type system.

Recommended:

Display:
Space Grotesk / Geist / Satoshi

Body:
Inter / Geist

Monospace:
JetBrains Mono

Large headlines should be bold but elegant.

Use strong typography hierarchy.

Example:

VOICE
IS NO LONGER
A TRUSTED SIGNAL.

Small supporting text underneath.

Avoid huge text everywhere.

Use whitespace aggressively.

---

# 4. VISUAL SIGNATURE

Create a unique visual identity around AUDIO.

The primary visual motif should be:

A living voice waveform / signal field.

The waveform should react to:

* microphone input
* audio playback
* analysis state
* risk level

Create subtle particles that behave like audio data points.

Particles should:

* be sparse
* react subtly to audio
* never overwhelm the interface
* move slowly
* disappear into darkness

Minimal 3D only.

Use Three.js / React Three Fiber ONLY where it genuinely adds value.

Possible 3D element:

A small floating "voice security core" / abstract spherical waveform object.

It should be:

* subtle
* dark
* minimal
* elegant
* low-poly / wireframe inspired
* slowly rotating

Do NOT build a huge 3D scene.

The product must remain fast.

---

# 5. GLOBAL LAYOUT

Use a persistent premium navigation.

Desktop:

---

## VOXSHIELD                                  SYSTEM ●

Overview
Live Monitor
Verify Voice
Threats
Voice Profiles
Analytics
Settings
--------

Mobile:

Bottom navigation or compact mobile navigation.

Navigation must actually work.

Use client-side routing.

Recommended routes:

/
/dashboard
/monitor
/verify
/threats
/profiles
/analytics
/settings

---

# 6. LANDING / PRODUCT ENTRY

Create an extremely polished landing/entry experience.

Hero:

VOXSHIELD AI

REAL-TIME
VOICE SECURITY.

Subheading:

Detect synthetic voices.
Verify identity.
Stop impersonation before damage occurs.

Primary CTA:

START PROTECTION

Secondary CTA:

EXPLORE SYSTEM

These must work.

"START PROTECTION" should navigate to /monitor.

"EXPLORE SYSTEM" should scroll/navigate through actual product sections.

Hero background:

Very subtle animated audio signal.

Sparse particles.

Minimal 3D voice-security object.

No giant 3D model.

---

# 7. DASHBOARD

Route:

/dashboard

Design a premium security overview.

Header:

SECURITY OVERVIEW

SYSTEM STATUS
● PROTECTED

Main hero card:

LIVE VOICE SECURITY

Show:

Current monitoring state
Microphone status
Connection state
Detection engine status

Create a large dynamic waveform.

When microphone is active:

Waveform responds to actual microphone input.

When inactive:

Show subtle idle animation.

---

# 8. REAL-TIME MONITOR

Route:

/monitor

This is the MOST IMPORTANT PAGE.

Make it visually spectacular.

Header:

LIVE VOICE MONITOR

Subtext:

Real-time analysis of incoming speech.

Large center waveform.

Controls:

[ START MONITORING ]

[ STOP ]

[ UPLOAD AUDIO ]

No fake buttons.

START MONITORING:

Request microphone permission.

Start Web Audio API analysis.

Display live waveform.

Display:

Input Level
Voice Activity
Processing
Latency

---

# 9. LIVE ANALYSIS UI

When audio is detected, show:

ANALYSING VOICE

Dynamic metrics:

DEEPFAKE PROBABILITY
XX%

SPEAKER MATCH
XX%

LIVENESS
PASS / FAIL / ANALYSING

RISK SCORE
XX / 100

Use smooth animated numbers.

Do not instantly jump between values.

Use spring/easing animations.

---

# 10. RISK VISUALIZATION

Create a beautiful circular / radial risk meter.

Example:

RISK

87

CRITICAL

The meter should animate smoothly.

Risk states:

0–30:
LOW

31–60:
MEDIUM

61–80:
HIGH

81–100:
CRITICAL

The colors should change subtly based on severity.

Do not make the UI look like a gaming HUD.

---

# 11. SECURITY DECISION

Under the risk score:

SYSTEM DECISION

Possible states:

✓ ALLOW
↻ VERIFY
⚠ ALERT
× BLOCK

Each state must have a distinct visual treatment.

Example:

CRITICAL THREAT

VOICE IMPERSONATION SUSPECTED

Action:
BLOCK

Reason:

Synthetic voice probability exceeded threshold.

---

# 12. AUDIO UPLOAD

The upload feature MUST work.

Allow:

.wav
.mp3
.m4a
.ogg

After upload:

1. Display filename
2. Display duration
3. Generate waveform
4. Play audio
5. Analyse audio
6. Show detection result
7. Show risk score
8. Show speaker verification state
9. Show recommended action

Drag-and-drop upload area.

Do not make this a fake uploader.

Use browser APIs for local processing where possible.

Create an API service abstraction:

services/api.ts

Later backend endpoint can replace the local fallback.

---

# 13. VERIFY VOICE

Route:

/verify

Create an identity verification experience.

Header:

VERIFY VOICE IDENTITY

Step 1:

SELECT PROFILE

Display registered voice profiles.

Step 2:

RECORD VOICE

Show:

10 SECOND RECORDING

Large circular microphone control.

The microphone button should actually record audio.

Show recording timer.

Show live waveform.

Step 3:

ANALYSE

Display:

Speaker similarity
Deepfake probability
Liveness

Step 4:

RESULT

Example:

IDENTITY VERIFIED

or

VERIFICATION FAILED

---

# 14. CHALLENGE-RESPONSE LIVENESS

This should be one of the most visually impressive interactions.

Display:

LIVE CHALLENGE

Say the following phrase:

"BLUE TIGER 729"

Generate the phrase dynamically.

Add:

[ START RECORDING ]

The user speaks.

Then show:

TRANSCRIBING...

Compare transcript with challenge phrase.

Display:

Challenge Match:
94%

Liveness:
PASS

Voice Authenticity:
91%

Then:

IDENTITY VERIFIED

or

VERIFICATION FAILED

Implement the interaction realistically using browser APIs / mocked service abstraction if speech recognition backend is unavailable.

---

# 15. THREAT CENTER

Route:

/threats

Title:

THREAT CENTER

Display security incidents.

Cards/table:

TIME
CALLER
THREAT
RISK
ACTION
STATUS

Example generated local data can be used ONLY as initial application state.

But users must be able to:

* filter
* search
* sort
* open incident
* inspect details
* mark reviewed
* dismiss alert

Clicking a threat opens a detailed security incident panel.

---

# 16. THREAT DETAIL

Create a cinematic incident view.

Example:

THREAT DETECTED

INCIDENT #VS-1025

VOICE IMPERSONATION

RISK
91 / 100

Show:

Deepfake probability
93%

Speaker match
38%

Liveness
FAILED

Replay likelihood
76%

Decision
BLOCKED

Add a waveform visualization.

Add timeline:

14:03:12
Audio received

14:03:13
Synthetic speech detected

14:03:14
Speaker mismatch detected

14:03:15
Liveness challenge failed

14:03:15
Transaction blocked

---

# 17. VOICE PROFILES

Route:

/profiles

Users can create voice profiles.

Create profile:

Name
Role
Description

Then:

RECORD VOICE

Use microphone.

Capture voice sample.

Generate local profile representation / mock embedding through service abstraction.

Show:

Profile created successfully.

Profiles should be editable and removable.

Search profiles.

View profile details.

---

# 18. ANALYTICS

Route:

/analytics

Create a beautiful security analytics page.

Charts:

Threats detected
Threats blocked
Verified calls
Verification failures
Average risk score
Detection latency

Use Recharts.

Charts must have:

* tooltips
* hover states
* responsive behavior
* time filters

Filters:

24H
7D
30D
90D

Create animated counters.

---

# 19. SETTINGS

Route:

/settings

Functional settings:

Detection sensitivity:

LOW
BALANCED
HIGH

Auto-block critical threats:

toggle

Require challenge verification:

toggle

Microphone:

connected / disconnected

Notifications:

toggle

Theme:

Dark only

Data retention:

session only / 7 days / 30 days

Save changes.

Persist settings using localStorage.

---

# 20. COMMAND CENTER FEEL

Add a keyboard command system.

Shortcut:

⌘K / CTRL+K

Open:

VOXSHIELD COMMAND

Commands:

Go to Dashboard
Start Monitoring
Verify Voice
Upload Audio
Open Threats
Open Profiles
Open Analytics
Open Settings

This should actually work.

---

# 21. MICRO-INTERACTIONS

Use premium micro-interactions everywhere.

Examples:

Button hover:

slight movement

Cards:

subtle border glow

Navigation:

smooth active indicator

Numbers:

count-up animation

Risk:

smooth radial transition

Threat:

subtle pulse

Waveform:

real-time response

Page transitions:

fast and elegant

Use Framer Motion.

Do NOT overanimate.

Animation should communicate system state.

---

# 22. LOADING STATES

Create custom loading states.

Never use:

"Loading..."

Instead:

SYSTEM INITIALISING
VOICE ENGINE STARTING
ANALYSING AUDIO
VERIFYING IDENTITY
CALCULATING RISK

Use subtle animated dots / signal pulses.

---

# 23. EMPTY STATES

Every page must have proper empty states.

Examples:

No threats:

NO ACTIVE THREATS
Your voice environment is currently clear.

No profiles:

NO VOICE PROFILES
Create a trusted identity profile to begin verification.

No recording:

AWAITING AUDIO INPUT

---

# 24. ERROR STATES

Create proper error handling.

Microphone denied:

MICROPHONE ACCESS DENIED

Explain how to enable it.

Backend unavailable:

ANALYSIS ENGINE UNAVAILABLE

Use local fallback where possible.

Upload error:

UNSUPPORTED AUDIO FORMAT

Do not crash the application.

---

# 25. RESPONSIVE DESIGN

The entire application must work on:

Desktop
Laptop
Tablet
Mobile

Do NOT simply shrink desktop.

Create intentional mobile layouts.

On mobile:

* bottom navigation
* large touch targets
* compact cards
* simplified analytics
* responsive waveform
* full-screen verification mode

---

# 26. ACCESSIBILITY

Implement:

keyboard navigation
ARIA labels
focus states
semantic HTML
sufficient contrast
reduced motion support

Do not sacrifice accessibility for aesthetics.

---

# 27. PERFORMANCE

This must feel extremely fast.

Use:

lazy loading
code splitting
dynamic imports
optimized animations
requestAnimationFrame for audio visualization
debounced updates
memoized components

Three.js must be lazy-loaded.

Do not run expensive particle calculations unnecessarily.

---

# 28. TECH STACK

Use:

Next.js
TypeScript
Tailwind CSS
Framer Motion
React Three Fiber
Three.js
Recharts
Lucide React

Browser APIs:

Web Audio API
MediaRecorder API
getUserMedia

Architecture:

components/
features/
hooks/
services/
lib/
types/
utils/

Keep code modular.

---

# 29. API ARCHITECTURE

Create:

services/api.ts

Services:

analyzeAudio()
startLiveAnalysis()
stopLiveAnalysis()
enrollVoice()
verifyVoice()
runLivenessCheck()
getThreats()
getThreatDetails()
getProfiles()
createProfile()
deleteProfile()
getAnalytics()

Create a central configuration:

NEXT_PUBLIC_API_URL

Default:

http://localhost:8000

When backend is unavailable:

Use a local service adapter.

IMPORTANT:

The UI should NOT need to change when we connect the real FastAPI backend.

---

# 30. TYPES

Create strong TypeScript types.

Example:

DetectionResult

{
spoofProbability: number
speakerMatch: number
liveness: "pass" | "fail" | "pending"
riskScore: number
riskLevel: "low" | "medium" | "high" | "critical"
action: "allow" | "verify" | "alert" | "block"
}

Use types throughout the application.

---

# 31. STATE MANAGEMENT

Use a lightweight state solution.

Zustand is acceptable.

Global state:

systemStatus
microphoneStatus
monitoringState
currentDetection
riskScore
userSettings
voiceProfiles
threats

Persist settings locally.

---

# 32. COMPONENTS

Create reusable components:

AudioWaveform
LiveWaveform
RiskGauge
RiskScore
ThreatCard
ThreatTable
ThreatDetail
VoiceRecorder
AudioUploader
VoiceProfileCard
VerificationFlow
ChallengePhrase
SecurityStatus
MetricCard
AnalyticsChart
CommandPalette
Navigation
Sidebar
MobileNavigation
Toast
Modal
ConfirmDialog
SystemIndicator
ParticleField
VoiceSecurityCore

---

# 33. 3D COMPONENT

Create one subtle 3D component:

VoiceSecurityCore

Concept:

A dark abstract sphere composed of:

* particles
* thin waveform rings
* subtle noise displacement

It should slowly rotate.

During analysis:

increase activity.

During critical threat:

slightly intensify movement.

During idle:

almost still.

Keep it lightweight.

It should feel like a visual representation of the AI engine.

Do NOT turn the site into a 3D game.

---

# 34. PARTICLE SYSTEM

Create:

ParticleField

Rules:

Very low density.

Dark background.

Tiny particles.

Slow movement.

Subtle response to audio amplitude.

No excessive neon.

No starfield cliché.

The particles should feel like microscopic audio/signal data.

---

# 35. SOUND / AUDIO VISUALIZATION

The waveform must be based on actual microphone input when possible.

Use:

AnalyserNode

Read:

frequency data
time-domain data

Create:

frequency visualization
amplitude visualization
voice activity indicator

Do not fake the waveform when microphone data exists.

---

# 36. SECURITY LANGUAGE

Use professional terminology.

Good:

VOICE AUTHENTICITY
SYNTHETIC PROBABILITY
SPEAKER MATCH
LIVENESS
RISK SCORE
THREAT LEVEL
SECURITY DECISION
IDENTITY VERIFIED
IMPERSONATION SUSPECTED

Avoid childish phrases like:

"AI magic"
"Wow!"
"Cool AI"
"Robot detected"

This is a cybersecurity product.

---

# 37. LANDING PAGE SECTIONS

If a landing page exists, use:

1. Hero
2. Problem
3. Detection
4. Verification
5. Risk Engine
6. Prevention
7. Real-time interface preview
8. Security architecture
9. Use cases
10. CTA

Use the product pipeline:

DETECT
VERIFY
ALERT
PREVENT

as the main storytelling structure.

---

# 38. USE CASES

Show:

Financial institutions
Call centers
Government services
Enterprise communication
Telecom
Personal voice security

These align with the SIH proposal.

Do not make these generic cards.

Use editorial layouts.

---

# 39. AWWWARDS-LEVEL DESIGN DETAILS

Pay attention to:

* spacing
* typography
* grid
* alignment
* contrast
* hierarchy
* motion
* responsive behavior
* cursor interactions
* transitions
* visual rhythm

Use asymmetrical layouts where appropriate.

Mix:

full-width sections
editorial grids
large typography
small technical labels
thin borders
negative space

Use tiny technical metadata labels such as:

VOICE ENGINE / 01
REAL-TIME ANALYSIS
MODEL STATUS
SIGNAL INTEGRITY
SECURITY LAYER

This creates the premium technical aesthetic.

---

# 40. CURSOR INTERACTION

On desktop, implement a subtle custom cursor.

Normal:

small dot

Hover interactive:

slightly expands

Do NOT create an annoying huge cursor.

Respect prefers-reduced-motion.

---

# 41. NO GENERIC UI

Absolutely avoid:

* standard Bootstrap dashboard
* generic purple gradient
* excessive glass cards
* excessive rounded corners
* giant neon text
* huge 3D objects
* stock illustrations
* meaningless decorative elements
* fake charts
* fake buttons
* placeholder lorem ipsum

Every visual element should have a purpose.

---

# 42. FUNCTIONALITY REQUIREMENT

This is critical.

Every button must perform a real action.

Examples:

START MONITORING
→ request microphone
→ start audio analyser
→ update waveform
→ update metrics
→ stop properly

UPLOAD
→ open file picker
→ validate audio
→ display waveform
→ play audio
→ send to API/local service
→ show result

VERIFY
→ start recording
→ capture microphone
→ analyse
→ display result

CREATE PROFILE
→ capture voice
→ create profile
→ persist profile

DELETE PROFILE
→ confirmation
→ delete

THREAT
→ open detail

FILTER
→ actually filter

SEARCH
→ actually search

SETTINGS
→ persist

COMMAND PALETTE
→ navigate/execute commands

No dead interactions.

---

# 43. LOCAL FALLBACK

Because the FastAPI backend may not exist during initial frontend development:

Implement:

services/mockApi.ts

But DO NOT expose this as a "Demo Mode" button.

The application should automatically detect whether backend is available.

If backend exists:

use backend.

If unavailable:

use local fallback.

The user should experience the same interface.

The architecture must make it trivial to replace the fallback with real ML inference.

---

# 44. SECURITY RESULT SIMULATION

The local fallback can generate deterministic analysis based on uploaded audio characteristics / controlled application state.

Do not randomly change values every render.

Results should remain stable for the same analysis session.

Example:

Human:

spoofProbability: 0.08
speakerMatch: 0.94
liveness: pass
riskScore: 9
action: allow

Synthetic:

spoofProbability: 0.92
speakerMatch: 0.42
liveness: fail
riskScore: 89
action: block

Clearly structure this as a service adapter so the real ML model can replace it later.

---

# 45. TOAST SYSTEM

Use elegant toast notifications.

Examples:

MICROPHONE CONNECTED
AUDIO ANALYSIS COMPLETE
VOICE PROFILE CREATED
THREAT BLOCKED
SETTINGS SAVED

Never use browser alert().

---

# 46. CODE QUALITY

Write production-quality TypeScript.

Avoid:

any
duplicate components
huge files
hardcoded repeated values
inline business logic
unnecessary dependencies

Create reusable hooks:

useAudioRecorder()
useAudioAnalyser()
useMicrophone()
useVoiceVerification()
useThreats()
useSettings()

---

# 47. FINAL QUALITY CHECK

Before finishing:

Run the application.

Check every route.

Check every button.

Check microphone permission.

Check recording.

Check upload.

Check playback.

Check waveform.

Check responsive design.

Check command palette.

Check navigation.

Check settings persistence.

Check profile creation/deletion.

Check threat filtering.

Check animations.

Check console errors.

Fix all TypeScript errors.

Fix all React warnings.

Fix all broken links.

Fix all layout overflow.

Do not stop after generating the visual UI.

The result must actually run.

---

# 48. FINAL EXPERIENCE

When the user opens VoxShield, it should immediately communicate:

"THIS SYSTEM IS WATCHING THE VOICE CHANNEL."

It should feel like a serious security product.

The first impression should be:

minimal
dark
cinematic
intelligent
technical
premium

The interface should feel closer to a high-end security operations product than a college project.

---

# 49. MOST IMPORTANT RULE

DO NOT BUILD A STATIC DESIGN MOCKUP.

BUILD A COMPLETE FUNCTIONAL FRONTEND APPLICATION.

Every interaction must work.

Every route must work.

Every major feature must have a functional implementation or a service abstraction with a working local fallback.

The frontend should be ready to connect directly to a FastAPI + Python AI backend.

Start by creating the complete application architecture, then implement the design system, then all pages, then functionality, then animations, then responsive layouts, then test everything.

Do not ask me to manually implement missing pieces.

Build the complete frontend.
