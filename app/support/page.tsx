import styles from "./support.module.css";

export default function SupportPage() {
  return (
    <main className={styles.pageContainer}>
      <article className={styles.article}>
        <h1>Support</h1>

        <p>
          For any questions or feedback please contact{" "}
          <a href={"mailto:support@wada-sanzo-colors.com"}>
            support@wada-sanzo-colors.com
          </a>
          .
        </p>
      </article>
    </main>
  );
}
