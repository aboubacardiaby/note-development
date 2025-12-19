import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultTemplates = [
  {
    name: 'Technical Documentation',
    description: 'Transforms meeting notes into structured technical documentation',
    category: 'technical',
    meetingType: 'technical',
    outputFormat: 'markdown',
    isDefault: true,
    promptTemplate: `Transform the following technical meeting notes into professionally formatted technical documentation:

{{note_content}}

Create a comprehensive technical document with exceptional formatting:

---

# 🔧 TECHNICAL OVERVIEW

> Provide a clear, concise summary of the technical discussion, highlighting the main objectives, systems involved, and key technical outcomes.

---

## 📋 MEETING INFORMATION

| Detail | Information |
|--------|-------------|
| **📅 Date** | {{date}} |
| **👥 Participants** | [Extract from notes] |
| **🏗️ Project/System** | [If mentioned] |
| **⏱️ Duration** | [If mentioned] |

---

## 💻 TECHNICAL DETAILS

### Architecture & Design

**System Components:**
- Component/Service names and their roles
- Integration points and dependencies
- **Technology stack** used or proposed

**Design Decisions:**
- Architectural choices made
- Design patterns selected
- Trade-offs and rationale

> 💡 *[Key architectural insights or recommendations]*

### Implementation Specifications

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| [Name] | [Tech] | [Version] | [Purpose] |
| [Name] | [Tech] | [Version] | [Purpose] |

**Key Technical Points:**
- Detailed specifications and requirements
- Performance considerations
- Security requirements
- Scalability concerns

### Code & Configuration

\`\`\`
[Include any code snippets, configurations, or commands discussed]
\`\`\`

**Technical Standards:**
- Coding conventions to follow
- Documentation requirements
- Testing standards

---

## ✅ TECHNICAL DECISIONS

| # | Decision | Technical Rationale | Impact | Alternatives Considered |
|---|----------|---------------------|--------|------------------------|
| 1 | [Decision] | [Why technically sound] | [System impact] | [Other options] |
| 2 | [Decision] | [Why technically sound] | [System impact] | [Other options] |

---

## 🎯 ACTION ITEMS & TASKS

### Critical Priority (P0)

- [ ] **[Task Title]**
  - 👤 **Assignee:** [Name]
  - 📅 **Due Date:** [Date]
  - 🔧 **Type:** [Development/Testing/Deployment/Documentation]
  - 🔗 **Dependencies:** [Related tasks]
  - 📝 **Details:** [Technical requirements]

### High Priority (P1)

- [ ] **[Task Title]**
  - 👤 **Assignee:** [Name]
  - 📅 **Due Date:** [Date]
  - 🔧 **Type:** [Task type]

### Normal Priority (P2)

- [ ] **[Task Title]**
  - 👤 **Assignee:** [Name]
  - 📅 **Due Date:** [Date]

---

## 🚀 IMPLEMENTATION ROADMAP

### Phase 1: Immediate (Next 7 Days)
1. [Task with assignee and deliverable]
2. [Task with assignee and deliverable]

### Phase 2: Short-term (Next 30 Days)
1. [Task with assignee and deliverable]
2. [Task with assignee and deliverable]

### Phase 3: Long-term (Beyond 30 Days)
1. [Task with assignee and deliverable]

---

## ⚠️ TECHNICAL RISKS & CHALLENGES

| Risk | Severity | Likelihood | Impact | Mitigation Strategy | Owner |
|------|----------|------------|--------|---------------------|-------|
| [Risk] | 🔴 High / 🟡 Medium / 🟢 Low | [%] | [Technical impact] | [Strategy] | [Name] |

**Known Issues:**
- [Issue description and workaround]
- [Issue description and workaround]

---

## 📊 PERFORMANCE & METRICS

### Performance Requirements

| Metric | Target | Current | Gap |
|--------|--------|---------|-----|
| Response Time | [Target] | [Current] | [Gap] |
| Throughput | [Target] | [Current] | [Gap] |
| Availability | [Target] | [Current] | [Gap] |

### Success Criteria
- ✓ [Measurable success criterion]
- ✓ [Measurable success criterion]

---

## 🔗 REFERENCES & RESOURCES

### Documentation Links
- **[Resource Name]** - [URL or location] - [Brief description]
- **[Resource Name]** - [URL or location] - [Brief description]

### Tools & Technologies
- **[Tool Name]** - [Purpose and link]
- **[Tool Name]** - [Purpose and link]

### Related Tickets/Issues
- [Ticket ID] - [Description]
- [Ticket ID] - [Description]

### API Endpoints (if applicable)
\`\`\`
GET /api/endpoint - Description
POST /api/endpoint - Description
\`\`\`

---

## 📝 ADDITIONAL NOTES

### Technical Considerations
> [Important technical context, constraints, or considerations]

### Follow-up Items
- Next review meeting: [Date]
- Required approvals: [Who needs to approve]
- Testing requirements: [What needs to be tested]

---

<div align="center">

**Technical Documentation**
*Generated: {{date}} | Template: Technical Documentation*

</div>

---

**FORMATTING GUIDELINES:**
- Use code blocks for technical snippets
- Add tables for specifications and comparisons
- Include diagrams descriptions when applicable
- Bold technical terms and component names
- Use emojis for section identification
- Maintain clear hierarchy with headings`,
    fields: [
      { name: 'overview', type: 'section', required: true },
      { name: 'technical_details', type: 'section', required: true },
      { name: 'action_items', type: 'list', required: false },
    ]
  },
  {
    name: 'Doctor Prescription',
    description: 'Transforms doctor-patient consultation notes into a formal prescription',
    category: 'medical',
    meetingType: 'doctor-patient',
    outputFormat: 'structured',
    isDefault: true,
    promptTemplate: `Transform the following doctor-patient consultation notes into a professionally formatted medical prescription and consultation record:

{{note_content}}

Create a comprehensive medical document with professional formatting:

---

# 🏥 MEDICAL CONSULTATION RECORD

---

## 👤 PATIENT INFORMATION

| Field | Information |
|-------|-------------|
| **Patient Name** | [Extract from notes or indicate "Not provided"] |
| **Age/DOB** | [If mentioned] |
| **Gender** | [If mentioned] |
| **Contact** | [If mentioned] |
| **📅 Consultation Date** | {{date}} |

---

## 🩺 CHIEF COMPLAINT

> [Primary reason for consultation - extract patient's main concern]

**Duration:** [How long patient has had symptoms]

**Severity:** 🔴 Severe / 🟡 Moderate / 🟢 Mild

---

## 📋 CLINICAL ASSESSMENT

### Symptoms Presented
- [Symptom 1 with details]
- [Symptom 2 with details]
- [Symptom 3 with details]

### Vital Signs (if mentioned)

| Parameter | Reading | Normal Range | Status |
|-----------|---------|--------------|---------|
| Blood Pressure | [Value] | 120/80 mmHg | ✓ Normal / ⚠️ Abnormal |
| Heart Rate | [Value] | 60-100 bpm | ✓ Normal / ⚠️ Abnormal |
| Temperature | [Value] | 98.6°F | ✓ Normal / ⚠️ Abnormal |
| Respiratory Rate | [Value] | 12-20/min | ✓ Normal / ⚠️ Abnormal |

### Physical Examination Findings
- [Examination finding 1]
- [Examination finding 2]

---

## 🔬 DIAGNOSIS

### Primary Diagnosis
**[Main diagnosis with ICD code if mentioned]**

> 💡 *Clinical rationale: [Brief explanation of diagnosis basis]*

### Secondary/Differential Diagnoses
- [Additional diagnosis 1]
- [Additional diagnosis 2]

---

## 💊 PRESCRIPTION & TREATMENT PLAN

### Medications Prescribed

#### Medication 1: [Drug Name]
- **💊 Generic Name:** [Generic name]
- **📊 Dosage:** [Strength and form]
- **⏰ Frequency:** [How often to take]
- **🕐 Duration:** [How long to continue]
- **🍽️ Instructions:** [Before/after meals, etc.]
- **⚠️ Precautions:** [Important warnings]

#### Medication 2: [Drug Name]
- **💊 Generic Name:** [Generic name]
- **📊 Dosage:** [Strength and form]
- **⏰ Frequency:** [How often to take]
- **🕐 Duration:** [How long to continue]
- **🍽️ Instructions:** [Before/after meals, etc.]

### Medication Summary Table

| # | Medication | Dosage | Frequency | Duration | Purpose |
|---|------------|--------|-----------|----------|---------|
| 1 | [Name] | [Dose] | [Freq] | [Days] | [Reason] |
| 2 | [Name] | [Dose] | [Freq] | [Days] | [Reason] |

---

## 📝 PATIENT INSTRUCTIONS

### Medication Guidelines
- ✓ Take medications exactly as prescribed
- ✓ Complete full course even if feeling better
- ✓ Do not skip doses
- ✓ [Specific instruction related to medications]

### Lifestyle Recommendations
- [Dietary advice]
- [Activity restrictions or recommendations]
- [Rest requirements]
- [Hydration guidelines]

### Warning Signs - Seek Immediate Care If:
- 🚨 [Critical symptom 1]
- 🚨 [Critical symptom 2]
- 🚨 [Critical symptom 3]

---

## 🔄 FOLLOW-UP PLAN

### Next Appointment
- **📅 Schedule:** [When to return]
- **🎯 Purpose:** [What will be assessed]
- **📋 Required Tests:** [Any labs or tests needed]

### Monitoring Requirements
- [ ] [What patient should monitor - e.g., temperature, symptoms]
- [ ] [What patient should track - e.g., pain levels, medication effects]

### Expected Recovery Timeline
- **Improvement Expected:** [Timeframe]
- **Full Recovery:** [Timeframe]

---

## 🧪 DIAGNOSTIC TESTS ORDERED

| Test | Purpose | Instructions | Results Due |
|------|---------|--------------|-------------|
| [Test name] | [Why ordered] | [Preparation needed] | [When] |
| [Test name] | [Why ordered] | [Preparation needed] | [When] |

---

## ⚠️ DRUG INTERACTIONS & ALLERGIES

### Known Allergies
- [Allergy 1 - if mentioned]
- [Allergy 2 - if mentioned]

### Potential Drug Interactions
> [Any noted interactions or precautions between prescribed medications]

### Contraindications
- [Any conditions or medications to avoid]

---

## 📎 ADDITIONAL NOTES

### Clinical Notes
> [Any additional observations or context important for medical record]

### Referrals (if applicable)
- **Specialist:** [Type of specialist]
- **Reason:** [Why referral needed]
- **Urgency:** Immediate / Within 1 week / Routine

### Medical Certificate (if issued)
- **Recommended Rest:** [Number of days]
- **Work/School:** Excused from [Date] to [Date]

---

<div align="center">

**Medical Consultation Record**
*Generated: {{date}} | Healthcare Professional: [Doctor name if mentioned]*

⚕️ **IMPORTANT:** This is a medical prescription. Follow all instructions carefully.

</div>

---

**DISCLAIMER:** This prescription is valid for [duration]. Keep out of reach of children. Store medications as directed. Report any adverse reactions immediately.

---

**FORMATTING GUIDELINES:**
- Use clear medical terminology
- Include all safety warnings
- Highlight critical information
- Use tables for medication schedules
- Emphasize follow-up requirements
- Maintain professional medical format`,
    fields: [
      { name: 'patient_info', type: 'text', required: false },
      { name: 'diagnosis', type: 'text', required: true },
      { name: 'medications', type: 'list', required: true },
      { name: 'instructions', type: 'text', required: false },
    ]
  },
  {
    name: 'Development Sprint Notes',
    description: 'Structures agile development meeting notes',
    category: 'technical',
    meetingType: 'development',
    outputFormat: 'markdown',
    isDefault: true,
    promptTemplate: `Transform these development sprint meeting notes into professionally formatted agile documentation:

{{note_content}}

Create a comprehensive sprint document with exceptional formatting:

---

# 🚀 SPRINT OVERVIEW

> Brief summary of the sprint's main focus, themes, and overall objectives.

---

## 📋 SPRINT INFORMATION

| Detail | Information |
|--------|-------------|
| **📅 Sprint Period** | [Start Date] - [End Date] |
| **🔢 Sprint Number** | Sprint [#] |
| **👥 Team Members** | [Extract from notes] |
| **⏱️ Meeting Date** | {{date}} |
| **🎯 Meeting Type** | [Stand-up/Planning/Review/Retro] |

---

## 🎯 SPRINT GOALS & OBJECTIVES

### Primary Goals

1. **[Goal 1 Title]**
   - Success Criteria: [How to measure completion]
   - Business Value: [Why this matters]
   - Status: 🟢 On Track / 🟡 At Risk / 🔴 Blocked

2. **[Goal 2 Title]**
   - Success Criteria: [How to measure completion]
   - Business Value: [Why this matters]
   - Status: 🟢 On Track / 🟡 At Risk / 🔴 Blocked

### Sprint Metrics Target

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Story Points | [Target] | [Completed] | [%] |
| Velocity | [Target] | [Current] | 🟢/🟡/🔴 |
| Bugs Fixed | [Target] | [Fixed] | [%] |
| Code Coverage | [Target %] | [Current %] | 🟢/🟡/🔴 |

---

## ✅ COMPLETED WORK

### User Stories Completed

- [ ] **[Story ID]: [Story Title]**
  - 👤 **Developer:** [Name]
  - 📊 **Story Points:** [Points]
  - 🎯 **Sprint:** Sprint [#]
  - ✨ **Key Deliverables:** [What was delivered]
  - 🔗 **PR/Ticket:** [Link or ID]

- [ ] **[Story ID]: [Story Title]**
  - 👤 **Developer:** [Name]
  - 📊 **Story Points:** [Points]
  - ✨ **Key Deliverables:** [What was delivered]

### Bug Fixes

| Bug ID | Description | Severity | Fixed By | Verification |
|--------|-------------|----------|----------|--------------|
| [ID] | [Description] | 🔴/🟡/🟢 | [Name] | ✓ Verified / ⏳ Pending |

### Technical Achievements
- ✓ [Achievement 1 - e.g., improved performance]
- ✓ [Achievement 2 - e.g., reduced technical debt]
- ✓ [Achievement 3 - e.g., enhanced test coverage]

---

## 🔄 IN PROGRESS

### Active Stories

- **[Story ID]: [Story Title]**
  - 👤 **Assignee:** [Name]
  - 📊 **Story Points:** [Points]
  - 📈 **Progress:** [%] Complete
  - 📅 **Expected Completion:** [Date]
  - 📝 **Current Status:** [Brief update]
  - 🔗 **Dependencies:** [Any blockers or dependencies]

### Code Reviews Pending

| PR # | Title | Author | Reviewer | Priority |
|------|-------|--------|----------|----------|
| [#] | [Title] | [Name] | [Name] | 🔴/🟡/🟢 |

---

## 🚧 BLOCKERS & ISSUES

### Critical Blockers (🔴 High Priority)

1. **[Blocker Description]**
   - **Impact:** [How this affects sprint]
   - **Affected Stories:** [Story IDs]
   - **Owner:** [Who's responsible for resolution]
   - **Action Plan:** [Steps to resolve]
   - **ETA:** [When will be resolved]

### Issues & Challenges (🟡 Medium Priority)

- **[Issue Description]**
  - Resolution Strategy: [How to address]
  - Owner: [Name]

### Technical Debt Identified

- [Technical debt item 1]
- [Technical debt item 2]

> ⚠️ **Team Note:** [Any important context about blockers]

---

## 💡 DECISIONS MADE

| # | Decision | Context | Impact | Decision Date |
|---|----------|---------|--------|---------------|
| 1 | [Decision] | [Why needed] | [What changes] | [Date] |
| 2 | [Decision] | [Why needed] | [What changes] | [Date] |

### Architecture/Design Decisions
- **[Decision Topic]:** [What was decided and why]

---

## 🎯 ACTION ITEMS

### Critical (Complete ASAP)

- [ ] **[Action Item]**
  - 👤 **Owner:** [Name]
  - 📅 **Due:** [Date]
  - 🔧 **Type:** [Development/Review/Testing/DevOps]
  - 📝 **Details:** [What needs to be done]

### High Priority (This Sprint)

- [ ] **[Action Item]**
  - 👤 **Owner:** [Name]
  - 📅 **Due:** [Date]
  - 🔧 **Type:** [Type]

### Standard Priority (Next Sprint)

- [ ] **[Action Item]**
  - 👤 **Owner:** [Name]
  - 📅 **Due:** [Date]

---

## 📊 SPRINT VELOCITY & METRICS

### Sprint Burndown Status
- **Planned Points:** [Total story points planned]
- **Completed Points:** [Points completed]
- **Remaining Points:** [Points remaining]
- **Velocity Trend:** [Increasing/Stable/Decreasing]

### Quality Metrics

| Metric | Value | Target | Trend |
|--------|-------|--------|-------|
| Test Coverage | [%] | [Target %] | ⬆️/➡️/⬇️ |
| Bugs Introduced | [#] | [Target] | ⬆️/➡️/⬇️ |
| Code Review Time | [hrs] | [Target] | ⬆️/➡️/⬇️ |
| Build Success Rate | [%] | [Target %] | ⬆️/➡️/⬇️ |

---

## 🔮 NEXT SPRINT PLANNING

### Proposed Stories for Next Sprint

| Story ID | Title | Points | Priority | Dependencies |
|----------|-------|--------|----------|--------------|
| [ID] | [Title] | [Pts] | 🔴/🟡/🟢 | [If any] |

### Capacity Planning
- **Team Capacity:** [Available hours/points]
- **Planned Commitment:** [Story points to commit]
- **Buffer:** [% for unexpected work]

### Focus Areas
1. [Focus area 1 - e.g., Feature development]
2. [Focus area 2 - e.g., Bug fixes]
3. [Focus area 3 - e.g., Technical debt]

---

## 🎓 RETROSPECTIVE INSIGHTS

### What Went Well ✨
- [Positive 1]
- [Positive 2]
- [Positive 3]

### What Needs Improvement 🔧
- [Improvement area 1]
- [Improvement area 2]

### Action Items from Retro
- [ ] [Process improvement 1]
- [ ] [Process improvement 2]

---

## 🔗 RESOURCES & LINKS

### Sprint Board & Documentation
- **Jira/Board:** [Link to sprint board]
- **Confluence:** [Link to documentation]
- **Repository:** [Link to repo]

### Related Documents
- [Document name] - [Link]
- [Document name] - [Link]

### Deployment Information
- **Environment:** [Staging/Production]
- **Version:** [Version number]
- **Deployment Date:** [When deployed]

---

## 📝 TEAM NOTES

### Important Announcements
> [Any team announcements or important information]

### Upcoming Events
- **📅 Next Sprint Planning:** [Date and time]
- **📅 Next Stand-up:** [Date and time]
- **📅 Next Demo:** [Date and time]

### Team Availability
- [Team member] - [Availability notes if relevant]

---

<div align="center">

**Sprint Documentation**
*Generated: {{date}} | Sprint [#] | Team: [Team name if mentioned]*

🏃 **Keep sprinting towards excellence!**

</div>

---

**FORMATTING GUIDELINES:**
- Use progress indicators and emojis
- Include story points and metrics
- Highlight blockers prominently
- Track velocity and capacity
- Maintain sprint continuity
- Link to tickets and PRs`,
    fields: [
      { name: 'sprint_goals', type: 'list', required: true },
      { name: 'blockers', type: 'list', required: false },
      { name: 'action_items', type: 'list', required: true },
    ]
  },
  {
    name: 'General Meeting Minutes',
    description: 'Creates formal meeting minutes from general meeting notes',
    category: 'meeting',
    meetingType: 'general',
    outputFormat: 'markdown',
    isDefault: true,
    promptTemplate: `Transform the following general meeting notes into professionally formatted formal meeting minutes:

{{note_content}}

Create comprehensive meeting minutes with exceptional formatting:

---

# 📝 MEETING MINUTES

---

## 📋 MEETING INFORMATION

| Detail | Information |
|--------|-------------|
| **📅 Date** | {{date}} |
| **⏰ Time** | [Extract from notes if mentioned] |
| **📍 Location** | [Extract from notes if mentioned] |
| **🎯 Meeting Type** | [Type of meeting] |
| **👤 Facilitator** | [If mentioned] |
| **📝 Minutes Taken By** | [If mentioned] |

### Attendees

**Present:**
- [Name] - [Title/Role]
- [Name] - [Title/Role]
- [Name] - [Title/Role]

**Absent/Apologies:**
- [Name] - [Reason if mentioned]

---

## 🎯 MEETING OBJECTIVES

> [Brief statement of the meeting's purpose and intended outcomes]

---

## 📌 AGENDA ITEMS

### 1. [Agenda Item Title]

**Presenter:** [Name if mentioned]
**Duration:** [Time allocated if mentioned]

**Discussion Summary:**
- [Key point discussed]
- [Key point discussed]
- [Important facts or data presented]

**Decisions/Outcomes:**
- ✅ [Decision or outcome]

> 💡 *[Important quote or context from this discussion]*

### 2. [Agenda Item Title]

**Presenter:** [Name if mentioned]

**Discussion Summary:**
- [Key point discussed]
- [Key point discussed]

**Decisions/Outcomes:**
- ✅ [Decision or outcome]

---

## 💬 KEY DISCUSSION POINTS

### [Topic Category 1]

**Main Points Raised:**
- **[Participant Name]:** [Their main point or contribution]
- **[Participant Name]:** [Their main point or contribution]

**Supporting Data/Facts:**
- [Relevant data point 1]
- [Relevant data point 2]

**Concerns Raised:**
- ⚠️ [Concern 1]
- ⚠️ [Concern 2]

### [Topic Category 2]

**Main Points Raised:**
- **[Participant Name]:** [Their main point or contribution]

**Consensus Reached:**
> [Summary of agreement or consensus]

---

## ✅ DECISIONS & RESOLUTIONS

| # | Decision | Proposed By | Voted/Approved | Implementation |
|---|----------|-------------|----------------|----------------|
| 1 | [Decision description] | [Name] | ✓ Unanimous / ✓ Majority / ✗ Rejected | [How/when to implement] |
| 2 | [Decision description] | [Name] | ✓ Unanimous / ✓ Majority | [How/when to implement] |

### Decision Details

#### Decision 1: [Title]
- **Rationale:** [Why this decision was made]
- **Impact:** [Who/what this affects]
- **Effective Date:** [When this takes effect]
- **Responsible Party:** [Who will implement]

#### Decision 2: [Title]
- **Rationale:** [Why this decision was made]
- **Impact:** [Who/what this affects]

---

## 🎯 ACTION ITEMS & RESPONSIBILITIES

### Immediate Actions (Within 7 Days)

- [ ] **[Action Item Title]**
  - 👤 **Assigned To:** [Name]
  - 📅 **Due Date:** [Date]
  - 🎯 **Priority:** High
  - 📝 **Details:** [What needs to be done]
  - 📊 **Success Criteria:** [How to measure completion]

### Short-term Actions (Within 30 Days)

- [ ] **[Action Item Title]**
  - 👤 **Assigned To:** [Name]
  - 📅 **Due Date:** [Date]
  - 🎯 **Priority:** Medium
  - 📝 **Details:** [What needs to be done]

### Long-term Actions (Beyond 30 Days)

- [ ] **[Action Item Title]**
  - 👤 **Assigned To:** [Name]
  - 📅 **Due Date:** [Date]
  - 🎯 **Priority:** Standard

---

## 📊 REPORTS & PRESENTATIONS

### Reports Shared

| Report Title | Presented By | Key Findings | Action Required |
|--------------|--------------|--------------|-----------------|
| [Title] | [Name] | [Summary] | ✓ Yes / ✗ No |

### Key Metrics/Data Discussed

- **[Metric Name]:** [Value] ([Trend: ⬆️/➡️/⬇️])
- **[Metric Name]:** [Value] ([Trend: ⬆️/➡️/⬇️])

---

## 🗣️ ANNOUNCEMENTS & UPDATES

### Important Announcements
- [Announcement 1]
- [Announcement 2]

### Organizational Updates
- [Update 1]
- [Update 2]

### Upcoming Events
- **📅 [Event Name]:** [Date and details]
- **📅 [Event Name]:** [Date and details]

---

## ⚠️ ISSUES & CONCERNS RAISED

| Issue | Raised By | Priority | Assigned To | Status |
|-------|-----------|----------|-------------|--------|
| [Issue description] | [Name] | 🔴/🟡/🟢 | [Name] | [Status] |

**Resolution Plans:**
- **[Issue]:** [Proposed solution or next steps]

---

## 💰 BUDGET & FINANCIAL MATTERS

### Budget Items Discussed

| Item | Amount | Status | Notes |
|------|--------|--------|-------|
| [Budget item] | $[Amount] | ✓ Approved / ⏳ Pending / ✗ Rejected | [Context] |

**Financial Decisions:**
- [Financial decision 1 and impact]
- [Financial decision 2 and impact]

---

## 🔮 NEXT STEPS & FOLLOW-UP

### Immediate Next Steps
1. [Step 1 with responsible party]
2. [Step 2 with responsible party]
3. [Step 3 with responsible party]

### Items Deferred to Next Meeting
- [Deferred item 1] - [Reason]
- [Deferred item 2] - [Reason]

### Required Follow-up
- **Approvals Needed:** [What needs approval and from whom]
- **Information Pending:** [What information is awaited]
- **Stakeholder Communication:** [Who needs to be informed]

---

## 📅 NEXT MEETING

### Meeting Details
- **📅 Date:** [Scheduled date]
- **⏰ Time:** [Scheduled time]
- **📍 Location:** [Location or platform]
- **🎯 Purpose:** [Main agenda items]

### Preparation Required
- [ ] [What attendees should prepare]
- [ ] [What attendees should review]

---

## 📎 ATTACHMENTS & REFERENCES

### Documents Referenced
- **[Document Name]** - [Brief description or link]
- **[Document Name]** - [Brief description or link]

### Supporting Materials
- [Material 1]
- [Material 2]

### Related Links
- [Link description] - [URL]

---

## 📝 ADDITIONAL NOTES

### Important Context
> [Any additional context or background information important for the record]

### Meeting Effectiveness
- **Duration:** [Actual duration]
- **Attendance Rate:** [% of expected attendees]
- **Agenda Completion:** [% of agenda items covered]

---

<div align="center">

**Official Meeting Minutes**
*Recorded: {{date}} | Compiled by: [Name if mentioned]*

*These minutes are subject to approval at the next meeting*

</div>

---

## ✍️ APPROVAL & SIGNATURES

**Minutes Prepared By:** [Name]
**Date Prepared:** [Date]

**Reviewed By:** [Name/Title]
**Date Reviewed:** [To be completed]

**Approved By:** [Name/Title]
**Date Approved:** [To be completed]

---

**FORMATTING GUIDELINES:**
- Use clear section headers with emojis
- Include attendance tracking
- Document all decisions formally
- Track action items with ownership
- Maintain professional tone
- Include approval section`,
    fields: [
      { name: 'meeting_info', type: 'section', required: true },
      { name: 'discussion_points', type: 'section', required: true },
      { name: 'decisions', type: 'list', required: false },
      { name: 'action_items', type: 'list', required: true },
    ]
  },
  {
    name: 'Professional Business Report',
    description: 'Transforms business meeting notes into a comprehensive professional report',
    category: 'business',
    meetingType: 'general',
    outputFormat: 'markdown',
    isDefault: true,
    promptTemplate: `Transform the following business meeting notes into a beautifully formatted, professional business report:

{{note_content}}

Create a comprehensive document with exceptional visual formatting:

---

# 📊 EXECUTIVE SUMMARY

> Provide a compelling 2-3 paragraph overview highlighting the meeting's strategic purpose, transformative outcomes, and business-critical decisions. Use clear, impactful language.

---

## 📋 MEETING DETAILS

| Detail | Information |
|--------|-------------|
| **📅 Date** | {{date}} |
| **👥 Attendees** | [Extract and list from notes] |
| **⏱️ Duration** | [If mentioned] |
| **📍 Location** | [If mentioned] |

---

## 💡 AGENDA & DISCUSSION POINTS

### [Topic 1 Name]

**Key Discussion:**
- Discussion point with clear explanation
- Important facts, figures, or data highlighted
- **Critical insights** emphasized

**Concerns Raised:**
- Any challenges or issues identified

> 💭 *[Include relevant quotes or important context]*

### [Topic 2 Name]
[Continue for all major topics discussed]

---

## ✅ STRATEGIC DECISIONS & OUTCOMES

| # | Decision | Rationale | Impact | Owner |
|---|----------|-----------|--------|-------|
| 1 | [Decision description] | [Why this was decided] | [Expected impact] | [Person/Team] |
| 2 | [Decision description] | [Why this was decided] | [Expected impact] | [Person/Team] |

---

## 🎯 ACTION ITEMS & DELIVERABLES

### High Priority

- [ ] **[Action Item Title]**
  - 👤 **Owner:** [Name]
  - 📅 **Deadline:** [Date]
  - 🔗 **Dependencies:** [Any dependencies]
  - 📝 **Details:** [Brief description]

### Medium Priority

- [ ] **[Action Item Title]**
  - 👤 **Owner:** [Name]
  - 📅 **Deadline:** [Date]
  - 📝 **Details:** [Brief description]

### Standard Priority

- [ ] **[Action Item Title]**
  - 👤 **Owner:** [Name]
  - 📅 **Deadline:** [Date]

---

## 💰 FINANCIAL IMPLICATIONS

### Budget Overview

| Category | Amount | Notes |
|----------|--------|-------|
| [Category 1] | $[Amount] | [Context] |
| [Category 2] | $[Amount] | [Context] |
| **TOTAL** | **$[Total]** | |

### ROI Projections
- **Expected Return:** [Details]
- **Timeline:** [When returns expected]
- **Success Metrics:** [How to measure]

> 💡 *Financial insight or recommendation*

---

## ⚠️ RISKS & MITIGATION STRATEGIES

| Risk | Impact Level | Probability | Mitigation Strategy | Owner |
|------|-------------|-------------|---------------------|-------|
| [Risk 1] | 🔴 High / 🟡 Medium / 🟢 Low | [%] | [Strategy] | [Name] |
| [Risk 2] | 🔴 High / 🟡 Medium / 🟢 Low | [%] | [Strategy] | [Name] |

---

## 🚀 NEXT STEPS & FOLLOW-UP

### Immediate Actions (Next 7 Days)
1. [Action with owner]
2. [Action with owner]

### Short-term (Next 30 Days)
1. [Action with owner]
2. [Action with owner]

### Upcoming Meetings
- **📅 Next Meeting:** [Date and time]
- **🎯 Focus:** [Main topics]
- **📋 Required Prep:** [What attendees should prepare]

---

## 📎 APPENDIX

### Key Metrics & KPIs
- **[Metric Name]:** [Value] ([Context or trend])
- **[Metric Name]:** [Value] ([Context or trend])

### Referenced Documents
- [Document or resource name] - [Brief description]
- [Document or resource name] - [Brief description]

### Additional Context
> [Any important background information or context that provides value]

---

<div align="center">

**Document Information**
*Generated: {{date}} | Template: Professional Business Report*

</div>

---

**FORMATTING GUIDELINES:**
- Use tables for structured data
- Add emojis/icons for visual scanning
- Bold important terms and names
- Use blockquotes for emphasis
- Add horizontal rules between major sections
- Use different heading levels for hierarchy
- Highlight numbers and metrics
- Keep language professional but engaging`,
    fields: [
      { name: 'executive_summary', type: 'section', required: true },
      { name: 'meeting_details', type: 'section', required: true },
      { name: 'discussion_points', type: 'section', required: true },
      { name: 'decisions', type: 'list', required: true },
      { name: 'action_items', type: 'list', required: true },
      { name: 'financial_implications', type: 'section', required: false },
      { name: 'risks', type: 'list', required: false },
      { name: 'next_steps', type: 'section', required: true },
    ]
  }
];

async function main() {
  console.log('🌱 Seeding database with default templates...\n');

  for (const template of defaultTemplates) {
    const result = await prisma.template.upsert({
      where: { name: template.name },
      update: template,
      create: template,
    });
    console.log(`✅ Created/Updated template: ${result.name}`);
  }

  console.log('\n🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
