import styles from "./mobile-privacy.module.css";

export default function PrivacyPage() {
  return (
    <main className={styles.pageContainer}>
      <article className={styles.article}>
        <h1>Privacy Policy Mobile App</h1>

        <p>
          This privacy policy is applicable to the Colors app (hereinafter
          referred to as "Application") for mobile devices, which was developed
          by Paul Ungerer (hereinafter referred to as "Service Provider") as a
          Free service. This service is provided "AS IS".
        </p>

        <h2>
          What information does the Application obtain and how is it used?
        </h2>

        <h3>User Provided Information</h3>

        <p>
          The Application acquires the information you supply when you download
          and register the Application. Registration with the Service Provider
          is not mandatory. However, bear in mind that you might not be able to
          utilize some of the features offered by the Application unless you
          register with them.
          <br />
          <br />
          If you choose to sign in using Google or Apple as your identity
          provider, the Application will securely store your name, email
          address, and login provider (Google or Apple) in order to manage your
          account. After signing in, a session token is saved on your device for
          authentication purposes only; this token is not used for tracking. No
          additional data from your Google or Apple account is accessed or
          stored beyond what is required for authentication and account
          management.
          <br />
          <br />
          The Service Provider may also use the information you provided to
          contact you from time to time to provide you with important
          information, required notices, and marketing promotions.
          <br />
          <br />
          For more information about how your data is handled by these
          third-party services, please refer to their privacy policies:
          <br />
          <br />
          <a target="_blank" href={"https://policies.google.com/privacy"}>
            Google Privacy Policy
          </a>
          <br />
          <br />
          <a target="_blank" href={"https://www.apple.com/legal/privacy/"}>
            Apple Privacy Policy
          </a>
        </p>

        <h3>Automatically Collected Information</h3>

        <p>
          In addition, the Application may collect certain information
          automatically, including, but not limited to, the type of mobile
          device you use, your mobile devices unique device ID, the IP address
          of your mobile device, your mobile operating system, the type of
          mobile Internet browsers you use, and information about the way you
          use the Application.
        </p>

        <h3>Analytics</h3>

        <p>
          The Application uses Matomo Analytics to help us understand how users
          interact with the Application and to improve the overall user
          experience. Matomo is configured in a privacy-friendly, cookieless
          mode. This means:
          <br />
          <br />
          <span>{"\u2022"}</span> No cookies or persistent identifiers are used
          for tracking.
          <br />
          <br />
          <span>{"\u2022"}</span> The data collected does not include
          information that can identify you personally.
          <br />
          <br />
          <span>{"\u2022"}</span> Usage data (such as which features are used
          most often, general device type, and time of use) is collected in an
          aggregated and anonymized way.
          <br />
          <br />
          This analytics data is used solely for improving app functionality. No
          personal data is stored, and no data is shared with third parties for
          advertising or marketing purposes. For more information about Matomo
          and how it processes data, see{" "}
          <a target="_blank" href={"https://matomo.org/privacy-policy/"}>
            Matomos Privacy Policy
          </a>
          .
        </p>

        <h2>
          Does the Application collect precise real time location information of
          the device?
        </h2>

        <p>
          This Application does not gather precise information about the
          location of your mobile device.
        </p>

        <h2>
          Do third parties see and/or have access to information obtained by the
          Application?
        </h2>

        <p>
          Only aggregated, anonymized data is periodically transmitted to
          external services to aid the Service Provider in improving the
          Application and their service. The Service Provider may share your
          information with third parties in the ways that are described in this
          privacy statement. Please note that the Application utilizes
          third-party services that have their own Privacy Policy about handling
          data. Below are the links to the Privacy Policy of the third-party
          service providers used by the Application:
          <br />
          <br />
          <span>{"\u2022"}</span>{" "}
          <a target="_blank" href={"https://matomo.org/privacy-policy/"}>
            Matomo
          </a>
          <br />
          <br />
          The Service Provider may disclose User Provided and Automatically
          Collected Information:
          <br />
          <br />
          <span>{"\u2022"}</span> as required by law, such as to comply with a
          subpoena, or similar legal process;
          <br />
          <br />
          <span>{"\u2022"}</span> when they believe in good faith that
          disclosure is necessary to protect their rights, protect your safety
          or the safety of others, investigate fraud, or respond to a government
          request;
          <br />
          <br />
          <span>{"\u2022"}</span> with their trusted service providers who work
          on their behalf, do not have an independent use of the information we
          disclose to them, and have agreed to adhere to the rules set forth in
          this privacy statement.
        </p>

        <h3>What are my opt-out rights?</h3>

        <p>
          You can halt all collection of information by the Application easily
          by uninstalling the Application. You may use the standard uninstall
          processes as may be available as part of your mobile device or via the
          mobile application marketplace or network.
        </p>

        <h3>Data Retention Policy, Managing Your Information</h3>

        <p>
          The Service Provider will retain User Provided data for as long as you
          use the Application and for a reasonable time thereafter. The Service
          Provider will retain Automatically Collected information for up to 24
          months and thereafter may store it in aggregate. If you'd like the
          Service Provider to delete User Provided Data that you have provided
          via the Application, please contact them at{" "}
          <a href={"mailto:support@wada-sanzo-colors.com"}>
            support@wada-sanzo-colors.com
          </a>{" "}
          and we will respond in a reasonable time. Please note that some or all
          of the User Provided Data may be required in order for the Application
          to function properly.
        </p>

        {/* <h3>Children</Text>

      <p>
        You can halt all collection of information by the Application easily by
        uninstalling the Application. You may use the standard uninstall
        processes as may be available as part of your mobile device or via the
        mobile application marketplace or network.
      </Text> */}

        <h3>Security</h3>

        <p>
          The Service Provider is concerned about safeguarding the
          confidentiality of your information. The Service Provider provides
          physical, electronic, and procedural safeguards to protect information
          they process and maintain. For example, they limit access to this
          information to authorized employees and contractors who need to know
          that information in order to operate, develop, or improve their
          Application. Please be aware that, although they endeavor to provide
          reasonable security for information they process and maintain, no
          security system can prevent all potential security breaches.
        </p>

        <h3>Changes</h3>

        <p>
          This Privacy Policy may be updated from time to time for any reason.
          The Service Provider will notify you of any changes to the Privacy
          Policy by updating this page with the new Privacy Policy. You are
          advised to consult this Privacy Policy regularly for any changes, as
          continued use is deemed approval of all changes. This privacy policy
          is effective as of 2025-07-11.
        </p>

        <h3>Your Consent</h3>

        <p>
          By using the Application, you are giving your consent to the Service
          Provider processing of your information as set forth in this Privacy
          Policy now and as amended by us. "Processing,” means using cookies on
          a computer/hand held device or using or touching information in any
          way, including, but not limited to, collecting, storing, deleting,
          using, combining, and disclosing information.
        </p>

        <h3>Contact us</h3>

        <p>
          If you have any questions regarding privacy while using the
          Application, or have questions about the practices, please contact the
          Service Provider via email at{" "}
          <a href={"mailto:support@wada-sanzo-colors.com"}>
            support@wada-sanzo-colors.com
          </a>
          .
        </p>
      </article>
    </main>
  );
}
