import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting seed...")

  // Create Admin User
  console.log("Creating admin user...")
  const adminPasswordHash = await bcrypt.hash("ChangeMe123!", 12)
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@fountainvitality.com" },
    update: {},
    create: {
      email: "admin@fountainvitality.com",
      name: "Admin User",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  })
  console.log(`  ✓ Admin user created: ${admin.email}`)

  // Create Role Templates
  console.log("\nCreating role templates...")
  
  const templateData: {
    role: Role
    title: string
    sections: {
      title: string
      items: {
        title: string
        description: string
        linkUrl?: string
        dueInDays?: number
      }[]
    }[]
  }[] = [
    {
      role: "CS",
      title: "Customer Service Onboarding",
      sections: [
        {
          title: "Company Basics",
          items: [
            {
              title: "Review Employee Handbook",
              description: "Read through the complete employee handbook to understand company policies and procedures.",
              linkUrl: "#employee-handbook",
              dueInDays: 3,
            },
            {
              title: "Complete Company Overview Training",
              description: "Watch the company overview video and complete the quiz.",
              linkUrl: "#company-overview",
              dueInDays: 2,
            },
            {
              title: "Meet Your Team",
              description: "Schedule introductory meetings with your team members and direct supervisor.",
              dueInDays: 5,
            },
            {
              title: "Review Organizational Chart",
              description: "Familiarize yourself with the company structure and key contacts.",
              linkUrl: "#org-chart",
            },
          ],
        },
        {
          title: "Security & Compliance",
          items: [
            {
              title: "Complete HIPAA Training",
              description: "Complete the mandatory HIPAA privacy and security training module.",
              linkUrl: "#hipaa-training",
              dueInDays: 7,
            },
            {
              title: "Sign Confidentiality Agreement",
              description: "Review and sign the confidentiality and non-disclosure agreement.",
              dueInDays: 3,
            },
            {
              title: "Complete IT Security Training",
              description: "Learn about password policies, phishing awareness, and data protection.",
              linkUrl: "#security-training",
              dueInDays: 7,
            },
          ],
        },
        {
          title: "Systems Access",
          items: [
            {
              title: "Set Up Email Account",
              description: "Configure your company email on all devices.",
              dueInDays: 1,
            },
            {
              title: "Access CRM System",
              description: "Complete CRM system training and set up your account.",
              linkUrl: "#crm-training",
              dueInDays: 5,
            },
            {
              title: "Phone System Training",
              description: "Learn to use the phone system, including transfers and voicemail.",
              dueInDays: 3,
            },
            {
              title: "Complete Chat Support Training",
              description: "Learn the chat support platform and standard responses.",
              linkUrl: "#chat-training",
              dueInDays: 7,
            },
          ],
        },
        {
          title: "Role Training",
          items: [
            {
              title: "Product Knowledge Training",
              description: "Complete comprehensive training on all products and services we offer.",
              linkUrl: "#product-training",
              dueInDays: 14,
            },
            {
              title: "Customer Service Scripts",
              description: "Review and practice standard customer service scripts and procedures.",
              linkUrl: "#cs-scripts",
              dueInDays: 10,
            },
            {
              title: "Shadow Experienced Agent",
              description: "Spend time shadowing an experienced customer service agent.",
              dueInDays: 14,
            },
            {
              title: "Complete Mock Calls",
              description: "Practice handling various customer scenarios with your trainer.",
              dueInDays: 21,
            },
          ],
        },
      ],
    },
    {
      role: "PROVIDER",
      title: "Provider Onboarding",
      sections: [
        {
          title: "Company Basics",
          items: [
            {
              title: "Review Employee Handbook",
              description: "Read through the complete employee handbook to understand company policies.",
              linkUrl: "#employee-handbook",
              dueInDays: 3,
            },
            {
              title: "Complete Company Overview Training",
              description: "Watch the company overview video and complete the quiz.",
              linkUrl: "#company-overview",
              dueInDays: 2,
            },
            {
              title: "Meet Medical Leadership",
              description: "Schedule introductory meetings with medical director and team leads.",
              dueInDays: 5,
            },
          ],
        },
        {
          title: "Credentialing & Compliance",
          items: [
            {
              title: "Submit Credentialing Documents",
              description: "Provide all required licenses, certifications, and credentials.",
              dueInDays: 5,
            },
            {
              title: "Complete HIPAA Training",
              description: "Complete the mandatory HIPAA privacy and security training module.",
              linkUrl: "#hipaa-training",
              dueInDays: 7,
            },
            {
              title: "DEA Registration Verification",
              description: "Verify DEA registration and submit documentation.",
              dueInDays: 7,
            },
            {
              title: "Malpractice Insurance Verification",
              description: "Submit proof of current malpractice insurance coverage.",
              dueInDays: 5,
            },
            {
              title: "Complete Compliance Training",
              description: "Complete all required compliance and regulatory training modules.",
              linkUrl: "#compliance-training",
              dueInDays: 14,
            },
          ],
        },
        {
          title: "Clinical Systems",
          items: [
            {
              title: "EHR System Training",
              description: "Complete comprehensive training on the Electronic Health Record system.",
              linkUrl: "#ehr-training",
              dueInDays: 10,
            },
            {
              title: "E-Prescribing Setup",
              description: "Set up and verify e-prescribing access and EPCS certification.",
              dueInDays: 7,
            },
            {
              title: "Lab System Access",
              description: "Set up access to laboratory ordering and results systems.",
              dueInDays: 7,
            },
            {
              title: "Telehealth Platform Training",
              description: "Complete training on telehealth platform and virtual visit protocols.",
              linkUrl: "#telehealth-training",
              dueInDays: 10,
            },
          ],
        },
        {
          title: "Clinical Orientation",
          items: [
            {
              title: "Review Clinical Protocols",
              description: "Review all clinical protocols and standard treatment guidelines.",
              linkUrl: "#clinical-protocols",
              dueInDays: 14,
            },
            {
              title: "Shadow Clinical Sessions",
              description: "Shadow experienced providers for at least 3 clinical sessions.",
              dueInDays: 14,
            },
            {
              title: "Complete Competency Assessment",
              description: "Complete clinical competency assessment with supervising physician.",
              dueInDays: 21,
            },
            {
              title: "Review Referral Processes",
              description: "Learn specialist referral procedures and partner networks.",
              dueInDays: 10,
            },
          ],
        },
      ],
    },
    {
      role: "RN",
      title: "Registered Nurse Onboarding",
      sections: [
        {
          title: "Company Basics",
          items: [
            {
              title: "Review Employee Handbook",
              description: "Read through the complete employee handbook.",
              linkUrl: "#employee-handbook",
              dueInDays: 3,
            },
            {
              title: "Complete Company Overview Training",
              description: "Watch the company overview video and complete the quiz.",
              linkUrl: "#company-overview",
              dueInDays: 2,
            },
            {
              title: "Meet Nursing Leadership",
              description: "Schedule introductory meetings with nurse manager and team.",
              dueInDays: 5,
            },
          ],
        },
        {
          title: "Credentialing & Compliance",
          items: [
            {
              title: "Submit License Verification",
              description: "Provide current RN license and any specialty certifications.",
              dueInDays: 3,
            },
            {
              title: "Complete HIPAA Training",
              description: "Complete the mandatory HIPAA privacy and security training.",
              linkUrl: "#hipaa-training",
              dueInDays: 7,
            },
            {
              title: "BLS Certification Verification",
              description: "Submit proof of current BLS certification.",
              dueInDays: 3,
            },
            {
              title: "Complete Compliance Training",
              description: "Complete all required compliance and safety training modules.",
              linkUrl: "#compliance-training",
              dueInDays: 14,
            },
          ],
        },
        {
          title: "Clinical Systems",
          items: [
            {
              title: "EHR System Training",
              description: "Complete training on the Electronic Health Record system.",
              linkUrl: "#ehr-training",
              dueInDays: 7,
            },
            {
              title: "Patient Communication System",
              description: "Learn the patient communication and messaging platform.",
              dueInDays: 5,
            },
            {
              title: "Telehealth Platform Training",
              description: "Complete training on telehealth platform for nurse visits.",
              linkUrl: "#telehealth-training",
              dueInDays: 7,
            },
          ],
        },
        {
          title: "Clinical Orientation",
          items: [
            {
              title: "Review Nursing Protocols",
              description: "Review all nursing protocols and care standards.",
              linkUrl: "#nursing-protocols",
              dueInDays: 10,
            },
            {
              title: "Medication Administration Review",
              description: "Complete medication administration policies and procedures review.",
              dueInDays: 7,
            },
            {
              title: "Shadow Experienced Nurse",
              description: "Shadow an experienced RN for at least 2 shifts.",
              dueInDays: 10,
            },
            {
              title: "Complete Skills Assessment",
              description: "Complete nursing skills competency assessment.",
              dueInDays: 14,
            },
          ],
        },
      ],
    },
    {
      role: "MA_BACKOFFICE",
      title: "Back-office MA Onboarding",
      sections: [
        {
          title: "Company Basics",
          items: [
            {
              title: "Review Employee Handbook",
              description: "Read through the complete employee handbook.",
              linkUrl: "#employee-handbook",
              dueInDays: 3,
            },
            {
              title: "Complete Company Overview Training",
              description: "Watch the company overview video and complete the quiz.",
              linkUrl: "#company-overview",
              dueInDays: 2,
            },
            {
              title: "Meet Your Team",
              description: "Schedule introductory meetings with your team and supervisor.",
              dueInDays: 5,
            },
          ],
        },
        {
          title: "Compliance & Safety",
          items: [
            {
              title: "Submit Certification Documents",
              description: "Provide MA certification and any additional credentials.",
              dueInDays: 3,
            },
            {
              title: "Complete HIPAA Training",
              description: "Complete the mandatory HIPAA privacy and security training.",
              linkUrl: "#hipaa-training",
              dueInDays: 7,
            },
            {
              title: "OSHA Safety Training",
              description: "Complete workplace safety and bloodborne pathogen training.",
              linkUrl: "#osha-training",
              dueInDays: 7,
            },
            {
              title: "BLS Certification Verification",
              description: "Submit proof of current BLS certification.",
              dueInDays: 3,
            },
          ],
        },
        {
          title: "Systems Training",
          items: [
            {
              title: "EHR System Training",
              description: "Complete training on the Electronic Health Record system.",
              linkUrl: "#ehr-training",
              dueInDays: 7,
            },
            {
              title: "Scheduling System Training",
              description: "Learn the patient scheduling and appointment system.",
              dueInDays: 5,
            },
            {
              title: "Insurance Verification Training",
              description: "Learn insurance verification procedures and systems.",
              dueInDays: 7,
            },
          ],
        },
        {
          title: "Clinical Skills",
          items: [
            {
              title: "Vital Signs Competency",
              description: "Complete vital signs assessment competency check-off.",
              dueInDays: 5,
            },
            {
              title: "Phlebotomy Competency",
              description: "Complete blood draw competency assessment.",
              dueInDays: 7,
            },
            {
              title: "Injection Administration",
              description: "Complete injection administration competency check-off.",
              dueInDays: 7,
            },
            {
              title: "Shadow Experienced MA",
              description: "Shadow an experienced Medical Assistant for at least 3 days.",
              dueInDays: 10,
            },
            {
              title: "Complete Skills Assessment",
              description: "Complete comprehensive MA skills assessment.",
              dueInDays: 14,
            },
          ],
        },
      ],
    },
  ]

  for (const template of templateData) {
    const roleTemplate = await prisma.roleTemplate.upsert({
      where: { role: template.role },
      update: { title: template.title },
      create: {
        role: template.role,
        title: template.title,
      },
    })

    console.log(`  ✓ Template for ${template.role}: ${roleTemplate.title}`)

    // Delete existing sections and items for clean seeding
    await prisma.templateSection.deleteMany({
      where: { roleTemplateId: roleTemplate.id },
    })

    // Create sections and items
    for (let sIndex = 0; sIndex < template.sections.length; sIndex++) {
      const section = template.sections[sIndex]
      const createdSection = await prisma.templateSection.create({
        data: {
          roleTemplateId: roleTemplate.id,
          title: section.title,
          order: sIndex,
        },
      })

      for (let iIndex = 0; iIndex < section.items.length; iIndex++) {
        const item = section.items[iIndex]
        await prisma.templateItem.create({
          data: {
            templateSectionId: createdSection.id,
            title: item.title,
            description: item.description,
            linkUrl: item.linkUrl,
            dueInDays: item.dueInDays,
            order: iIndex,
          },
        })
      }
    }
  }

  // Create Public Documents
  console.log("\nCreating public documents...")
  
  const docsData = [
    {
      title: "Employee Handbook",
      description: "Comprehensive guide covering company policies, procedures, and expectations.",
      url: "https://example.com/handbook",
      category: "Policies",
    },
    {
      title: "Code of Conduct",
      description: "Our ethical guidelines and professional standards.",
      url: "https://example.com/code-of-conduct",
      category: "Policies",
    },
    {
      title: "HIPAA Compliance Guide",
      description: "Essential information about patient privacy regulations.",
      url: "https://example.com/hipaa-guide",
      category: "Compliance",
    },
    {
      title: "Safety Protocols",
      description: "Workplace safety guidelines and emergency procedures.",
      url: "https://example.com/safety",
      category: "Safety",
    },
    {
      title: "Benefits Overview",
      description: "Summary of employee benefits including health insurance and PTO.",
      url: "https://example.com/benefits",
      category: "HR",
    },
    {
      title: "IT Security Policy",
      description: "Guidelines for data security and acceptable use of company systems.",
      url: "https://example.com/it-security",
      category: "IT",
    },
  ]

  await prisma.publicDoc.deleteMany()
  for (let i = 0; i < docsData.length; i++) {
    await prisma.publicDoc.create({
      data: { ...docsData[i], order: i },
    })
  }
  console.log(`  ✓ Created ${docsData.length} public documents`)

  // Create FAQs
  console.log("\nCreating FAQs...")
  
  const faqsData = [
    {
      question: "How long does the onboarding process take?",
      answer: "The onboarding process typically takes 2-4 weeks depending on your role. Your personalized checklist will show estimated completion times for each section.",
    },
    {
      question: "What should I bring on my first day?",
      answer: "Please bring two forms of identification, any relevant certifications or licenses, and a positive attitude! Your checklist will have specific requirements for your role.",
    },
    {
      question: "How do I access my onboarding checklist?",
      answer: "After your account is created by HR, you can sign in to the portal using your email and temporary password. You'll be prompted to change your password on first login.",
    },
    {
      question: "Who do I contact if I have questions?",
      answer: "You can reach out to our HR team at hr@fountainvitality.com or use the contact form on our Contact page. Your direct supervisor will also be introduced during orientation.",
    },
    {
      question: "Can I complete onboarding tasks remotely?",
      answer: "Many onboarding tasks can be completed remotely, such as document review and online training modules. However, some tasks like badge pickup and in-person orientation require on-site attendance.",
    },
    {
      question: "What if I need more time to complete a task?",
      answer: "If you need additional time for any task, please contact your supervisor or HR. We understand that everyone learns at their own pace.",
    },
  ]

  await prisma.fAQ.deleteMany()
  for (let i = 0; i < faqsData.length; i++) {
    await prisma.fAQ.create({
      data: { ...faqsData[i], order: i },
    })
  }
  console.log(`  ✓ Created ${faqsData.length} FAQs`)

  console.log("\n✅ Seed completed successfully!")
  console.log("\n📝 Admin Login Credentials:")
  console.log("   Email: admin@fountainvitality.com")
  console.log("   Password: ChangeMe123!")
  console.log("\n⚠️  Please change the admin password after first login!")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


