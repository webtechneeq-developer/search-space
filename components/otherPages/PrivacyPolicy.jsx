import React from "react";

export default function PrivacyPolicy() {
  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container-fluid p-0">


      {/* Content Section */}
      <div className="container my-5">
        <div className="card1  border-0">
          <div className="card-body1 p-4 p-md-5">
            <p className="pb-2">
              This privacy policy (“Policy”) explains the policy regarding the
              collection, use, disclosure and transfer of your information by
              Search Spaces Private Limited and/or its subsidiary(ies) and/or
              affiliate(s) (collectively referred to as the “Company”), which
              operates various websites, including sub-sites, platforms,
              applications, m-web platforms and other platforms (collectively
              referred to as “Sites”) for delivery of information, products,
              offerings and content via any mobile or internet connected device
              or otherwise (collectively the “Services”).
            </p>

            <p className="pb-2">
              This Policy forms part and parcel of the Terms of Use and other
              terms on the Site (“Terms of Use”). Capitalized terms which have
              been used here but are undefined shall have the same meaning as
              attributed to them in the Terms of Use. This policy is effective
              from the date and time a user registers with Site and accept the
              terms and conditions laid out in the Site. Please read this
              Privacy Policy and our Terms of Use carefully before using our
              Services.
            </p>

            <p className="pb-2">
              Search Spaces respects the privacy of its users and is committed
              to protect it in all respects. With a view to offer most enriching
              and holistic internet experience to its users Search Spaces offers
              a vast repository of Online Sites and variety of community
              services. The information about the user as collected by Search
              Spaces is: (a) information supplied by users and (b) information
              automatically tracked while navigation (Information).
            </p>

            <p className="pb-4">
              By using Search Spaces website or its services, you consent to
              collection, storage, use, transfer, share and distribute the
              personal information you provide (including any changes thereto as
              provided by you) for any of the services that we offer.
            </p>

            {/* Sections */}
            <h5 className="mt-4 mb-2">1. Information Received, Collected and Stored by The Company</h5>
            <p className="sub-heading ms-4"><strong>Registration data</strong></p>
            <p className="ms-4">
              When you register on the Sites for the Service, we ask you to
              provide basic contact information such as but not limited to your
              name, sex, age, address, pin code, contact number, occupation,
              interests and email address etc. When you register using your
              other accounts like Facebook, Twitter, Gmail etc. we shall
              retrieve Information from such account to continue to interact with
              you and to continue providing the Services.
            </p>

            <p className="sub-heading ms-4"><strong>Subscription or paid service data</strong></p>
            <p className="ms-4">
              When you choose any subscription or paid service provided as part
              of our Services, we or our payment gateway provider may collect
              your purchase, address or billing information, including your
              credit card number and expiration date etc. If at any point you do
              not wish to auto-renew your subscription, you may cancel your
              subscription before the end of the subscription term.
            </p>

            <p className="sub-heading ms-4"><strong>Voluntary information</strong></p>
            <p className="ms-4">
              We may collect additional information at other times, including
              but not limited to, when you provide feedback, comments, change
              your content or email preferences, respond to a survey, or any
              communications with us.
            </p>

            <h5 className="mt-4 mb-2  mb-2">2. Information Automatically Collected / Tracked While Navigation</h5>
            <p className="info-list mb-2 ms-4"><span>Cookies</span> – To improve the responsiveness of the Sites for our Users, we may use cookies, assign User IDs, and collect session information.</p>
            <p className="info-list mb-2 ms-4"><span>Log File Information</span> – We collect limited information like IP address, device details, and browser info when you visit our site.</p>
            <p className="info-list mb-2 ms-4"><span>Clear GIFs</span> – Used for tracking patterns and email open rates without personal identification.</p>

            <h5 className="mt-4  mb-2">3. Information from other sources</h5>
            <p className="ms-4">
              We may receive information about you from other sources, add it to
              our account information and treat it in accordance with this
              Policy.
            </p>

            <h5 className="mt-4  mb-2">4. How collected data is used?</h5>
            <p className="ms-4 mt-1">
              The Company uses collected information to improve Services, tailor
              experiences, send updates, marketing messages, and enable certain
              functionalities.
            </p>

            <h5 className="mt-4  mb-2">5. Information Sharing</h5>
            <p className="ms-4">
              We may share data with group companies, advertisers, social
              websites, or third parties as outlined, always with confidentiality
              and only under defined circumstances.
            </p>

            <h5 className="mt-4 mb-2">6. Accessing and Updating Personal Information</h5>
            <p className="ms-4">
              Users can access, update, or request deletion of their personal
              data. Requests that are impractical or affect others’ privacy may
              be denied.
            </p>

            <h5 className="mt-4 mb-2">7. Information Security</h5>
            <p className="ms-4">
              We use appropriate technical, organizational, and encryption
              measures, but cannot guarantee absolute security of transmitted
              data.
            </p>

            <h5 className="mt-4 mb-2">8. Updates / Changes</h5>
            <p className="ms-4">
              This Policy may change over time. Users are encouraged to review
              it periodically for updates.
            </p>

            <h5 className="mt-4 mb-2">9. Miscellaneous</h5>
            <p className="ms-4"> 
              Customers are responsible for maintaining account confidentiality.
              We are not liable for third-party misuse of publicly shared
              information.
            </p>

            <h5 className="mt-4 mb-2">10. Questions / Grievance Redressal</h5>
            <p>
              Any complaints or concerns should be sent to{" "}
              <a href="mailto:info@searchspaces.in">info@searchspaces.in</a> as
              per Terms of Use.
            </p>

            <p className="mt-4 text-muted fst-italic mb-2">
              This Privacy Policy is subject to changes. Please periodically
              review this page for the latest information on our privacy
              practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
