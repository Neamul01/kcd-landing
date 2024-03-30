import React from "react";

export default function page() {
  return (
    <div className="max-w-sectionLayout mx-auto my-40">
      <h2 className=" border-b-2 pb-3 text-2xl font-semibold mb-8">
        Terms & Condition
      </h2>
      <article className="prose lg:prose-xl">
        <p>
          These terms and conditions outline the rules and regulations for the
          use of our website and services. By accessing this website and using
          our services, you agree to accept these terms and conditions. Do not
          continue to use if you do not agree to all of the terms and conditions
          stated on this page.
        </p>
        <h3>1. User Data</h3>
        <h4>1.1. Collection and Use:</h4>
        <p>
          When you use our website and services, we may collect personal
          information such as your name, email address, contact number, and
          other relevant details. We use this information to provide you with
          our services, communicate with you, and improve our offerings.
        </p>

        <h4>1.2. Protection:</h4>
        <p>
          {" "}
          We are committed to protecting your privacy and the security of your
          personal information. We employ industry-standard security measures to
          safeguard your data against unauthorised access or disclosure.
        </p>

        <h4>1.3. Third-party Services:</h4>
        <p>
          We may use third-party services to process payments or enhance user
          experience. These services may have their privacy policies, and we
          encourage you to review them before using their services through our
          website.
        </p>

        <h3>2. Payment Gateway</h3>
        <h4>2.1. Payment Processing:</h4>
        <p>
          Our website uses a secure payment gateway to facilitate transactions.
          When making a payment, you agree to abide by the terms and conditions
          of the payment gateway provider.
        </p>
        <h4>2.2. Transaction Security:</h4>
        <p>
          We take precautions to ensure the security of your payment
          information. However, we cannot guarantee the security of data
          transmitted over the Internet, and you acknowledge and accept the
          inherent risks associated with online transactions.
        </p>

        <h3>3. User Responsibilities</h3>
        <h4>3.1. Accuracy of Information:</h4>
        <p>
          You agree to provide accurate and up-to-date information when using
          our website and services. Any inaccuracies or discrepancies in the
          information you provide are your responsibility.
        </p>
        <h4>3.2. Compliance:</h4>
        <p>
          You agree to comply with all applicable laws and regulations when
          using our website and services. This includes but is not limited to
          laws regarding data protection, intellectual property rights, and
          online conduct.
        </p>

        <h3>4. Intellectual Property</h3>
        <h4>4.1. Ownership:</h4>
        <p>
          All content, including but not limited to text, graphics, logos, and
          images, is the property of the website owner or its licensors and is
          protected by copyright and other intellectual property laws.
        </p>
        <h4>4.2. Use Restrictions: </h4>
        <p>
          You may not reproduce, distribute, modify, or transmit any content
          from our website without prior written consent.
        </p>

        <h3>5. Amendments</h3>
        <h4>5.1. Updates:</h4>
        <p>
          We reserve the right to update or modify these terms and conditions
          without prior notice at any time. Any changes will be effective
          immediately upon posting on this page.
        </p>
        <h4>5.2. Continued Use: </h4>
        <p>
          Your continued use of our website and services following the posting
          of any changes constitutes acceptance of those changes.
        </p>

        <h3>6. Contact Us</h3>
        <p>
          If you have any questions or concerns about these terms and
          conditions, please contact us at{" "}
          <a href="mailto:organizers@kcddhaka.org">organizers@kcddhaka.org</a>
        </p>
        <p>
          By using our website and services, you acknowledge that you have read,
          understood, and agree to be bound by these terms and conditions.
        </p>
      </article>
    </div>
  );
}
