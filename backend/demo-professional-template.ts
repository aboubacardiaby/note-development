import { PrismaClient } from '@prisma/client';
import aiService from './src/services/aiService';

const prisma = new PrismaClient();

// Sample business meeting notes
const sampleNotes = `
Q3 Strategic Planning Meeting

Attendees: Sarah Chen (CEO), Michael Rodriguez (CFO), Jennifer Park (COO), David Kumar (CTO), Lisa Thompson (VP Marketing)

Date: December 15, 2024
Duration: 2.5 hours
Location: Virtual (Zoom)

DISCUSSION:

Product Launch Timeline:
- Sarah opened discussion on new SaaS platform launch
- Originally planned for February, team suggests pushing to March for quality assurance
- David noted that beta testing revealed UI/UX issues that need 3 more weeks
- Marketing team needs minimum 4 weeks lead time for campaign
- Decision: Move launch to March 15th

Budget Allocation Q1 2025:
- Michael presented budget projections - $2.3M allocated for product development
- Marketing requesting additional $400K for launch campaign
- Lisa presented ROI projections: expect 15% increase in customer acquisition
- Operations needs $150K for new CRM system
- APPROVED: Additional $400K for marketing, $150K for operations
- Total Q1 budget: $2.85M

Technical Infrastructure:
- David raised concerns about server capacity for expected user growth
- Current infrastructure can handle 50K concurrent users
- Projecting 100K users by end of Q2
- Recommended AWS upgrade: $8K/month additional cost
- Jennifer suggested phased approach: upgrade when hitting 70% capacity
- DECISION: Implement monitoring, trigger upgrade at 70% threshold

Hiring Priorities:
- Need 3 senior developers (full-stack) - David
- 2 customer success managers - Jennifer
- 1 data analyst for marketing - Lisa
- Timeline: Fill positions by end of January
- Budget impact: $780K annually in salaries
- HR to post positions next week

Partnership Discussion:
- Lisa presented opportunity with TechCorp for co-marketing
- Could provide access to their 200K user base
- They want 20% revenue share on referred customers
- Some concern about brand alignment
- DECISION: Lisa to negotiate down to 15%, bring final terms to next meeting

Customer Feedback Analysis:
- NPS score currently 72 (industry average is 65)
- Top feature requests: mobile app (67%), API access (45%), advanced analytics (38%)
- 23% churn rate - need to address
- David committed to mobile app in Q2 roadmap
- Jennifer to implement quarterly customer advisory board

Competitive Analysis:
- Two new competitors entered market this quarter
- CompetitorX raised $50M Series B, aggressive pricing
- Our pricing 15% higher but better features/support
- Decision: Hold pricing, emphasize value proposition
- Marketing to create competitive comparison materials

Risks Identified:
1. Developer hiring in tight market - may delay projects
2. Server capacity if growth exceeds projections
3. Competitor pricing pressure on margins
4. Key client (MegaCorp) contract renewal uncertain - $1.2M annual value

ACTION ITEMS:
- David: Finalize March 15 launch plan, share by Dec 20
- Lisa: Negotiate TechCorp partnership, report by Jan 5
- Michael: Update Q1 budget spreadsheet, circulate by Dec 18
- Jennifer: Set up server capacity monitoring, complete by Dec 22
- HR (assigned): Post job openings for 6 positions by Dec 20
- Lisa: Create competitive analysis deck by Jan 10
- Jennifer: Schedule first customer advisory board meeting for January
- Michael: Analyze MegaCorp contract renewal strategy, present options by Dec 28

NEXT MEETING:
January 15, 2025, 2:00 PM PST
Focus: Review Q1 progress, finalize launch details
`;

async function demonstrateProfessionalTemplate() {
  try {
    console.log('🎯 Professional Business Report Template Demonstration\n');
    console.log('━'.repeat(80));

    // 1. Fetch the Professional Business Report template
    console.log('\n📋 Step 1: Fetching Professional Business Report template...');
    const template = await prisma.template.findUnique({
      where: { name: 'Professional Business Report' }
    });

    if (!template) {
      console.error('❌ Template not found. Please run: npm run prisma:seed');
      return;
    }
    console.log('✅ Template loaded successfully');

    // 2. Create a note in the database
    console.log('\n📝 Step 2: Creating sample business meeting note...');
    const note = await prisma.note.create({
      data: {
        title: 'Q3 Strategic Planning Meeting - Executive Team',
        content: sampleNotes,
        meetingType: 'general'
      }
    });
    console.log(`✅ Note created with ID: ${note.id}`);

    // 3. Transform the note using AI
    console.log('\n🤖 Step 3: Transforming note with Claude AI...');
    console.log('   (This may take 10-30 seconds)\n');

    const { content: transformedContent, tokensUsed } = await aiService.transformNote(
      sampleNotes,
      template as any,
      { date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    );

    // 4. Save the transformed document
    console.log('💾 Step 4: Saving transformed document...');
    const document = await prisma.document.create({
      data: {
        title: `${note.title} - Professional Report`,
        content: transformedContent,
        format: 'markdown',
        noteId: note.id,
        templateId: template.id,
        aiModel: 'claude-sonnet-4-20250514',
        tokensUsed: tokensUsed
      }
    });
    console.log(`✅ Document saved with ID: ${document.id}`);
    console.log(`   Tokens used: ${tokensUsed.toLocaleString()}`);

    // 5. Display results
    console.log('\n━'.repeat(80));
    console.log('📄 ORIGINAL NOTES');
    console.log('━'.repeat(80));
    console.log(sampleNotes.trim());

    console.log('\n\n');
    console.log('━'.repeat(80));
    console.log('✨ TRANSFORMED PROFESSIONAL REPORT');
    console.log('━'.repeat(80));
    console.log(transformedContent);

    console.log('\n━'.repeat(80));
    console.log('📊 TRANSFORMATION SUMMARY');
    console.log('━'.repeat(80));
    console.log(`Template Used: ${template.name}`);
    console.log(`Category: ${template.category}`);
    console.log(`Output Format: ${template.outputFormat}`);
    console.log(`AI Model: claude-sonnet-4-20250514`);
    console.log(`Tokens Used: ${tokensUsed.toLocaleString()}`);
    console.log(`Note ID: ${note.id}`);
    console.log(`Document ID: ${document.id}`);
    console.log('\n✅ Demonstration completed successfully!\n');

  } catch (error) {
    console.error('❌ Error during demonstration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

demonstrateProfessionalTemplate();
