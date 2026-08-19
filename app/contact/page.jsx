import IntakeForm from '@/components/IntakeForm';

export const metadata = {
  title: 'Start a project',
  description: 'Send Basecase a project brief. Rough answers are fine; we reply within one business day.',
};

export default function ContactPage() {
  return (
    <>
      <section className="wrap page-head">
        <span className="tag">Contact / Project intake</span>
        <h1 className="disp page-h">Start a project</h1>
        <p className="lede">
          Fill in what you know. Rough answers are fine, and we&apos;ll come back with questions.
        </p>
      </section>

      <section className="band">
        <div className="wrap">
          <IntakeForm />
        </div>
      </section>
    </>
  );
}
