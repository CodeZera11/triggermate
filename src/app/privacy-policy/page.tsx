import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 md:px-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">1. Introduction</h2>
          <p>
            {`Welcome to Trigger Mate ("we," "our," or "us"). Trigger Mate is an Instagram automation tool that helps
            users manage their Instagram presence by providing features such as automatic replies to comments, direct
            messages, and other Instagram interactions.`}
          </p>
          <p>
            We are committed to protecting your privacy and handling your data with transparency. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
          <p>
            By using Trigger Mate, you agree to the collection and use of information in accordance with this policy. If
            you do not agree with our policies and practices, please do not use our service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">2. Information We Collect</h2>
          <h3 className="text-xl font-medium">2.1 Account Information</h3>
          <p>
            To provide our services, we collect information you provide when setting up your Trigger Mate account,
            including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and email address</li>
            <li>Instagram account credentials (securely stored)</li>
            <li>Profile information</li>
            <li>Payment information (processed through secure third-party payment processors)</li>
          </ul>

          <h3 className="text-xl font-medium">2.2 Instagram Data</h3>
          <p>When you connect your Instagram account to Trigger Mate, we access:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comments on your posts</li>
            <li>Direct messages</li>
            <li>Follower information</li>
            <li>Post engagement metrics</li>
            <li>Other data available through the Instagram API</li>
          </ul>

          <h3 className="text-xl font-medium">2.3 Usage Data</h3>
          <p>We collect information about how you use Trigger Mate, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Features you use</li>
            <li>Actions you take within the application</li>
            <li>Automation rules you set up</li>
            <li>Performance metrics of your automated responses</li>
            <li>Log data and device information</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve Trigger Mate services</li>
            <li>Process and complete transactions</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our service</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Personalize your experience</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">4. Data Storage and Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal
            information. However, please be aware that no method of transmission over the Internet or method of
            electronic storage is 100% secure.
          </p>
          <p>
            Your Instagram credentials are encrypted and stored securely. We do not store your Instagram password in
            plain text. Instead, we use secure authentication tokens provided by Instagram where possible.
          </p>
          <p>
            We retain your information for as long as your account is active or as needed to provide you services. We
            will delete your information upon your request or when it is no longer needed to provide you services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">5. Third-Party Services</h2>
          <p>
            {`Trigger Mate uses the Instagram API and other third-party services to provide our functionality. When you
            connect your Instagram account to Trigger Mate, you are also subject to Instagram's Terms of Service and
            Privacy Policy.`}
          </p>
          <p>Other third-party services we may use include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment processors to handle subscription and payment information</li>
            <li>Analytics providers to help us understand how our service is used</li>
            <li>Cloud service providers for hosting and storage</li>
            <li>Customer support tools</li>
          </ul>
          <p>
            These third parties may have access to your information only to perform these tasks on our behalf and are
            obligated not to disclose or use it for any other purpose.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">{`6. Compliance with Instagram's Terms`}</h2>
          <p>
            {`Trigger Mate is designed to comply with Instagram's Terms of Service and Platform Policy. We do not engage
            in or encourage:`}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Spamming or sending unsolicited messages</li>
            <li>{`Scraping or collecting data in violation of Instagram's policies`}</li>
            <li>Posting inappropriate or harmful content</li>
            <li>Any activity that could harm the Instagram platform or its users</li>
          </ul>
          <p>
            {`Users are responsible for ensuring that their use of Trigger Mate complies with Instagram's Terms of
            Service. We reserve the right to suspend or terminate accounts that violate these terms.`}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">7. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access the personal information we have about you</li>
            <li>The right to request correction of inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to object to or restrict processing of your information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            {`To exercise these rights, please contact us using the information provided in the "Contact Us" section
            below.`}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">{`8. Children's Privacy`}</h2>
          <p>
            Trigger Mate is not intended for children under the age of 13, and we do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and believe that your child has provided
            us with personal information, please contact us.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">9. Changes to This Privacy Policy</h2>
          <p>
            {`We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.`}
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
            are effective when they are posted on this page.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <address className="not-italic">
            <p>Trigger Mate</p>
            <p>Email: privacy@triggermate.com</p>
            <p>Address: 123 Automation Street, Suite 456, San Francisco, CA 94103</p>
          </address>
        </section>

        <div className="border-t pt-8">
          <Link href="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
