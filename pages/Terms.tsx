
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
        <div className="prose prose-slate max-w-none text-gray-700 space-y-6">
          <p>Last Updated: October 2024</p>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing the Federgreen Consulting website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily view the materials on Federgreen Consulting's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. KYC and Compliance</h2>
            <p>Users participating in our capital advisory services must complete full KYC/AML verification. Federgreen Consulting reserves the right to deny service to any party that fails to meet our stringent compliance requirements or provides fraudulent documentation.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Disclaimers</h2>
            <p>The materials on this website are provided on an 'as is' basis. Federgreen Consulting makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <p>Furthermore, Federgreen Consulting does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
