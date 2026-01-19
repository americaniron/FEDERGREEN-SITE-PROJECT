
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-gray-700 space-y-6">
          <p>Last Updated: October 2024</p>
          <p>At Federgreen Consulting, we take your privacy and the security of your sensitive financial documents with the utmost seriousness. This policy outlines our data-residency and storage requirements to comply with global regulations including GDPR, PIPEDA, CCPA, and PDPL.</p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p>For KYC/AML compliance, we collect: Passports, Driver's Licenses, Corporate Articles of Incorporation, Bank Statements, and Proof of Address. These are collected via secure, encrypted forms only.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Data Storage & Residency</h2>
            <p>Your data is stored in encrypted cloud environments (AWS/Azure/Google Cloud) located in the United States, EU, and/or Dubai, depending on your residency and the nature of the transaction. All data is encrypted at rest and in transit using 256-bit AES encryption.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Data Review & Sharing</h2>
            <p>Information is only accessed by Davina Federgreen and her core compliance team. Where necessary for funding, sanitized or full data may be shared with licensed lenders, counterparties, or compliance desks. We never sell your data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Retention & Deletion</h2>
            <p>Per global financial regulations, records are archived for 5 to 7 years. You may request a summary of your data or deletion (where allowed by law) by contacting our compliance officer at compliance@federgreenconsulting.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
